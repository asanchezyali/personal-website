'use client'

import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { useState } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import { fallbackLng, secondLng } from 'app/[locale]/i18n/locales'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { Share2, Copy, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type ShareProps = { title: string; description?: string; slug: string; className?: string }

const Share = ({ title, description, slug, className }: ShareProps) => {
  const [copied, setCopied] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds for better UX
  }

  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const pathname = usePathname()
  const pathSegments = pathname!.split('/')
  
  let targetSegment = pathSegments.length >= 2 ? pathSegments[1] : ''
  if (locale === fallbackLng) {
    targetSegment = pathSegments.length >= 2 ? pathSegments[1] : ''
  } else if (locale === secondLng) {
    targetSegment = pathSegments.length >= 3 ? pathSegments[2] : ''
  }

  const socialPlatforms = [
    {
      kind: 'facebook',
      href: `https://facebook.com/sharer/sharer.php?u=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}`,
      label: t('facebookshare')
    },
    {
      kind: 'twitter',
      href: `https://twitter.com/intent/tweet/?url=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&text=${title}`,
      label: t('twittershare')
    },
    {
      kind: 'linkedin',
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&title=${title}&summary=${description}&source=${siteMetadata.siteUrl}`,
      label: t('linkedinshare')
    },
    {
      kind: 'reddit',
      href: `https://www.reddit.com/submit?url=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&title=${title}`,
      label: t('redditshare')
    },
    {
      kind: 'threads',
      href: `https://threads.net/intent/post?text=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}`,
      label: t('threadsshare')
    },
    {
      kind: 'whatsapp',
      href: `https://wa.me/?text=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&text=${title}`,
      label: t('whatsappshare')
    },
    {
      kind: 'telegram',
      href: `https://telegram.me/share/url?url=${siteMetadata.siteUrl}/${locale}/${targetSegment}/${slug}&text=${title}`,
      label: t('telegramshare')
    }
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        <Share2 className="h-4 w-4" />
        <span>{t('share')}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="absolute left-0 z-50 mt-2 w-72 origin-top-left rounded-xl bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {t('share')}
                </h3>
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>{t('urlcopied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>{t('copyurl')}</span>
                    </>
                  )}
                </button>
              </div>

              <motion.div 
                className="grid grid-cols-4 gap-3"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                {socialPlatforms.map((platform, index) => (
                  <motion.div
                    key={platform.kind}
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1 }
                    }}
                  >
                    <SocialIcon
                      kind={platform.kind}
                      href={platform.href}
                      size={6}
                      aria-label={platform.label}
                      className="transform transition-transform hover:scale-110"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Share