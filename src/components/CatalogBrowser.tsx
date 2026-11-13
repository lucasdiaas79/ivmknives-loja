'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { slugify } from '@/lib/types';
import type { Department, Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { IconSearch } from './Icons';

const SORTS = [
  { v: '', label: 'Destaques' },
  { v: 'menor', label: 'Menor preço' },
  { v: 'maior', label: 'Maior preço' },
  { v: 'az', label: 'A–Z' },
];
const RANGES: Record<string, { v: string; label: string; min: number; max: number }[]> = {
  facas: [
    { v: '', label: 'Qualquer preço', min: 0, max: Infinity },
    { v: 'ate-600', label: 'Até R$ 600', min: 0, max: 600 },
    { v: '600-900', label: 'R$ 600 a 900', min: 600, max: 900 },
    { v: 'acima-900', label: 'Acima de R$ 900', min: 900.01, max: Infinity },
  ],
  default: [
    { v: '', label: 'Qualquer preço', min: 0, max: Infinity },
    { v: 'ate-250', label: 'Até R$ 250', min: 0, max: 250 },
    { v: 'acima-250', label: 'Acima de R$ 250', min: 250.01, max: Infinity },
  ],
};
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function CatalogBrowser({ products, department }: { products: Product[]; department: Department }) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const catSlug = sp.get('cat') || '';
  const faixa = sp.get('preco') || '';
  const q = sp.get('q') || '';
  const ordem = sp.get('ordem') || '';
  const ranges = RANGES[department.slug] || RANGES.default;

  const set = (key: string, val: string) => {
    const next = new URLSearchParams(sp.toString());
    if (val) next.set(key, val);
    else next.delete(key);
    router.replace(`${pathname}${next.toString() ? `?${next}` : ''}`, { scroll: false });
  };

  const cat = department.categories.find((c) => c.slug === catSlug);
  const range = ranges.find((r) => r.v === faixa) || ranges[0];

  const list = useMemo(() => {
    let l = products.slice();
    if (cat) l = l.filter((p) => slugify(p.category) === cat.slug);
    if (range.v) l = l.filter((p) => p.price !== null && p.price >= range.min && p.price <= range.max);
    if (q) {
      const t = norm(q);
      l = l.filter((p) => norm(`${p.name} ${p.code} ${p.category} ${p.summary.join(' ')} ${p.ficha.map((f) => f[1]).join(' ')}`).includes(t));
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

  const filtered = Boolean(range.v || q);

  return (
    <>
      <section className="wrap page-head">
        <span className="mono eyebrow">{department.sector} · {department.label.toUpperCase()}{cat ? ` · ${cat.label.toUpperCase()}` : ''}</span>
        <h1 className="display page-title">{cat ? cat.label : department.title}</h1>
        <p className="lead">{cat ? cat.line : department.intro}</p>
      </section>

      <div className="filters">
        <div className="wrap filters-row">
          {department.categories.length > 0 && (
            <div className="seg" role="group" aria-label="Categoria">
              <button aria-pressed={!catSlug} onClick={() => set('cat', '')}>Todas <span className="mono">{products.length}</span></button>
              {department.categories.map((c) => (
                <button key={c.slug} aria-pressed={catSlug === c.slug} onClick={() => set('cat', c.slug)}>
                  {c.label} <span className="mono">{counts[c.slug] || 0}</span>
                </button>
              ))}
            </div>
          )}
          <div className="filters-tools">
            <label className="field-search">
              <span className="sr-only">Buscar</span>
              <IconSearch size={16} />
              <input type="search" placeholder="Buscar por nome ou material" defaultValue={q} key={q}
                onKeyDown={(e) => e.key === 'Enter' && set('q', (e.target as HTMLInputElement).value.trim())}
                onBlur={(e) => e.target.value.trim() !== q && set('q', e.target.value.trim())} />
            </label>
            <label className="sr-only" htmlFor="f-preco">Faixa de preço</label>
            <select id="f-preco" className="field mono" value={faixa} onChange={(e) => set('preco', e.target.value)}>
              {ranges.map((r) => <option key={r.v} value={r.v}>{r.label}</option>)}
            </select>
            <label className="sr-only" htmlFor="f-ordem">Ordenar</label>
            <select id="f-ordem" className="field mono" value={ordem} onChange={(e) => set('ordem', e.target.value)}>
              {SORTS.map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <section className="wrap list-wrap">
        <p className="mono count" aria-live="polite">{list.length} {list.length === 1 ? 'item encontrado' : 'itens encontrados'}</p>
        {list.length ? (
          <div className="grid4">
            {list.map((p, i) => (
              <div key={p.slug} className="fadein" style={{ animationDelay: `${(i % 4) * 60}ms` }}>
                <ProductCard product={p} priority={i < 4} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty card">
            {cat?.empty && !filtered ? (
              <>
                <span className="mono eyebrow">{cat.label}</span>
                <h2 className="display">{cat.slug === 'sob-encomenda' ? 'Projeto exclusivo' : 'Em breve'}</h2>
                <p>{cat.empty}</p>
              </>
            ) : (
              <>
                <h2 className="display">Nada no radar</h2>
                <p>Nenhum item com esses filtros. Tente outro nome ou limpe a busca.</p>
              </>
            )}
            <Link href={pathname} className="btn btn-ghost">Ver tudo</Link>
          </div>
        )}
      </section>
    </>
  );
}
