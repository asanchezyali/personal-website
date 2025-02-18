'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'app/[locale]/i18n/client'
import { useParams } from 'next/navigation'
import { Code2, BookOpen, Briefcase } from 'lucide-react'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'

const ServiceCard = ({ title, description, icon: Icon, features, ctaText, ctaLink }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800/50"
    >
      <div className="mb-6 flex items-center space-x-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/20">
          <Icon className="h-7 w-7 text-primary-600 dark:text-primary-400" />
        </div>
        <h3 className="font-ubuntu text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="mb-6 font-lato text-gray-600 dark:text-gray-300">{description}</p>
      <ul className="mb-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="mr-3 h-6 w-6 flex-shrink-0 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-lato text-gray-600 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <a
          href={ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
        >
          {ctaText}
          <svg
            className="ml-2 h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </motion.div>
  )
}

const ServicesSection = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'services')

  const services = [
    {
      title: 'IT Consulting & Development',
      description:
        'Expert solutions in modern web development, AI integration, and blockchain technology.',
      icon: Code2,
      features: [
        'Full-Stack Development (React/Next.js, Django/FastAPI, NestJS)',
        'AI & LLM Integration',
        'Smart Contract Development',
        'Custom API Development',
        'Cloud Deployment & DevOps',
      ],
      ctaText: 'Schedule Consultation',
      ctaLink: 'https://cal.com/asanchezyali/30min',
    },
    {
      title: 'Programming & AI Education',
      description:
        'Personalized training in programming fundamentals and AI concepts for individuals and teams.',
      icon: BookOpen,
      features: [
        'Programming Fundamentals',
        'AI & Machine Learning Concepts',
        'Mathematics for AI',
        'Practical Project Development',
        'One-on-One Mentoring',
      ],
      ctaText: 'Book a Session',
      ctaLink: 'https://cal.com/asanchezyali/30min',
    },
    {
      title: 'Full-Time Opportunities',
      description:
        'Open to full-time positions and long-term collaborations in innovative tech companies.',
      icon: Briefcase,
      features: [
        'Senior Full-Stack Development',
        'AI/ML Engineering',
        'Technical Leadership',
        'Architecture Design',
        'Team Mentoring',
      ],
      ctaText: "Let's Connect",
      ctaLink: 'https://cal.com/asanchezyali/30min',
    },
  ]

  return (
    <div className="bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="mb-4 font-ubuntu text-4xl font-bold text-gray-900 dark:text-white lg:text-5xl">
            Professional Services
          </h2>
          <p className="mx-auto mb-16 max-w-2xl font-lato text-lg text-gray-600 dark:text-gray-300">
            Specialized expertise in modern web development, AI integration, and technical
            education. Let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesSection
