"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { endereco } from "@/data/agenda";

// Assistente virtual (spec: docs/design/COMPONENTS.md → Chat Widget).
// Conversa via /api/chat, que repassa ao fluxo do Activepieces.

type Mensagem = { papel: "usuario" | "assistente"; texto: string };

const MAX_CARACTERES = 500;

const boasVindas: Mensagem = {
  papel: "assistente",
  texto: "Fala! Sou o assistente da Talentos Black. Pergunte sobre horários, preços, serviços, produtos ou como agendar.",
};

const sugestoes = ["Qual o horário de funcionamento?", "Quanto custa um degradê?", "Como faço para agendar?"];

// Balão de fala em contorno, cantos retos e rabo quadrado (combina com os botões sem raio).
function IconeBalao() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="miter"
      className="shrink-0"
    >
      <path d="M3 4h18v12H10l-5 4v-4H3z" />
    </svg>
  );
}

export function ChatWidget() {
  const uid = useId();
  const [aberto, setAberto] = useState(false);
  const [mensagens, setMensagens] = useState<Mensagem[]>([boasVindas]);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const fimRef = useRef<HTMLDivElement>(null);
  const foiAberto = useRef(false);

  useEffect(() => {
    if (aberto) {
      foiAberto.current = true;
      inputRef.current?.focus();
    } else if (foiAberto.current) {
      launcherRef.current?.focus();
    }
  }, [aberto]);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ block: "end" });
  }, [mensagens, enviando, falha]);

  async function perguntar(pergunta: string) {
    const limpa = pergunta.trim();
    if (!limpa || enviando) return;

    const historico: Mensagem[] = [...mensagens, { papel: "usuario", texto: limpa }];
    setMensagens(historico);
    setTexto("");
    setFalha(null);
    setEnviando(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // A saudação é local: o modelo só recebe a conversa de verdade.
        body: JSON.stringify({ mensagens: historico.slice(1) }),
      });
      const dados: { resposta?: string; erro?: string } = await res.json().catch(() => ({}));
      if (!res.ok || !dados.resposta) throw new Error(dados.erro);
      setMensagens((atual) => [...atual, { papel: "assistente", texto: dados.resposta! }]);
    } catch (e) {
      setFalha(e instanceof Error && e.message ? e.message : "Não consegui responder agora. Tente de novo em instantes.");
    } finally {
      setEnviando(false);
      inputRef.current?.focus();
    }
  }

  function enviar(ev: FormEvent) {
    ev.preventDefault();
    perguntar(texto);
  }

  if (!aberto) {
    return (
      <Button
        ref={launcherRef}
        type="button"
        onClick={() => setAberto(true)}
        aria-haspopup="dialog"
        style={{ viewTransitionName: "chat-widget" }}
        className="fixed right-4 bottom-4 z-40 shadow-card-hover md:right-6 md:bottom-6"
      >
        <span className="inline-flex items-center gap-2">
          <IconeBalao />
          Tire suas dúvidas
        </span>
      </Button>
    );
  }

  const tituloId = `${uid}-titulo`;
  const semPerguntas = mensagens.length === 1;

  return (
    <section
      role="dialog"
      aria-labelledby={tituloId}
      style={{ viewTransitionName: "chat-widget" }}
      onKeyDown={(e) => e.key === "Escape" && setAberto(false)}
      className="fixed inset-x-4 bottom-4 z-40 flex max-h-[min(70vh,560px)] flex-col border-2 border-tb-red bg-tb-black shadow-card-hover sm:left-auto sm:w-96 md:right-6 md:bottom-6"
    >
      <header className="flex items-center justify-between gap-4 border-b border-tb-cream/10 py-2 pr-2 pl-4">
        <h2 id={tituloId} className="text-lg leading-[1.4] font-bold">
          Assistente Talentos <span className="text-tb-red">Black</span>
        </h2>
        <button
          type="button"
          onClick={() => setAberto(false)}
          aria-label="Fechar o chat"
          className="flex size-11 items-center justify-center text-xl text-tb-cream transition-colors duration-150 hover:bg-tb-charcoal hover:text-tb-red"
        >
          <span aria-hidden="true">✕</span>
        </button>
      </header>

      <div role="log" aria-live="polite" className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
        {mensagens.map((m, i) => (
          <p
            key={i}
            className={`max-w-[85%] px-3 py-2 text-sm leading-[1.5] whitespace-pre-line ${
              m.papel === "usuario" ? "self-end bg-tb-cream text-tb-black" : "self-start bg-tb-charcoal text-tb-cream"
            }`}
          >
            <span className="sr-only">{m.papel === "usuario" ? "Você: " : "Assistente: "}</span>
            {m.texto}
          </p>
        ))}

        {enviando && (
          <p className="self-start bg-tb-charcoal px-3 py-2 font-mono text-xs font-medium text-tb-cream/60">Digitando…</p>
        )}

        {falha && (
          <p role="alert" className="border-l-4 border-tb-red bg-tb-charcoal p-4 text-sm leading-[1.5]">
            {falha}
          </p>
        )}

        {semPerguntas && !enviando && (
          <ul aria-label="Sugestões de perguntas" className="mt-2 flex flex-wrap gap-2">
            {sugestoes.map((s) => (
              <li key={s}>
                <Button type="button" variant="secondary" onClick={() => perguntar(s)} size="sm">
                  {s}
                </Button>
              </li>
            ))}
          </ul>
        )}
        <div ref={fimRef} />
      </div>

      <form onSubmit={enviar} className="border-t border-tb-cream/10 p-4">
        <div className="flex gap-2">
          <label htmlFor={`${uid}-pergunta`} className="sr-only">
            Sua pergunta
          </label>
          <input
            ref={inputRef}
            id={`${uid}-pergunta`}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            maxLength={MAX_CARACTERES}
            autoComplete="off"
            placeholder="Escreva sua pergunta"
            className="min-w-0 flex-1 border border-tb-gray-light bg-tb-charcoal px-4 py-3 text-base text-tb-cream placeholder:text-tb-gray-light/60 focus:border-2 focus:border-tb-red focus:outline-none"
          />
          <Button type="submit" disabled={enviando || !texto.trim()}>
            Enviar
          </Button>
        </div>
        <p className="mt-2 text-xs leading-[1.4] font-medium text-tb-cream/60">
          Respostas automáticas podem conter erros. Confirme pelo WhatsApp{" "}
          <span className="font-mono">{endereco.whatsapp}</span>.
        </p>
      </form>
    </section>
  );
}
