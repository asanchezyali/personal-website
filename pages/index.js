import NextImage from 'next/image'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="flex h-[20rem] flex-col items-center justify-center pt-20">
        <div className="duration-500 ease-in hover:translate-y-[-3px] hover:scale-[1.01]">
          <NextImage
            src="/avatar.jpeg"
            alt="Avatar"
            width={200}
            height={200}
            className="h-40 w-40 rounded-full"
          />
        </div>
        <h1 className="my-2 text-lg text-slate-800 dark:text-slate-300">
          ¿Si programo entonces existo?
        </h1>
      </div>
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
