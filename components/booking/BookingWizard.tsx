"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { barbeiros, horarioOcupado, horariosDoDia, proximosDias, type BarbeiroId } from "@/data/agenda";

type Passo = 0 | 1 | 2;
const nomesPassos = ["Data e horário", "Seus dados"];

type Agendamento = {
  protocolo: string;
  barbeiro: BarbeiroId;
  data: string;
  horario: string;
  nome: string;
  whatsapp: string;
  email: string;
};

const diaSemana = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });
const diaMes = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" });
const dataLonga = new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" });

const gerarProtocolo = () => `TB-${Date.now().toString(36).slice(-6).toUpperCase()}`;

const inputBase =
  "w-full border border-tb-gray-light bg-tb-charcoal px-4 py-3 text-base text-tb-cream placeholder:text-tb-gray-light/60 focus:border-2 focus:border-tb-red focus:outline-none aria-[invalid=true]:border-2 aria-[invalid=true]:border-tb-red";

function Campo({
  label,
  erro,
  ajuda,
  obrigatorio,
  children,
  id,
}: {
  label: string;
  erro?: string;
  ajuda?: string;
  obrigatorio?: boolean;
  children: ReactNode;
  id: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
        {obrigatorio && <span className="text-tb-red"> *</span>}
      </label>
      {children}
      {ajuda && !erro && (
        <p id={`${id}-ajuda`} className="mt-1 text-xs text-tb-gray-light/80">
          {ajuda}
        </p>
      )}
      {erro && (
        <p id={`${id}-erro`} className="mt-1 text-xs text-tb-red">
          ✕ {erro}
        </p>
      )}
    </div>
  );
}

export function BookingWizard() {
  const uid = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [passo, setPasso] = useState<Passo>(0);
  const passoAnterior = useRef<Passo>(0);
  const [barbeiro, setBarbeiro] = useState<BarbeiroId>("qualquer");
  const [dataIdx, setDataIdx] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [dados, setDados] = useState({ nome: "", whatsapp: "", email: "" });
  const [erros, setErros] = useState<Record<string, string>>({});
  const [confirmado, setConfirmado] = useState<Agendamento | null>(null);

  const dias = proximosDias(21);
  const slots = horariosDoDia();

  // Move o foco para o título só quando o passo muda (não no primeiro render)
  useEffect(() => {
    if (passoAnterior.current === passo) return;
    passoAnterior.current = passo;
    headingRef.current?.focus();
  }, [passo]);

  const data = dataIdx !== null ? dias[dataIdx] : null;

  function validar(p: Passo): Record<string, string> {
    const e: Record<string, string> = {};
    if (p === 0) {
      if (!data) e.data = "Escolha um dia.";
      if (!slot) e.slot = "Escolha um horário.";
    }
    if (p === 1) {
      if (dados.nome.trim().length < 2) e.nome = "Diga como podemos te chamar.";
      if (dados.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = "Informe o WhatsApp com DDD.";
      if (dados.email && !/^\S+@\S+\.\S+$/.test(dados.email)) e.email = "Confira o e-mail e tente de novo.";
    }
    return e;
  }

  function avancar(ev: FormEvent) {
    ev.preventDefault();
    const e = validar(passo);
    setErros(e);
    if (Object.keys(e).length) return;

    if (passo < 1) {
      setPasso((passo + 1) as Passo);
      return;
    }

    const ag: Agendamento = {
      protocolo: gerarProtocolo(),
      barbeiro,
      data: data!.toISOString(),
      horario: slot!,
      ...dados,
    };
    try {
      const salvos = JSON.parse(localStorage.getItem("tb-agendamentos") ?? "[]");
      localStorage.setItem("tb-agendamentos", JSON.stringify([...salvos, ag]));
    } catch {
      // armazenamento indisponível: o agendamento segue só na tela
    }
    setConfirmado(ag);
    setPasso(2);
  }

  function recomecar() {
    setPasso(0);
    setDataIdx(null);
    setSlot(null);
    setDados({ nome: "", whatsapp: "", email: "" });
    setConfirmado(null);
    setErros({});
  }

  const ariaCampo = (chave: string, id: string) => ({
    id,
    "aria-invalid": erros[chave] ? true : undefined,
    "aria-describedby": erros[chave] ? `${id}-erro` : undefined,
  });

  // ---------- Confirmação ----------
  if (passo === 2 && confirmado) {
    const nomeBarbeiro = barbeiros.find((b) => b.id === confirmado.barbeiro)?.nome;
    return (
      <div className="bg-tb-charcoal p-6 md:p-12" aria-live="polite">
        <p className="font-mono text-xs font-medium text-tb-red">Protocolo {confirmado.protocolo}</p>
        <h3 ref={headingRef} tabIndex={-1} className="mt-4 text-3xl leading-[1.2] font-extrabold focus:outline-none">
          Tudo certo, {confirmado.nome.split(" ")[0]}. Sua cadeira está reservada.
        </h3>
        <dl className="mt-8 grid gap-4 text-base sm:grid-cols-2">
          <div>
            <dt className="text-sm text-tb-cream/60">Quando</dt>
            <dd className="font-bold">
              {dataLonga.format(new Date(confirmado.data))}, às {confirmado.horario}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-tb-cream/60">Com</dt>
            <dd className="font-bold">{nomeBarbeiro}</dd>
          </div>
        </dl>
        <p className="mt-8 text-sm text-tb-cream/70">
          O serviço é combinado com o barbeiro na cadeira, sem burocracia. Vamos confirmar pelo WhatsApp{" "}
          {confirmado.whatsapp}. Precisa remarcar? É só responder a mensagem.
        </p>
        <Button type="button" variant="secondary" className="mt-8" onClick={recomecar}>
          Fazer outro agendamento
        </Button>
      </div>
    );
  }

  // ---------- Passos ----------
  return (
    <form onSubmit={avancar} noValidate className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 bg-tb-charcoal p-6 md:p-8">
        <ol className="mb-8 grid grid-cols-2 gap-2" aria-label="Etapas do agendamento">
          {nomesPassos.map((n, i) => (
            <li key={n} aria-current={i === passo ? "step" : undefined}>
              <span className={`block h-1 transition-colors duration-300 ${i <= passo ? "bg-tb-red" : "bg-tb-cream/15"}`} />
              <span className={`mt-2 hidden text-xs font-medium sm:block ${i === passo ? "text-tb-cream" : "text-tb-cream/50"}`}>
                {i + 1}. {n}
              </span>
            </li>
          ))}
        </ol>

        <h3 ref={headingRef} tabIndex={-1} className="text-2xl leading-[1.3] font-bold focus:outline-none">
          {["Quando fica bom pra você?", "Como falamos com você?"][passo]}
        </h3>

        {/* Passo 1 — barbeiro, dia e horário */}
        {passo === 0 && (
          <div className="mt-6 space-y-8">
            <fieldset>
              <legend className="mb-2 text-sm font-medium">Barbeiro</legend>
              <div className="flex flex-wrap gap-2">
                {barbeiros.map((b) => (
                  <label
                    key={b.id}
                    className={`cursor-pointer border px-4 py-2 text-sm transition-colors duration-150 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-tb-red ${
                      barbeiro === b.id ? "border-tb-red bg-tb-red font-bold text-tb-black" : "border-tb-cream/20 hover:border-tb-cream/60"
                    }`}
                  >
                    <input
                      type="radio"
                      name="barbeiro"
                      className="sr-only"
                      checked={barbeiro === b.id}
                      onChange={() => {
                        setBarbeiro(b.id);
                        setSlot(null);
                      }}
                    />
                    {b.nome}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="min-w-0">
              <legend className="mb-2 text-sm font-medium">
                Dia <span className="text-tb-red">*</span>
              </legend>
              <div className="relative flex gap-2 overflow-x-auto pb-2">
                {dias.map((d, i) => (
                  <label
                    key={d.toISOString()}
                    className={`flex w-16 shrink-0 cursor-pointer flex-col items-center border py-2 transition-colors duration-150 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-tb-red ${
                      dataIdx === i ? "border-tb-red bg-tb-red text-tb-black" : "border-tb-cream/20 hover:border-tb-cream/60"
                    }`}
                  >
                    <input
                      type="radio"
                      name="dia"
                      className="sr-only"
                      checked={dataIdx === i}
                      onChange={() => {
                        setDataIdx(i);
                        setSlot(null);
                      }}
                    />
                    <span className="text-xs font-medium">{diaSemana.format(d).replace(".", "")}</span>
                    <span className="font-mono text-sm font-bold">{diaMes.format(d)}</span>
                  </label>
                ))}
              </div>
              {erros.data && <p className="mt-1 text-xs text-tb-red">✕ {erros.data}</p>}
            </fieldset>

            <fieldset disabled={!data}>
              <legend className="mb-2 text-sm font-medium">
                Horário <span className="text-tb-red">*</span>
              </legend>
              {!data ? (
                <p className="text-sm text-tb-cream/60">Escolha um dia para ver os horários livres.</p>
              ) : (
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                  {slots.map((s) => {
                    const ocupado = horarioOcupado(data, s, barbeiro);
                    return (
                      <label
                        key={s}
                        className={`border py-2 text-center font-mono text-sm transition-colors duration-150 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-tb-red ${
                          ocupado
                            ? "cursor-not-allowed border-tb-cream/10 text-tb-cream/30 line-through"
                            : slot === s
                              ? "cursor-pointer border-tb-red bg-tb-red font-bold text-tb-black"
                              : "cursor-pointer border-tb-cream/20 hover:border-tb-cream/60"
                        }`}
                      >
                        <input
                          type="radio"
                          name="horario"
                          className="sr-only"
                          disabled={ocupado}
                          checked={slot === s}
                          onChange={() => setSlot(s)}
                        />
                        {s}
                        {ocupado && <span className="sr-only"> (ocupado)</span>}
                      </label>
                    );
                  })}
                </div>
              )}
              {erros.slot && <p className="mt-1 text-xs text-tb-red">✕ {erros.slot}</p>}
            </fieldset>
          </div>
        )}

        {/* Passo 2 — dados */}
        {passo === 1 && (
          <div className="mt-6 space-y-6">
            <Campo id={`${uid}-nome`} label="Seu nome" obrigatorio erro={erros.nome}>
              <input
                {...ariaCampo("nome", `${uid}-nome`)}
                className={inputBase}
                autoComplete="name"
                value={dados.nome}
                onChange={(e) => setDados({ ...dados, nome: e.target.value })}
              />
            </Campo>
            <Campo id={`${uid}-whats`} label="WhatsApp" obrigatorio erro={erros.whatsapp} ajuda="Usamos só para confirmar o horário.">
              <input
                {...ariaCampo("whatsapp", `${uid}-whats`)}
                className={inputBase}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(34) 90000-0000"
                value={dados.whatsapp}
                onChange={(e) => setDados({ ...dados, whatsapp: e.target.value })}
              />
            </Campo>
            <Campo id={`${uid}-email`} label="E-mail (opcional)" erro={erros.email}>
              <input
                {...ariaCampo("email", `${uid}-email`)}
                className={inputBase}
                type="email"
                autoComplete="email"
                value={dados.email}
                onChange={(e) => setDados({ ...dados, email: e.target.value })}
              />
            </Campo>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          {passo > 0 ? (
            <button
              type="button"
              onClick={() => {
                setErros({});
                setPasso((passo - 1) as Passo);
              }}
              className="py-2 text-base text-tb-cream/70 hover:text-tb-cream hover:underline hover:underline-offset-4"
            >
              ← Voltar
            </button>
          ) : (
            <span />
          )}
          <Button type="submit" arrow>
            {passo < 1 ? "Continuar" : "Confirmar agendamento"}
          </Button>
        </div>
      </div>

      {/* Resumo */}
      <aside aria-label="Resumo do agendamento" className="h-fit border border-tb-cream/15 p-6 lg:sticky lg:top-28">
        <h3 className="text-lg font-bold">Resumo</h3>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="text-tb-cream/60">Barbeiro</dt>
            <dd className="font-bold">{barbeiros.find((b) => b.id === barbeiro)?.nome}</dd>
          </div>
          <div>
            <dt className="text-tb-cream/60">Dia e horário</dt>
            <dd className="font-bold">
              {data ? (
                <>
                  {dataLonga.format(data)}
                  {slot && `, às ${slot}`}
                </>
              ) : (
                <span className="font-normal text-tb-cream/60">Ainda não escolhido</span>
              )}
            </dd>
          </div>
        </dl>
        <p className="mt-6 border-t border-tb-cream/15 pt-4 text-xs text-tb-cream/60">
          O serviço e o valor são definidos com o barbeiro no momento do atendimento.
        </p>
      </aside>
    </form>
  );
}
