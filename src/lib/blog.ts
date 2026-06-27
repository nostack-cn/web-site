/**
 * 博客数据获取 — 从 svr-admin 内部 API 拉取
 * 构建时执行（SSG），数据注入静态页面
 */

const SVR_ADMIN_URL = process.env.SVR_ADMIN_URL || 'http://localhost:8080'
const INTERNAL_KEY = process.env.BLOG_INTERNAL_KEY || ''

export interface BlogTag {
  name: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  summary: string
  cover_image: string
  tags: string
  status: string
  author_id: number
  author_name: string
  published_at: string | null
  view_count: number
  created_at: string
  updated_at: string
}

export interface BlogListResult {
  list: BlogPost[]
  total: number
  page: number
  page_size: number
}

interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

async function fetchInternal<T>(path: string, params?: Record<string, string>): Promise<T | null> {
  if (!INTERNAL_KEY) {
    console.warn('[Blog] BLOG_INTERNAL_KEY 未配置，跳过远程获取')
    return null
  }

  const url = new URL(path, SVR_ADMIN_URL)
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  }

  try {
    const res = await fetch(url.toString(), {
      headers: { 'X-Internal-Key': INTERNAL_KEY },
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      console.warn(`[Blog] API 返回 ${res.status}: ${path}`)
      return null
    }
    const json: ApiResponse<T> = await res.json()
    if (json.code !== 0) {
      console.warn(`[Blog] API 错误: ${json.message}`)
      return null
    }
    return json.data
  } catch (e) {
    console.warn(`[Blog] 请求失败: ${path}`, e)
    return null
  }
}

/** 获取已发布博客分页列表 */
export async function getBlogList(
  page = 1,
  pageSize = 9,
): Promise<BlogListResult | null> {
  return fetchInternal<BlogListResult>('/internal/blogs', {
    status: 'published',
    page: String(page),
    page_size: String(pageSize),
  })
}

/** 获取单篇博客详情 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  return fetchInternal<BlogPost>(`/internal/blogs/slug/${slug}`)
}

/** 获取所有标签 */
export async function getAllTags(): Promise<string[] | null> {
  return fetchInternal<string[]>('/internal/blogs/tags')
}

/** 获取所有已发布博客 slug 列表（用于 generateStaticParams）。API 不可用时返回空数组。 */
export async function getAllPublishedSlugs(limit = 200): Promise<string[]> {
  const result = await fetchInternal<BlogListResult>('/internal/blogs', {
    status: 'published',
    page: '1',
    page_size: String(limit),
  })
  if (!result) return []
  return result.list.map((b) => b.slug)
}

/** 获取已发布博客总数（用于分页） */
export async function getPublishedCount(): Promise<number> {
  const result = await fetchInternal<BlogListResult>('/internal/blogs', {
    status: 'published',
    page: '1',
    page_size: '1',
  })
  return result?.total ?? 0
}
