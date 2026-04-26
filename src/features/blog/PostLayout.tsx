import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Blog, Authors } from '#site/content'
import { LocaleTypes } from '@/i18n/settings'
import { formatDate } from 'pliny/utils/formatDate'
import ReadingProgress from './ReadingProgress'
import TocFab from './TocFab'
import ShareFab from './ShareFab'

interface PostLayoutProps {
  content: Blog
  author: Authors
  locale: LocaleTypes
  children: React.ReactNode
  prev?: { slug: string; title: string } | null
  next?: { slug: string; title: string } | null
}

export default function PostLayout({ content, author, locale, children, prev, next }: PostLayoutProps) {
  function localHref(href: string) {
    if (locale === 'en') return href
    return `/${locale}${href}`
  }

  function postHref(slug: string) {
    const parts = slug.replace(/^blog\/[a-z]{2}\//, '')
    return localHref(`/blog/${parts}`)
  }

  return (
    <>
      <ReadingProgress />
      <TocFab toc={content.toc ?? []} />
      <ShareFab title={content.title} slug={content.slug} />

      {/* Hero */}
      <div className="post-hero">
        <h1>{content.title}</h1>
      </div>

      {/* Cover image */}
      {content.headerImage && (
        <div className="cover-wrap">
          <Image
            src={content.headerImage}
            alt={content.title}
            width={1120}
            height={480}
            priority
            style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: 24 }}
          />
        </div>
      )}

      {/* Byline */}
      <div className="byline">
        <div className="left">
          <div className="author">
            <div className="avatar">
              {author.avatar ? (
                <Image src={author.avatar} alt={author.name} width={28} height={28} style={{ objectFit: 'cover', borderRadius: '50%' }} />
              ) : (
                <div className="ph" style={{ width: 28, height: 28, borderRadius: '50%', fontSize: 10 }}>A</div>
              )}
            </div>
            <span>{author.name}</span>
          </div>
          <span className="sep">·</span>
          <span>{formatDate(content.date, locale)}</span>
          {content.metadata?.readingTime && (
            <>
              <span className="sep">·</span>
              <span>{content.metadata.readingTime} min read</span>
            </>
          )}
        </div>
        <div className="tag-row">
          {content.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="chip">{tag}</span>
          ))}
        </div>
      </div>

      {/* Prose body */}
      <article className="post-body">
        {children}
      </article>

      {/* Author box */}
      <div style={{ maxWidth: 1280, margin: '64px auto 0', padding: '0 24px' }}>
        <div className="author-box">
          <div className="avatar">
            {author.avatar ? (
              <Image src={author.avatar} alt={author.name} width={64} height={64} style={{ objectFit: 'cover', borderRadius: '50%' }} />
            ) : (
              <div className="ph" style={{ width: 64, height: 64, borderRadius: '50%' }}>A</div>
            )}
          </div>
          <div>
            <h4>{author.name}</h4>
            {author.occupation && <p style={{ marginBottom: 8, fontWeight: 500, fontSize: 13, color: 'var(--p-600)' }}>{author.occupation}</p>}
            <p>
              Mathematics × Code × AI — exploring the intersections of programming and mathematical thinking.
            </p>
          </div>
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <nav style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--g-200)' }}>
            {prev ? (
              <Link href={postHref(prev.slug)} style={{ maxWidth: '45%' }}>
                <span style={{ fontSize: 12, color: 'var(--g-500)', display: 'block', marginBottom: 4 }}>← Previous</span>
                <span style={{ fontWeight: 600 }}>{prev.title}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={postHref(next.slug)} style={{ maxWidth: '45%', textAlign: 'right' }}>
                <span style={{ fontSize: 12, color: 'var(--g-500)', display: 'block', marginBottom: 4 }}>Next →</span>
                <span style={{ fontWeight: 600 }}>{next.title}</span>
              </Link>
            ) : <span />}
          </nav>
        )}
      </div>
    </>
  )
}
