import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-cyan/10 via-brand-indigo/5 to-transparent blur-3xl" />
        <div className="absolute right-0 top-40 h-64 w-64 rounded-full bg-brand-purple/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 px-4 py-1.5">
            <span className="flex h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
            <span className="text-sm font-medium text-brand-cyan-dark">
              全新 2.0 版本上线 — 多可用区容灾架构
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl sm:text-6xl">
            让云计算
            <span className="text-gradient">简单可控</span>
            <br />
            助力企业高效上云
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
            无栈云引提供云服务器、云数据库、CDN 加速、对象存储等一站式云计算服务。
            弹性伸缩，按需付费，从开发到生产，全链路覆盖。
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-xl bg-brand-cyan px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-cyan/20 transition-all hover:bg-brand-cyan-dark hover:shadow-xl hover:shadow-brand-cyan/30"
            >
              免费试用 30 天
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-xl border border-surface-300 bg-white px-8 py-3.5 text-base font-semibold text-ink-700 transition-all hover:border-brand-cyan hover:text-brand-cyan"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
              </svg>
              查看文档
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-500">
            <div className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-brand-cyan" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              无需信用卡
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-brand-cyan" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              随时取消
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-brand-cyan" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              99.99% SLA 保障
            </div>
          </div>
        </div>

        {/* Hero Visual — 架构示意图 */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="glass-card rounded-2xl p-2 shadow-2xl">
            <div className="rounded-xl bg-surface-50 p-8">
              {/* 模拟仪表盘 */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: '运行实例', value: '128', color: 'text-brand-cyan' },
                  { label: '本月流量', value: '2.4TB', color: 'text-brand-indigo' },
                  { label: '平均延迟', value: '12ms', color: 'text-brand-purple' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-surface-200 bg-white p-4">
                    <div className="text-xs text-ink-500">{stat.label}</div>
                    <div className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  </div>
                ))}
              </div>
              {/* 模拟图表 */}
              <div className="mt-4 flex h-32 items-end gap-1">
                {[40, 55, 45, 70, 60, 85, 75, 90, 80, 95, 88, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-brand-cyan/40 to-brand-cyan"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
