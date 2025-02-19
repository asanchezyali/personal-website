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
            className="text-6xl font-bold text-gray-900 dark:text-gray-100"
          >
            {t('title')}
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

        </motion.div>
      </div>
    </div>
  )
}

export default BlogHeader
