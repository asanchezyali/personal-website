import React from 'react'
import NextImage from 'next/image'
import Image from 'next/image'
import Link from '@/components/Link'
import formatDate from '@/lib/utils/formatDate'
import Tag from '@/components/Tag'

export default function ArticleOverview({ title, summary, date, headerImage, slug, tags }) {
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
          />
        </div>
      </Link>
      <h2 className="pt-4">
        <Link
          href={`/blog/${slug}`}
          className="text-xl font-bold text-slate-800 dark:text-slate-300 md:text-2xl"
        >
          {title}
        </Link>
      </h2>
      <div className="flex w-full flex-row py-4">
        <div className="hidden md:block">
          <NextImage
            src="/avatar.jpeg"
            alt="Avatar"
            height={50}
            width={50}
            className="h-10 w-10 rounded-full "
          />
        </div>
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-col">
            <p className="px-0 text-base font-bold text-slate-800 dark:text-slate-300 md:px-4">
              Alejandro Sánchez Yalí
            </p>
            <p className="px-0 text-base font-light text-slate-800 dark:text-slate-300 md:px-4">
              {formatDate(date)}
            </p>
          </div>
          <div className="flex flex-col justify-self-end">
            <p className="text-right text-base font-bold text-slate-800 dark:text-slate-300">
              5 min read
            </p>
            <p className="text-right text-base font-light text-slate-800 dark:text-slate-300">
              5 views
            </p>
          </div>
        </div>
      </div>

      <p className="text-justify text-base text-slate-800 dark:text-slate-300">{summary}</p>

      <div className="flex w-full flex-row justify-between pt-2">
        <Link
          href={`/blog/${slug}`}
          className="text-base font-semibold text-sky-700 hover:underline dark:text-sky-500"
        >
          Read more ...
        </Link>
        <div className='text-base text-slate-800 dark:text-slate-300 space-x-2'>
          Tags: {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
      </div>
    </div>
  )
}