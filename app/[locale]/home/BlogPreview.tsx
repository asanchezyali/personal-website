'use client'
import { useParams } from 'next/navigation'
import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { useTranslation } from '../i18n/client'
import { LocaleTypes } from '../i18n/settings'

export default function BlogPreview() {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'home')
  const posts = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = posts.filter((post) => post.language === locale)

  return (
    <>
      <ListLayout params={{ locale: locale }} posts={filteredPosts.slice(0, 6)} title={t('all')} />
    </>
  )
}