import React from 'react'
import Image from '@/components/Image'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import metaLabels from '@/data/metaLabels'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import SocialIcon from '@/components/social-icons'
import { LanguageContext } from '@/providers/LanguageProvider'
import { quotes } from '@/lib/quotes'
import Link from 'next/link'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  return { props: { posts } }
}

export default function Blog({ posts }) {
  const [initialDisplayPosts, setInitialDisplayPosts] = React.useState([])
  const [pagination, setPagination] = React.useState({
    currentPage: 1,
    totalPages: 1,
  })
  const [postByLanguage, setPostByLanguage] = React.useState([])
  const { language } = React.useContext(LanguageContext)

  React.useEffect(() => {
    const filteredPosts = posts.filter(
      (frontMatter) => frontMatter.draft !== true && frontMatter.language === language
    )
    setInitialDisplayPosts(filteredPosts.slice(0, POSTS_PER_PAGE))
    setPagination({
      currentPage: 1,
      totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
    })
    setPostByLanguage(filteredPosts)
  }, [posts, language])

  const { quote, author } = quotes({ language })

  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={postByLanguage}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={metaLabels[language].title}
      />
    </>
  )
}
