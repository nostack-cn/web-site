'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems } from '@/lib/data'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 判断当前路由是否匹配导航项
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-surface-200'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="主导航">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="无栈云引首页">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan to-brand-indigo">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-ink-900">无栈云引</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <div key={item.label} className="dropdown-trigger relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-brand-cyan bg-brand-cyan/5'
                      : 'text-ink-700 hover:bg-surface-100 hover:text-brand-cyan'
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Panel */}
                {item.hasDropdown && item.dropdownItems && (
                  <div className="dropdown-panel absolute left-0 top-full w-72 pt-2">
                    <div className="glass-card rounded-2xl p-3 shadow-xl">
                      {item.dropdownItems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface-100"
                        >
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10">
                            <svg className="h-5 w-5 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-ink-900 group-hover:text-brand-cyan">
                              {sub.label}
                            </div>
                            {sub.description && (
                              <div className="mt-0.5 text-xs text-ink-500">{sub.description}</div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Link
              href="/auth"
              className="rounded-lg bg-gradient-to-r from-brand-cyan to-brand-indigo px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:opacity-90"
            >
              免费试用
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="切换菜单"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="h-6 w-6 text-ink-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-surface-200 bg-white py-4">
            {navItems.map((item) => (
              <div key={item.label} className="px-4 py-2">
                <Link
                  href={item.href}
                  className={`block py-2 text-sm font-medium ${
                    isActive(item.href) ? 'text-brand-cyan' : 'text-ink-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.dropdownItems && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.dropdownItems.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block py-1.5 text-xs text-ink-500"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 px-4">
              <Link
                href="/auth"
                className="block rounded-lg bg-gradient-to-r from-brand-cyan to-brand-indigo px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm"
              >
                免费试用
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
