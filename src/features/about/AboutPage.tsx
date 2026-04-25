'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Authors } from '#site/content'
import { LocaleTypes } from '@/i18n/settings'
import siteMetadata from '@/lib/siteMetadata'

interface AboutPageProps {
  author: Authors
  locale: LocaleTypes
  children: React.ReactNode
}

const timeline = [
  { when: '2024 — now', title: 'Independent software + AI consultant', where: 'Remote · Worldwide', desc: 'Designing and shipping AI, Web3, and web products for small teams who care about craft. I also write essays and run Topofilosofía, a weekly study community for mathematics and computer science.', lead: true },
  { when: '2022 — 2024', title: 'Senior engineer · ML & blockchain', where: 'Various product teams', desc: 'Built retrieval systems, recommendation pipelines, and on-chain infrastructure.' },
  { when: '2018 — 2022', title: 'Full-stack engineer', where: 'Startup-land, Latin America', desc: 'Shipped web platforms end-to-end. Learned the hard way that technical debt compounds faster than interest.' },
  { when: '2016', title: 'M.Sc. in Mathematics', where: 'Universidad Nacional de Colombia', desc: 'Focused on topology and geometry. The habit of chasing a proof turned out to be the most portable skill.' },
  { when: '~2014', title: 'First real program', where: 'A cluttered desk', desc: "A small simulation that shouldn't have worked, and somehow did. I've been chasing that feeling ever since." },
]

const principles = [
  { num: '01', title: 'Understand before you build', desc: "Every hour spent sharpening the problem statement saves a week of code. I'd rather ship the second draft of the right thing than the first draft of the wrong one." },
  { num: '02', title: 'Small surfaces, clear edges', desc: "Complex systems are made of simple parts with well-chosen boundaries. If a component is hard to name, it's usually doing too much." },
  { num: '03', title: "Write like you're explaining to yourself", desc: 'Code, essays, and docs all reward the same instinct: assume a reader who is smart, distracted, and a little tired.' },
]

const buildTools = [
  { nm: 'Python', cm: 'data, ML, glue' }, { nm: 'TypeScript', cm: 'everywhere else' },
  { nm: 'Next.js · React', cm: 'front of house' }, { nm: 'PostgreSQL', cm: 'default choice' },
  { nm: 'Solidity · EVM', cm: 'when Web3 fits' }, { nm: 'Rust', cm: 'when it matters' },
]
const thinkTools = [
  { nm: 'LaTeX · Typst', cm: 'for the math' }, { nm: 'Obsidian', cm: 'second brain' },
  { nm: 'Figma', cm: 'for early sketches' }, { nm: 'Linear', cm: 'to stay honest' },
  { nm: 'tmux · Neovim', cm: 'daily drivers' }, { nm: 'Whiteboards', cm: 'still unbeaten' },
]

const nowItems = [
  { ic: '✍︎', title: 'Writing', desc: 'A slow series on RAG systems, aimed at engineers who want the real story.' },
  { ic: '⌁', title: 'Building', desc: 'A small product with a friend. Details later.' },
  { ic: '◉', title: 'Teaching', desc: 'Topofilosofía — a 10-week cohort on topology from the ground up.' },
  { ic: '❋', title: 'Reading', desc: "Cal Newport's Slow Productivity, papers on attention mechanisms, and Borges." },
]

const ghIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>
const liIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.55V9h3.57v11.45z"/></svg>
const xiIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
const dcIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>

const elsewhere = [
  { icon: ghIcon, href: siteMetadata.github, title: 'GitHub', desc: 'Open source, experiments, and a few things I wish I\'d pushed sooner.', hl: '@asanchezyali →' },
  { icon: liIcon, href: siteMetadata.linkedin, title: 'LinkedIn', desc: 'The long-form résumé version. Light on buzzwords, I promise.', hl: '@asanchezyali →' },
  { icon: xiIcon, href: siteMetadata.x, title: 'X / Twitter', desc: 'Half-formed thoughts, notes from the field, the occasional hot take.', hl: '@asanchezyali →' },
  { icon: dcIcon, href: siteMetadata.discord, title: 'Topofilosofía', desc: 'The study community. Topology, CS, slow conversation.', hl: 'Join the Discord →' },
]

export default function AboutPage({ author, locale, children }: AboutPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="about-hero wrap">
        <div className="inner">
          <div>
            <span className="eyebrow">About</span>
            <h1>I build software for <span className="accent">ideas worth thinking hard about</span>.</h1>
            <div className="lead">{children}</div>
            <div className="quick">
              <span>◉ Medellín, Colombia</span>
              <span>◎ Available for projects</span>
              <span>✦ 8+ years shipping</span>
            </div>
            <div className="ctas">
              <a href="https://cal.com/asanchezyali/30min" target="_blank" rel="noopener noreferrer" className="btn primary">Work with me →</a>
              <a href={siteMetadata.github} target="_blank" rel="noreferrer" className="btn ghost">GitHub</a>
            </div>
          </div>
          <div className="portrait-stack">
            <div className="card main">
              {author.avatar ? (
                <Image src={author.avatar} alt={author.name} fill style={{ objectFit: 'cover' }} />
              ) : (
                <div className="ph" style={{ width: '100%', height: '100%' }}>{author.name.slice(0, 2)}</div>
              )}
            </div>
            <span className="tag">Medellín · 2026</span>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="stmt">
        <div className="wrap-narrow">
          <span className="mark">&ldquo;</span>
          <blockquote>Most of what&apos;s worth building requires both the mathematician&apos;s patience and the engineer&apos;s restlessness. I try to keep both in the room.</blockquote>
        </div>
      </section>

      {/* Journey */}
      <section className="journey">
        <div className="sec-head">
          <span className="eyebrow">The long path</span>
          <h2>How I got here</h2>
          <p>A non-linear walk through mathematics, teaching, and software.</p>
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
          <span className="eyebrow">How I work</span>
          <h2>Principles I keep returning to</h2>
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
          <span className="eyebrow">What I reach for</span>
          <h2>Tools &amp; terrain</h2>
        </div>
        <div className="tk-grid">
          <div className="tk-group">
            <h3>Building</h3>
            <ul>
              {buildTools.map((t) => (
                <li key={t.nm}><span className="nm">{t.nm}</span><span className="dt" /><span className="cm">{t.cm}</span></li>
              ))}
            </ul>
          </div>
          <div className="tk-group">
            <h3>Thinking &amp; shipping</h3>
            <ul>
              {thinkTools.map((t) => (
                <li key={t.nm}><span className="nm">{t.nm}</span><span className="dt" /><span className="cm">{t.cm}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Now */}
      <section className="now wrap">
        <div className="now-card">
          <div>
            <span className="lbl"><span className="live" />Now — 2026</span>
            <h2>What I&apos;m working on</h2>
          </div>
          <ul>
            {nowItems.map((item) => (
              <li key={item.title}>
                <span className="ic">{item.ic}</span>
                <div className="tx"><strong>{item.title}</strong>{item.desc}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Elsewhere */}
      <section className="elsewhere wrap">
        <div className="sec-head">
          <span className="eyebrow">Elsewhere on the internet</span>
          <h2>Where to find me</h2>
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
        <h2>If you&apos;ve read this far, we might <span className="accent">enjoy working together</span>.</h2>
        <p>I take on a few projects a year. If you&apos;re building something that needs care, let&apos;s talk.</p>
        <div className="buttons">
          <a href="https://cal.com/asanchezyali/30min" target="_blank" rel="noopener noreferrer" className="btn primary">Start a conversation →</a>
          <Link href={locale === 'en' ? '/blog' : `/${locale}/blog`} className="btn ghost">Read the blog first</Link>
        </div>
      </section>
    </>
  )
}
