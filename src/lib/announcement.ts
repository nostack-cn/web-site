/**
 * 公告数据获取 — 从 svr-admin 内部 API 拉取 site 类型公告
 */

const SVR_ADMIN_URL = process.env.SVR_ADMIN_URL || 'http://localhost:8080'
const ANNOUNCEMENT_INTERNAL_KEY = process.env.ANNOUNCEMENT_INTERNAL_KEY || ''

export interface Announcement {
  id: number
  type: 'site' | 'console'
  title: string
  content: string
  status: string
  priority: number
  starts_at: string | null
  ends_at: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}

interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

/** 获取 web-site 首页有效公告列表（SSR/ISR，1 分钟重验） */
export async function getSiteAnnouncements(): Promise<Announcement[]> {
  if (!ANNOUNCEMENT_INTERNAL_KEY) {
    return []
  }

  const url = `${SVR_ADMIN_URL}/internal/announcements/site`

  try {
    const res = await fetch(url, {
      headers: { 'X-Internal-Key': ANNOUNCEMENT_INTERNAL_KEY },
      next: { revalidate: 60 },
    })
    if (!res.ok) {
      console.warn(`[Announcement] API 返回 ${res.status}`)
      return []
    }
    const json: ApiResponse<Announcement[]> = await res.json()
    if (json.code !== 0) {
      console.warn(`[Announcement] API 错误: ${json.message}`)
      return []
    }
    return json.data ?? []
  } catch (e) {
    console.warn('[Announcement] 请求失败', e)
    return []
  }
}
