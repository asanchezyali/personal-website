'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { QrCode, Share2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
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
      const currentUrl = window.location.origin + pathname
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`
      setQrSvg(qrCodeUrl)
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
          title: 'Yali Dev',
          text: t('shareText'),
          url: window.location.href,
        })
        .catch((error) => console.log('Error sharing', error))
    } else {
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

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="w-full overflow-y-auto border-l-0 bg-[#0A0A0A] p-0 sm:max-w-md"
        >
          <div className="flex h-full flex-col">
            <div className="sticky top-0 z-10 border-b border-[#fdfcfc] border-opacity-10 bg-[#0A0A0A]/95 backdrop-blur-sm">
              <SheetHeader className="p-6">
                <SheetTitle className="text-2xl font-bold tracking-tight text-white">
                  {t('qrCodeTitle')}
                </SheetTitle>
                <SheetDescription className="sr-only">{t('qrCodeDescription')}</SheetDescription>
              </SheetHeader>
            </div>

            <div className="flex-1 space-y-8 p-8">
              <div className="rounded-lg border border-[#fdfcfc] border-opacity-5 bg-[#1A1A1A]/50 p-6">
                <p className="text-lg leading-relaxed text-gray-300">{t('qrCodeDescription')}</p>
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
                <Button onClick={handleShare}>
                  <Share2 size={20} className="mr-2" />
                  {t('shareButton')}
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default QRButton
