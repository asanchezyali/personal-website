import React from 'react'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import ArticleOverview from '@/components/ArticleOverview'
import metaLabels from '@/data/metaLabels'
import { LanguageContext } from '@/providers/LanguageProvider'

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')
  const { language } = React.useContext(LanguageContext)

  const filteredPosts = posts.filter(
    (frontMatter) => frontMatter.draft !== true && frontMatter.language === language
  )
  const filteredBlogPosts = filteredPosts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="space-y-2 pb-8 md:space-y-5">
        <div className="relative max-w-lg">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={metaLabels[language].searchArticles}
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
          />
          <svg
            className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <ul>
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags, headerImage, time } = frontMatter
            return (
              <ArticleOverview
                key={slug}
                title={title}
                summary={summary}
                date={date}
                headerImage={headerImage}
                slug={slug}
                tags={tags}
                time={time}
              />
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
