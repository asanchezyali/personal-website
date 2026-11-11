import type { Metadata } from 'next'
import { createTranslation } from '@/i18n/server'
import { LocaleTypes } from '@/i18n/settings'
import siteMetadata from '@/lib/siteMetadata'
import TagsPageClient from '@/features/tags/TagsPageClient'
import tagData from '../tag-data.json'
import { pageAlternates, publicUrl } from '@/lib/publicUrl'

type TagsPageProps = { params: Promise<{ locale: LocaleTypes }> }

export async function generateMetadata(props: TagsPageProps): Promise<Metadata> {
  const { locale } = await props.params
  const { t } = await createTranslation(locale, 'common')
  return {
    title: t('tags'),
    alternates: pageAlternates(locale, 'tags'),
    openGraph: {
      title: t('tags'),
      url: publicUrl(locale, 'tags'),
    },
  }
}

export default async function TagsPage(props: TagsPageProps) {
  const { locale } = await props.params
  const tags = (tagData as Record<string, Record<string, number>>)[locale] || {}
  return <TagsPageClient locale={locale} tags={tags} />
}
