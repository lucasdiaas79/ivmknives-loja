'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CATEGORIES, slugify } from '@/lib/types';
import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { IconSearch } from './Icons';

const SORTS = [
  { v: '', label: 'Destaques' },
  { v: 'menor', label: 'Menor preço' },
  { v: 'maior', label: 'Maior preço' },
  { v: 'az', label: 'A–Z' },
];
const RANGES = [
  { v: '', label: 'Qualquer preço', min: 0, max: Infinity },
  { v: 'ate-600', label: 'Até R$ 600', min: 0, max: 600 },
  { v: '600-900', label: 'R$ 600 a 900', min: 600, max: 900 },
  { v: 'acima-900', label: 'Acima de R$ 900', min: 900.01, max: Infinity },
];
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function CatalogBrowser({ products }: { products: Product[] }) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const setor = sp.get('setor') || '';
  const faixa = sp.get('preco') || '';
  const q = sp.get('q') || '';
  const ordem = sp.get('ordem') || '';

  const set = (key: string, val: string) => {
    const next = new URLSearchParams(sp.toString());
    if (val) next.set(key, val);
    else next.delete(key);
    router.replace(`${pathname}${next.toString() ? `?${next}` : ''}`, { scroll: false });
  };

  const cat = CATEGORIES.find((c) => c.slug === setor);
  const range = RANGES.find((r) => r.v === faixa) || RANGES[0];

  const list = useMemo(() => {
    let l = products.slice();
    if (cat) l = l.filter((p) => slugify(p.category) === cat.slug);
    if (range.v) l = l.filter((p) => p.price !== null && p.price >= range.min && p.price <= range.max);
    if (q) {
      const t = norm(q);
      l = l.filter((p) => norm(`${p.name} ${p.code} ${p.category} ${p.ficha.aco} ${p.ficha.cabo}`).includes(t));
    }
    if (ordem === 'menor') l.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    else if (ordem === 'maior') l.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    else if (ordem === 'az') l.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
    else l.sort((a, b) => Number(b.featured) - Number(a.featured));
    return l;
  }, [products, cat, range, q, ordem]);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of products) m[slugify(p.category)] = (m[slugify(p.category)] || 0) + 1;
    return m;
  }, [products]);

  return (
    <>
      <section className="wrap page-head">
        <span className="mono eyebrow">{cat ? cat.sector : 'ARSENAL'} · IVM CUSTOM KNIVES</span>
        <h1 className="display page-title">{cat ? cat.label : 'Arsenal'}</h1>
        <p className="lead">{cat ? cat.line : 'Todas as facas IVM em campo. Filtre por setor, faixa de preço ou procure pelo nome, aço ou cabo.'}</p>
      </section>

      <div className="filters">
        <div className="wrap filters-row">
          <div className="seg" role="group" aria-label="Setor">
            <button aria-pressed={!setor} onClick={() => set('setor', '')}>Todas <span className="mono">{products.length}</span></button>
            {CATEGORIES.map((c) => (
              <button key={c.slug} aria-pressed={setor === c.slug} onClick={() => set('setor', c.slug)}>
                {c.label} <span className="mono">{counts[c.slug] || 0}</span>
              </button>
            ))}
          </div>
          <div className="filters-tools">
            <label className="field-search">
              <span className="sr-only">Buscar</span>
              <IconSearch size={16} />
              <input type="search" placeholder="Buscar por nome, aço ou cabo" defaultValue={q} key={q}
                onKeyDown={(e) => e.key === 'Enter' && set('q', (e.target as HTMLInputElement).value.trim())}
                onBlur={(e) => e.target.value.trim() !== q && set('q', e.target.value.trim())} />
            </label>
            <label className="sr-only" htmlFor="f-preco">Faixa de preço</label>
            <select id="f-preco" className="field mono" value={faixa} onChange={(e) => set('preco', e.target.value)}>
              {RANGES.map((r) => <option key={r.v} value={r.v}>{r.label}</option>)}
            </select>
            <label className="sr-only" htmlFor="f-ordem">Ordenar</label>
            <select id="f-ordem" className="field mono" value={ordem} onChange={(e) => set('ordem', e.target.value)}>
              {SORTS.map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <section className="wrap list-wrap">
        <p className="mono count" aria-live="polite">{list.length} {list.length === 1 ? 'unidade encontrada' : 'unidades encontradas'}</p>
        {list.length ? (
          <div className="grid4">
            {list.map((p, i) => (
              <div key={p.slug} className="reveal" style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                <ProductCard product={p} priority={i < 4} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty card">
            <h2 className="display">Nada no radar</h2>
            <p>Nenhuma faca com esses filtros. Tente outro nome ou limpe a busca.</p>
            <Link href="/arsenal" className="btn btn-ghost">Limpar filtros</Link>
          </div>
        )}
      </section>
    </>
  );
}
