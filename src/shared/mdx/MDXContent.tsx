'use client'
import React from 'react'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import { components } from './components'

interface MDXContentProps { code: string; toc?: any[] }

export function MDXContent({ code, toc }: MDXContentProps) {
  if (!code) return <div>No content available</div>
  try {
    const runtime = { Fragment, jsx, jsxs }
    const fn = new Function('_runtime', code.replace('arguments[0]', '_runtime'))
    const Component = fn(runtime).default
    return <Component components={components} toc={toc || []} />
  } catch (error) {
    console.error('Error rendering MDX:', error)
    return <div>Unable to render content</div>
  }
}
