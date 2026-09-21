# Talentos Black

Website for **Talentos Black**, a neighborhood barbershop in Uberlândia (MG). Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4.

> For full architecture, folder structure, data model, and implementation status, see [`ARCHITECTURE.md`](./ARCHITECTURE.md) — the source of truth for how this project is put together.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

No environment variables, database, or external services are required — this is a static frontend with simulated booking (saved in `localStorage`) and no online payment.

## Pages

- `/` — home (hero, destaques, galeria, agendamento, CTA)
- `/sobre` — história da barbearia
- `/menu` — cardápio de serviços por categoria
- `/produtos` — produtos vendidos no balcão

## Design system

All UI work must follow the design system documented in [`docs/design/`](./docs/design/) (start at `docs/design/README.md`). Never introduce a color, font, spacing value, or component pattern that isn't already documented there — extend the docs first, then the code.

Use the `design-enforcer` subagent (`.claude/agents/design-enforcer.md`) to audit or fix UI code against the design system:
- "review" / "audit" → read-only compliance report
- "review and fix" / "enforce" → audits **and** edits the code directly

## Important: this is not the Next.js you know

This project pins Next.js/React/Tailwind versions newer than most model training data, with breaking API/convention changes. See [`AGENTS.md`](./AGENTS.md) before writing framework code — it points to `node_modules/next/dist/docs/` for the authoritative, version-matched docs.

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
