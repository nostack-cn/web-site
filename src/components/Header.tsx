'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { navItems } from '@/lib/data'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10" />
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
                  className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-surface-100 hover:text-brand-cyan"
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
                  <div className="dropdown-panel absolute left-0 top-full w-[560px] pt-2">
                    <div className="glass-card grid grid-cols-2 gap-1 rounded-2xl p-4 shadow-xl">
                      {item.dropdownItems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="group rounded-xl p-3 transition-colors hover:bg-surface-100"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan/10 to-brand-purple/10">
                              <svg className="h-4 w-4 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-ink-900 group-hover:text-brand-cyan">
                                {sub.label}
                              </div>
                              {sub.description && (
                                <div className="text-xs text-ink-500">{sub.description}</div>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:text-brand-cyan"
            >
              登录
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-brand-cyan px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-cyan-dark hover:shadow-md"
            >
              免费注册
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
                  className="block py-2 text-sm font-medium text-ink-700"
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
            <div className="mt-4 flex flex-col gap-2 px-4">
              <Link
                href="/login"
                className="rounded-lg border border-surface-300 px-4 py-2 text-center text-sm font-medium text-ink-700"
              >
                登录
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-brand-cyan px-4 py-2 text-center text-sm font-semibold text-white"
              >
                免费注册
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
