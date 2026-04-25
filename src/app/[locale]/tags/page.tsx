import type { Metadata } from 'next'
import { createTranslation } from '@/i18n/server'
import { LocaleTypes } from '@/i18n/settings'
import siteMetadata from '@/lib/siteMetadata'
import TagsPageClient from '@/features/tags/TagsPageClient'
import tagData from '../tag-data.json'

type TagsPageProps = { params: Promise<{ locale: LocaleTypes }> }

export async function generateMetadata(props: TagsPageProps): Promise<Metadata> {
  const { locale } = await props.params
  const { t } = await createTranslation(locale, 'common')
  return {
    title: t('tags'),
    openGraph: {
      title: t('tags'),
      url: `${siteMetadata.siteUrl}/${locale === 'en' ? '' : locale + '/'}tags`,
    },
  }
}

export default async function TagsPage(props: TagsPageProps) {
  const { locale } = await props.params
  const tags = (tagData as Record<string, Record<string, number>>)[locale] || {}
  return <TagsPageClient locale={locale} tags={tags} />
}
