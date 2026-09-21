import { formatPreco } from "./menu";
import { photos, type Photo } from "./photos";

export type Produto = {
  slug: string;
  nome: string;
  preco: number;
  descricao: string;
  foto: Photo;
  alt: string;
};

export const produtos: Produto[] = [
  {
    slug: "pomada-modeladora",
    nome: "Pomada modeladora",
    preco: 45,
    descricao: "Fixação forte com efeito fosco. Ideal para finalizar fades, texturizados e topetes sem pesar o fio.",
    foto: photos.produtoPomada,
    alt: "Pote de pomada modeladora para cabelo",
  },
  {
    slug: "shampoo-especial",
    nome: "Shampoo especial",
    preco: 35,
    descricao: "Limpeza profunda sem ressecar o couro cabeludo. Formulado para o uso frequente de quem cuida do visual.",
    foto: photos.produtoShampoo,
    alt: "Frasco de shampoo especial para cabelo",
  },
  {
    slug: "talco-refrescante",
    nome: "Talco refrescante",
    preco: 20,
    descricao: "Sensação de frescor imediata e controle da oleosidade depois do corte ou da barba.",
    foto: photos.produtoTalco,
    alt: "Talco para barbearia sobre a bancada",
  },
  {
    slug: "creme-pos-barba",
    nome: "Creme pós-barba",
    preco: 30,
    descricao: "Hidrata e acalma a pele logo após o barbear, com toque seco e sem oleosidade.",
    foto: photos.produtoCreme,
    alt: "Pote de creme pós-barba",
  },
];

export { formatPreco };
