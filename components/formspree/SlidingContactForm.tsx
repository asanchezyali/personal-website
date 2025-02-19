'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { ContactForm } from './ContactForm'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const onToggleForm = () => {
    setIsOpen((prev) => !prev)
  }

  const defaultButtonClasses =
    'rounded-lg bg-secondary-950 px-8 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-secondary-950'

  if (!isMounted) return null

  return (
    <>
      <button
        onClick={onToggleForm}
        className={buttonClassName || defaultButtonClasses}
        type="button"
      >
        {buttonText}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              onClick={onToggleForm}
            />

            <motion.div
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 h-full w-full overflow-y-auto bg-[#0A0A0A] shadow-xl md:max-w-md"
            >
              <div className="flex h-full flex-col">
                <div className="sticky top-0 z-10 border-b border-[#fdfcfc] border-opacity-10 bg-[#0A0A0A]/95 backdrop-blur-sm">
                  <div className="flex items-center justify-between p-6">
                    <div className="pr-8">
                      <h2 className="text-2xl font-bold tracking-tight text-white">{t('title')}</h2>
                    </div>
                    <button
                      onClick={onToggleForm}
                      className="rounded-full bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                      aria-label={t('closeButton')}
                      type="button"
                    >
                      <X
                        size={24}
                        className="text-white transition-transform duration-300 group-hover:rotate-90"
                      />
                    </button>
                  </div>
                </div>

                <div className="flex-1 space-y-8 p-8">
                  <div className="rounded-lg border border-[#fdfcfc] border-opacity-5 bg-[#1A1A1A]/50 p-6">
                    <p className="text-lg leading-relaxed text-gray-300">{t('description')}</p>
                  </div>
                  <ContactForm onClose={onToggleForm} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default SlidingContactForm
