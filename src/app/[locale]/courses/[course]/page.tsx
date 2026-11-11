import type { Metadata } from 'next'
import { LocaleTypes } from '@/i18n/settings'
import siteMetadata from '@/lib/siteMetadata'
import CourseOverview from '@/features/courses/CourseOverview'
import { getCourse, getCourses } from '@/features/courses/lib'
import { pageAlternates, publicUrl } from '@/lib/publicUrl'

type Props = { params: Promise<{ locale: LocaleTypes; course: string }> }

export async function generateStaticParams() {
  return (['en', 'es'] as const).flatMap((locale) =>
    getCourses(locale).map((c) => ({ locale, course: c.courseSlug }))
  )
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, course } = await props.params
  const found = getCourse(locale, course)
  if (!found) return {}
  return {
    title: found.title,
    description: found.summary,
    alternates: pageAlternates(locale, `courses/${course}`),
    openGraph: {
      title: found.title,
      description: found.summary,
      url: publicUrl(locale, `courses/${course}`),
    },
  }
}

export default async function CoursePage(props: Props) {
  const { locale, course } = await props.params
  return <CourseOverview locale={locale} courseSlug={course} />
}
