import Link from 'next/link';
import { SITE } from '@/lib/site';
import { IconInstagram } from './Icons';

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/ivm-logo.png" alt="IVM Facas Custom" width={96} height={96} />
          <p className="display foot-tag">{SITE.tagline}</p>
          <p>{SITE.about}</p>
        </div>
        <div className="foot-col">
          <span className="mono cap">Loja</span>
          <Link href="/facas">Facas</Link>
          <Link href="/bainhas">Bainhas</Link>
          <Link href="/acessorios">Acessórios EDC</Link>
          <Link href="/facas?cat=sob-encomenda">Sob encomenda</Link>
        </div>
        <div className="foot-col">
          <span className="mono cap">IVM</span>
          <Link href="/#sobre">Sobre a IVM</Link>
          <Link href="/blog">Blog</Link>
          <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-ic"><IconInstagram size={16} /> {SITE.instagram}</a>
        </div>
      </div>
      <div className="wrap foot-base mono">
        <span>© {new Date().getFullYear()} IVM Facas Custom · {SITE.tagline}</span>
        <span>Venda proibida para menores de 18 anos</span>
      </div>
    </footer>
  );
}
