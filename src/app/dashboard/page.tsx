'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { AuthGuard } from '@/components/AuthGuard'

export default function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <AuthGuard>
      <div className="min-h-screen bg-surface-50">
        {/* Header */}
        <header className="border-b border-surface-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <a href="/dashboard" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan to-brand-indigo">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <span className="text-lg font-bold text-ink-900">无栈云引</span>
              </a>
              <nav className="flex items-center gap-4">
                <a
                  href="/dashboard"
                  className="text-sm font-medium text-brand-cyan"
                >
                  控制台
                </a>
                <a
                  href="/profile"
                  className="text-sm font-medium text-ink-500 hover:text-brand-cyan"
                >
                  个人中心
                </a>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-ink-500 hover:text-red-600"
                >
                  退出登录
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-ink-900">
              你好，{user?.nickname || user?.email || '用户'} 👋
            </h1>
            <p className="mt-1 text-sm text-ink-500">欢迎来到云哨控制台</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-cyan/10">
                  <svg
                    className="h-5 w-5 text-brand-cyan"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-ink-900">0</p>
                  <p className="text-sm text-ink-500">监控域名</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <svg
                    className="h-5 w-5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-ink-900">0</p>
                  <p className="text-sm text-ink-500">SSL 证书</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                  <svg
                    className="h-5 w-5 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-ink-900">0</p>
                  <p className="text-sm text-ink-500">活跃告警</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-indigo/10">
                  <svg
                    className="h-5 w-5 text-brand-indigo"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-ink-900">正常</p>
                  <p className="text-sm text-ink-500">服务状态</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-ink-900">快速开始</h3>
              <p className="mt-2 text-sm text-ink-500">添加你的第一个域名，开启 SSL 监控</p>
              <button className="mt-4 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-indigo px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90">
                添加域名
              </button>
            </div>

            <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-ink-900">升级套餐</h3>
              <p className="mt-2 text-sm text-ink-500">解锁更多监控域名和高级告警功能</p>
              <Link
                href="/products/cloud-sentinel#pricing"
                className="mt-4 inline-block rounded-lg border border-brand-cyan px-4 py-2 text-sm font-semibold text-brand-cyan hover:bg-brand-cyan/5"
              >
                查看方案
              </Link>
            </div>

            <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-ink-900">API 文档</h3>
              <p className="mt-2 text-sm text-ink-500">通过 API 集成监控能力到你的系统</p>
              <Link
                href="/docs/api-reference"
                className="mt-4 inline-block rounded-lg border border-surface-300 px-4 py-2 text-sm font-medium text-ink-700 hover:bg-surface-50"
              >
                查看文档
              </Link>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
