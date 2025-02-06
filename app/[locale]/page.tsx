import React from 'react'
import { Metadata } from 'next'
import { genPageMetadata } from 'app/[locale]/seo'
import { LocaleTypes } from './i18n/settings'
import HeroSection from './home/Hero'
import TechnologiesSection from './home/Stack'
import BlogPreview from './home/BlogPreview'

type BlogPageProps = {
  params: { locale: LocaleTypes }
}

export async function generateMetadata({ params: { locale } }: BlogPageProps): Promise<Metadata> {
  return genPageMetadata({
    title: 'Blog',
    params: { locale: locale },
  })
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  return (
    <>
      <HeroSection />
      <BlogPreview />
      <TechnologiesSection />
    </>
  )
}
