'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '@/i18n/client'
import { LocaleTypes } from '@/i18n/settings'
import { Blog } from '#site/content'
import { formatDate } from 'pliny/utils/formatDate'

interface BlogPreviewSectionProps {
  locale: LocaleTypes
  posts: Blog[]
}

export default function BlogPreviewSection({ locale, posts }: BlogPreviewSectionProps) {
  const { t } = useTranslation(locale, 'home')

  function localHref(href: string) {
    if (locale === 'en') return href
    return `/${locale}${href}`
  }

  const latest = posts
    .filter((p) => p.language === locale && !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return (
    <section className="blog-preview wrap">
      <h2 className="section-h" style={{ textAlign: 'center' }}>{t('hero.blog_section')}</h2>
      <p className="section-sub" style={{ textAlign: 'center' }}>{t('hero.blog_description')}</p>

      <div className="posts-grid">
        {latest.map((post) => {
          const slugParts = post.slug.replace(/^blog\/[a-z]{2}\//, '')
          const postHref = localHref(`/blog/${slugParts}`)

          return (
            <Link key={post.slug} href={postHref} className="post-card" style={{ textDecoration: 'none' }}>
              <div className="cover">
                {post.headerImage ? (
                  <Image
                    src={post.headerImage}
                    alt={post.title}
                    width={400}
                    height={225}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                ) : (
                  <div className="ph" style={{ width: '100%', height: '100%', minHeight: 180 }}>
                    {post.title.slice(0, 2)}
                  </div>
                )}
              </div>
              <div className="body">
                <div className="tag-row">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="chip">{tag}</span>
                  ))}
                </div>
                <h3>{post.title}</h3>
                {post.summary && <p className="excerpt">{post.summary.slice(0, 120)}…</p>}
                <div className="meta">
                  <span>{formatDate(post.date, locale)}</span>
                  <span>{post.metadata?.readingTime ?? '—'} min read</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="see-all">
        <Link href={localHref('/blog')} className="btn ghost">
          {t('all')} <span className="a">→</span>
        </Link>
      </div>
    </section>
  )
}
