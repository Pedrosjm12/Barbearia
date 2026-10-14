import { montarInstrucoes } from "@/lib/chatbot/contexto";

// Ponte entre o widget de chat e o fluxo do Activepieces (docs/chatbot/ACTIVEPIECES.md).
// O fluxo recebe { sistema, mensagens }, chama o modelo de IA e devolve { resposta }.

type Mensagem = { papel: "usuario" | "assistente"; texto: string };

const MAX_MENSAGENS = 12;
const MAX_CARACTERES = 500;
const MAX_CORPO_BYTES = 16_000;
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
  if (acessos.size > 5_000) {
    for (const [chave, tempos] of acessos) {
      if (agora - tempos[tempos.length - 1] >= JANELA_MS) acessos.delete(chave);
    }
  }
  return recentes.length > MAX_POR_JANELA;
}

function validar(corpo: unknown): Mensagem[] | null {
  const mensagens = (corpo as { mensagens?: unknown })?.mensagens;
  if (!Array.isArray(mensagens) || mensagens.length === 0) return null;
  const validas = mensagens.slice(-MAX_MENSAGENS).filter(
    (m): m is Mensagem =>
      (m?.papel === "usuario" || m?.papel === "assistente") &&
      typeof m.texto === "string" &&
      m.texto.trim().length > 0 &&
      m.texto.length <= MAX_CARACTERES,
  );
  const ultima = validas.at(-1);
  if (!ultima || ultima.papel !== "usuario") return null;
  return validas.map((m) => ({ papel: m.papel, texto: m.texto }));
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
  const token = process.env.CHATBOT_WEBHOOK_TOKEN;
  if (!webhook || !token) {
    return erro("O chat ainda não foi configurado. Fale com a gente pelo WhatsApp.", 503);
  }

  // x-real-ip é definido pela hospedagem (ex.: Vercel); o primeiro item de x-forwarded-for o cliente consegue forjar.
  const ip =
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ||
    "local";
  if (excedeuLimite(ip)) {
    return erro("Muitas perguntas seguidas. Espere alguns minutos e tente de novo.", 429);
  }

  const bruto = await request.text().catch(() => "");
  if (bruto.length > MAX_CORPO_BYTES) return erro("Mensagem grande demais.", 413);
  let corpo: unknown = null;
  try {
    corpo = JSON.parse(bruto);
  } catch {}
  const mensagens = validar(corpo);
  if (!mensagens) {
    return erro(`Escreva sua pergunta com até ${MAX_CARACTERES} caracteres.`, 400);
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-chatbot-token": token,
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
