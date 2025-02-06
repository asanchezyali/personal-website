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
  const [rows, setRows] = useState({
    row1: [...TECHNOLOGIES],
    row2: [...TECHNOLOGIES],
    row3: [...TECHNOLOGIES],
  })
  const [isClient, setIsClient] = useState(false)

  const shuffleArray = (array: typeof TECHNOLOGIES) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  useEffect(() => {
    setRows({
      row1: shuffleArray([...TECHNOLOGIES]),
      row2: shuffleArray([...TECHNOLOGIES]),
      row3: shuffleArray([...TECHNOLOGIES]),
    })
    setIsClient(true)
  }, [])

  const InfiniteLoopSlider = ({ children, direction, duration }) => {
    return (
      <div className="relative flex w-fit">
        <motion.div
          animate={{
            x: direction === 'left' ? [0, -children.length * 160] : [-children.length * 160, 0],
          }}
          transition={{
            x: {
              duration: duration,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
          className="flex gap-16"
        >
          {children}
          {children}
        </motion.div>
      </div>
    )
  }

  const Slider = ({ items, direction, speed = 50 }) => {
    return (
      <div className="flex w-full overflow-hidden">
        <InfiniteLoopSlider direction={direction} duration={speed}>
          {items.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex flex-shrink-0 flex-col items-center justify-center gap-y-2"
            >
              <motion.div
                className={`${
                  whiteIcons.includes(tech.name)
                    ? 'flex h-12 w-12 items-center justify-center rounded-full bg-[#471069]/90 dark:bg-[#30C5D2]/10 md:h-16 md:w-16'
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
              {tech.name}
            </div>
          ))}
        </InfiniteLoopSlider>
      </div>
    )
  }

  if (!isClient) {
    return (
      <div className="flex flex-col gap-16">
        <Slider items={TECHNOLOGIES} direction="left" speed={200} />
        <Slider items={TECHNOLOGIES} direction="right" speed={200} />
        <Slider items={TECHNOLOGIES} direction="left" speed={200} />
      </div>
    )
  }

  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="mb-6 text-4xl font-bold md:text-5xl">
          {t('stack.title')}
        </h2>
        <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
          {t('stack.description')}
        </p>
      </motion.div>

      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent dark:from-black" />
        <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent dark:from-black" />

        <div className="flex flex-col gap-16">
          <Slider items={rows.row1} direction="left" speed={200} />
        </div>
      </div>
    </section>
  )
}

export default TechnologiesSection
