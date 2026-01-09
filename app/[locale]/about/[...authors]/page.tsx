import { Metadata } from 'next'
import { authors as allAuthors } from '#site/content'
import type { Authors } from '#site/content'
import AuthorLayout from '@/layouts/AuthorLayout'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { notFound } from 'next/navigation'
import { MDXContent } from '@/components/mdxcomponents/MDXContent'

type AboutProps = {
  params: Promise<{ authors: string[]; locale: LocaleTypes }>
}

export async function generateMetadata(props: AboutProps): Promise<Metadata | undefined> {
  const params = await props.params
  const { authors, locale } = params
  const authorSlug = decodeURI(authors.join('/'))
  // Velite keeps full path: authors/locale/slug
  const author = allAuthors.find(
    (a) => a.slug === `authors/${locale}/${authorSlug}` && a.language === locale
  ) as Authors
  if (!author) {
    return
  }
  const { t } = await createTranslation(locale, 'about')

  return genPageMetadata({
    title: `${t('about')} ${author.name}`,
    params: { locale: locale },
  })
}

export default async function Page(props: AboutProps) {
  const params = await props.params
  const { authors, locale } = params
  const authorSlug = decodeURI(authors.join('/'))
  // Velite keeps full path: authors/locale/slug
  const author = allAuthors.find(
    (a) => a.slug === `authors/${locale}/${authorSlug}` && a.language === locale
  ) as Authors
  const authorIndex = allAuthors.findIndex(
    (p) => p.slug === `authors/${locale}/${authorSlug}` && p.language === locale
  )
  if (authorIndex === -1) {
    return notFound()
  }

  return (
    <AuthorLayout params={{ locale: locale }} content={author}>
      <MDXContent code={author.content} />
    </AuthorLayout>
  )
}
