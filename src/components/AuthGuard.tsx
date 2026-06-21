'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

/**
 * 认证路由守卫
 *
 * 包裹需要登录的页面，未登录时跳转到 /auth
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { authenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !authenticated) {
      router.replace(`/auth?mode=login&redirect=${encodeURIComponent(window.location.pathname)}`)
    }
  }, [authenticated, loading, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-brand-cyan border-t-transparent" />
          <p className="mt-3 text-sm text-ink-500">加载中...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  return <>{children}</>
}
