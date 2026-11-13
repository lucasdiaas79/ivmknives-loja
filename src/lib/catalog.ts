import 'server-only';
import raw from '@/data/catalogo.json';
import type { DepartmentSlug, Product } from './types';
export type { Product } from './types';

type RawItem = {
  codigo: string; slug: string; nome: string; departamento: DepartmentSlug; categoria: string; preco: number | null;
  foto: string; descricao: string; destaque: boolean; resumo: string[]; ficha: [string, string][]; esgotado?: boolean;
};

// Versão de apresentação: catálogo lido de um arquivo local.
// Na versão com painel, esta função passa a ler do banco (Supabase), como na HL Parfums.
export async function getProducts(department?: DepartmentSlug): Promise<Product[]> {
  const all = (raw as RawItem[]).map((r) => ({
    code: r.codigo,
    slug: r.slug,
    name: r.nome,
    department: r.departamento,
    category: r.categoria,
    price: r.preco,
    image: '/' + r.foto,
    description: r.descricao,
    summary: r.resumo,
    ficha: r.ficha,
    available: !r.esgotado,
    featured: r.destaque,
  }));
  return department ? all.filter((p) => p.department === department) : all;
}
