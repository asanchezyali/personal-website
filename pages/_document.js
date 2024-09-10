import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <meta
            name="google-site-verification"
            content="9yyV-4tBX0dUfCywA6SU7kXvc8DTQMiUem_Rzshn3Pk"
          />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
          <meta name="robots" content="index,follow" />
          <meta name="author" content="Alejandro Sánchez Yalí, asanchezyali@gmail.com" />
          <meta name="url" content="https://www.asanchezyali.com" />
          <meta name="identifier-URL" content="https://asanchezyali.com" />
          <meta name="distribution" content="Local" />
          <meta name="rating" content="General" />
          <meta name="revisit-after" content="7 days" />
          <meta name="target" content="all" />
          <meta name="HandheldFriendly" content="True" />
          <meta name="MobileOptimized" content="320" />
          <meta itemProp="name" content="Club Tuksury" />
          <meta httpEquiv="Expires" content="0" />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Cache-Control" content="no-cache" />
          <meta httpEquiv="imagetoolbar" content="no" />
          <meta httpEquiv="x-dns-prefetch-control" content="off" />

          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        </Head>
        <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
