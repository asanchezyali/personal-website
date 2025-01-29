import { Metadata } from 'next'
import Project from './project'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'

import ProjectHeader from './header'

type ProjectsProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: ProjectsProps): Promise<Metadata> {
  const { t } = await createTranslation(locale, 'projects')
  return genPageMetadata({
    title: t('title'),
    params: { locale: locale },
  })
}

export default async function Projects({ params: { locale } }: ProjectsProps) {
  const { t } = await createTranslation(locale, 'projects')
  return (
    <>
      <ProjectHeader />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="container flex justify-center">
          <div className="flex w-full flex-wrap">
            <Project />
          </div>
        </div>
      </div>
    </>
  )
}
