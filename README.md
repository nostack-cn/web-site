# 无栈云引 — 前端官网项目

一站式云计算服务平台 SaaS 官网，基于 Next.js App Router 构建，SEO 友好。

## 技术栈

- **框架**: Next.js 14 (App Router) — 支持 SSR/SSG，SEO 友好
- **样式**: Tailwind CSS 3 — 原子化 CSS，快速开发
- **语言**: TypeScript — 类型安全
- **字体**: Inter (Google Fonts) — 现代无衬线字体

## 项目结构

```
nostack-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # 根布局（SEO 元数据、JSON-LD 结构化数据）
│   │   ├── page.tsx         # 首页（组装所有区块）
│   │   ├── globals.css      # 全局样式 + Tailwind 指令
│   │   ├── robots.ts        # SEO: robots.txt 生成
│   │   └── sitemap.ts       # SEO: sitemap.xml 生成
│   ├── components/
│   │   ├── Header.tsx       # 导航栏（含产品下拉菜单）
│   │   ├── Hero.tsx         # 首屏区
│   │   ├── ProductMatrix.tsx # 产品矩阵（6 大产品卡片）
│   │   ├── Pricing.tsx      # 定价方案（3 套方案）
│   │   ├── SocialProof.tsx  # 信任背书（数据指标）
│   │   └── Footer.tsx       # 页脚（含备案号、二维码占位）
│   └── lib/
│       └── data.ts          # 数据中心（产品、定价、统计、页脚配置）
├── public/                   # 静态资源
├── tailwind.config.ts        # 设计系统配色
├── next.config.mjs
└── .env.local.example        # 环境变量模板
```

## 设计系统

| Token | 色值 | 用途 |
|-------|------|------|
| `brand-cyan` | `#0891B2` | 主品牌色 — 深青 |
| `brand-indigo` | `#5E6AD2` | 辅助色 — 靛蓝 |
| `brand-purple` | `#7B61FF` | 强调色 — 干涉紫 |
| `ink-900` | `#111827` | 主标题文字 |
| `ink-500` | `#6B7280` | 正文/描述文字 |
| `surface-50` | `#F9FAFB` | 页面背景 |
| `surface-100` | `#F3F4F6` | 卡片/分隔背景 |
| `surface-200` | `#E5E7EB` | 边框 |

## SEO 特性

- ✅ App Router SSR/SSG — 服务端渲染，首屏直出
- ✅ 完整 Metadata — title / description / keywords / OpenGraph / Twitter Card
- ✅ 结构化数据 — JSON-LD (Organization + WebSite Schema)
- ✅ `sitemap.ts` — 自动生成 sitemap.xml
- ✅ `robots.ts` — 自动生成 robots.txt
- ✅ 语义化 HTML — `<header>` / `<main>` / `<section>` / `<footer>`
- ✅ `lang="zh-CN"` — 正确的语言声明
- ✅ `canonical` 链接 — 规范化 URL
- ✅ 图片优化 — next/image + AVIF/WebP 格式

## 快速开始

```bash
# 安装依赖
npm install

# 复制环境变量
cp .env.local.example .env.local

# 开发模式启动
npm run dev

# 生产构建
npm run build && npm start
```

访问 http://localhost:3000

## 待办

- [ ] 接入后端 API（订单创建、支付回调、用户系统）
- [ ] 集成 yungouos 聚合支付
- [ ] 替换 QR Code 占位为实际二维码图片
- [ ] 填写实际的 ICP 备案号
- [ ] 添加 OG 社交分享图 (/public/og-image.png)
- [ ] 接入实际合作伙伴 Logo
```
