import Link from '@/components/mdxcomponents/Link'
import { formatDate } from 'pliny/utils/formatDate'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'

interface BlogCardProps {
  post: CoreContent<Blog>
  locale: LocaleTypes
  onTagClick: (tag: string) => void
}

export default function BlogCard({ post, locale, onTagClick }: BlogCardProps) {
  return (
    <div className="group relative h-full overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
      <Link href={`/${locale}/blog/${post.slug}`} className="block h-full">
        <div className="relative h-48 w-full overflow-hidden">
          {post.headerImage ? (
            <img
              src={post.headerImage || '/placeholder.svg'}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 dark:bg-gray-700" />
          )}
        </div>
        <div className="p-4">
          <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          </div>
          <h2 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 dark:text-white">
            {post.title}
          </h2>
          {post.summary && (
            <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
              {post.summary}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.preventDefault()
                  onTagClick(tag)
                }}
                className="inline-block rounded-full bg-[#30C5D2]/10 px-3 py-1 text-xs font-medium text-[#30C5D2]"
              >
                {tag}
              </button>
            ))}
            {post.tags.length > 3 && (
              <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700/50 dark:text-gray-400">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
