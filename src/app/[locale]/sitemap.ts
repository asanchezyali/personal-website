import { MetadataRoute } from 'next'
import { LocaleTypes, locales } from '@/i18n/settings'
import siteMetadata from '@/lib/siteMetadata'
import { posts } from '#site/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteMetadata.siteUrl

  const staticRoutes: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    const prefix = locale === 'en' ? '' : `/${locale}`
    const pages = ['', '/blog', '/about', '/collaborate', '/tags']
    pages.forEach((page) => {
      staticRoutes.push({
        url: `${base}${prefix}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
      })
    })
  }

  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((p) => !p.draft)
    .map((post) => {
      const locale = post.language as LocaleTypes
      const prefix = locale === 'en' ? '' : `/${locale}`
      const slugParts = post.slug.replace(/^blog\/[a-z]{2}\//, '')
      return {
        url: `${base}${prefix}/blog/${slugParts}`,
        lastModified: new Date(post.lastmod || post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      }
    })

  return [...staticRoutes, ...postRoutes]
}
