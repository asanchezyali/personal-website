'use client'
import React, { useRef, useState } from 'react'

export default function CodeBlock({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const onCopy = () => {
    const text = ref.current?.querySelector('pre')?.textContent ?? ''
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        margin: '24px 0',
        borderRadius: 12,
        overflow: 'hidden',
        background: '#0f172a',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <button
        aria-label="Copy code"
        onClick={onCopy}
        style={{
          position: 'absolute', top: 10, right: 10,
          background: 'rgba(255,255,255,0.08)', border: 'none',
          borderRadius: 6, padding: '4px 8px', cursor: 'pointer',
          color: copied ? '#86efac' : '#94a3b8', fontSize: 11,
          fontFamily: 'inherit', transition: 'color .2s',
        }}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      {children}
    </div>
  )
}
