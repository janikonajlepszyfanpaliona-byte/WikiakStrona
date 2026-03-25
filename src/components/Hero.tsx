'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import Particles from './Particles';
import { useLoading } from '@/context/LoadingContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2 },
  },
};

const titleVariants = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(16px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.4 },
  },
};

const stats = [
  { value: '49+', label: 'Opinii klientów' },
  { value: '67+', label: 'Zadowolonych twórców' },
  { value: '218+', label: 'Zmontowanych filmów' },
];

export default function Hero() {
  const { isLoading } = useLoading();
  const heroRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (isLoading) return null;

  return (
    <motion.section
      ref={heroRef}
      id="home"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center bg-black overflow-hidden relative"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{
          filter: 'brightness(0.4) blur(2px)',
          WebkitFilter: 'brightness(0.4) blur(2px)',
        }}
      >
        <source src="/videos/background-featured.mp4" type="video/mp4" />
        <source src="/videos/background-featured.webm" type="video/webm" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-0" />
      {/* Purple glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
        }}
      />

      <Particles />

      <motion.div
        className="space-y-10 max-w-5xl relative z-20 flex flex-col items-center justify-center flex-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{
              background: 'rgba(168, 85, 247, 0.15)',
              border: '1px solid rgba(168, 85, 247, 0.35)',
              color: '#d8b4fe',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Montażysta Video
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.div variants={titleVariants}>
          <motion.h1
            className="text-8xl md:text-[10rem] font-black tracking-tighter leading-none text-white"
            style={{
              textShadow:
                '0 20px 60px rgba(0,0,0,0.9), 0 0 80px rgba(168,85,247,0.25)',
              letterSpacing: '-0.02em',
              fontWeight: 900,
              fontFamily: 'system-ui, -apple-system',
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.02 }}
          >
            WIKAK
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div className="space-y-2" variants={itemVariants}>
          <motion.p
            className="text-gray-300 text-sm md:text-base font-light tracking-[0.3em] uppercase"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
          >
            Twoja wizja <span className="text-purple-400">•</span> Moja produkcja
          </motion.p>
          <motion.p
            className="text-gray-500 text-xs tracking-[0.25em] uppercase"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, delay: 0.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            Rytm <span className="text-purple-500/60">•</span> Płynność <span className="text-purple-500/60">•</span> Historia
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div className="flex flex-col sm:flex-row items-center gap-4" variants={itemVariants}>
          <motion.a
            href="https://discord.gg/VJ3362f5"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 font-bold text-base text-black rounded-full inline-flex items-center gap-2 shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #c084fc, #a855f7)',
              boxShadow: '0 0 40px rgba(168, 85, 247, 0.35)',
            }}
            whileHover={{ scale: 1.06, boxShadow: '0 0 60px rgba(168, 85, 247, 0.55)' }}
            whileTap={{ scale: 0.97 }}
          >
            Rozpocznij Projekt
          </motion.a>

          <motion.a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 border border-white/20 text-white font-bold text-base rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Zobacz Portfolio
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-4 grid grid-cols-3 gap-6 md:gap-14 max-w-2xl w-full px-4"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <motion.div
                className="text-3xl md:text-4xl font-black text-white mb-1"
                style={{ textShadow: '0 0 30px rgba(168,85,247,0.3)' }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-500 text-xs tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <span className="text-gray-600 text-[10px] tracking-widest uppercase">Przewiń</span>
        <motion.svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </motion.svg>
      </motion.div>

      {/* Ambient glows */}
      <motion.div
        className="absolute top-1/3 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full blur-3xl opacity-8 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6d28d9, transparent)' }}
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.section>
  );
}
