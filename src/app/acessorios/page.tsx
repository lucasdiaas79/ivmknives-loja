import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getProducts } from '@/lib/catalog';
import { dept } from '@/lib/types';
import { CatalogBrowser } from '@/components/CatalogBrowser';

const D = dept('acessorios');
export const metadata: Metadata = { title: D.title, description: D.intro };

export default async function Page() {
  const products = await getProducts('acessorios');
  return (
    <Suspense fallback={<div className="wrap page-head"><h1 className="display page-title">{D.title}</h1></div>}>
      <CatalogBrowser products={products} department={D} />
    </Suspense>
  );
}
