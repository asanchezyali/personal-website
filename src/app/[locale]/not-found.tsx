'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LocaleTypes } from '@/i18n/settings'
import en from '@/i18n/locales/en/notfound.json'
import es from '@/i18n/locales/es/notfound.json'

const strings: Record<LocaleTypes, typeof en> = { en, es }

// Client component on purpose: reading request headers here (headers()) made
// every route under [locale] opt out of static prerendering, so no page was
// cached by the CDN. The strings are imported directly so the 404 text is in
// the server-rendered HTML instead of loading after hydration.
export default function NotFound() {
  const pathname = usePathname() ?? ''
  const locale: LocaleTypes = pathname.startsWith('/es') ? 'es' : 'en'
  const t = (key: keyof typeof en) => strings[locale][key]

  return (
    <div
      className="wrap"
      style={{
        minHeight: 'calc(100dvh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '64px 24px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--f-ubuntu)',
          fontSize: 'clamp(80px,18vw,160px)',
          fontWeight: 700,
          lineHeight: 0.9,
          background: 'linear-gradient(90deg, var(--p-500), var(--s-500))',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          marginBottom: 32,
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        404
      </div>
      <h1 style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: 16 }}>{t('title')}</h1>
      <p className="muted" style={{ fontSize: 17, maxWidth: '48ch', marginBottom: 32 }}>
        {t('description')}
      </p>
      <Link href={locale === 'en' ? '/' : `/${locale}`} className="btn primary">
        {t('back')} <span className="a">→</span>
      </Link>
    </div>
  )
}
