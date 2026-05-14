import { NextResponse } from 'next/server';
import { fetchAiClients } from '@/lib/ai-clients';

const BASE_URL = 'https://plug-service.viasocket.com/api/v1/plugins/all';
const SITE_URL = 'https://mushrooms.viasocket.com';
const LIMIT = 45;
const AICLIENT_APPS_LIMIT = 40;

const buildAppsUrl = (limit: number, offset: number) => {
  return `${BASE_URL}?limit=${limit}&offset=${offset}`;
};

const xmlResponse = (body: string) =>
  new NextResponse(body, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });

const wrapUrlset = (urls: string) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

async function fetchAppsPage(limit: number, offset: number) {
  const res = await fetch(buildAppsUrl(limit, offset), {
    headers: { accept: 'application/json' },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  const json = await res.json();
  return (json?.data || []) as Array<{ appslugname?: string }>;
}

async function appsSitemap(pageNum: number) {
  const offset = (pageNum - 1) * LIMIT;
  const apps = await fetchAppsPage(LIMIT, offset);

  if (apps === null) {
    return new NextResponse('Failed to fetch apps', { status: 500 });
  }
  if (!apps.length) {
    return new NextResponse('No sitemap data found', { status: 404 });
  }

  const now = new Date().toISOString();
  const urls = apps
    .filter((app) => app?.appslugname)
    .map(
      (app) => `
  <url>
    <loc>${SITE_URL}/mcp/${app.appslugname}</loc>
    <lastmod>${now}</lastmod>
  </url>`
    )
    .join('');

  return xmlResponse(wrapUrlset(urls));
}

async function aiclientsAppsSitemap(pageNum: number) {
  const offset = (pageNum - 1) * AICLIENT_APPS_LIMIT;

  const [apps, clients] = await Promise.all([
    fetchAppsPage(AICLIENT_APPS_LIMIT, offset),
    fetchAiClients(),
  ]);

  if (apps === null) {
    return new NextResponse('Failed to fetch apps', { status: 500 });
  }
  if (!apps.length || !clients.length) {
    return new NextResponse('No sitemap data found', { status: 404 });
  }

  const now = new Date().toISOString();
  const slugs = apps
    .map((app) => app?.appslugname)
    .filter((s): s is string => Boolean(s));

  const urls = clients
    .filter((client) => client?.id)
    .flatMap((client) =>
      slugs.map(
        (slug) => `
  <url>
    <loc>${SITE_URL}/aiclients/${client.id}/${slug}</loc>
    <lastmod>${now}</lastmod>
  </url>`
      )
    )
    .join('');

  return xmlResponse(wrapUrlset(urls));
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ page: string }> }
) {
  try {
    const { page } = await context.params;
    const name = page.replace(/\.xml$/, '');

    const aiclientsMatch = name.match(/^aiclients-apps-(\d+)$/);
    if (aiclientsMatch) {
      const pageNum = Number(aiclientsMatch[1]);
      if (!pageNum || pageNum < 1) {
        return new NextResponse('Invalid sitemap page', { status: 400 });
      }
      return await aiclientsAppsSitemap(pageNum);
    }

    const appsMatch = name.match(/^apps-(\d+)$/);
    if (appsMatch) {
      const pageNum = Number(appsMatch[1]);
      if (!pageNum || pageNum < 1) {
        return new NextResponse('Invalid sitemap page', { status: 400 });
      }
      return await appsSitemap(pageNum);
    }

    return new NextResponse('Invalid sitemap page', { status: 400 });
  } catch (error) {
    console.error('SITEMAP ERROR:', error);
    return new NextResponse('Failed to generate sitemap', { status: 500 });
  }
}
