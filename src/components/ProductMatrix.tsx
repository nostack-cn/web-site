import Link from 'next/link'
import { products } from '@/lib/data'

const iconMap: Record<string, React.ReactElement> = {
  server: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12H3l9-9 9 9h-2M5 12v7a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1v-7M5 12h14" />
  ),
  database: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7c0 1.657 3.582 3 8 3s8-1.343 8-3-3.582-3-8-3-8 1.343-8 3zm0 0v10c0 1.657 3.582 3 8 3s8-1.343 8-3V7M4 12c0 1.657 3.582 3 8 3s8-1.343 8-3" />
  ),
  globe: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-9c1.657 0 3 4.03 3 9s-1.343 9-3 9-3-4.03-3-9 1.343-9 3-9zm-9 9h18" />
  ),
  bucket: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l1.5 12a2 2 0 002 1.75h11a2 2 0 002-1.75L21 7M3 7h18M3 7l3-4h12l3 4M9 11v6m6-6v6" />
  ),
  function: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  ),
  container: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  ),
}

export default function ProductMatrix() {
  return (
    <section id="products" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-cyan">
            产品矩阵
          </span>
          <h2 className="mt-2 text-3xl font-bold text-ink-900 sm:text-4xl">
            全栈云计算产品，覆盖每一个场景
          </h2>
          <p className="mt-4 text-lg text-ink-500">
            从计算、存储到网络与安全，六大核心产品组成完整的云服务生态
          </p>
        </div>

        {/* Product Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="product-card group rounded-2xl border border-surface-200 bg-white p-6 shadow-sm"
            >
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10">
                <svg
                  className="h-6 w-6 text-brand-cyan"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  {iconMap[product.icon]}
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-ink-900 group-hover:text-brand-cyan">
                {product.name}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                {product.description}
              </p>

              {/* Features */}
              <div className="mt-4 flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-md bg-surface-100 px-2.5 py-1 text-xs font-medium text-ink-700"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-cyan opacity-0 transition-opacity group-hover:opacity-100">
                了解更多
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
