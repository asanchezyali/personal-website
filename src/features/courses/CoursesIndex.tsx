import Link from 'next/link'
import { createTranslation } from '@/i18n/server'
import type { LocaleTypes } from '@/i18n/settings'
import CourseHeroFigure from './CourseHeroFigure'
import { coursePath, getCourses, getLessons, getModules, lessonPath } from './lib'

export default async function CoursesIndex({ locale }: { locale: LocaleTypes }) {
  const { t } = await createTranslation(locale, 'courses')
  const list = getCourses(locale)
  const [featured, ...rest] = list

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

      {!featured && <p className="courses-empty">{t('empty')}</p>}

      {featured && (
        <section className="course-feature">
          <div className="course-feature-body">
            {featured.level && <span className="course-card-level">{featured.level}</span>}
            <h2>
              <Link href={coursePath(locale, featured.courseSlug)}>{featured.title}</Link>
            </h2>
            <p className="course-feature-summary">{featured.summary}</p>

            <ol className="course-feature-modules">
              {getModules(locale, featured.courseSlug).map((m) => (
                <li key={m.order}>
                  <span className="course-feature-mnum">{String(m.order).padStart(2, '0')}</span>
                  <span className="course-feature-mtitle">{m.title}</span>
                  <span className="course-feature-mcount">
                    {t('meta.lessons', { count: m.lessons.length })}
                  </span>
                </li>
              ))}
            </ol>

            <div className="course-feature-actions">
              <Link
                href={lessonPath(
                  locale,
                  featured.courseSlug,
                  getLessons(locale, featured.courseSlug)[0]?.lessonSlug ?? ''
                )}
                className="course-start"
              >
                {t('start')} →
              </Link>
              <Link href={coursePath(locale, featured.courseSlug)} className="course-feature-alt">
                {t('syllabus')}
              </Link>
            </div>
          </div>

          <div className="course-feature-figure">
            <CourseHeroFigure />
          </div>
        </section>
      )}

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

      {rest.length > 0 && (
        <section className="courses-list">
          {rest.map((course) => (
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
                  {t('meta.lessons', { count: getLessons(locale, course.courseSlug).length })}
                </p>
              </div>
            </Link>
          ))}
        </section>
      )}
    </div>
  )
}
