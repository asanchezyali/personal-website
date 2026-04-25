import type { Metadata } from 'next'
import { createTranslation } from '@/i18n/server'
import { LocaleTypes } from '@/i18n/settings'
import siteMetadata from '@/lib/siteMetadata'
import BlogPageClient from '@/features/blog/BlogPageClient'
import { posts } from '#site/content'
import tagData from '../tag-data.json'

type BlogPageProps = { params: Promise<{ locale: LocaleTypes }> }

export async function generateMetadata(props: BlogPageProps): Promise<Metadata> {
  const { locale } = await props.params
  const { t } = await createTranslation(locale, 'blog')
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteMetadata.siteUrl}/${locale === 'en' ? '' : locale + '/'}blog`,
    },
  }
}

export default async function BlogPage(props: BlogPageProps) {
  const { locale } = await props.params
  const tags = (tagData as Record<string, Record<string, number>>)[locale] || {}

  return <BlogPageClient locale={locale} posts={posts} tags={tags} />
}
