import 'css/prism.css'
import 'katex/dist/katex.css'
import { Metadata } from 'next'
import { sortByDate } from '@/components/util/sortByDate'
import { posts as allBlogs, authors as allAuthors } from '#site/content'
import type { Authors, Blog } from '#site/content'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import siteMetadata from '@/data/siteMetadata'
import { maintitle } from '@/data/localeMetadata'
import { notFound } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { MDXContent } from '@/components/mdxcomponents/MDXContent'

interface BlogPageProps {
  params: Promise<{ slug: string[]; locale: LocaleTypes }>
}

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

async function getPostFromParams(props: BlogPageProps): Promise<any> {
  const params = await props.params
  const { slug, locale } = params
  const dslug = decodeURI(slug.join('/'))
  // Velite keeps full path: blog/locale/slug
  const post = allBlogs
    .filter((p) => p.language === locale)
    .find((p) => p.slug === `blog/${locale}/${dslug}`) as Blog

  if (!post) {
    return null
  }

  if (post?.series) {
    const seriesPosts = allBlogs
      .filter((p) => p.language === locale && p.series?.title === post.series?.title)
      .sort((a, b) => Number(a.series!.order) - Number(b.series!.order))
      .map((p) => {
        return {
          title: p.title,
          slug: p.slug,
          language: p.language,
          isCurrent: p.slug === post.slug,
        }
      })
    if (seriesPosts.length > 0) {
      return { ...post, series: { ...post.series, posts: seriesPosts } }
    }
  }

  return post
}

export async function generateMetadata(props: BlogPageProps): Promise<Metadata | undefined> {
  const params = await props.params
  const { slug, locale } = params
  const dslug = decodeURI(slug.join('/'))
  const post = allBlogs.find(
    (p) => p.slug === `blog/${locale}/${dslug}` && p.language === locale
  ) as Blog
  if (!post) {
    return
  }
  const author = allAuthors.filter((a) => a.language === locale).find((a) => a.default === true)
  const authorList = post.authors || [author]
  const authorDetails = authorList
    .map((authorSlug) => {
      const authorResults = allAuthors
        .filter((a) => a.language === locale)
        .find((a) => a.slug.includes(authorSlug as string))
      return authorResults as Authors
    })
    .filter((a): a is Authors => a !== undefined)

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: maintitle[locale],
      locale: post.language,
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  const paths = allBlogs.map((p) => ({
    locale: p.language,
    slug: p.slug.split('/').slice(2), // Remove 'blog/locale' from slug
  }))
  return paths
}

export default async function Page(props: BlogPageProps) {
  const params = await props.params
  const { slug, locale } = params
  const dslug = decodeURI(slug.join('/'))

  // Filter out drafts in production + locale filtering
  const sortedPosts = sortByDate(allBlogs.filter((p) => p.language === locale)) as Blog[]
  const postIndex = sortedPosts.findIndex((p) => p.slug === `blog/${locale}/${dslug}`)

  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedPosts[postIndex + 1]
  const next = sortedPosts[postIndex - 1]
  const post = await getPostFromParams(props)

  if (!post) {
    return notFound()
  }

  const author = allAuthors.filter((a) => a.language === locale).find((a) => a.default === true)
  const authorList = post.authors || [author]
  const authorDetails = authorList
    .map((authorSlug) => {
      const authorResults = allAuthors
        .filter((a) => a.language === locale)
        .find((a) => a.slug.includes(authorSlug as string))
      return authorResults as Authors
    })
    .filter((a): a is Authors => a !== undefined)

  const jsonLd = post.structuredData
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })

  const Layout = layouts[post.layout || defaultLayout]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout
        content={post}
        authorDetails={authorDetails}
        next={next}
        prev={prev}
        params={{ locale: locale }}
      >
        <MDXContent code={post.content} toc={post.toc} />
      </Layout>
    </>
  )
}
