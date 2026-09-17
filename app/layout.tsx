import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Talentos Black — Barbearia em Uberlândia",
    template: "%s | Talentos Black",
  },
  description:
    "Barbearia de bairro em Uberlândia. Cortes, barba, barbear na navalha e combos. Agende online e pague no site ou na hora.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="sr-only z-[60] bg-tb-red px-4 py-2 font-bold text-tb-black focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Pular para o conteúdo
        </a>
        <Header />
        {children}
        <Footer />
        {/* Linha vermelha que acompanha a cortina de transição (ver globals.css) */}
        <div
          aria-hidden="true"
          style={{ viewTransitionName: "curtain-line" }}
          className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 bg-tb-red opacity-0"
        />
      </body>
    </html>
  );
}
