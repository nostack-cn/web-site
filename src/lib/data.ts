/**
 * 无栈云引 — 数据中心
 * 所有页面内容数据集中管理，便于后续对接 CMS 或后端 API
 */

// ====== 产品数据 ======
export interface Product {
  id: string
  name: string
  description: string
  icon: string
  features: string[]
  href: string
  category: 'compute' | 'storage' | 'network' | 'database' | 'serverless' | 'container'
}

export const products: Product[] = [
  {
    id: 'ecs',
    name: '云服务器 ECS',
    description: '弹性可扩展的计算服务，秒级开通，灵活计费',
    icon: 'server',
    features: ['秒级开通', '弹性伸缩', 'SSD 存储', 'VPC 隔离'],
    href: '/products/ecs',
    category: 'compute',
  },
  {
    id: 'rds',
    name: '云数据库 RDS',
    description: '全托管关系型数据库，支持 MySQL / PostgreSQL',
    icon: 'database',
    features: ['自动备份', '读写分离', '故障自动切换', '性能监控'],
    href: '/products/rds',
    category: 'database',
  },
  {
    id: 'cdn',
    name: 'CDN 加速',
    description: '全球内容分发网络，降低延迟，提升访问速度',
    icon: 'globe',
    features: ['全球 2800+ 节点', '智能调度', 'HTTPS 加密', '实时刷新'],
    href: '/products/cdn',
    category: 'network',
  },
  {
    id: 'cos',
    name: '对象存储 COS',
    description: '海量安全低成本的对象存储服务，兼容 S3 协议',
    icon: 'bucket',
    features: ['无限容量', '11 个 9 持久性', '跨区域复制', '生命周期管理'],
    href: '/products/cos',
    category: 'storage',
  },
  {
    id: 'scf',
    name: 'Serverless 函数',
    description: '无服务器计算，按需执行，毫秒级响应',
    icon: 'function',
    features: ['毫秒级启动', '按量计费', '自动伸缩', '事件驱动'],
    href: '/products/scf',
    category: 'serverless',
  },
  {
    id: 'tke',
    name: '容器服务 TKE',
    description: '全托管 Kubernetes，简化容器编排与运维',
    icon: 'container',
    features: ['Kubernetes 原生', '自动扩缩容', '镜像仓库', '服务网格'],
    href: '/products/tke',
    category: 'container',
  },
]

// ====== 导航结构 ======
export interface NavItem {
  label: string
  href: string
  hasDropdown?: boolean
  dropdownItems?: { label: string; href: string; description?: string }[]
}

export const navItems: NavItem[] = [
  {
    label: '产品',
    href: '/products',
    hasDropdown: true,
    dropdownItems: [
      { label: '云服务器 ECS', href: '/products/ecs', description: '弹性计算实例' },
      { label: '云数据库 RDS', href: '/products/rds', description: '托管数据库服务' },
      { label: 'CDN 加速', href: '/products/cdn', description: '全球内容分发' },
      { label: '对象存储 COS', href: '/products/cos', description: '海量存储服务' },
      { label: 'Serverless 函数', href: '/products/scf', description: '无服务器计算' },
      { label: '容器服务 TKE', href: '/products/tke', description: 'Kubernetes 平台' },
    ],
  },
  {
    label: '定价',
    href: '/pricing',
  },
  {
    label: '解决方案',
    href: '/solutions',
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

// ====== 定价方案 ======
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
    id: 'starter',
    name: '入门版',
    price: 99,
    unit: '/月',
    description: '适合个人开发者与小型项目快速起步',
    features: [
      '1 台 2C4G 云服务器',
      '50GB 对象存储',
      '100GB /月 CDN 流量',
      '7×8 小时工单支持',
      '基础监控告警',
    ],
    highlighted: false,
    ctaText: '免费试用',
    ctaHref: '/register?plan=starter',
  },
  {
    id: 'standard',
    name: '标准版',
    price: 399,
    unit: '/月',
    description: '成长型企业的首选方案，全面覆盖核心场景',
    features: [
      '3 台 4C8G 云服务器',
      '500GB 对象存储',
      '1TB /月 CDN 流量',
      '1 套云数据库 RDS',
      '7×24 小时专属客服',
      '高级监控 + 日志分析',
      'SSL 证书 (1 个)',
    ],
    highlighted: true,
    ctaText: '立即购买',
    ctaHref: '/register?plan=standard',
  },
  {
    id: 'enterprise',
    name: '企业版',
    price: 0,
    unit: '联系我们',
    description: '面向大中型企业的定制化解决方案',
    features: [
      '不限量云服务器资源',
      '专属 VPC + 专线接入',
      'DDoS 高防 + WAF',
      '数据库专家服务',
      '架构师 1V1 咨询',
      'SLA 99.99% 保障',
      '私有化部署支持',
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
  { value: '50,000+', label: '企业客户', description: '覆盖互联网、金融、制造等核心行业' },
  { value: '99.99%', label: '服务可用性', description: 'SLA 级别保障，多可用区容灾' },
  { value: '2800+', label: '全球 CDN 范围', description: '覆盖 70+ 国家与地区的加速节点' },
  { value: '7×24', label: '技术支持', description: '专家团队全天候在线响应' },
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
      { label: '云服务器 ECS', href: '/products/ecs' },
      { label: '云数据库 RDS', href: '/products/rds' },
      { label: 'CDN 加速', href: '/products/cdn' },
      { label: '对象存储 COS', href: '/products/cos' },
      { label: 'Serverless 函数', href: '/products/scf' },
      { label: '容器服务 TKE', href: '/products/tke' },
    ],
  },
  {
    title: '解决方案',
    links: [
      { label: '网站建设', href: '/solutions/website' },
      { label: '移动应用', href: '/solutions/mobile' },
      { label: '大数据分析', href: '/solutions/big-data' },
      { label: '人工智能', href: '/solutions/ai' },
      { label: '物联网', href: '/solutions/iot' },
    ],
  },
  {
    title: '资源与支持',
    links: [
      { label: '产品文档', href: '/docs' },
      { label: 'API 参考', href: '/docs/api' },
      { label: '帮助中心', href: '/help' },
      { label: '工单系统', href: '/support' },
      { label: '状态页', href: '/status' },
    ],
  },
  {
    title: '关于我们',
    links: [
      { label: '公司介绍', href: '/about' },
      { label: '加入我们', href: '/careers' },
      { label: '联系合作', href: '/contact' },
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
