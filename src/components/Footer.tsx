import Link from 'next/link'
import { footerColumns, filingInfo } from '@/lib/data'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-white border-t border-surface-200">
      {/* 主体链接区 */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand + QR Code */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan to-brand-indigo">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10" />
                </svg>
              </div>
              <span className="text-lg font-bold text-ink-900">无栈云引</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
              一站式云计算服务平台，让每个企业都能轻松上云。
            </p>

            {/* 联系方式二维码占位 */}
            <div className="mt-6">
              <div className="inline-flex flex-col items-center gap-2 rounded-xl border border-surface-200 bg-surface-50 p-3">
                {/* QR Code placeholder */}
                <div className="flex h-28 w-28 items-center justify-center rounded-lg border-2 border-dashed border-surface-300 bg-white">
                  <div className="text-center">
                    <svg className="mx-auto h-8 w-8 text-ink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 3h.01M12 12h4.5M4 4h4v4H4V4zm6 0h4v4h-4V4zM4 14h4v4H4v-4z" />
                    </svg>
                    <span className="mt-1 block text-[10px] text-ink-300">二维码占位</span>
                  </div>
                </div>
                <span className="text-xs font-medium text-ink-500">扫码联系客服</span>
              </div>
            </div>
          </div>

          {/* 链接列 */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-ink-900">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-500 transition-colors hover:text-brand-cyan"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 备案号悬挂区 */}
      <div className="border-t border-surface-200">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm text-ink-500">
              © {year} {filingInfo.company} · 保留所有权利
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <Link
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-ink-500 transition-colors hover:text-brand-cyan"
              >
                {filingInfo.icp}
              </Link>
              <span className="text-surface-300">|</span>
              <Link
                href="https://www.beian.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-ink-500 transition-colors hover:text-brand-cyan"
              >
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {filingInfo.publicSecurity}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
