'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Blog } from '#site/content'
import { LocaleTypes } from '@/i18n/settings'
import { useTranslation } from '@/i18n/client'
import { formatDate } from 'pliny/utils/formatDate'

interface BlogPageClientProps {
  locale: LocaleTypes
  posts: Blog[]
  tags: Record<string, number>
}

export default function BlogPageClient({ locale, posts, tags }: BlogPageClientProps) {
  const { t } = useTranslation(locale, 'home')
  const { t: tb } = useTranslation(locale, 'blog')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  function localHref(href: string) {
    if (locale === 'en') return href
    return `/${locale}${href}`
  }

  const published = posts
    .filter((p) => p.language === locale && !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const afterTag = activeTag
    ? published.filter((p) => p.tags.some((tag) => tag.toLowerCase().replace(/\s+/g, '-') === activeTag))
    : published

  const filtered = search.trim()
    ? afterTag.filter((p) => {
        const q = search.toLowerCase()
        return p.title.toLowerCase().includes(q) || (p.summary || '').toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
      })
    : afterTag

  const featured = filtered[0]
  const rest = filtered.slice(1)

  // Group by year
  const byYear: Record<string, Blog[]> = {}
  rest.forEach((p) => {
    const y = new Date(p.date).getFullYear().toString()
    if (!byYear[y]) byYear[y] = []
    byYear[y].push(p)
  })
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a))

  function postSlug(post: Blog) {
    // Remove "blog/en/" or "blog/es/" prefix
    const parts = post.slug.replace(/^blog\/[a-z]{2}\//, '')
    return localHref(`/blog/${parts}`)
  }

  return (
    <div className="wrap">
      {/* Blog hero */}
      <div className="blog-hero" style={{ textAlign: 'left' }}>
        <span className="status-pill">
          <span className="dot" />
          Writing Notebook
        </span>
        <h1>
          <span className="accent">{tb('title')}</span>
        </h1>
        <p style={{ margin: 0 }}>{tb('description')}</p>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-row">
          <div className="search-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
            <input type="search" placeholder="Search posts, topics, tags…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="tag-bar">
          <button
            className={`tag${activeTag === null ? ' active' : ''}`}
            onClick={() => { setActiveTag(null); setSearch('') }}
          >
            All
          </button>
          {Object.entries(tags)
            .sort(([, a], [, b]) => b - a)
            .map(([tag, count]) => (
              <button
                key={tag}
                className={`tag${activeTag === tag ? ' active' : ''}`}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              >
                {tag} ({count})
              </button>
            ))}
        </div>
      </div>

      {/* Featured post */}
      {featured && (
        <Link href={postSlug(featured)} style={{ textDecoration: 'none', color: 'inherit' }}>
          <article className="featured">
            <div className="cover">
              {featured.headerImage ? (
                <Image
                  src={featured.headerImage}
                  alt={featured.title}
                  width={600}
                  height={450}
                  style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: 20 }}
                />
              ) : (
                <div className="ph" style={{ width: '100%', height: '100%', borderRadius: 20, minHeight: 280 }}>
                  {featured.title.slice(0, 2)}
                </div>
              )}
            </div>
            <div>
              <div className="meta-row">
                <span>Featured</span>
                <span>·</span>
                <span>{formatDate(featured.date, locale)}</span>
              </div>
              <h2>{featured.title}</h2>
              <p className="excerpt">{featured.summary}</p>
              <div className="author">
                <div className="avatar ph" style={{ width: 36, height: 36, borderRadius: '50%', fontSize: 10 }}>A</div>
                <span>Alejandro Sánchez Yalí</span>
              </div>
            </div>
          </article>
        </Link>
      )}

      {/* Year-bucketed list */}
      {years.map((year) => (
        <div key={year}>
          <div className="year-head">
            <span className="year">{year}</span>
            <span className="count">{byYear[year].length} posts</span>
          </div>
          {byYear[year].map((post) => (
            <Link key={post.slug} href={postSlug(post)} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <article className="post-row">
                <span className="date">
                  {formatDate(post.date, locale).slice(0, 6)}
                </span>
                <div>
                  <h3>{post.title}</h3>
                  {post.summary && <p className="snip">{post.summary.slice(0, 100)}…</p>}
                </div>
                <div className="tags-inline">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="chip">{tag}</span>
                  ))}
                </div>
                <span className="arrow">→</span>
              </article>
            </Link>
          ))}
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="muted" style={{ textAlign: 'center', padding: '48px 0' }}>{t('noposts')}</p>
      )}
    </div>
  )
}
