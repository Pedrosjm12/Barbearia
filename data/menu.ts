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

export type Servico = {
  slug: string;
  nome: string;
  categoria: CategoriaSlug;
  preco: number;
  duracaoMin: number;
  destaque: boolean;
  descricao: string;
  foto: Photo;
  alt: string;
};

export const servicos: Servico[] = [
  // Cortes (Haircuts)
  { slug: "fade-classico", nome: "Fade clássico", categoria: "cortes", preco: 50, duracaoMin: 45, destaque: true, descricao: "Degradê preciso do topo à nuca, com contorno marcado. O corte assinatura da casa.", foto: photos.fadeClassico, alt: "Barbeiro fazendo um degradê com máquina em cliente" },
  { slug: "high-and-tight", nome: "High and tight", categoria: "cortes", preco: 50, duracaoMin: 40, destaque: false, descricao: "Laterais bem curtas e comprimento no topo. Limpo e profissional.", foto: photos.highAndTight, alt: "Cliente com laterais bem curtas sendo acertado na máquina" },
  { slug: "texturizado", nome: "Corte texturizado", categoria: "cortes", preco: 55, duracaoMin: 45, destaque: true, descricao: "Corte moderno com textura no topo e degradê natural. Ideal para cabelo volumoso.", foto: photos.texturizado, alt: "Barbeiro trabalhando a textura de um cabelo crespo" },
  { slug: "pompadour", nome: "Pompadour", categoria: "cortes", preco: 60, duracaoMin: 50, destaque: false, descricao: "Topete com volume e laterais afinadas. Clássico que nunca sai de moda.", foto: photos.pompadour, alt: "Homem com topete penteado para trás" },
  { slug: "undercut", nome: "Undercut", categoria: "cortes", preco: 55, duracaoMin: 45, destaque: false, descricao: "Contraste marcado entre laterais curtas e topo mais longo.", foto: photos.undercut, alt: "Barbeiro finalizando um undercut com máquina" },
  { slug: "buzz-cut", nome: "Buzz cut", categoria: "cortes", preco: 35, duracaoMin: 25, destaque: false, descricao: "Tudo baixinho na máquina. Rápido e sem complicação.", foto: photos.buzzCut, alt: "Homem de óculos escuros com cabelo bem curto" },

  // Barba (Beard Trims)
  { slug: "barba-modelada", nome: "Barba modelada", categoria: "barba", preco: 35, duracaoMin: 30, destaque: true, descricao: "Contornos limpos e linhas definidas com modelagem precisa.", foto: photos.barbaModelada, alt: "Barbeiro aparando barba com tesoura" },
  { slug: "barba-completa", nome: "Barba completa", categoria: "barba", preco: 50, duracaoMin: 40, destaque: false, descricao: "Cuidado completo da barba, com detalhamento e modelagem.", foto: photos.barbaCompleta, alt: "Homem com barba cheia e bem cuidada" },
  { slug: "hidratacao-barba", nome: "Hidratação com óleo", categoria: "barba", preco: 25, duracaoMin: 15, destaque: false, descricao: "Tratamento que condiciona e amacia os fios para uma barba saudável.", foto: photos.oleoBarba, alt: "Homem aplicando óleo na barba" },
  { slug: "cavanhaque", nome: "Desenho de cavanhaque", categoria: "barba", preco: 40, duracaoMin: 30, destaque: false, descricao: "Modelagem e desenho específicos para cavanhaque.", foto: photos.cavanhaque, alt: "Homem de perfil com cavanhaque desenhado" },

  // Barbear (Shaves)
  { slug: "barbear-classico", nome: "Barbear clássico", categoria: "barbear", preco: 45, duracaoMin: 35, destaque: true, descricao: "Navalha tradicional com toalha quente. Do jeito que o avô fazia.", foto: photos.barbearClassico, alt: "Barbeiro fazendo a barba com navalha" },
  { slug: "toalha-quente", nome: "Barbear com toalha quente", categoria: "barbear", preco: 50, duracaoMin: 45, destaque: false, descricao: "Experiência completa com toalha quente e finalização premium.", foto: photos.toalhaQuente, alt: "Cliente deitado com toalha quente no rosto sendo barbeado" },
  { slug: "nuca", nome: "Acerto de nuca", categoria: "barbear", preco: 20, duracaoMin: 15, destaque: false, descricao: "Nuca limpa e detalhada na navalha.", foto: photos.nuca, alt: "Barbeiro tatuado acertando a nuca com navalha" },

  // Acabamentos (Lineups)
  { slug: "pezinho", nome: "Pezinho", categoria: "acabamentos", preco: 20, duracaoMin: 15, destaque: false, descricao: "Contorno afiado e detalhes em um corte já existente.", foto: photos.pezinho, alt: "Máquina fazendo o contorno do cabelo" },
  { slug: "pezinho-fade", nome: "Pezinho com fade", categoria: "acabamentos", preco: 55, duracaoMin: 40, destaque: true, descricao: "Contorno renovado junto com um retoque preciso no degradê.", foto: photos.pezinhoFade, alt: "Barbeiro fazendo contorno em cabelo com ondas" },
  { slug: "desenho", nome: "Desenho e waves", categoria: "acabamentos", preco: 40, duracaoMin: 30, destaque: false, descricao: "Riscos personalizados e trabalho de ondas no cabelo.", foto: photos.desenho, alt: "Degradê na nuca com desenho de riscos" },

  // Finalização (Styling)
  { slug: "finalizacao", nome: "Finalização", categoria: "finalizacao", preco: 15, duracaoMin: 10, destaque: false, descricao: "Aplicação de produto e penteado profissional.", foto: photos.finalizacao, alt: "Mão pegando pomada de um pote" },
  { slug: "finalizacao-premium", nome: "Finalização premium", categoria: "finalizacao", preco: 30, duracaoMin: 20, destaque: false, descricao: "Penteado elaborado com produtos premium e técnica apurada.", foto: photos.finalizacaoPremium, alt: "Potes de pomada e tônico capilar" },
  { slug: "lavagem", nome: "Lavagem e secagem", categoria: "finalizacao", preco: 25, duracaoMin: 20, destaque: false, descricao: "Lavagem completa com secagem no secador.", foto: photos.lavagem, alt: "Cliente tendo o cabelo lavado no lavatório" },

  // Adicionais (Add-ons)
  { slug: "sobrancelha", nome: "Sobrancelha", categoria: "adicionais", preco: 15, duracaoMin: 10, destaque: false, descricao: "Limpeza e desenho da sobrancelha para emoldurar o rosto.", foto: photos.sobrancelha, alt: "Close do rosto de um homem com sobrancelhas alinhadas" },
  { slug: "orelha-nariz", nome: "Orelha e nariz", categoria: "adicionais", preco: 15, duracaoMin: 10, destaque: false, descricao: "Remoção precisa de pelos indesejados.", foto: photos.orelhaNariz, alt: "Barbeiro usando tesoura e pente perto da orelha" },
  { slug: "contorno-detalhado", nome: "Contorno detalhado", categoria: "adicionais", preco: 25, duracaoMin: 15, destaque: true, descricao: "Acabamento ultrapreciso para uma linha de cabelo impecável.", foto: photos.contorno, alt: "Barbeiro fazendo contorno com navalha na lateral da cabeça" },
  { slug: "couro-cabeludo", nome: "Tratamento do couro cabeludo", categoria: "adicionais", preco: 30, duracaoMin: 20, destaque: false, descricao: "Massagem terapêutica e tratamento para o couro cabeludo.", foto: photos.couroCabeludo, alt: "Cliente recebendo tratamento com toalha na cabeça" },
  { slug: "pigmentacao-barba", nome: "Pigmentação de barba", categoria: "adicionais", preco: 40, duracaoMin: 30, destaque: false, descricao: "Coloração profissional para uniformizar a barba ou mudar o tom.", foto: photos.pigmentacaoBarba, alt: "Homem de perfil com barba escura e uniforme" },
  { slug: "coloracao", nome: "Coloração", categoria: "adicionais", preco: 70, duracaoMin: 60, destaque: false, descricao: "Coloração completa do cabelo com aplicação precisa.", foto: photos.coloracao, alt: "Homem com cabelo platinado sorrindo na barbearia" },
  { slug: "massagem", nome: "Massagem relaxante", categoria: "adicionais", preco: 25, duracaoMin: 15, destaque: false, descricao: "Massagem na cabeça e no pescoço para aliviar a tensão.", foto: photos.massagem, alt: "Homem recebendo massagem no pescoço" },

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
