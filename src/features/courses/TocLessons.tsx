'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export interface TocLesson {
  slug: string
  title: string
  num: number
  href: string
}

export interface TocSection {
  title: string
  url: string
}

interface TocLessonsProps {
  lessons: TocLesson[]
  activeSlug?: string
  /** Headings of the lesson being read, nested under it. */
  sections?: TocSection[]
  storageKey: string
  labels?: { read?: string }
}

/** Reads the ids once and tracks the last heading scrolled past. */
function useActiveSection(sections: TocSection[] | undefined, enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled || !sections?.length) return
    const ids = sections.map((s) => {
      const raw = s.url.replace(/^#/, '')
      try {
        return decodeURIComponent(raw)
      } catch {
        return raw
      }
    })

    let frame = 0
    const update = () => {
      frame = 0
      let current: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sections, enabled])

  return active
}

export default function TocLessons({
  lessons,
  activeSlug,
  sections,
  storageKey,
  labels = {},
}: TocLessonsProps) {
  const [visited, setVisited] = useState<Set<string>>(new Set())
  const activeSection = useActiveSection(sections, Boolean(activeSlug))

  useEffect(() => {
    let stored: string[] = []
    try {
      stored = JSON.parse(window.localStorage.getItem(storageKey) ?? '[]')
    } catch {
      stored = []
    }
    const next = new Set(Array.isArray(stored) ? stored : [])
    if (activeSlug) next.add(activeSlug)
    setVisited(next)
    if (activeSlug) {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify([...next]))
      } catch {
        /* private mode, blocked storage: the marks are a convenience only */
      }
    }
  }, [activeSlug, storageKey])

  return (
    <ol className="course-toc-lessons">
      {lessons.map((l) => {
        const active = l.slug === activeSlug
        const read = visited.has(l.slug) && !active
        return (
          <li key={l.slug} className={active ? 'is-current' : undefined}>
            <Link
              href={l.href}
              className={[
                'course-toc-link',
                active ? 'is-active' : '',
                read ? 'is-read' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-current={active ? 'page' : undefined}
            >
              <span className="course-toc-num" aria-hidden={read ? 'true' : undefined}>
                {read ? '✓' : l.num}
              </span>
              <span className="course-toc-text">{l.title}</span>
              {read && <span className="sr-only">{labels.read ?? 'leída'}</span>}
            </Link>

            {active && sections && sections.length > 0 && (
              <ol className="course-toc-sections">
                {sections.map((s) => {
                  const raw = s.url.replace(/^#/, '')
                  let id = raw
                  try {
                    id = decodeURIComponent(raw)
                  } catch {
                    id = raw
                  }
                  return (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        className={
                          activeSection === id
                            ? 'course-toc-section is-active'
                            : 'course-toc-section'
                        }
                      >
                        {s.title}
                      </a>
                    </li>
                  )
                })}
              </ol>
            )}
          </li>
        )
      })}
    </ol>
  )
}
