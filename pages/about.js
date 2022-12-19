import React from 'react'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import { LanguageContext } from '@/providers/LanguageProvider'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps() {
  const authorDetailsEn = await getFileBySlug('authors', 'default.en')
  const authorDetailsEs = await getFileBySlug('authors', 'default.es')
  return { props: { authorDetailsEn, authorDetailsEs } }
}

export default function About({ authorDetailsEn, authorDetailsEs }) {
  const { language } = React.useContext(LanguageContext)
  const authorDetails = language === 'en' ? authorDetailsEn : authorDetailsEs

  const { mdxSource, frontMatter } = authorDetails

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
