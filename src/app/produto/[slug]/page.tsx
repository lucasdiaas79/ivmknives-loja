import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProducts } from '@/lib/catalog';
import { dept, formatPrice, slugify } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { FichaTable } from '@/components/ProductModal';
import { Marker } from '@/components/Marker';
import { Diamond } from '@/components/Icons';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = (await getProducts()).find((x) => x.slug === slug);
  return p ? { title: p.name, description: p.description, openGraph: { images: [p.image] } } : {};
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const all = await getProducts();
  const p = all.find((x) => x.slug === slug);
  if (!p) notFound();
  const D = dept(p.department);
  const sameCat = all.filter((x) => x.department === p.department && x.category === p.category && x.slug !== p.slug);
  const related = (sameCat.length ? sameCat : all.filter((x) => x.department === p.department && x.slug !== p.slug)).slice(0, 4);
  const catHref = D.categories.length ? `/${D.slug}?cat=${slugify(p.category)}` : `/${D.slug}`;

  return (
    <>
      <section className="wrap detail">
        <nav className="crumbs mono" aria-label="Você está em">
          <Link href={`/${D.slug}`}>{D.label}</Link><span>/</span>
          {D.categories.length > 0 && <><Link href={catHref}>{p.category}</Link><span>/</span></>}
          <span aria-current="page">{p.name}</span>
        </nav>
        <div className="detail-grid">
          <div className="card detail-media ph in1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={`${p.name}, IVM Facas Custom`} width={800} height={1000} />
            <span className="code mono">{p.code}</span>
          </div>
          <div className="detail-info in2">
            <span className="chip-inline mono"><Diamond />{p.category}</span>
            <h1 className="display detail-title">{p.name}</h1>
            <span className="price mono big">{formatPrice(p.price)}</span>
            <p className="lead">{p.description}</p>
            <div className="card ficha-card">
              <span className="mono cap">Ficha técnica · {p.code}</span>
              <FichaTable p={p} />
            </div>
            <p className="note mono">Peça artesanal: pequenas variações de acabamento tornam cada uma única.</p>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="wrap block">
          <Marker title={sameCat.length ? `Mais ${p.category}` : `Mais ${D.label}`} meta={`${related.length} relacionados`} />
          <div className="grid4">
            {related.map((r) => <div key={r.slug} className="reveal"><ProductCard product={r} /></div>)}
          </div>
        </section>
      )}
    </>
  );
}
