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
      <div className="container mx-auto">
        <div className="relative flex items-center justify-between">
          <div className="w-32">
            <Link
              href={`/${locale}/`}
              aria-label={siteMetadata.headerTitle}
              className="font-ubuntu text-2xl font-bold text-gray-900 dark:text-white"
            >
              Pi Agents
            </Link>
          </div>
          <div className="absolute left-1/2 hidden -translate-x-1/2 transform md:block">
            <nav className="flex items-center space-x-8">
              {headerNavLinks
                .filter((link) => link.href !== '/')
                .map((link) => {
                  const isSelected = pathname!.includes(link.href as string)
                  return (
                    <Link
                      key={link.title}
                      href={`/${locale}${link.href}`}
                      className={`text-sm font-medium transition-colors duration-200 hover:text-[#30C5D2] ${
                        isSelected
                          ? 'text-[#3e4647] dark:text-[#30C5D2]'
                          : 'text-gray-600 dark:text-gray-300'
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
