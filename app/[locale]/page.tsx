import React from 'react'
import { Metadata } from 'next'
import { genPageMetadata } from 'app/[locale]/seo'
import { LocaleTypes } from './i18n/settings'
import HeroSection from './home/Hero'
import TechnologiesSection from './home/TecnologiesSection'
import BlogPreview from './home/BlogPreview'
import CommunitySection from './home/CommunitySection'

type HomeProps = {
  params: Promise<{ locale: LocaleTypes }>
}

export async function generateMetadata(props: HomeProps): Promise<Metadata> {
  const params = await props.params
  const { locale } = params
  return genPageMetadata({
    title: 'Home',
    params: { locale: locale },
  })
}

export default async function Page(props: HomeProps) {
  const params = await props.params
  const { locale } = params
  return (
    <>
      <HeroSection />
      <TechnologiesSection />
      <BlogPreview />
      <CommunitySection />
    </>
  )
}
