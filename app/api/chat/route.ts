import { montarInstrucoes } from "@/lib/chatbot/contexto";

// Ponte entre o widget de chat e o fluxo do Activepieces (docs/chatbot/ACTIVEPIECES.md).
// O fluxo recebe { sistema, mensagens }, chama o modelo de IA e devolve { resposta }.

type Mensagem = { papel: "usuario" | "assistente"; texto: string };

const MAX_MENSAGENS = 12;
const MAX_CARACTERES = 500;
const TIMEOUT_MS = 30_000;

// Limite simples por IP, em memória (reinicia junto com o servidor).
const JANELA_MS = 5 * 60_000;
const MAX_POR_JANELA = 20;
const acessos = new Map<string, number[]>();

function excedeuLimite(ip: string) {
  const agora = Date.now();
  const recentes = (acessos.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  recentes.push(agora);
  acessos.set(ip, recentes);
  if (acessos.size > 5_000) acessos.clear();
  return recentes.length > MAX_POR_JANELA;
}

function validar(corpo: unknown): Mensagem[] | null {
  const mensagens = (corpo as { mensagens?: unknown })?.mensagens;
  if (!Array.isArray(mensagens) || mensagens.length === 0) return null;
  const validas = mensagens.slice(-MAX_MENSAGENS).filter(
    (m): m is Mensagem =>
      (m?.papel === "usuario" || m?.papel === "assistente") &&
      typeof m.texto === "string" &&
      m.texto.trim().length > 0,
  );
  const ultima = validas.at(-1);
  if (!ultima || ultima.papel !== "usuario" || ultima.texto.length > MAX_CARACTERES) return null;
  return validas.map((m) => ({ papel: m.papel, texto: m.texto.slice(0, MAX_CARACTERES * 4) }));
}

// O Return Response do Activepieces pode chegar como JSON { resposta } ou texto puro.
async function lerResposta(res: Response): Promise<string | null> {
  const bruto = (await res.text()).trim();
  if (!bruto) return null;
  try {
    const json: unknown = JSON.parse(bruto);
    if (typeof json === "string") return json.trim() || null;
    const resposta = (json as { resposta?: unknown })?.resposta;
    return typeof resposta === "string" && resposta.trim() ? resposta.trim() : null;
  } catch {
    return bruto;
  }
}

const erro = (mensagem: string, status: number) => Response.json({ erro: mensagem }, { status });

export async function POST(request: Request) {
  const webhook = process.env.CHATBOT_WEBHOOK_URL;
  if (!webhook) {
    return erro("O chat ainda não foi configurado. Fale com a gente pelo WhatsApp.", 503);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (excedeuLimite(ip)) {
    return erro("Muitas perguntas seguidas. Espere alguns minutos e tente de novo.", 429);
  }

  const mensagens = validar(await request.json().catch(() => null));
  if (!mensagens) {
    return erro(`Escreva sua pergunta com até ${MAX_CARACTERES} caracteres.`, 400);
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-chatbot-token": process.env.CHATBOT_WEBHOOK_TOKEN ?? "",
      },
      body: JSON.stringify({ sistema: montarInstrucoes(), mensagens }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    const resposta = res.ok ? await lerResposta(res) : null;
    if (!resposta) {
      console.error(`[chat] resposta inválida do webhook (status ${res.status})`);
      return erro("Não consegui responder agora. Tente de novo em instantes.", 502);
    }
    return Response.json({ resposta });
  } catch (e) {
    console.error("[chat] falha ao chamar o webhook", e);
    return erro("Não consegui responder agora. Tente de novo em instantes.", 502);
  }
}
