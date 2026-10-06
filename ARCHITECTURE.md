# Architecture — Talentos Black Barbershop

Como o projeto está montado: stack, estrutura, dados, convenções e estado atual. Leia antes de mudanças não triviais.

Site da **Talentos Black**, barbearia de bairro em Uberlândia (MG). Repositório: [Pedrosjm12/Barbearia](https://github.com/Pedrosjm12/Barbearia). O sistema visual (cores, tipografia) vem do mockup `docs/design/references/design-barbearia.webp` e está especificado em `docs/design/`.

---

## 1. Stack

| Camada | Escolha | Notas |
|---|---|---|
| Framework | **Next.js 16.3.5** (App Router) | Versão com breaking changes — ver `AGENTS.md` |
| UI | **React 19.2.8** | Usa `<ViewTransition>` para transição de páginas |
| Linguagem | **TypeScript 5** (strict) | Alias `@/*` → raiz do repo |
| Estilo | **Tailwind CSS 4** (`@tailwindcss/postcss`) | CSS-first: tokens no `@theme` de `app/globals.css` (utilitários `tb-*`). Não há `tailwind.config.ts` |
| Lint | ESLint 9 (flat config) + `eslint-config-next` | |
| Pacotes | npm | |

Sem banco de dados. A única parte com servidor é o chatbot: `app/api/chat/route.ts` repassa as perguntas a um fluxo no **Activepieces** (alternativa open source ao n8n), que chama o **Gemini**. Variáveis de ambiente: `CHATBOT_WEBHOOK_URL` e `CHATBOT_WEBHOOK_TOKEN` (ver `.env.example`). Guia: `docs/chatbot/ACTIVEPIECES.md`.

---

## 2. Estrutura

```
barbearia/
├── .claude/agents/design-enforcer.md  # Subagent que audita o código contra docs/design/
├── app/
│   ├── layout.tsx        # Inter + JetBrains Mono, lang="pt-BR", Header/Footer, linha "cortina" vermelha
│   ├── globals.css       # Tailwind + tokens (@theme) + CSS das view transitions e do botão (.btn-fill)
│   ├── api/chat/route.ts # Chatbot: valida, monta o contexto e chama o webhook do Activepieces
│   ├── page.tsx          # Home: hero, em alta, galeria, agendamento, CTA
│   ├── sobre/page.tsx    # História da barbearia
│   ├── menu/page.tsx     # Serviços por categoria/subcategoria
│   └── produtos/page.tsx # Produtos vendidos no balcão
├── components/
│   ├── booking/BookingWizard.tsx  # Agendamento
│   ├── chat/ChatWidget.tsx        # Assistente virtual flutuante (montado no layout)
│   ├── home/Hero.tsx
│   ├── layout/{Header,Footer}.tsx
│   ├── menu/{MenuBrowser,ServiceCard}.tsx
│   ├── produtos/ProductCard.tsx
│   ├── transition/PageShell.tsx   # Wrapper <ViewTransition> (envolva cada página, não o layout)
│   ├── transition/PrefetchImagens.tsx # Pré-carrega imagens das outras páginas no tempo ocioso
│   └── ui/{Button,RevealImage,SectionHeading}.tsx
├── data/
│   ├── menu.ts       # Serviços, categorias, subcategorias, formatPreco
│   ├── products.ts   # Produtos de balcão
│   ├── agenda.ts     # Barbeiros, dias/horários de funcionamento, endereço, WhatsApp
│   ├── photos.ts     # Mapa de fotos (Unsplash) por item, com créditos
│   └── sobre.ts      # História, valores e citação da página /sobre
├── docs/
│   ├── chatbot/      # Guia do fluxo no Activepieces + código do passo Code
│   ├── design/       # Design system (fonte de verdade da UI) — comece em README.md
│   └── menu-items.csv # Cardápio original (EN/USD) que originou data/menu.ts e data/products.ts
├── lib/chatbot/contexto.ts # Instruções e base de conhecimento do bot, geradas de data/*.ts
├── .env.example      # Variáveis do chatbot (copie para .env.local, que não vai para o git)
└── public/images/    # Fotos em WebP servidas localmente
```

---

## 3. Dados

- **`data/menu.ts`** — traduzido de `docs/menu-items.csv` para PT-BR/BRL. **Preços são sugestões a confirmar.** Cortes, barba e adicionais são agrupados em `subcategorias`; `destaque` alimenta a seção "em alta" da home.
- **`data/products.ts`** — pomadas, shampoos, talcos e cremes. Vendidos só presencialmente; sem compra online.
- **`docs/menu-items.csv`** — não é lido pelo código; os arquivos `data/*.ts` são escritos à mão a partir dele. Ao mudar o cardápio, atualize os dois.
- **Imagens** — escolhidas item a item em `data/photos.ts` (licença Unsplash, créditos no rodapé), baixadas e convertidas para WebP em `public/images/` (skill `baixar-imagem-webp`). `next.config.ts` está vazio: não há hosts remotos de imagem.

---

## 4. Funcionalidades

- **Navegação**: Início, Sobre, Menu, Produtos (header responsivo com menu mobile).
- **Menu de serviços**: filtro por categoria, agrupamento por subcategoria, cards com foto, preço e selo de recomendação.
- **Produtos**: listagem de itens de balcão.
- **Agendamento** (`BookingWizard`): 2 etapas (barbeiro/dia/horário → dados do cliente) + confirmação. Sem escolha de serviço (o cliente define com o barbeiro na cadeira) e sem pagamento (feito no local). Agendamentos ficam apenas em `localStorage` (`tb-agendamentos`); a ocupação de horários é simulada por `data/agenda.ts`.
- **Chatbot** (`ChatWidget` → `/api/chat` → Activepieces → Gemini): responde sobre horários, preços, serviços, produtos, agendamento e história. A base de conhecimento é gerada de `data/*.ts` a cada pergunta (`lib/chatbot/contexto.ts`), então acompanha o site sem ajuste manual. O bot não agenda nem vê horários livres. Sem `CHATBOT_WEBHOOK_URL`, o widget avisa que o chat não está configurado.
- **Transições de página**: `<ViewTransition>` + CSS "cortina" em `globals.css`. Animações só com `transform`/`opacity` (nada de `clip-path`/`filter` nos snapshots); o chat some durante a cortina; animações de entrada da página nova esperam a cortina acabar; `PrefetchImagens` pré-carrega as imagens das outras páginas porque o React segura a transição até as imagens visíveis carregarem.

### Placeholders (fictícios)

Endereço, WhatsApp, nomes dos barbeiros, história em `/sobre` e preços.

---

## 5. Convenções

- **Design**: nunca introduza cor, fonte, espaçamento ou padrão de componente que não esteja em `docs/design/` — estenda a doc primeiro. Dark mode é a apresentação principal da marca.
- **design-enforcer**: rode após mudanças de frontend. "review"/"audit" = relatório somente leitura; "review and fix"/"enforce" = audita e edita.
- **CSS global e Tailwind 4**: regras em `globals.css` fora de `@layer` vencem os utilitários do Tailwind (que ficam em `@layer utilities`). Se uma classe própria define `position`, `display` etc., coloque-a em `@layer components` — foi assim que `.btn-fill` deixou de anular o `fixed` do botão do chat.
- **Copy**: PT-BR, sentence case, voz ativa (`docs/design/STYLE-GUIDE.md`).
- **Commits**: prefixos convencionais (`feat:`, `docs:`, `chore:`), mensagens em português. O trailer de atribuição segue o que a sessão atual especificar.

---

## 6. Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

---

*Última atualização: 2026-10-01. Mantenha em sincronia com o código.*
