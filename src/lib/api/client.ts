/**
 * API 基础客户端
 *
 * - 自动附加 Authorization: Bearer <access_token>
 * - 401 响应自动尝试 refresh token，成功后重试原请求
 * - refresh 也失败则清除认证状态，跳转登录页
 * - 统一错误码处理
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8082'

/** 后端统一响应结构 */
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

/** 分页响应 */
export interface PageData<T> {
  list: T[]
  total: number
  page: number
  page_size: number
}

/** 认证错误码 */
const AUTH_ERROR_CODES = [40100, 40101, 40102, 40103]

/** refresh 锁，防止并发 refresh */
let refreshPromise: Promise<string | null> | null = null

/** 获取当前 access token（由 AuthContext 设置） */
let _getAccessToken: () => string | null = () => null
let _getRefreshToken: () => string | null = () => null
let _setTokens: (access: string | null, refresh: string | null) => void = () => {}
let _clearAuth: () => void = () => {}

export function registerAuthHandlers(handlers: {
  getAccessToken: () => string | null
  getRefreshToken: () => string | null
  setTokens: (access: string | null, refresh: string | null) => void
  clearAuth: () => void
}) {
  _getAccessToken = handlers.getAccessToken
  _getRefreshToken = handlers.getRefreshToken
  _setTokens = handlers.setTokens
  _clearAuth = handlers.clearAuth
}

/** 尝试刷新 access token */
async function tryRefreshToken(): Promise<string | null> {
  // 防止并发 refresh
  if (refreshPromise) return refreshPromise

  const refreshToken = _getRefreshToken()
  if (!refreshToken) return null

  refreshPromise = (async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      if (!res.ok) return null

      const json: ApiResponse<{ access_token: string; refresh_token: string }> = await res.json()
      if (json.code !== 0 || !json.data) return null

      _setTokens(json.data.access_token, json.data.refresh_token)
      return json.data.access_token
    } catch {
      return null
    } finally {
      refreshPromise = null
    }
  })()

  return refreshPromise
}

/** 通用请求函数 */
async function request<T>(
  path: string,
  options: RequestInit = {},
  retry = true,
): Promise<ApiResponse<T>> {
  const accessToken = _getAccessToken()

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  const json: ApiResponse<T> = await res.json()

  // 认证失败：尝试 refresh
  if (retry && AUTH_ERROR_CODES.includes(json.code)) {
    const newToken = await tryRefreshToken()
    if (newToken) {
      // 用新 token 重试
      return request<T>(path, { ...options }, false)
    }
    // refresh 也失败 → 清除认证状态
    _clearAuth()
    if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/auth')) {
      window.location.href = `/auth?redirect=${encodeURIComponent(window.location.pathname)}`
    }
  }

  return json
}

/** GET 请求 */
export async function get<T>(path: string): Promise<ApiResponse<T>> {
  return request<T>(path, { method: 'GET' })
}

/** POST 请求 */
export async function post<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
  return request<T>(path, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  })
}

/** PUT 请求 */
export async function put<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
  return request<T>(path, {
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  })
}

/** DELETE 请求 */
export async function del<T>(path: string): Promise<ApiResponse<T>> {
  return request<T>(path, { method: 'DELETE' })
}

export { API_BASE_URL }
