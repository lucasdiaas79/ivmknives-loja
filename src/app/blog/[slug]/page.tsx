import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { POSTS, groupOf, postsOf } from '@/data/blog';
import { BlogMenu } from '@/components/BlogMenu';
import { IconArrow } from '@/components/Icons';

type Params = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return POSTS.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) notFound();
  const g = groupOf(p.group);
  const siblings = postsOf(p.group);
  const idx = siblings.findIndex((x) => x.slug === p.slug);
  const next = siblings[(idx + 1) % siblings.length];

  return (
    <section className="wrap blog-layout post-page">
      <aside className="blog-aside"><BlogMenu current={p.slug} startOpen={p.group} /></aside>
      <article className="post">
        <nav className="crumbs mono" aria-label="Você está em">
          <Link href="/blog">Blog</Link><span>/</span><Link href={`/blog#${g.slug}`}>{g.label}</Link>
        </nav>
        <h1 className="display post-h1">{p.title}</h1>
        <p className="lead">{p.excerpt}</p>
        <span className="mono muted post-meta">{p.minutes} MIN DE LEITURA · IVM FACAS CUSTOM</span>
        <div className="post-body">
          {p.body.map((b, i) =>
            b.h ? <h2 key={i} className="display">{b.h}</h2>
            : b.list ? <ul key={i}>{b.list.map((li) => <li key={li}>{li}</li>)}</ul>
            : <p key={i}>{b.p}</p>,
          )}
        </div>
        {next && next.slug !== p.slug && (
          <Link href={`/blog/${next.slug}`} className="card post-next">
            <span className="mono muted">Próximo em {g.label}</span>
            <span className="display">{next.title}</span>
            <IconArrow />
          </Link>
        )}
      </article>
    </section>
  );
}
