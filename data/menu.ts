import { photos, type Photo } from "./photos";

// Fonte: docs/menu-items.csv, traduzido para PT-BR com preços sugeridos em reais.
// Revise os valores antes de publicar.

export const categorias = [
  { slug: "cortes", nome: "Cortes" },
  { slug: "barba", nome: "Barba" },
  { slug: "barbear", nome: "Barbear" },
  { slug: "acabamentos", nome: "Acabamentos" },
  { slug: "finalizacao", nome: "Finalização" },
  { slug: "adicionais", nome: "Adicionais" },
  { slug: "combos", nome: "Combos" },
] as const;

export type CategoriaSlug = (typeof categorias)[number]["slug"];

export type Subcategoria = {
  slug: string;
  categoria: CategoriaSlug;
  nome: string;
  descricao: string;
};

// Só cortes, barba e adicionais são organizados em subcategorias — as demais
// categorias seguem em lista simples (ver ARCHITECTURE.md e MenuBrowser).
export const subcategorias: Subcategoria[] = [
  // Cortes
  {
    slug: "curtos-classicos",
    categoria: "cortes",
    nome: "Curtos e clássicos",
    descricao: "Cortes práticos, atemporais e de baixa manutenção — a base de qualquer barbearia.",
  },
  {
    slug: "degrade",
    categoria: "cortes",
    nome: "Com degradê (fade)",
    descricao: "A técnica que define a barbearia moderna: transição suave entre as laterais raspadas e o volume do topo.",
  },
  {
    slug: "volume-topete",
    categoria: "cortes",
    nome: "Estilos com volume e topete",
    descricao: "Cortes que apostam no volume e na estrutura do topo para criar um visual marcante.",
  },
  {
    slug: "medios-longos",
    categoria: "cortes",
    nome: "Médios e longos",
    descricao: "Para quem quer comprimento com estilo: fios médios a longos, com textura e movimento natural.",
  },

  // Barba
  {
    slug: "stubble",
    categoria: "barba",
    nome: "Barba por fazer (stubble)",
    descricao: "Para quem gosta do visual desalinhado, mas ainda assim cuidado.",
  },
  {
    slug: "curta-corporativa",
    categoria: "barba",
    nome: "Barba curta / corporativa",
    descricao: "Discrição e alinhamento para quem circula no ambiente profissional.",
  },
  {
    slug: "cheia-lenhador",
    categoria: "barba",
    nome: "Barba cheia / lenhador",
    descricao: "Presença e volume máximo, para quem não abre mão de uma barba robusta.",
  },
  {
    slug: "barba-fade",
    categoria: "barba",
    nome: "Barba degradê (fade)",
    descricao: "O degradê chega também na barba, unindo as costeletas ao restante do rosto sem cortes bruscos.",
  },
  {
    slug: "cavanhaque-estilo",
    categoria: "barba",
    nome: "Cavanhaque",
    descricao: "Um estilo que valoriza o queixo e dá personalidade ao rosto.",
  },
  {
    slug: "geometricos",
    categoria: "barba",
    nome: "Estilos geométricos e desenhados",
    descricao: "Desenhos precisos feitos na navalha para valorizar o formato do maxilar.",
  },

  // Adicionais
  {
    slug: "bem-estar",
    categoria: "adicionais",
    nome: "Bem-estar e relaxamento",
    descricao: "Experiências pensadas para o relaxamento do cliente durante o atendimento.",
  },
  {
    slug: "cuidados-pele",
    categoria: "adicionais",
    nome: "Cuidados com a pele",
    descricao: "Serviços voltados para a saúde e a aparência da pele do rosto.",
  },
  {
    slug: "estetica-capilar",
    categoria: "adicionais",
    nome: "Estética capilar e química",
    descricao: "Procedimentos que vão além do corte tradicional com tesoura ou máquina.",
  },
  {
    slug: "depilacao-higiene",
    categoria: "adicionais",
    nome: "Depilação e higiene",
    descricao: "Remoção de pelos indesejados em áreas específicas do rosto.",
  },
];

export type Servico = {
  slug: string;
  nome: string;
  categoria: CategoriaSlug;
  subcategoria?: string;
  preco: number;
  duracaoMin: number;
  destaque: boolean;
  descricao: string;
  foto: Photo;
  alt: string;
};

export const servicos: Servico[] = [
  // Cortes — Curtos e Clássicos
  { slug: "militar-buzz", nome: "Militar (buzz cut)", categoria: "cortes", subcategoria: "curtos-classicos", preco: 35, duracaoMin: 25, destaque: false, descricao: "Curtíssimo em toda a cabeça, feito com a mesma altura de máquina. É prático e não exige manutenção.", foto: photos.buzzCut, alt: "Homem de óculos escuros com cabelo bem curto" },
  { slug: "social", nome: "Social", categoria: "cortes", subcategoria: "curtos-classicos", preco: 40, duracaoMin: 35, destaque: false, descricao: "Laterais uniformes e topo penteado para o lado — o estilo tradicional para o ambiente corporativo.", foto: photos.highAndTight, alt: "Cliente com laterais bem curtas sendo acertado na máquina" },
  { slug: "americano", nome: "Americano", categoria: "cortes", subcategoria: "curtos-classicos", preco: 40, duracaoMin: 35, destaque: false, descricao: "Usa laterais bem baixas em contraste com um topo mais volumoso e marcante.", foto: photos.americano, alt: "Homem com laterais bem baixas e topo volumoso" },

  // Cortes — Com Degradê (Fade)
  { slug: "low-fade", nome: "Low fade", categoria: "cortes", subcategoria: "degrade", preco: 50, duracaoMin: 45, destaque: true, descricao: "O degradê começa bem baixo, próximo à orelha, garantindo um visual sutil e refinado.", foto: photos.fadeClassico, alt: "Barbeiro fazendo um degradê baixo com máquina em cliente" },
  { slug: "mid-fade", nome: "Mid fade", categoria: "cortes", subcategoria: "degrade", preco: 55, duracaoMin: 45, destaque: false, descricao: "O degradê começa no meio da cabeça, equilibrando o contraste entre as laterais e o topo.", foto: photos.midFade, alt: "Barbeiro fazendo um degradê no meio da cabeça do cliente" },
  { slug: "high-fade", nome: "High fade", categoria: "cortes", subcategoria: "degrade", preco: 58, duracaoMin: 50, destaque: false, descricao: "O degradê é alto, começando logo acima das têmporas, criando um visual marcante e moderno.", foto: photos.highFade, alt: "Barbeiro fazendo um degradê alto próximo às têmporas" },

  // Cortes — Estilos com Volume e Topete
  { slug: "pompadour", nome: "Pompadour", categoria: "cortes", subcategoria: "volume-topete", preco: 60, duracaoMin: 50, destaque: false, descricao: "Fios longos no topo com volume frontal penteado para cima e para trás.", foto: photos.pompadour, alt: "Homem com topete penteado para trás" },
  { slug: "undercut", nome: "Undercut", categoria: "cortes", subcategoria: "volume-topete", preco: 55, duracaoMin: 45, destaque: false, descricao: "Laterais bem curtas ou raspadas com uma separação nítida em relação ao topo longo.", foto: photos.undercut, alt: "Barbeiro finalizando um undercut com máquina" },
  { slug: "moicano", nome: "Moicano (mohawk / faux hawk)", categoria: "cortes", subcategoria: "volume-topete", preco: 60, duracaoMin: 50, destaque: false, descricao: "Mantém uma faixa central de cabelo mais longa enquanto as laterais são curtas ou raspadas.", foto: photos.moicano, alt: "Homem com corte moicano, faixa central mais longa e laterais curtas" },

  // Cortes — Médios e Longos
  { slug: "texturizado-crop", nome: "Texturizado / crop", categoria: "cortes", subcategoria: "medios-longos", preco: 55, duracaoMin: 45, destaque: true, descricao: "Fios médios no topo com muita textura e movimento, geralmente combinados com fade nas laterais.", foto: photos.texturizado, alt: "Barbeiro trabalhando a textura de um cabelo crespo" },
  { slug: "ondas-longas", nome: "Longo com ondas (messy waves)", categoria: "cortes", subcategoria: "medios-longos", preco: 65, duracaoMin: 50, destaque: false, descricao: "Fios soltos e naturais que valorizam o comprimento maior.", foto: photos.ondasLongas, alt: "Homem com cabelo longo e ondulado" },
  { slug: "medios-camadas", nome: "Médios em camadas", categoria: "cortes", subcategoria: "medios-longos", preco: 55, duracaoMin: 40, destaque: false, descricao: "Cortes soltos, naturais e com caimento leve para valorizar ondas ou cachos.", foto: photos.mediosCamadas, alt: "Homem com corte médio em camadas e caimento natural" },

  // Barba — Barba por Fazer (Stubble)
  { slug: "stubble", nome: "Stubble", categoria: "barba", subcategoria: "stubble", preco: 25, duracaoMin: 20, destaque: false, descricao: "O estilo curto e ralo que simula poucos dias sem barbear.", foto: photos.oleoBarba, alt: "Homem cuidando de uma barba curta e rala" },
  { slug: "stubble-alinhado", nome: "Stubble alinhado", categoria: "barba", subcategoria: "stubble", preco: 30, duracaoMin: 25, destaque: false, descricao: "Contornos definidos na navalha mantendo o comprimento curto e natural do stubble.", foto: photos.stubbleAlinhado, alt: "Barbeiro alinhando os contornos de uma barba curta" },
  { slug: "stubble-fade", nome: "Stubble com fade leve", categoria: "barba", subcategoria: "stubble", preco: 35, duracaoMin: 30, destaque: false, descricao: "Combina o visual desalinhado do stubble com um degradê suave nas laterais do rosto.", foto: photos.stubbleFade, alt: "Barba curta com um degradê suave nas laterais do rosto" },

  // Barba — Barba Curta / Corporativa
  { slug: "curta-corporativa", nome: "Barba curta / corporativa", categoria: "barba", subcategoria: "curta-corporativa", preco: 35, duracaoMin: 30, destaque: true, descricao: "Pelos aparados bem rente e controlados, ideal para o ambiente profissional.", foto: photos.barbaModelada, alt: "Barbeiro aparando barba com tesoura" },
  { slug: "curta-alinhada", nome: "Barba curta alinhada", categoria: "barba", subcategoria: "curta-corporativa", preco: 35, duracaoMin: 30, destaque: false, descricao: "Contorno preciso na navalha para um acabamento limpo, mesmo com poucos milímetros de barba.", foto: photos.barbaCurtaAlinhada, alt: "Barbeiro fazendo o contorno de uma barba curta na navalha" },
  { slug: "curta-contorno", nome: "Barba curta com contorno definido", categoria: "barba", subcategoria: "curta-corporativa", preco: 38, duracaoMin: 30, destaque: false, descricao: "Linhas retas e bem marcadas nas bochechas e no pescoço, reforçando o visual profissional.", foto: photos.barbaCurtaContorno, alt: "Close do contorno reto de uma barba curta" },

  // Barba — Barba Cheia / Lenhador
  { slug: "cheia-lenhador", nome: "Barba cheia / lenhador", categoria: "barba", subcategoria: "cheia-lenhador", preco: 50, duracaoMin: 40, destaque: false, descricao: "Volume total cobrindo bochechas, maxilar e queixo, exigindo manutenção para alinhar os fios.", foto: photos.barbaCompleta, alt: "Homem com barba cheia e bem cuidada" },
  { slug: "cheia-volumosa", nome: "Barba cheia volumosa", categoria: "barba", subcategoria: "cheia-lenhador", preco: 55, duracaoMin: 45, destaque: false, descricao: "Fios mais longos e soltos para um visual robusto, com aparo mínimo para manter o volume natural.", foto: photos.barbaVolumosa, alt: "Homem com barba cheia e volumosa, fios longos e soltos" },
  { slug: "cheia-hidratada", nome: "Barba cheia hidratada", categoria: "barba", subcategoria: "cheia-lenhador", preco: 55, duracaoMin: 45, destaque: false, descricao: "Cuidado completo com hidratação e óleo para deixar a barba cheia macia e brilhante.", foto: photos.barbaHidratada, alt: "Homem aplicando óleo em uma barba cheia" },

  // Barba — Barba Degradê (Fade)
  { slug: "barba-fade-baixo", nome: "Barba fade baixo", categoria: "barba", subcategoria: "barba-fade", preco: 45, duracaoMin: 35, destaque: false, descricao: "Começa curta nas costeletas e aumenta o volume gradualmente em direção à mandíbula.", foto: photos.barbaDegrade, alt: "Barba com degradê das costeletas em direção à mandíbula" },
  { slug: "barba-fade-medio", nome: "Barba fade médio", categoria: "barba", subcategoria: "barba-fade", preco: 48, duracaoMin: 35, destaque: false, descricao: "O degradê começa na altura intermediária da barba, equilibrando o contraste entre curto e cheio.", foto: photos.barbaFadeMedio, alt: "Barba com degradê na altura intermediária do rosto" },
  { slug: "barba-fade-alto", nome: "Barba fade alto", categoria: "barba", subcategoria: "barba-fade", preco: 50, duracaoMin: 40, destaque: false, descricao: "Transição alta e marcante, aproximando o visual do fade capilar.", foto: photos.barbaFadeAlto, alt: "Barba com degradê alto e marcante" },

  // Barba — Cavanhaque
  { slug: "cavanhaque", nome: "Cavanhaque", categoria: "barba", subcategoria: "cavanhaque-estilo", preco: 40, duracaoMin: 30, destaque: false, descricao: "Focado apenas na região do queixo, podendo incluir ou não o bigode.", foto: photos.cavanhaque, alt: "Homem de perfil com cavanhaque desenhado" },
  { slug: "cavanhaque-conectado", nome: "Cavanhaque com bigode conectado", categoria: "barba", subcategoria: "cavanhaque-estilo", preco: 42, duracaoMin: 30, destaque: false, descricao: "O bigode se une à barba do queixo, criando um contorno contínuo ao redor da boca.", foto: photos.cavanhaqueConectado, alt: "Homem com cavanhaque e bigode conectados" },
  { slug: "cavanhaque-afinado", nome: "Cavanhaque afinado", categoria: "barba", subcategoria: "cavanhaque-estilo", preco: 40, duracaoMin: 30, destaque: false, descricao: "Versão mais discreta, com linhas finas que valorizam sutilmente o queixo.", foto: photos.cavanhaqueAfinado, alt: "Homem com cavanhaque fino e discreto" },

  // Barba — Estilos Geométricos e Desenhados
  { slug: "barba-balbo", nome: "Balbo", categoria: "barba", subcategoria: "geometricos", preco: 45, duracaoMin: 35, destaque: false, descricao: "Bigode separado do queixo por uma faixa de pele, com contornos bem definidos na navalha.", foto: photos.barbaGeometrica, alt: "Barba estilo Balbo, com bigode separado do queixo" },
  { slug: "barba-ancora", nome: "Âncora", categoria: "barba", subcategoria: "geometricos", preco: 45, duracaoMin: 35, destaque: false, descricao: "Desenho que segue a linha da mandíbula até o queixo, lembrando o formato de uma âncora.", foto: photos.barbaAncora, alt: "Barba estilo âncora, seguindo a linha da mandíbula" },
  { slug: "barba-espartana", nome: "Espartana", categoria: "barba", subcategoria: "geometricos", preco: 45, duracaoMin: 35, destaque: false, descricao: "Contornos marcados que valorizam o maxilar, com acabamento anguloso e preciso.", foto: photos.barbaEspartana, alt: "Barba estilo espartana, com contornos angulosos no maxilar" },

  // Barbear (Shaves)
  { slug: "barbear-classico", nome: "Barbear clássico", categoria: "barbear", preco: 45, duracaoMin: 35, destaque: true, descricao: "Navalha tradicional com toalha quente. Do jeito que o avô fazia.", foto: photos.barbearClassico, alt: "Barbeiro fazendo a barba com navalha" },
  { slug: "toalha-quente-barbear", nome: "Barbear com toalha quente", categoria: "barbear", preco: 50, duracaoMin: 45, destaque: false, descricao: "Experiência completa com toalha quente e finalização premium.", foto: photos.toalhaQuente, alt: "Cliente deitado com toalha quente no rosto sendo barbeado" },
  { slug: "nuca", nome: "Acerto de nuca", categoria: "barbear", preco: 20, duracaoMin: 15, destaque: false, descricao: "Nuca limpa e detalhada na navalha.", foto: photos.nuca, alt: "Barbeiro tatuado acertando a nuca com navalha" },

  // Acabamentos (Lineups)
  { slug: "pezinho", nome: "Pezinho", categoria: "acabamentos", preco: 20, duracaoMin: 15, destaque: false, descricao: "Contorno afiado e detalhes em um corte já existente.", foto: photos.pezinho, alt: "Máquina fazendo o contorno do cabelo" },
  { slug: "pezinho-fade", nome: "Pezinho com fade", categoria: "acabamentos", preco: 55, duracaoMin: 40, destaque: true, descricao: "Contorno renovado junto com um retoque preciso no degradê.", foto: photos.pezinhoFade, alt: "Barbeiro fazendo contorno em cabelo com ondas" },
  { slug: "desenho", nome: "Desenho e waves", categoria: "acabamentos", preco: 40, duracaoMin: 30, destaque: false, descricao: "Riscos personalizados e trabalho de ondas no cabelo.", foto: photos.desenho, alt: "Degradê na nuca com desenho de riscos" },
  { slug: "contorno-detalhado", nome: "Contorno detalhado", categoria: "acabamentos", preco: 25, duracaoMin: 15, destaque: false, descricao: "Acabamento ultrapreciso para uma linha de cabelo impecável.", foto: photos.contorno, alt: "Barbeiro fazendo contorno com navalha na lateral da cabeça" },
  { slug: "alinhamento-costeletas", nome: "Alinhamento de costeletas", categoria: "acabamentos", preco: 15, duracaoMin: 10, destaque: false, descricao: "Ajuste preciso das costeletas para equilibrar o restante do corte.", foto: photos.galeria2, alt: "Corte sendo finalizado com tesoura e pente" },
  { slug: "retoque-contorno", nome: "Retoque de contorno", categoria: "acabamentos", preco: 18, duracaoMin: 10, destaque: false, descricao: "Manutenção rápida do contorno entre um corte e outro.", foto: photos.galeria4, alt: "Barbeiro finalizando o contorno na nuca" },

  // Finalização (Styling)
  { slug: "finalizacao", nome: "Finalização", categoria: "finalizacao", preco: 15, duracaoMin: 10, destaque: false, descricao: "Aplicação de produto e penteado profissional.", foto: photos.finalizacao, alt: "Mão pegando pomada de um pote" },
  { slug: "finalizacao-premium", nome: "Finalização premium", categoria: "finalizacao", preco: 30, duracaoMin: 20, destaque: false, descricao: "Penteado elaborado com produtos premium e técnica apurada.", foto: photos.finalizacaoPremium, alt: "Potes de pomada e tônico capilar" },
  { slug: "lavagem", nome: "Lavagem e secagem", categoria: "finalizacao", preco: 25, duracaoMin: 20, destaque: false, descricao: "Lavagem completa com secagem no secador.", foto: photos.lavagem, alt: "Cliente tendo o cabelo lavado no lavatório" },

  // Adicionais — Bem-Estar e Relaxamento
  { slug: "barboterapia", nome: "Barboterapia com vapor de ozônio", categoria: "adicionais", subcategoria: "bem-estar", preco: 30, duracaoMin: 15, destaque: false, descricao: "A famosa \"fumaça no rosto\". O vapor quente abre os poros, amacia os fios da barba e higieniza a pele antes do barbear.", foto: photos.barboterapia, alt: "Vapor quente aplicado no rosto do cliente antes do barbear" },
  { slug: "massagem", nome: "Massagem facial ou capilar", categoria: "adicionais", subcategoria: "bem-estar", preco: 25, duracaoMin: 15, destaque: false, descricao: "Massagens manuais ou com aparelhos vibratórios no couro cabeludo, pescoço e rosto para aliviar o estresse.", foto: photos.massagem, alt: "Homem recebendo massagem no pescoço" },
  { slug: "toalha-quente", nome: "Toalha quente", categoria: "adicionais", subcategoria: "bem-estar", preco: 15, duracaoMin: 10, destaque: false, descricao: "Aplicação de uma toalha aquecida com óleos essenciais para abrir os poros e relaxar a musculatura facial.", foto: photos.couroCabeludo, alt: "Cliente recebendo tratamento com toalha quente na cabeça" },

  // Adicionais — Cuidados com a Pele
  { slug: "sobrancelha", nome: "Design e limpeza de sobrancelha", categoria: "adicionais", subcategoria: "cuidados-pele", preco: 15, duracaoMin: 10, destaque: false, descricao: "Feita com navalha, pinça ou linha para alinhar o olhar.", foto: photos.sobrancelha, alt: "Close do rosto de um homem com sobrancelhas alinhadas" },
  { slug: "esfoliacao-facial", nome: "Esfoliação facial", categoria: "adicionais", subcategoria: "cuidados-pele", preco: 20, duracaoMin: 15, destaque: false, descricao: "Remove células mortas e ajuda a evitar pelos encravados na barba.", foto: photos.esfoliacaoFacial, alt: "Homem segurando um pote de creme esfoliante" },
  { slug: "limpeza-pele", nome: "Limpeza de pele", categoria: "adicionais", subcategoria: "cuidados-pele", preco: 30, duracaoMin: 20, destaque: false, descricao: "Tratamento mais profundo para higienizar e tratar a pele do rosto.", foto: photos.limpezaPele, alt: "Tratamento de limpeza de pele no rosto do cliente" },

  // Adicionais — Estética Capilar e Química
  { slug: "camuflagem", nome: "Camuflagem de cabelo ou barba", categoria: "adicionais", subcategoria: "estetica-capilar", preco: 40, duracaoMin: 30, destaque: false, descricao: "Uma tintura rápida e discreta para disfarçar os fios brancos sem deixar um aspecto artificial.", foto: photos.pigmentacaoBarba, alt: "Homem de perfil com barba escura e uniforme" },
  { slug: "platinado-luzes", nome: "Platinado / luzes", categoria: "adicionais", subcategoria: "estetica-capilar", preco: 70, duracaoMin: 60, destaque: false, descricao: "Processos de descoloração global ou mechas alinhadas.", foto: photos.coloracao, alt: "Homem com cabelo platinado sorrindo na barbearia" },
  { slug: "selagem-progressiva", nome: "Selagem / progressiva", categoria: "adicionais", subcategoria: "estetica-capilar", preco: 60, duracaoMin: 50, destaque: false, descricao: "Tratamentos térmicos para reduzir o frizz e disciplinar os fios.", foto: photos.selagemProgressiva, alt: "Aplicação de tratamento térmico nos fios do cabelo" },

  // Adicionais — Depilação e Higiene
  { slug: "orelha-nariz", nome: "Depilação de nariz e ouvido com cera", categoria: "adicionais", subcategoria: "depilacao-higiene", preco: 15, duracaoMin: 10, destaque: false, descricao: "Remoção rápida dos pelos dessas regiões usando cera morna.", foto: photos.orelhaNariz, alt: "Barbeiro usando tesoura e pente perto da orelha" },
  { slug: "depilacao-linha", nome: "Depilação de rosto com linha", categoria: "adicionais", subcategoria: "depilacao-higiene", preco: 15, duracaoMin: 10, destaque: false, descricao: "Remove os pelos pela raiz na região das bochechas e testa.", foto: photos.depilacaoLinha, alt: "Técnica de depilação facial com linha" },
  { slug: "depilacao-nuca", nome: "Depilação de nuca", categoria: "adicionais", subcategoria: "depilacao-higiene", preco: 12, duracaoMin: 10, destaque: false, descricao: "Remoção rápida dos pelinhos da nuca para um acabamento mais limpo.", foto: photos.depilacaoNuca, alt: "Barbeiro removendo pelos da nuca do cliente" },

  // Combos (Packages)
  { slug: "combo-assinatura", nome: "Combo assinatura", categoria: "combos", preco: 110, duracaoMin: 90, destaque: true, descricao: "Fade + barba modelada + finalização + massagem. O melhor custo-benefício.", foto: photos.comboAssinatura, alt: "Máquinas, tesoura, pente e pomada sobre uma bancada" },
  { slug: "combo-executivo", nome: "Combo executivo", categoria: "combos", preco: 140, duracaoMin: 100, destaque: false, descricao: "Barbear completo + finalização premium + tratamento do couro cabeludo. A experiência definitiva.", foto: photos.comboExecutivo, alt: "Barbeiro fazendo a barba com navalha e toalha quente" },
  { slug: "combo-expresso", nome: "Combo expresso", categoria: "combos", preco: 75, duracaoMin: 50, destaque: false, descricao: "Corte + pezinho + finalização. Rápido e no capricho.", foto: photos.comboExpresso, alt: "Close de máquina fazendo degradê na lateral" },
];

export const destaques = servicos.filter((s) => s.destaque);

export function getServico(slug: string) {
  return servicos.find((s) => s.slug === slug);
}

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
export const formatPreco = (valor: number) => brl.format(valor);
