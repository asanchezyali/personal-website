'use client'

import React, { useRef, useState } from 'react'
import { useTranslation } from 'app/[locale]/i18n/client'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export interface NewsletterFormProps {
  title?: string
  apiUrl?: string
}

const NewsletterForm = ({ apiUrl = '/api/newsletter' }: NewsletterFormProps) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'newsletter')
  const inputEl = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [subscribed, setSubscribed] = useState<boolean>(false)

  const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const emailValue = inputEl.current?.value
    if (!emailValue) {
      setError(true)
      setMessage(t('messageError'))
      return
    }

    const res = await fetch(apiUrl, {
      body: JSON.stringify({
        email: emailValue,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()
    if (error) {
      setError(true)
      setMessage(t('messageError'))
    } else {
      inputEl.current!.value = ''
      setError(false)
      setSubscribed(true)
    }
  }

  return (
    <div>
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
        {t('title')}
      </div>
      <form className="flex flex-col sm:flex-row" onSubmit={subscribe}>
        <div>
          <label htmlFor="email-input">
            <span className="sr-only">{t('mail')}</span>
            <Input
              autoComplete="email"
              className="w-72 focus:ring-primary-600 dark:bg-black"
              id="email-input"
              name="email"
              placeholder={`${subscribed ? t('placeholderSuccess') : t('placeholderDefault')}`}
              ref={inputEl}
              required
              type="email"
              disabled={subscribed}
            />
          </label>
        </div>
        <div className="mt-2 flex w-full rounded-md shadow-sm sm:ml-3 sm:mt-0">
          <Button
            variant="shimmer"
            type="submit"
            disabled={subscribed}
            className={subscribed ? 'cursor-default' : ''}
          >
            <span className="relative z-50 text-lg text-white">
              {subscribed ? t('buttonSuccess') : t('buttonDefault')}
            </span>
          </Button>
        </div>
      </form>
      {error && (
        <div className="w-72 pt-2 text-sm text-red-500 dark:text-red-400 sm:w-96">{message}</div>
      )}
    </div>
  )
}

export default NewsletterForm
