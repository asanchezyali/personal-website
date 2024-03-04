import React from 'react'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import ListLayout from '@/layouts/ListLayout'
import { POSTS_PER_PAGE } from '../..'
import { LanguageContext } from '@/providers/LanguageProvider'

export async function getStaticPaths() {
  const totalPosts = await getAllFilesFrontMatter('blog')
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const {
    params: { page },
  } = context
  const posts = await getAllFilesFrontMatter('blog')
  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      posts,
      pageNumber,
    },
  }
}

export default function PostPage({ posts, pageNumber }) {
  const [postsByLanguage, setPostsByLanguage] = React.useState([])
  const [pagination, setPagination] = React.useState({
    currentPage: 1,
    totalPages: 1,
  })
  const [initialDisplayPosts, setInitialDisplayPosts] = React.useState([])
  const { language } = React.useContext(LanguageContext)

  React.useEffect(() => {
    const filteredPosts = posts.filter(
      (frontMatter) => frontMatter.draft !== true && frontMatter.language === language
    )
    setInitialDisplayPosts(
      filteredPosts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber)
    )
    setPagination({
      currentPage: pageNumber,
      totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
    })
    setPostsByLanguage(filteredPosts)
  }, [posts, language, pageNumber])
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <ListLayout
        posts={postsByLanguage}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
