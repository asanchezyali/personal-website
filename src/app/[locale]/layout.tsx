import type React from 'react'
import 'styles/main.css'
import 'styles/pages.css'
import 'styles/tailwind.css'
import { ubuntu, lato } from './fonts'
import { Analytics, type AnalyticsConfig } from 'pliny/analytics'
import siteMetadata from '@/lib/siteMetadata'
import { maintitle, maindescription } from '@/lib/localeMetadata'
import type { Metadata } from 'next'
import { dir } from 'i18next'
import { type LocaleTypes, locales } from '@/i18n/settings'
import { ThemeProvider } from '@/shared/hooks/useTheme'
import Header from '@/layout/Header'
import Footer from '@/layout/Footer'
import { pageAlternates, publicUrl } from '@/lib/publicUrl'

// Only the locales above exist; any other first segment (e.g. /wp-login.php) is a static 404.
export const dynamicParams = false

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type LayoutProps = { children: React.ReactNode; params: Promise<{ locale: LocaleTypes }> }

export async function generateMetadata(props: {
  params: Promise<{ locale: LocaleTypes }>
}): Promise<Metadata> {
  const { locale } = await props.params
  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: { default: maintitle[locale], template: `%s | ${maintitle[locale]}` },
    description: maindescription[locale],
    openGraph: {
      title: maintitle[locale],
      description: maindescription[locale],
      url: publicUrl(locale),
      siteName: maintitle[locale],
      images: [siteMetadata.socialBanner],
      locale,
      type: 'website',
    },
    // Pages override this with their own path; the home page and 404s keep it.
    alternates: pageAlternates(locale),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      title: maintitle[locale],
      description: maindescription[locale],
      site: siteMetadata.siteUrl,
      creator: siteMetadata.author,
      card: 'summary_large_image',
      images: [siteMetadata.socialBanner],
    },
  }
}

export default async function RootLayout(props: LayoutProps) {
  const { locale } = await props.params
  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={`${ubuntu.variable} ${lato.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FFFDF7" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#141420" />
      </head>
      <body>
        <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
        <ThemeProvider>
          <Header />
          <main>{props.children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
