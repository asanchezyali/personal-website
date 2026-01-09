import { Metadata } from 'next'
import ListLayout from '@/layouts/ListLayout'
import { sortByDate } from '@/components/util/sortByDate'
import { posts as allBlogs } from '#site/content'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'
import BlogHeader from './header'

type BlogPageProps = {
  params: Promise<{ locale: LocaleTypes }>
}

export async function generateMetadata(props: BlogPageProps): Promise<Metadata> {
  const params = await props.params
  const { locale } = params
  return genPageMetadata({
    title: 'Blog',
    params: { locale: locale },
  })
}

export default async function BlogPage(props: BlogPageProps) {
  const params = await props.params
  const { locale } = params
  const { t } = await createTranslation(locale, 'home')
  const posts = sortByDate(allBlogs as any) as any
  const filteredPosts = posts.filter((post) => post.language === locale)

  return (
    <>
      <BlogHeader />
      <ListLayout params={{ locale: locale }} posts={filteredPosts} title={t('all')} />
    </>
  )
}
