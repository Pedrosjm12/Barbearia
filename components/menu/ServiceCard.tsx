import Link from "next/link";
import { RevealImage } from "@/components/ui/RevealImage";
import { formatPreco, type Servico } from "@/data/menu";

export function ServiceCard({ servico, eager }: { servico: Servico; eager?: boolean }) {
  return (
    <article className="group relative flex flex-col bg-tb-charcoal shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <div className="relative">
        <RevealImage
          photo={servico.foto}
          alt={servico.alt}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[4/3]"
          eager={eager}
        />
        {servico.destaque && (
          <span className="absolute top-4 left-4 bg-tb-red px-2 py-1 text-xs font-bold text-tb-black">
            Recomendado da casa
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-2xl leading-[1.3] font-bold">{servico.nome}</h3>
          <p className="shrink-0 font-mono text-lg font-medium text-tb-cream">{formatPreco(servico.preco)}</p>
        </div>
        <p className="mt-2 flex-1 text-sm leading-[1.5] text-tb-cream/75">{servico.descricao}</p>
        <div className="mt-6 flex items-center justify-between">
          <span className="font-mono text-xs font-medium text-tb-cream/60">{servico.duracaoMin} min</span>
          <Link
            href={`/?servico=${servico.slug}#agendar`}
            className="inline-flex items-center gap-2 text-sm font-bold text-tb-red after:absolute after:inset-0 hover:underline hover:underline-offset-4"
          >
            Agendar <span className="sr-only">{servico.nome}</span>
            <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
