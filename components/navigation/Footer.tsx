'use client'

import Link from '../mdxcomponents/Link'
import siteMetadata from '@/data/siteMetadata'
import { maintitle } from '@/data/localeMetadata'
import SocialIcon from '@/components/social-icons'

import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'

import { useContactModal } from '../formspree/store'
import { ContactModal } from '../formspree'

export default function Footer() {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'footer')
  const contactModal = useContactModal()

  const handleContactClick = (): void => {
    contactModal.onOpen()
  }
  function ContactClick(): void {
    handleContactClick()
  }

  return (
    <>
      <footer>
        <div className="mt-16 flex flex-col items-center">
          <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <div>{siteMetadata.author}</div>
            <div>{` • `}</div>
            <Link href="/">{maintitle[locale]}</Link>
          </div>
          <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
            {`© ${new Date().getFullYear()}`}
          </div>
        </div>
      </footer>
      <ContactModal />
    </>
  )
}
