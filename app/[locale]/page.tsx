import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { LocaleTypes } from './i18n/settings'
import HeroSection from './home/Hero'
import ServicesSection from './home/Services'
import TechnologiesSection from './home/Stack'

type HomeProps = {
  params: { locale: LocaleTypes }
}

export default async function Page({ params: { locale } }: HomeProps) {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const filteredPosts = posts.filter((p) => p.language === locale)
  const hasFeaturedPosts = filteredPosts.filter((p) => p.featured === true)

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <TechnologiesSection />
    </>
  )
}
