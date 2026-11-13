import Link from 'next/link';
import { getProducts } from '@/lib/catalog';
import { dept } from '@/lib/types';
import { Marker } from '@/components/Marker';
import { Shelf } from '@/components/Shelf';
import { BlogMenu } from '@/components/BlogMenu';
import { Diamond, IconArrow } from '@/components/Icons';
import { HeroVideo } from '@/components/HeroVideo';
import { POSTS } from '@/data/blog';

const PILLARS = [
  { n: '01', t: 'Projeto', d: 'Toda faca nasce no papel: desenho técnico, medidas e ergonomia pensados antes do primeiro corte.' },
  { n: '02', t: 'Materiais', d: 'Aços como D2, 1095 e 5160, cabos em G10, micarta e madeira nobre, bainhas em Kydex e couro.' },
  { n: '03', t: 'Feita à mão', d: 'Corte, têmpera, acabamento e afiação feitos à mão, um detalhe de cada vez.' },
  { n: '04', t: 'Qualidade', d: 'Produção limitada e cada peça conferida antes de sair. Qualidade acima da quantidade.' },
];
const AUDIENCE = ['Colecionadores', 'EDC', 'Bushcraft', 'Camping', 'Caça', 'Pesca', 'Segurança pública'];

export default async function Home() {
  const all = await getProducts();
  const facas = all.filter((p) => p.department === 'facas');
  const bainhas = all.filter((p) => p.department === 'bainhas');
  const acessorios = all.filter((p) => p.department === 'acessorios');
  const F = dept('facas'), B = dept('bainhas'), A = dept('acessorios');
  const featuredPosts = ['aco-carbono-ou-inox', 'cabo-g10', 'formatos-de-lamina'].map((s) => POSTS.find((p) => p.slug === s)!);

  return (
    <>
      <section className="hero-shell">
        <HeroVideo />
        <div className="wrap hero">
          <div className="hero-copy">
            <div className="hud-line mono in1">
              <span>S 21°47′ · W 48°10′</span><span>GRID C-14</span><span className="accent">SCAN 88%</span><span>IVM-01 · SPECTRE</span>
            </div>
            <h1 className="display hero-title in2">Feitas<br />para a <em>missão.</em></h1>
            <p className="lead in3">Facas artesanais de alto desempenho para quem busca qualidade, resistência e confiança. Feitas para acompanhar você por muitos anos, em qualquer desafio.</p>
            <div className="hero-cta in4">
              <Link href="/facas" className="btn btn-accent">Ver facas</Link>
              <a href="#sobre" className="btn btn-ghost">Conhecer a IVM</a>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap block" id="facas">
        <Marker title="Facas" meta={`${F.sector} · ${facas.length} modelos`} />
        <Shelf products={facas} categories={F.categories} href="/facas" allLabel="Ver todas as facas" />
      </section>

      <section className="wrap block sobre" id="sobre">
        <Marker title="Sobre a IVM" meta="Facas feitas com propósito" />
        <div className="sobre-grid">
          <div className="sobre-copy reveal">
            <p className="display sobre-lead">Não criamos facas apenas para serem admiradas. Criamos ferramentas para serem <em>usadas.</em></p>
            <p className="sobre-text">A IVM Facas Custom projeta e fabrica facas artesanais que unem desempenho, resistência e personalidade. Cada peça é pensada em cada detalhe, do desenho à afiação, para acompanhar quem a usa por muitos anos.</p>
            <div className="audience">
              <span className="mono cap">Para quem fazemos</span>
              <ul className="mono">{AUDIENCE.map((a) => <li key={a}><Diamond />{a}</li>)}</ul>
            </div>
          </div>
          <div className="pillars">
            {PILLARS.map((v, i) => (
              <div key={v.n} className="card pillar reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="mono value-n">{v.n}</span>
                <span className="display value-t">{v.t}</span>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
        <ul className="strip mono reveal" aria-label="Diferenciais">
          <li><Diamond />Projetos exclusivos</li><li><Diamond />Personalização sob encomenda</li><li><Diamond />Gravação a laser</li><li><Diamond />Direto com o fabricante</li>
        </ul>
      </section>

      <section className="wrap block" id="bainhas">
        <Marker title="Bainhas" meta={`${B.sector} · Kydex e couro`} />
        <Shelf products={bainhas} categories={B.categories} href="/bainhas" allLabel="Ver todas as bainhas" />
      </section>

      <section className="wrap block" id="acessorios">
        <Marker title="Acessórios EDC" meta={`${A.sector} · ${acessorios.length} itens`} />
        <Shelf products={acessorios} categories={A.categories} href="/acessorios" max={4} allLabel="Ver acessórios" />
      </section>

      <section className="wrap block" id="blog">
        <Marker title="Blog" meta="Aços, cabos, modelos e usos" />
        <div className="blog-home">
          <div className="reveal"><BlogMenu /></div>
          <div className="post-grid">
            {featuredPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="card post-card reveal">
                <span className="mono muted">{p.minutes} min de leitura</span>
                <span className="display post-title">{p.title}</span>
                <span className="post-ex">{p.excerpt}</span>
                <span className="more mono">Ler <IconArrow size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
        <div className="center reveal"><Link href="/blog" className="btn btn-ghost">Ir para o blog <IconArrow size={14} /></Link></div>
      </section>
    </>
  );
}
