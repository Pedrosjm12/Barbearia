# Chatbot — fluxo no Activepieces

O assistente do site ("Tire suas dúvidas", canto inferior direito) responde perguntas sobre horários, preços, serviços, produtos, agendamento e a história da barbearia. A orquestração roda no **[Activepieces](https://www.activepieces.com)**, uma alternativa open source ao n8n (licença MIT, editor visual de fluxos, gratuito quando você hospeda). O modelo de IA é o **Gemini**, pelo plano gratuito do Google AI Studio.

## Como as peças se conectam

```
Navegador ── POST /api/chat ──▶ Next.js (app/api/chat/route.ts)
                                  │  monta a base de conhecimento a partir de data/*.ts
                                  │  (lib/chatbot/contexto.ts) e envia { sistema, mensagens }
                                  ▼
                   Activepieces: Webhook (/sync) → Code (chama o Gemini) → Return Response
                                  │
Navegador ◀── { resposta } ───────┘
```

- **O conteúdo vem do código do site.** Mudou um preço em `data/menu.ts`? O bot já responde com o valor novo. O fluxo não guarda nenhuma informação da barbearia.
- **O navegador só fala com o próprio site.** A URL do webhook, o token e a chave do Gemini ficam no servidor (o CSP `connect-src 'self'` continua valendo).
- A rota limita o tamanho das perguntas (500 caracteres), o histórico (12 mensagens) e a frequência (20 perguntas a cada 5 minutos por IP).

## 1. Subir o Activepieces

Precisa do [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e aberto. Todos os comandos deste documento rodam no terminal do seu computador (PowerShell), não dentro do Docker. Rode:

```powershell
$dir = "$env:USERPROFILE\.activepieces"
New-Item -ItemType Directory -Force $dir | Out-Null
function Hex($n) { -join ((1..$n) | ForEach-Object { '{0:x2}' -f (Get-Random -Maximum 256) }) }
if (-not (Test-Path "$dir\secrets.env")) {
  "AP_JWT_SECRET=$(Hex 32)`nAP_ENCRYPTION_KEY=$(Hex 16)" | Set-Content "$dir\secrets.env" -Encoding ascii
}
docker run -d --name activepieces -p 8080:8080 -v "${dir}:/root/.activepieces" --env-file "$dir\secrets.env" -e AP_PORT=8080 -e AP_DB_TYPE=PGLITE -e AP_REDIS_TYPE=MEMORY -e AP_FRONTEND_URL="http://localhost:8080" activepieces/activepieces:latest
```

A imagem atual exige `AP_JWT_SECRET` (e o `AP_ENCRYPTION_KEY` protege as conexões salvas). Gere os dois **uma única vez** e guarde-os num arquivo fora do repositório; se trocá-los depois, o Activepieces perde acesso aos dados já salvos.

O `AP_PORT=8080` faz o app escutar na mesma porta da `AP_FRONTEND_URL`: o worker embutido se conecta a essa URL de dentro do container, e sem isso a tela do Activepieces quebra com `removeChild` e o log mostra `Socket.IO connection error`. A primeira execução baixa a imagem e o Activepieces leva cerca de um minuto para responder. Se o container já existir, use `docker start activepieces`. Para ver os logs: `docker logs activepieces`.

<details>
<summary>Linux / macOS (bash)</summary>

```bash
mkdir -p ~/.activepieces
[ -f ~/.activepieces/secrets.env ] || printf "AP_JWT_SECRET=%s\nAP_ENCRYPTION_KEY=%s\n" "$(openssl rand -hex 32)" "$(openssl rand -hex 16)" > ~/.activepieces/secrets.env
docker run -d --name activepieces -p 8080:8080 \
  -v ~/.activepieces:/root/.activepieces \
  --env-file ~/.activepieces/secrets.env \
  -e AP_PORT=8080 \
  -e AP_DB_TYPE=PGLITE \
  -e AP_REDIS_TYPE=MEMORY \
  -e AP_FRONTEND_URL="http://localhost:8080" \
  activepieces/activepieces:latest
```
</details>

Abra http://localhost:8080 e crie sua conta de administrador (é local, fica só na sua máquina).

> Em produção, hospede o Activepieces em um servidor (uma VPS pequena basta) e troque `AP_FRONTEND_URL` pelo domínio real. O servidor do site precisa conseguir acessar essa URL.

## 2. Pegar a chave do Gemini

Crie uma chave em https://aistudio.google.com/apikey. O plano gratuito tem limite de requisições por minuto e por dia, o que é suficiente para o volume de uma barbearia.

## 3. Montar o fluxo

No Activepieces, crie um fluxo chamado **Chatbot Talentos Black** com três passos:

**Gatilho — Webhook → Catch Webhook**
- Copie a URL mostrada (algo como `http://localhost:8080/api/v1/webhooks/<id-do-fluxo>`).
- Para testar o gatilho, rode o `curl` da seção 5 com a URL de teste que o editor mostrar.

**Passo 2 — Code**
- Cole o conteúdo de [`activepieces-code-step.js`](./activepieces-code-step.js).
- Crie as entradas (*inputs*):

  | Entrada | Valor |
  |---|---|
  | `corpo` | pelo seletor de dados: **Catch Webhook → body** |
  | `cabecalhos` | pelo seletor de dados: **Catch Webhook → headers** |
  | `token` | um segredo longo inventado por você (o mesmo de `CHATBOT_WEBHOOK_TOKEN`) |
  | `geminiKey` | a chave da seção 2 |

- O modelo fica na constante `MODELO` no topo do código (`gemini-3.5-flash-lite`, rápido e barato). Se o Google descontinuar esse modelo, troque por um modelo Flash atual da [lista de modelos](https://ai.google.dev/gemini-api/docs/models).

**Passo 3 — Webhook → Return Response**
- Status: `200`
- Tipo do corpo: JSON
- Corpo: `{"resposta": "{{step_1['resposta']}}"}` — uma chave só no início, e o valor entre aspas. Digite `{"resposta": "`, insira **Code → resposta** pelo seletor de dados e feche com `"}`.

  A rota do site também aceita a resposta em texto puro. Se o JSON sair quebrado (por exemplo, por aspas na resposta do Gemini), mude o tipo do corpo para texto e insira só **Code → resposta**.

  Depois de qualquer edição no fluxo, **republique**: a versão ativa continua com os valores antigos até lá.

Publique o fluxo.

## 4. Configurar o site

Crie `.env.local` na raiz do projeto (já está no `.gitignore`), a partir de `.env.example`:

```env
CHATBOT_WEBHOOK_URL=http://localhost:8080/api/v1/webhooks/<id-do-fluxo>/sync
CHATBOT_WEBHOOK_TOKEN=<o mesmo segredo do passo Code>
```

Para gerar um segredo longo no PowerShell:

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])
```

O **`/sync` no final é obrigatório**: sem ele o Activepieces responde na hora, sem esperar o fluxo, e o bot fica sem resposta.

Reinicie o `npm run dev`. Sem `CHATBOT_WEBHOOK_URL`, o widget continua aparecendo, mas avisa que o chat não está configurado e indica o WhatsApp.

## 5. Testar

No PowerShell, `curl` é um alias de outro comando e as aspas do JSON dão problema; use `Invoke-RestMethod`.

Direto no fluxo (troque a URL e o token):

```powershell
$corpo = '{"sistema":"Responda em uma frase.","mensagens":[{"papel":"usuario","texto":"Oi, tudo bem?"}]}'
Invoke-RestMethod -Method Post -Uri "http://localhost:8080/api/v1/webhooks/<id-do-fluxo>/sync" -ContentType "application/json; charset=utf-8" -Headers @{ "x-chatbot-token" = "<segredo>" } -Body ([Text.Encoding]::UTF8.GetBytes($corpo))
```

Pelo site, com o `npm run dev` rodando:

```powershell
$corpo = '{"mensagens":[{"papel":"usuario","texto":"Quanto custa o low fade?"}]}'
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/chat" -ContentType "application/json; charset=utf-8" -Body ([Text.Encoding]::UTF8.GetBytes($corpo))
```

<details>
<summary>Linux / macOS / Git Bash (curl)</summary>

```bash
curl -X POST "http://localhost:8080/api/v1/webhooks/<id-do-fluxo>/sync" \
  -H "Content-Type: application/json" \
  -H "x-chatbot-token: <segredo>" \
  -d '{"sistema":"Responda em uma frase.","mensagens":[{"papel":"usuario","texto":"Oi, tudo bem?"}]}'

curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"mensagens":[{"papel":"usuario","texto":"Quanto custa o low fade?"}]}'
```

</details>

Resposta esperada: `{"resposta":"..."}`. No Windows PowerShell 5.1 os acentos podem sair estragados no console (`duraÃ§Ã£o`): é só a exibição, o `Invoke-RestMethod` lê o UTF-8 como ANSI. No widget do site aparecem normais.

## Problemas comuns

| Sintoma | Causa provável |
|---|---|
| `502` na rota e `[chat] resposta inválida do webhook (status 200)` no terminal do Next | O fluxo devolveu corpo vazio: veja a aba **Runs** → saída do passo Code (campo `erro`) e confira se o Return Response tem o corpo preenchido |
| `erro: "não autorizado"` no Code | O `token` do passo Code é diferente de `CHATBOT_WEBHOOK_TOKEN` |
| `erro` do Gemini (`API key not valid`, `models/... is not found`) | Chave errada ou nome do modelo inexistente: ajuste `geminiKey` ou `MODELO` |
| `410` do Activepieces | URL com ID de fluxo antigo/não publicado: copie a URL de produção do gatilho, com `/sync`, e reinicie o `npm run dev` |
| Test do Return Response: `Expected JSON, received: }` | Corpo JSON mal formado (chaves a mais ou valor sem aspas) |
| Botão do chat não aparece | Veja se `.btn-fill` continua em `@layer components` em `app/globals.css` |

Se vier `502` e a tabela não resolver, olhe o terminal do Next (`[chat] ...`) e a aba **Runs** do fluxo no Activepieces.

## Ajustes comuns

- **Tom, regras e o que o bot pode dizer:** `montarInstrucoes()` em `lib/chatbot/contexto.ts`.
- **Novas informações** (ex.: formas de pagamento, estacionamento): coloque em `data/` e inclua uma seção em `lib/chatbot/contexto.ts`, para o site e o bot mostrarem a mesma coisa.
- **Segredos:** o `token` e a `geminiKey` ficam salvos dentro do fluxo. Se exportar o fluxo para JSON, troque os dois por placeholders antes de compartilhar e não coloque o arquivo no git.
- **Trocar o modelo de IA:** só o passo Code muda; o contrato `{ sistema, mensagens } → { resposta }` continua o mesmo.
