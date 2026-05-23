'use client';

import { motion } from 'framer-motion';
import { useOnScreen } from './useOnScreen';
import { useLanguage } from '@/context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [ref, isVisible] = useOnScreen(0.1);

  return (
    <section
      id="contact"
      className="py-16 md:py-24 px-4 bg-black relative overflow-hidden"
      ref={ref}
    >


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
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {t('contact.status')}
          </span>
        </motion.div>

        <motion.h2
          className="text-4xl sm:text-5xl md:text-7xl font-black mb-5 tracking-tight text-white"
          initial={{ opacity: 0, y: 40, scale: 0.92, filter: 'blur(16px)' }}
          animate={
            isVisible
              ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
              : { opacity: 0, y: 40, scale: 0.92, filter: 'blur(16px)' }
          }
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {t('contact.title1')}{' '}
          <span className="text-white">
            {t('contact.title2')}
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
          {t('contact.subtitle')}
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
            href="https://discord.gg/6rpWQKh9y"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto justify-center inline-flex items-center gap-3 px-8 sm:px-10 py-4 font-bold text-base sm:text-lg rounded-full text-white shadow-2xl cursor-pointer"
            style={{
              background: '#5865F2',
              boxShadow: '0 0 30px rgba(88, 101, 242, 0.4)',
            }}
            whileHover={{
              scale: 1.06,
              boxShadow: '0 0 50px rgba(88, 101, 242, 0.6)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.033.057a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Discord
          </motion.a>
        </motion.div>


      </div>
    </section>
  );
}
