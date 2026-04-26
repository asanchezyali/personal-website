'use client'
import React, { useState } from 'react'
import { useTranslation } from '@/i18n/client'
import { LocaleTypes } from '@/i18n/settings'
import siteMetadata from '@/lib/siteMetadata'

interface CollaboratePageProps { locale: LocaleTypes }

export default function CollaboratePage({ locale }: CollaboratePageProps) {
  const { t } = useTranslation(locale, 'collaborate')
  const isEs = locale === 'es'
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  const projectImages = [
    '', // Plixiq — no image yet
    '/images/ai-avatars/header-post2.png', // Morpheus
    '/images/ai-avatars/header-post1.png', // Digital Human
    '', // CREARIA
    '/images/blockchain/post-solana.webp', // ROCKET CODE
  ]

  const projects = [1, 2, 3, 4, 5].map((n) => ({
    title: t(`projects.project_${n}.title`),
    description: t(`projects.project_${n}.description`),
    role: t(`projects.project_${n}.role`),
    context: t(`projects.project_${n}.context`),
    problem: t(`projects.project_${n}.problem`),
    solution: t(`projects.project_${n}.solution`),
    link: t(`projects.project_${n}.link`),
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
        <div className="sec-head">
          <span className="eyebrow">{isEs ? 'Trabajo' : 'Work'}</span>
          <h2>{t('projects.title')}</h2>
          <p>{t('projects.description')}</p>
        </div>
        <div className="pr-grid">
          {projects.map((project, i) => {
            const isExpanded = expandedIdx === i
            return (
              <article
                key={i}
                className={`pr-card${isExpanded ? ' expanded' : ''}`}
                onClick={() => setExpandedIdx(isExpanded ? null : i)}
                style={{ cursor: 'pointer' }}
              >
                {projectImages[i] && (
                  <div className="cover">
                    <img src={projectImages[i]} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div className="body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      {project.role && <span className="role">{project.role}</span>}
                      <h3>{project.title}</h3>
                    </div>
                    <span style={{ fontSize: 18, color: 'var(--g-500)', transition: 'transform .3s var(--ease)', transform: isExpanded ? 'rotate(45deg)' : 'none', flexShrink: 0, marginLeft: 12 }}>+</span>
                  </div>
                  <p>{project.description}</p>
                  <div className="stack">
                    {Array.isArray(project.technologies) && project.technologies.map((tech, j) => (
                      <span key={j} className="chip">{tech}</span>
                    ))}
                  </div>
                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="pr-expanded" onClick={(e) => e.stopPropagation()}>
                      {project.context && (
                        <div className="pr-section">
                          <h4>{isEs ? 'Contexto' : 'Context'}</h4>
                          <p>{project.context}</p>
                        </div>
                      )}
                      {project.problem && (
                        <div className="pr-section">
                          <h4>{isEs ? 'Problema' : 'Problem'}</h4>
                          <p>{project.problem}</p>
                        </div>
                      )}
                      {project.solution && (
                        <div className="pr-section">
                          <h4>{isEs ? 'Solución' : 'Solution'}</h4>
                          <p>{project.solution}</p>
                        </div>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn primary" style={{ marginTop: 12, width: 'fit-content' }}>
                          {isEs ? 'Ver proyecto' : 'View project'} <span className="a">→</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            )
          })}
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
            <span className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.23A.077.077 0 008.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026 13.83 13.83 0 001.226-1.963.074.074 0 00-.041-.104 13.201 13.201 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/></svg></span>
            <div><div className="lbl">Community</div><div className="val">Yali Dev · Discord</div></div>
            <span className="arr">↗</span>
          </a>
        </div>
      </section>
    </div>
  )
}
