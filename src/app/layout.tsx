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
  '云哨 — 域名 SSL 监控管家，提供域名到期检查、SSL 证书有效性监控、站点健康巡检、多通道告警通知等功能。全天候自动监控，异常秒级告警，助力企业域名安全。'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — 域名 SSL 监控管家`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    '云哨',
    '域名监控',
    'SSL证书监控',
    '域名到期提醒',
    'SSL证书有效性检查',
    '域名管家',
    '网站监控',
    '证书过期提醒',
    '无栈云引',
    'nostack',
    '域名安全',
    '运维监控',
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
    title: `${siteName} — 域名 SSL 监控管家`,
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
    title: `${siteName} — 域名 SSL 监控管家`,
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
              knowsAbout: ['域名监控', 'SSL证书监控', '网站可用性监控', '域名到期检查'],
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
