/**
 * 用户相关 API
 */

import { get, put, type ApiResponse } from './client'
import type { User } from './auth'

// ====== 类型定义 ======

export interface UpdateProfileRequest {
  nickname?: string
  avatar?: string
  phone?: string
}

export interface ChangePasswordRequest {
  old_password: string
  new_password: string
}

// ====== API 函数 ======

/** 获取当前用户信息 */
export async function getProfile(): Promise<ApiResponse<User>> {
  return get<User>('/api/v1/users/me')
}

/** 更新用户资料 */
export async function updateProfile(req: UpdateProfileRequest): Promise<ApiResponse<User>> {
  return put<User>('/api/v1/users/me', req)
}

/** 修改密码 */
export async function changePassword(req: ChangePasswordRequest): Promise<ApiResponse<null>> {
  return put<null>('/api/v1/users/password', req)
}
