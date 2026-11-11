import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="wrap page-head" style={{ minHeight: '60vh' }}>
      <span className="mono eyebrow">ERRO 404 · FORA DO MAPA</span>
      <h1 className="display page-title">Rota perdida</h1>
      <p className="lead">Esta página não existe ou saiu do arsenal.</p>
      <div style={{ marginTop: 28 }}><Link href="/arsenal" className="btn btn-gold">Voltar ao arsenal</Link></div>
    </section>
  );
}
