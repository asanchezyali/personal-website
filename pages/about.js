import React from 'react'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import { LanguageContext } from '@/providers/LanguageProvider'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps() {
  const AboutInEN = await getFileBySlug('authors', ['default'])
  const AboutInES = await getFileBySlug('authors', ['default.es'])
  const authorDetails = { AboutInEN, AboutInES }
  return { props: { authorDetails } }
}

export default function About({ authorDetails }) {
  const { language } = React.useContext(LanguageContext)
  const { mdxSource, frontMatter } = authorDetails[`AboutIn${language.toUpperCase()}`]
  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
