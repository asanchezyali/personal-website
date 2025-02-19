'use client'

import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import Image from 'next/image'
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import DiscordIcon from '@/components/svgcomponents/discordicon'

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
    <div className="bg-whitedark:bg-black relative flex min-h-[calc(100vh-84px)] items-center justify-center">
      <motion.div
        className="relative flex w-full flex-col-reverse items-center justify-between gap-12 lg:flex-row lg:gap-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="flex-1 text-center lg:text-left" variants={childVariants}>
          <div className="mb-6 inline-flex items-center rounded-full bg-gray-100 px-4 py-2 dark:bg-gray-800/50">
            <span className="mr-2 h-2 w-2 rounded-full bg-primary-600" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{t('hero.roll')}</span>
          </div>

          <h1 className="mb-6 font-ubuntu text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-5xl">
            {t('hero.title_1')}
          </h1>

          <p className="mb-8 font-lato text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl">
            {t('hero.title_2')}
          </p>

          <div className="mb-8 flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 lg:justify-start">
            <a
              className="group inline-flex w-[180px] items-center rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
              href="https://cal.com/asanchezyali/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('hero.button_1')}
              <svg
                className="ml-2 h-4 w-4 transition-colors group-hover:text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12L5 12M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              className="dark:hover:text-primary-40 group inline-flex w-[180px] items-center rounded-lg bg-gray-200 px-6 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-300 hover:text-primary-600 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              href="https://github.com/asanchezyali/technical-resume/blob/technical-resume/technical_resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              {t('hero.button_2')}
              <svg
                className="ml-2 h-4 w-4 transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <div className="flex items-center justify-center space-x-5 lg:justify-start">
            <a
              href="https://github.com/asanchezyali"
              className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/asanchezyali/"
              className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/asanchezyali"
              className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/asanchezyali/"
              className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://discord.gg/gJ3vCgSWeh"
              className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiscordIcon />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96"
          variants={childVariants}
        >
          <div className="relative h-full w-full overflow-hidden rounded-full shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-300 to-secondary-300 opacity-20 dark:from-primary-600 dark:to-secondary-600 dark:opacity-30"></div>
            <Image
              src="/me.png"
              alt="Profile"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HeroSection
