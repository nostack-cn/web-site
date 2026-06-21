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
  type User,
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
  /** 注册 */
  register: (req: RegisterRequest) => Promise<void>
  /** 登出 */
  logout: () => Promise<void>
  /** 发送短信验证码 */
  sendSmsCode: (phone: string) => Promise<void>
  /** 刷新用户信息 */
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

// ====== Provider ======

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
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
      },
    })
  }, [])

  // 初始化：检查是否有 refresh token，有则恢复会话
  useEffect(() => {
    const init = async () => {
      const accessToken = getStoredAccessToken()
      const refreshToken = getStoredRefreshToken()

      if (accessToken) {
        // 有 access token，尝试获取用户信息
        const res = await getProfile()
        if (res.code === 0 && res.data) {
          setUser(res.data)
          setLoading(false)
          return
        }
      }

      if (refreshToken && !accessToken) {
        // access token 过期但有 refresh token
        // client.ts 的 refresh 逻辑会自动处理
        // 这里手动触发一次 refresh
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
              // 获取用户信息
              const profileRes = await getProfile()
              if (profileRes.code === 0 && profileRes.data) {
                setUser(profileRes.data)
              }
            }
          }
        } catch {
          // refresh 失败，清除 token
          storeTokens(null, null)
        }
      }

      setLoading(false)
    }

    init()
  }, [])

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

  const registerFn = useCallback(async (req: RegisterRequest) => {
    const res = await apiRegister(req)
    if (res.code !== 0) {
      throw new Error(res.message || '注册失败')
    }
    // 注册成功后自动登录
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

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authenticated: !!user,
        login: loginFn,
        smsLogin: loginBySms,
        register: registerFn,
        logout: logoutFn,
        sendSmsCode: sendSmsCodeFn,
        refreshUser: refreshUserFn,
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
