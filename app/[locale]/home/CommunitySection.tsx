'use client'
import { useParams } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { motion } from 'framer-motion'
import { Github, Calendar, Globe } from 'lucide-react'
import DiscordIcon from '@/components/svgcomponents/discordicon'

const TOPICS = [
  { key: 'topic_1', emoji: '📐' },
  { key: 'topic_2', emoji: '💻' },
  { key: 'topic_3', emoji: '🤖' },
]

const CommunitySection = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'home')

  return (
    <section className="mx-auto py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="mb-6 font-ubuntu text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-5xl">
          {t('community.title')}
        </h2>
        <p className="mx-auto max-w-2xl font-lato text-xl text-gray-700 dark:text-gray-300">
          {t('community.description')}
        </p>
      </motion.div>

      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800/50 md:p-12"
        >
          <h3 className="mb-6 text-center font-ubuntu text-xl font-semibold text-gray-900 dark:text-white">
            {t('community.topics_title')}
          </h3>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {TOPICS.map((topic, index) => (
              <motion.div
                key={topic.key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex flex-col items-center rounded-xl bg-gray-50 p-6 dark:bg-gray-700/50"
              >
                <span className="mb-3 text-3xl">{topic.emoji}</span>
                <span className="font-lato font-medium text-gray-900 dark:text-gray-100">
                  {t(`community.${topic.key}`)}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-2 font-lato text-gray-700 dark:text-gray-300">
              <Calendar className="h-5 w-5 text-primary-500" />
              <span>{t('community.schedule')}</span>
            </div>
            <div className="flex items-center gap-2 font-lato text-gray-700 dark:text-gray-300">
              <Globe className="h-5 w-5 text-primary-500" />
              <span>{t('community.language_note')}</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://discord.gg/VF9QHBBF"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#5865F2] px-6 py-3 font-medium text-white transition-colors hover:bg-[#4752C4]"
            >
              <DiscordIcon className="h-5 w-5" />
              {t('community.discord_cta')}
            </a>
            <a
              href="https://github.com/asanchezyali"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
            >
              <Github className="h-5 w-5" />
              {t('community.github_cta')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CommunitySection
