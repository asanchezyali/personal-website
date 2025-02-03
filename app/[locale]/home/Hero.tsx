'use client'

import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import Image from 'next/image'
import { Github, Twitter, Linkedin, BookMarked } from 'lucide-react'

const HeroSection = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'home')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  }

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  return (
    <div className="relative flex min-h-[calc(100vh-84px)] items-center justify-center">
      {/* Subtle background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 -translate-x-1/2 transform rounded-full bg-[#30C5D2]/5 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-64 w-64 translate-x-1/2 transform rounded-full bg-[#9821e2]/5 blur-3xl" />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex w-full flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Column - Text Content */}
        <motion.div className="flex-1 text-center lg:text-left" variants={childVariants}>
          <div className="mb-6 inline-flex items-center rounded-full bg-gray-800/50 px-4 py-2">
            <span className="mr-2 h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-sm text-gray-300">Fullstack Developer & AI Enthusiast</span>
          </div>

          <h1 className="mb-6 font-ubuntu text-5xl font-bold tracking-tight text-white sm:text-6xl">
            I'm Alejandro Sánchez Yalí
          </h1>

          <p className="mb-8 font-lato text-lg leading-relaxed text-gray-400 sm:text-xl">
            Fullstack developer specialized in creating intelligent applications that combine modern
            web technologies with artificial intelligence.
          </p>

          <div className="mb-8 flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 lg:justify-start">
            <button className="inline-flex items-center rounded-lg bg-white/10 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/20">
              Learn How
              <svg
                className="ml-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12L5 12M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="inline-flex items-center rounded-lg px-6 py-2.5 text-sm font-medium text-gray-400 hover:text-white">
              More about me
            </button>
          </div>

          <div className="flex items-center justify-center space-x-5 lg:justify-start">
            <a href="#" className="text-gray-400 transition-colors hover:text-white">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 transition-colors hover:text-white">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 transition-colors hover:text-white">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 transition-colors hover:text-white">
              <BookMarked className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        {/* Right Column - Image with fade effect */}
        <motion.div
          className="relative h-[350px] w-full max-w-[350px] lg:h-[450px] lg:w-[450px]"
          variants={childVariants}
        >
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src="/me.png"
              alt="Profile"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 350px, 450px"
              priority
            />
            {/* Subtle fade to background */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(
                    to bottom,
                    transparent 40%,
                    rgba(0, 0, 0, 0.4) 70%,
                    rgba(0, 0, 0, 0.8) 85%,
                    rgb(0, 0, 0) 100%
                  )
                `,
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HeroSection
