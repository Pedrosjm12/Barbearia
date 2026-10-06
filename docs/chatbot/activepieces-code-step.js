// Passo "Code" do fluxo do chatbot no Activepieces (ver ACTIVEPIECES.md).
// Cole este arquivo inteiro no editor do passo e configure as entradas:
//   corpo       → {{trigger.body}}      (corpo da requisição do webhook)
//   cabecalhos  → {{trigger.headers}}   (cabeçalhos da requisição do webhook)
//   token       → o mesmo valor de CHATBOT_WEBHOOK_TOKEN do .env.local do site
//   geminiKey   → sua chave do Google AI Studio (https://aistudio.google.com/apikey)

const MODELO = "gemini-3.5-flash-lite";

export const code = async (inputs) => {
  const { corpo, cabecalhos, token, geminiKey } = inputs;

  if (!token || cabecalhos?.["x-chatbot-token"] !== token) {
    return { resposta: "", erro: "não autorizado" };
  }

  const contents = (corpo?.mensagens ?? []).map((m) => ({
    role: m.papel === "usuario" ? "user" : "model",
    parts: [{ text: String(m.texto) }],
  }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": geminiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: String(corpo?.sistema ?? "") }] },
        contents,
        generationConfig: { temperature: 0.3, maxOutputTokens: 600 },
      }),
    },
  );

  const dados = await res.json();
  if (!res.ok) {
    return { resposta: "", erro: dados?.error?.message ?? `Gemini respondeu ${res.status}` };
  }

  const resposta = (dados?.candidates?.[0]?.content?.parts ?? [])
    .map((p) => p.text ?? "")
    .join("")
    .trim();

  return { resposta };
};
