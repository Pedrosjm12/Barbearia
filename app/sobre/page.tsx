import type { Metadata } from "next";
import { PageShell } from "@/components/transition/PageShell";
import { ButtonLink } from "@/components/ui/Button";
import { RevealImage } from "@/components/ui/RevealImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { photos } from "@/data/photos";

export const metadata: Metadata = {
  title: "Nossa história",
  description: "Da cadeira emprestada na garagem à barbearia de referência no bairro, em Uberlândia.",
};

// Texto de exemplo: revise com a história real da barbearia antes de publicar.
const capitulos = [
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

const valores = [
  { titulo: "Capricho", texto: "Cada detalhe conta. Só sai da cadeira quando está do jeito que você pediu." },
  { titulo: "Acolhimento", texto: "Aqui todo mundo é recebido como vizinho, da primeira à centésima visita." },
  { titulo: "Talento local", texto: "Formamos barbeiros do próprio bairro e damos a eles uma profissão." },
];

export default function SobrePage() {
  return (
    <PageShell>
      {/* Abertura */}
      <section className="mx-auto grid max-w-6xl items-end gap-12 px-4 pt-32 pb-24 md:grid-cols-2 md:px-8 md:pt-40">
        <SectionHeading
          as="h1"
          eyebrow="Nossa história"
          title="Nasceu no bairro. Cresceu com o bairro."
          intro="A Talentos Black começou com uma cadeira, uma máquina e muita vontade. Mais de dez anos depois, a receita é a mesma: cuidar bem de quem senta na nossa cadeira."
        />
        <div className="group relative">
          <RevealImage
            photo={photos.sobreComeco}
            alt="Barbeiro experiente cortando o cabelo de um jovem"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[4/5]"
            preload
          />
        </div>
      </section>

      {/* Linha do tempo */}
      <section aria-label="Linha do tempo" className="mx-auto max-w-6xl px-4 pb-24 md:px-8">
        <ol className="space-y-24">
          {capitulos.map((c, i) => (
            <li key={c.ano} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
              <div className={`group relative ${i % 2 ? "md:order-2" : ""}`}>
                <RevealImage photo={c.photo} alt={c.alt} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3]" />
              </div>
              <div>
                <p className="font-mono text-5xl font-bold text-tb-red md:text-6xl">{c.ano}</p>
                <h2 className="mt-4 text-3xl leading-[1.2] font-extrabold">{c.titulo}</h2>
                <p className="mt-4 text-lg leading-[1.6] text-tb-cream/80">{c.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Citação */}
      <section className="border-y border-tb-cream/10 bg-tb-charcoal/40">
        <figure className="mx-auto max-w-4xl px-4 py-24 text-center md:px-8">
          <blockquote className="text-2xl leading-[1.3] font-bold md:text-[32px] md:leading-[1.2]">
            “A gente não corta só cabelo. A gente devolve a confiança de quem se olha no espelho.”
          </blockquote>
          <figcaption className="mt-6 font-mono text-sm text-tb-cream/60">Marcão, fundador</figcaption>
        </figure>
      </section>

      {/* Valores */}
      <section aria-labelledby="valores" className="mx-auto max-w-6xl px-4 py-24 md:px-8">
        <SectionHeading id="valores" eyebrow="O que nos move" title="Três coisas que não mudam" />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {valores.map((v, i) => (
            <li key={v.titulo} className="border-t-2 border-tb-red bg-tb-charcoal p-6">
              <p className="font-mono text-xs text-tb-cream/50">0{i + 1}</p>
              <h3 className="mt-2 text-xl leading-[1.3] font-bold">{v.titulo}</h3>
              <p className="mt-2 text-base text-tb-cream/75">{v.texto}</p>
            </li>
          ))}
        </ul>
        <div className="mt-16 flex flex-wrap gap-4">
          <ButtonLink href="/#agendar" arrow>
            Sente na nossa cadeira
          </ButtonLink>
          <ButtonLink href="/menu" variant="secondary">
            Ver serviços
          </ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
