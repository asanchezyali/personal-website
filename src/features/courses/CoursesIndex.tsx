import Link from 'next/link'
import { createTranslation } from '@/i18n/server'
import type { LocaleTypes } from '@/i18n/settings'
import { coursePath, getCourses, getLessons, getModules } from './lib'

export default async function CoursesIndex({ locale }: { locale: LocaleTypes }) {
  const { t } = await createTranslation(locale, 'courses')
  const list = getCourses(locale)

  return (
    <div className="wrap">
      <section className="courses-hero">
        <span className="eyebrow">{t('hero.eyebrow')}</span>
        <h1>
          {t('hero.title_pre')}
          <span className="accent">{t('hero.title_accent')}</span>.
        </h1>
        <p className="lead">{t('hero.lead')}</p>
      </section>

      <section className="courses-list">
        {list.length === 0 && <p className="courses-empty">{t('empty')}</p>}
        {list.map((course) => {
          const modules = getModules(locale, course.courseSlug)
          const lessonCount = getLessons(locale, course.courseSlug).length
          return (
            <Link
              key={course.courseSlug}
              href={coursePath(locale, course.courseSlug)}
              className="course-card"
            >
              <div className="course-card-body">
                {course.level && <span className="course-card-level">{course.level}</span>}
                <h2>{course.title}</h2>
                <p>{course.summary}</p>
                <p className="course-card-meta">
                  {t('meta.modules', { count: modules.length })} ·{' '}
                  {t('meta.lessons', { count: lessonCount })} · {t('meta.free')}
                </p>
                {course.tags.length > 0 && (
                  <div className="course-card-tags">
                    {course.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
