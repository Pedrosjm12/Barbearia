export const barbeiros = [
  { id: "qualquer", nome: "Sem preferência" },
  { id: "marcao", nome: "Marcão" },
  { id: "diego", nome: "Diego" },
  { id: "rafa", nome: "Rafa" },
] as const;

export type BarbeiroId = (typeof barbeiros)[number]["id"];

/** 0 = domingo … 6 = sábado. Aberto de terça a sábado. */
export const diasAbertos = [2, 3, 4, 5, 6];

export const horario = { abre: 9, fecha: 19, intervaloMin: 30 };

export const endereco = {
  rua: "Av. Exemplo, 1234",
  bairro: "Bairro Exemplo",
  cidade: "Uberlândia — MG",
  whatsapp: "(34) 90000-0000",
};

export function proximosDias(qtd = 21, hoje = new Date()): Date[] {
  const dias: Date[] = [];
  const d = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  while (dias.length < qtd) {
    d.setDate(d.getDate() + 1);
    if (diasAbertos.includes(d.getDay())) dias.push(new Date(d));
  }
  return dias;
}

export function horariosDoDia(): string[] {
  const slots: string[] = [];
  for (let min = horario.abre * 60; min < horario.fecha * 60; min += horario.intervaloMin) {
    const h = String(Math.floor(min / 60)).padStart(2, "0");
    const m = String(min % 60).padStart(2, "0");
    slots.push(`${h}:${m}`);
  }
  return slots;
}

/** Simula horários já ocupados de forma determinística para a data/barbeiro. */
export function horarioOcupado(data: Date, slot: string, barbeiro: string): boolean {
  const seed = `${data.toDateString()}-${slot}-${barbeiro}`;
  let hash = 0;
  for (const c of seed) hash = (hash * 31 + c.charCodeAt(0)) >>> 0;
  return hash % 4 === 0;
}
