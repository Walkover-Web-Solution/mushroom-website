'use client';

import { useLayoutEffect } from 'react';
import Navbar from '@/components/ui/Navbar';
import Integrations from '@/components/sections/Integrations';
import AiClients from '@/components/sections/AiClients';
import Features from '@/components/sections/Features';
import Pricing from '@/components/sections/Pricing';
import Blog from '@/components/sections/Blog';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/ui/Footer';
import Hero from '@/components/hero/Hero';
import Hero2 from '@/components/hero/Hero2';
import type { HeroContent } from '@/lib/hero-content';
import { USER_ID_COOKIE, COOKIE_MAX_AGE_SECONDS, getVariant } from '@/lib/variant';

interface HomeClientProps {
  userId: number;
  shouldSetCookie: boolean;
  heroContent: HeroContent;
}

export default function HomeClient({ userId, shouldSetCookie, heroContent }: HomeClientProps) {
  useLayoutEffect(() => {
    if (shouldSetCookie) {
      document.cookie = `${USER_ID_COOKIE}=${userId}; max-age=${COOKIE_MAX_AGE_SECONDS}; path=/; domain=.mushrooms.viasocket.com; SameSite=Lax`;
    }
  }, [shouldSetCookie, userId]);

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const variant = getVariant(userId);

  return (
    <div className="p-0">
      <Navbar variant={variant} onFreePillClick={scrollToPricing} />
      {variant === 'A' ? <Hero variant={variant} /> : <Hero2 content={heroContent} variant={variant} />}
      <Integrations />
      <AiClients />
      <Features />
      <Pricing variant={variant} />
      <Blog />
      <FAQ />
      <Footer />
    </div>
  );
}
