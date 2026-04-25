import React from 'react'
import { Metadata } from 'next'
import { genPageMetadata } from 'app/[locale]/seo'
import { LocaleTypes } from '../i18n/settings'
import HeroSection from './HeroSection'
import JourneySection from './JourneySection'
import ProjectsSection from './ProjectsSection'
import CommunityBanner from './CommunityBanner'
import ConnectSection from './ConnectSection'

type CollaboratePageProps = {
  params: Promise<{ locale: LocaleTypes }>
}

export async function generateMetadata(props: CollaboratePageProps): Promise<Metadata> {
  const params = await props.params
  const { locale } = params
  return genPageMetadata({
    title: 'Collaborate',
    description:
      'Explore my professional journey, featured projects, and ways to connect and collaborate.',
    params: { locale: locale },
  })
}

export default async function CollaboratePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <JourneySection />
      <ProjectsSection />
      <CommunityBanner />
      <ConnectSection />
    </div>
  )
}
