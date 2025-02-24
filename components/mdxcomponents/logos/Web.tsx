import React from 'react'

interface WebProps {
  className: string
}

function Web(props: WebProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" {...props}>
      <path fill="#616161" d="M29.18 31.99l2.829-2.828 12.02 12.02-2.828 2.829z"></path>
      <path fill="#616161" d="M20 4a16 16 0 100 32 16 16 0 100-32z"></path>
      <path fill="#37474F" d="M32.456 35.341l2.828-2.829 8.698 8.698-2.829 2.828z"></path>
      <path fill="#64B5F6" d="M20 7a13 13 0 100 26 13 13 0 100-26z"></path>
      <path
        fill="#BBDEFB"
        d="M26.9 14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2 1.2-6.9 3.2c-.4.4-.3 1.1.1 1.4.4.4 1.1.3 1.4-.1C16 13.9 17.9 13 20 13s4 .9 5.4 2.5c.2.2.5.4.8.4.2 0 .5-.1.6-.2.4-.4.4-1.1.1-1.5z"
      ></path>
    </svg>
  )
}

export default Web
