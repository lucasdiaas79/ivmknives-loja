'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Category, Product } from '@/lib/types';
import { slugify } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { IconArrow } from './Icons';

// Vitrine da home com filtros que trocam os produtos na hora, sem sair da página.
export function Shelf({ products, categories, href, max = 8, allLabel }: { products: Product[]; categories: Category[]; href: string; max?: number; allLabel: string }) {
  const [cat, setCat] = useState('');
  const active = categories.find((c) => c.slug === cat);
  const list = useMemo(() => {
    const l = cat ? products.filter((p) => slugify(p.category) === cat) : [...products].sort((a, b) => Number(b.featured) - Number(a.featured));
    return l.slice(0, max);
  }, [products, cat, max]);
  const total = cat ? products.filter((p) => slugify(p.category) === cat).length : products.length;

  return (
    <>
      {categories.length > 0 && (
        <div className="chips" role="group" aria-label="Filtrar">
          <button type="button" className={`chipbtn${!cat ? ' on' : ''}`} aria-pressed={!cat} onClick={() => setCat('')}>Todas</button>
          {categories.map((c) => (
            <button key={c.slug} type="button" className={`chipbtn${cat === c.slug ? ' on' : ''}`} aria-pressed={cat === c.slug} onClick={() => setCat(c.slug)}>{c.label}</button>
          ))}
        </div>
      )}
      {list.length ? (
        <div className="grid4 shelf-grid" key={cat}>
          {list.map((p, i) => (
            <div key={p.slug} className="fadein" style={{ animationDelay: `${(i % 4) * 60}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty card">
          <span className="mono eyebrow">{active?.label}</span>
          <h3 className="display">{active?.slug === 'sob-encomenda' ? 'Projeto exclusivo' : 'Em breve'}</h3>
          <p>{active?.empty || 'Novos modelos chegando à oficina.'}</p>
        </div>
      )}
      <div className="center">
        <Link href={cat ? `${href}?cat=${cat}` : href} className="btn btn-ghost">
          {cat ? `Ver ${active?.label}` : allLabel} {total > 0 && <span className="mono muted">({total})</span>} <IconArrow size={14} />
        </Link>
      </div>
    </>
  );
}
