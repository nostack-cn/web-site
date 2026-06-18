/**
 * 无栈云引 — 数据中心
 * 所有页面内容数据集中管理，便于后续对接 CMS 或后端 API
 */

// ====== 导航结构 ======
export interface NavItem {
  label: string
  href: string
  hasDropdown?: boolean
  dropdownItems?: { label: string; href: string; description?: string; icon?: string }[]
}

export const navItems: NavItem[] = [
  {
    label: '产品',
    href: '/',
    hasDropdown: true,
    dropdownItems: [
      {
        label: '云哨',
        href: '/products/cloud-sentinel',
        description: '域名 SSL 监控管家',
        icon: 'shield',
      },
    ],
  },
  {
    label: '博客',
    href: '/blog',
  },
  {
    label: '文档',
    href: '/docs',
  },
  {
    label: '关于我们',
    href: '/about',
  },
]

// ====== 云哨产品数据 ======
export interface ProductFeature {
  title: string
  description: string
  icon: string
  highlights: string[]
}

export const cloudSentinelFeatures: ProductFeature[] = [
  {
    title: '域名到期监控',
    description: '实时追踪域名注册状态，提前预警到期风险，避免域名丢失导致的业务中断。',
    icon: 'calendar',
    highlights: [
      '多域名批量导入，一键纳管',
      '到期前 30 / 7 / 1 天分级提醒',
      '支持邮件 / 短信 / Webhook 多通道通知',
      '自动检测域名注册商信息变更',
    ],
  },
  {
    title: 'SSL 证书有效性检查',
    description: '全天候监控 SSL/TLS 证书状态，及时发现证书过期、链路异常等安全隐患。',
    icon: 'lock',
    highlights: [
      '证书剩余有效期实时展示',
      '证书链完整性校验',
      '支持 HTTPS / TLS 配置检测',
      '证书颁发机构 (CA) 信息追踪',
    ],
  },
  {
    title: '站点健康巡检',
    description: '定时探测网站可用性，响应延迟、HTTP 状态码一目了然，快速定位故障。',
    icon: 'pulse',
    highlights: [
      '多地域探测节点同步巡检',
      'HTTP 状态码与响应时间监控',
      'DNS 解析异常检测',
      '自定义巡检频率（最快 1 分钟）',
    ],
  },
  {
    title: '告警通知中心',
    description: '统一管理所有监控告警，灵活配置通知规则，确保关键事件第一时间触达。',
    icon: 'bell',
    highlights: [
      '邮件 / 短信 / 企业微信 / 钉钉通知',
      '告警分级：信息 / 警告 / 紧急',
      '告警静默与合并去重',
      '告警历史记录与趋势分析',
    ],
  },
  {
    title: '监控仪表盘',
    description: '可视化展示所有域名与证书的运行状态，全局掌控，一目了然。',
    icon: 'chart',
    highlights: [
      '域名 / 证书状态总览看板',
      '到期时间线日历视图',
      '告警趋势统计图表',
      '自定义看板布局',
    ],
  },
  {
    title: '团队协作',
    description: '支持多成员协作管理，灵活分配权限，满足团队运维场景需求。',
    icon: 'users',
    highlights: [
      '多角色权限管理（管理员 / 运维 / 只读）',
      '域名分组与项目隔离',
      '操作审计日志',
      'API Token 开放接口',
    ],
  },
]

// ====== 云哨定价方案 ======
export interface PricingPlan {
  id: string
  name: string
  price: number
  unit: string
  description: string
  features: string[]
  highlighted: boolean
  ctaText: string
  ctaHref: string
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: '免费版',
    price: 0,
    unit: '永久免费',
    description: '适合个人开发者与小规模域名监控',
    features: [
      '监控 5 个域名',
      'SSL 证书有效性检查',
      '站点可用性巡检（每小时）',
      '邮件告警通知',
      '基础监控仪表盘',
    ],
    highlighted: false,
    ctaText: '免费使用',
    ctaHref: '/auth?mode=register&plan=free',
  },
  {
    id: 'pro',
    name: '专业版',
    price: 49,
    unit: '/月',
    description: '成长型团队的首选，全面覆盖监控场景',
    features: [
      '监控 50 个域名',
      '全部免费版功能',
      '巡检频率提升至 1 分钟',
      '邮件 / 短信 / Webhook 通知',
      '告警分级与静默策略',
      '多地域探测节点',
      '5 个团队成员席位',
    ],
    highlighted: true,
    ctaText: '立即购买',
    ctaHref: '/auth?mode=register&plan=pro',
  },
  {
    id: 'enterprise',
    name: '企业版',
    price: 0,
    unit: '联系我们',
    description: '面向大中型企业的定制化解决方案',
    features: [
      '不限量域名监控',
      '专属探测节点部署',
      '企业微信 / 钉钉 / 飞书通知',
      'API Token 开放接口',
      '操作审计与合规报告',
      '不限团队成员席位',
      '专属技术支持 (SLA 99.9%)',
    ],
    highlighted: false,
    ctaText: '联系销售',
    ctaHref: '/contact',
  },
]

// ====== 信任指标 ======
export interface Stat {
  value: string
  label: string
  description: string
}

export const stats: Stat[] = [
  { value: '10,000+', label: '监控域名', description: '持续守护的域名与证书数量' },
  { value: '99.9%', label: '检测准确率', description: 'SSL 与域名状态检测准确率' },
  { value: '< 1 分钟', label: '告警延迟', description: '从异常发生到通知触达的平均时间' },
  { value: '7×24', label: '自动巡检', description: '全天候不间断监控探测' },
]

// ====== 博客文章数据 ======
export interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  href: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 'ssl-best-practices-2026',
    title: '2026 年 SSL/TLS 证书管理最佳实践',
    excerpt: '从证书选型到自动续期，全面梳理 HTTPS 证书管理的标准化流程，帮助你避免因证书过期导致的服务中断。',
    category: '安全实践',
    date: '2026-06-15',
    readTime: '8 分钟',
    href: '/blog/ssl-best-practices-2026',
  },
  {
    id: 'domain-lifecycle-management',
    title: '域名生命周期管理：从注册到续费的全流程',
    excerpt: '深入解析域名注册、解析、续费、转移的完整生命周期，分享企业级域名管理的实用策略与工具。',
    category: '运维指南',
    date: '2026-06-10',
    readTime: '12 分钟',
    href: '/blog/domain-lifecycle-management',
  },
  {
    id: 'cloud-sentinel-launch',
    title: '云哨 2.0 正式发布：全新监控引擎与告警体系',
    excerpt: '云哨 2.0 带来了全新的分布式监控引擎、多地域探测节点、以及更灵活的告警通知策略，让你的域名监控更智能。',
    category: '产品更新',
    date: '2026-06-01',
    readTime: '5 分钟',
    href: '/blog/cloud-sentinel-launch',
  },
  {
    id: 'monitoring-alert-strategy',
    title: '如何设计高效的监控告警策略',
    excerpt: '告警疲劳是运维团队的常见痛点。本文从告警分级、静默策略、通知通道三个维度，分享告警治理的实战经验。',
    category: '运维指南',
    date: '2026-05-28',
    readTime: '10 分钟',
    href: '/blog/monitoring-alert-strategy',
  },
  {
    id: 'https-migration-guide',
    title: '网站 HTTPS 全站迁移指南',
    excerpt: '从 HTTP 到 HTTPS 的完整迁移方案，涵盖证书申请、Nginx 配置、301 重定向、混合内容处理等关键步骤。',
    category: '安全实践',
    date: '2026-05-20',
    readTime: '15 分钟',
    href: '/blog/https-migration-guide',
  },
  {
    id: 'domain-security-checklist',
    title: '企业域名安全检查清单：20 项必做清单',
    excerpt: 'DNS 劫持、域名被盗、证书过期……企业域名安全面临的威胁有哪些？这份清单帮你逐一排查隐患。',
    category: '安全实践',
    date: '2026-05-15',
    readTime: '7 分钟',
    href: '/blog/domain-security-checklist',
  },
]

// ====== 文档数据 ======
export interface DocItem {
  id: string
  title: string
  description: string
  icon: string
  category: string
  href: string
}

export const docItems: DocItem[] = [
  {
    id: 'quick-start',
    title: '快速入门',
    description: '5 分钟完成注册、添加域名、开启监控的全流程指引。',
    icon: 'rocket',
    category: '入门指南',
    href: '/docs/quick-start',
  },
  {
    id: 'add-domains',
    title: '域名纳管指南',
    description: '批量导入域名、设置监控频率、配置分组管理的详细说明。',
    icon: 'list',
    category: '入门指南',
    href: '/docs/add-domains',
  },
  {
    id: 'ssl-monitoring',
    title: 'SSL 证书监控配置',
    description: '如何开启 SSL 证书有效性检查、设置到期提醒阈值与通知策略。',
    icon: 'lock',
    category: '功能说明',
    href: '/docs/ssl-monitoring',
  },
  {
    id: 'alert-rules',
    title: '告警规则与通知',
    description: '告警分级、静默策略、通知通道（邮件/短信/Webhook）配置指南。',
    icon: 'bell',
    category: '功能说明',
    href: '/docs/alert-rules',
  },
  {
    id: 'dashboard-guide',
    title: '监控仪表盘使用',
    description: '看板布局自定义、域名分组视图、到期时间线日历的使用说明。',
    icon: 'chart',
    category: '功能说明',
    href: '/docs/dashboard-guide',
  },
  {
    id: 'team-management',
    title: '团队与权限管理',
    description: '邀请成员、角色权限分配、项目隔离、操作审计日志说明。',
    icon: 'users',
    category: '团队协作',
    href: '/docs/team-management',
  },
  {
    id: 'api-reference',
    title: 'API 接口文档',
    description: 'RESTful API 完整参考，涵盖域名管理、监控查询、告警操作等接口。',
    icon: 'code',
    category: '开发者',
    href: '/docs/api-reference',
  },
  {
    id: 'webhook-guide',
    title: 'Webhook 集成指南',
    description: '配置 Webhook 接收告警通知，与企业微信、钉钉、飞书等平台集成。',
    icon: 'link',
    category: '开发者',
    href: '/docs/webhook-guide',
  },
  {
    id: 'faq',
    title: '常见问题 FAQ',
    description: '使用过程中遇到的常见问题解答，包括计费、权限、数据导出等。',
    icon: 'question',
    category: '帮助',
    href: '/docs/faq',
  },
]

// ====== 关于我们数据 ======
export interface TeamMember {
  name: string
  role: string
  bio: string
  avatar?: string
}

export const teamMembers: TeamMember[] = [
  {
    name: '张明',
    role: '创始人 & CEO',
    bio: '十年云计算与运维安全经验，曾主导多个大规模域名管理体系建设。',
  },
  {
    name: '李华',
    role: '技术负责人',
    bio: '分布式监控系统架构师，专注于高可用、低延迟的监控引擎研发。',
  },
  {
    name: '王芳',
    role: '产品负责人',
    bio: 'SaaS 产品设计专家，致力于打造简单易用的运维工具。',
  },
  {
    name: '赵强',
    role: '后端工程师',
    bio: 'Go / Python 开发者，负责云哨核心监控引擎与告警系统开发。',
  },
]

export interface Milestone {
  year: string
  title: string
  description: string
}

export const milestones: Milestone[] = [
  {
    year: '2024 Q3',
    title: '项目启动',
    description: '无栈科技正式成立，启动云哨域名 SSL 监控平台研发。',
  },
  {
    year: '2024 Q4',
    title: '内测上线',
    description: '云哨 1.0 内测版发布，支持域名到期监控与基础告警功能。',
  },
  {
    year: '2025 Q1',
    title: '正式发布',
    description: '云哨 1.0 正式版上线，开放免费版与专业版，首批用户突破 1,000。',
  },
  {
    year: '2025 Q3',
    title: '功能迭代',
    description: '新增 SSL 证书链校验、多地域探测、企业微信/钉钉通知等核心功能。',
  },
  {
    year: '2026 Q2',
    title: '2.0 发布',
    description: '云哨 2.0 正式发布，全新分布式监控引擎、告警体系与团队协作功能。',
  },
]

export interface CompanyValue {
  title: string
  description: string
  icon: string
}

export const companyValues: CompanyValue[] = [
  {
    title: '简单至上',
    description: '把复杂留给自己，把简单交给用户。三步完成配置，零门槛上手。',
    icon: 'sparkles',
  },
  {
    title: '安全可信',
    description: '数据加密存储，权限分级管控，审计日志全程可追溯。',
    icon: 'shield',
  },
  {
    title: '技术驱动',
    description: '分布式架构、毫秒级探测、智能告警，用技术解决实际问题。',
    icon: 'cpu',
  },
  {
    title: '用户为本',
    description: '倾听每一个反馈，7×24 响应，与用户共建产品。',
    icon: 'heart',
  },
]

// ====== 页脚配置 ======
export interface FooterLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export const footerColumns: FooterColumn[] = [
  {
    title: '产品',
    links: [
      { label: '云哨', href: '/products/cloud-sentinel' },
      { label: '定价方案', href: '/#pricing' },
      { label: '功能特性', href: '/products/cloud-sentinel#features' },
      { label: '更新日志', href: '/blog' },
    ],
  },
  {
    title: '资源',
    links: [
      { label: '快速入门', href: '/docs/quick-start' },
      { label: 'API 文档', href: '/docs/api-reference' },
      { label: '常见问题', href: '/docs/faq' },
      { label: '博客', href: '/blog' },
    ],
  },
  {
    title: '公司',
    links: [
      { label: '关于我们', href: '/about' },
      { label: '加入我们', href: '/about#careers' },
      { label: '联系方式', href: '/about#contact' },
      { label: '服务协议', href: '/terms' },
      { label: '隐私政策', href: '/privacy' },
    ],
  },
]

// ====== 备案信息 ======
export const filingInfo = {
  icp: '鄂ICP备2024XXXXXX号',
  publicSecurity: '鄂公网安备420XXXXXXXXXXX号',
  company: '武汉无栈科技有限公司',
}
