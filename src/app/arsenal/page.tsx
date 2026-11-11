import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getProducts } from '@/lib/catalog';
import { CatalogBrowser } from '@/components/CatalogBrowser';

export const metadata: Metadata = { title: 'Arsenal' };

export default async function ArsenalPage() {
  const products = await getProducts();
  return (
    <Suspense fallback={<div className="wrap page-head"><h1 className="display page-title">Arsenal</h1></div>}>
      <CatalogBrowser products={products} />
    </Suspense>
  );
}
