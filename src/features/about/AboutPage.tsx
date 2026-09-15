'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Authors } from '#site/content'
import { LocaleTypes } from '@/i18n/settings'
import { useTranslation } from '@/i18n/client'
import siteMetadata from '@/lib/siteMetadata'

interface AboutPageProps {
  author: Authors
  locale: LocaleTypes
}

const ghIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
  </svg>
)
const liIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.55V9h3.57v11.45z" />
  </svg>
)
const xiIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)
const igIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.06 1.17-.26 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.07.36-2.24.41-1.27.06-1.65.07-4.86.07s-3.59-.01-4.86-.07c-1.17-.06-1.82-.26-2.24-.42-.57-.22-.96-.48-1.38-.9-.42-.42-.69-.82-.9-1.38-.16-.42-.36-1.07-.42-2.24-.04-1.26-.06-1.65-.06-4.84s.02-3.59.06-4.86c.06-1.17.26-1.81.42-2.23.21-.57.48-.96.9-1.38.42-.42.81-.69 1.38-.9.42-.17 1.05-.36 2.22-.42 1.28-.05 1.65-.06 4.86-.06zm0-2.16C8.74 0 8.33.02 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.02 8.33 0 8.74 0 12s.02 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.67 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.02 4.95-.07c1.28-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.67-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.02-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13-.67-.67-1.34-1.08-2.13-1.38-.76-.3-1.64-.5-2.91-.56C15.67.02 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.41a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
  </svg>
)
const dcIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
  </svg>
)

export default function AboutPage({ author, locale }: AboutPageProps) {
  const { t } = useTranslation(locale, 'about')

  const timelineMeta = [
    { when: '2025 — Present', where: 'Lapzo', lead: true },
    { when: '2024 — Present', where: 'Independent' },
    { when: '2021 — 2024', where: 'Monadical' },
    { when: '2018 — 2020', where: 'BCFort' },
    { when: '2010 — 2021', where: 'Universidad de Antioquia' },
  ]
  const timeline = timelineMeta.map((m, i) => ({
    ...m,
    title: t(`journey.timeline.${i}.title`),
    desc: t(`journey.timeline.${i}.desc`),
  }))

  const principles = ['01', '02', '03'].map((num, i) => ({
    num,
    title: t(`principles.items.${i}.title`),
    desc: t(`principles.items.${i}.desc`),
  }))

  const buildToolNames = [
    'Python',
    'TypeScript',
    'Next.js · React',
    'PostgreSQL',
    'Solidity · EVM',
    'Rust',
  ]
  const buildTools = buildToolNames.map((nm, i) => ({
    nm,
    cm: t(`toolkit.buildTools.${i}.cm`),
  }))

  const thinkToolNames = [
    'LaTeX · Typst',
    'Obsidian',
    'Figma',
    'Linear',
    'tmux · Neovim',
    'Whiteboards',
  ]
  const thinkTools = thinkToolNames.map((nm, i) => ({
    nm,
    cm: t(`toolkit.thinkTools.${i}.cm`),
  }))

  const nowIcons = ['✍︎', '⌁', '◉', '❋']
  const nowItems = nowIcons.map((ic, i) => ({
    ic,
    title: t(`now.items.${i}.title`),
    desc: t(`now.items.${i}.desc`),
  }))

  const elsewhere = [
    {
      icon: ghIcon,
      href: siteMetadata.github,
      title: 'GitHub',
      desc: t('elsewhere.items.0.desc'),
      hl: '@asanchezyali →',
    },
    {
      icon: liIcon,
      href: siteMetadata.linkedin,
      title: 'LinkedIn',
      desc: t('elsewhere.items.1.desc'),
      hl: '@asanchezyali →',
    },
    {
      icon: xiIcon,
      href: siteMetadata.x,
      title: 'X / Twitter',
      desc: t('elsewhere.items.2.desc'),
      hl: '@asanchezyali →',
    },
    {
      icon: igIcon,
      href: siteMetadata.instagram,
      title: 'Instagram',
      desc: t('elsewhere.items.3.desc'),
      hl: '@yalixyz →',
    },
    {
      icon: dcIcon,
      href: siteMetadata.discord,
      title: 'CODE & MATH',
      desc: t('elsewhere.items.4.desc'),
      hl: t('elsewhere.discord_cta'),
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="about-hero wrap">
        <div className="inner">
          <div>
            <span className="eyebrow">{t('hero.eyebrow')}</span>
            <h1>
              {t('hero.title_pre')}
              <span className="accent">{t('hero.title_accent')}</span>.
            </h1>
            <p className="lead">{t('hero.lead')}</p>
            <div className="quick">
              <span>◉ {t('hero.quick.location')}</span>
              <span>◎ {t('hero.quick.available')}</span>
              <span>✦ {t('hero.quick.experience')}</span>
            </div>
            <div className="ctas">
              <a
                href="https://cal.com/asanchezyali/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn primary"
              >
                {t('hero.cta_primary')}
              </a>
              <a href={siteMetadata.github} target="_blank" rel="noreferrer" className="btn ghost">
                {t('hero.cta_github')}
              </a>
            </div>
          </div>
          <div className="portrait-stack">
            <div className="card main">
              {author.avatar ? (
                <Image src={author.avatar} alt={author.name} fill style={{ objectFit: 'cover' }} />
              ) : (
                <div className="ph" style={{ width: '100%', height: '100%' }}>
                  {author.name.slice(0, 2)}
                </div>
              )}
            </div>
            <span className="tag">{t('hero.tag')}</span>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="stmt">
        <div className="wrap-narrow">
          <span className="mark">&ldquo;</span>
          <blockquote>{t('quote')}</blockquote>
        </div>
      </section>

      {/* Journey */}
      <section className="journey">
        <div className="sec-head">
          <span className="eyebrow">{t('journey.eyebrow')}</span>
          <h2>{t('journey.h2')}</h2>
          <p>{t('journey.p')}</p>
        </div>
        <div className="tline">
          {timeline.map((m, i) => (
            <div key={i} className={`row${m.lead ? ' lead' : ''}`}>
              <div className="when">{m.when}</div>
              <div className="dot" />
              <div className="body">
                <h3>{m.title}</h3>
                <span className="where">{m.where}</span>
                <p>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="principles wrap">
        <div className="sec-head">
          <span className="eyebrow">{t('principles.eyebrow')}</span>
          <h2>{t('principles.h2')}</h2>
        </div>
        <div className="p-grid">
          {principles.map((p) => (
            <div key={p.num} className="p-card">
              <span className="num">{p.num}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Toolkit */}
      <section className="toolkit wrap">
        <div className="sec-head">
          <span className="eyebrow">{t('toolkit.eyebrow')}</span>
          <h2>{t('toolkit.h2')}</h2>
        </div>
        <div className="tk-grid">
          <div className="tk-group">
            <h3>{t('toolkit.building')}</h3>
            <ul>
              {buildTools.map((tool) => (
                <li key={tool.nm}>
                  <span className="nm">{tool.nm}</span>
                  <span className="dt" />
                  <span className="cm">{tool.cm}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="tk-group">
            <h3>{t('toolkit.thinking')}</h3>
            <ul>
              {thinkTools.map((tool) => (
                <li key={tool.nm}>
                  <span className="nm">{tool.nm}</span>
                  <span className="dt" />
                  <span className="cm">{tool.cm}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Now */}
      <section className="now wrap">
        <div className="now-card">
          <div>
            <span className="lbl">
              <span className="live" />
              {t('now.label')}
            </span>
            <h2>{t('now.h2')}</h2>
          </div>
          <ul>
            {nowItems.map((item) => (
              <li key={item.title}>
                <span className="ic">{item.ic}</span>
                <div className="tx">
                  <strong>{item.title}</strong>
                  {item.desc}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Elsewhere */}
      <section className="elsewhere wrap">
        <div className="sec-head">
          <span className="eyebrow">{t('elsewhere.eyebrow')}</span>
          <h2>{t('elsewhere.h2')}</h2>
        </div>
        <div className="el-grid">
          {elsewhere.map((el) => (
            <a key={el.title} className="el-card" href={el.href} target="_blank" rel="noreferrer">
              <div className="ic">{el.icon}</div>
              <h4>{el.title}</h4>
              <p>{el.desc}</p>
              <span className="hl">{el.hl}</span>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta wrap">
        <h2>
          {t('cta.h2_pre')}
          <span className="accent">{t('cta.h2_accent')}</span>.
        </h2>
        <p>{t('cta.p')}</p>
        <div className="buttons">
          <a
            href="https://cal.com/asanchezyali/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn primary"
          >
            {t('cta.button')}
          </a>
          <Link href={locale === 'en' ? '/blog' : `/${locale}/blog`} className="btn ghost">
            {t('cta.link')}
          </Link>
        </div>
      </section>
    </>
  )
}
