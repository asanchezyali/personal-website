import React from 'react'
import useSWR from 'swr'
import Image from '@/components/Image'
import Link from '@/components/Link'
import formatDate from '@/lib/utils/formatDate'
import Tag from '@/components/Tag'
import metaLabels from '@/data/metaLabels'
import { LanguageContext } from '@/providers/LanguageProvider'
import { extractLastSegment } from '@/lib/utils/strings'

async function fetcher(...args) {
  const res = await fetch(...args)
  return res.json()
}

export default function ArticleOverview({ title, summary, date, headerImage, slug, tags, time }) {
  const { language } = React.useContext(LanguageContext)
  const { data } = useSWR(`/api/views/${extractLastSegment(slug)}`, fetcher)
  const views = new Number(data?.total)

  return (
    <Link href={`/blog/${slug}`} className="group">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={headerImage}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="transition-transform duration-300 group-hover:scale-105"
            alt={title}
          />
        </div>

        <div className="flex flex-grow flex-col justify-between p-5">
          <div>
            <h2 className="mb-2 line-clamp-2 text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
              {formatDate(date)} - {views ? views.toLocaleString() : 0} {metaLabels[language].views}
            </p>
            <p className="mb-3 line-clamp-3 text-sm text-gray-700 dark:text-gray-300">{summary}</p>
          </div>

          <div className="mt-auto">
            <div className="mb-2 flex flex-wrap gap-1">
              {tags.slice(0, 2).map((tag) => (
                <Tag key={tag} text={tag} className="px-2 py-1 text-xs" />
              ))}
              {tags.length > 2 && (
                <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  +{tags.length - 2}
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
              {metaLabels[language].readMore}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
