'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/types';
import { Diamond, IconClose } from './Icons';

type Ctx = { open: (p: Product) => void };
const ModalCtx = createContext<Ctx>({ open: () => {} });
export const useProductModal = () => useContext(ModalCtx);

export function ProductModalProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<Product | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const open = useCallback((p: Product) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setCurrent(p);
  }, []);
  const close = useCallback(() => {
    setCurrent(null);
    lastFocus.current?.focus?.();
  }, []);
  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [current, close]);
  return (
    <ModalCtx.Provider value={{ open }}>
      {children}
      {current && <Sheet product={current} onClose={close} />}
    </ModalCtx.Provider>
  );
}

export function FichaTable({ p }: { p: Product }) {
  return (
    <dl className="ficha">
      {p.ficha.map(([label, value]) => (
        <div key={label}>
          <dt className="mono">{label}</dt>
          <span aria-hidden="true" className="dots" />
          <dd className="mono">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Sheet({ product: p, onClose }: { product: Product; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => closeRef.current?.focus(), []);
  return (
    <div className="veil" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sheet card" role="dialog" aria-modal="true" aria-labelledby="pm-title">
        <button ref={closeRef} className="icon-btn sheet-close" onClick={onClose} aria-label="Fechar"><IconClose /></button>
        <div className="sheet-media ph">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={`${p.name}, IVM Facas Custom`} width={800} height={1000} />
        </div>
        <div className="sheet-body">
          <div className="sheet-meta">
            <span className="chip-inline mono"><Diamond />{p.category}</span>
            <span className="mono muted">{p.code}</span>
          </div>
          <div className="sheet-head">
            <h2 id="pm-title" className="display">{p.name}</h2>
            <span className="price mono">{formatPrice(p.price)}</span>
          </div>
          <p className="sheet-desc">{p.description}</p>
          <FichaTable p={p} />
          <Link href={`/produto/${p.slug}`} className="btn btn-accent btn-block" onClick={onClose}>Ver ficha completa</Link>
        </div>
      </div>
    </div>
  );
}
