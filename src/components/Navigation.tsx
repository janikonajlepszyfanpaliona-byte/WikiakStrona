'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const { t } = useLanguage();

  const navItems = [
    {
      id: 'home',
      label: t('nav.start'),
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 flex-shrink-0">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    },
    {
      id: 'portfolio',
      label: t('nav.portfolio'),
      icon: (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 flex-shrink-0">
          <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM4 9a1 1 0 100 2h8a1 1 0 100-2H4z" />
        </svg>
      ),
    },
  ];

  const [bgOpacity, setBgOpacity] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const navRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);
  const lastClickTime = useRef<number>(0);

  const updatePill = (targetId: string) => {
    const btn = buttonRefs.current[targetId];
    const nav = navRef.current;
    if (btn && nav) {
      const navRect = nav.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setPillStyle({
        left: btnRect.left - navRect.left,
        width: btnRect.width,
      });
    }
  };

  // Initialize pill position after first render
  useLayoutEffect(() => {
    updatePill('home');
  }, []);

  useEffect(() => {
    const targetId = hoveredId ?? activeSection;
    updatePill(targetId);
  }, [hoveredId, activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      setBgOpacity(Math.min(window.scrollY / 300, 1));
      // Don't override active section for 1.5s after a manual nav click
      if (Date.now() - lastClickTime.current < 1500) return;
      for (const item of [...navItems].reverse()) {
        const el = document.getElementById(item.id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(item.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    const start = window.scrollY;
    const targetTop = element.getBoundingClientRect().top + window.scrollY;
    const dist = targetTop - start;
    const dur = 1000;
    let t: number | null = null;
    const step = (now: number) => {
      if (!t) t = now;
      const p = Math.min((now - t) / dur, 1);
      const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
      window.scrollTo(0, start + dist * ease);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <nav
      className="fixed w-full top-0 z-50 transition-all duration-700"
      style={{
        backgroundColor: `rgba(5,5,5,${bgOpacity * 0.88})`,
        backdropFilter: bgOpacity > 0.1 ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: bgOpacity > 0.1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Brand */}
        <button
          onClick={() => scrollToSection('home')}
          className="text-white font-black text-xl tracking-tighter hover:opacity-70 transition-opacity duration-300"
          style={{ fontFamily: 'system-ui, -apple-system' }}
        >
          WIKAK
        </button>

        {/* Pill nav container */}
        <div
          ref={navRef}
          className="relative flex items-center gap-0.5 rounded-full px-1.5 py-1.5"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Sliding background pill */}
          {pillStyle && (
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-full pointer-events-none"
              animate={{ left: pillStyle.left, width: pillStyle.width }}
              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              style={{
                background: hoveredId ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.1)',
                border: hoveredId ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.15)',
              }}
            />
          )}

          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredId === item.id;
            return (
              <button
                key={item.id}
                ref={(el) => { buttonRefs.current[item.id] = el; }}
                onClick={() => { lastClickTime.current = Date.now(); setActiveSection(item.id); scrollToSection(item.id); }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 select-none"
                style={{
                  color: isHovered ? '#ffffff' : isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
                }}
              >
                {item.icon}
                <span className="hidden md:inline">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
