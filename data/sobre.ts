import { photos } from "./photos";

// Texto de exemplo: revise com a história real da barbearia antes de publicar.
export const capitulos = [
  {
    ano: "2012",
    titulo: "Uma cadeira emprestada",
    texto:
      "Tudo começou na garagem da casa da dona Cida, mãe do Marcão. Uma cadeira de barbeiro emprestada, uma máquina usada e a vontade de fazer o corte que ninguém no bairro fazia. Os primeiros clientes foram os amigos da rua, e eles não pagavam com dinheiro. Pagavam contando pra todo mundo.",
    photo: photos.sobreGaragem,
    alt: "Barbearia simples com uma cadeira antiga, em preto e branco",
  },
  {
    ano: "2016",
    titulo: "Porta aberta para o bairro",
    texto:
      "A fila na calçada virou motivo de conversa, e chegou a hora de ter um endereço próprio. Duas cadeiras vermelhas, um espelho grande e um nome que dizia tudo: Talentos Black. Mais que um lugar para cortar cabelo, virou ponto de encontro para falar de futebol, música e da vida.",
    photo: photos.sobrePrimeiroPonto,
    alt: "Duas cadeiras de barbeiro vermelhas em frente ao espelho",
  },
  {
    ano: "Hoje",
    titulo: "A casa de sempre, maior",
    texto:
      "Hoje somos uma equipe de barbeiros formados aqui dentro, referência em degradê e barba em Uberlândia. Crescemos, mas o café continua passado na hora e o cliente continua sendo chamado pelo nome.",
    photo: photos.sobreHoje,
    alt: "Cadeira de barbeiro clássica em um salão decorado com quadros",
  },
];

export const valores = [
  { titulo: "Capricho", texto: "Cada detalhe conta. Só sai da cadeira quando está do jeito que você pediu." },
  { titulo: "Acolhimento", texto: "Aqui todo mundo é recebido como vizinho, da primeira à centésima visita." },
  { titulo: "Talento local", texto: "Formamos barbeiros do próprio bairro e damos a eles uma profissão." },
];

export const citacao = {
  texto: "A gente não corta só cabelo. A gente devolve a confiança de quem se olha no espelho.",
  autor: "Marcão, fundador",
};
