'use client'
import React, { useState, useEffect, useRef } from 'react'

interface TocItem { title: string; url: string; items?: TocItem[] }

function flattenToc(items: TocItem[], depth = 2): { title: string; url: string; depth: number }[] {
  return items.flatMap((item) => [
    { title: item.title, url: item.url, depth },
    ...flattenToc(item.items ?? [], depth + 1),
  ])
}

export default function TocFab({ toc }: { toc: TocItem[] }) {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const flat = flattenToc(toc)

  useEffect(() => {
    const ids = flat.map((h) => h.url.replace('#', ''))
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-20% 0% -70% 0%' }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [flat])

  if (!toc || toc.length === 0) return null

  return (
    <div ref={ref}>
      <button className="toc-fab" onClick={() => setOpen((o) => !o)} aria-label="Table of contents">
        <span className="ic">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </span>
        Contents
      </button>

      <div className="toc-sheet" data-open={open ? 'true' : 'false'}>
        <div className="backdrop" onClick={() => setOpen(false)} />
        <nav className="panel">
          <span className="lbl">On this page</span>
          {flat.map((item) => (
            <a
              key={item.url}
              href={item.url}
              className={[item.depth > 2 ? 'indent' : '', activeId === item.url.replace('#', '') ? 'active' : ''].filter(Boolean).join(' ')}
              onClick={() => setOpen(false)}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
