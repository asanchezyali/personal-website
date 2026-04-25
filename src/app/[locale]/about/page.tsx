import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createTranslation } from '@/i18n/server'
import { LocaleTypes } from '@/i18n/settings'
import siteMetadata from '@/lib/siteMetadata'
import AboutPage from '@/features/about/AboutPage'
import { MDXContent } from '@/shared/mdx/MDXContent'
import { authors } from '#site/content'

type AboutPageProps = { params: Promise<{ locale: LocaleTypes }> }

export async function generateMetadata(props: AboutPageProps): Promise<Metadata> {
  const { locale } = await props.params
  const { t } = await createTranslation(locale, 'about')
  return {
    title: t('about'),
    openGraph: {
      title: t('about'),
      url: `${siteMetadata.siteUrl}/${locale === 'en' ? '' : locale + '/'}about`,
    },
  }
}

export default async function About(props: AboutPageProps) {
  const { locale } = await props.params

  const author = authors.find((a) => a.language === locale && a.default !== false)
    || authors.find((a) => a.language === locale)
    || authors[0]

  if (!author) notFound()

  return (
    <AboutPage author={author} locale={locale}>
      <MDXContent code={author.content} />
    </AboutPage>
  )
}
