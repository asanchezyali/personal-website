import React from 'react'
import Image from '@/components/Image'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import metaLabels from '@/data/metaLabels'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import SocialIcon from '@/components/social-icons'
import { LanguageContext } from '@/providers/LanguageProvider'
import { quotes } from '@/lib/quotes'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  return { props: { posts } }
}

export default function Blog({ posts }) {
  const [initialDisplayPosts, setInitialDisplayPosts] = React.useState([])
  const [pagination, setPagination] = React.useState({
    currentPage: 1,
    totalPages: 1,
  })
  const { language } = React.useContext(LanguageContext)

  React.useEffect(() => {
    const filteredPosts = posts.filter(
      (frontMatter) => frontMatter.draft !== true && frontMatter.language === language
    )
    setInitialDisplayPosts(filteredPosts.slice(0, POSTS_PER_PAGE))
    setPagination({
      currentPage: 1,
      totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
    })
  }, [posts, language])

  const { quote, author } = quotes({ language })

  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="flex flex-col items-center justify-center pb-20 pt-20">
        <div className="duration-500 ease-in hover:translate-y-[-3px] hover:scale-[1.01]">
          <Image src="/avatar.png" alt="Avatar" width={200} height={200} className="rounded-full" />
        </div>
        <h1 className="my-2 max-w-[600px] text-center text-lg text-slate-800 dark:text-slate-300">
          {quote && author ? `«${quote}» - ${author}` : null}
        </h1>
        <div className="flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="6" />
          <SocialIcon kind="github" href={siteMetadata.github} size="6" />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size="6" />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size="6" />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="6" />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="6" />
        </div>
      </div>
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={metaLabels[language].title}
      />
    </>
  )
}
