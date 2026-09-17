/**
 * Camada de pagamento. Hoje só existe o provedor simulado; para cobrar de verdade,
 * implemente PaymentProvider (ex.: Mercado Pago ou Stripe) numa rota de servidor
 * e troque `paymentProvider` abaixo.
 */

export type MetodoPagamento = "pix" | "cartao";

export type PagamentoInput = {
  valor: number;
  metodo: MetodoPagamento;
  descricao: string;
  cartao?: { numero: string; nome: string; validade: string; cvv: string };
};

export type PagamentoResultado =
  | { ok: true; transacaoId: string; pixCopiaECola?: string }
  | { ok: false; erro: string };

export interface PaymentProvider {
  cobrar(input: PagamentoInput): Promise<PagamentoResultado>;
}

const mockProvider: PaymentProvider = {
  async cobrar(input) {
    await new Promise((r) => setTimeout(r, 1200));
    if (input.metodo === "cartao") {
      const numero = input.cartao?.numero.replace(/\D/g, "") ?? "";
      if (numero.length < 13) return { ok: false, erro: "Confira o número do cartão e tente de novo." };
      if (numero.endsWith("0000")) return { ok: false, erro: "Pagamento recusado. Tente outro cartão." };
    }
    const transacaoId = `SIM-${Date.now().toString(36).toUpperCase()}`;
    return {
      ok: true,
      transacaoId,
      pixCopiaECola: input.metodo === "pix" ? `00020126SIMULADO${transacaoId}5204000053039865406${input.valor.toFixed(2)}` : undefined,
    };
  },
};

export const paymentProvider: PaymentProvider = mockProvider;
