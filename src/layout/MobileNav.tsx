'use client'
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import headerNavLinks from '@/lib/headerNavLinks'
import { useTranslation } from '@/i18n/client'
import { LocaleTypes } from '@/i18n/settings'

interface MobileNavProps {
  locale: LocaleTypes
}

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export default function MobileNav({ locale }: MobileNavProps) {
  const { t } = useTranslation(locale, 'common')
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // While open: Escape closes, and the page behind does not scroll.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  function localHref(href: string) {
    if (locale === 'en') return href
    return href === '/' ? `/${locale}` : `/${locale}${href}`
  }

  function isActive(href: string) {
    const localized = localHref(href)
    if (href === '/') return pathname === localized || pathname === `/${locale}`
    return pathname.startsWith(localized)
  }

  // The drawer is portalled to <body>: the header's backdrop-filter makes it the
  // containing block for fixed children, which would clip the drawer to its height.
  const drawer = (
    <div className={`mnav${isOpen ? ' open' : ''}`} aria-hidden={!isOpen}>
      <button
        className="mnav-scrim"
        aria-label={t('closemenu')}
        tabIndex={-1}
        onClick={() => setIsOpen(false)}
      />
      <nav id="mobile-nav" className="mnav-panel" aria-label="Main navigation">
        <button
          className="icon-btn mnav-close"
          aria-label={t('closemenu')}
          tabIndex={isOpen ? 0 : -1}
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon />
        </button>
        <div className="mnav-links">
          {headerNavLinks.map((link) => (
            <Link
              key={link.href}
              href={localHref(link.href)}
              aria-current={isActive(link.href) ? 'page' : undefined}
              tabIndex={isOpen ? 0 : -1}
            >
              {t(link.tkey)}
            </Link>
          ))}
        </div>
        <a
          href="https://cal.com/asanchezyali/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="btn primary mnav-cta"
          tabIndex={isOpen ? 0 : -1}
        >
          {t('contact')} <span className="a">→</span>
        </a>
      </nav>
    </div>
  )

  return (
    <>
      <button
        className="icon-btn menu-btn"
        aria-label={t('togglemenu')}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        onClick={() => setIsOpen((v) => !v)}
      >
        {isOpen ? (
          <CloseIcon />
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M2 4h14M2 9h14M2 14h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
      {mounted && createPortal(drawer, document.body)}
    </>
  )
}
