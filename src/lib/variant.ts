export type Variant = 'A' | 'B';

export const USER_ID_COOKIE = 'userId';
export const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function createUserId(): number {
  return Math.floor(Math.random() * 1_000_000_000) + 1;
}

export function parseUserIdFromCookieString(cookieStr: string | null | undefined): number | undefined {
  if (!cookieStr) return undefined;
  const match = cookieStr.split(';').find((c) => c.trim().startsWith(`${USER_ID_COOKIE}=`));
  const value = match?.split('=')[1]?.trim();
  const num = Number(value);
  return Number.isInteger(num) && num > 0 ? num : undefined;
}

export function getVariant(userId: number): Variant {
  return userId % 2 === 0 ? 'A' : 'B';
}

export function withUtmSource(href: string, variant: Variant): string {
  try {
    const url = new URL(href);
    url.searchParams.set('utm_source', variant);
    return url.toString();
  } catch {
    return href;
  }
}
