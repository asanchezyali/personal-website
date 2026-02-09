'use client'
import { useParams } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import Image from 'next/image'
import DiscordIcon from '@/components/svgcomponents/discordicon'

const CommunityBanner = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'collaborate')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-16 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800/50 md:p-12"
    >
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-8">
        {/* Avatar */}
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-primary-200 dark:ring-primary-800">
          <Image
            src="/avatar-v2.jpeg"
            alt="Alejandro Sánchez Yalí"
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="mb-3 font-ubuntu text-2xl font-bold text-gray-900 dark:text-white">
            {t('community.title')}
          </h3>
          <p className="font-lato text-gray-600 dark:text-gray-300">
            {t('community.description')}
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
          <a
            href="https://discord.gg/VF9QHBBF"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5865F2] px-6 py-3 font-medium text-white transition-colors hover:bg-[#4752C4]"
          >
            <DiscordIcon className="h-5 w-5" />
            {t('community.discord_cta')}
          </a>
          <a
            href="https://github.com/asanchezyali"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
          >
            <Github className="h-5 w-5" />
            {t('community.github_cta')}
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default CommunityBanner
