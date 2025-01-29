'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Calendly from '@/components/formspree/Calendly'
import { useParams } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'

interface ServiceCardProps {
  title: string
  description: string
  tag: string
  imagePosition: 'left' | 'right'
  imageUrl: string
  index: number
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  tag,
  imagePosition,
  imageUrl,
  index,
}) => {
  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'home')


  return (
    <div
      className={`group relative mb-48 flex flex-col gap-16 lg:flex-row ${
        imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
      }`}
    >
      <motion.div
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex-1 space-y-8"
      >
        <div className="space-y-4">
          <span className="inline-block rounded-full bg-[#30C5D2]/10 px-4 py-1 text-sm font-medium text-[#30C5D2]">
            {tag}
          </span>
          <h3 className="text-4xl font-bold text-gray-900 dark:text-white lg:text-5xl">{title}</h3>
        </div>
        <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">{description}</p>
        <div className="relative z-10">
          <Calendly buttonText={t('services.button')} />
        </div>
      </motion.div>

      <motion.div
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex-1"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden rounded-2xl"
        >
          <Image
            src={imageUrl}
            alt={`${title} reference`}
            width={600}
            height={500}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

const ServicesSection = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'home')
  const services = [
    {
      title: t('services.software_development.title'),
      description: t('services.software_development.description'),
      tag: t('services.software_development.tag'),
      imagePosition: 'right',
      imageUrl: '/static/images/software.svg',
    },
    {
      title: t('services.technology_consulting.title'),
      description: t('services.technology_consulting.description'),
      tag: t('services.technology_consulting.tag'),
      imagePosition: 'left',
      imageUrl: '/static/images/goals.svg',
    },
    {
      title: t('services.innovation.title'),
      description: t('services.innovation.description'),
      tag: t('services.innovation.tag'),
      imagePosition: 'right',
      imageUrl: '/static/images/ai.svg',
    },
  ] as const

  return (
    <section className="overflow-hidden">
      <div className="mx-auto">
        <div>
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
