'use client';

import { useLayoutEffect, useState } from 'react';
import {
  createUserId,
  parseUserIdFromCookieString,
  getVariant,
  USER_ID_COOKIE,
  COOKIE_MAX_AGE_SECONDS,
  type Variant,
} from '@/lib/variant';

export function useVariant(known?: Variant): Variant {
  const [variant, setVariant] = useState<Variant>(known ?? 'A');

  useLayoutEffect(() => {
    if (known) return;
    const cookieUserId = parseUserIdFromCookieString(document.cookie);
    const userId = cookieUserId ?? createUserId();
    if (cookieUserId === undefined) {
      document.cookie = `${USER_ID_COOKIE}=${userId}; max-age=${COOKIE_MAX_AGE_SECONDS}; path=/; domain=.mushrooms.viasocket.com; SameSite=Lax`;
    }
    setVariant(getVariant(userId));
  }, [known]);

  return variant;
}
