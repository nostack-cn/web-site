import Link from 'next/link'
import { pricingPlans } from '@/lib/data'

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-surface-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-cyan">
            定价方案
          </span>
          <h2 className="mt-2 text-3xl font-bold text-ink-900 sm:text-4xl">
            透明定价，按需付费
          </h2>
          <p className="mt-4 text-lg text-ink-500">
            从个人开发者到大型企业，总有适合你的方案。所有方案均支持随时升级或降级。
          </p>
        </div>

        {/* Pricing Cards */}
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
              {/* Highlighted badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-brand-cyan px-4 py-1 text-xs font-semibold text-white shadow-md">
                    最受欢迎
                  </span>
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-xl font-bold text-ink-900">{plan.name}</h3>
              <p className="mt-2 text-sm text-ink-500">{plan.description}</p>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-1">
                {plan.price > 0 ? (
                  <>
                    <span className="text-4xl font-bold text-ink-900">
                      ¥{plan.price}
                    </span>
                    <span className="text-sm text-ink-500">{plan.unit}</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-ink-900">{plan.unit}</span>
                )}
              </div>

              {/* CTA */}
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

              {/* Features */}
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-cyan"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-ink-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-10 text-center text-sm text-ink-500">
          所有方案均包含 7 天无理由退款保障 · 支持微信 / 支付宝 / 企业转账
        </p>
      </div>
    </section>
  )
}
