'use client'

import { useParams, usePathname } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from '../mdxcomponents/Link'
import MobileNav from './MobileNav'
import ThemeSwitch from '../theme/ThemeSwitch'
import LangSwitch from '../langswitch'
import SearchButton from '../search/SearchButton'
import QRButton from '../qr/QRButton'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'

const Header = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const pathname = usePathname()

  return (
    <header className="w-full py-6">
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link
            href={`/${locale}/`}
            aria-label={siteMetadata.headerTitle}
            className="font-ubuntu text-2xl font-bold text-gray-900 transition-colors hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-white dark:hover:text-primary-400"
          >
            Yali Dev
          </Link>
        </div>
        <div className="hidden flex-1 justify-center md:flex">
          <nav className="flex items-center space-x-6 rounded-lg border border-gray-200/60 bg-transparent px-4 py-2 dark:border-gray-800/60">
            {headerNavLinks.map((link) => {
              const isSelected =
                link.href === '/' ? pathname === '/' : pathname.startsWith(link.href as string)
              return (
                <Link
                  key={link.title}
                  href={`/${locale}${link.href}`}
                  className={`text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                    isSelected
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                  }`}
                >
                  {`${t(link.title.toLowerCase())}`}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex-shrink-0">
          <div className="flex items-center justify-end md:space-x-5">
            <SearchButton />
            <div className="hidden md:flex md:items-center md:space-x-6">
              <QRButton />
              <LangSwitch />
              <ThemeSwitch />
            </div>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
