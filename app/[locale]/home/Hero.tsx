"use client"

import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { useTranslation } from "app/[locale]/i18n/client"
import type { LocaleTypes } from "app/[locale]/i18n/settings"
import Image from "next/image"
import { Github, Linkedin, Twitter, Instagram } from "lucide-react"

const DiscordIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
  </svg>
)

const HeroSection = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, "home")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
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
    <div className="relative flex min-h-[calc(100vh-84px)] items-center justify-center bg-white dark:bg-black">
      {/* Subtle background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 -translate-x-1/2 transform rounded-full bg-[#30C5D2]/5 blur-3xl dark:bg-[#30C5D2]/10" />
        <div className="absolute right-1/4 top-1/3 h-64 w-64 translate-x-1/2 transform rounded-full bg-[#9821e2]/5 blur-3xl dark:bg-[#9821e2]/10" />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative flex w-full flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Column - Text Content */}
        <motion.div className="flex-1 text-center lg:text-left" variants={childVariants}>
          <div className="mb-6 inline-flex items-center rounded-full bg-gray-100 px-4 py-2 dark:bg-gray-800/50">
            <span className="mr-2 h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{t("hero.roll")}</span>
          </div>

          <h1 className="mb-6 font-ubuntu text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            {t("hero.title_1")}
          </h1>

          <p className="mb-8 font-lato text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl">
            {t("hero.title_2")}
          </p>

          <div className="mb-8 flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 lg:justify-start">
            <a
              className="inline-flex items-center rounded-lg bg-gray-200 px-6 py-2.5 text-sm font-medium text-gray-800 transition-all hover:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              href="https://calendly.com/asanchezyali"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("hero.button_1")}
              <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 12L5 12M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              className="inline-flex items-center rounded-lg bg-gray-200 px-6 py-2.5 text-sm font-medium text-gray-800 transition-all hover:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              href="https://github.com/asanchezyali/technical-resume/blob/technical-resume/technical_resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              {t("hero.button_2")}
              <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <div className="flex items-center justify-center space-x-5 lg:justify-start">
            <a
              href="https://github.com/asanchezyali"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/asanchezyali/"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/asanchezyali"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/asanchezyali/"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://discord.gg/gJ3vCgSWeh"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiscordIcon />
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
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white dark:via-black/5 dark:to-black" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HeroSection

