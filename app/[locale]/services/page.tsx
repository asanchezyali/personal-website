import React from 'react'
import { Metadata } from 'next'
import { genPageMetadata } from 'app/[locale]/seo'
import { LocaleTypes } from '../i18n/settings'
import ServicesSection from './ServicesSection'

type ServicesPageProps = {
  params: Promise<{ locale: LocaleTypes }>
}

export async function generateMetadata(props: ServicesPageProps): Promise<Metadata> {
  const params = await props.params
  const { locale } = params
  return genPageMetadata({
    title: 'Services',
    description:
      'Professional services in web development, AI integration, and technical education.',
    params: { locale: locale },
  })
}

export default async function ServicesPage(props: ServicesPageProps) {
  const params = await props.params
  const { locale } = params
  return (
    <div className="min-h-screen">
      <ServicesSection />
    </div>
  )
}
