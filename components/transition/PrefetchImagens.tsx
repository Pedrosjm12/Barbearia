"use client";

import { useEffect } from "react";

// Imagens por página: cobre a primeira dobra (o que o React espera antes da cortina).
const LIMITE_POR_PAGINA = 6;

/**
 * Durante uma View Transition o React segura a troca de página até as imagens
 * visíveis da página nova carregarem (até ~0,5–0,8 s), o que atrasava a cortina
 * na primeira visita. Aqui, com o navegador ocioso, buscamos o HTML estático das
 * outras páginas e pré-carregamos as primeiras imagens com o mesmo srcset/sizes do
 * next/image, para que já estejam no cache quando o usuário navegar.
 */
export function PrefetchImagens({ rotas }: { rotas: string[] }) {
  useEffect(() => {
    const conexao = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conexao?.saveData) return;

    let cancelado = false;
    const preparar = async () => {
      for (const rota of rotas) {
        if (cancelado) return;
        if (rota === location.pathname) continue;
        try {
          const html = await (await fetch(rota)).text();
          const doc = new DOMParser().parseFromString(html, "text/html");
          doc.querySelectorAll<HTMLImageElement>("main img").forEach((img, i) => {
            if (i >= LIMITE_POR_PAGINA) return;
            const pre = new Image();
            pre.fetchPriority = "low";
            // sizes antes de srcset, para o navegador escolher o mesmo candidato que a página usará.
            pre.sizes = img.sizes;
            pre.srcset = img.srcset;
            if (!img.srcset) pre.src = img.src;
          });
        } catch {
          // Pré-carregamento é só otimização: se falhar, a navegação segue normal.
        }
      }
    };

    // Safari não tem requestIdleCallback.
    const temOcioso = typeof (window.requestIdleCallback as unknown) === "function";
    const id = temOcioso
      ? window.requestIdleCallback(() => void preparar(), { timeout: 4000 })
      : window.setTimeout(() => void preparar(), 2000);
    return () => {
      cancelado = true;
      if (temOcioso) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, [rotas]);

  return null;
}
