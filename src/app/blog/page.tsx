import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getBlogList, getPublishedCount, type BlogPost } from '@/lib/blog'
import { blogPosts as fallbackPosts } from '@/lib/data'
import BlogPagination from './BlogPagination'

export const metadata: Metadata = {
  title: '博客',
  description:
    '云哨团队的技术博客，分享域名管理、SSL 证书、网站监控、运维安全等领域的实践经验与思考。',
  keywords: ['博客', '技术文章', '域名管理', 'SSL证书', '网站监控', '运维安全', '云哨'],
  alternates: { canonical: '/blog' },
  openGraph: {
    title: '博客 — 无栈云引',
    description: '云哨团队的技术博客，分享域名管理与 SSL 监控的实践经验。',
    url: '/blog',
  },
}

const PAGE_SIZE = 9

export default async function BlogPage() {
  const remote = await getBlogList(1, PAGE_SIZE)
  const totalCount = remote ? remote.total : (await getPublishedCount()) || fallbackPosts.length

  const posts: BlogPost[] = remote?.list ?? []
  const useFallback = posts.length === 0

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-cyan/10 via-brand-indigo/5 to-transparent blur-3xl" />
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-cyan">博客</span>
              <h1 className="mt-2 text-4xl font-bold text-ink-900 sm:text-5xl">
                技术思考与<span className="text-gradient">实践经验</span>
              </h1>
              <p className="mt-4 text-lg text-ink-500">
                分享域名管理、SSL 证书、网站监控与运维安全的深度文章
              </p>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BlogGrid posts={posts} useFallback={useFallback} />
            {totalPages > 1 && (
              <BlogPagination currentPage={1} totalPages={totalPages} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function BlogGrid({ posts, useFallback }: { posts: BlogPost[]; useFallback: boolean }) {
  if (useFallback) {
    const sorted = [...fallbackPosts].sort((a, b) => b.date.localeCompare(a.date))
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((post) => (
          <Link key={post.id} href={post.href} className="product-card group flex flex-col rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-surface-100 px-3 py-1 text-xs font-medium text-ink-600">{post.category}</span>
              <span className="text-xs text-ink-400">{post.readTime}</span>
            </div>
            <div className="mb-4 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-brand-cyan/5 to-brand-purple/5">
              <svg className="h-10 w-10 text-brand-cyan/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v4m2 6v6m0 0l-3-3m3 3l3-3" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-ink-900 group-hover:text-brand-cyan">{post.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>
            <div className="mt-4 flex items-center justify-between border-t border-surface-200 pt-4">
              <span className="text-xs text-ink-400">{post.date}</span>
              <span className="flex items-center gap-1 text-sm font-medium text-brand-cyan opacity-0 transition-opacity group-hover:opacity-100">
                阅读全文
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  const tagColors: Record<string, string> = {
    '安全实践': 'bg-red-50 text-red-600',
    '运维指南': 'bg-blue-50 text-blue-600',
    '产品更新': 'bg-brand-cyan/10 text-brand-cyan',
  }

  return (
    <div>
      {posts.length === 0 ? (
        <div className="py-20 text-center"><p className="text-ink-500">暂无文章，敬请期待。</p></div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const tags = (post.tags || '').split(',').filter(Boolean)
            const primaryTag = tags[0] || ''
            const dateStr = post.published_at
              ? new Date(post.published_at).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
              : ''
            return (
              <Link key={post.id} href={`/blog/${post.slug}`} className="product-card group flex flex-col rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  {primaryTag && (
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${tagColors[primaryTag] || 'bg-surface-100 text-ink-600'}`}>
                      {primaryTag}
                    </span>
                  )}
                  {post.view_count > 0 && <span className="text-xs text-ink-400">{post.view_count} 阅读</span>}
                </div>
                {post.cover_image ? (
                  <div className="mb-4 h-32 overflow-hidden rounded-xl">
                    <img src={post.cover_image} alt={post.title} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ) : (
                  <div className="mb-4 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-brand-cyan/5 to-brand-purple/5">
                    <svg className="h-10 w-10 text-brand-cyan/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v4m2 6v6m0 0l-3-3m3 3l3-3" />
                    </svg>
                  </div>
                )}
                <h2 className="text-lg font-bold text-ink-900 group-hover:text-brand-cyan">{post.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{post.summary || ''}</p>
                <div className="mt-4 flex items-center justify-between border-t border-surface-200 pt-4">
                  <span className="text-xs text-ink-400">{dateStr}</span>
                  <span className="flex items-center gap-1 text-sm font-medium text-brand-cyan opacity-0 transition-opacity group-hover:opacity-100">
                    阅读全文
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
