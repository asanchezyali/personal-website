import React from 'react'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import metaLabels from '@/data/metaLabels'
import { LanguageContext } from '@/providers/LanguageProvider'
import { useEffect, useState } from 'react'
import useHeadsObserver from 'hooks/useHeadObserver'

const HEADING_LEVELS = ['h2', 'h3', 'h4']

const HeadingLink = (props) => {
  const headingStyles = {
    container: {
      [HEADING_LEVELS[0]]: props.active ? 'py-1' : 'py-1',
      [HEADING_LEVELS[1]]: props.active ? 'py-1 pl-4' : 'py-1 pl-4',
      [HEADING_LEVELS[2]]: props.active ? 'py-1 pl-8' : 'py-1 pl-8',
    },
    text: {
      [HEADING_LEVELS[0]]: props.active ? 'text-primary-500' : 'dark:text-slate-200 text-slate-600',
      [HEADING_LEVELS[1]]: props.active ? 'text-primary-500' : 'dark:text-slate-200 text-slate-600',
      [HEADING_LEVELS[2]]: props.active ? 'text-primary-500' : 'dark:text-slate-200 text-slate-600',
    },
  }
  return (
    <div className={headingStyles.container[props.level]}>
      <a
        href={`#${props.id}`}
        className={headingStyles.text[props.level]}
        onClick={(e) => {
          e.preventDefault()
          const element = document.getElementById(props.id)
          if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY - 20
            window.scrollTo({ top: top, behavior: 'smooth' })
          }
        }}
      >
        {props.text}
      </a>
    </div>
  )
}

const getHeadings = (props) => {
  const headings = props.map((heading, index) => {
    return <HeadingLink key={index} {...heading} />
  })
  return headings
}

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { slug, date, title, tags } = frontMatter
  const { language } = React.useContext(LanguageContext)
  const [headings, setHeadings] = useState([])
  const { activeId } = useHeadsObserver()

  useEffect(() => {
    let elements = Array.from(document.querySelectorAll(HEADING_LEVELS.join(', '))).map((elem) => ({
      id: elem.id,
      text: elem.innerText,
      level: `h${Number(elem.nodeName.charAt(1))}`,
      active: false,
    }))
    elements = elements.filter((element) => element.id)
    elements = Array.from(elements).filter((elem) => elem.id !== 'tableOfContents')

    let isActiveFound = false

    for (let element of elements) {
      if (element.id === activeId) {
        isActiveFound = false
      }
      element.active = isActiveFound || element.id === activeId
    }
    setHeadings(elements)
  }, [activeId])

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <article>
        <header className="w-full pt-6 xl:w-[760px]">
          <div className="relative mb-10 h-[200px] w-full duration-500 ease-in hover:scale-[1.005] sm:h-[500px]">
            <Image
              src={frontMatter.headerImage}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className="rounded-lg"
              alt={title}
            />
          </div>
          <div className="space-y-1 text-center">
            <time dateTime={date}>
              {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
            </time>
            <div>
              <PageTitle>{title}</PageTitle>
            </div>
          </div>
        </header>
        <div
          className="relative  pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6"
          style={{ gridTemplateRows: 'auto 1fr' }}
        >
          <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
            <h2 id="skip" className="sr-only"></h2>
            <div className="prose max-w-none pb-8 pt-10 dark:prose-dark">{children}</div>
          </div>

          <footer className="fixed top-[60px] ml-[785px] hidden max-w-80 xl:block">
            <div className="divide-gray-200 text-sm font-medium leading-5 xl:col-start-1 xl:row-start-2 xl:divide-y dark:divide-gray-700">
              <dl className="pb-10 xl:pt-11 xl:dark:border-gray-700">
                <dt className="sr-only">Authors</dt>
                <dd>
                  <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                    {authorDetails.map((author) => (
                      <li className="flex items-center space-x-2" key={author.name}>
                        {author.avatar && (
                          <Image
                            src={author.avatar}
                            width="38px"
                            height="38px"
                            alt="avatar"
                            className="h-10 w-10 rounded-full"
                          />
                        )}
                        <dl className="whitespace-nowrap text-sm font-medium leading-5">
                          <dt className="sr-only">Name</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                          <dt className="sr-only">Twitter</dt>
                          <dd>
                            {author.twitter && (
                              <Link
                                href={author.linkedin}
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              >
                                {author.twitter.replace('https://twitter.com/', '@')}
                              </Link>
                            )}
                          </dd>
                        </dl>
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>
              {tags && (
                <div className="py-4 xl:py-8">
                  <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {metaLabels[language].tags}
                  </h2>
                  <div className="flex flex-col">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              )}
              <div className={`py-8 pr-2 ${headings.length === 0 ? 'hidden' : ''}`}>
                <h2
                  className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400"
                  id="tableOfContents"
                >
                  {metaLabels[language].tableOfContents}
                </h2>
                <div className="custom-scroll mt-4 max-w-[400px] pr-8">{getHeadings(headings)}</div>
              </div>
              {(next || prev) && (
                <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                  {prev && (
                    <div>
                      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        {metaLabels[language].previousArticle}
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                      </div>
                    </div>
                  )}
                  {next && (
                    <div>
                      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        {metaLabels[language].nextArticle}
                      </h2>
                      <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                        <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4 xl:pt-8">
                <Link
                  href="/"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; {metaLabels[language].backToBlog}
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </SectionContainer>
  )
}
