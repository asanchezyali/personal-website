import 'katex/dist/katex.css'
import 'styles/prism.css'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LocaleTypes } from '@/i18n/settings'
import siteMetadata from '@/lib/siteMetadata'
import PostLayout from '@/features/blog/PostLayout'
import { MDXContent } from '@/shared/mdx/MDXContent'
import { posts, authors } from '#site/content'

type SlugPageProps = {
  params: Promise<{ locale: LocaleTypes; slug: string[] }>
}

function findPost(locale: LocaleTypes, slugParts: string[]) {
  const slugSuffix = slugParts.join('/')
  return posts.find(
    (p) => p.language === locale && p.slug.endsWith(slugSuffix)
  )
}

export async function generateStaticParams() {
  return posts.map((post) => {
    const localePart = post.slug.match(/^blog\/([a-z]{2})\//)?.[1] || 'en'
    const slugParts = post.slug.replace(/^blog\/[a-z]{2}\//, '').split('/')
    return { locale: localePart, slug: slugParts }
  })
}

export async function generateMetadata(props: SlugPageProps): Promise<Metadata> {
  const { locale, slug } = await props.params
  const post = findPost(locale, slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.headerImage ? [post.headerImage] : [siteMetadata.socialBanner],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
  }
}

export default async function PostPage(props: SlugPageProps) {
  const { locale, slug } = await props.params
  const post = findPost(locale, slug)
  if (!post) notFound()

  // Find author
  const authorSlug = post.authors?.[0] || 'yali'
  const author = authors.find(
    (a) => a.language === locale && a.slug.endsWith(authorSlug)
  ) || authors.find((a) => a.slug.endsWith(authorSlug)) || authors[0]

  if (!author) notFound()

  // Prev / next in same locale
  const localePostsSorted = posts
    .filter((p) => p.language === locale && !p.draft)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const idx = localePostsSorted.findIndex((p) => p.slug === post.slug)
  const prev = idx > 0 ? localePostsSorted[idx - 1] : null
  const next = idx < localePostsSorted.length - 1 ? localePostsSorted[idx + 1] : null

  return (
    <PostLayout
      content={post}
      author={author}
      locale={locale}
      prev={prev ? { slug: prev.slug, title: prev.title } : null}
      next={next ? { slug: next.slug, title: next.title } : null}
    >
      <MDXContent code={post.content} toc={post.toc} />
    </PostLayout>
  )
}
