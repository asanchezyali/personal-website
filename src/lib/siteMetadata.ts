const siteMetadata = {
  title: 'Yali Dev',
  author: 'Alejandro Sánchez Yalí',
  headerTitle: 'Yali Dev',
  description: 'A space dedicated to exploring the intersections of mathematics, computer science, software development, artificial intelligence, and deep learning.',
  language: 'en',
  theme: 'system',
  siteUrl: 'https://asanchezyali.com',
  siteRepo: 'https://github.com/asanchezyali/personal-website',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'asanchezyali@gmail.com',
  github: 'https://github.com/asanchezyali',
  x: 'https://x.com/asanchezyali',
  linkedin: 'https://www.linkedin.com/in/asanchezyali/',
  instagram: 'https://www.instagram.com/asanchezyali/',
  discord: 'https://discord.gg/VF9QHBBF',
  locale: 'en',
  analytics: {
    googleAnalytics: { googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID },
  },
  search: {
    provider: 'kbar' as const,
    kbarConfig: { searchDocumentsPath: 'search.json' },
  },
}
export default siteMetadata
