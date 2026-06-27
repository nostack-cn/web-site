import type { Announcement } from '@/lib/announcement'

interface Props {
  announcements: Announcement[]
}

/**
 * 首页公告 Banner
 * - 多条公告逐条展示（按 priority 降序，后端已排好序）
 * - 纯 Server Component，无客户端 JS
 */
export default function AnnouncementBanner({ announcements }: Props) {
  if (!announcements.length) return null

  return (
    <div className="w-full border-b border-amber-200 bg-amber-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {announcements.map((a) => (
          <div
            key={a.id}
            className="flex items-start gap-3 py-3 sm:items-center"
          >
            {/* 图标 */}
            <span className="mt-0.5 flex-shrink-0 sm:mt-0">
              <svg
                className="h-4 w-4 text-amber-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>

            {/* 内容 */}
            <div className="min-w-0 flex-1">
              <span className="text-sm font-semibold text-amber-800">
                {a.title}
              </span>
              {a.content && (
                <span className="ml-2 text-sm text-amber-700">{a.content}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
