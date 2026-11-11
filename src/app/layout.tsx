import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Terrain } from '@/components/Terrain';
import { ProductModalProvider } from '@/components/ProductModal';
import { RevealObserver } from '@/components/Reveal';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'IVM Custom Knives — Facas táticas, EDC e de sobrevivência', template: '%s · IVM Custom Knives' },
  description: 'Facas artesanais de alto desempenho: táticas, EDC e de sobrevivência. Facas feitas com propósito.',
  icons: { icon: '/icon.png', apple: '/apple-icon.png' },
  openGraph: { title: 'IVM Custom Knives', description: SITE.tagline, images: ['/og.jpg'], locale: 'pt_BR', type: 'website' },
  robots: { index: false, follow: false }, // versão de apresentação
};

export const viewport: Viewport = { themeColor: '#050607' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap" />
      </head>
      <body>
        <Terrain />
        <ProductModalProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ProductModalProvider>
        <RevealObserver />
      </body>
    </html>
  );
}
