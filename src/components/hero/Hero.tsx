'use client';

import Link from 'next/link';
import HeroChatMockup from './HeroChatMockup';
import Ticker from './Ticker';
import { useAppsCount } from '@/context/AppsCountContext';
import './hero.css';

export default function Hero() {
  const { displayCount } = useAppsCount();

  return (
    <div className="homepage-hero">
      <div className="homepage-hero-inner">
        <div className="homepage-hero-left">
          <h1 className="homepage-hero-title">
            POWER UP YOUR
            <br />
            AI WITH {displayCount} APPS
          </h1>
          <p className="homepage-hero-sub">
            Connect your favourite apps with AI tools like ChatGPT, Claude, and
            Cursor using the Mushrooms MCP Server.
          </p>
          <Link
            href="https://app.mushroom.viasocket.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="homepage-hero-cta"
          >
            SELECT AI AND YOUR APPS
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.5 7h9M7.5 3.5L11 7l-3.5 3.5" />
            </svg>
          </Link>
        </div>

        <div className="homepage-hero-right">
          <HeroChatMockup />
        </div>
      </div>

      <Ticker />
    </div>
  );
}
