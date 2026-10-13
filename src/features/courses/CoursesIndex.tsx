import Link from 'next/link'
import { createTranslation } from '@/i18n/server'
import type { LocaleTypes } from '@/i18n/settings'
import CourseHeroFigure from './CourseHeroFigure'
import { getCourses, getLessons, getModules, lessonPath } from './lib'

export default async function CoursesIndex({ locale }: { locale: LocaleTypes }) {
  const { t } = await createTranslation(locale, 'courses')
  const list = getCourses(locale)

  return (
    <div className="wrap">
      <section className="courses-hero">
        <div className="courses-hero-copy">
          <span className="eyebrow">{t('hero.eyebrow')}</span>
          <h1>
            {t('hero.title_pre')}
            <span className="accent">{t('hero.title_accent')}</span>.
          </h1>
          <p className="lead">{t('hero.lead')}</p>
        </div>
        <div className="courses-hero-figure">
          <CourseHeroFigure />
        </div>
      </section>

      {list.length === 0 && <p className="courses-empty">{t('empty')}</p>}

      {/* Every course renders the same way; none is presented as an afterthought. */}
      <section className="courses-grid">
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
              <h2>
                {/* The title link covers the whole card; the button sits above it. */}
                <Link href={start} className="course-card-link">
                  {course.title}
                </Link>
              </h2>
              <p className="course-card-summary">{course.summary}</p>
              {course.tags.length > 0 && (
                <ul className="course-card-topics">
                  {course.tags.map((tag) => (
                    <li key={tag}>{tag.replace(/-/g, ' ')}</li>
                  ))}
                </ul>
              )}
              <div className="course-card-foot">
                <span className="course-card-stats">
                  {t('meta.lessons', { count: lessons.length })}
                  <span aria-hidden="true"> · </span>
                  {t('meta.modules', { count: modules.length })}
                </span>
                <Link href={start} className="course-start" tabIndex={-1} aria-hidden="true">
                  {t('start')} <span className="course-start-arrow">→</span>
                </Link>
              </div>
            </article>
          )
        })}
      </section>

      <section className="courses-pitch">
        <div>
          <span className="courses-pitch-num">01</span>
          <h3>{t('pitch.one.title')}</h3>
          <p>{t('pitch.one.body')}</p>
        </div>
        <div>
          <span className="courses-pitch-num">02</span>
          <h3>{t('pitch.two.title')}</h3>
          <p>{t('pitch.two.body')}</p>
        </div>
        <div>
          <span className="courses-pitch-num">03</span>
          <h3>{t('pitch.three.title')}</h3>
          <p>{t('pitch.three.body')}</p>
        </div>
      </section>
    </div>
  )
}
