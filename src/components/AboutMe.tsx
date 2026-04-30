'use client';

import { motion } from 'framer-motion';
import { useOnScreen } from './useOnScreen';
import { useLanguage } from '@/context/LanguageContext';

const skills = [
  {
    id: 1,
    icon: 'Pr',
    iconColor: '#9999ff',
    title: 'Adobe Premiere Pro',
    description: 'Zaawansowany montaż wideo, udźwiękowienie, color grading oraz dynamiczny montaż pod platformy YouTube i TikTok.',
  },
  {
    id: 2,
    icon: 'Ae',
    iconColor: '#9999ff',
    title: 'Adobe After Effects',
    description: 'Tworzenie zaawansowanych animacji, motion design, VFX oraz dynamicznych efektów wizualnych uatrakcyjniających materiały.',
  },
  {
    id: 3,
    icon: 'Me',
    iconColor: '#9999ff',
    title: 'Adobe Media Encoder',
    description: 'Optymalizacja i renderowanie projektów wideo z zachowaniem najwyższej jakości i najniższej wagi pliku pod odpowiednie platformy.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

export default function AboutMe() {
  const { t } = useLanguage();
  const [ref, isVisible] = useOnScreen(0.15);

  return (
    <section
      id="o-mnie"
      className="py-16 md:py-24 px-4 bg-black relative overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header and Bio */}
        <motion.div
          className="mb-16 max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <motion.h2
            variants={itemVariants} custom={0}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white flex items-baseline gap-1 mb-6 sm:mb-8"
          >
            {t('about.title')}<span style={{ color: '#fff' }}>.</span>
          </motion.h2>

          <motion.div variants={itemVariants} custom={1} className="space-y-4 text-[#a1a1aa] text-lg leading-relaxed">
            <p>
              {t('about.p1')}
            </p>
            <p>
              {t('about.p2')}
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
