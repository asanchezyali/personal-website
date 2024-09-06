import React, { useState, useContext } from 'react'
import Pagination from '@/components/Pagination'
import ArticleOverview from '@/components/ArticleOverview'
import metaLabels from '@/data/metaLabels'
import { LanguageContext } from '@/providers/LanguageProvider'

const ListLayout = ({ posts, title, initialDisplayPosts = [], pagination }) => {
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const { language } = useContext(LanguageContext)
  const postsPerPage = 9

  const filteredPosts = posts.filter(
    (frontMatter) => frontMatter.draft !== true && frontMatter.language === language
  )
  const filteredBlogPosts = filteredPosts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredBlogPosts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <>
      <div className="space-y-2 pb-8 pt-2 md:space-y-5">
        <div className="relative max-w-full lg:max-w-lg">
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

        {!filteredBlogPosts.length && <p>No posts found.</p>}

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags, headerImage, time } = frontMatter
            return (
              <li key={slug}>
                <ArticleOverview
                  title={title}
                  summary={summary}
                  date={date}
                  headerImage={headerImage}
                  slug={slug}
                  tags={tags}
                  time={time}
                />
              </li>
            )
          })}
        </ul>
      </div>
      {filteredBlogPosts.length > postsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredBlogPosts.length / postsPerPage)}
          onPageChange={paginate}
        />
      )}
    </>
  )
}

export default ListLayout
