'use client'
import { motion } from 'framer-motion'
import { useTranslation } from 'app/[locale]/i18n/client'
import { useParams } from 'next/navigation'
import { FileText } from 'lucide-react'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'

interface Milestone {
  year: string
  role: string
  company: string
  description: string
}

const JourneySection = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'collaborate')

  const milestones = t('journey.milestones', { returnObjects: true }) as Milestone[]

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
          {t('journey.title')}
        </h2>
        <p className="mx-auto mb-16 max-w-2xl font-lato text-lg text-gray-600 dark:text-gray-300">
          {t('journey.description')}
        </p>
      </motion.div>

      <div className="relative ml-4 border-l-2 border-primary-200 pl-8 dark:border-primary-800">
        {Array.isArray(milestones) &&
          milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative mb-10 last:mb-0"
            >
              <div className="absolute -left-[calc(2rem+7px)] top-1 h-3 w-3 rounded-full bg-primary-500" />
              <span className="mb-1 block font-lato text-sm font-medium text-primary-600 dark:text-primary-400">
                {milestone.year}
              </span>
              <h3 className="font-ubuntu text-xl font-bold text-gray-900 dark:text-white">
                {milestone.role}{' '}
                <span className="font-normal text-gray-500 dark:text-gray-400">
                  @ {milestone.company}
                </span>
              </h3>
              <p className="mt-1 font-lato text-gray-600 dark:text-gray-300">
                {milestone.description}
              </p>
            </motion.div>
          ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-12 text-center"
      >
        <a
          href="https://github.com/asanchezyali/resume"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
        >
          <FileText className="h-5 w-5" />
          {t('journey.resume_cta')}
        </a>
      </motion.div>
    </div>
  )
}

export default JourneySection
