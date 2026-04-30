'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnScreen } from './useOnScreen';
import { useLanguage } from '@/context/LanguageContext';

export default function QA() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [ref, isVisible] = useOnScreen(0.1);

  const faqItems = [
    { question: t('qa.q1'), answer: t('qa.a1') },
    { question: t('qa.q2'), answer: t('qa.a2') },
    { question: t('qa.q3'), answer: t('qa.a3') },
    { question: t('qa.q4'), answer: t('qa.a4') },
    { question: t('qa.q5'), answer: t('qa.a5') },
  ];

  return (
    <section
      id="faq"
      className="py-16 md:py-24 px-4 bg-black border-t relative overflow-hidden"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      ref={ref}
    >


      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
            }}
          >
            {t('qa.label')}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight text-white">
            {t('qa.title')}
          </h2>
          <p className="text-gray-500 text-base">
            {t('qa.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={
                  isVisible
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 24, filter: 'blur(8px)' }
                }
                transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
                className="rounded-xl overflow-hidden"
                style={{
                  background: isOpen ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                  border: isOpen
                    ? '1px solid rgba(255,255,255,0.15)'
                    : '1px solid rgba(255,255,255,0.08)',
                  transition: 'background 0.3s, border-color 0.3s',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-5 md:p-6 flex justify-between items-center gap-4 group"
                >
                  <span
                    className="text-base md:text-lg font-semibold transition-colors duration-300"
                    style={{ color: isOpen ? '#ffffff' : 'rgba(255,255,255,0.85)' }}
                  >
                    {item.question}
                  </span>
                  <motion.span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{
                      background: isOpen
                        ? 'rgba(255,255,255,0.1)'
                        : 'rgba(255,255,255,0.06)',
                    }}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="#ffffff"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M12 5v14M5 12h14"
                      />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 md:px-6 pb-5 text-gray-400 text-sm md:text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
