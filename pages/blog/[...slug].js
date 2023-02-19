import React from 'react'
import useSWR from 'swr'
import fs from 'fs'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { LanguageContext } from '@/providers/LanguageProvider'
import { removeSlashAndPoint } from '@/lib/utils/strings'

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
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === params.slug.join('/'))
  const post = await getFileBySlug('blog', params.slug.join('/'))
  const postInEnglish = await getFileBySlug('blog', params.slug.join('/').replace('.es', '.en'))
  const postInSpanish = await getFileBySlug('blog', params.slug.join('/').replace('.en', '.es'))
  const authorList = post.frontMatter.authors || ['default']
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', [author])
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts)
    fs.writeFileSync('./public/feed.xml', rss)
  }

  return {
    props: { allPosts, post, postIndex, postInEnglish, postInSpanish, authorDetails },
  }
}

export default function Blog({
  allPosts,
  post,
  postIndex,
  postInEnglish,
  postInSpanish,
  authorDetails,
}) {
  const { language } = React.useContext(LanguageContext)
  const getPostVersion = () => {
    const options = {
      en: postInEnglish,
      es: postInSpanish,
      default: post,
    }
    return options[language] || options.default
  }

  const filteredPosts = allPosts?.filter(
    (frontMatter) => frontMatter.draft !== true && frontMatter.language === language
  )

  let prev = null
  let next = null
  if (filteredPosts?.length > 0) {
    prev = filteredPosts[postIndex + 2] || null
    next = filteredPosts[postIndex - 2] || null
  }

  const { mdxSource, toc, frontMatter } = getPostVersion()
  const visitedPost = getPostVersion()
  console.log('visitedPost', visitedPost.frontMatter.slug)

  React.useEffect(() => {
    const slug = removeSlashAndPoint(visitedPost.frontMatter.slug)
    console.log('slug', slug)
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      })

    if (visitedPost) {
      console.log('REGISTER VIEW')
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
