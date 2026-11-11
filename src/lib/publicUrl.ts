import type { Metadata } from 'next'
import siteMetadata from '@/lib/siteMetadata'
import { fallbackLng } from '@/i18n/locales'
import type { LocaleTypes } from '@/i18n/settings'

/**
 * Absolute public URL for a page. English lives at the root (no `/en`), because the
 * middleware redirects `/en/...` away; other locales keep their prefix.
 */
export function publicUrl(locale: LocaleTypes, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '')
  const prefix = locale === fallbackLng ? '' : `/${locale}`
  const url = `${siteMetadata.siteUrl}${prefix}${clean ? `/${clean}` : ''}`
  return url || siteMetadata.siteUrl
}

/** Canonical URL plus the locale's RSS feed. */
export function pageAlternates(locale: LocaleTypes, path = ''): Metadata['alternates'] {
  return {
    canonical: publicUrl(locale, path),
    // scripts/rss.mjs writes one feed per locale to public/<locale>/feed.xml.
    types: { 'application/rss+xml': `${siteMetadata.siteUrl}/${locale}/feed.xml` },
  }
}
