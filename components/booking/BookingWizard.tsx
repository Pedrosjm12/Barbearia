"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { barbeiros, horarioOcupado, horariosDoDia, proximosDias, type BarbeiroId } from "@/data/agenda";
import { categorias, formatPreco, getServico, servicos } from "@/data/menu";
import { paymentProvider, type MetodoPagamento } from "@/lib/payments";

type Passo = 0 | 1 | 2 | 3 | 4;
const nomesPassos = ["Serviços", "Data e horário", "Seus dados", "Pagamento"];

type Agendamento = {
  protocolo: string;
  servicos: string[];
  barbeiro: BarbeiroId;
  data: string;
  horario: string;
  nome: string;
  whatsapp: string;
  email: string;
  pagamento: "online" | "local";
  metodo?: MetodoPagamento;
  transacaoId?: string;
  total: number;
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
  const params = useSearchParams();
  const uid = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [passo, setPasso] = useState<Passo>(0);
  const passoAnterior = useRef<Passo>(0);
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [barbeiro, setBarbeiro] = useState<BarbeiroId>("qualquer");
  const [dataIdx, setDataIdx] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [dados, setDados] = useState({ nome: "", whatsapp: "", email: "" });
  const [pagamento, setPagamento] = useState<"online" | "local">("online");
  const [metodo, setMetodo] = useState<MetodoPagamento>("pix");
  const [cartao, setCartao] = useState({ numero: "", nome: "", validade: "", cvv: "" });
  const [erros, setErros] = useState<Record<string, string>>({});
  const [processando, setProcessando] = useState(false);
  const [confirmado, setConfirmado] = useState<Agendamento | null>(null);
  const [pix, setPix] = useState<string | undefined>();

  const dias = useMemo(() => proximosDias(21), []);
  const slots = useMemo(() => horariosDoDia(), []);

  // Pré-seleciona o serviço vindo do menu (?servico=slug), ajustando o estado durante o render
  const servicoParam = params.get("servico");
  const [paramAplicado, setParamAplicado] = useState<string | null>(null);
  if (servicoParam !== paramAplicado) {
    setParamAplicado(servicoParam);
    if (servicoParam && getServico(servicoParam) && !selecionados.includes(servicoParam)) {
      setSelecionados([...selecionados, servicoParam]);
    }
  }

  // Move o foco para o título só quando o passo muda (não no primeiro render)
  useEffect(() => {
    if (passoAnterior.current === passo) return;
    passoAnterior.current = passo;
    headingRef.current?.focus();
  }, [passo]);

  const itens = selecionados.map((s) => getServico(s)!).filter(Boolean);
  const total = itens.reduce((acc, s) => acc + s.preco, 0);
  const duracao = itens.reduce((acc, s) => acc + s.duracaoMin, 0);
  const data = dataIdx !== null ? dias[dataIdx] : null;

  function toggle(slug: string) {
    setSelecionados((atual) => (atual.includes(slug) ? atual.filter((s) => s !== slug) : [...atual, slug]));
  }

  function validar(p: Passo): Record<string, string> {
    const e: Record<string, string> = {};
    if (p === 0 && selecionados.length === 0) e.servicos = "Escolha pelo menos um serviço.";
    if (p === 1) {
      if (!data) e.data = "Escolha um dia.";
      if (!slot) e.slot = "Escolha um horário.";
    }
    if (p === 2) {
      if (dados.nome.trim().length < 2) e.nome = "Diga como podemos te chamar.";
      if (dados.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = "Informe o WhatsApp com DDD.";
      if (dados.email && !/^\S+@\S+\.\S+$/.test(dados.email)) e.email = "Confira o e-mail e tente de novo.";
    }
    if (p === 3 && pagamento === "online" && metodo === "cartao") {
      if (cartao.numero.replace(/\D/g, "").length < 13) e.numero = "Confira o número do cartão.";
      if (cartao.nome.trim().length < 2) e.nomeCartao = "Informe o nome impresso no cartão.";
      if (!/^\d{2}\/\d{2}$/.test(cartao.validade)) e.validade = "Use o formato MM/AA.";
      if (!/^\d{3,4}$/.test(cartao.cvv)) e.cvv = "3 ou 4 dígitos.";
    }
    return e;
  }

  async function avancar(ev: FormEvent) {
    ev.preventDefault();
    const e = validar(passo);
    setErros(e);
    if (Object.keys(e).length) return;

    if (passo < 3) {
      setPasso((passo + 1) as Passo);
      return;
    }

    let transacaoId: string | undefined;
    if (pagamento === "online") {
      setProcessando(true);
      const r = await paymentProvider.cobrar({
        valor: total,
        metodo,
        descricao: `Talentos Black — ${itens.map((i) => i.nome).join(", ")}`,
        cartao: metodo === "cartao" ? cartao : undefined,
      });
      setProcessando(false);
      if (!r.ok) {
        setErros({ pagamento: r.erro });
        return;
      }
      transacaoId = r.transacaoId;
      setPix(r.pixCopiaECola);
    }

    const ag: Agendamento = {
      protocolo: gerarProtocolo(),
      servicos: selecionados,
      barbeiro,
      data: data!.toISOString(),
      horario: slot!,
      ...dados,
      pagamento,
      metodo: pagamento === "online" ? metodo : undefined,
      transacaoId,
      total,
    };
    try {
      const salvos = JSON.parse(localStorage.getItem("tb-agendamentos") ?? "[]");
      localStorage.setItem("tb-agendamentos", JSON.stringify([...salvos, ag]));
    } catch {
      // armazenamento indisponível: o agendamento segue só na tela
    }
    setConfirmado(ag);
    setPasso(4);
  }

  function recomecar() {
    setPasso(0);
    setSelecionados([]);
    setDataIdx(null);
    setSlot(null);
    setDados({ nome: "", whatsapp: "", email: "" });
    setCartao({ numero: "", nome: "", validade: "", cvv: "" });
    setConfirmado(null);
    setPix(undefined);
    setErros({});
  }

  const ariaCampo = (chave: string, id: string) => ({
    id,
    "aria-invalid": erros[chave] ? true : undefined,
    "aria-describedby": erros[chave] ? `${id}-erro` : undefined,
  });

  // ---------- Confirmação ----------
  if (passo === 4 && confirmado) {
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
          <div>
            <dt className="text-sm text-tb-cream/60">Serviços</dt>
            <dd className="font-bold">{itens.map((i) => i.nome).join(", ")}</dd>
          </div>
          <div>
            <dt className="text-sm text-tb-cream/60">Pagamento</dt>
            <dd className="font-bold">
              {confirmado.pagamento === "online"
                ? `${formatPreco(confirmado.total)} pago via ${confirmado.metodo === "pix" ? "Pix" : "cartão"} (simulado)`
                : `${formatPreco(confirmado.total)} na barbearia`}
            </dd>
          </div>
        </dl>
        {pix && (
          <div className="mt-8">
            <p className="text-sm text-tb-cream/60">Pix copia e cola (demonstração)</p>
            <code className="mt-2 block overflow-x-auto bg-tb-black p-4 font-mono text-xs">{pix}</code>
          </div>
        )}
        <p className="mt-8 text-sm text-tb-cream/70">
          Vamos confirmar pelo WhatsApp {confirmado.whatsapp}. Precisa remarcar? É só responder a mensagem.
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
        <ol className="mb-8 grid grid-cols-4 gap-2" aria-label="Etapas do agendamento">
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
          {["O que vamos fazer hoje?", "Quando fica bom pra você?", "Como falamos com você?", "Como prefere pagar?"][passo]}
        </h3>

        {/* Passo 1 — serviços */}
        {passo === 0 && (
          <fieldset className="mt-6">
            <legend className="sr-only">Serviços</legend>
            {erros.servicos && <p className="mb-4 text-sm text-tb-red">✕ {erros.servicos}</p>}
            <div className="max-h-[480px] space-y-6 overflow-y-auto pr-2">
              {categorias.map((cat) => (
                <div key={cat.slug}>
                  <p className="mb-2 font-mono text-xs font-medium text-tb-cream/60">{cat.nome}</p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {servicos
                      .filter((s) => s.categoria === cat.slug)
                      .map((s) => {
                        const marcado = selecionados.includes(s.slug);
                        return (
                          <li key={s.slug}>
                            <label
                              className={`flex cursor-pointer items-center justify-between gap-4 border px-4 py-3 transition-colors duration-150 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-tb-red ${
                                marcado ? "border-tb-red bg-tb-black" : "border-tb-cream/20 hover:border-tb-cream/60"
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={marcado}
                                  onChange={() => toggle(s.slug)}
                                  className="h-4 w-4 accent-tb-red"
                                />
                                <span className="text-sm">{s.nome}</span>
                              </span>
                              <span className="font-mono text-sm">{formatPreco(s.preco)}</span>
                            </label>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>
        )}

        {/* Passo 2 — barbeiro, dia e horário */}
        {passo === 1 && (
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

        {/* Passo 3 — dados */}
        {passo === 2 && (
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

        {/* Passo 4 — pagamento */}
        {passo === 3 && (
          <div className="mt-6 space-y-6">
            <fieldset className="grid gap-2 sm:grid-cols-2">
              <legend className="sr-only">Forma de pagamento</legend>
              {(
                [
                  ["online", "Pagar agora pelo site", "Pix ou cartão. Chegue e sente na cadeira."],
                  ["local", "Pagar na barbearia", "Dinheiro, Pix ou cartão no dia."],
                ] as const
              ).map(([valor, titulo, desc]) => (
                <label
                  key={valor}
                  className={`cursor-pointer border p-4 transition-colors duration-150 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-tb-red ${
                    pagamento === valor ? "border-tb-red bg-tb-black" : "border-tb-cream/20 hover:border-tb-cream/60"
                  }`}
                >
                  <span className="flex items-center gap-2 font-bold">
                    <input
                      type="radio"
                      name="pagamento"
                      className="h-4 w-4 accent-tb-red"
                      checked={pagamento === valor}
                      onChange={() => setPagamento(valor)}
                    />
                    {titulo}
                  </span>
                  <span className="mt-1 block text-sm text-tb-cream/70">{desc}</span>
                </label>
              ))}
            </fieldset>

            {pagamento === "online" && (
              <>
                <div role="radiogroup" aria-label="Método" className="flex gap-6 border-b border-tb-cream/15">
                  {(["pix", "cartao"] as const).map((m) => (
                    <label
                      key={m}
                      className={`relative cursor-pointer pb-2 text-base has-focus-visible:outline-2 has-focus-visible:outline-tb-red ${
                        metodo === m ? "font-bold" : "text-tb-cream/60 hover:text-tb-cream"
                      }`}
                    >
                      <input type="radio" name="metodo" className="sr-only" checked={metodo === m} onChange={() => setMetodo(m)} />
                      {m === "pix" ? "Pix" : "Cartão de crédito"}
                      {metodo === m && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-tb-red" />}
                    </label>
                  ))}
                </div>

                {metodo === "pix" ? (
                  <p className="text-sm text-tb-cream/70">
                    Ao confirmar, geramos o código Pix copia e cola de {formatPreco(total)}.
                  </p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Campo id={`${uid}-cc`} label="Número do cartão" obrigatorio erro={erros.numero}>
                        <input
                          {...ariaCampo("numero", `${uid}-cc`)}
                          className={`${inputBase} font-mono`}
                          inputMode="numeric"
                          autoComplete="cc-number"
                          placeholder="0000 0000 0000 0000"
                          value={cartao.numero}
                          onChange={(e) => setCartao({ ...cartao, numero: e.target.value })}
                        />
                      </Campo>
                    </div>
                    <div className="sm:col-span-2">
                      <Campo id={`${uid}-ccnome`} label="Nome impresso no cartão" obrigatorio erro={erros.nomeCartao}>
                        <input
                          {...ariaCampo("nomeCartao", `${uid}-ccnome`)}
                          className={inputBase}
                          autoComplete="cc-name"
                          value={cartao.nome}
                          onChange={(e) => setCartao({ ...cartao, nome: e.target.value })}
                        />
                      </Campo>
                    </div>
                    <Campo id={`${uid}-ccval`} label="Validade" obrigatorio erro={erros.validade}>
                      <input
                        {...ariaCampo("validade", `${uid}-ccval`)}
                        className={`${inputBase} font-mono`}
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM/AA"
                        maxLength={5}
                        value={cartao.validade}
                        onChange={(e) => setCartao({ ...cartao, validade: e.target.value })}
                      />
                    </Campo>
                    <Campo id={`${uid}-cvv`} label="CVV" obrigatorio erro={erros.cvv}>
                      <input
                        {...ariaCampo("cvv", `${uid}-cvv`)}
                        className={`${inputBase} font-mono`}
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        maxLength={4}
                        value={cartao.cvv}
                        onChange={(e) => setCartao({ ...cartao, cvv: e.target.value })}
                      />
                    </Campo>
                  </div>
                )}
                <p className="border-l-2 border-tb-red pl-4 text-xs text-tb-cream/60">
                  Ambiente de demonstração: nenhuma cobrança real é feita.
                </p>
              </>
            )}
            {erros.pagamento && (
              <p role="alert" className="text-sm text-tb-red">
                ✕ {erros.pagamento}
              </p>
            )}
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
          <Button type="submit" arrow={!processando} disabled={processando} aria-busy={processando}>
            {processando
              ? "Processando…"
              : passo < 3
                ? "Continuar"
                : pagamento === "online"
                  ? `Pagar ${formatPreco(total)} e agendar`
                  : "Confirmar agendamento"}
          </Button>
        </div>
      </div>

      {/* Resumo */}
      <aside aria-label="Resumo do agendamento" className="h-fit border border-tb-cream/15 p-6 lg:sticky lg:top-28">
        <h3 className="text-lg font-bold">Resumo</h3>
        {itens.length === 0 ? (
          <p className="mt-4 text-sm text-tb-cream/60">Nenhum serviço escolhido ainda.</p>
        ) : (
          <ul className="mt-4 space-y-2 text-sm">
            {itens.map((i) => (
              <li key={i.slug} className="flex justify-between gap-4">
                <span>{i.nome}</span>
                <span className="font-mono">{formatPreco(i.preco)}</span>
              </li>
            ))}
          </ul>
        )}
        {data && (
          <p className="mt-4 text-sm text-tb-cream/70">
            {dataLonga.format(data)}
            {slot && `, às ${slot}`}
          </p>
        )}
        <div className="mt-6 flex items-baseline justify-between border-t border-tb-cream/15 pt-4">
          <span className="text-sm text-tb-cream/70">Total{duracao > 0 && ` · ${duracao} min`}</span>
          <span className="font-mono text-2xl font-bold" aria-live="polite">
            {formatPreco(total)}
          </span>
        </div>
      </aside>
    </form>
  );
}
