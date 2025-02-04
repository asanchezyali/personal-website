'use client'

import { useState } from 'react'
import { useTagStore } from '@/components/util/useTagStore'
import { motion } from 'framer-motion'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/mdxcomponents/Link'
import { sortByDate } from '@/components/util/sortByDate'
import Pagination from './Pagination'
import tagData from 'app/[locale]/tag-data.json'
import { POSTS_PER_PAGE } from '@/data/postsPerPage'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

interface PaginationProps {
  totalPages: number
  currentPage: number
  params: { locale: LocaleTypes }
}

interface ListLayoutProps {
  params: { locale: LocaleTypes }
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.8,
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      duration: 0.3,
    },
  },
}

export default function ListLayoutWithTags({ params: { locale }, posts, title }: ListLayoutProps) {
  const { t } = useTranslation(locale, 'home')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = POSTS_PER_PAGE
  const sortedPosts = sortByDate(posts)

  // Fix 1: Properly handle Zustand state
  const selectedTag = useTagStore((state) => state.selectedTag)
  const setSelectedTag = useTagStore((state) => state.setSelectedTag)

  // Fix 2: Move filtered posts calculation outside of store
  const filteredPosts = selectedTag
    ? sortedPosts.filter((post) => post.tags.includes(selectedTag))
    : sortedPosts

  // Fix 3: Filter posts by locale before pagination
  const localePosts = filteredPosts.filter((post) => post.language === locale)

  const totalPages = Math.ceil(localePosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const displayPosts = localePosts.slice(startIndex, endIndex)

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Fix 4: Simplified tag click handler
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? '' : tag)
    setCurrentPage(1)
  }

  const tagCountMap = tagData[locale]

  return (
    <div className="mx-auto max-w-screen-xl">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {displayPosts.map((post) => {
          const { slug, date, title, summary, tags, headerImage } = post
          return (
            <motion.div
              layout
              variants={item}
              key={slug}
              className="group relative h-[29rem] overflow-hidden rounded-xl bg-white/80 shadow-lg dark:bg-gray-800/40"
            >
              <Link href={`/${locale}/blog/${slug}`} className="block h-full">
                <div className="relative h-[13rem] w-full overflow-hidden">
                  {headerImage ? (
                    <img
                      src={headerImage}
                      alt={title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 dark:bg-gray-700" />
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-white/80 p-4 backdrop-blur-sm dark:bg-gray-800/40">
                  <div className="flex h-full flex-col justify-between">
                    <div className="mb-4 space-y-2">
                      <dl>
                        <dt className="sr-only">{t('pub')}</dt>
                        <dd className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, locale)}</time>
                        </dd>
                      </dl>
                      <h2 className="line-clamp-2 text-lg font-bold text-gray-900 dark:text-white">
                        {title}
                      </h2>
                      {summary && (
                        <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                          {summary}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {tags.slice(0, 3).map((tag) => (
                        <button
                          key={tag}
                          onClick={(e) => {
                            e.preventDefault()
                            handleTagClick(tag)
                          }}
                          className="inline-block rounded-full bg-[#30C5D2]/10 px-4 py-1 text-sm font-medium text-[#30C5D2]"
                        >
                          {tag}
                        </button>
                      ))}
                      {tags.length > 3 && (
                        <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700/50 dark:text-gray-400">
                          +{tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>

      {totalPages > 1 && (
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
            params={{ locale }}
          />
        </motion.div>
      )}
    </div>
  )
}
