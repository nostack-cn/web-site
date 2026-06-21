'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { updateProfile, changePassword } from '@/lib/api/user'
import { bindWechat, unbindWechat, getWxLoginQr } from '@/lib/api/auth'
import { AuthGuard } from '@/components/AuthGuard'

function ProfileContent() {
  const { user, refreshUser, wxUser, refreshWxInfo } = useAuth()
  const [editMode, setEditMode] = useState(false)
  const [pwMode, setPwMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [wxLoading, setWxLoading] = useState(false)

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const form = new FormData(e.currentTarget)
      await updateProfile({
        nickname: form.get('nickname') as string,
        phone: form.get('phone') as string || undefined,
      })
      await refreshUser()
      setEditMode(false)
      setSuccess('资料更新成功')
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新失败')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const form = new FormData(e.currentTarget)
    const newPassword = form.get('new_password') as string
    const confirmPassword = form.get('confirm_password') as string

    if (newPassword !== confirmPassword) {
      setError('两次输入的新密码不一致')
      return
    }
    if (newPassword.length < 6) {
      setError('密码至少 6 位')
      return
    }

    setLoading(true)
    try {
      const res = await changePassword({
        old_password: form.get('old_password') as string,
        new_password: newPassword,
      })
      if (res.code !== 0) {
        setError(res.message || '修改密码失败')
        return
      }
      setPwMode(false)
      setSuccess('密码修改成功，请重新登录')
      // 密码修改后后端会将 token 加入黑名单，需要重新登录
      setTimeout(() => {
        window.location.href = '/auth?mode=login'
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : '修改密码失败')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Success / Error Alert */}
      {success && (
        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* 基本资料 */}
      <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink-900">基本资料</h2>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="text-sm font-medium text-brand-cyan hover:text-brand-cyan-dark"
            >
              编辑
            </button>
          )}
        </div>

        {editMode ? (
          <form onSubmit={handleUpdateProfile} className="mt-4 space-y-4">
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-ink-700">
                昵称
              </label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                defaultValue={user.nickname}
                className="mt-1.5 w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-ink-900 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-700">邮箱</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="mt-1.5 w-full rounded-lg border border-surface-200 bg-surface-50 px-4 py-2.5 text-sm text-ink-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-ink-700">
                手机号
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={user.phone}
                placeholder="未绑定"
                className="mt-1.5 w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-ink-900 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-gradient-to-r from-brand-cyan to-brand-indigo px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 disabled:opacity-50"
              >
                {loading ? '保存中...' : '保存'}
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="rounded-lg border border-surface-300 px-5 py-2 text-sm font-medium text-ink-700 hover:bg-surface-50"
              >
                取消
              </button>
            </div>
          </form>
        ) : (
          <dl className="mt-4 space-y-3">
            <div className="flex items-center justify-between py-2">
              <dt className="text-sm text-ink-500">昵称</dt>
              <dd className="text-sm font-medium text-ink-900">{user.nickname || '未设置'}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-surface-100 py-2">
              <dt className="text-sm text-ink-500">邮箱</dt>
              <dd className="text-sm font-medium text-ink-900">{user.email}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-surface-100 py-2">
              <dt className="text-sm text-ink-500">手机号</dt>
              <dd className="text-sm font-medium text-ink-900">{user.phone || '未绑定'}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-surface-100 py-2">
              <dt className="text-sm text-ink-500">角色</dt>
              <dd className="text-sm font-medium text-ink-900">
                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                  user.role === 'admin'
                    ? 'bg-brand-indigo/10 text-brand-indigo'
                    : 'bg-brand-cyan/10 text-brand-cyan'
                }`}>
                  {user.role === 'admin' ? '管理员' : '用户'}
                </span>
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-surface-100 py-2">
              <dt className="text-sm text-ink-500">注册时间</dt>
              <dd className="text-sm text-ink-700">
                {user.created_at ? new Date(user.created_at).toLocaleDateString('zh-CN') : '-'}
              </dd>
            </div>
          </dl>
        )}
      </div>

      {/* 安全设置 */}
      <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink-900">安全设置</h2>
          {!pwMode && (
            <button
              onClick={() => setPwMode(true)}
              className="text-sm font-medium text-brand-cyan hover:text-brand-cyan-dark"
            >
              修改密码
            </button>
          )}
        </div>

        {pwMode ? (
          <form onSubmit={handleChangePassword} className="mt-4 space-y-4">
            <div>
              <label htmlFor="old_password" className="block text-sm font-medium text-ink-700">
                当前密码
              </label>
              <input
                id="old_password"
                name="old_password"
                type="password"
                required
                className="mt-1.5 w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-ink-900 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20"
              />
            </div>
            <div>
              <label htmlFor="new_password" className="block text-sm font-medium text-ink-700">
                新密码
              </label>
              <input
                id="new_password"
                name="new_password"
                type="password"
                required
                minLength={6}
                placeholder="至少 6 位"
                className="mt-1.5 w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-ink-900 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20"
              />
            </div>
            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-ink-700">
                确认新密码
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                required
                minLength={6}
                className="mt-1.5 w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-ink-900 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-gradient-to-r from-brand-cyan to-brand-indigo px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 disabled:opacity-50"
              >
                {loading ? '修改中...' : '确认修改'}
              </button>
              <button
                type="button"
                onClick={() => setPwMode(false)}
                className="rounded-lg border border-surface-300 px-5 py-2 text-sm font-medium text-ink-700 hover:bg-surface-50"
              >
                取消
              </button>
            </div>
          </form>
        ) : (
          <dl className="mt-4 space-y-3">
            <div className="flex items-center justify-between py-2">
              <dt className="text-sm text-ink-500">登录密码</dt>
              <dd className="text-sm text-ink-700">已设置</dd>
            </div>
            <div className="flex items-center justify-between border-t border-surface-100 py-2">
              <dt className="text-sm text-ink-500">最近登录</dt>
              <dd className="text-sm text-ink-700">
                {user.last_login_at
                  ? new Date(user.last_login_at).toLocaleString('zh-CN')
                  : '-'}
              </dd>
            </div>
          </dl>
        )}
      </div>

      {/* 微信绑定 */}
      <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink-900">第三方账号</h2>
        <dl className="mt-4 space-y-3">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#07C160]/10">
                <svg className="h-5 w-5 text-[#07C160]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.962 1.625-6.852C11.458 7.8 13.67 6.857 15.997 6.857c.157 0 .314.004.47.019C15.118 4.094 12.182 2.188 8.691 2.188zm-2.87 4.178a.867.867 0 1 1 0 1.734.867.867 0 0 1 0-1.734zm5.743 0a.867.867 0 1 1 0 1.734.867.867 0 0 1 0-1.734z" />
                </svg>
              </div>
              <div>
                <dt className="text-sm font-medium text-ink-900">微信</dt>
                {wxUser ? (
                  <dd className="text-xs text-ink-500">已绑定 {wxUser.nickname || '微信用户'}</dd>
                ) : (
                  <dd className="text-xs text-ink-400">未绑定</dd>
                )}
              </div>
            </div>
            <div>
              {wxUser ? (
                <button
                  onClick={async () => {
                    if (!confirm('确定要解绑微信吗？解绑后将无法使用微信登录。')) return
                    setWxLoading(true)
                    setError('')
                    try {
                      const res = await unbindWechat()
                      if (res.code !== 0) {
                        setError(res.message || '解绑失败')
                        return
                      }
                      await refreshWxInfo()
                      setSuccess('微信已解绑')
                    } catch (err) {
                      setError(err instanceof Error ? err.message : '解绑失败')
                    } finally {
                      setWxLoading(false)
                    }
                  }}
                  disabled={wxLoading}
                  className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                >
                  解绑
                </button>
              ) : (
                <button
                  onClick={async () => {
                    setWxLoading(true)
                    setError('')
                    try {
                      const qrRes = await getWxLoginQr()
                      if (qrRes.code !== 0 || !qrRes.data) {
                        setError(qrRes.message || '获取微信登录参数失败')
                        return
                      }

                      const { app_id, redirect_uri, scope, state } = qrRes.data
                      const wxAuthUrl =
                        `https://open.weixin.qq.com/connect/qrconnect` +
                        `?appid=${encodeURIComponent(app_id)}` +
                        `&redirect_uri=${encodeURIComponent(redirect_uri)}` +
                        `&response_type=code` +
                        `&scope=${encodeURIComponent(scope)}` +
                        `&state=${encodeURIComponent(state)}` +
                        `#wechat_redirect`

                      const w = 600
                      const h = 700
                      const popup = window.open(
                        wxAuthUrl,
                        'wx_bind',
                        `width=${w},height=${h},left=${(window.screen.width - w) / 2},top=${(window.screen.height - h) / 2},toolbar=no,menubar=no,resizable=yes`,
                      )

                      if (!popup) {
                        setError('弹窗被浏览器拦截，请允许弹窗后重试')
                        return
                      }

                      const handleMessage = async (event: MessageEvent) => {
                        if (!event.data || typeof event.data !== 'object') return
                        const data = event.data as Record<string, unknown>
                        if (data.type === 'wx_login_success') {
                          window.removeEventListener('message', handleMessage)
                          setSuccess('微信绑定成功')
                          await refreshWxInfo()
                          setWxLoading(false)
                        } else if (data.type === 'wx_login_error') {
                          window.removeEventListener('message', handleMessage)
                          setError((data.error as string) || '微信绑定失败')
                          setWxLoading(false)
                        }
                      }
                      window.addEventListener('message', handleMessage)
                    } catch (err) {
                      setError(err instanceof Error ? err.message : '绑定失败')
                    } finally {
                      setWxLoading(false)
                    }
                  }}
                  disabled={wxLoading}
                  className="text-sm font-medium text-brand-cyan hover:text-brand-cyan-dark disabled:opacity-50"
                >
                  {wxLoading ? '处理中...' : '绑定'}
                </button>
              )}
            </div>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default function ProfilePage() {
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
                  className="text-sm font-medium text-ink-500 hover:text-brand-cyan"
                >
                  控制台
                </a>
                <a
                  href="/profile"
                  className="text-sm font-medium text-brand-cyan"
                >
                  个人中心
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-6 text-2xl font-bold text-ink-900">个人中心</h1>
          <ProfileContent />
        </main>
      </div>
    </AuthGuard>
  )
}
