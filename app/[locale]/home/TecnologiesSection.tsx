'use client'
import { useParams } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { motion } from 'framer-motion'
import Python from '@/components/theme/icons/Python'
import Nodejs from '@/components/theme/icons/Node'
import Nextjs from '@/components/theme/icons/Next'
import Threejs from '@/components/theme/icons/Three'
import NestJS from '@/components/theme/icons/NestJS'
import Expressjs from '@/components/theme/icons/Express'
import FastAPI from '@/components/theme/icons/FastApi'
import Flask from '@/components/theme/icons/Flask'
import AmazonWebServices from '@/components/theme/icons/AWS'
import Ollama from '@/components/theme/icons/Ollama'
import MetaMask from '@/components/theme/icons/MetaMask'
import Django from '@/components/theme/icons/Django'
import Firebase from '@/components/theme/icons/Firebase'
import Vite from '@/components/theme/icons/Vite'
import Shopify from '@/components/theme/icons/Shopify'
import Strapi from '@/components/theme/icons/Strapi'
import Ethereum from '@/components/theme/icons/Ethereum'
import OpenSea from '@/components/theme/icons/OpenSea'
import Solana from '@/components/theme/icons/Solana'
import Polygon from '@/components/theme/icons/Polygon'
import MongoDB from '@/components/theme/icons/MongoDB'
import MySQL from '@/components/theme/icons/MySQL'
import PostgreSQL from '@/components/theme/icons/PostgreSQL'
import Redis from '@/components/theme/icons/Redis'
import SQLite from '@/components/theme/icons/SQLite'
import Turso from '@/components/theme/icons/Turso'
import TailwindCSS from '@/components/theme/icons/Tailwind'
import { useState, useEffect } from 'react'

const whiteIcons = ['Three.js', 'Express.js', 'Flask', 'Ollama']

const TECHNOLOGIES = [
  { name: 'Python', icon: Python },
  { name: 'Node.js', icon: Nodejs },
  { name: 'Next.js', icon: Nextjs },
  { name: 'Three.js', icon: Threejs },
  { name: 'NestJS', icon: NestJS },
  { name: 'Express.js', icon: Expressjs },
  { name: 'Firebase', icon: Firebase },
  { name: 'Vite', icon: Vite },
  { name: 'Solana', icon: Solana },
  { name: 'Polygon', icon: Polygon },
  { name: 'MySQL', icon: MySQL },
  { name: 'Redis', icon: Redis },
  { name: 'Turso', icon: Turso },
  { name: 'Django', icon: Django },
  { name: 'FastAPI', icon: FastAPI },
  { name: 'Flask', icon: Flask },
  { name: 'AWS', icon: AmazonWebServices },
  { name: 'Ollama', icon: Ollama },
  { name: 'MetaMask', icon: MetaMask },
  { name: 'Shopify', icon: Shopify },
  { name: 'Strapi', icon: Strapi },
  { name: 'Ethereum', icon: Ethereum },
  { name: 'OpenSea', icon: OpenSea },
  { name: 'MongoDB', icon: MongoDB },
  { name: 'PostgreSQL', icon: PostgreSQL },
  { name: 'SQLite', icon: SQLite },
  { name: 'TailwindCSS', icon: TailwindCSS },
]

const TechnologiesSection = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'home')
  const [technologies, setTechnologies] = useState(TECHNOLOGIES)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    const shuffled = [...TECHNOLOGIES].sort(() => Math.random() - 0.5)
    setTechnologies(shuffled)
    setIsClient(true)
  }, [])

  const InfiniteLoopSlider = ({ children, duration }) => {
    return (
      <div className="relative flex w-fit">
        <motion.div
          animate={{ x: [-children.length * 160, 0] }}
          transition={{
            x: { duration: duration, repeat: Number.POSITIVE_INFINITY, ease: 'linear' },
          }}
          className="flex gap-16"
        >
          {children}
          {children}
        </motion.div>
      </div>
    )
  }

  const Slider = ({ items, speed = 200 }) => {
    return (
      <div className="flex w-full overflow-hidden">
        <InfiniteLoopSlider duration={speed}>
          {items.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex flex-shrink-0 flex-col items-center justify-center gap-y-2"
            >
              <motion.div
                className={`${
                  whiteIcons.includes(tech.name)
                    ? 'flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-800/20 md:h-16 md:w-16'
                    : ''
                }`}
              >
                <tech.icon
                  className={`${
                    whiteIcons.includes(tech.name)
                      ? 'h-8 w-8 md:h-8 md:w-8'
                      : 'h-12 w-12 md:h-16 md:w-16'
                  }`}
                />
              </motion.div>
              <span className="text-sm text-gray-700 dark:text-gray-300">{tech.name}</span>
            </div>
          ))}
        </InfiniteLoopSlider>
      </div>
    )
  }

  return (
    <section className="mx-auto py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="mb-6 font-ubuntu text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-5xl">
          {t('stack.title')}
        </h2>
        <p className="mx-auto max-w-2xl font-lato text-xl text-gray-700 dark:text-gray-300">
          {t('stack.description')}
        </p>
      </motion.div>
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
        <Slider items={technologies} />
      </div>
    </section>
  )
}
export default TechnologiesSection
