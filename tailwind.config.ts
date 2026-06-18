import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 无栈云引 设计系统 — 亮白风格
        brand: {
          cyan: '#0891B2',    // 主品牌色 — 深青
          indigo: '#5E6AD2',  // 辅助色 — 靛蓝
          purple: '#7B61FF',  // 强调色 — 干涉紫
          'cyan-light': '#06B6D4',
          'cyan-dark': '#0E7490',
        },
        ink: {
          900: '#111827',  // 主标题
          700: '#374151',  // 次级标题
          500: '#6B7280',  // 正文/描述
          300: '#D1D5DB',  // 占位/弱化
        },
        surface: {
          50: '#F9FAFB',   // 页面背景
          100: '#F3F4F6',  // 卡片背景/分隔
          200: '#E5E7EB',  // 边框
          300: '#D1D5DB',  // 强边框
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
