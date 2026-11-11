// Título de seção no estilo "marcador de mapa": NOME •——— meta
export function Marker({ title, meta, as: Tag = 'h2' }: { title: string; meta?: string; as?: 'h1' | 'h2' }) {
  return (
    <div className="marker reveal">
      <Tag className="display">{title}</Tag>
      <span className="m-dot" aria-hidden="true" />
      <span className="m-rule" aria-hidden="true" />
      {meta && <span className="mono m-meta">{meta}</span>}
    </div>
  );
}
