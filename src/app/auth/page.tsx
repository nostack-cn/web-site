'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

type AuthMode = 'login' | 'register' | 'sms'

function AuthForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { login, register, smsLogin, sendSmsCode, wxLogin } = useAuth()

  const initialMode = (searchParams.get('mode') as AuthMode) || 'register'
  const plan = searchParams.get('plan') || ''
  const redirect = searchParams.get('redirect') || '/dashboard'

  const [mode, setMode] = useState<AuthMode>(
    initialMode === 'login' ? 'login' : initialMode === 'sms' ? 'sms' : 'register',
  )
  const [agree, setAgree] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 短信验证码
  const [smsCountdown, setSmsCountdown] = useState(0)

  const planLabel: Record<string, string> = {
    free: '免费版',
    pro: '专业版 ¥49/月',
  }

  // 发送短信验证码
  const handleSendSms = async (phone: string) => {
    if (smsCountdown > 0 || !phone) return
    try {
      setError('')
      await sendSmsCode(phone)
      setSmsCountdown(60)
      const timer = setInterval(() => {
        setSmsCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : '发送验证码失败')
    }
  }

  // 表单提交
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const form = new FormData(e.currentTarget)

      if (mode === 'login') {
        await login({
          email: form.get('email') as string,
          password: form.get('password') as string,
        })
      } else if (mode === 'sms') {
        await smsLogin({
          phone: form.get('phone') as string,
          code: form.get('code') as string,
        })
      } else {
        const password = form.get('password') as string
        const confirmPassword = form.get('confirmPassword') as string
        if (password !== confirmPassword) {
          setError('两次输入的密码不一致')
          setLoading(false)
          return
        }
        if (password.length < 6) {
          setError('密码至少 6 位')
          setLoading(false)
          return
        }
        await register({
          email: form.get('email') as string,
          password,
          nickname: (form.get('nickname') as string) || undefined,
        })
      }

      // 登录/注册成功，跳转
      router.push(redirect)
    } catch (err) {
      setError(err instanceof Error ? err.message : '操作失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-brand-cyan/5 flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-surface-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2" aria-label="无栈云引首页">
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
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-ink-500 transition-colors hover:text-brand-cyan"
            >
              返回首页
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl border border-surface-200 bg-white p-8 shadow-xl shadow-brand-cyan/5">
            {/* Plan Badge */}
            {mode === 'register' && plan && planLabel[plan] && (
              <div className="mb-6 flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-cyan/10 px-3 py-1 text-xs font-medium text-brand-cyan">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  注册即开通 {planLabel[plan]}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-center text-2xl font-bold text-ink-900">
              {mode === 'login' ? '欢迎回来' : mode === 'sms' ? '短信登录' : '创建账号'}
            </h1>
            <p className="mt-2 text-center text-sm text-ink-500">
              {mode === 'login'
                ? '登录你的无栈云引账号'
                : mode === 'sms'
                  ? '使用手机号验证码快速登录'
                  : '免费试用云哨域名 SSL 监控，无需信用卡'}
            </p>

            {/* Error Alert */}
            {error && (
              <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Tab Switch */}
            <div className="mt-6 flex rounded-xl bg-surface-100 p-1">
              <button
                type="button"
                onClick={() => { setMode('register'); setError('') }}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                  mode === 'register'
                    ? 'bg-white text-brand-cyan shadow-sm'
                    : 'text-ink-500 hover:text-ink-700'
                }`}
              >
                注册
              </button>
              <button
                type="button"
                onClick={() => { setMode('login'); setError('') }}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                  mode === 'login'
                    ? 'bg-white text-brand-cyan shadow-sm'
                    : 'text-ink-500 hover:text-ink-700'
                }`}
              >
                登录
              </button>
              <button
                type="button"
                onClick={() => { setMode('sms'); setError('') }}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                  mode === 'sms'
                    ? 'bg-white text-brand-cyan shadow-sm'
                    : 'text-ink-500 hover:text-ink-700'
                }`}
              >
                短信
              </button>
            </div>

            {/* Form */}
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {/* Nickname (Register only) */}
              {mode === 'register' && (
                <div>
                  <label htmlFor="nickname" className="block text-sm font-medium text-ink-700">
                    昵称（可选）
                  </label>
                  <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    placeholder="你的昵称"
                    className="mt-1.5 w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 transition-colors"
                  />
                </div>
              )}

              {/* Email (Login/Register) */}
              {mode !== 'sms' && (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink-700">
                    邮箱地址
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    className="mt-1.5 w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 transition-colors"
                  />
                </div>
              )}

              {/* Phone (SMS mode) */}
              {mode === 'sms' && (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-ink-700">
                    手机号
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="13800138000"
                    className="mt-1.5 w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 transition-colors"
                  />
                </div>
              )}

              {/* SMS Code (SMS mode) */}
              {mode === 'sms' && (
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-ink-700">
                    验证码
                  </label>
                  <div className="mt-1.5 flex gap-3">
                    <input
                      id="code"
                      name="code"
                      type="text"
                      required
                      maxLength={6}
                      placeholder="6 位验证码"
                      className="flex-1 rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const phone = (
                          document.getElementById('phone') as HTMLInputElement
                        )?.value
                        if (phone) handleSendSms(phone)
                      }}
                      disabled={smsCountdown > 0}
                      className="whitespace-nowrap rounded-lg border border-brand-cyan px-4 py-2.5 text-sm font-medium text-brand-cyan transition-colors hover:bg-brand-cyan/5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
                    >
                      {smsCountdown > 0 ? `${smsCountdown}s` : '获取验证码'}
                    </button>
                  </div>
                </div>
              )}

              {/* Password (Login/Register) */}
              {mode !== 'sms' && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-ink-700">
                    密码
                  </label>
                  <div className="relative mt-1.5">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                      required
                      placeholder={mode === 'login' ? '输入密码' : '设置密码（至少 6 位）'}
                      minLength={6}
                      className="w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 pr-11 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                      aria-label={showPassword ? '隐藏密码' : '显示密码'}
                    >
                      {showPassword ? (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.875 12.675A10.05 10.05 0 0112 13c-4.418 0-8-3.582-8-8V3m.293.293A10.05 10.05 0 0112 3c4.418 0 8 3.582 8 8 0 2.876-1.517 5.404-3.793 6.793M6.5 6.5L17.5 17.5M3 3l18 18"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Confirm Password (Register only) */}
              {mode === 'register' && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-ink-700"
                  >
                    确认密码
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    placeholder="再次输入密码"
                    minLength={6}
                    className="mt-1.5 w-full rounded-lg border border-surface-300 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 transition-colors"
                  />
                </div>
              )}

              {/* Remember / Forgot (Login only) */}
              {mode === 'login' && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-surface-300 text-brand-cyan focus:ring-brand-cyan/20"
                    />
                    <span className="text-sm text-ink-500">记住我</span>
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm font-medium text-brand-cyan hover:text-brand-cyan-dark"
                  >
                    忘记密码？
                  </Link>
                </div>
              )}

              {/* Agreement (Register only) */}
              {mode === 'register' && (
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    required
                    className="mt-0.5 h-4 w-4 rounded border-surface-300 text-brand-cyan focus:ring-brand-cyan/20"
                  />
                  <span className="text-sm text-ink-500">
                    我已阅读并同意
                    <Link
                      href="/terms"
                      className="font-medium text-brand-cyan hover:text-brand-cyan-dark"
                    >
                      {' '}
                      服务协议{' '}
                    </Link>
                    和
                    <Link
                      href="/privacy"
                      className="font-medium text-brand-cyan hover:text-brand-cyan-dark"
                    >
                      {' '}
                      隐私政策
                    </Link>
                  </span>
                </label>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || (mode === 'register' && !agree)}
                className="w-full rounded-lg bg-gradient-to-r from-brand-cyan to-brand-indigo px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    处理中...
                  </span>
                ) : mode === 'login' ? (
                  '登录'
                ) : mode === 'sms' ? (
                  '登录'
                ) : (
                  '注册并开始试用'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-surface-200" />
              <span className="text-xs font-medium text-ink-400">其他方式</span>
              <div className="h-px flex-1 bg-surface-200" />
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={async () => {
                  setError('')
                  setLoading(true)
                  try {
                    await wxLogin()
                    router.push(redirect)
                  } catch (err) {
                    setError(err instanceof Error ? err.message : '微信登录失败')
                  } finally {
                    setLoading(false)
                  }
                }}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#07C160]/30 bg-[#07C160]/5 px-4 py-2.5 text-sm font-medium text-[#07C160] transition-colors hover:border-[#07C160]/50 hover:bg-[#07C160]/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.962 1.625-6.852C11.458 7.8 13.67 6.857 15.997 6.857c.157 0 .314.004.47.019C15.118 4.094 12.182 2.188 8.691 2.188zm-2.87 4.178a.867.867 0 1 1 0 1.734.867.867 0 0 1 0-1.734zm5.743 0a.867.867 0 1 1 0 1.734.867.867 0 0 1 0-1.734z" />
                </svg>
                微信扫码登录
              </button>
            </div>
          </div>

          {/* Footer Hint */}
          <p className="mt-6 text-center text-sm text-ink-500">
            {mode === 'login' || mode === 'sms' ? (
              <>
                还没有账号？
                <button
                  type="button"
                  onClick={() => { setMode('register'); setError('') }}
                  className="ml-1 font-semibold text-brand-cyan hover:text-brand-cyan-dark"
                >
                  免费注册
                </button>
              </>
            ) : (
              <>
                已有账号？
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError('') }}
                  className="ml-1 font-semibold text-brand-cyan hover:text-brand-cyan-dark"
                >
                  立即登录
                </button>
              </>
            )}
          </p>

          {/* Trust Indicators */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-ink-400">
            <span className="flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              数据加密存储
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              7 天免费试用
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              随时取消
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-surface-50">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-cyan border-t-transparent" />
        </div>
      }
    >
      <AuthForm />
    </Suspense>
  )
}
