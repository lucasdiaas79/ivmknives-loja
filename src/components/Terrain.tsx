'use client';

import { useEffect, useRef } from 'react';

// Fundo contínuo: mapa de terreno + curvas de nível que se desloca com o scroll,
// grade de reconhecimento, linha de varredura e leitura de coordenadas.
export function Terrain() {
  const bg = useRef<HTMLDivElement>(null);
  const lat = useRef<HTMLSpanElement>(null);
  const lon = useRef<HTMLSpanElement>(null);
  const scan = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const dms = (v: number) => {
      const d = Math.floor(v), m = (v - d) * 60, mi = Math.floor(m), s = Math.floor((m - mi) * 60);
      return `${d}°${String(mi).padStart(2, '0')}′${String(s).padStart(2, '0')}″`;
    };
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (bg.current && !reduce) bg.current.style.transform = `translate3d(0, ${-((y * 0.22) % 3200)}px, 0)`;
      if (lat.current) lat.current.textContent = 'S ' + dms(21.787 + y * 0.000021);
      if (lon.current) lon.current.textContent = 'W ' + dms(48.176 + y * 0.000013);
      if (scan.current) scan.current.textContent = String(Math.round((y / max) * 100)).padStart(2, '0');
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div className="terrain" ref={bg} aria-hidden="true" />
      <div className="hudgrid" aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="readout mono" aria-hidden="true">
        <span ref={lat}>S 21°47′13″</span>
        <span ref={lon}>W 48°10′33″</span>
        <span>SCAN <b ref={scan}>00</b>%</span>
      </div>
    </>
  );
}
