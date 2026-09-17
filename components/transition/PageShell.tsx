import { ViewTransition, type ReactNode } from "react";

/**
 * Envolve o conteúdo de cada página para a "cortina" de transição
 * (DESIGN-TOKENS.md → Signature motion). Fica em cada page.tsx, não no layout,
 * porque layouts persistem e não disparam enter/exit.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-curtain" exit="page-curtain" default="none">
      <main id="conteudo" className="flex-1">
        {children}
      </main>
    </ViewTransition>
  );
}
