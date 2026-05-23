'use client';

import { useEffect } from 'react';
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Navigation from "@/components/Navigation";
import CreatorsCarousel from "@/components/CreatorsCarousel";
import Portfolio from "@/components/Portfolio";
import QA from "@/components/QA";
import Contact from "@/components/Contact";

export default function Home() {
  // Disable right-click context menu
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <div className="bg-black text-white">
      <Navigation />
      <Hero />
      <CreatorsCarousel />
      <Portfolio />
      <AboutMe />
      <QA />
      <Contact />
    </div>
  );
}
