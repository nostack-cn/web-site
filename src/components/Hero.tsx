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
              云哨 2.0 正式发布 — 全新监控引擎与告警体系
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl sm:text-6xl">
            域名 SSL 监控
            <span className="text-gradient">一步到位</span>
            <br />
            让业务永不掉线
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
            云哨 — 全天候自动监控域名到期与 SSL 证书状态，异常秒级告警。
            多通道通知，多地域探测，让域名安全尽在掌控。
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth?mode=register&plan=free"
              className="group inline-flex items-center gap-2 rounded-xl bg-brand-cyan px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-cyan/20 transition-all hover:bg-brand-cyan-dark hover:shadow-xl hover:shadow-brand-cyan/30"
            >
              免费监控 5 个域名
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
              href="/products/cloud-sentinel"
              className="inline-flex items-center gap-2 rounded-xl border border-surface-300 bg-white px-8 py-3.5 text-base font-semibold text-ink-700 transition-all hover:border-brand-cyan hover:text-brand-cyan"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              查看功能详情
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-500">
            <div className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-brand-cyan" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              永久免费版
            </div>
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
              1 分钟快速接入
            </div>
          </div>
        </div>

        {/* Hero Visual — 监控仪表盘预览 */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="glass-card rounded-2xl p-2 shadow-2xl">
            <div className="rounded-xl bg-surface-50 p-6 sm:p-8">
              {/* 仪表盘标题栏 */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-ink-900">监控总览</div>
                  <div className="text-xs text-ink-500">实时域名与 SSL 证书状态</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-ink-500">运行中</span>
                </div>
              </div>

              {/* 状态指标卡片 */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: '监控域名', value: '128', color: 'text-brand-cyan', status: '正常' },
                  { label: 'SSL 证书', value: '96', color: 'text-brand-indigo', status: '有效' },
                  { label: '即将到期', value: '3', color: 'text-amber-500', status: '预警' },
                  { label: '异常告警', value: '0', color: 'text-green-600', status: '无异常' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-surface-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-ink-500">{stat.label}</div>
                      <span className={`flex h-1.5 w-1.5 rounded-full ${stat.status === '预警' ? 'bg-amber-500' : 'bg-green-500'}`} />
                    </div>
                    <div className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="mt-0.5 text-[10px] text-ink-400">{stat.status}</div>
                  </div>
                ))}
              </div>

              {/* 域名列表预览 */}
              <div className="mt-4 space-y-2">
                {[
                  { domain: 'nostack.cloud', ssl: '有效', days: 89, status: 'ok' },
                  { domain: 'api.nostack.cloud', ssl: '有效', days: 45, status: 'ok' },
                  { domain: 'docs.nostack.cloud', ssl: '即将过期', days: 7, status: 'warn' },
                ].map((item) => (
                  <div key={item.domain} className="flex items-center justify-between rounded-lg border border-surface-200 bg-white px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.status === 'ok' ? 'bg-green-50' : 'bg-amber-50'}`}>
                        <svg className={`h-4 w-4 ${item.status === 'ok' ? 'text-green-600' : 'text-amber-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          {item.status === 'ok' ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          )}
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-ink-900">{item.domain}</div>
                        <div className="text-xs text-ink-500">SSL {item.ssl} · 剩余 {item.days} 天</div>
                      </div>
                    </div>
                    <div className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${item.status === 'ok' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                      {item.status === 'ok' ? '正常' : '预警'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
