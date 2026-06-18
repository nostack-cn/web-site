import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { cloudSentinelFeatures, pricingPlans } from '@/lib/data'

export const metadata: Metadata = {
  title: '云哨 — 域名 SSL 监控管家',
  description:
    '云哨是面向企业的域名与 SSL 证书监控平台，提供域名到期检查、SSL 证书有效性监控、站点健康巡检、多通道告警通知等功能。全天候自动监控，异常秒级告警。',
  keywords: [
    '云哨',
    '域名监控',
    'SSL证书监控',
    '域名到期提醒',
    'SSL证书有效性检查',
    '域名管家',
    '网站监控',
    '证书过期提醒',
  ],
  alternates: {
    canonical: '/products/cloud-sentinel',
  },
  openGraph: {
    title: '云哨 — 域名 SSL 监控管家',
    description:
      '全天候自动监控域名到期与 SSL 证书状态，异常秒级告警，多通道通知，多地域探测。',
    url: '/products/cloud-sentinel',
  },
}

const iconMap: Record<string, React.ReactElement> = {
  calendar: <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
  lock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
  pulse: <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3l3-9 6 18 3-9h3" />,
  bell: <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />,
  chart: <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
  users: <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
}

export default function CloudSentinelPage() {
  return (
    <>
      <Header />
      <main>
        {/* 产品 Hero */}
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-cyan/10 via-brand-indigo/5 to-transparent blur-3xl" />
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              {/* 面包屑 */}
              <nav className="mb-6 flex items-center justify-center gap-2 text-sm text-ink-500">
                <Link href="/" className="hover:text-brand-cyan">产品</Link>
                <span>/</span>
                <span className="font-medium text-ink-900">云哨</span>
              </nav>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 px-4 py-1.5">
                <span className="flex h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
                <span className="text-sm font-medium text-brand-cyan-dark">域名 SSL 监控管家</span>
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl">
                云哨 — 你的<span className="text-gradient">域名管家</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-500">
                全天候自动监控域名到期与 SSL 证书状态，站点健康巡检，异常秒级告警。
                多通道通知，多地域探测，让域名安全尽在掌控。
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/auth?mode=register&plan=free"
                  className="group inline-flex items-center gap-2 rounded-xl bg-brand-cyan px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-cyan/20 transition-all hover:bg-brand-cyan-dark hover:shadow-xl"
                >
                  免费监控 5 个域名
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/docs/quick-start"
                  className="inline-flex items-center gap-2 rounded-xl border border-surface-300 bg-white px-8 py-3.5 text-base font-semibold text-ink-700 transition-all hover:border-brand-cyan hover:text-brand-cyan"
                >
                  查看文档
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 功能详情区 */}
        <section id="features" className="py-20 sm:py-24 bg-surface-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-cyan">功能详情</span>
              <h2 className="mt-2 text-3xl font-bold text-ink-900 sm:text-4xl">
                六大核心能力，全方位守护域名安全
              </h2>
              <p className="mt-4 text-lg text-ink-500">
                从域名注册到期到证书过期预警，从站点可用性到告警通知，云哨覆盖域名管理的每一个环节
              </p>
            </div>

            {/* 功能列表 — 交替布局 */}
            <div className="mt-20 space-y-24">
              {cloudSentinelFeatures.map((feature, idx) => (
                <div
                  key={feature.title}
                  className={`grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center ${
                    idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* 文字描述 */}
                  <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10">
                      <svg className="h-7 w-7 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        {iconMap[feature.icon]}
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-ink-900">{feature.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-ink-500">
                      {feature.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {feature.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3">
                          <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-cyan" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-ink-700">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 可视化预览 */}
                  <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                    <FeaturePreview index={idx} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 定价 CTA */}
        <section id="pricing" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-cyan">定价方案</span>
              <h2 className="mt-2 text-3xl font-bold text-ink-900 sm:text-4xl">透明定价，按需选择</h2>
              <p className="mt-4 text-lg text-ink-500">
                从个人开发者到企业团队，总有适合你的方案。免费版永久可用，随时升级。
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl border-2 bg-white p-8 shadow-sm transition-all hover:shadow-lg ${
                    plan.highlighted
                      ? 'border-brand-cyan shadow-lg shadow-brand-cyan/10 md:scale-105'
                      : 'border-surface-200'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-brand-cyan px-4 py-1 text-xs font-semibold text-white shadow-md">
                        最受欢迎
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-ink-900">{plan.name}</h3>
                  <p className="mt-2 text-sm text-ink-500">{plan.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    {plan.price > 0 ? (
                      <>
                        <span className="text-4xl font-bold text-ink-900">¥{plan.price}</span>
                        <span className="text-sm text-ink-500">{plan.unit}</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-ink-900">{plan.unit}</span>
                    )}
                  </div>
                  <Link
                    href={plan.ctaHref}
                    className={`mt-6 block rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                      plan.highlighted
                        ? 'bg-brand-cyan text-white hover:bg-brand-cyan-dark hover:shadow-md'
                        : 'border border-surface-300 text-ink-700 hover:border-brand-cyan hover:text-brand-cyan'
                    }`}
                  >
                    {plan.ctaText}
                  </Link>
                  <ul className="mt-8 space-y-3">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-cyan" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-ink-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

// 功能预览组件 — 根据功能索引渲染不同的可视化
function FeaturePreview({ index }: { index: number }) {
  const previews = [
    // 域名到期监控 — 日历视图
    <div key="0" className="glass-card rounded-2xl p-6 shadow-xl">
      <div className="text-sm font-semibold text-ink-900">域名到期日历</div>
      <div className="mt-4 space-y-3">
        {[
          { domain: 'nostack.cloud', days: 89, status: 'safe' },
          { domain: 'api.nostack.cloud', days: 45, status: 'safe' },
          { domain: 'docs.nostack.cloud', days: 7, status: 'warn' },
          { domain: 'cdn.nostack.cloud', days: 2, status: 'danger' },
        ].map((d) => (
          <div key={d.domain} className="flex items-center justify-between rounded-lg border border-surface-200 bg-white px-4 py-3">
            <span className="text-sm font-medium text-ink-900">{d.domain}</span>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold ${d.status === 'safe' ? 'text-green-600' : d.status === 'warn' ? 'text-amber-500' : 'text-red-500'}`}>
                {d.days} 天后到期
              </span>
              <span className={`h-2 w-2 rounded-full ${d.status === 'safe' ? 'bg-green-500' : d.status === 'warn' ? 'bg-amber-500' : 'bg-red-500'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>,

    // SSL 证书检查 — 证书详情卡
    <div key="1" className="glass-card rounded-2xl p-6 shadow-xl">
      <div className="text-sm font-semibold text-ink-900">SSL 证书详情</div>
      <div className="mt-4 rounded-lg border border-surface-200 bg-white p-4">
        <div className="flex items-center gap-3 border-b border-surface-200 pb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <div className="text-sm font-medium text-ink-900">nostack.cloud</div>
            <div className="text-xs text-green-600">证书有效</div>
          </div>
        </div>
        <div className="mt-3 space-y-2 text-xs">
          <div className="flex justify-between"><span className="text-ink-500">颁发机构</span><span className="font-medium text-ink-900">Let's Encrypt R3</span></div>
          <div className="flex justify-between"><span className="text-ink-500">颁发日期</span><span className="font-medium text-ink-900">2026-05-20</span></div>
          <div className="flex justify-between"><span className="text-ink-500">到期日期</span><span className="font-medium text-ink-900">2026-08-18</span></div>
          <div className="flex justify-between"><span className="text-ink-500">剩余天数</span><span className="font-bold text-green-600">89 天</span></div>
          <div className="flex justify-between"><span className="text-ink-500">证书链</span><span className="font-medium text-green-600">完整 ✓</span></div>
        </div>
      </div>
    </div>,

    // 站点健康巡检 — 响应时间图表
    <div key="2" className="glass-card rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-ink-900">站点可用性</div>
        <div className="flex items-center gap-1.5">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-ink-500">正常</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { region: '北京', latency: '12ms', status: 'ok' },
          { region: '上海', latency: '18ms', status: 'ok' },
          { region: '广州', latency: '25ms', status: 'ok' },
        ].map((n) => (
          <div key={n.region} className="rounded-lg border border-surface-200 bg-white p-3 text-center">
            <div className="text-xs text-ink-500">{n.region}</div>
            <div className="mt-1 text-lg font-bold text-brand-cyan">{n.latency}</div>
            <div className="text-[10px] text-green-600">正常</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-24 items-end gap-1">
        {[30, 25, 40, 35, 50, 45, 60, 55, 70, 65, 80, 75].map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-brand-cyan/30 to-brand-cyan" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mt-1 text-xs text-ink-400">响应延迟趋势 (最近 12 小时)</div>
    </div>,

    // 告警通知中心 — 告警列表
    <div key="3" className="glass-card rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-ink-900">告警通知</div>
        <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">3 条未读</span>
      </div>
      <div className="mt-4 space-y-2">
        {[
          { level: '紧急', text: 'docs.nostack.cloud SSL 证书将在 7 天后过期', time: '2 分钟前', color: 'red' },
          { level: '警告', text: 'api.nostack.cloud 响应延迟超过 500ms', time: '15 分钟前', color: 'amber' },
          { level: '信息', text: 'nostack.cloud 已成功续费', time: '1 小时前', color: 'blue' },
        ].map((alert, i) => (
          <div key={i} className={`rounded-lg border-l-4 bg-white p-3 ${alert.color === 'red' ? 'border-red-500' : alert.color === 'amber' ? 'border-amber-500' : 'border-blue-500'}`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold ${alert.color === 'red' ? 'text-red-600' : alert.color === 'amber' ? 'text-amber-600' : 'text-blue-600'}`}>{alert.level}</span>
              <span className="text-[10px] text-ink-400">{alert.time}</span>
            </div>
            <p className="mt-1 text-sm text-ink-700">{alert.text}</p>
          </div>
        ))}
      </div>
    </div>,

    // 监控仪表盘 — 看板预览
    <div key="4" className="glass-card rounded-2xl p-6 shadow-xl">
      <div className="text-sm font-semibold text-ink-900">监控看板</div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          { label: '监控域名', value: '128', color: 'text-brand-cyan' },
          { label: 'SSL 证书', value: '96', color: 'text-brand-indigo' },
          { label: '健康站点', value: '125', color: 'text-green-600' },
          { label: '异常告警', value: '3', color: 'text-amber-500' },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-surface-200 bg-white p-3">
            <div className="text-xs text-ink-500">{s.label}</div>
            <div className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-surface-200 bg-white p-3">
        <div className="text-xs text-ink-500">到期时间线</div>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-green-500 via-amber-500 to-red-500" />
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-ink-400">
          <span>90+ 天</span><span>30 天</span><span>7 天</span><span>已过期</span>
        </div>
      </div>
    </div>,

    // 团队协作 — 成员列表
    <div key="5" className="glass-card rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-ink-900">团队成员</div>
        <span className="text-xs text-ink-500">5 个成员</span>
      </div>
      <div className="mt-4 space-y-2">
        {[
          { name: '张明', role: '管理员', initial: '张', color: 'bg-brand-cyan' },
          { name: '李华', role: '运维', initial: '李', color: 'bg-brand-indigo' },
          { name: '王芳', role: '运维', initial: '王', color: 'bg-brand-purple' },
          { name: '赵强', role: '只读', initial: '赵', color: 'bg-ink-400' },
        ].map((m) => (
          <div key={m.name} className="flex items-center justify-between rounded-lg border border-surface-200 bg-white px-4 py-2.5">
            <div className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${m.color} text-xs font-semibold text-white`}>
                {m.initial}
              </div>
              <span className="text-sm font-medium text-ink-900">{m.name}</span>
            </div>
            <span className="rounded-full bg-surface-100 px-2.5 py-0.5 text-xs font-medium text-ink-600">{m.role}</span>
          </div>
        ))}
      </div>
    </div>,
  ]

  return previews[index] || previews[0]
}
