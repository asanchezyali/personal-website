'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useRouter, useParams } from 'next/navigation'
import { LocaleTypes } from '../i18n/settings'
import { useTagStore } from '@/components/util/useTagStore'
import { useCallback } from 'react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

function TagCard({ tag, count, locale }: { tag: string; count: number; locale: string }) {
  const router = useRouter()
  const { setSelectedTag, selectedTag } = useTagStore()

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      // If the tag is already selected, deselect it
      if (selectedTag === tag) {
        setSelectedTag('')
      } else {
        setSelectedTag(tag)
      }
      // Navigate to blog after updating the state
      router.push(`/${locale}/blog`)
    },
    [tag, selectedTag, setSelectedTag, router, locale]
  )

  // Determine if this tag is selected
  const isSelected = selectedTag === tag

  return (
    <motion.div variants={item} className="group">
      <button
        onClick={handleClick}
        className={`relative block w-full overflow-hidden rounded-xl ${
          isSelected
            ? 'bg-primary-500/20 dark:bg-primary-500/30'
            : 'bg-white/80 dark:bg-gray-800/40'
        } p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-primary-500/10 opacity-0 transition-opacity group-hover:opacity-100 dark:from-cyan-500/5 dark:via-transparent dark:to-primary-500/5" />
        <div className="relative flex items-center justify-between">
          <span
            className={`text-lg font-medium ${
              isSelected
                ? 'text-primary-700 dark:text-primary-300'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {tag}
          </span>
          <span
            className={`ml-2 rounded-full ${
              isSelected
                ? 'bg-primary-500/20 text-primary-700 dark:bg-primary-500/30 dark:text-primary-300'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            } px-2.5 py-1 text-sm font-medium`}
          >
            {count}
          </span>
        </div>
      </button>
    </motion.div>
  )
}

export default function Tags() {
  const locale = useParams()?.locale as LocaleTypes
  const tagData = require(`app/[locale]/tag-data.json`)
  const tagCounts = tagData[locale]
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <>
      {/* Header */}
      <div className="relative mx-auto max-w-7xl py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h-[65px] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-5xl font-bold text-transparent dark:from-white dark:via-gray-200 dark:to-white sm:text-6xl"
        >
          Explore Our Tags
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg text-gray-600 dark:text-gray-300"
        >
          Discover content through our curated collection of topics
        </motion.p>
      </div>

      {/* Tags Grid */}
      <div className="mx-auto max-w-7xl pb-20">
        {sortedTags.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">No tags found.</div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {sortedTags.map((tag) => (
              <TagCard key={tag} tag={tag} count={tagCounts[tag]} locale={locale} />
            ))}
          </motion.div>
        )}
      </div>
    </>
  )
}
