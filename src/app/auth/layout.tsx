import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '登录 / 注册',
  description: '登录或注册无栈云引账号，开启域名 SSL 监控之旅。免费试用，无需信用卡。',
  keywords: ['登录', '注册', '免费试用', '云哨', '无栈云引', '域名监控'],
  robots: { index: false, follow: false },
  alternates: { canonical: '/auth' },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children
}
