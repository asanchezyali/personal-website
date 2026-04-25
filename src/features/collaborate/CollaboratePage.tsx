'use client'
import React from 'react'
import Link from 'next/link'
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

  const offers = [
    {
      tag: 'AI & Machine Learning',
      title: 'AI Systems & LLM Integration',
      desc: 'Build intelligent applications powered by large language models, RAG pipelines, and agentic workflows.',
      items: ['Conversational agents & chatbots', 'RAG pipelines & vector databases', 'Fine-tuning & prompt engineering', 'AI product strategy'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M5.636 5.636l2.121 2.121M16.243 16.243l2.121 2.121M5.636 18.364l2.121-2.121M16.243 7.757l2.121-2.121" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      tag: 'Full Stack',
      title: 'Web Application Development',
      desc: 'Design and build scalable web applications from frontend to backend with modern technologies.',
      items: ['React / Next.js frontends', 'Node.js / Python backends', 'Database design & optimization', 'API design & integration'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="14" rx="2" stroke="white" strokeWidth="2" />
          <path d="M8 21h8M12 17v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M7 8l3 3-3 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 14h4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      tag: 'Education',
      title: 'Technical Teaching & Mentoring',
      desc: 'Share knowledge through workshops, courses, or 1:1 mentoring in mathematics, programming, and AI.',
      items: ['Mathematics & algorithms', 'Machine learning fundamentals', 'Code reviews & pair programming', 'Study group facilitation'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 3L2 8l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
          <path d="M2 8v8M22 8v8M7 10.5v6a5 5 0 0010 0v-6" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ]

  const steps = [
    { num: '01', title: 'Reach out', desc: 'Send me a message describing your project or idea.' },
    { num: '02', title: 'Discovery call', desc: 'We schedule a 30-min call to align on goals and scope.' },
    { num: '03', title: 'Proposal', desc: 'I send a tailored proposal with timeline and pricing.' },
    { num: '04', title: 'Build together', desc: 'We kick off and iterate with regular check-ins.' },
  ]

  const channels = [
    {
      href: `mailto:${siteMetadata.email}`,
      lbl: 'Email',
      val: siteMetadata.email,
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      href: siteMetadata.discord,
      lbl: 'Discord',
      val: 'Join community',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.23A.077.077 0 008.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026 13.83 13.83 0 001.226-1.963.074.074 0 00-.041-.104 13.201 13.201 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
        </svg>
      ),
    },
    {
      href: siteMetadata.linkedin,
      lbl: 'LinkedIn',
      val: 'Connect professionally',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      href: siteMetadata.github,
      lbl: 'GitHub',
      val: 'View projects',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="wrap">
      {/* Hero */}
      <section className="col-hero">
        <span className="status-pill" style={{ margin: '0 auto 16px', display: 'inline-flex' }}>
          <span className="dot" />
          Available for work
        </span>
        <h1>
          <span className="accent">Collaborate</span>
        </h1>
        <p>{t('hero.description')}</p>
        <div className="ctas">
          <a href="https://cal.com/asanchezyali/30min" target="_blank" rel="noopener noreferrer" className="btn primary">
            Book an intro call <span className="a">→</span>
          </a>
          <a href={siteMetadata.discord} target="_blank" rel="noreferrer" className="btn discord">
            Join Discord
          </a>
        </div>
      </section>

      {/* Offers */}
      <div className="offers">
        {offers.map((offer) => (
          <div key={offer.title} className="offer">
            <div className="shape">{offer.icon}</div>
            <span className="tag">{offer.tag}</span>
            <h3>{offer.title}</h3>
            <p>{offer.desc}</p>
            <ul>
              {offer.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Process */}
      <section className="process">
        <h2>How we work together</h2>
        <p className="sub">A simple, transparent process from first contact to final delivery.</p>
        <div className="steps">
          {steps.map((step) => (
            <div key={step.num} className="step">
              <div className="num">{step.num}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="contact">
        <div>
          <h2 className="big">
            Let&apos;s{' '}
            <span className="accent">connect</span>
          </h2>
          <p>{t('connect.description')}</p>
        </div>
        <div className="channels">
          {channels.map((ch) => (
            <a
              key={ch.lbl}
              href={ch.href}
              target={ch.href.startsWith('mailto') ? undefined : '_blank'}
              rel={ch.href.startsWith('mailto') ? undefined : 'noreferrer'}
              className="channel"
            >
              <div className="ic">{ch.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="lbl">{ch.lbl}</div>
                <div className="val">{ch.val}</div>
              </div>
              <span className="arr">↗</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
