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
          <motion.button
            onClick={() => {
              navigator.clipboard.writeText('kontakt@wikak.eu');
              const btn = document.getElementById('copy-email-btn');
              if (btn) {
                const originalText = btn.innerHTML;
                btn.innerHTML = t('contact.btnCopied');
                setTimeout(() => { btn.innerHTML = originalText; }, 2000);
              }
            }}
            className="w-full sm:w-auto justify-center inline-flex items-center gap-3 px-8 sm:px-10 py-4 font-bold text-base sm:text-lg rounded-full text-black shadow-2xl cursor-pointer"
            style={{
              background: '#ffffff',
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
            }}
            whileHover={{
              scale: 1.06,
              boxShadow: '0 0 50px rgba(255, 255, 255, 0.25)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span id="copy-email-btn">{t('contact.btnCopy')}</span>
          </motion.button>
        </motion.div>


      </div>
    </section>
  );
}
