export type Ficha = {
  total: string;
  lamina: string;
  espessura: string;
  aco: string;
  cabo: string;
  bainha: string;
};

export type Product = {
  code: string;
  slug: string;
  name: string;
  category: string;
  price: number | null;
  image: string;
  description: string;
  ficha: Ficha;
  available: boolean;
  featured: boolean;
};

export const CATEGORIES = [
  { slug: 'taticas', label: 'Táticas', sector: 'SECTOR 01', line: 'Prontas para qualquer missão.' },
  { slug: 'edc', label: 'EDC', sector: 'SECTOR 02', line: 'No cinto ou no bolso, todo dia.' },
  { slug: 'sobrevivencia', label: 'Sobrevivência', sector: 'SECTOR 03', line: 'Quando só resta você e a mata.' },
] as const;

export const FICHA_LABELS: { key: keyof Ficha; label: string }[] = [
  { key: 'total', label: 'Comprimento' },
  { key: 'lamina', label: 'Lâmina' },
  { key: 'espessura', label: 'Espessura' },
  { key: 'aco', label: 'Aço' },
  { key: 'cabo', label: 'Cabo' },
  { key: 'bainha', label: 'Bainha' },
];

export function slugify(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function formatPrice(v: number | null) {
  if (v === null) return 'Sob consulta';
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

export function shortSpec(p: Product) {
  return [p.ficha.lamina.startsWith('Cabeça') ? 'Machadinha' : `Lâmina ${p.ficha.lamina}`, p.ficha.aco.split(' · ')[0], p.ficha.cabo.split(' ')[0]].join(' · ');
}
