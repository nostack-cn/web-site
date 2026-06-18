import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { teamMembers, milestones, companyValues, filingInfo } from '@/lib/data'

export const metadata: Metadata = {
  title: '关于我们',
  description:
    '武汉无栈科技有限公司 — 云哨域名 SSL 监控平台的创造者。致力于让域名管理更简单、更安全、更可靠。',
  keywords: ['关于我们', '无栈科技', '武汉无栈', '云哨团队', '公司介绍', '使命愿景'],
  alternates: { canonical: '/about' },
  openGraph: {
    title: '关于我们 — 无栈云引',
    description: '武汉无栈科技有限公司，云哨域名 SSL 监控平台的创造者。',
    url: '/about',
  },
}

const valueIconMap: Record<string, React.ReactElement> = {
  sparkles: <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
  shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  cpu: <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />,
  heart: <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-cyan/10 via-brand-indigo/5 to-transparent blur-3xl" />
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-cyan">关于我们</span>
              <h1 className="mt-2 text-4xl font-bold text-ink-900 sm:text-5xl">
                让域名管理
                <span className="text-gradient">简单可靠</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-500">
                {filingInfo.company}，成立于 2024 年，专注于域名与 SSL 证书监控领域。
                我们的旗舰产品「云哨」已为 10,000+ 域名提供全天候监控守护。
              </p>
            </div>
          </div>
        </section>

        {/* 使命与愿景 */}
        <section className="py-20 bg-surface-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* 使命 */}
              <div className="rounded-2xl border border-surface-200 bg-white p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-cyan/10 to-brand-indigo/10">
                  <svg className="h-6 w-6 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-ink-900">我们的使命</h2>
                <p className="mt-3 text-base leading-relaxed text-ink-500">
                  让每一个域名和证书都尽在掌控。我们相信，域名安全不应是运维的负担，
                  而应该像呼吸一样自然。云哨的目标是把复杂的监控工作交给自动化系统，
                  让团队专注于真正重要的业务。
                </p>
              </div>

              {/* 愿景 */}
              <div className="rounded-2xl border border-surface-200 bg-white p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple/10 to-brand-cyan/10">
                  <svg className="h-6 w-6 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-ink-900">我们的愿景</h2>
                <p className="mt-3 text-base leading-relaxed text-ink-500">
                  成为全球最值得信赖的域名安全监控平台。通过技术创新，
                  让域名和 SSL 证书管理变得透明、自动化、零门槛，
                  让任何规模的团队都能享受到企业级的安全保障。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 核心价值观 */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-cyan">价值观</span>
              <h2 className="mt-2 text-3xl font-bold text-ink-900 sm:text-4xl">
                我们坚持的四个原则
              </h2>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {companyValues.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10">
                    <svg className="h-7 w-7 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      {valueIconMap[value.icon]}
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-ink-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 发展历程 */}
        <section className="py-20 bg-surface-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-cyan">发展历程</span>
              <h2 className="mt-2 text-3xl font-bold text-ink-900 sm:text-4xl">一路走来</h2>
            </div>

            {/* Timeline */}
            <div className="mt-16 relative">
              {/* 竖线 */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-cyan via-brand-indigo to-surface-200 sm:left-1/2 sm:-translate-x-1/2" />

              <div className="space-y-12">
                {milestones.map((m, idx) => (
                  <div
                    key={m.year}
                    className={`relative flex flex-col gap-4 sm:flex-row sm:items-center ${
                      idx % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    }`}
                  >
                    {/* 节点 */}
                    <div className="absolute left-4 -translate-x-1/2 sm:left-1/2">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-brand-cyan bg-white">
                        <div className="h-2 w-2 rounded-full bg-brand-cyan" />
                      </div>
                    </div>

                    {/* 内容 */}
                    <div className={`ml-10 sm:ml-0 sm:w-1/2 ${idx % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                      <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
                        <span className="text-sm font-semibold text-brand-cyan">{m.year}</span>
                        <h3 className="mt-2 text-lg font-bold text-ink-900">{m.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-500">{m.description}</p>
                      </div>
                    </div>

                    {/* 空白占位 */}
                    <div className="hidden sm:block sm:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 团队 */}
        <section id="team" className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-cyan">团队</span>
              <h2 className="mt-2 text-3xl font-bold text-ink-900 sm:text-4xl">核心团队</h2>
              <p className="mt-4 text-lg text-ink-500">
                一群热爱技术的工程师，致力于打造最好的域名监控工具
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member) => (
                <div key={member.name} className="rounded-2xl border border-surface-200 bg-white p-6 text-center shadow-sm">
                  {/* Avatar */}
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-cyan to-brand-indigo">
                    <span className="text-xl font-bold text-white">{member.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-base font-bold text-ink-900">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-cyan">{member.role}</p>
                  <p className="mt-3 text-xs leading-relaxed text-ink-500">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 加入我们 + 联系方式 */}
        <section id="careers" className="py-20 bg-surface-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div id="contact" className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* 加入我们 */}
              <div className="rounded-2xl border border-surface-200 bg-white p-8">
                <h2 className="text-xl font-bold text-ink-900">加入我们</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  我们正在寻找志同道合的伙伴一起成长。如果你对域名安全、分布式监控、
                  SaaS 产品开发有热情，欢迎加入无栈科技。
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    { role: 'Go 后端工程师', tag: '全职' },
                    { role: '前端工程师 (React/Next.js)', tag: '全职' },
                    { role: '产品经理 (SaaS 方向)', tag: '全职' },
                  ].map((job) => (
                    <div key={job.role} className="flex items-center justify-between rounded-lg border border-surface-200 px-4 py-3">
                      <span className="text-sm font-medium text-ink-900">{job.role}</span>
                      <span className="rounded-full bg-brand-cyan/10 px-2.5 py-0.5 text-xs font-medium text-brand-cyan">{job.tag}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="mailto:hr@nostack.cloud"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-cyan px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-cyan-dark hover:shadow-md"
                >
                  投递简历
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>

              {/* 联系方式 */}
              <div className="rounded-2xl border border-surface-200 bg-white p-8">
                <h2 className="text-xl font-bold text-ink-900">联系我们</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  有任何问题或合作意向，欢迎通过以下方式与我们联系。
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface-100">
                      <svg className="h-5 w-5 text-ink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-ink-500">邮箱</div>
                      <div className="text-sm font-medium text-ink-900">support@nostack.cloud</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface-100">
                      <svg className="h-5 w-5 text-ink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-ink-500">地址</div>
                      <div className="text-sm font-medium text-ink-900">湖北省武汉市东湖高新区光谷</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface-100">
                      <svg className="h-5 w-5 text-ink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-ink-500">工作时间</div>
                      <div className="text-sm font-medium text-ink-900">周一至周五 9:00 - 18:00</div>
                    </div>
                  </div>
                </div>

                {/* 微信二维码占位 */}
                <div className="mt-6 inline-flex flex-col items-center gap-2 rounded-xl border border-surface-200 bg-surface-50 p-3">
                  <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-surface-300 bg-white">
                    <span className="text-[10px] text-ink-300">二维码占位</span>
                  </div>
                  <span className="text-xs font-medium text-ink-500">扫码添加客服微信</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
