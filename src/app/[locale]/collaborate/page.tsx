import type { Metadata } from 'next'
import { createTranslation } from '@/i18n/server'
import { LocaleTypes } from '@/i18n/settings'
import siteMetadata from '@/lib/siteMetadata'
import CollaboratePage from '@/features/collaborate/CollaboratePage'

type CollaboratePageProps = { params: Promise<{ locale: LocaleTypes }> }

export async function generateMetadata(props: CollaboratePageProps): Promise<Metadata> {
  const { locale } = await props.params
  const { t } = await createTranslation(locale, 'collaborate')
  return {
    title: t('hero.title'),
    description: t('hero.description'),
    openGraph: {
      title: t('hero.title'),
      description: t('hero.description'),
      url: `${siteMetadata.siteUrl}/${locale === 'en' ? '' : locale + '/'}collaborate`,
    },
  }
}

export default async function Collaborate(props: CollaboratePageProps) {
  const { locale } = await props.params
  return <CollaboratePage locale={locale} />
}
