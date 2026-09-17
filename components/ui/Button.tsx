import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "btn-fill inline-flex min-w-[120px] items-center justify-center gap-2 px-6 py-3 text-base transition-colors duration-300 disabled:pointer-events-none disabled:bg-tb-gray-light disabled:text-tb-charcoal";

const variants: Record<Variant, string> = {
  primary: "bg-tb-red font-bold text-tb-black active:bg-tb-red-active",
  secondary: "border border-tb-cream bg-transparent font-normal text-tb-cream hover:text-tb-black focus-visible:text-tb-black active:text-tb-red",
};

function Label({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span className="btn-label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {arrow && (
        <span aria-hidden="true" className="btn-arrow">
          →
        </span>
      )}
    </>
  );
}

type Common = { variant?: Variant; arrow?: boolean; className?: string; children: ReactNode };

export function ButtonLink({
  variant = "primary",
  arrow,
  className = "",
  children,
  ...props
}: Common & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      <Label arrow={arrow}>{children}</Label>
    </Link>
  );
}

export function Button({
  variant = "primary",
  arrow,
  className = "",
  children,
  ...props
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      <Label arrow={arrow}>{children}</Label>
    </button>
  );
}
