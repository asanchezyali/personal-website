import { useState, useRef, useCallback, useMemo } from 'react'
import { usePathname, useParams, useRouter } from 'next/navigation'
import { useOuterClick } from '../util/useOuterClick'
import { useTagStore } from '@/components/util/useTagStore'
import { LocaleTypes, locales } from 'app/[locale]/i18n/settings'
import { Globe } from 'lucide-react'
import {
  Menu,
  Transition,
  RadioGroup,
  MenuButton,
  MenuItems,
  Radio,
  MenuItem,
} from '@headlessui/react'

const LangSwitch = () => {
  const pathname = usePathname()
  const params = useParams()
  const locale = (params.locale as string) || ''
  const router = useRouter()
  const setSelectedTag = useTagStore((state) => state.setSelectedTag)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const menubarRef = useRef<HTMLDivElement>(null)
  useOuterClick(menubarRef, () => setIsMenuOpen(false))

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
      setIsMenuOpen(false)
    },
    [handleLocaleChange, router, setSelectedTag]
  )

  const currentLocale = useMemo(() => locale.charAt(0).toUpperCase() + locale.slice(1), [locale])

  const getLanguageLabel = (locale: string) => {
    const labels: Record<string, string> = {
      en: '🇺🇸 English',
      es: '🇨🇴 Español'
    }
    return labels[locale] || locale
  }

  return (
    <div ref={menubarRef} className="relative inline-block text-left">
      <Menu>
        {({ open }) => (
          <>
            <MenuButton
              className="inline-flex items-center justify-center gap-2 rounded-md py-2 font-bold leading-5 text-gray-700 dark:text-white"
              aria-haspopup="true"
              aria-expanded={open}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Globe className="h-5 w-5" />
              <span>{currentLocale}</span>
            </MenuButton>
            <Transition
              show={open}
              enter="transition-all ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-[-10px]"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="transition-all ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-[10px]"
            >
              <MenuItems
                className="absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800"
                aria-orientation="vertical"
                onBlur={() => setIsMenuOpen(false)}
              >
                <RadioGroup>
                  <div className="py-1">
                    {locales.map((newLocale: string) => (
                      <Radio key={newLocale} value={newLocale}>
                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={() => handleLinkClick(newLocale)}
                              className={`w-full px-4 py-2 text-left text-sm ${
                                active
                                  ? 'bg-gray-100 text-primary-500 dark:bg-gray-700 dark:text-primary-400'
                                  : 'text-gray-700 dark:text-gray-200'
                              }`}
                            >
                              {getLanguageLabel(newLocale)}
                            </button>
                          )}
                        </MenuItem>
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>
              </MenuItems>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}

export default LangSwitch