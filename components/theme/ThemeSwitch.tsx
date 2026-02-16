'use client'

import { DarkModeSwitch } from './DarkModeSwitch'
import { Monitor, Moon, Sun } from './icons'
import { useTheme } from './ThemeContext'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const ThemeSwitch = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const { theme, setTheme, mounted } = useTheme()

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as 'light' | 'dark' | 'system')
  }

  if (!mounted) return null

  return (
    <div className="mr-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button aria-label={t('theme')} className="focus:outline-none">
            <DarkModeSwitch
              mode={theme as 'light' | 'dark' | 'system'}
              onChange={handleThemeChange}
              size={24}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuRadioGroup value={theme} onValueChange={handleThemeChange}>
            <DropdownMenuRadioItem
              value="light"
              className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:text-primary-500 dark:hover:text-primary-500"
            >
              <Sun className="mr-2 h-6 w-6" />
              {t('light')}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="dark"
              className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:text-primary-500 dark:hover:text-primary-500"
            >
              <Moon className="mr-2 h-6 w-6" />
              {t('dark')}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="system"
              className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:text-primary-500 dark:hover:text-primary-500"
            >
              <Monitor className="mr-2 h-6 w-6" />
              {t('system')}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ThemeSwitch
