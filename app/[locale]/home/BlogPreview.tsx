"use client"
import { useParams } from "next/navigation"
import ListLayout from "@/layouts/ListLayout"
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer"
import { allBlogs } from "contentlayer/generated"
import { useTranslation } from "../i18n/client"
import type { LocaleTypes } from "../i18n/settings"
import { motion } from "framer-motion"

export default function BlogPreview() {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, "home")
  const posts = allCoreContent(sortPosts(allBlogs))
  const filteredPosts = posts.filter((post) => post.language === locale)

  return (
    <div className="mx-auto space-y-12 py-16">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/2 h-32 w-32 -translate-x-1/2 transform rounded-full bg-primary-300/20 dark:bg-primary-700/20 blur-2xl" />
          <div className="absolute right-1/4 top-1/2 h-32 w-32 translate-x-1/2 transform rounded-full bg-secondary-300/20 dark:bg-secondary-700/20 blur-2xl" />
        </div>

        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <h2 className="mb-4 font-ubuntu text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {t("hero.blog_section")}
          </h2>
          <p className="mx-auto max-w-2xl font-lato text-lg text-gray-700 dark:text-gray-300">
            {t("hero.blog_description")}
          </p>
        </motion.div>
      </div>

      <ListLayout params={{ locale: locale }} posts={filteredPosts.slice(0, 6)} title={t("all")} />
    </div>
  )
}

