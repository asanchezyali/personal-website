import { Metadata } from 'next'
import Project from './project'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'
import ProjectHeader from './header'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allProjects } from 'contentlayer/generated'

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
  const projects = allCoreContent(sortPosts(allProjects))
  const filteredProjects = projects.filter((project) => project.language === locale)
  return (
    <>
      <ProjectHeader />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="container flex justify-center">
          <div className="flex w-full flex-wrap">
            {filteredProjects.map((project) => (
              <div key={project.slug} className="w-full md:w-1/2 lg:w-1/3 p-4">
                <div className="border rounded-lg p-4 h-full flex flex-col">
                  <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                  <p className="text-gray-500 text-sm mb-2">{project.date}</p>
                  <p className="mb-2">{project.summary}</p>
                  <div className="text-xs text-gray-400 mb-2">
                    slug: {project.slug} <br />
                    href: /{project.language}/projects/{project.slug}
                  </div>
                  {project.showReadMore && (
                    <a
                      href={`/${project.language}/projects/${project.slug}`}
                      className="mt-auto inline-block text-blue-600 hover:underline font-semibold"
                    >
                      Leer más
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
