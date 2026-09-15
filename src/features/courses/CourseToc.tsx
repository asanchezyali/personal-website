import type { CourseModule } from './lib'
import { lessonPath } from './lib'
import TocLessons, { type TocSection } from './TocLessons'

interface CourseTocProps {
  locale: string
  courseSlug: string
  modules: CourseModule[]
  /** Highlights the lesson being read; omit on the course overview. */
  activeSlug?: string
  /** Headings of the lesson being read, nested under its entry. */
  sections?: TocSection[]
  title?: string
  compact?: boolean
  labels?: { read?: string; lessons?: (n: number) => string }
}

export default function CourseToc({
  locale,
  courseSlug,
  modules,
  activeSlug,
  sections,
  title,
  compact = false,
  labels = {},
}: CourseTocProps) {
  let counter = 0
  return (
    <nav className={compact ? 'course-toc course-toc--compact' : 'course-toc'} aria-label={title}>
      {/* title stays on aria-label: a nav in the sidebar needs no visible heading. */}
      <ol className="course-toc-modules">
        {modules.map((m) => {
          const entries = m.lessons.map((l) => {
            counter += 1
            return {
              slug: l.lessonSlug,
              title: l.title,
              num: counter,
              href: lessonPath(locale, courseSlug, l.lessonSlug),
            }
          })
          const holdsActive = entries.some((e) => e.slug === activeSlug)
          return (
            <li
              key={m.order}
              className={holdsActive ? 'course-toc-module is-current' : 'course-toc-module'}
            >
              {/* A single module adds a heading with nothing to distinguish it from. */}
              {modules.length > 1 && (
                <p className="course-toc-module-title">
                  <span className="course-toc-module-num">{String(m.order).padStart(2, '0')}</span>
                  <span className="course-toc-module-name">{m.title}</span>
                </p>
              )}
              <TocLessons
                lessons={entries}
                activeSlug={activeSlug}
                sections={holdsActive ? sections : undefined}
                storageKey={`course:${locale}:${courseSlug}:visited`}
                labels={{ read: labels.read }}
              />
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
