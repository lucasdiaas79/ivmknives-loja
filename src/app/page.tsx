import Link from 'next/link';
import { getProducts } from '@/lib/catalog';
import { CATEGORIES, slugify } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { Marker } from '@/components/Marker';
import { Diamond, IconArrow } from '@/components/Icons';
import { HeroVideo } from '@/components/HeroVideo';

const VALUES = [
  { n: '01', t: 'Feita à mão', d: 'Cada faca é desenhada, cortada, temperada e afiada uma a uma na oficina da IVM.' },
  { n: '02', t: 'Aço tratado', d: 'Têmpera e revenimento controlados para o equilíbrio certo entre dureza e resistência.' },
  { n: '03', t: 'Pronta para o campo', d: 'Cabos em G10 facetado e bainhas em Kydex sob medida para cada modelo.' },
];

export default async function Home() {
  const products = await getProducts();
  const hero = products.find((p) => p.slug === 'ranger-tracker') || products[0];
  const bySector = (slug: string) => products.filter((p) => slugify(p.category) === slug);
  const cover: Record<string, string> = { taticas: 'ronin-tanto', edc: 'recon-od', sobrevivencia: 'warlord' };
  const arsenal = [...products].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 8);

  return (
    <>
      <section className="hero-shell">
      <HeroVideo />
      <div className="wrap hero">
        <div className="hero-copy">
          <div className="hud-line mono in1">
            <span>S 21°47′ · W 48°10′</span><span>GRID C-14</span><span className="accent">SCAN 88%</span>
          </div>
          <h1 className="display hero-title in2">Feitas<br />para a <em>missão.</em></h1>
          <p className="lead in3">Facas táticas, EDC e de sobrevivência feitas à mão, uma a uma. Aço de verdade para quem não pode falhar.</p>
          <div className="hero-cta in4">
            <Link href="/arsenal" className="btn btn-accent">Ver arsenal</Link>
            <a href="#setores" className="btn btn-ghost">Conhecer setores</a>
          </div>
        </div>
        <div className="hero-feature in3">
          <div className="feature-label mono"><span>DESTAQUE · {hero.code}</span><span className="m-rule" /><span className="gdot" /></div>
          <ProductCard product={hero} priority big />
        </div>
      </div>
      </section>

      <section className="wrap block" id="setores">
        <Marker title="Setores" meta={`3 categorias · ${products.length} unidades`} />
        <div className="grid3">
          {CATEGORIES.map((c, i) => {
            const items = bySector(c.slug);
            const img = products.find((p) => p.slug === cover[c.slug])?.image || items[0]?.image;
            return (
              <Link key={c.slug} href={`/arsenal?setor=${c.slug}`} className="card sector reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="ph sector-ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" width={800} height={1000} loading="lazy" />
                </span>
                <span className="sector-body">
                  <span className="sector-top mono"><span>{c.sector}</span><span className="accent">{items.length} {items.length === 1 ? 'modelo' : 'modelos'}</span></span>
                  <span className="display sector-name">{c.label}</span>
                  <span className="sector-line">{c.line}</span>
                  <span className="more mono">Explorar <IconArrow size={14} /></span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="wrap block" id="arsenal">
        <Marker title="Arsenal" meta={`${products.length} unidades em campo`} />
        <div className="chips reveal">
          <Link href="/arsenal" className="chipbtn on">Todas</Link>
          {CATEGORIES.map((c) => <Link key={c.slug} href={`/arsenal?setor=${c.slug}`} className="chipbtn">{c.label}</Link>)}
        </div>
        <div className="grid4">
          {arsenal.map((p, i) => (
            <div key={p.slug} className="reveal" style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        <div className="center reveal"><Link href="/arsenal" className="btn btn-ghost">Ver todas as {products.length} <IconArrow size={14} /></Link></div>
      </section>

      <section className="wrap block">
        <Marker title="Oficina" meta="Do traço ao aço" />
        <div className="grid3">
          {VALUES.map((v, i) => (
            <div key={v.n} className="card value reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="mono value-n">{v.n}</span>
              <span className="display value-t">{v.t}</span>
              <p>{v.d}</p>
            </div>
          ))}
        </div>
        <ul className="strip mono reveal" aria-label="Diferenciais">
          <li><Diamond />Feita à mão</li><li><Diamond />Aço tratado</li><li><Diamond />G10 facetado</li><li><Diamond />Bainha Kydex inclusa</li>
        </ul>
      </section>
    </>
  );
}
