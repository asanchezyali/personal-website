'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from '../mdxcomponents/Link'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import { Authors, allAuthors } from 'contentlayer/generated'
import { useParams } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { motion } from 'framer-motion'
import { Home, BookOpen, Phone, Users, ChevronDown, Menu, X, FolderKanban } from 'lucide-react'
import SearchButton from '../search/SearchButton'
import QRButton from '../qr/QRButton'
import LangSwitch from '../langswitch'
import ThemeSwitch from '../theme/ThemeSwitch'

const navIcons = {
  home: Home,
  blog: BookOpen,
  projects: FolderKanban,
  contact: Phone,
  about: Users,
}

const MobileNav = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const authors = allAuthors
    .filter((a) => a.language === locale)
    .sort((a, b) => (a.default === b.default ? 0 : a.default ? -1 : 1)) as Authors[]

  const mainAuthor = allAuthors.filter((a) => a.default === true && a.language === locale)

  const [navShow, setNavShow] = useState<boolean>(false)
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen)
  }

  return (
    <>
      <button
        aria-label={t('showmenu')}
        onClick={onToggleNav}
        className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: navShow ? 1 : 0 }}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm ${
          navShow ? 'block' : 'hidden'
        }`}
        onClick={onToggleNav}
      />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: navShow ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="fixed inset-y-0 right-0 z-50 h-full w-full overflow-y-auto bg-white shadow-xl dark:bg-gray-950 md:max-w-sm"
      >
        <div className="flex h-full flex-col">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/95 px-4 py-4 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <Link href={`/${locale}`} onClick={onToggleNav}>
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {siteMetadata.author}
                  </span>
                </Link>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {siteMetadata.description}
                </span>
              </div>
            </div>
            <button
              onClick={onToggleNav}
              className="rounded-full bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto p-4">
            {/* Mobile Action Buttons */}
            <div className="mx-4 mb-4 flex w-full gap-4 md:hidden">
              <QRButton />
              <LangSwitch />
              <ThemeSwitch />
            </div>

            {headerNavLinks.map((link) => {
              const IconComponent = navIcons[link.title.toLowerCase() as keyof typeof navIcons]
              return (
                <motion.div key={link.title} whileHover={{ x: 4 }}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="flex items-center space-x-4 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                    onClick={onToggleNav}
                  >
                    {IconComponent && <IconComponent className="h-5 w-5" />}
                    <span className="text-lg font-medium">{t(`${link.title.toLowerCase()}`)}</span>
                  </Link>
                </motion.div>
              )
            })}

            {siteMetadata.multiauthors && (
              <div className="mt-4">
                <motion.button
                  onClick={toggleAccordion}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center space-x-4">
                    <Users className="h-5 w-5" />
                    <span className="text-lg font-medium">{t('about')}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: accordionOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </motion.button>

                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: accordionOpen ? 'auto' : 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {authors.map((author, index) => {
                    const { name, avatar, language, slug } = author
                    if (language === locale) {
                      return (
                        <Link
                          key={index}
                          href={`/${locale}/about/${slug}`}
                          onClick={onToggleNav}
                          className="flex items-center space-x-3 rounded-lg px-8 py-3 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                          <Image
                            src={avatar ?? ''}
                            alt={name}
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-full"
                          />
                          <span className="text-base font-medium">{name}</span>
                        </Link>
                      )
                    }
                    return null
                  })}
                </motion.div>
              </div>
            )}

            {!siteMetadata.multiauthors &&
              mainAuthor.map((author) => {
                const { name, language, slug } = author
                if (language === locale) {
                  return (
                    <motion.div key={name} whileHover={{ x: 4 }}>
                      <Link
                        href={`/${locale}/about/${slug}`}
                        onClick={onToggleNav}
                        className="flex items-center space-x-4 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        <Users className="h-5 w-5" />
                        <span className="text-lg font-medium">{t('about')}</span>
                      </Link>
                    </motion.div>
                  )
                }
                return null
              })}
          </nav>
        </div>
      </motion.div>
    </>
  )
}

export default MobileNav
