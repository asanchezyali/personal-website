'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from '@/i18n/client'
import { LocaleTypes } from '@/i18n/settings'
import siteMetadata from '@/lib/siteMetadata'

interface CollaboratePageProps {
  locale: LocaleTypes
}

export default function CollaboratePage({ locale }: CollaboratePageProps) {
  const { t } = useTranslation(locale, 'collaborate')

  const projectImages = [
    '/images/plixiq/plixiq-cover.png', // Plixiq
    '/images/ai-avatars/header-post2.png', // Morpheus
    '/images/ai-avatars/header-post1.png', // Digital Human
    '/images/crearia/crearia-cover.png', // CREARIA
  ]

  const projects = [1, 2, 3, 4].map((n) => ({
    title: t(`projects.project_${n}.title`),
    description: t(`projects.project_${n}.description`),
    role: t(`projects.project_${n}.role`),
    link: t(`projects.project_${n}.link`),
    technologies: t(`projects.project_${n}.technologies`, { returnObjects: true }) as string[],
  }))

  return (
    <div className="wrap">
      {/* Hero */}
      <section className="col-hero">
        <span className="status-pill">
          <span className="dot" /> {t('hero.status_pill')}
        </span>
        <h1>
          {t('hero.title_1')}
          <br />
          <span className="accent">{t('hero.title_2')}</span>
        </h1>
        <p>{t('hero.description')}</p>
        <div className="ctas">
          <a
            href="https://cal.com/asanchezyali/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn primary"
          >
            {t('hero.cta_call')} <span className="a">→</span>
          </a>
          <a href={`mailto:${siteMetadata.email}`} className="btn ghost">
            {t('hero.cta_email')}
          </a>
        </div>
      </section>

      {/* Offers */}
      <section className="offers">
        <div className="offer">
          <div className="shape">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <span className="tag">01 · Product dev</span>
          <h3>{t('offers.offer_1.title')}</h3>
          <p>{t('offers.offer_1.description')}</p>
          <ul>
            {(t('offers.offer_1.bullets', { returnObjects: true }) as string[]).map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
        <div className="offer">
          <div className="shape">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <span className="tag">02 · AI integration</span>
          <h3>{t('offers.offer_2.title')}</h3>
          <p>{t('offers.offer_2.description')}</p>
          <ul>
            {(t('offers.offer_2.bullets', { returnObjects: true }) as string[]).map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
        <div className="offer">
          <div className="shape">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2 2 7l10 5 10-5-10-5z" />
              <path d="m2 17 10 5 10-5" />
              <path d="m2 12 10 5 10-5" />
            </svg>
          </div>
          <span className="tag">03 · Blockchain</span>
          <h3>{t('offers.offer_3.title')}</h3>
          <p>{t('offers.offer_3.description')}</p>
          <ul>
            {(t('offers.offer_3.bullets', { returnObjects: true }) as string[]).map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="process">
        <h2>{t('process.title')}</h2>
        <p className="sub">{t('process.subtitle')}</p>
        <div className="steps">
          {(t('process.steps', { returnObjects: true }) as { title: string; desc: string }[]).map(
            (step, i) => (
              <div key={i} className="step">
                <div className="num">{String(i + 1).padStart(2, '0')}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Projects */}
      <section className="projects">
        <h2>{t('projects.selected_work')}</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {projects.map((project, i) => {
            const card = (
              <article className="pr-card" style={{ overflow: 'hidden', height: '100%' }}>
                <div style={{ height: 340, overflow: 'hidden', position: 'relative' }}>
                  {projectImages[i] ? (
                    <Image
                      src={projectImages[i]}
                      alt={project.title}
                      fill
                      sizes="(max-width: 760px) 100vw, 50vw"
                      style={{ objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div className="ph" style={{ width: '100%', height: '100%' }}>
                      {project.title}
                    </div>
                  )}
                </div>
                <div style={{ padding: 20 }}>
                  {project.role && <span className="role">{project.role}</span>}
                  <h3 style={{ marginBottom: 6 }}>{project.title}</h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: 'var(--g-600)',
                      lineHeight: 1.55,
                      margin: '0 0 10px',
                    }}
                  >
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {Array.isArray(project.technologies) &&
                      project.technologies.map((tech, j) => (
                        <span key={j} className="chip">
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>
              </article>
            )

            if (!project.link) return <React.Fragment key={i}>{card}</React.Fragment>

            const wrapStyle = { textDecoration: 'none', color: 'inherit', display: 'block' }
            return project.link.startsWith('/') ? (
              <Link key={i} href={project.link} style={wrapStyle}>
                {card}
              </Link>
            ) : (
              <a
                key={i}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={wrapStyle}
              >
                {card}
              </a>
            )
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="quotes">
        <figure className="quote">
          <blockquote>
            &ldquo;Alejandro is the rare engineer who can zoom from smart-contract internals to
            product strategy in a single meeting, and actually make useful contributions at both
            ends.&rdquo;
          </blockquote>
          <figcaption className="who">
            <span className="avatar">
              <span className="ph" style={{ fontSize: 10 }}>
                CM
              </span>
            </span>
            <div>
              <div className="name">Carla Mendez</div>
              <div className="role">CTO · Galos</div>
            </div>
          </figcaption>
        </figure>
        <figure className="quote">
          <blockquote>
            &ldquo;He shipped the first working version of our RAG pipeline in two weeks, and then —
            crucially — spent the next two teaching our team how to maintain it.&rdquo;
          </blockquote>
          <figcaption className="who">
            <span className="avatar">
              <span className="ph" style={{ fontSize: 10 }}>
                RS
              </span>
            </span>
            <div>
              <div className="name">Rodrigo Salas</div>
              <div className="role">Head of Eng · Laboratoria</div>
            </div>
          </figcaption>
        </figure>
      </section>

      {/* Contact */}
      <section className="contact">
        <div>
          <h2 className="big">
            {t('connect.title_1')}
            <br />
            {t('connect.title_2')}
            <span className="accent">.</span>
          </h2>
          <p>{t('connect.description')}</p>
        </div>
        <div className="channels">
          <a
            className="channel"
            href="https://cal.com/asanchezyali/30min"
            target="_blank"
            rel="noreferrer"
          >
            <span className="ic">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>
            <div>
              <div className="lbl">{t('connect.channels.meetings')}</div>
              <div className="val">cal.com/asanchezyali/30min</div>
            </div>
            <span className="arr">↗</span>
          </a>
          <a className="channel" href={`mailto:${siteMetadata.email}`}>
            <span className="ic">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            <div>
              <div className="lbl">{t('connect.channels.email')}</div>
              <div className="val">{siteMetadata.email}</div>
            </div>
            <span className="arr">↗</span>
          </a>
          <a className="channel" href={siteMetadata.linkedin} target="_blank" rel="noreferrer">
            <span className="ic">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.55V9h3.57v11.45z" />
              </svg>
            </span>
            <div>
              <div className="lbl">LinkedIn</div>
              <div className="val">/in/asanchezyali</div>
            </div>
            <span className="arr">↗</span>
          </a>
          <a className="channel" href={siteMetadata.discord} target="_blank" rel="noreferrer">
            <span className="ic">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.23A.077.077 0 008.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026 13.83 13.83 0 001.226-1.963.074.074 0 00-.041-.104 13.201 13.201 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
              </svg>
            </span>
            <div>
              <div className="lbl">{t('connect.channels.community')}</div>
              <div className="val">{t('connect.channels.community_value')}</div>
            </div>
            <span className="arr">↗</span>
          </a>
        </div>
      </section>
    </div>
  )
}
