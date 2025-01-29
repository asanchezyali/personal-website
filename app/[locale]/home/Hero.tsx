'use client'

import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Calendly from '@/components/formspree/Calendly'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'

const HeroSection = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'home')
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  }

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  return (
    <section className="flex min-h-screen items-center">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={childVariants}>
            <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl">
              {t('hero.title_part1')} <br />
              {t('hero.title_part2')}{' '}
              <span className="text-gradient-fallback bg-gradient-to-r from-[#30C5D2] to-[#9821e2] bg-clip-text text-transparent">
                {t('hero.title_part3')}
              </span>
            </h1>
          </motion.div>

          <motion.div variants={childVariants}>
            <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              {t('hero.description')}
            </p>
          </motion.div>

          <motion.div variants={childVariants} className="relative z-10">
            <div className="inline-block">
              <Calendly buttonText={t('hero.contact_button')} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
