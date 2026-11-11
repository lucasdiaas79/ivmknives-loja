# IVM Custom Knives — Loja (versão de apresentação)

Catálogo da IVM Custom Knives: facas táticas, EDC e de sobrevivência.
Next.js 15 (App Router), sem banco: o catálogo vem de `src/data/catalogo.json`.

> Versão para aprovação: nomes, preços e fichas técnicas são **fictícios**. Ainda sem canal de venda (WhatsApp entra após a aprovação).

## Rodar
```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Deploy (Vercel)
Importar o repositório na Vercel, framework Next.js, sem variáveis de ambiente.

## Estrutura
- `src/app/page.tsx` — home (hero, setores, arsenal, oficina)
- `src/app/arsenal` — catálogo com filtros (setor, faixa de preço, busca, ordenação)
- `src/app/faca/[slug]` — página da faca com ficha técnica
- `src/components/Terrain.tsx` — fundo de mapa com curvas de nível, grade e leitura de coordenadas no scroll
- `src/data/catalogo.json` — facas (código, nome, setor, preço, foto, descrição, ficha)
- `public/fotos` — fotos tratadas (800×1000)

## Próximas etapas
- Painel administrativo e banco (Supabase), no mesmo modelo da HL Parfums
- Canal de venda (WhatsApp) e dados reais das facas
