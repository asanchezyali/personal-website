'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QrCode, X, Share2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'

interface QRButtonProps {
  buttonText?: string
  buttonClassName?: string
}

const QRButton: React.FC<QRButtonProps> = ({ buttonText, buttonClassName }) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'qr-code')

  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [qrSvg, setQrSvg] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const currentUrl = window.location.origin + pathname
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`
      setQrSvg(qrCodeUrl)
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, pathname])

  const onToggleQR = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const defaultButtonClasses =
    'rounded-lg text-lg font-semibold text-white transition-colors duration-300'

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Pi Agents',
          text: t('shareText'),
          url: window.location.href,
        })
        .catch((error) => console.log('Error sharing', error))
    } else {
      console.log('Web Share not supported')
      // Fallback: Copiar al portapapeles
      navigator.clipboard.writeText(window.location.href).then(
        () => {
          alert(t('copiedToClipboard'))
        },
        (err) => {
          console.error('Could not copy text: ', err)
        }
      )
    }
  }, [t])

  if (!isMounted) return null

  return (
    <>
      <button
        onClick={onToggleQR}
        className={buttonClassName || defaultButtonClasses}
        type="button"
        aria-label={t('generateQRCode')}
      >
        {buttonText || <QrCode className="h-5 w-5 text-gray-900 dark:text-gray-100" />}
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
              onClick={onToggleQR}
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
                      <h2 className="text-2xl font-bold tracking-tight text-white">
                        {t('qrCodeTitle')}
                      </h2>
                    </div>
                    <button
                      onClick={onToggleQR}
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
                    <p className="text-lg leading-relaxed text-gray-300">
                      {t('qrCodeDescription')}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-6">
                    {qrSvg && (
                      <div className="overflow-hidden rounded-lg bg-white p-4">
                        <Image
                          src={qrSvg}
                          alt={t('qrCodeAlt')}
                          width={200}
                          height={200}
                          className="h-auto w-auto"
                        />
                      </div>
                    )}
                    <button
                      onClick={handleShare}
                      className="flex items-center space-x-2 rounded-lg bg-primary-500 px-6 py-3 text-white transition-colors hover:bg-primary-600"
                    >
                      <Share2 size={20} />
                      <span>{t('shareButton')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default QRButton
