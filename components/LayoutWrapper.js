import React from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import LanguageSwitch from './LanguageSwitch'
import { LanguageContext } from '@/providers/LanguageProvider'

const LayoutWrapper = ({ children }) => {
  const { language } = React.useContext(LanguageContext)
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex hidden h-6 items-center text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            </Link>
          </div>
          <div className="mt-3 flex items-center text-base">
            <div className="hidden sm:block">
              {headerNavLinks[language].map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <LanguageSwitch />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
