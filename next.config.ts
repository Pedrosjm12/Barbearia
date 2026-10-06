import type { NextConfig } from "next";

// CSP: frontend sem scripts/assets de terceiros (Next.js App Router). O único
// servidor é a rota /api/chat, que fala com o Activepieces; o navegador só
// conversa com o próprio site, então connect-src continua 'self'. 'unsafe-inline' em script-src é necessário
// porque o próprio Next.js injeta inline <script> com o payload de hidratação
// RSC no HTML (self.__next_f.push(...)) e não há middleware de nonce neste
// projeto; 'unsafe-inline' em style-src cobre o atributo style inline
// usado pela transição "cortina" (app/layout.tsx). Sem 'unsafe-eval' em
// produção: o build (Turbopack) não usa eval. Em dev, o React usa eval() para
// reconstruir callstacks, então liberamos 'unsafe-eval' apenas fora de produção.
const isDev = process.env.NODE_ENV !== "production";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
