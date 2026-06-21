'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  sendSmsCode as apiSendSmsCode,
  getWxLoginQr as apiGetWxLoginQr,
  type User,
  type WechatUser,
  type LoginRequest,
  type RegisterRequest,
  type SmsLoginRequest,
} from '@/lib/api/auth'
import { getProfile } from '@/lib/api/user'
import { registerAuthHandlers } from '@/lib/api/client'

// ====== Token 存储 ======

const TOKEN_KEYS = {
  accessToken: 'nostack_at',
  refreshToken: 'nostack_rt',
}

function storeTokens(access: string | null, refresh: string | null) {
  if (access) {
    sessionStorage.setItem(TOKEN_KEYS.accessToken, access)
  } else {
    sessionStorage.removeItem(TOKEN_KEYS.accessToken)
  }
  if (refresh) {
    localStorage.setItem(TOKEN_KEYS.refreshToken, refresh)
  } else {
    localStorage.removeItem(TOKEN_KEYS.refreshToken)
  }
}

function getStoredAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem(TOKEN_KEYS.accessToken)
}

function getStoredRefreshToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEYS.refreshToken)
}

// ====== 微信登录 postMessage 类型 ======

interface WxLoginSuccessMessage {
  type: 'wx_login_success'
  access_token: string
  refresh_token: string
  user: User
}

interface WxLoginErrorMessage {
  type: 'wx_login_error'
  error: string
}

type WxLoginMessage = WxLoginSuccessMessage | WxLoginErrorMessage

function isWxLoginMessage(data: unknown): data is WxLoginMessage {
  if (typeof data !== 'object' || data === null) return false
  const d = data as Record<string, unknown>
  return d.type === 'wx_login_success' || d.type === 'wx_login_error'
}

// ====== Context 类型 ======

export interface AuthContextType {
  /** 当前用户信息，null 表示未登录 */
  user: User | null
  /** 是否正在加载（初始化时检查 token） */
  loading: boolean
  /** 是否已登录 */
  authenticated: boolean

  /** 邮箱密码登录 */
  login: (req: LoginRequest) => Promise<void>
  /** 短信验证码登录 */
  smsLogin: (req: SmsLoginRequest) => Promise<void>
  /** 微信扫码登录（打开 popup） */
  wxLogin: () => Promise<void>
  /** 注册 */
  register: (req: RegisterRequest) => Promise<void>
  /** 登出 */
  logout: () => Promise<void>
  /** 发送短信验证码 */
  sendSmsCode: (phone: string) => Promise<void>
  /** 刷新用户信息 */
  refreshUser: () => Promise<void>
  /** 微信绑定信息 */
  wxUser: WechatUser | null
  /** 刷新微信绑定信息 */
  refreshWxInfo: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

// ====== Provider ======

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [wxUser, setWxUser] = useState<WechatUser | null>(null)
  const [loading, setLoading] = useState(true)

  // 注册 token 操作回调给 API client
  useEffect(() => {
    registerAuthHandlers({
      getAccessToken: getStoredAccessToken,
      getRefreshToken: getStoredRefreshToken,
      setTokens: storeTokens,
      clearAuth: () => {
        storeTokens(null, null)
        setUser(null)
        setWxUser(null)
      },
    })
  }, [])

  // 初始化：检查是否有 refresh token，有则恢复会话
  useEffect(() => {
    const init = async () => {
      const accessToken = getStoredAccessToken()
      const refreshToken = getStoredRefreshToken()

      if (accessToken) {
        const res = await getProfile()
        if (res.code === 0 && res.data) {
          setUser(res.data)
          setLoading(false)
          return
        }
      }

      if (refreshToken && !accessToken) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8082'}/api/v1/auth/refresh`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          )
          if (res.ok) {
            const json = await res.json()
            if (json.code === 0 && json.data) {
              storeTokens(json.data.access_token, json.data.refresh_token)
              const profileRes = await getProfile()
              if (profileRes.code === 0 && profileRes.data) {
                setUser(profileRes.data)
              }
            }
          }
        } catch {
          storeTokens(null, null)
        }
      }

      setLoading(false)
    }

    init()
  }, [])

  // 登录后拉取微信绑定信息
  useEffect(() => {
    if (user) {
      refreshWxInfoFn()
    }
  }, [user?.id])

  const loginFn = useCallback(async (req: LoginRequest) => {
    const res = await apiLogin(req)
    if (res.code !== 0) {
      throw new Error(res.message || '登录失败')
    }
    storeTokens(res.data.access_token, res.data.refresh_token)
    setUser(res.data.user)
  }, [])

  const loginBySms = useCallback(async (req: SmsLoginRequest) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8082'
    const res = await fetch(`${baseUrl}/api/v1/users/sms-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    }).then((r) => r.json())
    if (res.code !== 0) {
      throw new Error(res.message || '登录失败')
    }
    storeTokens(res.data.access_token, res.data.refresh_token)
    setUser(res.data.user)
  }, [])

  // 微信扫码登录：获取参数 → 打开 popup → 监听 postMessage
  const wxLoginFn = useCallback(async () => {
    // 1. 获取微信扫码登录参数
    const qrRes = await apiGetWxLoginQr()
    if (qrRes.code !== 0 || !qrRes.data) {
      throw new Error(qrRes.message || '获取微信登录参数失败')
    }

    const { app_id, redirect_uri, scope, state } = qrRes.data

    // 2. 构造微信 OAuth2 URL
    const wxAuthUrl =
      `https://open.weixin.qq.com/connect/qrconnect` +
      `?appid=${encodeURIComponent(app_id)}` +
      `&redirect_uri=${encodeURIComponent(redirect_uri)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent(scope)}` +
      `&state=${encodeURIComponent(state)}` +
      `#wechat_redirect`

    // 3. 打开 popup 窗口
    const width = 600
    const height = 700
    const left = (window.screen.width - width) / 2
    const top = (window.screen.height - height) / 2
    const popup = window.open(
      wxAuthUrl,
      'wx_login',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,resizable=yes`,
    )

    if (!popup) {
      throw new Error('弹窗被浏览器拦截，请允许弹窗后重试')
    }

    // 4. 监听 postMessage 回调
    return new Promise<void>((resolve, reject) => {
      const handleMessage = (event: MessageEvent) => {
        // 安全检查：仅接受来自微信/Our domain 的消息
        if (!isWxLoginMessage(event.data)) return

        const msg = event.data as WxLoginMessage

        if (msg.type === 'wx_login_success') {
          window.removeEventListener('message', handleMessage)
          storeTokens(msg.access_token, msg.refresh_token)
          setUser(msg.user)
          resolve()
        } else if (msg.type === 'wx_login_error') {
          window.removeEventListener('message', handleMessage)
          reject(new Error(msg.error || '微信登录失败'))
        }
      }

      window.addEventListener('message', handleMessage)

      // 超时清理（5 分钟）
      setTimeout(() => {
        window.removeEventListener('message', handleMessage)
        reject(new Error('微信登录超时'))
      }, 5 * 60 * 1000)

      // popup 关闭检测
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed)
          window.removeEventListener('message', handleMessage)
          // 如果还没 resolve/reject，说明用户关闭了弹窗
          reject(new Error('微信登录已取消'))
        }
      }, 500)
    })
  }, [])

  const registerFn = useCallback(async (req: RegisterRequest) => {
    const res = await apiRegister(req)
    if (res.code !== 0) {
      throw new Error(res.message || '注册失败')
    }
    await loginFn({ email: req.email, password: req.password })
  }, [loginFn])

  const logoutFn = useCallback(async () => {
    try {
      await apiLogout()
    } catch {
      // 即使 API 调用失败也清除本地状态
    }
    storeTokens(null, null)
    setUser(null)
    setWxUser(null)
  }, [])

  const sendSmsCodeFn = useCallback(async (phone: string) => {
    const res = await apiSendSmsCode(phone)
    if (res.code !== 0) {
      throw new Error(res.message || '发送验证码失败')
    }
  }, [])

  const refreshUserFn = useCallback(async () => {
    const res = await getProfile()
    if (res.code === 0 && res.data) {
      setUser(res.data)
    }
  }, [])

  // 刷新微信绑定信息
  const refreshWxInfoFn = useCallback(async () => {
    try {
      const { getWxInfo } = await import('@/lib/api/auth')
      const res = await getWxInfo()
      if (res.code === 0) {
        setWxUser(res.data || null)
      }
    } catch {
      // 未登录或接口不可用
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authenticated: !!user,
        login: loginFn,
        smsLogin: loginBySms,
        wxLogin: wxLoginFn,
        register: registerFn,
        logout: logoutFn,
        sendSmsCode: sendSmsCodeFn,
        refreshUser: refreshUserFn,
        wxUser,
        refreshWxInfo: refreshWxInfoFn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ====== Hook ======

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
