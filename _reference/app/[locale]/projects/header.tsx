'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'app/[locale]/i18n/client'
import { useParams } from 'next/navigation'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'

const ProjectHeader = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'projects')
  return (
    <div className="relative mx-auto max-w-7xl py-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-[65px] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-5xl font-bold text-transparent dark:from-white dark:via-gray-200 dark:to-white sm:text-6xl"
      >
        {t('title')}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-4 text-lg text-gray-600 dark:text-gray-300"
      >
        {t('subtitle')}
      </motion.p>
    </div>
  )
}

export default ProjectHeader
