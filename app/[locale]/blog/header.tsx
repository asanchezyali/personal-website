'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'app/[locale]/i18n/client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Tag } from 'lucide-react'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'

const BlogHeader = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'blog')

  return (
    <div className="relative mx-auto max-w-7xl py-20">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-5xl font-bold text-transparent dark:from-white dark:via-gray-200 dark:to-white sm:text-6xl"
          >
            {t('title_part_1')}
            <br />
            {t('title_part_2')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          >
            {t('description')}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href={`/${locale}/tags`}
            className="group flex items-center gap-2 rounded-lg border border-gray-200 bg-white/50 px-4 py-2 text-sm font-medium text-gray-600 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-600 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:border-primary-500 dark:hover:bg-primary-950 dark:hover:text-primary-400"
          >
            <Tag className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            Explore Tags
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default BlogHeader
