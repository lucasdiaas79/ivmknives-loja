'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { dept } from '@/lib/types';
import { SITE } from '@/lib/site';
import { IconClose, IconMenu } from './Icons';

const NAV = [
  { href: '/facas', label: 'Facas' },
  { href: '/bainhas', label: 'Bainhas' },
  { href: '/acessorios', label: 'Acessórios EDC' },
  { href: '/#sobre', label: 'Sobre' },
  { href: '/blog', label: 'Blog' },
];

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="IVM Facas Custom, início">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/ivm-logo.png" alt="" width={52} height={52} />
      <span className="brand-word">
        <b>IVM</b>
        <small className="mono">FACAS CUSTOM</small>
      </span>
      <span className="brand-tag mono" aria-hidden="true">{SITE.tagline}</span>
    </Link>
  );
}

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
    <header className={`top${solid ? ' solid' : ''}${open ? ' menu-open' : ''}`}>
      <div className="wrap top-row">
        <Brand />
        <nav className="nav mono" aria-label="Principal">
          {NAV.map((n) => <Link key={n.href} href={n.href} aria-current={pathname === n.href ? 'page' : undefined}>{n.label}</Link>)}
        </nav>
        <button className="icon-btn menu-btn" onClick={() => setOpen(true)} aria-label="Abrir menu" aria-expanded={open}>
          <IconMenu />
        </button>
      </div>
      {open && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="wrap top-row">
            <span className="mono drawer-cap">MENU · {SITE.tagline.toUpperCase()}</span>
            <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Fechar menu"><IconClose /></button>
          </div>
          <nav className="wrap drawer-nav">
            <Link href="/facas">Facas<span className="mono">SECTOR 01</span></Link>
            <div className="drawer-sub mono">
              {dept('facas').categories.map((c) => <Link key={c.slug} href={`/facas?cat=${c.slug}`}>{c.label}</Link>)}
            </div>
            <Link href="/bainhas">Bainhas<span className="mono">SECTOR 02</span></Link>
            <Link href="/acessorios">Acessórios EDC<span className="mono">SECTOR 03</span></Link>
            <Link href="/#sobre">Sobre a IVM</Link>
            <Link href="/blog">Blog</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
