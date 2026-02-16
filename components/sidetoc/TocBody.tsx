'use client'

import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'
import useSidebarStore from './store'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface VeliteTocItem {
  title: string
  url: string
  items: VeliteTocItem[]
}

interface TocBodyProps {
  toc: VeliteTocItem[]
}

interface FlatTocItem {
  value: string
  url: string
  depth: number
}

const flattenToc = (items: VeliteTocItem[], depth = 2): FlatTocItem[] => {
  const result: FlatTocItem[] = []
  for (const item of items) {
    result.push({
      value: item.title,
      url: item.url.replace(/-\d+$/, ''),
      depth,
    })
    if (item.items && item.items.length > 0) {
      result.push(...flattenToc(item.items, depth + 1))
    }
  }
  return result
}

const TocBody = ({ toc }: TocBodyProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const { sidebarOpen, closeSidebar } = useSidebarStore()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!sidebarOpen) {
    return null
  }

  const flatToc = flattenToc(toc as VeliteTocItem[])

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-black/20"
        onClick={closeSidebar}
      />
      <motion.div
        key="content"
        className="fixed inset-x-0 bottom-0 z-50 h-[50vh] w-full bg-white shadow-xl dark:bg-black md:inset-x-auto md:right-0 md:top-0 md:h-full md:w-[320px] md:border-l md:border-gray-200 dark:md:border-gray-800"
        initial={isMobile ? { y: '100%' } : { x: '100%' }}
        animate={isMobile ? { y: '0%' } : { x: '0%' }}
        exit={isMobile ? { y: '100%' } : { x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        <div className="flex h-full flex-col overflow-hidden rounded-t-2xl md:rounded-none">
          <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-gray-800 dark:bg-black/95">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('sidetoc')}
              </h2>
              <button
                onClick={closeSidebar}
                className="rounded-lg bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                aria-label={t('close')}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <nav>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                {flatToc.map((item, index) => (
                  <li
                    key={index}
                    className="transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400"
                    style={{ paddingLeft: `${(item.depth - 2) * 1}rem` }}
                  >
                    <a href={item.url} onClick={closeSidebar}>
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TocBody
