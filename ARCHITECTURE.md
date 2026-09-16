# Architecture — FADE Barbershop

Reference document for how this project is put together: stack, structure, data, conventions, and current implementation state. Read this before making changes, especially after time away from the project.

---

## 1. What this project is

A website for **FADE**, a premium urban barbershop. Repository: [Pedrosjm12/Barbearia](https://github.com/Pedrosjm12/Barbearia). It was split out of a personal monorepo (`Pedrosjm12/Projetos`) into its own repository on 2026-09-16, following the same pattern used for the `Marcenaria` project.

The visual identity is defined by a reference mockup (`docs/design/references/design-barbearia.webp`) and fully specified in `docs/design/`. **The design system documentation is more complete than the actual app code right now** — see [§5 Implementation status](#5-implementation-status) before assuming anything in `app/` reflects the brand.

---

## 2. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16.3.5** (App Router) | Pinned to a version newer than the model's training data — see `AGENTS.md` below |
| UI library | **React 19.2.8** | |
| Language | **TypeScript 5** (strict mode) | `tsconfig.json` uses `strict: true`, path alias `@/*` → repo root |
| Styling | **Tailwind CSS 4** via `@tailwindcss/postcss` | CSS-first config (`@theme` in `app/globals.css`), **not** the classic JS-config model — see the warning in §6 |
| Linting | ESLint 9, flat config (`eslint.config.mjs`), `eslint-config-next` | |
| Package manager | npm (`package-lock.json` present) | |

### ⚠️ Read this before writing Next.js/Tailwind code

`AGENTS.md` (imported by `CLAUDE.md`) states this Next.js version has **breaking changes vs. training data** and instructs reading `node_modules/next/dist/docs/` before writing code, because APIs/conventions may differ from what's expected. This applies equally to Tailwind 4, which changed its configuration model substantially from v3 (see §6). Don't assume v3-era Tailwind or pre-16 Next.js patterns are correct here without checking.

---

## 3. Folder structure

```
barbearia/
├── .claude/
│   └── agents/
│       └── design-enforcer.md      # Subagent: audits code against docs/design/
├── app/                             # Next.js App Router
│   ├── layout.tsx                   # Root layout — currently default create-next-app boilerplate
│   ├── page.tsx                     # Home page — currently default create-next-app boilerplate
│   ├── globals.css                  # Tailwind entry + FADE design tokens as CSS variables
│   └── favicon.ico
├── docs/
│   ├── design/                      # THE design system — source of truth for all UI work
│   │   ├── README.md                # Start here: system overview & navigation
│   │   ├── INDEX.md                 # Full documentation map, "I need to..." task index
│   │   ├── QUICK-REFERENCE.md       # One-page cheat sheet (tokens, states, checklist)
│   │   ├── STYLE-GUIDE.md           # Brand identity, voice, content/copy standards
│   │   ├── COLOR-PALETTE.md         # The 5 approved colors + usage rules
│   │   ├── TYPOGRAPHY.md            # Type scale, families (Inter / JetBrains Mono), hierarchy
│   │   ├── DESIGN-TOKENS.md         # Canonical token values (spacing, shadow, radius, motion)
│   │   ├── COMPONENTS.md            # Per-component specs (Button, Input, Card, Modal, ...)
│   │   ├── PAGE-PATTERNS.md         # Section/page layout patterns (Hero, Services, CTA, Footer...)
│   │   ├── IMPLEMENTATION.md        # Tailwind config + React code examples for every component
│   │   └── references/
│   │       └── design-barbearia.webp # Original visual reference mockup
│   └── menu-items.csv               # Barbershop services menu (see §4)
├── public/                          # Static assets (currently just default Next.js SVGs — placeholders)
├── tailwind.config.ts                # ⚠️ See §6 — may be redundant/inert under Tailwind 4
├── next.config.ts                    # Empty/default — no custom Next.js config yet
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── package.json
├── AGENTS.md                         # Repo-level agent instructions (imported by CLAUDE.md)
├── CLAUDE.md                         # `@AGENTS.md` — Claude Code entry point
└── README.md                         # Default create-next-app README — not yet project-specific
```

There is **no `components/` directory yet**. `docs/design/COMPONENTS.md` and `docs/design/IMPLEMENTATION.md` describe a full component set (Button, Input, Card, Modal, ServiceCard, etc.) that has been **designed but not built**.

---

## 4. Data: the services menu

`docs/menu-items.csv` is the source of truth for what FADE sells. It is a flat CSV, not yet wired into any code (no fetch/import of it exists in `app/`).

**Schema:**

| Column | Type | Notes |
|---|---|---|
| `name` | string | Service name |
| `category` | string | One of: `Haircuts`, `Beard Trims`, `Shaves`, `Lineups`, `Styling`, `Add-ons`, `Packages` |
| `price` | string (`"$NN"`) | Formatted with `$` prefix; parse before doing math |
| `isRecommended` | `"true"` \| `"false"` | Drives the "house recommendation" badge described in the original request |
| `description` | string | May contain commas — the `Signature Package` and `Executive Package` rows are quoted for this reason; use a real CSV parser, not `split(',')` |

30 rows across 7 categories, prices from $10–$95. When this becomes a real feature, it will likely be read at build time (e.g. via a small server-side CSV parser or converted to JSON/a Next.js data file) and rendered through the `ServiceCard` / pricing patterns already specified in `docs/design/PAGE-PATTERNS.md`.

---

## 5. Implementation status

**Be precise about this — it's the most important thing to know before touching the app.**

| Area | Status |
|---|---|
| Design system docs | ✅ Complete (`docs/design/`) |
| Design tokens in CSS | ✅ Present in `app/globals.css` (`--color-*`, `--space-*`, `--transition-*`, dark-mode-by-default body styles, `prefers-reduced-motion`, focus-visible ring) |
| Tailwind config for tokens | ⚠️ Written (`tailwind.config.ts`) but its relationship to Tailwind 4's CSS-first `@theme` config needs verification — see §6 |
| Root layout (`app/layout.tsx`) | ❌ Still default `create-next-app` output — Geist fonts (not Inter/JetBrains Mono per `docs/design/TYPOGRAPHY.md`), generic `<title>`/`<meta>`, no FADE branding |
| Home page (`app/page.tsx`) | ❌ Still default `create-next-app` starter content — no Hero/Services/CTA/Footer sections from `docs/design/PAGE-PATTERNS.md` |
| Reusable components | ❌ None exist yet (`Button`, `Input`, `Card`, `Modal`, `ServiceCard`, etc. are specced in `COMPONENTS.md`/`IMPLEMENTATION.md` but not built) |
| Menu data consumption | ❌ `docs/menu-items.csv` is not read/rendered anywhere |
| `design-enforcer` subagent | ✅ Created (`.claude/agents/design-enforcer.md`) — ready to audit once real UI exists |
| Booking/contact functionality | ❌ Not started (no forms, no backend, no API routes) |

**In short**: this is a fully-specified design system sitting on top of an unmodified Next.js starter template. The next real milestone is building `app/layout.tsx`, `app/page.tsx`, and a `components/` directory that actually implement what `docs/design/` describes.

---

## 6. Known risk: Tailwind 4 config duplication

Two things currently define the same tokens in two different places:

1. `tailwind.config.ts` — classic `theme.extend.colors` / `spacing` / etc. (v3-style JS config)
2. `app/globals.css` — `@theme inline { ... }` block plus a separate `:root { ... }` block, both redefining the same colors/spacing as CSS custom properties

Tailwind CSS 4's primary configuration path is CSS-first (`@theme` in the CSS entry file); a `tailwind.config.ts` is only picked up if explicitly referenced via `@config` in CSS, which **does not currently exist** in `app/globals.css`. That means `tailwind.config.ts` may not be doing anything right now, and the `fade-*` utility classes it defines (`bg-fade-black`, `text-fade-cream`, etc. — used throughout `docs/design/IMPLEMENTATION.md` code samples) may not actually be generated.

**Before building real components**, verify (via `node_modules/next/dist/docs/` and the installed Tailwind version's own docs, per the `AGENTS.md` instruction) whether:
- `tailwind.config.ts` needs a `@config "../tailwind.config.ts";` line in `globals.css` to take effect, or
- the config should be fully migrated into the `@theme inline` block in `globals.css` and `tailwind.config.ts` deleted, or
- the current split is intentional and works as-is (test by using a `bg-fade-red` class in a component and checking it renders).

This is exactly the kind of gap `design-enforcer` and a general code review should catch once real UI code exists.

---

## 7. Conventions

### Commits
- Conventional-ish prefixes seen in history: `feat(scope): ...`, `chore: ...`, `test(scope): ...`
- Portuguese is used for some commit bodies/descriptions, English for others — no strict rule enforced, follow the tone of nearby recent commits
- Attribution trailer is dictated per-session by the environment's system reminder (currently `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`) — always use whatever the active session specifies, not a hardcoded value copied from an old commit

### Design work
- **Never** introduce a color, font, spacing value, or component pattern not already in `docs/design/`. Extend the docs first, then the code.
- Use the `design-enforcer` subagent (`.claude/agents/design-enforcer.md`) to audit UI changes:
  - "review" / "audit" → read-only compliance report
  - "review and fix" / "enforce" → audits **and** edits the code directly
- Dark mode is the default and primary brand presentation (not an alternate theme) — see `docs/design/COLOR-PALETTE.md`.

### Content/copy
- Sentence case, active voice, specific and benefit-focused — full rules in `docs/design/STYLE-GUIDE.md#content-standards`.

---

## 8. Running the project

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

No environment variables, database, or external services are configured yet — this is a static frontend at this stage.

---

## 9. Suggested next steps

Roughly in order of dependency:

1. **Resolve the Tailwind config question** (§6) — confirm `fade-*` utilities actually compile before building on top of them.
2. **Rebuild `app/layout.tsx`**: swap Geist for Inter/JetBrains Mono (`docs/design/TYPOGRAPHY.md`), set real metadata (title/description for FADE), apply dark-mode-by-default html/body per `docs/design/COLOR-PALETTE.md`.
3. **Build the core component set** in a new `components/` directory per `docs/design/COMPONENTS.md` + the code samples in `docs/design/IMPLEMENTATION.md`: `Button`, `Input`, `ServiceCard`, `Modal` at minimum.
4. **Wire up `docs/menu-items.csv`**: parse it (server-side, build-time) and render it through the Services/Pricing patterns in `docs/design/PAGE-PATTERNS.md`, using the `isRecommended` flag for the house-recommendation badge.
5. **Rebuild `app/page.tsx`** as a real homepage: Hero → Services → Testimonials → Pricing → CTA → Contact/Hours → Footer, per `docs/design/PAGE-PATTERNS.md`.
6. **Run `design-enforcer` in review-and-fix mode** once real UI exists, to catch drift from the spec early.
7. Only after the above: booking form / backend, if the project scope grows that direction.

---

*Last updated: 2026-09-16. Keep this file in sync when the implementation status in §5 changes — it's meant to always reflect reality, not the original plan.*
