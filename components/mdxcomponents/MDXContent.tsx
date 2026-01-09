'use client'

import React from 'react'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import { components } from '@/components/mdxcomponents'

interface MDXContentProps {
  code: string // Velite's MDX compiled code
  toc?: any[] // Table of contents from Velite
}

export function MDXContent({ code, toc }: MDXContentProps) {
  if (!code) {
    return <div>No content available</div>
  }

  // Velite's s.mdx() generates code that expects arguments[0] to contain Fragment, jsx, jsxs
  // The code returns an object like: {default: function(props) {...}}
  try {
    // Create the runtime object with proper jsx functions
    const runtime = { Fragment, jsx, jsxs }

    // Replace arguments[0] with a named parameter 'runtime'
    // This allows us to use the Function constructor safely
    const modifiedCode = code.replace('arguments[0]', '_runtime')

    // Create a function that receives runtime as a parameter and returns the MDX module
    // eslint-disable-next-line no-new-func
    const fn = new Function('_runtime', modifiedCode)

    // Call the function with runtime to get the MDX module
    // The module has a 'default' export which is the actual component
    const mdxModule = fn(runtime)
    const Component = mdxModule.default

    // Import components directly in the client component instead of passing as props
    // Pass toc as a prop so MDX components like TOCInline can access it via props.toc
    return <Component components={components} toc={toc || []} />
  } catch (error) {
    console.error('Error rendering MDX content:', error)
    return <div>Unable to render content</div>
  }
}
