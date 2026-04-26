import { LocaleTypes } from '@/i18n/settings'
import HeroSection from '@/features/home/HeroSection'
import TechStackSection from '@/features/home/TechStackSection'
import BlogPreviewSection from '@/features/home/BlogPreviewSection'
import CommunitySection from '@/features/home/CommunitySection'
import { posts } from '#site/content'

type HomeProps = { params: Promise<{ locale: LocaleTypes }> }

export default async function Home(props: HomeProps) {
  const { locale } = await props.params

  return (
    <>
      <div className="wrap">
        <HeroSection locale={locale} />
      </div>
      <TechStackSection locale={locale} />
      <BlogPreviewSection locale={locale} posts={posts} />
      <CommunitySection locale={locale} />
    </>
  )
}
