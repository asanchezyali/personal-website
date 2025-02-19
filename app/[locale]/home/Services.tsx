'use client'
import ListLayout from '@/layouts/ListLayout'

export default function BlogPreview({ posts, params: { locale } }: any) {
  return <ListLayout params={{ locale: locale }} posts={posts.slice(0, 6)} title="all" />
}
