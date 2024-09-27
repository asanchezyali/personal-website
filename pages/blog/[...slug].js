import React from 'react'
import fs from 'fs'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { LanguageContext } from '@/providers/LanguageProvider'
import { extractLastSegment } from '@/lib/utils/strings'

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

  // Determine the language from the URL
  const urlLanguage = params.slug[0]

  let postEnglish = null
  let postSpanish = null

  try {
    const slugEN = ['en', ...params.slug.slice(1)]
    postEnglish = await getFileBySlug('blog', slugEN.join('/'))
  } catch (error) {
    console.error(`Failed to get English post: ${error}`)
  }

  try {
    const slugES = ['es', ...params.slug.slice(1)]
    postSpanish = await getFileBySlug('blog', slugES.join('/'))
  } catch (error) {
    console.error(`Failed to get Spanish post: ${error}`)
  }

  // If both posts don't exist, return 404
  if (!postEnglish && !postSpanish) {
    return { notFound: true }
  }

  // If one version doesn't exist, use the other for both
  if (!postEnglish) postEnglish = postSpanish
  if (!postSpanish) postSpanish = postEnglish

  const postsByLanguage = urlLanguage === 'en' ? allPostsEN : allPostsES
  const postIndex = postsByLanguage.findIndex((p) => formatSlug(p.slug) === params.slug.join('/'))

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
      postEnglish,
      postSpanish,
      authorDetails,
      prev: postsByLanguage[postIndex + 1] || null,
      next: postsByLanguage[postIndex - 1] || null,
      urlLanguage,
    },
  }
}

export default function Blog({ postEnglish, postSpanish, authorDetails, prev, next, urlLanguage }) {
  const { language, setLanguage } = React.useContext(LanguageContext)
  const [currentLanguage, setCurrentLanguage] = React.useState(urlLanguage)

  React.useEffect(() => {
    setLanguage(urlLanguage)
    setCurrentLanguage(urlLanguage)
  }, [urlLanguage, setLanguage])

  React.useEffect(() => {
    setCurrentLanguage(language)
  }, [language])

  const post = currentLanguage === 'en' ? postEnglish : postSpanish
  const { mdxSource, toc, frontMatter } = post

  // Check if both language versions are actually different
  const hasBothVersions = postEnglish.frontMatter.language !== postSpanish.frontMatter.language

  React.useEffect(() => {
    const slug = frontMatter.slug
    const articleName = extractLastSegment(slug)
    const registerView = () =>
      fetch(`/api/views/${articleName}`, {
        method: 'POST',
      })

    registerView()
  }, [frontMatter.slug])

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
          hasBothVersions={hasBothVersions}
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
