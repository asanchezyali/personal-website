'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import Image from 'next/image'
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import DiscordIcon from '@/components/svgcomponents/discordicon'
import { useState, useEffect } from 'react'

const PhotoCloud = () => {
  const [mainIndex, setMainIndex] = useState(0)
  const images = Array.from(
    { length: 14 },
    (_, i) => `/images/home/${String(i + 1).padStart(2, '0')}_picture.jpg`
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setMainIndex((prev) => (prev + 1) % images.length)
    }, 10000) // Aumentado a 15 segundos
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute bottom-0 right-0 top-0 w-1/2 overflow-hidden">
      <div className="absolute inset-0 z-20 bg-gradient-to-l from-transparent via-white/60 to-white/95 dark:via-black/60 dark:to-black/95" />

      {/* Imagen Principal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={mainIndex}
            initial={{ opacity: 0, scale: 1.1, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -50 }}
            transition={{ duration: 1.2 }}
            className="relative z-30 h-[400px] w-auto overflow-hidden rounded-2xl"
            style={{ minWidth: '300px', maxWidth: '500px' }}
          >
            <Image
              src={images[mainIndex]}
              alt="Main"
              fill
              className="object-contain shadow-2xl"
              priority={mainIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Imágenes Flotantes */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[
            { top: '15%', right: '15%', size: 'w-32 h-40' },
            { top: '25%', right: '55%', size: 'w-36 h-44' },
            { top: '60%', right: '20%', size: 'w-32 h-40' },
            { top: '45%', right: '45%', size: 'w-28 h-36' },
            { top: '70%', right: '40%', size: 'w-32 h-40' },
          ].map((pos, index) => {
            const imgIndex = (mainIndex + index + 1) % images.length
            return (
              <motion.div
                key={`${pos.top}-${pos.right}`}
                className={`absolute ${pos.size} z-10`}
                style={{ top: pos.top, right: pos.right }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 0.4,
                  y: [0, 8, 0],
                  transition: {
                    y: { repeat: Infinity, duration: 3, ease: 'easeInOut', delay: index * 0.5 },
                  },
                }}
              >
                <Image
                  src={images[imgIndex]}
                  alt={`Float ${index}`}
                  fill
                  className="rounded-xl object-cover"
                  style={{ objectPosition: 'center' }}
                  sizes="(max-width: 1024px) 25vw, 20vw"
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const HeroSection = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'home')

  return (
    <div className="relative flex h-[calc(100vh-84px)] items-center bg-transparent">
      <div className="flex h-full w-full items-center">
        <motion.div
          className="relative z-30 flex max-w-[600px] flex-col justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="mb-6 inline-flex items-center self-start rounded-full bg-gray-100 px-3 py-1.5 backdrop-blur-sm transition-colors hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15"
            whileHover={{ scale: 1.02 }}
          >
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary-500" />
            <span className="text-sm text-gray-600 dark:text-white/90">{t('hero.roll')}</span>
          </motion.div>

          <motion.h1
            className="mb-6 font-ubuntu text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t('hero.title_1')}
          </motion.h1>

          <motion.p
            className="mb-8 font-lato text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {t('hero.title_2')}
          </motion.p>

          <motion.div
            className="mb-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.a
              whileHover={{ scale: 1.02 }}
              className="group inline-flex w-[180px] items-center justify-center rounded-xl bg-primary-500 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary-600 dark:hover:bg-primary-400"
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
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              className="group inline-flex w-[180px] items-center justify-center rounded-xl bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-900 backdrop-blur-sm transition-all hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
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
            </motion.a>
          </motion.div>

          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {[
              { icon: Github, href: 'https://github.com/asanchezyali' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/asanchezyali/' },
              { icon: Twitter, href: 'https://x.com/asanchezyali' },
              { icon: Instagram, href: 'https://www.instagram.com/asanchezyali/' },
              { icon: DiscordIcon, href: 'https://discord.gg/gJ3vCgSWeh' },
            ].map((social, index) => (
              <motion.a
                key={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                href={social.href}
                className="text-gray-600 transition-colors hover:text-primary-600 dark:text-white/70 dark:hover:text-primary-400"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        <PhotoCloud />
      </div>
    </div>
  )
}

export default HeroSection
