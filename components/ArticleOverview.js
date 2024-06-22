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
    <div className="flex flex-col border-b border-dashed border-slate-200 py-8 dark:border-slate-700">
      <Link href={`/blog/${slug}`}>
        <div className="relative h-[300px] w-full duration-500 ease-in hover:scale-[1.005]">
          <Image
            src={`${headerImage}`}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-lg"
            alt={title}
          />
        </div>
      </Link>
      <h2 className="pt-4">
        <Link
          href={`/blog/${slug}`}
          className="cursor-pointer text-xl font-bold text-slate-800 hover:text-primary-500 md:text-2xl dark:text-slate-300"
        >
          {title}
        </Link>
      </h2>
      <p className="mb-4 text-[14px] font-light  text-slate-800 dark:text-slate-300">
        {formatDate(date)} - {views ? views.toLocaleString() : 0} {metaLabels[language].views}
      </p>
      <p className="text-justify text-base text-slate-800 dark:text-slate-300">{summary}</p>

      <div className="flex w-full flex-row justify-between pt-2">
        <Link
          href={`/blog/${slug}`}
          className="text-base text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
        >
          {metaLabels[language].readMore}
        </Link>
        <div className="space-x-2 text-base text-slate-800 dark:text-slate-300">
          {metaLabels[language].tags}
          {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
      </div>
    </div>
  )
}
