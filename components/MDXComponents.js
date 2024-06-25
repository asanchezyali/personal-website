/* eslint-disable react/display-name */
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import PageTitle from './PageTitle'
import Pre from './Pre'
import { BlogNewsletterForm } from './NewsletterForm'
import MathBox from './HighlightBox'
import ImageBox from './ImageBox'

export const MDXComponents = {
  ImageBox,
  TOCInline,
  PageTitle,
  MathBox,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm: BlogNewsletterForm,
  wrapper: ({ components, layout, ...rest }) => {
    const Layout = require(`../layouts/${layout}`).default
    return <Layout {...rest} />
  },
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
