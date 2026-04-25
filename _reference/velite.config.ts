import { defineConfig, defineCollection, s } from 'velite'
import { slug as githubSlug } from 'github-slugger'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { remarkAlert } from 'remark-github-blockquote-alert'
import path from 'path'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import { writeFileSync } from 'fs'

const root = process.cwd()

// heroicon mini link
const icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
`,
  { fragment: true }
)

// Define the series schema
const series = s
  .object({
    title: s.string(),
    order: s.number(),
  })
  .optional()

// Define the blog posts collection
const posts = defineCollection({
  name: 'Blog',
  pattern: 'blog/**/*.mdx',
  schema: s
    .object({
      slug: s.path(), // Auto-generate slug from file path
      title: s.string(),
      subtitle: s.string().optional(),
      series: series,
      date: s.isodate(),
      language: s.string(),
      tags: s.array(s.string()).default([]),
      lastmod: s.isodate().optional(),
      featured: s.boolean().optional(),
      draft: s.boolean().optional(),
      summary: s.string().optional(),
      headerImage: s.string().optional(),
      images: s.array(s.string()).optional(),
      authors: s.array(s.string()),
      layout: s.string().optional(),
      bibliography: s.string().optional(),
      canonicalUrl: s.string().optional(),
      metadata: s.metadata(),
      content: s.mdx(),
      toc: s.toc(),
    })
    .transform((data) => ({
      ...data,
      path: data.slug,
      filePath: data.slug,
      readingTime: data.metadata,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.title,
        datePublished: data.date,
        dateModified: data.lastmod || data.date,
        description: data.summary,
        image: data.images ? data.images[0] : '/static/images/twitter-card.png',
        url: `https://www.asanchezyali.com/${data.language}/blog/${data.slug}`,
      },
    })),
})

// Define the authors collection
const authors = defineCollection({
  name: 'Authors',
  pattern: 'authors/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      name: s.string(),
      language: s.string(),
      default: s.boolean().optional(),
      avatar: s.string().optional(),
      occupation: s.string().optional(),
      company: s.string().optional(),
      email: s.string().optional(),
      twitter: s.string().optional(),
      instagram: s.string().optional(),
      linkedin: s.string().optional(),
      github: s.string().optional(),
      layout: s.string().optional(),
      metadata: s.metadata(),
      content: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      path: data.slug,
      filePath: data.slug,
    })),
})

export default defineConfig({
  root: 'data',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts, authors },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          headingProperties: {
            className: ['content-header'],
          },
          content: icon,
        },
      ],
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, 'data') }],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
    remarkPlugins: [remarkGfm, remarkMath, remarkAlert],
  },
  prepare: ({ posts: allBlogs, authors: allAuthors }) => {
    const isProduction = process.env.NODE_ENV === 'production'

    // Count tags per locale (similar to createTagCount)
    const tagCount: Record<string, Record<string, number>> = {
      en: {},
      es: {},
    }

    allBlogs.forEach((post) => {
      if (post.tags && (!isProduction || post.draft !== true)) {
        post.tags.forEach((tag: string) => {
          const formattedTag = githubSlug(tag)
          if (post.language === 'en') {
            tagCount.en[formattedTag] = (tagCount.en[formattedTag] || 0) + 1
          } else if (post.language === 'es') {
            tagCount.es[formattedTag] = (tagCount.es[formattedTag] || 0) + 1
          }
        })
      }
    })

    // Write tag count to JSON file (similar to contentlayer's createTagCount)
    writeFileSync('./app/[locale]/tag-data.json', JSON.stringify(tagCount))

    console.log('Tag count generated...')
  },
})
