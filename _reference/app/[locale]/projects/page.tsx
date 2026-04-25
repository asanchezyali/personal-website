import { Metadata } from 'next'
import Project from './project'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'

import ProjectHeader from './header'

type ProjectsProps = {
  params: Promise<{ locale: LocaleTypes }>
}

export async function generateMetadata(props: ProjectsProps): Promise<Metadata> {
  const params = await props.params
  const { locale } = params
  const { t } = await createTranslation(locale, 'projects')
  return genPageMetadata({
    title: t('title'),
    params: { locale: locale },
  })
}

export default async function Projects(props: ProjectsProps) {
  const params = await props.params
  const { locale } = params
  const { t } = await createTranslation(locale, 'projects')
  return (
    <>
      <ProjectHeader />
      <div className="container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Project />
        </div>
      </div>
    </>
  )
}
