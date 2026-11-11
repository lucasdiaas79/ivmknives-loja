'use client';

import { useEffect, useRef } from 'react';

// Vídeo de fundo do hero (desenho técnico que vira faca), em loop.
// O <video> é escrito como HTML puro para que os atributos autoplay/muted/playsinline
// já venham no HTML do servidor — é o que o iPhone e o Android exigem para tocar sozinho.
// Duas versões: horizontal (telas deitadas) e vertical (telas em pé); o CSS mostra uma só.
const attrs = 'autoplay muted loop playsinline webkit-playsinline disablepictureinpicture disableremoteplayback preload="auto"';
const html =
  `<video class="hv hv-desk" ${attrs} poster="/video/hero-desk.jpg"><source src="/video/hero-desk.mp4" type="video/mp4"></video>` +
  `<video class="hv hv-mob" ${attrs} poster="/video/hero-mob.jpg"><source src="/video/hero-mob.mp4" type="video/mp4"></video>`;

export function HeroVideo() {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = box.current;
    if (!root) return;
    const vids = Array.from(root.querySelectorAll('video'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      vids.forEach((v) => v.pause());
      return;
    }
    const visible = () => vids.find((v) => v.offsetParent !== null || getComputedStyle(v).display !== 'none');
    const play = () => {
      vids.forEach((v) => { v.muted = true; });
      const v = visible();
      vids.forEach((o) => o !== v && o.pause());
      v?.play().catch(() => {});
    };
    play();
    // Navegador bloqueou (ex.: economia de bateria): tenta de novo no primeiro toque/rolagem.
    const evs = ['touchend', 'touchstart', 'click', 'scroll', 'keydown'];
    const kick = () => play();
    evs.forEach((e) => window.addEventListener(e, kick, { passive: true }));
    const stopKick = () => evs.forEach((e) => window.removeEventListener(e, kick));
    vids.forEach((v) => v.addEventListener('playing', stopKick, { once: true }));
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : vids.forEach((v) => v.pause())), { threshold: 0.05 });
    io.observe(root);
    const onVis = () => (document.hidden ? vids.forEach((v) => v.pause()) : play());
    document.addEventListener('visibilitychange', onVis);
    const mq = window.matchMedia('(max-aspect-ratio: 1/1)');
    mq.addEventListener('change', play);
    return () => {
      stopKick();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      mq.removeEventListener('change', play);
    };
  }, []);

  return <div className="hero-video" aria-hidden="true" ref={box} dangerouslySetInnerHTML={{ __html: html }} />;
}
