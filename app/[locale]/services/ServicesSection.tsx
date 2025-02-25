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
      title: `${t('services_1.title')}`,
      description: `${t('services_1.description')}`,
      icon: Code2,
      features: t('services_1.features', { returnObjects: true }),
      ctaText: `${t('services_1.ctaText')}`,
      ctaLink: `${t('services_1.ctaLink')}`,
    },
    {
      title: `${t('services_2.title')}`,
      description: `${t('services_2.description')}`,
      icon: BookOpen,
      features: t('services_2.features', { returnObjects: true }),
      ctaText: `${t('services_2.ctaText')}`,
      ctaLink: `${t('services_2.ctaLink')}`,
    },
    {
      title: `${t('services_3.title')}`,
      description: `${t('services_3.description')}`,
      icon: Briefcase,
      features: t('services_3.features', { returnObjects: true }),
      ctaText: `${t('services_3.ctaText')}`,
      ctaLink: `${t('services_3.ctaLink')}`,
    },
  ]

  return (
      <div className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="mb-4 font-ubuntu text-4xl font-bold text-gray-900 dark:text-white lg:text-5xl">
            {t('title')}
          </h2>
          <p className="mx-auto mb-16 max-w-2xl font-lato text-lg text-gray-600 dark:text-gray-300">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
  )
}

export default ServicesSection
