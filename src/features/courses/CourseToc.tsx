import Link from 'next/link'
import type { CourseModule } from './lib'
import { lessonPath } from './lib'

interface CourseTocProps {
  locale: string
  courseSlug: string
  modules: CourseModule[]
  /** Highlights the lesson being read; omit on the course overview. */
  activeSlug?: string
  title?: string
  compact?: boolean
}

export default function CourseToc({
  locale,
  courseSlug,
  modules,
  activeSlug,
  title,
  compact = false,
}: CourseTocProps) {
  let counter = 0
  return (
    <nav className={compact ? 'course-toc course-toc--compact' : 'course-toc'} aria-label={title}>
      {title && <p className="course-toc-title">{title}</p>}
      <ol className="course-toc-modules">
        {modules.map((m) => (
          <li key={m.order} className="course-toc-module">
            <p className="course-toc-module-title">
              <span className="course-toc-module-num">{String(m.order).padStart(2, '0')}</span>
              {m.title}
            </p>
            <ol className="course-toc-lessons">
              {m.lessons.map((l) => {
                counter += 1
                const active = l.lessonSlug === activeSlug
                return (
                  <li key={l.lessonSlug}>
                    <Link
                      href={lessonPath(locale, courseSlug, l.lessonSlug)}
                      className={active ? 'course-toc-link is-active' : 'course-toc-link'}
                      aria-current={active ? 'page' : undefined}
                    >
                      <span className="course-toc-num">{counter}</span>
                      <span className="course-toc-text">{l.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </li>
        ))}
      </ol>
    </nav>
  )
}
