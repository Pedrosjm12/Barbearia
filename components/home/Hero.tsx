"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { photos } from "@/data/photos";

export function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);

  // Parallax leve (máx. 15% do scroll), desligado com prefers-reduced-motion
  useEffect(() => {
    const el = imgRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate3d(0, ${Math.min(window.scrollY, window.innerHeight) * 0.15}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="relative flex min-h-svh items-end overflow-hidden pt-20">
      <div ref={imgRef} className="absolute inset-0 -top-[10%] will-change-transform">
        <Image
          src={photos.hero.src}
          alt="Interior da barbearia com cadeiras de couro e iluminação quente"
          fill
          preload
          sizes="100vw"
          className="hero-zoom object-cover"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-tb-black via-tb-black/60 to-tb-black/40" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-24 md:px-8 md:pb-32">
        <p className="hero-rise font-mono text-xs font-medium text-tb-red">Barbearia · Uberlândia — MG</p>
        <h1 className="hero-rise mt-4 max-w-3xl text-4xl leading-[1.1] font-black md:text-6xl" style={{ animationDelay: "100ms" }}>
          Talento que se vê no espelho.
        </h1>
        <p className="hero-rise mt-6 max-w-xl text-lg leading-[1.6] text-tb-cream/85" style={{ animationDelay: "200ms" }}>
          Degradê na régua, barba desenhada e aquele papo bom de bairro. Há mais de uma década cuidando do visual de
          Uberlândia.
        </p>
        <div className="hero-rise mt-8 flex flex-wrap gap-4" style={{ animationDelay: "300ms" }}>
          <ButtonLink href="#agendar" arrow>
            Agendar meu horário
          </ButtonLink>
          <ButtonLink href="/menu" variant="secondary">
            Ver o menu
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
