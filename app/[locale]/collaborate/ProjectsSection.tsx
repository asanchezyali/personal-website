'use client'
import { motion } from 'framer-motion'
import { useTranslation } from 'app/[locale]/i18n/client'
import { useParams } from 'next/navigation'
import { Sparkles, Bot, MessageSquare, Rocket } from 'lucide-react'
import Image from 'next/image'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'

const projectMeta = [
  { icon: Sparkles, image: '/images/ai-avatars/header-post2.png' },
  { icon: Bot, image: '/images/ai-avatars/fig19v2.png' },
  { icon: MessageSquare, image: '/images/ai-avatars/header-post1.png' },
  { icon: Rocket, image: '/images/blockchain/post-solana.webp' },
]

const ProjectsSection = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'collaborate')

  const projects = [1, 2, 3, 4].map((n, i) => ({
    title: t(`projects.project_${n}.title`),
    description: t(`projects.project_${n}.description`),
    technologies: t(`projects.project_${n}.technologies`, { returnObjects: true }) as string[],
    ...projectMeta[i],
  }))

  return (
    <div className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="mb-4 font-ubuntu text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
          {t('projects.title')}
        </h2>
        <p className="mx-auto mb-16 max-w-2xl font-lato text-lg text-gray-600 dark:text-gray-300">
          {t('projects.description')}
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => {
          const Icon = project.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800/50"
            >
              {/* Project image */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 dark:bg-gray-900/90">
                  <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="mb-3 font-ubuntu text-2xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mb-6 font-lato text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(project.technologies) &&
                    project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-primary-100 px-3 py-1 text-xs text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default ProjectsSection
