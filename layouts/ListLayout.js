import React, { useState, useContext, useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import Pagination from '@/components/Pagination'
import ArticleOverview from '@/components/ArticleOverview'
import metaLabels from '@/data/metaLabels'
import { LanguageContext } from '@/providers/LanguageProvider'

const ListLayout = ({ posts, title, pagination }) => {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [selectedTag, setSelectedTag] = useState(null)
  const [showAllTags, setShowAllTags] = useState(false)
  const { language } = useContext(LanguageContext)
  const postsPerPage = 9

  const [currentPage, setCurrentPage] = useState(pagination.currentPage)

  const filteredPosts = useMemo(() => {
    return posts.filter(
      (frontMatter) => frontMatter.draft !== true && frontMatter.language === language
    )
  }, [posts, language])

  const allTags = useMemo(() => {
    const tagCounts = {}
    filteredPosts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })
    return Object.entries(tagCounts).sort((a, b) => b[1] - a[1])
  }, [filteredPosts])

  const visibleTags = useMemo(() => {
    return showAllTags ? allTags : allTags.slice(0, 5)
  }, [allTags, showAllTags])

  const filteredBlogPosts = useMemo(() => {
    return filteredPosts.filter((frontMatter) => {
      const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
      let matchesSearch = true
      let matchesTag = true

      if (searchValue.startsWith('#')) {
        const tagSearch = searchValue.slice(1).toLowerCase()
        matchesTag = frontMatter.tags.some((tag) => tag.toLowerCase().includes(tagSearch))
      } else if (selectedTag) {
        matchesTag = frontMatter.tags.includes(selectedTag)
        matchesSearch = searchContent.toLowerCase().includes(searchValue.toLowerCase())
      } else {
        matchesSearch = searchContent.toLowerCase().includes(searchValue.toLowerCase())
      }

      return matchesSearch && matchesTag
    })
  }, [filteredPosts, searchValue, selectedTag])

  const totalPages = Math.ceil(filteredBlogPosts.length / postsPerPage)

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    return filteredBlogPosts.slice(indexOfFirstPost, indexOfLastPost)
  }, [filteredBlogPosts, currentPage, postsPerPage])

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    router.push(`/blog/page/${pageNumber}`, undefined, { shallow: true })
  }

  useEffect(() => {
    const page = parseInt(router.query.page) || 1
    setCurrentPage(page)
  }, [router.query.page])

  const handleTagClick = (tag) => {
    if (tag === selectedTag) {
      setSelectedTag(null)
      setSearchValue('')
    } else {
      setSelectedTag(tag)
      setSearchValue(`#${tag}`)
    }
    setCurrentPage(1)
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchValue(value)
    if (value.startsWith('#')) {
      const tagSearch = value.slice(1).toLowerCase()
      const matchedTag = allTags.find(([tag]) => tag.toLowerCase() === tagSearch)
      setSelectedTag(matchedTag ? matchedTag[0] : null)
    } else {
      setSelectedTag(null)
    }
    setCurrentPage(1)
  }

  return (
    <>
      <div className="space-y-2 pb-8 pt-2 md:space-y-5">
        <p className="text-[14px]">
          We're infected by AI here... and we love it! All the content you'll find here has been
          co-created with artificial intelligence, but don't worry, it's all fine-tuned by humans
          and thoroughly reviewed to offer you the best of both worlds.
        </p>
        <div className="relative max-w-full lg:max-w-lg">
          <input
            aria-label="Search articles or tags"
            type="text"
            onChange={handleSearch}
            value={searchValue}
            placeholder={`${metaLabels[language].searchArticles} or #tag`}
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

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Popular Tags</h3>
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              {showAllTags ? 'Show Less' : 'Show All'}
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {visibleTags.map(([tag, count]) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`rounded-full px-3 py-1 text-sm ${
                  selectedTag === tag
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tag} ({count})
              </button>
            ))}
          </div>
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
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
      )}
    </>
  )
}

export default ListLayout
