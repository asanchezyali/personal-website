'use client'

import { useCallback, useMemo } from 'react'
import { usePathname, useParams, useRouter } from 'next/navigation'
import { useTagStore } from '@/components/util/useTagStore'
import { LocaleTypes, locales } from 'app/[locale]/i18n/settings'
import { Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const LangSwitch = () => {
  const pathname = usePathname()
  const params = useParams()
  const locale = (params.locale as string) || ''
  const router = useRouter()
  const setSelectedTag = useTagStore((state) => state.setSelectedTag)

  const handleLocaleChange = useCallback(
    (newLocale: string): string => {
      const segments = pathname!.split('/')
      const localeIndex = segments.findIndex((segment) => locales.includes(segment as LocaleTypes))
      if (localeIndex !== -1) {
        segments[localeIndex] = newLocale
      } else {
        segments.splice(1, 0, newLocale)
      }
      const newPath = segments.join('/').replace(/\/$/, '')
      return newPath
    },
    [pathname]
  )

  const handleLinkClick = useCallback(
    (newLocale: string) => {
      setSelectedTag('')
      const resolvedUrl = handleLocaleChange(newLocale)
      router.push(resolvedUrl)
    },
    [handleLocaleChange, router, setSelectedTag]
  )

  const currentLocale = useMemo(() => locale.charAt(0).toUpperCase() + locale.slice(1), [locale])

  const getLanguageLabel = (locale: string) => {
    const labels: Record<string, string> = {
      en: '🇺🇸 English',
      es: '🇨🇴 Español',
    }
    return labels[locale] || locale
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 rounded-md py-2 font-bold leading-5 text-gray-700 focus:outline-none dark:text-white">
        <Globe className="h-5 w-5" />
        <span>{currentLocale}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        {locales.map((newLocale: string) => (
          <DropdownMenuItem
            key={newLocale}
            onClick={() => handleLinkClick(newLocale)}
            className="cursor-pointer"
          >
            {getLanguageLabel(newLocale)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LangSwitch
