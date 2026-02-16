'use client'

import React, { useState, useEffect } from 'react'
import { ContactForm } from './ContactForm'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

interface SlidingContactFormProps {
  buttonText?: string
  buttonClassName?: string
}

const SlidingContactForm: React.FC<SlidingContactFormProps> = ({ buttonText, buttonClassName }) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'contact-form')

  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const onToggleForm = () => {
    setIsOpen((prev) => !prev)
  }

  const defaultButtonClasses =
    'rounded-lg bg-secondary-950 px-8 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-secondary-950'

  if (!isMounted) return null

  return (
    <>
      <Button
        onClick={onToggleForm}
        className={buttonClassName || defaultButtonClasses}
        type="button"
        variant="ghost"
      >
        {buttonText}
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="w-full overflow-y-auto border-l-0 bg-[#0A0A0A] p-0 sm:max-w-md"
        >
          <div className="flex h-full flex-col">
            <div className="sticky top-0 z-10 border-b border-[#fdfcfc] border-opacity-10 bg-[#0A0A0A]/95 backdrop-blur-sm">
              <SheetHeader className="p-6">
                <SheetTitle className="text-2xl font-bold tracking-tight text-white">
                  {t('title')}
                </SheetTitle>
                <SheetDescription className="sr-only">{t('description')}</SheetDescription>
              </SheetHeader>
            </div>

            <div className="flex-1 space-y-8 p-8">
              <div className="rounded-lg border border-[#fdfcfc] border-opacity-5 bg-[#1A1A1A]/50 p-6">
                <p className="text-lg leading-relaxed text-gray-300">{t('description')}</p>
              </div>
              <ContactForm onClose={onToggleForm} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default SlidingContactForm
