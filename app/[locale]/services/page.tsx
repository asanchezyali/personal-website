import React from 'react'
import { Metadata } from 'next'
import { genPageMetadata } from 'app/[locale]/seo'
import { LocaleTypes } from '../i18n/settings'
import ServicesSection from './ServicesSection'

type ServicesPageProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({
  params: { locale },
}: ServicesPageProps): Promise<Metadata> {
  return genPageMetadata({
    title: 'Services',
    description:
      'Professional services in web development, AI integration, and technical education.',
    params: { locale: locale },
  })
}

export default async function ServicesPage({ params: { locale } }: ServicesPageProps) {
  return (
    <div className="min-h-screen">
      <ServicesSection />
    </div>
  )
}
