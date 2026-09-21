"use client";

import { useState } from "react";
import { ServiceCard } from "@/components/menu/ServiceCard";
import { categorias, servicos, subcategorias, type CategoriaSlug } from "@/data/menu";

type Filtro = CategoriaSlug | "todos";

const abas: { slug: Filtro; nome: string }[] = [{ slug: "todos", nome: "Todos" }, ...categorias];

export function MenuBrowser() {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const visiveis = categorias.filter((c) => filtro === "todos" || c.slug === filtro);

  return (
    <>
      <div className="sticky top-14 z-40 -mx-4 border-b border-tb-cream/10 bg-tb-black/90 px-4 backdrop-blur-md md:top-15 md:-mx-8 md:px-8">
        <div role="tablist" aria-label="Categorias do menu" className="flex gap-6 overflow-x-auto py-4">
          {abas.map((a) => {
            const ativo = filtro === a.slug;
            const total = a.slug === "todos" ? servicos.length : servicos.filter((s) => s.categoria === a.slug).length;
            return (
              <button
                key={a.slug}
                role="tab"
                type="button"
                aria-selected={ativo}
                aria-controls="lista-servicos"
                onClick={() => setFiltro(a.slug)}
                className={`group relative shrink-0 py-2 text-base transition-colors duration-150 ${
                  ativo ? "font-bold text-tb-cream" : "text-tb-cream/60 hover:text-tb-cream"
                }`}
              >
                {a.nome} <span className="font-mono text-xs">{total}</span>
                <span
                  className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-tb-red transition-transform duration-300 ease-(--ease-curtain) ${
                    ativo ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div id="lista-servicos" role="tabpanel" className="space-y-16 pt-12">
        {visiveis.map((cat, ci) => {
          const subcats = subcategorias.filter((sc) => sc.categoria === cat.slug);

          return (
            <section key={cat.slug} id={cat.slug} aria-labelledby={`titulo-${cat.slug}`}>
              <h2 id={`titulo-${cat.slug}`} className="mb-8 flex items-center gap-4 text-2xl font-extrabold md:text-[32px]">
                {cat.nome}
                <span aria-hidden="true" className="h-px flex-1 bg-tb-cream/15" />
              </h2>

              {subcats.length === 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {servicos
                    .filter((s) => s.categoria === cat.slug)
                    .map((s, si) => (
                      <ServiceCard key={s.slug} servico={s} eager={ci === 0 && si < 3} />
                    ))}
                </div>
              ) : (
                <div className="space-y-12">
                  {subcats.map((sub) => {
                    const itensSub = servicos.filter((s) => s.categoria === cat.slug && s.subcategoria === sub.slug);
                    if (itensSub.length === 0) return null;
                    return (
                      <div key={sub.slug}>
                        <h3 className="text-lg leading-[1.4] font-bold">{sub.nome}</h3>
                        <p className="mt-2 max-w-2xl text-sm leading-[1.5] text-tb-cream/70">{sub.descricao}</p>
                        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {itensSub.map((s, si) => (
                            <ServiceCard key={s.slug} servico={s} eager={ci === 0 && si < 3} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
