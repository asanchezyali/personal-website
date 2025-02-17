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
    <header className="w-full bg-white py-6 dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="w-32">
            <Link
              href={`/${locale}/`}
              aria-label={siteMetadata.headerTitle}
              className="font-ubuntu text-2xl font-bold text-gray-900 transition-colors hover:text-primary-600 dark:text-white dark:hover:text-primary-400"
            >
              Yali Dev
            </Link>
          </div>
          <div className="absolute left-1/2 hidden -translate-x-1/2 transform md:block">
            <nav className="flex items-center space-x-6">
              {headerNavLinks.map((link) => {
                const isSelected =
                  link.href === '/' ? pathname === '/' : pathname.startsWith(link.href as string)
                return (
                  <Link
                    key={link.title}
                    href={`/${locale}${link.href}`}
                    className={`text-sm font-medium transition-colors duration-200 ${
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

          <div className="w-32">
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
      </div>
    </header>
  )
}

export default Header
