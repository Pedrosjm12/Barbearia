import type { Metadata } from "next";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { PageShell } from "@/components/transition/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Menu de serviços",
  description: "Cortes, barba, barbear na navalha, acabamentos, finalização, adicionais e combos da Talentos Black.",
};

export default function MenuPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 pt-32 pb-24 md:px-8 md:pt-40">
        <SectionHeading
          as="h1"
          eyebrow="Menu"
          title="Tudo o que a gente faz na cadeira"
          intro="Do degradê ao barbear na navalha. Escolha uma categoria e veja os detalhes — o serviço final é combinado com o barbeiro na cadeira."
        />
        <div className="mt-12">
          <MenuBrowser />
        </div>
      </div>
    </PageShell>
  );
}
