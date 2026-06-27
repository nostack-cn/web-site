'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'

const SVR_ADMIN_URL = process.env.NEXT_PUBLIC_SVR_ADMIN_URL || ''
const PAGE_SIZE = 9

interface Props {
  currentPage: number
  totalPages: number
}

export default function BlogPagination({ currentPage, totalPages }: Props) {
  const [loadingPage, setLoadingPage] = useState<number | null>(null)
  const [pages, setPages] = useState<Record<number, BlogPost[]>>({})

  const handleLoadPage = async (page: number) => {
    if (pages[page] || loadingPage) return
    setLoadingPage(page)
    try {
      const url = `${SVR_ADMIN_URL}/internal/blogs?status=published&page=${page}&page_size=${PAGE_SIZE}`
      const res = await fetch(url, { headers: { 'X-Internal-Key': '' } })
      if (!res.ok) return
      const json = await res.json()
      if (json.code === 0 && json.data?.list) {
        setPages((prev) => ({ ...prev, [page]: json.data.list }))
      }
    } catch (e) {
      console.error('加载分页失败', e)
    } finally {
      setLoadingPage(null)
    }
  }

  const visiblePages: number[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i <= 3 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      visiblePages.push(i)
    }
  }
  // deduplicate and sort
  const deduped = Array.from(new Set(visiblePages)).sort((a, b) => a - b)
  const pagesWithGaps: (number | '...')[] = []
  for (let i = 0; i < deduped.length; i++) {
    if (i > 0 && deduped[i] - deduped[i - 1] > 1) {
      pagesWithGaps.push('...')
    }
    pagesWithGaps.push(deduped[i])
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-center gap-2">
        {pagesWithGaps.map((p, i) =>
          p === '...' ? (
            <span key={`gap-${i}`} className="px-3 py-2 text-sm text-ink-400">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => p !== currentPage && handleLoadPage(p)}
              disabled={p === currentPage || loadingPage !== null}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                p === currentPage
                  ? 'bg-brand-cyan text-white'
                  : 'bg-surface-100 text-ink-600 hover:bg-surface-200'
              } disabled:cursor-not-allowed`}
            >
              {loadingPage === p ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                p
              )}
            </button>
          ),
        )}
      </div>

      {/* Render loaded page content */}
      {Object.entries(pages).map(([pageStr, posts]) => {
        const page = Number(pageStr)
        if (page === currentPage) return null
        return <LazyPage key={page} page={page} posts={posts} />
      })}
    </div>
  )
}

function LazyPage({ page, posts }: { page: number; posts: BlogPost[] }) {
  return (
    <div className="mt-8">
      <h3 className="mb-4 text-lg font-semibold text-ink-700">第 {page} 页</h3>
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
                  <span className="rounded-full bg-surface-100 px-3 py-1 text-xs font-medium text-ink-600">{primaryTag}</span>
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
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
