'use client'
import React from 'react'
import { useTranslation } from '@/i18n/client'
import { LocaleTypes } from '@/i18n/settings'

import Python from '@/shared/icons/tech/Python'
import Node from '@/shared/icons/tech/Node'
import Next from '@/shared/icons/tech/Next'
import NestJS from '@/shared/icons/tech/NestJS'
import FastAPI from '@/shared/icons/tech/FastApi'
import Django from '@/shared/icons/tech/Django'
import Firebase from '@/shared/icons/tech/Firebase'
import AWS from '@/shared/icons/tech/AWS'
import Ollama from '@/shared/icons/tech/Ollama'
import MongoDB from '@/shared/icons/tech/MongoDB'
import MySQL from '@/shared/icons/tech/MySQL'
import PostgreSQL from '@/shared/icons/tech/PostgreSQL'
import Redis from '@/shared/icons/tech/Redis'
import SQLite from '@/shared/icons/tech/SQLite'
import Tailwind from '@/shared/icons/tech/Tailwind'

const TECHS = [
  { name: 'Python', icon: Python },
  { name: 'Node.js', icon: Node },
  { name: 'Next.js', icon: Next },
  { name: 'NestJS', icon: NestJS },
  { name: 'FastAPI', icon: FastAPI },
  { name: 'Django', icon: Django },
  { name: 'Firebase', icon: Firebase },
  { name: 'AWS', icon: AWS },
  { name: 'Ollama', icon: Ollama },
  { name: 'MongoDB', icon: MongoDB },
  { name: 'MySQL', icon: MySQL },
  { name: 'PostgreSQL', icon: PostgreSQL },
  { name: 'Redis', icon: Redis },
  { name: 'SQLite', icon: SQLite },
  { name: 'TailwindCSS', icon: Tailwind },
]

// Icons that need a background wrapper because they're dark/invisible on dark bg
const NEEDS_BG = ['Ollama']

const DOUBLED = [...TECHS, ...TECHS]

interface TechStackSectionProps {
  locale: LocaleTypes
}

export default function TechStackSection({ locale }: TechStackSectionProps) {
  const { t } = useTranslation(locale, 'home')

  return (
    <section className="stack wrap">
      <h2 className="section-h">{t('stack.title')}</h2>
      <p className="section-sub">{t('stack.description')}</p>

      <div className="marquee-wrap">
        <div className="marquee" aria-hidden="true">
          {DOUBLED.map((tech, i) => (
            <div key={i} className="tech">
              <div className={`icon${NEEDS_BG.includes(tech.name) ? ' needs-bg' : ''}`}>
                <tech.icon
                  className={NEEDS_BG.includes(tech.name) ? 'h-8 w-8' : 'h-12 w-12 md:h-14 md:w-14'}
                />
              </div>
              <span className="label">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
