'use client';

import Link from 'next/link';
import Ticker from './Ticker';
import { useAppsCount } from '@/context/AppsCountContext';
import { INTEGRATION_APPS } from '@/config/brand-icons';
import HeroChatDemo from '@/components/hero/HeroChatDemo';
import HeroCanvas2 from './HeroCanvas2';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero2() {
    const { displayCount } = useAppsCount();
    const [randomApps, setRandomApps] = useState<typeof INTEGRATION_APPS[number][]>([]);

    useEffect(() => {
        const shuffled = [...INTEGRATION_APPS].sort(() => 0.5 - Math.random());
        setRandomApps(shuffled.slice(0, 4));
        
        // Flip icons every 3 seconds
        const interval = setInterval(() => {
            const newShuffled = [...INTEGRATION_APPS].sort(() => 0.5 - Math.random());
            setRandomApps(newShuffled.slice(0, 4));
        }, 3000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hero relative h-[calc(100vh-20px)] min-h-[580px] sm:min-h-[750px] md:min-h-[1000px] lg:min-h-[1350px] bg-[var(--green)] rounded-2xl overflow-hidden m-[10px]">
            <HeroCanvas2 />
            <div id="hero-content" className="relative z-10 flex flex-col items-center justify-start w-full h-full pt-[40px] px-4 sm:px-6 pb-16">
                <div id="hero-left" className="flex-none w-full" style={{ paddingTop: '3vh' }}>
                    <div id="hero-copy" className="flex flex-col items-center gap-3 sm:gap-4 text-center pointer-events-none">
                        {/* Title — better sizing for mobile */}
                        <h1
                            id="hero-title"
                            className="animate-pop-in w-full px-2"
                            style={{
                                fontFamily: "'Symtext', 'Press Start 2P', monospace",
                                fontSize: 'clamp(48px, 12vw, 160px)',
                                fontWeight: 400,
                                color: 'var(--ink)',
                                lineHeight: 1,
                                letterSpacing: 'clamp(-2px, -0.5vw, -1px)',
                                wordBreak: 'break-word',
                            }}
                        >
                            MUSHROOMS
                        </h1>

                        {/* Subtitle — unified responsive layout */}
                        <div
                            id="hero-sub"
                            className="w-full max-w-[700px] animate-fade-up px-3 sm:px-2"
                            style={{
                                fontFamily: "'Poppins', sans-serif",
                                fontSize: 'clamp(16px, 3.5vw, 40px)',
                                fontWeight: 600,
                                color: '#ffffff',
                                lineHeight: 1.5,
                            }}
                        >
                            <span style={{ color: 'var(--ink)', fontWeight: 200 }}>Give your AI the</span>
                            {' '}Power to act{' '}
                            <span style={{ color: 'var(--ink)', fontWeight: 200 }}>across {displayCount} apps</span>
                        </div>

                        {/* CTA — better mobile sizing */}
                        <Link
                            href="https://app.mushrooms.viasocket.com/login"
                            id="hero-cta"
                            className="inline-flex items-center gap-2 pointer-events-auto animate-fade-up-delay transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.32)]"
                            style={{
                                fontFamily: "'Symtext', 'Press Start 2P', monospace",
                                fontSize: 'clamp(11px, 2.8vw, 16px)',
                                fontWeight: 600,
                                color: '#fff',
                                background: 'var(--ink)',
                                padding: 'clamp(12px, 2.5vw, 15px) clamp(24px, 5vw, 38px)',
                                borderRadius: 8,
                                marginTop: 4,
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Get Started free
                            <ArrowRight className="inline-block flex-shrink-0" size={14} />
                        </Link>

                        <div id="chat-demo-container" className="w-full mt-[50px] sm:mt-[80px] lg:mt-[120px]">
                            <HeroChatDemo />
                        </div>
                    </div>
                </div>
            </div>

            <Ticker />
        </div >
    );
}