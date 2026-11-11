import Link from 'next/link';
import { SITE } from '@/lib/site';
import { CATEGORIES } from '@/lib/types';
import { IconInstagram } from './Icons';

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/ivm-logo.png" alt="IVM Custom Knives" width={96} height={96} />
          <p className="display foot-tag">{SITE.tagline}</p>
          <p>{SITE.about}</p>
        </div>
        <div className="foot-col">
          <span className="mono cap">Setores</span>
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/arsenal?setor=${c.slug}`}>{c.label}</Link>
          ))}
          <Link href="/arsenal">Arsenal completo</Link>
        </div>
        <div className="foot-col">
          <span className="mono cap">Base</span>
          <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-ic"><IconInstagram size={16} /> {SITE.instagram}</a>
          <span>Feitas à mão no Brasil</span>
        </div>
      </div>
      <div className="wrap foot-base mono">
        <span>© {new Date().getFullYear()} IVM Custom Knives</span>
        <span>Venda proibida para menores de 18 anos</span>
      </div>
    </footer>
  );
}
