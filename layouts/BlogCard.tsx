'use client'

import { useState } from 'react'
import Link from '@/components/mdxcomponents/Link'
import { formatDate } from 'pliny/utils/formatDate'
import type { Blog } from '#site/content'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'

interface BlogCardProps {
  post: Blog
  locale: LocaleTypes
  onTagClick: (tag: string) => void
}

export default function BlogCard({ post, locale, onTagClick }: BlogCardProps) {
  const [showAllTags, setShowAllTags] = useState(false)

  const visibleTags = showAllTags ? post.tags : post.tags.slice(0, 3)
  const remainingTags = post.tags.length - 3

  // Extract just the post slug from Velite's slug format (blog/locale/slug)
  const postSlug = post.slug.split('/').slice(2).join('/')

  return (
    <div className="group relative h-full overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
      <Link href={`/${locale}/blog/${postSlug}`} className="block h-full">
        <div className="relative h-48 w-full overflow-hidden">
          {post.headerImage ? (
            <img
              src={post.headerImage || '/placeholder.svg'}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 dark:bg-gray-700" />
          )}
        </div>
        <div className="p-4">
          <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          </div>
          <h2 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 dark:text-white">
            {post.title}
          </h2>
          {post.summary && (
            <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
              {post.summary}
            </p>
          )}
          <div className={`${showAllTags ? 'mt-4' : ''}`}>
            <div className={`flex flex-wrap gap-2 ${showAllTags ? '' : 'h-8 overflow-hidden'}`}>
              {visibleTags.map((tag) => (
                <button
                  key={tag}
                  onClick={(e) => {
                    e.preventDefault()
                    onTagClick(tag)
                  }}
                  className="inline-block rounded-md bg-primary-100 px-2 py-1 text-xs font-medium text-primary-600 transition-colors hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-900/50"
                >
                  {tag}
                </button>
              ))}
              {!showAllTags && remainingTags > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setShowAllTags(true)
                  }}
                  className="inline-block rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                >
                  +{remainingTags}
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
