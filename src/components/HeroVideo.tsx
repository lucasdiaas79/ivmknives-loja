'use client';

import { useEffect, useRef, useState } from 'react';

// Vídeo de fundo do hero: desenho técnico que vira faca, em loop.
// Escolhe a versão horizontal (desktop) ou vertical (celular) pela proporção da tela.
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [kind, setKind] = useState<'desk' | 'mob' | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-aspect-ratio: 1/1)');
    const pick = () => setKind(mq.matches ? 'mob' : 'desk');
    pick();
    mq.addEventListener('change', pick);
    return () => mq.removeEventListener('change', pick);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !kind) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // fica só o pôster
    v.load();
    v.play().catch(() => {});
  }, [kind]);

  return (
    <div className="hero-video" aria-hidden="true">
      {kind && (
        <video ref={ref} key={kind} muted loop playsInline autoPlay preload="auto" poster={`/video/hero-${kind}.jpg`}>
          <source src={`/video/hero-${kind}.webm`} type="video/webm" />
          <source src={`/video/hero-${kind}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
