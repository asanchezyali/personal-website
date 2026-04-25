'use client'
import React from 'react'
import Link from 'next/link'
import { useTranslation } from '@/i18n/client'
import { LocaleTypes } from '@/i18n/settings'

interface TagsPageClientProps {
  locale: LocaleTypes
  tags: Record<string, number>
}

export default function TagsPageClient({ locale, tags }: TagsPageClientProps) {
  const { t } = useTranslation(locale, 'common')

  function localHref(href: string) {
    if (locale === 'en') return href
    return `/${locale}${href}`
  }

  const sortedTags = Object.entries(tags).sort(([, a], [, b]) => b - a)

  return (
    <div className="wrap-narrow">
      <div style={{ padding: '64px 0 40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(36px,5vw,56px)', lineHeight: 1.05, marginBottom: 12 }}>
          <span className="accent">{t('tags')}</span>
        </h1>
        <p className="muted" style={{ fontSize: 18 }}>Browse all topics covered in the blog</p>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          paddingBottom: 80,
          justifyContent: 'center',
        }}
      >
        {sortedTags.map(([tag, count]) => (
          <Link
            key={tag}
            href={localHref(`/tags/${tag}`)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 999,
              border: '1px solid var(--g-200)',
              color: 'var(--g-700)',
              fontFamily: 'var(--f-lato)',
              fontSize: 14,
              fontWeight: 500,
              transition: 'all .2s var(--ease)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'var(--p-500)'
              el.style.color = 'var(--p-500)'
              el.style.background = 'var(--p-50)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'var(--g-200)'
              el.style.color = 'var(--g-700)'
              el.style.background = 'transparent'
            }}
          >
            #{tag}
            <span
              style={{
                background: 'var(--p-500)',
                color: '#fff',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                padding: '2px 7px',
              }}
            >
              {count}
            </span>
          </Link>
        ))}

        {sortedTags.length === 0 && (
          <p className="muted">No tags found.</p>
        )}
      </div>
    </div>
  )
}
