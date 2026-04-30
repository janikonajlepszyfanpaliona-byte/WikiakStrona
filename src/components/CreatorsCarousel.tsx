'use client';

import { motion } from 'framer-motion';
import { useOnScreen } from './useOnScreen';
import { useLanguage } from '@/context/LanguageContext';

const creators = [
  { id: 1, name: 'kubir', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_mv6CpkNEQTdHHApBEnvWIRhpDED7eHLznLbq29y1m7uAw=s900-c-k-c0x00ffffff-no-rj', url: 'https://www.youtube.com/@Kubirek' },
  { id: 2, name: 'tobiasz', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlsh4Aa3CTGDGhtOMVLgK4aHF4Glz82ArKOA&s', url: 'https://www.youtube.com/@TobiaszGaming' },

  { id: 4, name: 'zenciak', avatar: 'https://yt3.googleusercontent.com/X1ofEazlVw-rkBo9oq6FcWCkWyNdNOxes1500cxtAO_s-eeRD-bRS3MWFY2Plll_9iTHCgw8=s900-c-k-c0x00ffffff-no-rj', url: 'https://www.youtube.com/@ZenciaK' },
  { id: 5, name: 'krzysimir', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_mSfUbXl3yYSnFhJxWvS7lim5dBilK8OrbEz4Qx5Kd4sSw=s900-c-k-c0x00ffffff-no-rj', url: 'https://www.youtube.com/@krzysimir92' },
  { id: 6, name: 'kabylekl', avatar: 'https://yt3.ggpht.com/4LLzkuHeDHEI3YEvZKNHQ-dQ1bOG-xz3qRhxY9ifpXqzFk3D74I2A3LHXqMgjJKyVaXP6_1YRpD6xx4=s168-c-fcrop64=1,09310000f6ceffff-nd-v1', url: 'https://www.youtube.com/@A5B1SS' },
  { id: 7, name: 'wytoh', avatar: 'https://yt3.googleusercontent.com/C25it1uQvot_VTYJuKWPd7uK5d-FlVs2pampQz3I-fHXAuIlxBR1N_cbZ_ntjAghgY87Kg9REQ=s900-c-k-c0x00ffffff-no-rj', url: 'https://www.youtube.com/@wytoh1' },
  { id: 8, name: 'froxy', avatar: 'https://yt3.googleusercontent.com/_967C0R1kfdSKvGnlvoslKDGtdQ2gHZicr7XbEvb4GY5ZGhEwk4nS0zd_Y83GzMhq64clN0Gfw=s900-c-k-c0x00ffffff-no-rj', url: 'https://www.youtube.com/@FroxyPL' },
  { id: 9, name: 'e__s', avatar: 'https://yt3.googleusercontent.com/N0NFM8LCmHccsvk5D5NCv5viS3mvcNuJ0o9bqSeJ5jtZ8pFCVUnH32Dxrg7l79Z69t5N5ezvNHw=s900-c-k-c0x00ffffff-no-rj', url: 'https://www.youtube.com/@e__s0' },
  { id: 10, name: 'raxenik', avatar: 'https://yt3.googleusercontent.com/QONFseLeWs9YCMl6fAm90dIRytKJYHFK_zMjI8wpWE3RU9iNNYPxsM4bipp1DVxsvqXR9tdkUJ8=s900-c-k-c0x00ffffff-no-rj', url: 'https://www.youtube.com/@xRaxenikk' },
  { id: 11, name: 'trombapowietrzna', avatar: 'https://yt3.googleusercontent.com/dDrE3oaIv5n351MOhypLD1CUK1uaDc7NHnDgMSZYxmxF0TuRE2Ybeye9IfGZZN1HTxJB37sWhw=s900-c-k-c0x00ffffff-no-rj', url: 'https://www.youtube.com/@TrombaPowietrzna' },
  { id: 12, name: 'meksiak', avatar: 'https://yt3.googleusercontent.com/YsYhbpJ8j-NLcsl_siLCXHY4fTs86CgCwPF6DTj9RyuHxxMtAEArA_y_gJkc57ILrGhVvOLmGQ=s176-c-k-c0x00ffffff-no-rj-mo', url: 'https://www.youtube.com/@Meksiak_' },
  { id: 13, name: 'RapyGG', avatar: 'https://yt3.googleusercontent.com/Wt6C9J0YOaBHc4sp9WSyOo0PVPSM6d8QaiGXJsVIuzntg1dVxdi105lrRyrN7E8Z_KrRqfM7qg=s900-c-k-c0x00ffffff-no-rj', url: 'https://www.youtube.com/@RAPY_PL' },
];

const row1 = [...creators.slice(0, 7), ...creators.slice(0, 7)];
const row2 = [...creators.slice(6), ...creators.slice(6)];

function CreatorCard({ creator }: { creator: typeof creators[0] }) {
  return (
    <a
      href={creator.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 flex-shrink-0 px-5 py-4 rounded-2xl transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        minWidth: '180px',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = 'rgba(255,255,255,0.08)';
        el.style.borderColor = 'rgba(255,255,255,0.15)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = 'rgba(255,255,255,0.04)';
        el.style.borderColor = 'rgba(255,255,255,0.08)';
      }}
    >
      <div className="relative flex-shrink-0">
        <img
          src={creator.avatar}
          alt={creator.name}
          loading="lazy"
          draggable={false}
          className="w-14 h-14 rounded-full object-cover border-2 group-hover:border-white transition-colors duration-300"
          style={{ borderColor: 'rgba(255,255,255,0.15)' }}
        />
        <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center shadow-md">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </span>
      </div>
      <span className="text-white text-sm font-semibold group-hover:text-gray-300 transition-colors duration-300 truncate max-w-[110px]">
        {creator.name}
      </span>
    </a>
  );
}

function MarqueeRow({ items, direction = 'left', duration = 40 }: { items: typeof creators; direction?: 'left' | 'right'; duration?: number }) {
  const totalWidth = items.length / 2 * 220;
  return (
    <div className="overflow-hidden py-1.5">
      <motion.div
        className="flex gap-4 will-change-transform"
        animate={{ x: direction === 'left' ? [-totalWidth, 0] : [0, -totalWidth] }}
        transition={{ x: { duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' } }}
      >
        {items.map((c, i) => <CreatorCard key={`${c.id}-${i}`} creator={c} />)}
      </motion.div>
    </div>
  );
}

export default function CreatorsCarousel() {
  const { t } = useLanguage();
  const [ref, isVisible] = useOnScreen(0.1);

  return (
    <section
      id="creators-carousel"
      className="relative py-16 md:py-24 bg-black border-t overflow-hidden"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      ref={ref}
    >


      {/* Header */}
      <motion.div
        className="text-center mb-14 px-4"
        initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
        animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <span
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff' }}
        >
          Współprace
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
          {t('carousel.title')}
        </h2>
      </motion.div>

      {/* Rows with edge fades */}
      <motion.div
        className="relative space-y-4"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ delay: 0.25, duration: 0.8 }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, black, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, black, transparent)' }} />
        <MarqueeRow items={row1} direction="left" duration={45} />
        <MarqueeRow items={row2} direction="right" duration={55} />
      </motion.div>
    </section>
  );
}
