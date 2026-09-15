import type { Metadata } from 'next'
import { LocaleTypes } from '@/i18n/settings'
import siteMetadata from '@/lib/siteMetadata'
import LessonView from '@/features/courses/LessonView'
import { getCourses, getLesson, getLessons } from '@/features/courses/lib'

type Props = { params: Promise<{ locale: LocaleTypes; course: string; lesson: string }> }

export async function generateStaticParams() {
  return (['en', 'es'] as const).flatMap((locale) =>
    getCourses(locale).flatMap((c) =>
      getLessons(locale, c.courseSlug).map((l) => ({
        locale,
        course: c.courseSlug,
        lesson: l.lessonSlug,
      }))
    )
  )
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, course, lesson } = await props.params
  const found = getLesson(locale, course, lesson)
  if (!found) return {}
  return {
    title: found.title,
    description: found.summary,
    openGraph: {
      title: found.title,
      description: found.summary,
      url: `${siteMetadata.siteUrl}/${locale === 'en' ? '' : locale + '/'}courses/${course}/${lesson}`,
    },
  }
}

export default async function LessonPage(props: Props) {
  const { locale, course, lesson } = await props.params
  return <LessonView locale={locale} courseSlug={course} lessonSlug={lesson} />
}
