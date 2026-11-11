'use client';

import { useEffect, useRef, useState } from 'react';

// Vídeo de fundo do hero: desenho técnico que vira faca, em loop.
// Versão horizontal para telas deitadas e vertical para telas em pé.
// iOS só faz autoplay se o vídeo estiver com os atributos muted + playsinline no elemento,
// então eles são aplicados direto no DOM antes de definir a fonte.
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
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.poster = `/video/hero-${kind}.jpg`;
    if (reduce) return; // fica só o pôster
    v.src = `/video/hero-${kind}.mp4`;
    v.load();

    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    // Se o navegador bloquear (ex.: modo de economia de bateria), tenta de novo no primeiro toque/rolagem.
    const retry = () => { tryPlay(); };
    window.addEventListener('touchstart', retry, { once: true, passive: true });
    window.addEventListener('scroll', retry, { once: true, passive: true });
    window.addEventListener('click', retry, { once: true });

    // Pausa quando sai da tela (economiza bateria) e volta quando reaparece.
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? tryPlay() : v.pause()), { threshold: 0.05 });
    io.observe(v);
    const onVis = () => (document.hidden ? v.pause() : tryPlay());
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('touchstart', retry);
      window.removeEventListener('scroll', retry);
      window.removeEventListener('click', retry);
    };
  }, [kind]);

  return (
    <div className="hero-video" aria-hidden="true">
      <video ref={ref} loop autoPlay muted playsInline preload="auto" disablePictureInPicture disableRemotePlayback />
    </div>
  );
}
