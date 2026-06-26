import Link from 'next/link'
import { headers } from 'next/headers'
import { createTranslation } from '@/i18n/server'
import { LocaleTypes } from '@/i18n/settings'

export default async function NotFound() {
  const pathname = (await headers()).get('x-pathname') ?? ''
  const locale: LocaleTypes = pathname.startsWith('/es') ? 'es' : 'en'
  const { t } = await createTranslation(locale, 'notfound')

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
