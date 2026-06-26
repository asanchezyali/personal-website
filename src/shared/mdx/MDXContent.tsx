'use client'
import React from 'react'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/i18n/client'
import { LocaleTypes } from '@/i18n/settings'
import { components } from './components'

interface MDXContentProps {
  code: string
  toc?: unknown[]
}

export function MDXContent({ code, toc }: MDXContentProps) {
  const pathname = usePathname()
  const locale: LocaleTypes = pathname?.startsWith('/es') ? 'es' : 'en'
  const { t } = useTranslation(locale, 'common')

  if (!code) return <div>{t('nocontent')}</div>
  try {
    const runtime = { Fragment, jsx, jsxs }
    const fn = new Function('_runtime', code.replace('arguments[0]', '_runtime'))
    const Component = fn(runtime).default
    return <Component components={components} toc={toc || []} />
  } catch (error) {
    console.error('Error rendering MDX:', error)
    return <div>{t('rendererror')}</div>
  }
}
