import Link from 'next/link'
import { createTranslation } from '@/i18n/server'
import type { LocaleTypes } from '@/i18n/settings'
import { getCourses, getLessons, getModules, lessonPath } from '@/features/courses/lib'

interface CoursesPreviewSectionProps {
  locale: LocaleTypes
}

export default async function CoursesPreviewSection({ locale }: CoursesPreviewSectionProps) {
  const { t } = await createTranslation(locale, 'home')
  const { t: tc } = await createTranslation(locale, 'courses')
  const list = getCourses(locale)
  if (list.length === 0) return null

  const coursesHref = locale === 'en' ? '/courses' : `/${locale}/courses`

  return (
    <section className="blog-preview wrap">
      <h2 className="section-h" style={{ textAlign: 'center' }}>
        {t('courses.title')}
      </h2>
      <p className="section-sub" style={{ textAlign: 'center' }}>
        {t('courses.description')}
      </p>

      <div className="courses-grid">
        {list.map((course, i) => {
          const modules = getModules(locale, course.courseSlug)
          const lessons = getLessons(locale, course.courseSlug)
          const start = lessonPath(locale, course.courseSlug, lessons[0]?.lessonSlug ?? '')
          return (
            <article key={course.courseSlug} className="course-card">
              <div className="course-card-top">
                {course.level && <span className="course-card-level">{course.level}</span>}
                <span className="course-card-index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3>
                <Link href={start} className="course-card-link">
                  {course.title}
                </Link>
              </h3>
              <p className="course-card-summary">{course.summary}</p>
              <div className="course-card-foot">
                <span className="course-card-stats">
                  {tc('meta.lessons', { count: lessons.length })}
                  <span aria-hidden="true"> · </span>
                  {tc('meta.modules', { count: modules.length })}
                </span>
              </div>
            </article>
          )
        })}
      </div>

      <div className="see-all">
        <Link href={coursesHref} className="btn ghost">
          {t('courses.cta')} <span className="a">→</span>
        </Link>
      </div>
    </section>
  )
}
