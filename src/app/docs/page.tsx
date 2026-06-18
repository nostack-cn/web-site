import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { docItems } from '@/lib/data'

export const metadata: Metadata = {
  title: '文档',
  description:
    '云哨产品文档中心，包含快速入门指南、功能说明、API 接口参考、Webhook 集成指南及常见问题解答。',
  keywords: ['文档', '使用指南', 'API文档', 'Webhook', 'FAQ', '云哨', '域名监控'],
  alternates: { canonical: '/docs' },
  openGraph: {
    title: '文档 — 无栈云引',
    description: '云哨产品文档中心，快速入门、功能说明、API 参考与常见问题。',
    url: '/docs',
  },
}

const iconMap: Record<string, React.ReactElement> = {
  rocket: <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.38 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7L3.534 3.534a.75.75 0 00-1.06 1.06L4.66 5.78a.75.75 0 001.06-1.06L4.66 4.72z" />,
  list: <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />,
  lock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
  bell: <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />,
  chart: <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
  users: <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
  code: <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
  link: <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />,
  question: <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
}

// 按分类分组
const categoryOrder = ['入门指南', '功能说明', '团队协作', '开发者', '帮助']

export default function DocsPage() {
  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      items: docItems.filter((d) => d.category === cat),
    }))
    .filter((g) => g.items.length > 0)

  return (
    <>
      <Header />
      <main>
        {/* 页面头部 */}
        <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-cyan/10 via-brand-indigo/5 to-transparent blur-3xl" />
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-cyan">文档</span>
              <h1 className="mt-2 text-4xl font-bold text-ink-900 sm:text-5xl">
                使用文档与<span className="text-gradient">开发指南</span>
              </h1>
              <p className="mt-4 text-lg text-ink-500">
                从快速入门到 API 接口，全面了解云哨的使用方法
              </p>
            </div>
          </div>
        </section>

        {/* 文档列表 */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {grouped.map((group) => (
              <div key={group.category} className="mb-12">
                {/* 分类标题 */}
                <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-ink-900">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-cyan/10">
                    <svg className="h-3.5 w-3.5 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  {group.category}
                </h2>

                {/* 卡片网格 */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((doc) => (
                    <Link
                      key={doc.id}
                      href={doc.href}
                      className="product-card group flex items-start gap-4 rounded-xl border border-surface-200 bg-white p-5 shadow-sm"
                    >
                      {/* 图标 */}
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10">
                        <svg className="h-5 w-5 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          {iconMap[doc.icon]}
                        </svg>
                      </div>

                      {/* 文字 */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-ink-900 group-hover:text-brand-cyan">
                          {doc.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-ink-500">
                          {doc.description}
                        </p>
                      </div>

                      {/* 箭头 */}
                      <svg className="mt-1 h-4 w-4 flex-shrink-0 text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
