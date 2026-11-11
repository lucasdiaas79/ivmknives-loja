'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/types';
import { IconClose, IconMenu } from './Icons';

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className={`top${solid ? ' solid' : ''}`}>
      <div className="wrap top-row">
        <Link href="/" className="brand" aria-label="IVM Custom Knives, início">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/ivm-logo.png" alt="" width={52} height={52} />
          <span className="brand-word">
            <b>IVM</b>
            <small className="mono">CUSTOM KNIVES</small>
          </span>
        </Link>
        <nav className="nav mono" aria-label="Categorias">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/arsenal?setor=${c.slug}`}>{c.label}</Link>
          ))}
          <Link href="/arsenal">Arsenal</Link>
        </nav>
        <button className="icon-btn menu-btn" onClick={() => setOpen(true)} aria-label="Abrir menu" aria-expanded={open}>
          <IconMenu />
        </button>
      </div>
      {open && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="wrap top-row">
            <span className="mono drawer-cap">MENU · NAVEGAÇÃO</span>
            <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Fechar menu"><IconClose /></button>
          </div>
          <nav className="wrap drawer-nav">
            <Link href="/arsenal">Arsenal</Link>
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/arsenal?setor=${c.slug}`}>{c.label}<span className="mono">{c.sector}</span></Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
