import 'server-only';
import raw from '@/data/catalogo.json';
import type { Ficha, Product } from './types';
export type { Product } from './types';

type RawItem = {
  codigo: string; slug: string; nome: string; categoria: string; preco: number | null;
  foto: string; descricao: string; destaque: boolean; ficha: Ficha; esgotado?: boolean;
};

// Versão de apresentação: catálogo lido de um arquivo local.
// Na versão com painel, esta função passa a ler do banco (Supabase), como na HL Parfums.
export async function getProducts(): Promise<Product[]> {
  return (raw as RawItem[]).map((r) => ({
    code: r.codigo,
    slug: r.slug,
    name: r.nome,
    category: r.categoria,
    price: r.preco,
    image: '/' + r.foto,
    description: r.descricao,
    ficha: r.ficha,
    available: !r.esgotado,
    featured: r.destaque,
  }));
}
