'use client'
import React from 'react'
import { useTranslation } from '@/i18n/client'
import { LocaleTypes } from '@/i18n/settings'

import Python from '@/shared/icons/tech/Python'
import Node from '@/shared/icons/tech/Node'
import Next from '@/shared/icons/tech/Next'
import Three from '@/shared/icons/tech/Three'
import NestJS from '@/shared/icons/tech/NestJS'
import Express from '@/shared/icons/tech/Express'
import FastAPI from '@/shared/icons/tech/FastApi'
import Flask from '@/shared/icons/tech/Flask'
import Django from '@/shared/icons/tech/Django'
import Firebase from '@/shared/icons/tech/Firebase'
import Vite from '@/shared/icons/tech/Vite'
import AWS from '@/shared/icons/tech/AWS'
import Ollama from '@/shared/icons/tech/Ollama'
import MetaMask from '@/shared/icons/tech/MetaMask'
import Shopify from '@/shared/icons/tech/Shopify'
import Strapi from '@/shared/icons/tech/Strapi'
import Ethereum from '@/shared/icons/tech/Ethereum'
import OpenSea from '@/shared/icons/tech/OpenSea'
import Solana from '@/shared/icons/tech/Solana'
import Polygon from '@/shared/icons/tech/Polygon'
import MongoDB from '@/shared/icons/tech/MongoDB'
import MySQL from '@/shared/icons/tech/MySQL'
import PostgreSQL from '@/shared/icons/tech/PostgreSQL'
import Redis from '@/shared/icons/tech/Redis'
import SQLite from '@/shared/icons/tech/SQLite'
import Turso from '@/shared/icons/tech/Turso'
import Tailwind from '@/shared/icons/tech/Tailwind'

const TECHS = [
  { name: 'Python', icon: Python },
  { name: 'Node.js', icon: Node },
  { name: 'Next.js', icon: Next },
  { name: 'Three.js', icon: Three },
  { name: 'NestJS', icon: NestJS },
  { name: 'Express.js', icon: Express },
  { name: 'FastAPI', icon: FastAPI },
  { name: 'Flask', icon: Flask },
  { name: 'Django', icon: Django },
  { name: 'Firebase', icon: Firebase },
  { name: 'Vite', icon: Vite },
  { name: 'AWS', icon: AWS },
  { name: 'Ollama', icon: Ollama },
  { name: 'MetaMask', icon: MetaMask },
  { name: 'Shopify', icon: Shopify },
  { name: 'Strapi', icon: Strapi },
  { name: 'Ethereum', icon: Ethereum },
  { name: 'OpenSea', icon: OpenSea },
  { name: 'Solana', icon: Solana },
  { name: 'Polygon', icon: Polygon },
  { name: 'MongoDB', icon: MongoDB },
  { name: 'MySQL', icon: MySQL },
  { name: 'PostgreSQL', icon: PostgreSQL },
  { name: 'Redis', icon: Redis },
  { name: 'SQLite', icon: SQLite },
  { name: 'Turso', icon: Turso },
  { name: 'TailwindCSS', icon: Tailwind },
]

// Icons that need a background wrapper because they're dark/invisible on dark bg
const NEEDS_BG = ['Three.js', 'Express.js', 'Flask', 'Ollama']

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
              <div className="icon" style={NEEDS_BG.includes(tech.name) ? { padding: 8 } : undefined}>
                <tech.icon className="h-8 w-8" />
              </div>
              <span className="label">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
