'use client';

import type { Product } from '@/lib/types';
import { formatPrice, shortSpec } from '@/lib/types';
import { useProductModal } from './ProductModal';
import { Diamond, IconArrow } from './Icons';

export function ProductCard({ product: p, priority = false, big = false }: { product: Product; priority?: boolean; big?: boolean }) {
  const { open } = useProductModal();
  return (
    <button type="button" className={`card pcard${big ? ' big' : ''}${p.available ? '' : ' out'}`} onClick={() => open(p)} aria-label={`${p.name}, ${p.category}, ${formatPrice(p.price)}. Ver detalhes`}>
      <span className="ph">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt="" width={800} height={1000} loading={priority ? 'eager' : 'lazy'} />
        <span className="chip mono"><Diamond />{p.category}</span>
        <span className="code mono">{p.code}</span>
        {!p.available && <span className="soldout mono">Esgotada</span>}
      </span>
      <span className="pbody">
        <span className="pname display">{p.name}</span>
        <span className="pspec mono">{shortSpec(p)}</span>
        <span className="prow">
          <span className="price mono">{formatPrice(p.price)}</span>
          <span className="more mono">Detalhes <IconArrow size={14} /></span>
        </span>
      </span>
    </button>
  );
}
