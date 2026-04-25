'use client'
import React from 'react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import headerNavLinks from '@/lib/headerNavLinks'
import { useTranslation } from '@/i18n/client'
import { useTheme } from '@/shared/hooks/useTheme'
import { LocaleTypes, locales } from '@/i18n/settings'
import MobileNav from './MobileNav'

export default function Header() {
  const params = useParams()
  const pathname = usePathname()
  const locale = (params?.locale as LocaleTypes) || 'en'
  const { t } = useTranslation(locale, 'common')
  const { theme, setTheme, mounted } = useTheme()

  function localHref(href: string) {
    if (locale === 'en') return href
    return href === '/' ? `/${locale}` : `/${locale}${href}`
  }

  function isActive(href: string) {
    const localized = localHref(href)
    if (href === '/') return pathname === localized || pathname === `/${locale}`
    return pathname.startsWith(localized)
  }

  const otherLocale = locales.find((l) => l !== locale) as LocaleTypes

  function otherLocaleHref() {
    if (locale === 'en') {
      // Going to /es/...
      return pathname === '/' ? '/es' : `/es${pathname}`
    }
    // Going to /... (removing /es)
    const stripped = pathname.replace(/^\/es/, '') || '/'
    return stripped
  }

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'
    setTheme(next)
  }

  const isDark = mounted && (theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches))

  return (
    <header className="site-header">
      <div className="wrap">
        <div className="row">
          {/* Brand */}
          <Link href={localHref('/')} className="brand">
            <span className="logo">Y</span>
            <span className="name">yali dev</span>
          </Link>

          {/* Desktop nav */}
          <nav className="nav" aria-label="Main navigation">
            {headerNavLinks.map((link) => (
              <Link
                key={link.href}
                href={localHref(link.href)}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Tools */}
          <div className="header-tools">
            {/* Search */}
            <Link href={localHref('/blog')} className="icon-btn" aria-label={t('search')}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
                <path d="M15 15l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </Link>

            {/* Language toggle */}
            <Link href={otherLocaleHref()} className="icon-btn" aria-label={t('lang')}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" />
                <path d="M10 2c0 0-4 3-4 8s4 8 4 8" stroke="currentColor" strokeWidth="1.8" />
                <path d="M10 2c0 0 4 3 4 8s-4 8-4 8" stroke="currentColor" strokeWidth="1.8" />
                <path d="M2 10h16" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </Link>

            {/* Theme toggle */}
            <button className="icon-btn" onClick={toggleTheme} aria-label={t('darkmode')}>
              {isDark ? (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" fill="currentColor" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M10 2v1M10 17v1M2 10h1M17 10h1M4.22 4.22l.7.7M15.08 15.08l.7.7M15.08 4.22l-.7.7M4.22 15.08l-.7.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
            </button>

            {/* Mobile hamburger */}
            <MobileNav locale={locale} />
          </div>
        </div>
      </div>
    </header>
  )
}
