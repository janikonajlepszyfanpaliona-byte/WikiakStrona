'use client';

import { motion } from 'framer-motion';
import { useOnScreen } from './useOnScreen';

export default function Contact() {
  const [ref, isVisible] = useOnScreen(0.1);

  return (
    <section
      id="contact"
      className="py-28 px-4 bg-black border-t relative overflow-hidden"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      ref={ref}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(168, 85, 247, 0.1) 0%, transparent 100%)',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{
              background: 'rgba(168, 85, 247, 0.12)',
              border: '1px solid rgba(168, 85, 247, 0.28)',
              color: '#c084fc',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Dostępny
          </span>
        </motion.div>

        <motion.h2
          className="text-5xl md:text-7xl font-black mb-5 tracking-tight text-white"
          initial={{ opacity: 0, y: 40, scale: 0.92, filter: 'blur(16px)' }}
          animate={
            isVisible
              ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
              : { opacity: 0, y: 40, scale: 0.92, filter: 'blur(16px)' }
          }
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          Zacznijmy{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #c084fc, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Montaż.
          </span>
        </motion.h2>

        <motion.p
          className="text-gray-400 text-lg mb-12"
          initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
          animate={
            isVisible
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 24, filter: 'blur(10px)' }
          }
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
        >
          Masz surowy materiał? Dołącz do Discorda i omówmy szczegóły!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={
            isVisible
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 24, scale: 0.9 }
          }
          transition={{ delay: 0.35, duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="https://discord.gg/S23qpDDd86"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 font-bold text-lg rounded-full text-black shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #c084fc, #a855f7)',
              boxShadow: '0 0 50px rgba(168, 85, 247, 0.4)',
            }}
            whileHover={{
              scale: 1.06,
              boxShadow: '0 0 70px rgba(168, 85, 247, 0.6)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.294.075.075 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 0 1 .079.009c.12.098.246.198.373.295a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.041.107c.36.699.77 1.364 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-4.718-.838-8.812-3.549-12.456a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-.967-2.157-2.156 0-1.193.974-2.157 2.157-2.157 1.193 0 2.156.964 2.157 2.157 0 1.19-.964 2.156-2.157 2.156zm7.975 0c-1.183 0-2.157-.967-2.157-2.156 0-1.193.974-2.157 2.157-2.157 1.193 0 2.157.964 2.157 2.157 0 1.19-.964 2.156-2.157 2.156z" />
            </svg>
            Dołącz do Discord
          </motion.a>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-20 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="text-gray-600 text-sm font-medium tracking-wide">
            © 2026{' '}
            <span className="text-gray-400 font-bold">WIKAK MONTAŻ</span>
          </p>
          <p className="text-gray-700 text-xs tracking-widest uppercase">
            Video Editing · Content Creation
          </p>
        </motion.div>
      </div>
    </section>
  );
}
