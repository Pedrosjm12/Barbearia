import { RevealImage } from "@/components/ui/RevealImage";
import { formatPreco, type Produto } from "@/data/products";

export function ProductCard({ produto, eager }: { produto: Produto; eager?: boolean }) {
  return (
    <article className="flex flex-col bg-tb-charcoal shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <RevealImage
        photo={produto.foto}
        alt={produto.alt}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="aspect-[4/3]"
        eager={eager}
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-2xl leading-[1.3] font-bold">{produto.nome}</h3>
          <p className="shrink-0 font-mono text-lg font-medium text-tb-cream">{formatPreco(produto.preco)}</p>
        </div>
        <p className="mt-2 flex-1 text-sm leading-[1.5] text-tb-cream/75">{produto.descricao}</p>
      </div>
    </article>
  );
}
