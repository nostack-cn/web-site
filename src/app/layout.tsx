import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nostack.cloud'
const siteName = '无栈云引'
const siteDescription =
  '无栈云引 — 一站式云计算服务平台，提供云服务器、云数据库、CDN加速、对象存储、Serverless函数计算、容器服务等核心产品。弹性伸缩，按需付费，助力企业高效上云。'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — 一站式云计算服务平台`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    '云计算',
    '云服务器',
    '云数据库',
    'CDN加速',
    '对象存储',
    'Serverless',
    '容器服务',
    '无栈云引',
    'nostack',
    '云平台',
    'SaaS',
    '弹性计算',
  ],
  authors: [{ name: '无栈云引' }],
  creator: '无栈云引',
  publisher: '无栈云引',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'zh-CN': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} — 一站式云计算服务平台`,
    description: siteDescription,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '无栈云引 — 一站式云计算服务平台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — 一站式云计算服务平台`,
    description: siteDescription,
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'technology',
}

export const viewport = {
  themeColor: '#0891B2',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: '无栈云引',
              url: siteUrl,
              description: siteDescription,
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: '无栈云引',
              url: siteUrl,
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${siteUrl}/search?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
