import type React from 'react'
import 'css/tailwind.css'
import 'pliny/search/algolia.css'

import { overlock, ubuntu, lato } from './fonts'
import { Analytics, type AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider } from '@/components/search/SearchProvider'
import Header from '@/components/navigation/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/navigation/Footer'
import siteMetadata from '@/data/siteMetadata'
import { maintitle, maindescription } from '@/data/localeMetadata'
import { ThemeProvider } from '@/components/theme/ThemeContext'
import type { Metadata } from 'next'
import { dir } from 'i18next'
import { type LocaleTypes, locales } from './i18n/settings'
import TwSizeIndicator from '@/components/helper/TwSizeIndicator'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: LocaleTypes }>
}

export async function generateMetadata(props: {
  params: Promise<{ locale: LocaleTypes }>
}): Promise<Metadata> {
  const params = await props.params
  const { locale } = params
  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      default: maintitle[locale],
      template: `%s | ${maintitle[locale]}`,
    },
    description: maindescription[locale],
    openGraph: {
      title: maintitle[locale],
      description: maindescription[locale],
      url: './',
      siteName: maintitle[locale],
      images: [siteMetadata.socialBanner],
      locale: locale,
      type: 'website',
    },
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
      },
    },
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
  const params = await props.params
  const { locale } = params
  const { children } = props

  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={`${ubuntu.variable} ${lato.variable} ${overlock.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta
          name="google-site-verification"
          content="9yyV-4tBX0dUfCywA6SU7kXvc8DTQMiUem_Rzshn3Pk"
        />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className="relative min-w-[300px] bg-background text-foreground antialiased">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>
        <div className="relative">
          <TwSizeIndicator />
          <ThemeProvider>
            <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
            <SectionContainer>
              <div className="flex h-full flex-col justify-between font-sans">
                <SearchProvider>
                  <Header />
                  <main className="mb-auto">{children}</main>
                </SearchProvider>
                <Footer />
              </div>
            </SectionContainer>
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
