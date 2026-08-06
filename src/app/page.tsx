import { headers } from 'next/headers';
import HomeClient from './HomeClient';
import { fetchHeroContent } from '@/lib/hero-content';
import { createUserId, parseUserIdFromCookieString } from '@/lib/variant';

export const runtime = 'edge';

export default async function Home() {
  const headerStore = await headers();
  const cookieHeader = headerStore.get('cookie');
  const cookieUserId = parseUserIdFromCookieString(cookieHeader);
  const hasUserId = cookieUserId !== undefined;
  const userId = hasUserId ? cookieUserId : createUserId();

  const heroContent = await fetchHeroContent();

  return <HomeClient userId={userId} shouldSetCookie={!hasUserId} heroContent={heroContent} />;
}
