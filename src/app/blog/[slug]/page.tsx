import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getBlogBySlug, getAllPublishedSlugs, type BlogPost } from '@/lib/blog'
import { blogPosts } from '@/lib/data'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs()
  if (slugs.length > 0) return slugs.map((slug) => ({ slug }))
  return blogPosts.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogBySlug(params.slug)
  if (post) {
    return {
      title: `${post.title} — 无栈云引`,
      description: post.summary || post.title,
      keywords: post.tags ? post.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      alternates: { canonical: `/blog/${post.slug}` },
      openGraph: {
        title: post.title,
        description: post.summary || '',
        url: `/blog/${post.slug}`,
        type: 'article',
        ...(post.cover_image ? { images: [post.cover_image] } : {}),
      },
    }
  }
  const fb = blogPosts.find((p) => p.id === params.slug)
  if (fb) return { title: `${fb.title} — 无栈云引`, description: fb.excerpt }
  return { title: '博客 — 无栈云引' }
}

export default async function BlogDetailPage({ params }: Props) {
  const post = await getBlogBySlug(params.slug)
  if (post) return <RemoteDetail post={post} />

  const fb = blogPosts.find((p) => p.id === params.slug)
  if (fb) return <FallbackDetail post={fb} />

  notFound()
}

function RemoteDetail({ post }: { post: BlogPost }) {
  return (
    <>
      <Header />
      <main>
        <article className="pb-24">
          <section className="relative overflow-hidden pt-32 pb-8 sm:pt-40 sm:pb-12">
            <div className="absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-cyan/10 via-brand-indigo/5 to-transparent blur-3xl" />
            </div>
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <nav className="mb-6 flex items-center gap-2 text-sm text-ink-400">
                <Link href="/blog" className="hover:text-brand-cyan transition-colors">博客</Link>
                <span>/</span>
                <span className="text-ink-600 truncate">{post.title}</span>
              </nav>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                {(post.tags || '').split(',').filter(Boolean).map((tag) => (
                  <span key={tag} className="rounded-full bg-brand-cyan/10 px-3 py-1 text-xs font-medium text-brand-cyan">{tag.trim()}</span>
                ))}
                {post.published_at && (
                  <span className="text-sm text-ink-400">{new Date(post.published_at).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                )}
                {post.author_name && <span className="text-sm text-ink-400">· {post.author_name}</span>}
                {post.view_count > 0 && <span className="text-sm text-ink-400">· {post.view_count} 阅读</span>}
              </div>
              <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{post.title}</h1>
              {post.summary && <p className="mt-4 text-lg text-ink-500 leading-relaxed">{post.summary}</p>}
            </div>
          </section>
          <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {post.cover_image && (
              <div className="mb-8 overflow-hidden rounded-2xl">
                <img src={post.cover_image} alt={post.title} className="w-full object-cover max-h-96" />
              </div>
            )}
            <div
              className="prose prose-lg max-w-none prose-headings:text-ink-900 prose-p:text-ink-600 prose-a:text-brand-cyan prose-img:rounded-xl prose-pre:bg-surface-900 prose-pre:text-surface-100"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
            />
            <div className="mt-16 border-t border-surface-200 pt-8">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-brand-cyan hover:underline">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                返回博客列表
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}

function FallbackDetail({ post }: { post: { id: string; title: string; excerpt: string; category: string; date: string; readTime: string } }) {
  return (
    <>
      <Header />
      <main>
        <article className="pb-24">
          <section className="relative overflow-hidden pt-32 pb-8 sm:pt-40 sm:pb-12">
            <div className="absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-cyan/10 via-brand-indigo/5 to-transparent blur-3xl" />
            </div>
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <nav className="mb-6 flex items-center gap-2 text-sm text-ink-400">
                <Link href="/blog" className="hover:text-brand-cyan transition-colors">博客</Link>
                <span>/</span>
                <span className="text-ink-600 truncate">{post.title}</span>
              </nav>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-brand-cyan/10 px-3 py-1 text-xs font-medium text-brand-cyan">{post.category}</span>
                <span className="text-sm text-ink-400">{post.date}</span>
                <span className="text-sm text-ink-400">· {post.readTime}</span>
              </div>
              <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{post.title}</h1>
              <p className="mt-4 text-lg text-ink-500 leading-relaxed">{post.excerpt}</p>
            </div>
          </section>
          <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="py-20 text-center text-ink-400">
              <p>本文正在整理中，请稍后访问完整内容。</p>
              <p className="mt-2 text-sm">您也可以查看 <Link href="/blog" className="text-brand-cyan hover:underline">其他文章</Link></p>
            </div>
            <div className="mt-16 border-t border-surface-200 pt-8">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-brand-cyan hover:underline">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                返回博客列表
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}

function renderMarkdown(md: string): string {
  let html = md
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="rounded-xl bg-surface-900 p-4 overflow-x-auto"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="rounded bg-surface-200 px-1.5 py-0.5 text-sm text-ink-800">$1</code>')
    .replace(/^#### (.+)$/gm, '<h4 class="text-lg font-semibold text-ink-900 mt-6 mb-3">$1</h4>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-ink-900 mt-8 mb-4">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-ink-900 mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-ink-900 mt-12 mb-6">$1</h1>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-xl my-6 max-w-full" loading="lazy" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-brand-cyan hover:underline" target="_blank" rel="noopener">$1</a>')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^---$/gm, '<hr class="my-8 border-surface-200" />')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-brand-cyan pl-4 my-4 text-ink-500 italic">$1</blockquote>')
    .replace(/^(\d+)\. (.+)$/gm, '<li value="$1" class="ml-6 list-decimal text-ink-600 my-1">$2</li>')
    .replace(/^[*-] (.+)$/gm, '<li class="ml-6 list-disc text-ink-600 my-1">$1</li>')

  const lines = html.split('\n')
  const result: string[] = []
  for (const line of lines) {
    if (line.trim() === '') { result.push(''); continue }
    if (line.startsWith('<')) { result.push(line); continue }
    if (result.length > 0 && result[result.length - 1] !== '' && !result[result.length - 1].startsWith('<')) {
      result[result.length - 1] += '<br />' + line
    } else {
      result.push(`<p class="text-ink-600 leading-relaxed my-4">${line}</p>`)
    }
  }
  return result.join('\n')
}
