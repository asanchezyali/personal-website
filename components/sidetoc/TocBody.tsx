'use client'

import TOCInline from 'pliny/ui/TOCInline'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'
import useSidebarStore from './store'
import { Toc, TocItem as OriginalTocItem } from 'pliny/mdx-plugins/remark-toc-headings'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TocBodyProps {
  toc: Toc
}

interface TocItem extends OriginalTocItem {
  children?: TocItem[]
}

const filterToc = (toc: TocItem[]): TocItem[] => {
  return toc.map((item) => {
    const modifiedValue = item.url.replace(/-\d+$/, '')
    return {
      ...item,
      url: modifiedValue,
    }
  })
}

const TocBody = ({ toc }: TocBodyProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const { sidebarOpen, closeSidebar } = useSidebarStore()

  if (!sidebarOpen) {
    return null
  }

  const filteredToc = filterToc(toc as TocItem[])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-black/20"
        onClick={closeSidebar}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed inset-y-0 right-0 z-50 h-full w-full overflow-y-auto border-l border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-black md:max-w-[320px]"
      >
        <div className="flex h-full flex-col">
          <div className="relative top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-black/95 h-[65px]">
            <div className="flex items-center justify-between p-6">
              <div className="pr-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {t('sidetoc')}
                </h2>
              </div>
              <button
                onClick={closeSidebar}
                className="rounded-full bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 absolute top-3 right-4"
                aria-label={t('close')}
                type="button"
              >
                <X size={24} className="transition-transform duration-300 group-hover:rotate-90" />
              </button>
     
            </div>
          </div>

          <div className="flex-1 space-y-8 px-2 py-8">
            <div className="ba overflow-y-auto">
              <TOCInline
                toc={filteredToc}
                ulClassName="space-y-3 overflow-y-auto text-gray-600 dark:text-gray-300 text-[0.9rem]"
                liClassName="pl-4 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TocBody
