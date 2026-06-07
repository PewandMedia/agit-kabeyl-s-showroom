import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Premium Button System — scharfkantig, Mono-Caps, Hover-Swap.
 * Drei Varianten:
 *  - primary: bg-champagne text-paper → Hover: bg-ink
 *  - secondary: 1px border-champagne, transparent → Hover: bg-champagne
 *  - ghost: nur Text + animierter Underline
 */

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center whitespace-nowrap font-mono font-bold uppercase tracking-[0.22em] transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-40 disabled:cursor-not-allowed";

const sizes: Record<Size, string> = {
  md: "min-h-[48px] px-6 text-[10px]",
  lg: "min-h-[60px] px-9 text-[11px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-champagne text-foreground hover:bg-champagne-soft hover:text-foreground",
  secondary:
    "border border-line text-ink hover:border-champagne hover:text-champagne",
  ghost:
    "px-0 text-ink after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-champagne after:transition-transform after:duration-500 hover:text-champagne hover:after:scale-x-100",
};

function Arrow() {
  return (
    <span
      aria-hidden
      className="ml-3 inline-block translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover/btn:translate-x-1"
    >
      →
    </span>
  );
}

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
};

export function BtnLink({
  children,
  variant = "primary",
  size = "md",
  arrow = true,
  className = "",
  ...rest
}: CommonProps & LinkProps) {
  return (
    <Link
      {...(rest as LinkProps)}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
      {arrow && variant !== "ghost" && <Arrow />}
      {arrow && variant === "ghost" && <span aria-hidden className="ml-2">→</span>}
    </Link>
  );
}


export function BtnA({
  children,
  variant = "primary",
  size = "md",
  arrow = true,
  className = "",
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...rest}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
      {arrow && variant !== "ghost" && <Arrow />}
      {arrow && variant === "ghost" && <span aria-hidden className="ml-2">→</span>}
    </a>
  );
}

export function Btn({
  children,
  variant = "primary",
  size = "md",
  arrow = true,
  className = "",
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
      {arrow && variant !== "ghost" && <Arrow />}
      {arrow && variant === "ghost" && <span aria-hidden className="ml-2">→</span>}
    </button>
  );
}
