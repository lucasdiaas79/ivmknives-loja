export type Block = { h?: string; p?: string; list?: string[] };
export type Post = { slug: string; group: string; title: string; excerpt: string; minutes: number; body: Block[] };
export type Group = { slug: string; label: string; intro: string };

export const GROUPS: Group[] = [
  { slug: 'acos', label: 'Tipos de aço', intro: 'O aço define dureza, fio e resistência. Entenda as diferenças antes de escolher.' },
  { slug: 'cabos', label: 'Tipos de cabo', intro: 'Pegada, peso e durabilidade: o que muda com cada material de cabo.' },
  { slug: 'modelos', label: 'Modelos e usos', intro: 'Formatos de lâmina, bainhas e qual faca combina com cada uso.' },
];

export const POSTS: Post[] = [
  // ---------- Tipos de aço ----------
  {
    slug: 'aco-carbono-ou-inox', group: 'acos', minutes: 3,
    title: 'Aço carbono ou inox: qual escolher?',
    excerpt: 'A diferença entre os dois vai além da ferrugem. Veja o que cada um entrega no uso real.',
    body: [
      { p: 'Todo aço de faca é uma liga de ferro e carbono. O que separa o “aço carbono” do “inox” é a quantidade de cromo: a partir de cerca de 12% a 13%, o aço passa a resistir bem à corrosão e ganha o nome de inoxidável.' },
      { h: 'Aço carbono' },
      { p: 'Os aços carbono, como o 1070, o 1095 e o 5160, são mais simples, tenazes e fáceis de afiar. Pegam um fio muito agressivo e aguentam impacto. Em troca, pedem cuidado: precisam ser secos e lubrificados, ou criam ferrugem e mancham (a pátina escura, que muitos usuários gostam).' },
      { h: 'Inox' },
      { p: 'Os inox, como o 420 e o 440C, resistem à umidade e ao suor e exigem menos manutenção. Os mais simples seguram o fio por menos tempo; os de maior qualidade equilibram as duas coisas, mas costumam ser mais difíceis de afiar no campo.' },
      { h: 'Na prática' },
      { list: ['Mato, acampamento e trabalho pesado: aço carbono.', 'Pesca, ambiente úmido e cozinha: inox.', 'Uso diário com pouca manutenção: inox ou aço ferramenta como o D2.'] },
    ],
  },
  {
    slug: 'aco-d2', group: 'acos', minutes: 2,
    title: 'Aço D2: dureza e retenção de fio',
    excerpt: 'O aço ferramenta que segura o corte por muito tempo e quase não enferruja.',
    body: [
      { p: 'O D2 é um aço ferramenta com alto teor de carbono e cerca de 12% de cromo. Não chega a ser inox, mas resiste bem melhor à corrosão que os aços carbono comuns, por isso é chamado de “semi-inox”.' },
      { p: 'Seu ponto forte é a retenção de fio: tratado na faixa de 58 a 61 HRC, ele corta por muito tempo antes de pedir afiação. Por isso aparece em facas EDC e táticas, que são usadas todos os dias.' },
      { h: 'Pontos de atenção' },
      { list: ['Afiar leva mais tempo que em aços carbono simples.', 'É menos tenaz: não é o ideal para bater, rachar ou alavancar.', 'Com a umidade constante, pode manchar; basta secar e lubrificar.'] },
    ],
  },
  {
    slug: 'acos-1095-e-5160', group: 'acos', minutes: 3,
    title: '1095 e 5160: os aços do trabalho pesado',
    excerpt: 'Por que esses dois aços carbono são os favoritos para facas de mato, bowies e machados.',
    body: [
      { p: 'O 1095 tem cerca de 0,95% de carbono. Endurece bem, pega um fio muito fino e é simples de afiar, até numa pedra no meio da trilha. É uma escolha clássica para facas de bushcraft e de sobrevivência.' },
      { p: 'O 5160 é um aço de mola com cromo e silício. Sua grande qualidade é a tenacidade: absorve impacto sem lascar ou quebrar. Por isso é usado em facões, lâminas longas e machados, que trabalham batendo.' },
      { h: 'Cuidados' },
      { list: ['Os dois são aços carbono e precisam de óleo depois do uso.', 'Um revestimento ou a pátina natural ajudam a proteger a lâmina.', 'Nunca guarde a faca molhada dentro da bainha.'] },
    ],
  },
  {
    slug: 'o-que-e-hrc', group: 'acos', minutes: 2,
    title: 'O que é HRC e por que ele importa',
    excerpt: 'Aquele número na ficha técnica diz muito sobre como a faca vai se comportar.',
    body: [
      { p: 'HRC é a dureza do aço na escala Rockwell C. Ele não depende só do aço escolhido: é resultado do tratamento térmico, a têmpera e o revenimento feitos na oficina.' },
      { list: ['54 a 56 HRC: mais macio e tenaz, ideal para impacto (machados, facões).', '57 a 59 HRC: equilíbrio entre fio e resistência, bom para uso geral.', '60 HRC ou mais: retém muito o fio, mas fica mais frágil a pancadas e torções.'] },
      { p: 'Não existe “quanto mais, melhor”. A dureza certa é a que combina com o uso da faca. Por isso cada modelo IVM tem o tratamento pensado para a função dele.' },
    ],
  },
  // ---------- Tipos de cabo ----------
  {
    slug: 'cabo-g10', group: 'cabos', minutes: 2,
    title: 'G10: o cabo tático por excelência',
    excerpt: 'Leve, praticamente indestrutível e com pegada firme mesmo molhado.',
    body: [
      { p: 'O G10 é um laminado de fibra de vidro com resina epóxi, prensado em camadas. O resultado é um material leve, muito resistente a impacto, que não absorve água e não se deforma com calor ou frio.' },
      { p: 'Usinado em facetas, como nos cabos IVM, ele cria uma textura que prende a mão mesmo com suor, chuva ou luva. Por isso domina as facas táticas e de EDC.' },
      { list: ['Cores comuns: preto, verde OD, coyote e laranja.', 'Manutenção: só água e sabão.', 'Ponto fraco: textura muito agressiva pode desgastar o bolso da calça.'] },
    ],
  },
  {
    slug: 'cabo-micarta', group: 'cabos', minutes: 2,
    title: 'Micarta: pegada e tradição',
    excerpt: 'Tecido e resina viram um cabo quente ao toque, que melhora com o uso.',
    body: [
      { p: 'A micarta é feita de camadas de tecido, como lona ou linho, impregnadas com resina. Tem aparência mais orgânica que o G10 e uma pegada que fica mais aderente quando úmida.' },
      { p: 'Com o tempo, ganha marcas de uso e uma cor própria, o que muitos colecionadores valorizam. É muito usada em facas de bushcraft e clássicas.' },
      { list: ['Mais quente ao toque que o G10.', 'Resiste bem à água e ao impacto.', 'Pode ser polida ou deixada rústica.'] },
    ],
  },
  {
    slug: 'cabos-madeira-e-chifre', group: 'cabos', minutes: 3,
    title: 'Madeira e chifre: cabos clássicos',
    excerpt: 'Beleza natural e peças únicas, com alguns cuidados extras.',
    body: [
      { p: 'Cabos em madeira nobre e chifre natural dão a cada faca um desenho que nunca se repete. São a escolha das facas clássicas, de coleção e de presente.' },
      { h: 'Madeira' },
      { p: 'Madeiras densas, estabilizadas ou bem seladas resistem melhor à umidade. Óleo de linhaça ou cera de vez em quando mantêm o cabo bonito e protegido.' },
      { h: 'Chifre' },
      { p: 'O chifre é resistente e tem textura natural que ajuda na pegada. Não gosta de calor excessivo nem de ficar de molho.' },
      { list: ['Evite lava-louças e água por muito tempo.', 'Guarde em local seco e ventilado.', 'Pinos de latão e guarda polida pedem um pano seco depois do uso.'] },
    ],
  },
  {
    slug: 'cuidados-com-o-cabo', group: 'cabos', minutes: 2,
    title: 'Como cuidar de cada tipo de cabo',
    excerpt: 'Um guia rápido para o cabo durar tanto quanto a lâmina.',
    body: [
      { list: ['G10 e micarta: água morna e sabão neutro, seque bem.', 'Madeira: limpe com pano úmido e reaplique óleo ou cera a cada poucos meses.', 'Chifre: pano seco e, de vez em quando, uma camada fina de óleo mineral.', 'Parafusos: confira o aperto de tempos em tempos, principalmente em facas de uso pesado.'] },
      { p: 'Em qualquer material, o maior inimigo é guardar a faca suja ou molhada. Limpe, seque e só então coloque na bainha.' },
    ],
  },
  // ---------- Modelos e usos ----------
  {
    slug: 'formatos-de-lamina', group: 'modelos', minutes: 3,
    title: 'Tanto, drop point, dagger: formatos de lâmina',
    excerpt: 'Cada formato nasceu para uma função. Conheça os principais.',
    body: [
      { list: ['Drop point: dorso que desce suave até a ponta. Versátil e forte, é o formato mais usado em facas de uso geral.', 'Tanto: ponta angulada e reforçada, feita para perfurar sem quebrar. Comum em facas táticas.', 'Dagger: fio duplo e simétrico, focado em perfuração. Típica de facas táticas e de coleção.', 'Clip point: dorso com recorte na ponta, que fica mais fina e precisa. É o formato clássico da bowie.', 'Tracker: lâmina larga com serrilha no dorso, pensada para trabalho no mato.'] },
      { p: 'Na dúvida, um drop point resolve a maioria das tarefas. Os outros formatos brilham quando o uso é mais específico.' },
    ],
  },
  {
    slug: 'como-escolher-faca-edc', group: 'modelos', minutes: 3,
    title: 'Faca EDC: como escolher a sua',
    excerpt: 'EDC é o que você carrega todo dia. A faca certa é aquela que você esquece que está levando.',
    body: [
      { p: 'EDC vem de everyday carry, “carregar todo dia”. Uma boa faca EDC é compacta, leve e prática de sacar e guardar.' },
      { list: ['Lâmina entre 6 e 10 cm costuma ser o ponto ideal.', 'Aço com boa retenção de fio, como o D2, pede menos afiação.', 'Cabo em G10 garante pegada e resistência à umidade.', 'Bainha com Ulticlip permite porte na cintura, por dentro ou por fora da calça.'] },
      { p: 'Junto com a faca, muita gente monta um kit com lanterna, caneta tática e multiferramenta. Veja os acessórios EDC da IVM.' },
    ],
  },
  {
    slug: 'faca-de-bushcraft', group: 'modelos', minutes: 3,
    title: 'Bushcraft: o que uma faca de mato precisa ter',
    excerpt: 'Para acampar e se virar na natureza, a faca vira ferramenta principal.',
    body: [
      { p: 'No bushcraft, a faca corta galhos, faz gravetos para o fogo, prepara alimento e até ajuda a montar abrigo. Por isso ela precisa ser robusta e confiável.' },
      { list: ['Espiga integral (full tang): o aço vai até o fim do cabo, o que dá resistência.', 'Lâmina de 10 a 15 cm, com espessura de 4 a 6 mm.', 'Aço carbono tenaz, como 1095 ou 5160, fácil de afiar em campo.', 'Dorso em ângulo reto, que funciona com a pederneira para acender fogo.', 'Bainha firme, que não deixa a faca cair em trilha.'] },
    ],
  },
  {
    slug: 'kydex-ou-couro', group: 'modelos', minutes: 2,
    title: 'Kydex ou couro: qual bainha escolher?',
    excerpt: 'As duas protegem a faca. A diferença está no uso e no estilo.',
    body: [
      { h: 'Kydex' },
      { p: 'Termoplástico moldado sob medida para cada faca. É leve, não absorve água e segura a faca com um “clique” firme. Aceita clips como o Ulticlip para porte velado. Ideal para uso tático, EDC e ambientes úmidos.' },
      { h: 'Couro' },
      { p: 'Clássico, silencioso e com acabamento que envelhece bonito. Pede cuidado com umidade e um pouco de hidratação de vez em quando. Combina com facas clássicas, bowies e coleção.' },
      { p: 'Na IVM, as duas são feitas sob medida para o modelo da faca.' },
    ],
  },
];

export const postsOf = (group: string) => POSTS.filter((p) => p.group === group);
export const groupOf = (slug: string) => GROUPS.find((g) => g.slug === slug)!;
