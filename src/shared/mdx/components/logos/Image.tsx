import React from 'react'

interface ImageProps {
  className: string
}

function Image(props: ImageProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" {...props}>
      <path
        fill="#F57C00"
        d="M40 41H8c-2.2 0-4-1.8-4-4V11c0-2.2 1.8-4 4-4h32c2.2 0 4 1.8 4 4v26c0 2.2-1.8 4-4 4z"
      ></path>
      <path fill="#FFF9C4" d="M35 13a3 3 0 100 6 3 3 0 100-6z"></path>
      <path fill="#942A09" d="M20 16L9 32h22z"></path>
      <path fill="#BF360C" d="M31 22l-8 10h16z"></path>
    </svg>
  )
}

export default Image
