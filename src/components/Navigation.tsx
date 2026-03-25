'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  {
    id: 'home',
    label: 'Start',
    icon: (
      <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 flex-shrink-0">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    ),
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    icon: (
      <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 flex-shrink-0">
        <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM4 9a1 1 0 100 2h8a1 1 0 100-2H4z" />
      </svg>
    ),
  },
  {
    id: 'qa',
    label: 'FAQ',
    icon: (
      <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 flex-shrink-0">
        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-7-4a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Kontakt',
    icon: (
      <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 flex-shrink-0">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    ),
  },
];

export default function Navigation() {
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
    const dist = element.offsetTop - start;
    const dur = 1200;
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
          WIKAK<span style={{ color: '#a855f7' }}>.</span>
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
                background: hoveredId ? 'rgba(255,255,255,0.08)' : 'rgba(168,85,247,0.22)',
                border: hoveredId ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(168,85,247,0.4)',
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
                  color: isHovered ? '#ffffff' : isActive ? '#e9d5ff' : 'rgba(255,255,255,0.45)',
                }}
              >
                {item.icon}
                <span className="hidden md:inline">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollToSection('contact')}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-black transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #c084fc, #a855f7)' }}
        >
          Zamów Montaż
        </button>
      </div>
    </nav>
  );
}
