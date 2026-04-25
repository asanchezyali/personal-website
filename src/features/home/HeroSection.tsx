'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from '@/i18n/client'
import { LocaleTypes } from '@/i18n/settings'
import siteMetadata from '@/lib/siteMetadata'

const IMAGES = Array.from({ length: 14 }, (_, i) =>
  `/images/home/${String(i + 1).padStart(2, '0')}_picture.jpg`
)

const FLOATS = [
  { cls: 'f1', idx: 1 },
  { cls: 'f2', idx: 3 },
  { cls: 'f3', idx: 5 },
  { cls: 'f4', idx: 7 },
  { cls: 'f5', idx: 9 },
]

interface HeroSectionProps {
  locale: LocaleTypes
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const { t } = useTranslation(locale, 'home')
  const [mainIdx, setMainIdx] = useState(0)
  const [swapping, setSwapping] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setSwapping(true)
      setTimeout(() => {
        setMainIdx((i) => (i + 1) % IMAGES.length)
        setSwapping(false)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  function localHref(href: string) {
    if (locale === 'en') return href
    return href === '/' ? `/${locale}` : `/${locale}${href}`
  }

  return (
    <section className="hero">
      {/* Copy */}
      <div className="copy">
        <span className="status-pill">
          <span className="dot" />
          {t('hero.roll')}
        </span>
        <span className="eyebrow" style={{ marginTop: 16, display: 'block' }}>
          Software Developer &amp; Mathematician
        </span>
        <h1>
          {t('hero.title_1').split('Alejandro Sánchez Yalí').length > 1 ? (
            <>
              I&apos;m{' '}
              <span className="accent">Alejandro<br />Sánchez Yalí</span>
            </>
          ) : (
            <span className="accent">{t('hero.title_1')}</span>
          )}
        </h1>
        <p className="lede">{t('hero.title_2')}</p>
        <div className="ctas">
          <a href={`mailto:${siteMetadata.email}`} className="btn primary">
            {t('hero.button_1')} <span className="a">→</span>
          </a>
          <Link href={localHref('/collaborate')} className="btn dark">
            {t('hero.button_2')}
          </Link>
        </div>
        <div className="socials-row">
          <a href={siteMetadata.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a href={siteMetadata.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href={siteMetadata.x} target="_blank" rel="noreferrer" className="icon-btn" aria-label="X">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.245 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href={siteMetadata.discord} target="_blank" rel="noreferrer" className="icon-btn" aria-label="Discord">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.23A.077.077 0 008.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026 13.83 13.83 0 001.226-1.963.074.074 0 00-.041-.104 13.201 13.201 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Cloud / photo */}
      <div className="cloud">
        {/* Floating cards */}
        {FLOATS.map(({ cls, idx }) => (
          <div key={cls} className={`float ${cls}`}>
            <Image
              src={IMAGES[idx % IMAGES.length]}
              alt=""
              width={160}
              height={200}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
        ))}

        {/* Main rotating image */}
        <div className={`main${swapping ? ' swap' : ''}`}>
          <Image
            src={IMAGES[mainIdx]}
            alt="Alejandro Sánchez Yalí"
            width={300}
            height={400}
            priority
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </section>
  )
}
