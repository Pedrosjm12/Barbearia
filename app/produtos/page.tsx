import type { Metadata } from "next";
import { ProductCard } from "@/components/produtos/ProductCard";
import { PageShell } from "@/components/transition/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { produtos } from "@/data/products";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Pomadas, shampoos, talcos e cremes vendidos na Talentos Black para continuar o cuidado em casa.",
};

export default function ProdutosPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 pt-32 pb-24 md:px-8 md:pt-40">
        <SectionHeading
          as="h1"
          eyebrow="Produtos"
          title="Leve o cuidado da barbearia pra casa"
          intro="Selecionamos as linhas que usamos na cadeira. Disponíveis para compra presencial, direto no balcão."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {produtos.map((p, i) => (
            <ProductCard key={p.slug} produto={p} eager={i < 3} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
