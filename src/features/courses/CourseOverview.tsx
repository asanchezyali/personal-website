import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createTranslation } from '@/i18n/server'
import type { LocaleTypes } from '@/i18n/settings'
import { MDXContent } from '@/shared/mdx/MDXContent'
import CourseToc from './CourseToc'
import { getCourse, getLessons, getModules, lessonPath } from './lib'

interface CourseOverviewProps {
  locale: LocaleTypes
  courseSlug: string
}

export default async function CourseOverview({ locale, courseSlug }: CourseOverviewProps) {
  const course = getCourse(locale, courseSlug)
  if (!course) notFound()

  const { t } = await createTranslation(locale, 'courses')
  const modules = getModules(locale, courseSlug)
  const lessons = getLessons(locale, courseSlug)
  const first = lessons[0]

  return (
    <div className="wrap course-overview">
      <header className="course-head">
        <Link href={`/${locale}/courses`} className="course-back">
          {t('back_to_courses')}
        </Link>
        {course.level && <span className="course-card-level">{course.level}</span>}
        <h1>{course.title}</h1>
        <p className="lead">{course.summary}</p>
        <p className="course-head-meta">
          {t('meta.modules', { count: modules.length })} ·{' '}
          {t('meta.lessons', { count: lessons.length })} · {t('meta.free')}
        </p>
        {first && (
          <Link href={lessonPath(locale, courseSlug, first.lessonSlug)} className="course-start">
            {t('start')} →
          </Link>
        )}
      </header>

      <div className="course-overview-grid">
        <article className="post-body course-intro">
          <MDXContent code={course.content} />
        </article>
        <aside>
          <CourseToc
            locale={locale}
            courseSlug={courseSlug}
            modules={modules}
            title={t('toc_title')}
          />
        </aside>
      </div>
    </div>
  )
}
