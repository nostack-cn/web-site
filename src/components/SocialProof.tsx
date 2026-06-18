import { stats } from '@/lib/data'

export default function SocialProof() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-cyan">
            信任背书
          </span>
          <h2 className="mt-2 text-3xl font-bold text-ink-900 sm:text-4xl">
            10,000+ 域名的共同选择
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-gradient sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-3 text-base font-semibold text-ink-900">
                {stat.label}
              </div>
              <p className="mt-1 text-sm text-ink-500">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
