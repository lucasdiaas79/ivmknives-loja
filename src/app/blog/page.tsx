import Link from 'next/link';
import type { Metadata } from 'next';
import { GROUPS, postsOf } from '@/data/blog';
import { BlogMenu } from '@/components/BlogMenu';
import { Marker } from '@/components/Marker';
import { IconArrow } from '@/components/Icons';

export const metadata: Metadata = { title: 'Blog', description: 'Aços, cabos, modelos e usos: o que saber antes de escolher a sua faca.' };

export default function BlogPage() {
  return (
    <>
      <section className="wrap page-head">
        <span className="mono eyebrow">BLOG · IVM FACAS CUSTOM</span>
        <h1 className="display page-title">Blog</h1>
        <p className="lead">Aços, cabos, modelos e usos. O que vale saber antes de escolher a sua faca.</p>
      </section>
      <section className="wrap blog-layout">
        <aside className="blog-aside"><BlogMenu /></aside>
        <div className="blog-main">
          {GROUPS.map((g) => (
            <div key={g.slug} className="blog-group" id={g.slug}>
              <Marker title={g.label} meta={`${postsOf(g.slug).length} tópicos`} />
              <div className="post-grid">
                {postsOf(g.slug).map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="card post-card">
                    <span className="mono muted">{p.minutes} min de leitura</span>
                    <span className="display post-title">{p.title}</span>
                    <span className="post-ex">{p.excerpt}</span>
                    <span className="more mono">Ler <IconArrow size={14} /></span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
