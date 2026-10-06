"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/data/photos";

type Props = {
  photo: Photo;
  alt: string;
  sizes: string;
  className?: string;
  hover?: boolean;
  preload?: boolean;
  eager?: boolean;
};

/** Imagem com revelação ao entrar na tela e zoom no hover (DESIGN-TOKENS.md → Signature motion). */
export function RevealImage({ photo, alt, sizes, className = "", hover = true, preload, eager }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          // Revelar durante a cortina repintaria o snapshot da página nova a cada quadro: espera ela terminar.
          const vt = (document as Document & { activeViewTransition?: ViewTransition | null }).activeViewTransition;
          if (vt) vt.finished.finally(() => setVisible(true));
          else setVisible(true);
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible}
      className={`reveal relative overflow-hidden bg-tb-charcoal ${className}`}
    >
      <div className={`reveal-inner absolute inset-0 ${hover ? "img-hover" : ""}`}>
        <Image
          src={photo.src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          loading={eager ? "eager" : undefined}
          className="object-cover"
        />
      </div>
    </div>
  );
}
