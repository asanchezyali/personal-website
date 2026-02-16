'use client'

import Image from 'next/image'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { authors as allAuthors, type Authors } from '#site/content'
import { useMemo } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import { motion } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type AuthorsMenuProps = {
  className: string
}

const AuthorsMenu = ({ className }: AuthorsMenuProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const pathname = usePathname()
  const sections = pathname!.split('/')
  const lastSection = sections[sections.length - 1]
  const filterSections = pathname !== `/${locale}` && pathname !== '/'

  const authors = useMemo(
    () =>
      allAuthors
        .filter((a) => a.language === locale)
        .sort((a, b) => (a.default === b.default ? 0 : a.default ? -1 : 1))
        .map((a) => ({
          ...a,
          slug: a.slug.split('/').slice(2).join('/'),
        })),
    [locale]
  ) as Authors[]

  const mainAuthor = useMemo(
    () =>
      allAuthors
        .filter((a) => a.default === true && a.language === locale)
        .map((a) => ({
          ...a,
          slug: a.slug.split('/').slice(2).join('/'),
        })),
    [locale]
  ) as Authors[]

  const isSelected = authors.some((author) => author.slug.includes(lastSection)) && filterSections

  return (
    <>
      {siteMetadata.multiauthors ? (
        <div className={className}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex transform-gpu items-center space-x-1 transition-transform duration-300 focus:outline-none">
                <div
                  className={`hidden font-medium ${
                    isSelected
                      ? 'text-heading-500'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
                  } relative rounded-md px-2 py-1 font-medium transition-colors sm:block`}
                >
                  <span className="relative z-10">{t('about')}</span>
                  {isSelected && (
                    <motion.span
                      layoutId="tab"
                      transition={{ type: 'spring', duration: 0.4 }}
                      className="absolute inset-0 z-0 rounded-md bg-gray-100 dark:bg-gray-600"
                    ></motion.span>
                  )}
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {authors
                .filter((author) => author.language === locale)
                .map((author) => (
                  <DropdownMenuItem key={author.name} asChild className="cursor-pointer">
                    <Link
                      href={`/${locale}/about/${author.slug}`}
                      className="flex w-full items-center hover:text-primary-500 dark:hover:text-primary-500"
                    >
                      <Image
                        className="mr-2 rounded-full"
                        src={author.avatar ?? ''}
                        alt="avatar"
                        title="avatar"
                        width={25}
                        height={25}
                      />
                      {author.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className={className}>
          {mainAuthor.map((author) => {
            const { name, slug } = author
            return (
              <Link
                href={`/${locale}/about/${slug}`}
                key={name}
                className={`${
                  isSelected
                    ? 'text-white'
                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
                } relative rounded-md px-2 py-1 font-medium transition-colors sm:block`}
              >
                <span className="relative z-10">{t('about')}</span>
                {isSelected && (
                  <motion.span
                    layoutId="tab"
                    transition={{ type: 'spring', duration: 0.4 }}
                    className="bg-heading-500 absolute inset-0 z-0 rounded-md"
                  ></motion.span>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}

export default AuthorsMenu
