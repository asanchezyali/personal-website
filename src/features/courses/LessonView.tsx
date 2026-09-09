import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createTranslation } from '@/i18n/server'
import type { LocaleTypes } from '@/i18n/settings'
import { MDXContent } from '@/shared/mdx/MDXContent'
import CourseToc from './CourseToc'
import { getCourse, getLesson, getModules, getNeighbours, lessonPath } from './lib'

interface LessonViewProps {
  locale: LocaleTypes
  courseSlug: string
  lessonSlug: string
}

export default async function LessonView({ locale, courseSlug, lessonSlug }: LessonViewProps) {
  const course = getCourse(locale, courseSlug)
  const lesson = getLesson(locale, courseSlug, lessonSlug)
  if (!course || !lesson) notFound()

  const { t } = await createTranslation(locale, 'courses')
  const modules = getModules(locale, courseSlug)
  const { prev, next, index, total } = getNeighbours(locale, courseSlug, lessonSlug)
  const progress = total > 0 ? Math.round(((index + 1) / total) * 100) : 0

  return (
    <div className="wrap lesson-shell">
      <aside className="lesson-aside">
        <Link href={`/${locale}/courses/${courseSlug}`} className="course-back">
          {course.title}
        </Link>
        <div className="lesson-progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="lesson-progress-label">
          {t('progress', { current: index + 1, total })}
        </p>
        <CourseToc
          locale={locale}
          courseSlug={courseSlug}
          modules={modules}
          activeSlug={lessonSlug}
          title={t('toc_title')}
          compact
        />
      </aside>

      <article className="lesson-main">
        <header className="lesson-head">
          <p className="lesson-module">{lesson.module}</p>
          <h1>{lesson.title}</h1>
          {lesson.summary && <p className="lead">{lesson.summary}</p>}
        </header>

        <div className="post-body">
          <MDXContent code={lesson.content} toc={lesson.toc} />
        </div>

        <nav className="lesson-nav" aria-label={t('toc_title')}>
          {prev ? (
            <Link href={lessonPath(locale, courseSlug, prev.lessonSlug)} className="lesson-nav-prev">
              <span>← {t('previous')}</span>
              <strong>{prev.title}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={lessonPath(locale, courseSlug, next.lessonSlug)} className="lesson-nav-next">
              <span>{t('next')} →</span>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <Link href={`/${locale}/courses/${courseSlug}`} className="lesson-nav-next">
              <span>{t('finish')} →</span>
              <strong>{course.title}</strong>
            </Link>
          )}
        </nav>
      </article>
    </div>
  )
}
