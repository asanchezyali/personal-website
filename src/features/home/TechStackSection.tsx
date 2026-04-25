'use client'
import React from 'react'
import { useTranslation } from '@/i18n/client'
import { LocaleTypes } from '@/i18n/settings'

const TECHS = [
  'Python', 'TypeScript', 'React', 'Next.js', 'Node.js',
  'FastAPI', 'PyTorch', 'TensorFlow', 'LangChain', 'OpenAI',
  'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS',
  'Three.js', 'WebGL', 'Rust', 'Go', 'GraphQL',
  'Stable Diffusion', 'Whisper', 'Prisma', 'NestJS', 'Tailwind',
  'Solidity', 'Web3',
]

// Double for seamless infinite scroll
const DOUBLED = [...TECHS, ...TECHS]

interface TechStackSectionProps {
  locale: LocaleTypes
}

function getInitials(name: string) {
  return name
    .split(/[\s.]+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function TechStackSection({ locale }: TechStackSectionProps) {
  const { t } = useTranslation(locale, 'home')

  return (
    <section className="stack wrap">
      <h2 className="section-h">{t('stack.title')}</h2>
      <p className="section-sub">{t('stack.description')}</p>

      <div className="marquee-wrap">
        <div className="marquee" aria-hidden="true">
          {DOUBLED.map((name, i) => (
            <div key={i} className="tech">
              <div className="icon">{getInitials(name)}</div>
              <span className="label">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
