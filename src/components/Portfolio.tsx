'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useOnScreen } from './useOnScreen';
import { useLanguage } from '@/context/LanguageContext';

const portfolioItems = [
  {
    id: 1,
    title: '100 Widzów vs 3 Pro Budowniczych - Kto Wybuduje Lepsze Królestwo?',
    category: 'Videos',
    videoId: '-0EwuWwuxK8',
    creator: 'Napierak',
    creatorAvatar: 'https://yt3.googleusercontent.com/ytc/AIdro_m6Azbdy1x7mjZsh5uQnrKHhF2fTabVe9GvKqIWkb47LNQ=s900-c-k-c0x00ffffff-no-rj',
    label: 'Montaż Filmu',
  },
  {
    id: 2,
    title: 'W pośrednim filmie na kanale Kubir',
    category: 'Videos',
    videoId: 'VI70ICxQBSw',
    creator: 'Kubir',
    creatorAvatar: 'https://yt3.googleusercontent.com/ytc/AIdro_mv6CpkNEQTdHHApBEnvWIRhpDED7eHLznLbq29y1m7uAw=s88-c-k-c0x00ffffff-no-rj',
    label: 'Montaż Filmu',
  },
  {
    id: 103,
    title: 'MAM JUŻ TEGO DOŚĆ!',
    category: 'Shorts',
    videoId: 'NuuVx-oox-g',
    creator: 'PykMc',
    creatorAvatar: 'https://yt3.googleusercontent.com/r6puujOcQLh58EPyTGBpLfNTehj9InnM-Q8P-DFSsWGSt6j-lN2Bl6xSf6zfFMSQ_wqVOj05=s900-c-k-c0x00ffffff-no-rj',
    label: 'Montaż Shorts',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.1 },
  }),
};

export default function Portfolio() {
  const { t } = useLanguage();
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [ref, isVisible] = useOnScreen(0.1);

  return (
    <section
      id="portfolio"
      className="py-16 md:py-24 px-4 bg-black relative overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} custom={0}>
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
            >
              {t('portfolio.label')}
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-3 tracking-tight text-white leading-tight" dangerouslySetInnerHTML={{ __html: t('portfolio.title') }}></h2>
            <p className="text-gray-500 text-sm md:text-base max-w-md">
              {t('portfolio.subtitle')}
            </p>
          </motion.div>

        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {portfolioItems.map((item, index) => {
            const isPlaying = selectedVideoId === item.videoId;
            return (
              <motion.div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl bg-black"
                style={{
                  border: isPlaying ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: isPlaying ? '0 20px 60px rgba(255,255,255,0.1)' : 'none',
                }}
                variants={itemVariants}
                custom={index}
                whileHover={!isPlaying ? { y: -10, borderColor: 'rgba(255,255,255,0.4)', boxShadow: '0 20px 60px rgba(255,255,255,0.1)' } : {}}
              >
                {/* Thumbnail / Inline Player */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {isPlaying ? (
                    <>
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ border: 'none' }}
                      />
                      <button
                        onClick={() => setSelectedVideoId(null)}
                        className="absolute top-2 right-2 z-20 w-7 h-7 rounded-full flex items-center justify-center text-white"
                        style={{ background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(255,255,255,0.2)' }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <button className="absolute inset-0 w-full h-full" onClick={() => setSelectedVideoId(item.videoId)}>
                      <motion.img
                        src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.6 }}
                        loading="lazy"
                        draggable={false}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/35 transition-colors duration-300">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 0 40px rgba(255,255,255,0.3)' }}
                        >
                          <svg className="w-7 h-7 text-black ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                      <div
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'rgba(255,255,255,0.9)', color: '#000' }}
                      >
                        {item.category}
                      </div>
                    </button>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-white font-bold text-base mb-3 line-clamp-2">{item.title}</h3>
                  <div className="flex items-center justify-between border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                    <div className="flex items-center gap-2.5">
                      <img src={item.creatorAvatar} alt={item.creator} className="w-8 h-8 rounded-full object-cover" style={{ border: '1px solid rgba(255,255,255,0.15)' }} draggable={false} />
                      <span className="text-gray-400 text-xs font-medium">{item.creator}</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>
                        {item.label}
                      </span>
                      {'extraLabel' in item && (item as any).extraLabel && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}>
                          {(item as any).extraLabel}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Button */}
        <motion.div 
          className="mt-16 flex justify-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} custom={0} whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/portfolio"
              className="px-10 py-4 rounded-full font-bold text-base text-black bg-white inline-flex items-center justify-center gap-3 transition-transform"
              style={{ boxShadow: '0 0 30px rgba(255,255,255,0.15)' }}
            >
              {t('portfolio.btnAll')}
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
