import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/comments/Comments'
import WalineComments from '@/components/comments/walinecomponents/walineComments'
import Link from '@/components/mdxcomponents/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Tag from '@/components/tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/scroll'
import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { PostSeriesBox } from '@/components/seriescard'
import Share from '@/components/share'
import { Toc } from 'pliny/mdx-plugins'
import Sidetoc from '@/components/sidetoc'
import Image from '@/components/mdxcomponents/Image'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`
const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
  children: ReactNode
  params: { locale: LocaleTypes }
}

export default async function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
  params: { locale },
}: LayoutProps) {
  const { filePath, path, slug, date, title, tags, language, series, toc, headerImage } = content
  const basePath = path.split('/')[0]
  const { t } = await createTranslation(locale, 'home')
  const tableOfContents: Toc = toc as unknown as Toc
  return (
    <>
      <article className="py-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <header className="mb-8 text-center">
              {headerImage && (
                <div className="relative mb-10 h-[200px] w-full sm:h-[500px]">
                  <Image
                    src={headerImage}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    className="rounded-lg"
                    alt={title}
                    priority={true}
                  />
                </div>
              )}
              <dl className="mb-2">
                <dt className="sr-only">{t('pub')}</dt>
                <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <time dateTime={date}>
                    {new Date(date).toLocaleDateString(language, postDateTemplate)}
                  </time>
                </dd>
              </dl>
              <PageTitle>{title}</PageTitle>
            </header>
            <div className="prose max-w-none dark:prose-invert">{children}</div>
            <footer className="mt-8">
              <div className="mt-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                {siteMetadata.iswaline && <WalineComments />}
                {siteMetadata.comments && siteMetadata.iscomments && <Comments slug={slug} />}
              </div>
            </footer>
          </div>
          <aside className="lg:col-span-1">
            <div className="sticky top-8 hidden text-base font-medium lg:block">
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {authorDetails.map((author) => (
                  <li className="mb-8 flex items-center space-x-2" key={author.name}>
                    {author.avatar && (
                      <Image
                        src={author.avatar}
                        width="38"
                        height="38"
                        alt="avatar"
                        className="h-10 w-10 rounded-full"
                      />
                    )}
                    <dl className="whitespace-nowrap text-sm font-medium leading-5">
                      <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                      <dd>
                        {author.twitter && (
                          <Link
                            href={author.linkedin as string}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            {author.twitter.replace('https://twitter.com/', '@')}
                          </Link>
                        )}
                      </dd>
                    </dl>
                  </li>
                ))}

                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {t('tags')}:
                    </h2>
                    <div className="flex flex-col">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.slug && (
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          {t('preva')}
                        </p>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${locale}/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.slug && (
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          {t('nexta')}
                        </p>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${locale}/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${locale}/${basePath}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label="Back to the blog"
                  >
                    &larr;{t('back')}
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>
      <ScrollTopAndComment />
      <Sidetoc toc={tableOfContents} />
    </>
  )
}
