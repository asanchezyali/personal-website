import type { Metadata } from 'next'
import { createTranslation } from '@/i18n/server'
import { LocaleTypes } from '@/i18n/settings'
import siteMetadata from '@/lib/siteMetadata'
import CoursesIndex from '@/features/courses/CoursesIndex'
import { pageAlternates, publicUrl } from '@/lib/publicUrl'

type Props = { params: Promise<{ locale: LocaleTypes }> }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const { t } = await createTranslation(locale, 'courses')
  return {
    title: t('hero.title_pre') + t('hero.title_accent'),
    description: t('hero.lead'),
    alternates: pageAlternates(locale, 'courses'),
    openGraph: {
      title: t('hero.title_pre') + t('hero.title_accent'),
      description: t('hero.lead'),
      url: publicUrl(locale, 'courses'),
    },
  }
}

export default async function Courses(props: Props) {
  const { locale } = await props.params
  return <CoursesIndex locale={locale} />
}
