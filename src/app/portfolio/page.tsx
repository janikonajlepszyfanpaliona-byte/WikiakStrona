'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useOnScreen } from '@/components/useOnScreen';
import { useLanguage } from '@/context/LanguageContext';

const portfolioData = {
  videos: [
    { id: 11, title: '100 WIDZÓW vs 3 PRO BUDOWNICZYCH - Kto Wybuduje Lepsze KRÓLESTWO?', videoId: '-0EwuWwuxK8', creator: 'Napierak', creatorAvatar: 'https://yt3.googleusercontent.com/ytc/AIdro_m6Azbdy1x7mjZsh5uQnrKHhF2fTabVe9GvKqIWkb47LNQ=s900-c-k-c0x00ffffff-no-rj', label: 'Montaż Filmu' },
    { id: 1, title: 'EarthSmp: Miecz Łowcy', videoId: 'ppezf46mLO0', creator: 'EkipaRapy', creatorAvatar: 'https://yt3.googleusercontent.com/Wt6C9J0YOaBHc4sp9WSyOo0PVPSM6d8QaiGXJsVIuzntg1dVxdi105lrRyrN7E8Z_KrRqfM7qg=s900-c-k-c0x00ffffff-no-rj', label: 'Montaż Filmu' },
    { id: 2, title: 'EarthSmp: PentaKill', videoId: 'undo7xjhy0g', creator: 'EkipaRapy', creatorAvatar: 'https://yt3.googleusercontent.com/Wt6C9J0YOaBHc4sp9WSyOo0PVPSM6d8QaiGXJsVIuzntg1dVxdi105lrRyrN7E8Z_KrRqfM7qg=s900-c-k-c0x00ffffff-no-rj', label: 'Montaż Filmu' },
    { id: 3, title: 'To są NAJLEPSZE Texture Packi na Lifesteal', videoId: '6jrj1nPN3cU', creator: 'Kabylek', creatorAvatar: 'https://yt3.ggpht.com/4LLzkuHeDHEI3YEvZKNHQ-dQ1bOG-xz3qRhxY9ifpXqzFk3D74I2A3LHXqMgjJKyVaXP6_1YRpD6xx4=s168-c-fcrop64=1,09310000f6ceffff-nd-v1', label: 'Montaż Filmu', extraLabel: 'Montaż Intro' },
    { id: 4, title: 'Minecraft, ale musisz zebrać 1.000.000 BLOKÓW...', videoId: 'g45GnYcsSMk', creator: 'Kubir', creatorAvatar: 'https://yt3.googleusercontent.com/ytc/AIdro_mv6CpkNEQTdHHApBEnvWIRhpDED7eHLznLbq29y1m7uAw=s88-c-k-c0x00ffffff-no-rj', label: 'Montaż Filmu' },
    { id: 5, title: 'UKRADŁEM Najlepszego Brainrota w STEAL A BRAINROT ROBLOX w Minecraft...', videoId: 'VI70ICxQBSw', creator: 'Kubir', creatorAvatar: 'https://yt3.googleusercontent.com/ytc/AIdro_mv6CpkNEQTdHHApBEnvWIRhpDED7eHLznLbq29y1m7uAw=s88-c-k-c0x00ffffff-no-rj', label: 'Montaż Filmu' },
    { id: 6, title: 'Co Się Nie Zgadza w Tej STRUKTURZE? - REWANŻ', videoId: '5TQ0K1jZPa4', creator: 'Napierak', creatorAvatar: 'https://yt3.googleusercontent.com/ytc/AIdro_m6Azbdy1x7mjZsh5uQnrKHhF2fTabVe9GvKqIWkb47LNQ=s900-c-k-c0x00ffffff-no-rj', label: 'Montaż Filmu' },
    { id: 7, title: 'Co Się Nie Zgadza w Tej STRUKTURZE? - FINAŁ', videoId: '69prsQEV4k0', creator: 'Napierak', creatorAvatar: 'https://yt3.googleusercontent.com/ytc/AIdro_m6Azbdy1x7mjZsh5uQnrKHhF2fTabVe9GvKqIWkb47LNQ=s900-c-k-c0x00ffffff-no-rj', label: 'Montaż Filmu' },
  ],
  shorts: [
    { id: 101, title: 'Short #1', videoId: 'uXlVQnsOzz8', creator: 'Meksiak', creatorAvatar: 'https://yt3.googleusercontent.com/YsYhbpJ8j-NLcsl_siLCXHY4fTs86CgCwPF6DTj9RyuHxxMtAEArA_y_gJkc57ILrGhVvOLmGQ=s176-c-k-c0x00ffffff-no-rj-mo', label: 'Montaż Shorts' },
    { id: 102, title: 'Short #2', videoId: 'QVMBBrX5QeY', creator: 'Macmarr', creatorAvatar: 'https://minecraftfaces.com/wp-content/bigfaces/big-steve-face.png', label: 'Montaż Shorts' },
    { id: 103, title: 'MAM JUŻ TEGO DOŚĆ!', videoId: 'NuuVx-oox-g', creator: 'PykMc', creatorAvatar: 'https://yt3.googleusercontent.com/r6puujOcQLh58EPyTGBpLfNTehj9InnM-Q8P-DFSsWGSt6j-lN2Bl6xSf6zfFMSQ_wqVOj05=s900-c-k-c0x00ffffff-no-rj', label: 'Montaż Shorts' },
    { id: 104, title: 'PONAD 10 000 SMOCZYCH ODŁMAKÓW DO ZGARNIĘCIA!', videoId: 'sXqn9AwW1-Y', creator: 'MineStar', creatorAvatar: 'https://minestar.pl/_next/image?url=%2Fimages%2Flogo_main.png&w=3840&q=100', label: 'Montaż Shorts' },
  ],
  animations: [
    { id: 201, title: 'Animacja Prezentująca Stronę Wikak.eu', videoId: 'gaLwC2PzabU', creator: '???', creatorAvatar: 'https://minecraftfaces.com/wp-content/bigfaces/big-steve-face.png', label: '2D Motion' },
    { id: 202, title: 'Animacja #2', videoId: 'dibl6Gr1OVY', creator: '???', creatorAvatar: 'https://minecraftfaces.com/wp-content/bigfaces/big-steve-face.png', label: '2D Motion' },
    { id: 203, title: 'Animacja #3', videoId: '-UXcCAt9QHI', creator: '???', creatorAvatar: 'https://minecraftfaces.com/wp-content/bigfaces/big-steve-face.png', label: '2D Motion' },
  ],
};

type CategoryFilter = 'Videos' | 'Shorts' | '2D Motion';
const categories: CategoryFilter[] = ['Videos', 'Shorts', '2D Motion'];

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.55, delay: i * 0.07 },
  }),
};

export default function PortfolioPage() {
  const { t } = useLanguage();
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('Videos');
  const [ref, isVisible] = useOnScreen(0.05);

  const items = activeCategory === 'Videos'
    ? portfolioData.videos
    : activeCategory === 'Shorts'
      ? portfolioData.shorts
      : portfolioData.animations;

  return (
    <main className="min-h-screen bg-black pt-28 pb-20 relative overflow-hidden">
      <section className="max-w-7xl mx-auto px-4" ref={ref}>
        {/* Back Button */}
        <motion.div className="mb-14" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-black bg-white transition-all duration-300"
            style={{ boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >
            ← {t('footer.home')}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div className="mb-16 text-center" initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.8 }}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>
            {t('portfolio.label')}
          </span>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-5 tracking-tight text-white leading-tight">
            {t('portfolio.pageTitle')}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div className="flex justify-center gap-2 mb-16 flex-wrap"
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => { setActiveCategory(cat); setSelectedVideoId(null); }}
                className="px-7 py-2.5 rounded-full font-bold text-sm transition-all duration-300"
                style={{
                  background: active ? '#fff' : 'rgba(255,255,255,0.05)',
                  border: active ? '1px solid #fff' : '1px solid rgba(255,255,255,0.1)',
                  color: active ? '#000' : 'rgba(255,255,255,0.6)',
                  boxShadow: active ? '0 0 30px rgba(255,255,255,0.15)' : 'none',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {items.map((item, index) => {
              const isPlaying = selectedVideoId === item.videoId;
              return (
                <motion.div
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl bg-black"
                  style={{
                    border: isPlaying ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: isPlaying ? '0 20px 60px rgba(255,255,255,0.1)' : 'none',
                  }}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isVisible ? 'visible' : 'hidden'}
                  custom={index}
                  whileHover={!isPlaying ? { y: -8, borderColor: 'rgba(255,255,255,0.4)', boxShadow: '0 20px 60px rgba(255,255,255,0.1)' } : {}}
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
                          whileHover={{ scale: 1.08 }}
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
                          {activeCategory}
                        </div>
                      </button>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="text-white font-bold text-sm md:text-base mb-3 line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                      <div className="flex items-center gap-2.5">
                        <img src={item.creatorAvatar} alt={item.creator} className="w-8 h-8 rounded-full object-cover"
                          style={{ border: '1px solid rgba(255,255,255,0.15)' }} draggable={false} />
                        <span className="text-gray-400 text-xs font-medium">{item.creator}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>
                          {item.label}
                        </span>
                        {'extraLabel' in item && item.extraLabel && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}>
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
        </AnimatePresence>
      </section>
    </main>
  );
}
