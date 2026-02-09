'use client'
import { motion } from 'framer-motion'
import { useTranslation } from 'app/[locale]/i18n/client'
import { useParams } from 'next/navigation'
import { Github, Linkedin, Calendar } from 'lucide-react'
import DiscordIcon from '@/components/svgcomponents/discordicon'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'

const channels = [
  {
    key: 'channel_1',
    icon: DiscordIcon,
    link: 'https://discord.gg/VF9QHBBF',
    brandClass:
      'inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#5865F2] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4752C4]',
  },
  {
    key: 'channel_2',
    icon: Github,
    link: 'https://github.com/asanchezyali',
    brandClass:
      'inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
  },
  {
    key: 'channel_3',
    icon: Linkedin,
    link: 'https://www.linkedin.com/in/asanchezyali/',
    brandClass:
      'inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
  },
  {
    key: 'channel_4',
    icon: Calendar,
    link: 'https://cal.com/asanchezyali/30min',
    brandClass:
      'inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
  },
]

const ConnectSection = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'collaborate')

  return (
    <div className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="mb-4 font-ubuntu text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
          {t('connect.title')}
        </h2>
        <p className="mx-auto mb-16 max-w-2xl font-lato text-lg text-gray-600 dark:text-gray-300">
          {t('connect.description')}
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map((channel, index) => {
          const Icon = channel.icon
          return (
            <motion.div
              key={channel.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800/50"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/20">
                <Icon className="h-7 w-7 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="mb-2 font-ubuntu text-lg font-bold text-gray-900 dark:text-white">
                {t(`connect.${channel.key}.name`)}
              </h3>
              <p className="mb-6 text-center font-lato text-sm text-gray-600 dark:text-gray-300">
                {t(`connect.${channel.key}.description`)}
              </p>
              <div className="mt-auto w-full">
                <a
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={channel.brandClass}
                >
                  {t(`connect.${channel.key}.cta`)}
                </a>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default ConnectSection
