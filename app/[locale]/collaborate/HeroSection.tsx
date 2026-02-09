'use client'
import { motion } from 'framer-motion'
import { useTranslation } from 'app/[locale]/i18n/client'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Github, Linkedin } from 'lucide-react'
import DiscordIcon from '@/components/svgcomponents/discordicon'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'

const floatingTags = [
  { label: 'React', top: '8%', left: '55%', delay: 0 },
  { label: 'Python', top: '18%', right: '5%', delay: 0.8 },
  { label: 'AI/ML', bottom: '20%', left: '52%', delay: 1.2 },
  { label: 'LLMs', bottom: '10%', right: '8%', delay: 0.4 },
]

const HeroSection = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'collaborate')

  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      <div className="relative z-10 grid items-center gap-12 md:grid-cols-2 lg:gap-20">
        {/* Text side */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 dark:border-primary-800 dark:bg-primary-900/20"
          >
            <span className="mr-2 h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              {locale === 'es' ? 'Abierto a colaborar' : 'Open to collaborate'}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl lg:text-7xl"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 max-w-lg font-lato text-xl leading-relaxed text-gray-600 dark:text-gray-300"
          >
            {t('hero.description')}
          </motion.p>

          {/* Social row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex items-center gap-4"
          >
            {[
              {
                icon: DiscordIcon,
                href: 'https://discord.gg/VF9QHBBF',
                className:
                  'bg-[#5865F2] text-white hover:bg-[#4752C4]',
              },
              {
                icon: Github,
                href: 'https://github.com/asanchezyali',
                className:
                  'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/15',
              },
              {
                icon: Linkedin,
                href: 'https://www.linkedin.com/in/asanchezyali/',
                className:
                  'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/15',
              },
            ].map((social) => (
              <motion.a
                key={social.href}
                whileHover={{ scale: 1.05, y: -2 }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${social.className}`}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Illustration side */}
        <div className="relative flex justify-center">
          {/* Floating tech tags */}
          {floatingTags.map((tag) => (
            <motion.span
              key={tag.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { duration: 0.4, delay: 0.8 + tag.delay },
                scale: { duration: 0.4, delay: 0.8 + tag.delay },
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: tag.delay },
              }}
              className="absolute z-20 hidden rounded-full border border-primary-200/50 bg-white/80 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm backdrop-blur-sm dark:border-primary-700/50 dark:bg-gray-800/80 dark:text-gray-300 md:block"
              style={{ top: tag.top, left: tag.left, right: tag.right, bottom: tag.bottom }}
            >
              {tag.label}
            </motion.span>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative aspect-[3/4] w-64 sm:w-72 md:w-80 lg:w-[22rem]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
              <Image
                src="/yali.png"
                alt="Alejandro Sánchez Yalí"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 352px"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
