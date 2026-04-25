'use client'

import Link from '../mdxcomponents/Link'
import siteMetadata from '@/data/siteMetadata'
import { maintitle } from '@/data/localeMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import DiscordIcon from '@/components/svgcomponents/discordicon'

import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'

import { useContactModal } from '../formspree/store'
import { ContactModal } from '../formspree'

const socialLinks = [
  { icon: Github, href: 'https://github.com/asanchezyali', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/asanchezyali/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/asanchezyali', label: 'X (Twitter)' },
  { icon: Instagram, href: 'https://www.instagram.com/asanchezyali/', label: 'Instagram' },
  { icon: DiscordIcon, href: 'https://discord.gg/VF9QHBBF', label: 'Discord' },
]

export default function Footer() {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'footer')
  const { t: tCommon } = useTranslation(locale, 'common')
  const contactModal = useContactModal()

  return (
    <>
      <footer className="mt-16 border-t border-gray-200 dark:border-gray-800">
        <div className="py-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {/* Brand */}
            <div>
              <Link
                href={`/${locale}/`}
                className="font-ubuntu text-lg font-bold text-gray-900 dark:text-white"
              >
                Yali Dev
              </Link>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {t('built_with')}
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {t('navigation')}
              </h3>
              <ul className="space-y-2">
                {headerNavLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-sm text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
                    >
                      {tCommon(link.title.toLowerCase())}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => contactModal.onOpen()}
                    className="text-sm text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
                  >
                    {tCommon('contact')}
                  </button>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {t('connect')}
              </h3>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800 sm:flex-row">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {`© ${new Date().getFullYear()} ${siteMetadata.author}. ${t('rights')}`}
            </p>
            <Link
              href="/"
              className="mt-2 text-sm text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 sm:mt-0"
            >
              {maintitle[locale]}
            </Link>
          </div>
        </div>
      </footer>
      <ContactModal />
    </>
  )
}
