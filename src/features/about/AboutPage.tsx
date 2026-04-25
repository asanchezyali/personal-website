import React from 'react'
import Image from 'next/image'
import { Authors } from '#site/content'
import { LocaleTypes } from '@/i18n/settings'

interface AboutPageProps {
  author: Authors
  locale: LocaleTypes
  children: React.ReactNode
}

export default function AboutPage({ author, locale, children }: AboutPageProps) {
  return (
    <div className="wrap">
      {/* About hero */}
      <section className="about-hero">
        <div className="inner">
          <div>
            <span className="eyebrow">About me</span>
            <h1>
              Mathematics{' '}
              <span className="accent">meets</span>
              <br />
              Code
            </h1>
            <p className="lead">
              I&apos;m Alejandro — a software developer with a deep mathematical background, passionate about AI, open source, and knowledge sharing.
            </p>
            <div className="quick">
              <span>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M10 2c0 0-4 3-4 8s4 8 4 8M10 2c0 0 4 3 4 8s-4 8-4 8M2 10h16" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                Medellín, Colombia
              </span>
              {author.occupation && (
                <span>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                    <rect x="2" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M6 6V4a2 2 0 014 0v2" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                  {author.occupation}
                </span>
              )}
            </div>
            <div className="ctas">
              {author.github && (
                <a href={author.github} target="_blank" rel="noreferrer" className="btn primary">
                  GitHub <span className="a">→</span>
                </a>
              )}
              {author.linkedin && (
                <a href={author.linkedin} target="_blank" rel="noreferrer" className="btn ghost">
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Portrait stack */}
          <div className="portrait-stack">
            <div className="card back-a">
              <div className="ph" style={{ width: '100%', height: '100%', fontSize: 12 }}>photo</div>
            </div>
            <div className="card back-b">
              <div className="ph" style={{ width: '100%', height: '100%', fontSize: 12 }}>photo</div>
            </div>
            <div className="card main">
              {author.avatar ? (
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div className="ph" style={{ width: '100%', height: '100%' }}>
                  {author.name.slice(0, 2)}
                </div>
              )}
            </div>
            <span className="tag">Open to collaborate</span>
          </div>
        </div>
      </section>

      {/* Quote block */}
      <section className="stmt">
        <span className="mark">&ldquo;</span>
        <blockquote>
          The art of programming is the art of organizing complexity — and mathematics is its language.
        </blockquote>
      </section>

      {/* MDX body */}
      <div className="prose" style={{ margin: '64px auto' }}>
        {children}
      </div>

      {/* CTA */}
      <section className="about-cta">
        <h2>
          Let&apos;s build something{' '}
          <span className="accent">together</span>
        </h2>
        <p>I&apos;m always open to interesting conversations, collaborations, and new challenges.</p>
        <div className="buttons">
          {author.email && (
            <a href={`mailto:${author.email}`} className="btn primary">
              Say hello <span className="a">→</span>
            </a>
          )}
          {author.github && (
            <a href={author.github} target="_blank" rel="noreferrer" className="btn ghost">
              View GitHub
            </a>
          )}
        </div>
      </section>
    </div>
  )
}
