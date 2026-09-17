import Link from 'next/link'
import { createTranslation } from '@/i18n/server'
import type { LocaleTypes } from '@/i18n/settings'
import CourseHeroFigure from './CourseHeroFigure'
import { coursePath, getCourses, getLessons, getModules, lessonPath } from './lib'

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
        {list.map((course) => {
          const modules = getModules(locale, course.courseSlug)
          const lessons = getLessons(locale, course.courseSlug)
          return (
            <article key={course.courseSlug} className="course-card">
              <div className="course-card-body">
                {course.level && <span className="course-card-level">{course.level}</span>}
                <h2>
                  <Link href={coursePath(locale, course.courseSlug)}>{course.title}</Link>
                </h2>
                <p className="course-card-summary">{course.summary}</p>

                <ol className="course-card-modules">
                  {modules.map((m) => (
                    <li key={m.order}>
                      <span className="course-card-mnum">{String(m.order).padStart(2, '0')}</span>
                      <span className="course-card-mtitle">{m.title}</span>
                      <span className="course-card-mcount">
                        {t('meta.lessons', { count: m.lessons.length })}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="course-card-actions">
                  <Link
                    href={lessonPath(locale, course.courseSlug, lessons[0]?.lessonSlug ?? '')}
                    className="course-start"
                  >
                    {t('start')} →
                  </Link>
                  <Link href={coursePath(locale, course.courseSlug)} className="course-card-alt">
                    {t('syllabus')}
                  </Link>
                </div>
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
