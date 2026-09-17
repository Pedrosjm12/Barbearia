"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";

const links = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/menu", label: "Menu" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-tb-cream/10 bg-tb-black/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:h-15 md:px-8">
        <Link href="/" className="text-lg leading-none font-black tracking-tight" onClick={() => setOpen(false)}>
          Talentos <span className="text-tb-red">Black</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className="group relative py-2 text-base"
              >
                {l.label}
                <span
                  className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-tb-red transition-transform duration-300 ease-(--ease-curtain) ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
          <ButtonLink href="/#agendar" arrow>
            Agendar
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center hover:bg-tb-charcoal md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span className={`absolute left-0 h-0.5 w-5 bg-tb-cream transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-tb-cream transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      <nav
        id="menu-mobile"
        aria-label="Principal"
        hidden={!open}
        className="border-t border-tb-cream/10 bg-tb-black px-4 pb-8 md:hidden"
      >
        <ul className="flex flex-col">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="block border-b border-tb-cream/10 py-4 text-2xl font-bold aria-[current=page]:text-tb-red"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink href="/#agendar" arrow className="mt-8 w-full" onClick={() => setOpen(false)}>
          Agendar horário
        </ButtonLink>
      </nav>
    </header>
  );
}
