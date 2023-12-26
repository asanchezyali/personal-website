import React, { useEffect } from 'react'
import fs from 'fs'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { LanguageContext } from '@/providers/LanguageProvider'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths() {
  const posts = getFiles('blog')
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter('blog')
  const allPostsEN = allPosts.filter((frontMatter) => frontMatter.language === 'en')
  const allPostsES = allPosts.filter((frontMatter) => frontMatter.language === 'es')
  const postIndexEN = allPostsEN.findIndex((post) => {
    const formattedSlug = formatSlug(post.slug)
    const joinedSlug = params.slug.join('/')
    return formattedSlug === joinedSlug
  })
  const postIndexES = allPostsES.findIndex((post) => {
    const formattedSlug = formatSlug(post.slug)
    const joinedSlug = params.slug.join('/')
    return formattedSlug === joinedSlug
  })

  let postEnglish, postSpanish

  try {
    params.slug[0] = 'en'
    postEnglish = await getFileBySlug('blog', params.slug.join('/'))
  } catch (error) {
    console.error(`Failed to get English post: ${error}`)
  }

  try {
    params.slug[0] = 'es'
    postSpanish = await getFileBySlug('blog', params.slug.join('/'))
  } catch (error) {
    console.error(`Failed to get Spanish post: ${error}`)
  }

  // If one of the posts doesn't exist, make them equal
  if (!postEnglish) {
    postEnglish = postSpanish
  } else if (!postSpanish) {
    postSpanish = postEnglish
  }

  const authorList = ['default']
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', [author])
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  // rss
  if (allPostsEN.length > 0) {
    const rss = generateRss(allPostsEN)
    fs.writeFileSync('./public/feed.xml', rss)
  }

  if (allPostsES.length > 0) {
    const rss = generateRss(allPostsES)
    fs.writeFileSync('./public/feed.es.xml', rss)
  }

  return {
    props: {
      allPostsEN,
      allPostsES,
      postIndexEN,
      postIndexES,
      postEnglish,
      postSpanish,
      authorDetails,
    },
  }
}

export default function Blog({
  allPostsEN,
  allPostsES,
  postIndexEN,
  postIndexES,
  postEnglish,
  postSpanish,
  authorDetails,
}) {
  const { language } = React.useContext(LanguageContext)
  const postVersion = language === 'en' ? postEnglish : postSpanish
  console.log(postEnglish)
  console.log(postSpanish)
  const postsByLanguage = language === 'en' ? allPostsEN : allPostsES
  const postsNonDraft = postsByLanguage?.filter((frontMatter) => frontMatter.draft !== true)
  const postIndex = language === 'en' ? postIndexEN : postIndexES
  let prev = null
  let next = null
  if (postsNonDraft?.length > 0) {
    prev = postsNonDraft[postIndex + 1] || null
    next = postsNonDraft[postIndex - 1] || null
  }

  const { mdxSource, toc, frontMatter } = postVersion
  const visitedPost = postVersion

  React.useEffect(() => {
    const slug = visitedPost.frontMatter.slug
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      })

    if (visitedPost) {
      registerView()
    }
  }, [visitedPost])

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
