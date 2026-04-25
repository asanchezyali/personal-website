'use client'
import React from 'react'
import { useTranslation } from '@/i18n/client'
import { LocaleTypes } from '@/i18n/settings'
import siteMetadata from '@/lib/siteMetadata'

interface CollaboratePageProps { locale: LocaleTypes }

export default function CollaboratePage({ locale }: CollaboratePageProps) {
  const { t } = useTranslation(locale, 'collaborate')
  const isEs = locale === 'es'

  const projects = [1, 2, 3, 4].map((n) => ({
    title: t(`projects.project_${n}.title`),
    description: t(`projects.project_${n}.description`),
    technologies: t(`projects.project_${n}.technologies`, { returnObjects: true }) as string[],
  }))

  return (
    <div className="wrap">
      {/* Hero */}
      <section className="col-hero">
        <span className="status-pill"><span className="dot" /> {isEs ? 'Abierto a proyectos · Q2 2026' : 'Currently open for projects · Q2 2026'}</span>
        <h1>{isEs ? (<>Construyamos algo<br/><span className="accent">que valga la pena.</span></>) : (<>Let&apos;s build something<br/><span className="accent">worth shipping.</span></>)}</h1>
        <p>{t('hero.description')}</p>
        <div className="ctas">
          <a href="https://cal.com/asanchezyali/30min" target="_blank" rel="noopener noreferrer" className="btn primary">
            {isEs ? 'Agendar llamada' : 'Book an intro call'} <span className="a">→</span>
          </a>
          <a href={`mailto:${siteMetadata.email}`} className="btn ghost">{isEs ? 'Escríbeme' : 'Email me'}</a>
        </div>
      </section>

      {/* Offers */}
      <section className="offers">
        <div className="offer">
          <div className="shape">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </div>
          <span className="tag">01 · Product dev</span>
          <h3>{isEs ? 'Web & desarrollo de producto' : 'Web & product builds'}</h3>
          <p>{isEs ? 'De "tenemos una idea" a un producto funcional. Diseño la arquitectura, construyo las primeras iteraciones y entrego un código que tu equipo puede mantener.' : 'From "we have an idea" to a product customers can log into. I design the architecture, build the first few iterations, and hand you a codebase your team can own.'}</p>
          <ul><li>Next.js · TypeScript · Postgres</li><li>{isEs ? 'Design systems & UI desde cero' : 'Design systems & UI from scratch'}</li><li>{isEs ? 'Deploy en AWS o Vercel' : 'Deployed to AWS or Vercel'}</li></ul>
        </div>
        <div className="offer">
          <div className="shape">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </div>
          <span className="tag">02 · AI integration</span>
          <h3>{isEs ? 'Funcionalidades & sistemas de IA' : 'AI features & systems'}</h3>
          <p>{isEs ? 'Integraciones prácticas: RAG, agentes, visión, voz. Te ayudo a elegir el modelo correcto y medir qué funciona.' : "Practical, production-grade integrations: retrieval, agents, vision, speech. I'll help you pick the right model and measure what's actually working."}</p>
          <ul><li>RAG pipelines, embeddings, evals</li><li>{isEs ? 'Modelos self-hosted & API' : 'Self-hosted & API-based models'}</li><li>Python · PyTorch · Ollama · OpenAI</li></ul>
        </div>
        <div className="offer">
          <div className="shape">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
          </div>
          <span className="tag">03 · Blockchain</span>
          <h3>{isEs ? 'Blockchain & contratos inteligentes' : 'Blockchain & smart contracts'}</h3>
          <p>{isEs ? 'Marketplaces NFT, tokens, lógica on-chain. Código auditable y mantenible.' : "NFT marketplaces, token systems, on-chain logic. I focus on boring, auditable, maintainable code — the kind that doesn't make the news."}</p>
          <ul><li>Solidity · Hardhat · Foundry</li><li>Ethereum · Polygon · Solana</li><li>Wallet + dApp integrations</li></ul>
        </div>
      </section>

      {/* Process */}
      <section className="process">
        <h2>{isEs ? 'Cómo trabajaremos' : "How we'll work"}</h2>
        <p className="sub">{isEs ? 'Los mismos cuatro pasos, siempre.' : "Same four steps whether it's a weekend spike or a six-month engagement."}</p>
        <div className="steps">
          {[
            { title: isEs ? 'Conversación' : 'Conversation', desc: isEs ? 'Una llamada de 30 min para entender qué quieres construir.' : "A 30-minute call to understand what you're trying to build and what success looks like." },
            { title: isEs ? 'Propuesta' : 'Proposal', desc: isEs ? 'Alcance con hitos y trade-offs honestos.' : 'A short written scope with milestones, assumptions, and honest trade-offs. No fluff.' },
            { title: isEs ? 'Construcción' : 'Build', desc: isEs ? 'Demos semanales, repo compartido desde el día uno.' : "Weekly demos, shared repo from day one, and a communication style that matches your team's." },
            { title: isEs ? 'Entrega' : 'Handoff', desc: isEs ? 'Documentación y plan de transición.' : 'Documentation, runbooks, and a transition plan so your team can confidently own what we built.' },
          ].map((step, i) => (
            <div key={i} className="step">
              <div className="num">{String(i + 1).padStart(2, '0')}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="projects">
        <h2>{t('projects.title')}</h2>
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

      {/* Testimonials */}
      <section className="quotes">
        <figure className="quote">
          <blockquote>&ldquo;Alejandro is the rare engineer who can zoom from smart-contract internals to product strategy in a single meeting, and actually make useful contributions at both ends.&rdquo;</blockquote>
          <figcaption className="who">
            <span className="avatar"><span className="ph" style={{ fontSize: 10 }}>CM</span></span>
            <div><div className="name">Carla Mendez</div><div className="role">CTO · Galos</div></div>
          </figcaption>
        </figure>
        <figure className="quote">
          <blockquote>&ldquo;He shipped the first working version of our RAG pipeline in two weeks, and then — crucially — spent the next two teaching our team how to maintain it.&rdquo;</blockquote>
          <figcaption className="who">
            <span className="avatar"><span className="ph" style={{ fontSize: 10 }}>RS</span></span>
            <div><div className="name">Rodrigo Salas</div><div className="role">Head of Eng · Laboratoria</div></div>
          </figcaption>
        </figure>
      </section>

      {/* Contact */}
      <section className="contact">
        <div>
          <h2 className="big">{isEs ? (<>Cuando estés<br/>listo<span className="accent">.</span></>) : (<>Ready when<br/>you are<span className="accent">.</span></>)}</h2>
          <p>{t('connect.description')}</p>
        </div>
        <div className="channels">
          <a className="channel" href="https://cal.com/asanchezyali/30min" target="_blank" rel="noreferrer">
            <span className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></span>
            <div><div className="lbl">Meetings</div><div className="val">cal.com/asanchezyali/30min</div></div>
            <span className="arr">↗</span>
          </a>
          <a className="channel" href={`mailto:${siteMetadata.email}`}>
            <span className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg></span>
            <div><div className="lbl">Email</div><div className="val">{siteMetadata.email}</div></div>
            <span className="arr">↗</span>
          </a>
          <a className="channel" href={siteMetadata.linkedin} target="_blank" rel="noreferrer">
            <span className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.55V9h3.57v11.45z"/></svg></span>
            <div><div className="lbl">LinkedIn</div><div className="val">/in/asanchezyali</div></div>
            <span className="arr">↗</span>
          </a>
          <a className="channel" href={siteMetadata.discord} target="_blank" rel="noreferrer">
            <span className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg></span>
            <div><div className="lbl">Community</div><div className="val">Yali Dev · Discord</div></div>
            <span className="arr">↗</span>
          </a>
        </div>
      </section>
    </div>
  )
}
