'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useParams } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import Image from 'next/image'
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import DiscordIcon from '@/components/svgcomponents/discordicon'
import { useRef } from 'react'

const ImageGrid = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const images = Array.from({ length: 14 }, (_, i) => `/images/home/${String(i + 1).padStart(2, '0')}_picture.jpg`)

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent dark:from-black dark:via-black/90 dark:to-transparent z-10" />
      <div className="grid grid-cols-4 gap-4">
        {images.map((src, index) => (
          <motion.div
            key={src}
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, (index % 2 === 0 ? 100 : -100)])
            }}
            className="relative h-40 rounded-lg overflow-hidden opacity-40"
          >
            <Image
              src={src}
              alt={`Grid image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, 20vw"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

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
    <div className="relative flex min-h-[calc(100vh-84px)] items-center">
      <ImageGrid />
      <motion.div
        className="relative z-20 flex w-full flex-col items-start justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="max-w-2xl" variants={childVariants}>
          <div className="mb-6 inline-flex items-center rounded-full bg-gray-100/80 px-4 py-2 backdrop-blur-sm dark:bg-gray-800/50">
            <span className="mr-2 h-2 w-2 rounded-full bg-primary-600" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{t('hero.roll')}</span>
          </div>

          <h1 className="mb-6 font-ubuntu text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            {t('hero.title_1')}
          </h1>

          <p className="mb-8 font-lato text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl">
            {t('hero.title_2')}
          </p>

          <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <a
              className="group inline-flex w-[180px] items-center justify-center rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary-700 hover:shadow-lg dark:bg-primary-500 dark:hover:bg-primary-600"
              href="https://cal.com/asanchezyali/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('hero.button_1')}
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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
              className="group inline-flex w-[180px] items-center justify-center rounded-lg bg-gray-200/80 px-6 py-2.5 text-sm font-medium text-gray-800 backdrop-blur-sm transition-all hover:bg-gray-300 hover:shadow-lg hover:text-primary-600 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              href="https://github.com/asanchezyali/technical-resume/blob/technical-resume/technical_resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              {t('hero.button_2')}
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5"
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

          <div className="flex space-x-5">
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://github.com/asanchezyali"
              className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://www.linkedin.com/in/asanchezyali/"
              className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://x.com/asanchezyali"
              className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://www.instagram.com/asanchezyali/"
              className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://discord.gg/gJ3vCgSWeh"
              className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiscordIcon />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HeroSection
