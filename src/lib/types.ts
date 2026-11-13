export type DepartmentSlug = 'facas' | 'bainhas' | 'acessorios';

export type Product = {
  code: string;
  slug: string;
  name: string;
  department: DepartmentSlug;
  category: string;
  price: number | null;
  image: string;
  description: string;
  summary: string[];
  ficha: [string, string][];
  available: boolean;
  featured: boolean;
};

export type Category = { slug: string; label: string; line: string; empty?: string };
export type Department = { slug: DepartmentSlug; label: string; title: string; sector: string; intro: string; categories: Category[] };

export const DEPARTMENTS: Department[] = [
  {
    slug: 'facas', label: 'Facas', title: 'Facas', sector: 'SECTOR 01',
    intro: 'Facas artesanais para cada missão: do bolso ao mato, da coleção à cozinha.',
    categories: [
      { slug: 'edc', label: 'EDC', line: 'No bolso ou no cinto, todo dia.' },
      { slug: 'taticas', label: 'Táticas', line: 'Prontas para qualquer missão.' },
      { slug: 'bushcraft-outdoor', label: 'Bushcraft & Outdoor', line: 'Para o mato, a trilha e o acampamento.' },
      { slug: 'classicas', label: 'Clássicas', line: 'Formas tradicionais, acabamento de coleção.' },
      { slug: 'machados', label: 'Machados', line: 'Força para rachar, cortar e abrir caminho.' },
      { slug: 'churrasco-cozinha', label: 'Churrasco & Cozinha', line: 'Corte preciso para a brasa e a cozinha.', empty: 'A linha de churrasco e cozinha está em produção na oficina. Em breve no arsenal.' },
      { slug: 'laminas-longas', label: 'Lâminas Longas', line: 'Alcance e peso para trabalho pesado.' },
      { slug: 'sob-encomenda', label: 'Facas Sob Encomenda', line: 'Projetos exclusivos, desenhados com você.', empty: 'Cada faca sob encomenda nasce de um projeto único: formato, aço, cabo e bainha definidos com você, direto com o fabricante.' },
    ],
  },
  {
    slug: 'bainhas', label: 'Bainhas', title: 'Bainhas', sector: 'SECTOR 02',
    intro: 'Bainhas moldadas sob medida para cada faca, em Kydex ou couro.',
    categories: [
      { slug: 'kydex', label: 'Kydex', line: 'Leves, à prova d’água e com retenção firme.' },
      { slug: 'couro', label: 'Couro', line: 'Couro legítimo, costura à mão e visual clássico.' },
    ],
  },
  {
    slug: 'acessorios', label: 'Acessórios EDC', title: 'Acessórios EDC', sector: 'SECTOR 03',
    intro: 'O que acompanha a faca no bolso: luz, escrita e ferramenta.',
    categories: [],
  },
];

export const dept = (slug: DepartmentSlug) => DEPARTMENTS.find((d) => d.slug === slug)!;

export function slugify(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function formatPrice(v: number | null) {
  if (v === null) return 'Sob consulta';
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

export const shortSpec = (p: Product) => p.summary.join(' · ');
