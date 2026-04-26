'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import headerNavLinks from '@/lib/headerNavLinks'
import { LocaleTypes } from '@/i18n/settings'

interface MobileNavProps {
  locale: LocaleTypes
}

export default function MobileNav({ locale }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const pathname = usePathname()
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const check = () => setShowBtn(window.innerWidth <= 760)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  function localHref(href: string) {
    if (locale === 'en') return href
    return href === '/' ? `/${locale}` : `/${locale}${href}`
  }

  function isActive(href: string) {
    const localized = localHref(href)
    if (href === '/') return pathname === localized || pathname === `/${locale}`
    return pathname.startsWith(localized)
  }

  if (!showBtn) return null

  return (
    <>
      <button
        ref={btnRef}
        className="icon-btn"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
      >
        {isOpen ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {isOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              background: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(4px)',
            }}
            onClick={() => setIsOpen(false)}
          />
          <nav
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(320px, 85vw)',
              zIndex: 55,
              background: 'var(--bg)',
              borderLeft: '1px solid var(--g-200)',
              padding: '72px 24px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="icon-btn"
              aria-label="Close menu"
              style={{ position: 'absolute', top: 16, right: 16 }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {headerNavLinks.map((link) => (
              <Link
                key={link.href}
                href={localHref(link.href)}
                aria-current={isActive(link.href) ? 'page' : undefined}
                style={{
                  padding: '12px 16px',
                  borderRadius: 10,
                  fontFamily: 'var(--f-lato)',
                  fontSize: 15,
                  fontWeight: 500,
                  color: isActive(link.href) ? 'var(--p-500)' : 'var(--g-600)',
                  background: isActive(link.href) ? 'var(--p-50)' : 'transparent',
                  transition: 'all .2s var(--ease)',
                }}
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </>
      )}
    </>
  )
}
