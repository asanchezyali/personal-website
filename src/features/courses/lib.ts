import { courses, lessons } from '#site/content'

export type Course = (typeof courses)[number]
export type Lesson = (typeof lessons)[number]

export interface CourseModule {
  title: string
  order: number
  lessons: Lesson[]
}

const published = <T extends { draft?: boolean }>(items: T[]) => items.filter((i) => !i.draft)

export function getCourses(locale: string): Course[] {
  return published(courses.filter((c) => c.language === locale)).sort((a, b) =>
    a.title.localeCompare(b.title)
  )
}

export function getCourse(locale: string, courseSlug: string): Course | undefined {
  return getCourses(locale).find((c) => c.courseSlug === courseSlug)
}

export function getLessons(locale: string, courseSlug: string): Lesson[] {
  return published(
    lessons.filter((l) => l.language === locale && l.courseSlug === courseSlug)
  ).sort((a, b) => a.moduleOrder - b.moduleOrder || a.order - b.order)
}

/** Lessons grouped into modules, both kept in their declared order. */
export function getModules(locale: string, courseSlug: string): CourseModule[] {
  const grouped = new Map<number, CourseModule>()
  for (const lesson of getLessons(locale, courseSlug)) {
    const existing = grouped.get(lesson.moduleOrder)
    if (existing) existing.lessons.push(lesson)
    else
      grouped.set(lesson.moduleOrder, {
        title: lesson.module,
        order: lesson.moduleOrder,
        lessons: [lesson],
      })
  }
  return [...grouped.values()].sort((a, b) => a.order - b.order)
}

export function getLesson(
  locale: string,
  courseSlug: string,
  lessonSlug: string
): Lesson | undefined {
  return getLessons(locale, courseSlug).find((l) => l.lessonSlug === lessonSlug)
}

/** Previous and next lesson across the whole course, module boundaries included. */
export function getNeighbours(locale: string, courseSlug: string, lessonSlug: string) {
  const all = getLessons(locale, courseSlug)
  const i = all.findIndex((l) => l.lessonSlug === lessonSlug)
  return {
    prev: i > 0 ? all[i - 1] : undefined,
    next: i >= 0 && i < all.length - 1 ? all[i + 1] : undefined,
    index: i,
    total: all.length,
  }
}

export function coursePath(locale: string, courseSlug: string) {
  return `/${locale}/courses/${courseSlug}`
}

export function lessonPath(locale: string, courseSlug: string, lessonSlug: string) {
  return `/${locale}/courses/${courseSlug}/${lessonSlug}`
}
