import { Suspense } from "react";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Hero } from "@/components/home/Hero";
import { ServiceCard } from "@/components/menu/ServiceCard";
import { PageShell } from "@/components/transition/PageShell";
import { ButtonLink } from "@/components/ui/Button";
import { RevealImage } from "@/components/ui/RevealImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { destaques } from "@/data/menu";
import { photos } from "@/data/photos";

const galeria = [
  { photo: photos.galeria1, alt: "Barbeiro acertando a barba com navalha e toalha", legenda: "Barba na navalha", span: "md:col-span-2 md:row-span-2" },
  { photo: photos.galeria2, alt: "Corte com tesoura e pente", legenda: "Tesoura e pente", span: "" },
  { photo: photos.galeria3, alt: "Barba sendo aparada com tesoura, em preto e branco", legenda: "Barba desenhada", span: "" },
  { photo: photos.galeria4, alt: "Barbeiro finalizando corte na nuca", legenda: "Acabamento na nuca", span: "" },
  { photo: photos.galeria5, alt: "Toalha quente sendo aplicada no rosto do cliente", legenda: "Toalha quente", span: "" },
  { photo: photos.galeria6, alt: "Máquinas de corte organizadas na bancada", legenda: "Nossas ferramentas", span: "md:col-span-2" },
];

export default function Home() {
  return (
    <PageShell>
      <Hero />

      {/* Em alta */}
      <section aria-labelledby="em-alta" className="mx-auto max-w-6xl px-4 py-24 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            id="em-alta"
            eyebrow="Em alta"
              title="Os mais pedidos da cadeira"
              intro="Os serviços que a vizinhança não larga. Escolha um e agende em menos de um minuto."
            />
          <ButtonLink href="/menu" variant="secondary" arrow>
            Menu completo
          </ButtonLink>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.slice(0, 6).map((s) => (
            <ServiceCard key={s.slug} servico={s} />
          ))}
        </div>
      </section>

      {/* Nosso trabalho */}
      <section aria-labelledby="trabalho" className="bg-tb-charcoal/40 py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <SectionHeading id="trabalho" eyebrow="Nosso trabalho" title="Feito à mão, cadeira por cadeira" />
          <ul className="mt-12 grid auto-rows-[240px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[200px] md:grid-cols-4">
            {galeria.map((g) => (
              <li key={g.legenda} className={`group relative ${g.span}`}>
                <RevealImage photo={g.photo} alt={g.alt} sizes="(min-width: 768px) 50vw, 100vw" className="h-full" />
                <p className="pointer-events-none absolute bottom-4 left-4 text-base font-bold transition-all duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  {g.legenda}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Agendamento */}
      <section id="agendar" aria-labelledby="titulo-agendar" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:px-8">
        <SectionHeading
            id="titulo-agendar"
            eyebrow="Agendamento"
            title="Reserve sua cadeira"
            intro="Escolha o barbeiro, o dia e o horário. O serviço você combina com a gente na cadeira."
          />
        <div className="mt-12">
          <Suspense
            fallback={<div role="status" aria-label="Carregando agendamento" className="h-[560px] animate-pulse bg-tb-charcoal" />}
          >
            <BookingWizard />
          </Suspense>
        </div>
      </section>

      {/* CTA */}
      <section className="group relative overflow-hidden">
        <div className="absolute inset-0">
          <RevealImage photo={photos.ctaFundo} alt="" sizes="100vw" className="h-full" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-tb-black/60" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-32">
          <SectionHeading
            eyebrow="Primeira vez aqui?"
            title="Conheça a história por trás da cadeira"
            intro="De uma cadeira emprestada a referência no bairro. Tem muito talento nessa história."
          />
          <ButtonLink href="/sobre" className="mt-8" arrow>
            Nossa história
          </ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
