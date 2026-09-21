@AGENTS.md

# Talentos Black — project pointers

- Arquitetura, stack, estrutura de pastas, dados e funcionalidades: `ARCHITECTURE.md`. Leia antes de mudanças não triviais.
- Design system (fonte de verdade da UI): `docs/design/`, comece em `docs/design/README.md`. Nunca introduza cor, fonte, espaçamento ou padrão de componente que não esteja documentado — estenda a doc primeiro, depois o código.
- Use o subagent `design-enforcer` (`.claude/agents/design-enforcer.md`) após qualquer mudança de frontend:
  - "review" / "audit" → relatório somente leitura
  - "review and fix" / "enforce" → audita e edita o código
- Tailwind 4 é CSS-first: tokens no bloco `@theme` de `app/globals.css` (utilitários `tb-*`). Não existe `tailwind.config.ts` — não recrie.
- Dados: `data/menu.ts` e `data/products.ts` (traduzidos de `docs/menu-items.csv`; preços em BRL são sugestões), `data/agenda.ts` (barbeiros, horários, endereço), `data/photos.ts` (fotos). Imagens são locais em `public/images/` (WebP).
- Agendamento: `components/booking/BookingWizard.tsx`, salvo só em `localStorage`. Não há pagamento online nem backend.
- Conteúdo fictício: endereço, WhatsApp, nomes dos barbeiros, história em `/sobre` e preços.
