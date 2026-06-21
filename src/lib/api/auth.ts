/**
 * 认证相关 API
 */

import { get, post, type ApiResponse } from './client'

// ====== 类型定义 ======

export interface LoginRequest {
  email: string
  password: string
}

export interface SmsLoginRequest {
  phone: string
  code: string
}

export interface RegisterRequest {
  email: string
  password: string
  phone?: string
  nickname?: string
}

export interface User {
  id: number
  email: string
  phone: string
  nickname: string
  avatar: string
  role: string
  status: string
  last_login_at: string | null
  created_at: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  user: User
}

export interface RefreshResponse {
  access_token: string
  refresh_token: string
}

// ====== 微信登录类型 ======

export interface WxLoginQrResponse {
  app_id: string
  redirect_uri: string
  scope: string
  state: string
}

export interface WechatUser {
  id: number
  user_id: number
  open_id: string
  union_id: string
  nickname: string
  avatar: string
  sex: number
  created_at: string
}

export interface WxLoginResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  user: User
  wx_user: WechatUser
  is_new: boolean
}

export interface WxBindRequest {
  code: string
}

// ====== API 函数 ======

/** 邮箱密码登录 */
export async function login(req: LoginRequest): Promise<ApiResponse<LoginResponse>> {
  return post<LoginResponse>('/api/v1/users/login', req)
}

/** 短信验证码登录 */
export async function smsLogin(req: SmsLoginRequest): Promise<ApiResponse<LoginResponse>> {
  return post<LoginResponse>('/api/v1/users/sms-login', req)
}

/** 用户注册 */
export async function register(req: RegisterRequest): Promise<ApiResponse<User>> {
  return post<User>('/api/v1/users/register', req)
}

/** 刷新 Token */
export async function refreshToken(refreshToken: string): Promise<ApiResponse<RefreshResponse>> {
  return post<RefreshResponse>('/api/v1/auth/refresh', undefined)
}

// 注意: refreshToken 需要在 headers 中传递，这里用特殊方式
// 实际 refresh 调用由 client.ts 内部处理
export { refreshToken as _refreshToken }

/** 登出 */
export async function logout(): Promise<ApiResponse<null>> {
  return post<null>('/api/v1/auth/logout')
}

/** 发送短信验证码 */
export async function sendSmsCode(phone: string): Promise<ApiResponse<null>> {
  return post<null>('/api/v1/sms/send', { phone })
}

// ====== 微信登录 API ======

/** 获取微信扫码登录参数 */
export async function getWxLoginQr(): Promise<ApiResponse<WxLoginQrResponse>> {
  return get<WxLoginQrResponse>('/api/v1/wx/login/qr')
}

/** 绑定微信（需登录） */
export async function bindWechat(code: string): Promise<ApiResponse<WechatUser>> {
  return post<WechatUser>('/api/v1/wx/bind', { code })
}

/** 解绑微信（需登录） */
export async function unbindWechat(): Promise<ApiResponse<null>> {
  return post<null>('/api/v1/wx/unbind')
}

/** 获取微信绑定信息（需登录） */
export async function getWxInfo(): Promise<ApiResponse<WechatUser | null>> {
  return get<WechatUser | null>('/api/v1/wx/info')
}
