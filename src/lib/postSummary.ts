import type { Blog } from '#site/content'

// The fields that post lists and cards need. Client components must receive
// this instead of the full Blog entry: the compiled MDX body and TOC of every
// post would otherwise be serialized into the page payload (several MB).
export type PostSummary = Pick<
  Blog,
  'slug' | 'title' | 'date' | 'language' | 'draft' | 'summary' | 'tags' | 'headerImage'
> & { metadata: Pick<Blog['metadata'], 'readingTime'> }

export function toPostSummary(post: Blog): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    language: post.language,
    draft: post.draft,
    summary: post.summary,
    tags: post.tags,
    headerImage: post.headerImage,
    metadata: { readingTime: post.metadata.readingTime },
  }
}
