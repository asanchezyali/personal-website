'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import Image from 'next/image'
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import DiscordIcon from '@/components/svgcomponents/discordicon'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const imageList = Array.from(
  { length: 14 },
  (_, i) => `/images/home/${String(i + 1).padStart(2, '0')}_picture.jpg`
)

const MobileImageGrid = () => {
  return (
    <div className="absolute inset-0 lg:hidden">
      {/* Overlay gradient for better text contrast */}
      {/* No overlay — let the background grid show through */}

      {/* Grid container with smaller images */}
      <div className="absolute inset-0 grid grid-cols-3 gap-1.5 p-2 opacity-70">
        {imageList.slice(0, 9).map((image, index) => (
          <motion.div
            key={image}
            className="relative w-full overflow-hidden rounded-lg"
            style={{
              height: index % 3 === 1 ? '200px' : '180px',
              opacity: index === 4 ? 0.9 : 0.7,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: index === 4 ? 0.9 : 0.7,
              scale: 1,
              y: [0, index % 2 === 0 ? -5 : 5, 0],
            }}
            transition={{
              duration: 2,
              delay: index * 0.1,
              y: {
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              },
            }}
          >
            <motion.div className="absolute inset-0" whileHover={{ scale: 1.05 }}>
              <Image
                src={image}
                alt={`Ambient ${index + 1}`}
                fill
                className="object-cover transition-all duration-500"
                style={{
                  objectPosition: 'center',
                }}
                sizes="(max-width: 640px) 33vw, 120px"
                priority={index === 4}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* No decorative overlay */}
    </div>
  )
}

const PhotoCloud = () => {
  const [mainIndex, setMainIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setMainIndex((prev) => (prev + 1) % imageList.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  if (imageList.length === 0) return null

  return (
    <div className="absolute bottom-0 right-0 top-0 w-full overflow-hidden md:w-1/2">
      {/* No overlay — let the background grid show through */}

      {/* Desktop Photo Cloud */}
      <div className="hidden lg:block">
        {/* Imagen Principal */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={mainIndex}
              initial={{ opacity: 0, scale: 1.1, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -50 }}
              transition={{ duration: 1.2 }}
              className="relative z-30 h-[400px] w-[300px]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src={imageList[mainIndex]}
                  alt="Main"
                  fill
                  className="object-cover shadow-2xl"
                  style={{
                    objectPosition: 'center',
                  }}
                  priority={mainIndex === 0}
                  sizes="(max-width: 768px) 90vw, 300px"
                />
              </div>
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
              const imgIndex = (mainIndex + index + 1) % imageList.length
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
                    src={imageList[imgIndex]}
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

      {/* Mobile and Tablet Image Grid */}
      <MobileImageGrid />
    </div>
  )
}

const HeroSection = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'home')

  return (
    <div className="relative flex min-h-[calc(100vh-84px)] items-center bg-transparent">
      <div className="flex h-full w-full items-center">
        <motion.div
          className="relative z-30 flex w-full max-w-[600px] flex-col justify-center px-4 md:px-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="mb-6 inline-flex items-center self-start rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 dark:border-primary-800 dark:bg-primary-900/20"
            whileHover={{ scale: 1.02 }}
          >
            <span className="mr-2 h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">{t('hero.roll')}</span>
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
            className="mb-8 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <a
              href="https://cal.com/asanchezyali/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
            >
              {t('hero.button_1')}
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
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

            <Link
              href={`/${locale}/collaborate`}
              className="group inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              {t('hero.button_2')}
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19 12L5 12M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
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
              { icon: DiscordIcon, href: 'https://discord.com/invite/RTfBvmm5?event=1470225763084013599' },
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
