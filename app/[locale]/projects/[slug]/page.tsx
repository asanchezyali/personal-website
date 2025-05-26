import { notFound } from 'next/navigation'
import { allProjects } from 'contentlayer/generated'
import { useMDXComponent } from 'pliny/mdx-components'
import { Metadata } from 'next'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from '../../i18n/server'
import { LocaleTypes } from '../../i18n/settings'

interface ProjectPageProps {
  params: { locale: LocaleTypes; slug: string }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = allProjects.find(
    (p) => p.slug === params.slug && p.language === params.locale
  )
  if (!project) return notFound()
  return genPageMetadata({
    title: project.title,
    params: { locale: params.locale },
  })
}

function ProjectContent({ project }: { project: any }) {
  const MDXContent = useMDXComponent(project.body.code)
  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto py-8">
      <h1 className="mb-2">{project.title}</h1>
      <p className="text-gray-500 text-sm mb-4">{project.date}</p>
      <MDXContent />
    </article>
  )
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = allProjects.find(
    (p) => p.slug === params.slug && p.language === params.locale
  )
  if (!project) return notFound()
  return <ProjectContent project={project} />
} 