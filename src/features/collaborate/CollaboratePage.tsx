'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '@/i18n/client'
import { LocaleTypes } from '@/i18n/settings'
import siteMetadata from '@/lib/siteMetadata'

interface CollaboratePageProps {
  locale: LocaleTypes
}

export default function CollaboratePage({ locale }: CollaboratePageProps) {
  const { t } = useTranslation(locale, 'collaborate')

  function localHref(href: string) {
    if (locale === 'en') return href
    return `/${locale}${href}`
  }

  const milestones = t('journey.milestones', { returnObjects: true }) as Array<{
    year: string; role: string; company: string; description: string
  }>

  const projects = [1, 2, 3, 4].map((n) => ({
    title: t(`projects.project_${n}.title`),
    description: t(`projects.project_${n}.description`),
    technologies: t(`projects.project_${n}.technologies`, { returnObjects: true }) as string[],
  }))

  const channels = [
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>, key: 'channel_1', href: siteMetadata.discord },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>, key: 'channel_2', href: siteMetadata.github },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.55V9h3.57v11.45z"/></svg>, key: 'channel_3', href: siteMetadata.linkedin },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, key: 'channel_4', href: 'https://cal.com/asanchezyali/30min' },
  ]

  return (
    <div className="wrap">
      {/* Hero */}
      <section className="col-hero" style={{ textAlign: 'left' }}>
        <span className="status-pill"><span className="dot" /> {t('hero.title')}</span>
        <h1 style={{ fontSize: 'clamp(40px, 5.6vw, 64px)', lineHeight: 1.05, margin: '16px 0' }}>
          {locale === 'es' ? (<>Construyamos algo<br/><span className="accent">juntos.</span></>) : (<>Let&apos;s build something<br/><span className="accent">together.</span></>)}
        </h1>
        <p style={{ maxWidth: 640 }}>{t('hero.description')}</p>
        <div className="ctas" style={{ justifyContent: 'flex-start', marginTop: 24 }}>
          <a href="https://cal.com/asanchezyali/30min" target="_blank" rel="noopener noreferrer" className="btn primary">
            {locale === 'es' ? 'Agendar llamada' : 'Book a call'} <span className="a">→</span>
          </a>
          <a href={siteMetadata.github} target="_blank" rel="noreferrer" className="btn ghost">GitHub</a>
        </div>
      </section>

      {/* Journey */}
      <section className="journey">
        <div className="sec-head">
          <span className="eyebrow">{locale === 'es' ? 'Trayectoria' : 'The long path'}</span>
          <h2>{t('journey.title')}</h2>
          <p>{t('journey.description')}</p>
        </div>
        <div className="tline">
          {Array.isArray(milestones) && milestones.map((m, i) => (
            <div key={i} className={`row${i === 0 ? ' lead' : ''}`}>
              <div className="when">{m.year}</div>
              <div className="dot" />
              <div className="body">
                <h3>{m.role}</h3>
                <span className="where">{m.company}</span>
                <p>{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="projects" style={{ padding: '48px 0' }}>
        <div className="sec-head">
          <span className="eyebrow">{locale === 'es' ? 'Trabajo' : 'Work'}</span>
          <h2>{t('projects.title')}</h2>
          <p>{t('projects.description')}</p>
        </div>
        <div className="pr-grid">
          {projects.map((project, i) => (
            <article key={i} className="pr-card">
              <div className="body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="stack">
                  {Array.isArray(project.technologies) && project.technologies.map((tech, j) => (
                    <span key={j} className="chip">{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Connect */}
      <section className="contact" style={{ padding: '64px 0 24px' }}>
        <div>
          <h2 className="big" style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05, marginBottom: 16 }}>
            {t('connect.title')}
          </h2>
          <p style={{ color: 'var(--g-600)', fontSize: 17, lineHeight: 1.65, maxWidth: '46ch' }}>
            {t('connect.description')}
          </p>
        </div>
        <div className="channels">
          {channels.map((ch) => (
            <a key={ch.key} className="channel" href={ch.href} target="_blank" rel="noreferrer">
              <span className="ic">{ch.icon}</span>
              <div>
                <div className="lbl">{t(`connect.${ch.key}.name`)}</div>
                <div className="val">{t(`connect.${ch.key}.description`)}</div>
              </div>
              <span className="arr">↗</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
