@AGENTS.md

# Talentos Black — project pointers

- Full architecture, stack, folder structure, data model, and implementation status: `ARCHITECTURE.md`. Read it before non-trivial changes.
- Design system (source of truth for all UI work): `docs/design/`, start at `docs/design/README.md`. Never introduce a color, font, spacing value, or component pattern not already documented there — extend the docs first, then the code.
- Use the `design-enforcer` subagent (`.claude/agents/design-enforcer.md`) after any frontend change:
  - "review" / "audit" → read-only compliance report
  - "review and fix" / "enforce" → audits and edits the code directly
- Tailwind 4 is CSS-first: tokens live in the `@theme` block of `app/globals.css` (`tb-*` utilities). There is no `tailwind.config.ts` — don't recreate one without checking `ARCHITECTURE.md` §6 first.
- Menu/pricing data: `data/menu.ts` (translated from `docs/menu-items.csv`, BRL prices are placeholders). Booking: `components/booking/BookingWizard.tsx`, state simulated via `data/agenda.ts` and `localStorage`. Payments: `lib/payments.ts` is a mock provider — not wired to a real processor.
- Placeholder content still in place: address, WhatsApp number, barber names, and the `/sobre` story are fictional.
