"use client"

import { useState, useEffect } from "react"
import { useTagStore } from "@/components/util/useTagStore"
import { motion } from "framer-motion"
import type { Blog } from "#site/content"
import { sortByDate } from "@/components/util/sortByDate"
import Pagination from "./Pagination"
import tagData from "app/[locale]/tag-data.json"
import { POSTS_PER_PAGE } from "@/data/postsPerPage"
import { useTranslation } from "app/[locale]/i18n/client"
import type { LocaleTypes } from "app/[locale]/i18n/settings"
import BlogCard from "./BlogCard"

interface PaginationProps {
  totalPages: number
  currentPage: number
  params: { locale: LocaleTypes }
}

interface ListLayoutProps {
  params: { locale: LocaleTypes }
  posts: Blog[]
  title: string
  initialDisplayPosts?: Blog[]
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
} as const

const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      duration: 0.3,
    },
  },
}

export default function ListLayoutWithTags({ params: { locale }, posts, title }: ListLayoutProps) {
  // Initialize state with empty values
  const [displayPosts, setDisplayPosts] = useState<Blog[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isClient, setIsClient] = useState(false)

  const { t } = useTranslation(locale, "home")
  const selectedTag = useTagStore((state) => state.selectedTag)
  const setSelectedTag = useTagStore((state) => state.setSelectedTag)

  // Use useEffect to handle client-side operations
  useEffect(() => {
    setIsClient(true)
    // Initial posts setup
    updateDisplayPosts()
  }, [])

  // Update display posts when dependencies change
  useEffect(() => {
    if (isClient) {
      updateDisplayPosts()
    }
  }, [selectedTag, currentPage, locale, isClient])

  const updateDisplayPosts = () => {
    const sortedPosts = sortByDate(posts)
    const filteredPosts = selectedTag ? sortedPosts.filter((post) => post.tags.includes(selectedTag)) : sortedPosts

    const localePosts = filteredPosts.filter((post) => post.language === locale)
    const postsPerPage = POSTS_PER_PAGE
    const startIndex = (currentPage - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage

    setDisplayPosts(localePosts.slice(startIndex, endIndex))
  }

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? "" : tag)
    setCurrentPage(1)
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return null
  }

  const tagCountMap = tagData[locale]
  const totalPages = Math.ceil(posts.filter((post) => post.language === locale).length / POSTS_PER_PAGE)

  return (
    <div className="mx-auto max-w-screen-xl">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {displayPosts.map((post) => (
          <motion.div key={post.slug} variants={item}>
            <BlogCard post={post} locale={locale} onTagClick={handleTagClick} />
          </motion.div>
        ))}
      </motion.div>

      {totalPages > 1 && (
        <motion.div className="mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
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
