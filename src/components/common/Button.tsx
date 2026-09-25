import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "outline-light" | "ghost";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  showArrow?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-red text-white hover:bg-brand-red-dark shadow-soft hover:shadow-card hover:-translate-y-0.5",
  outline:
    "bg-transparent text-brand-text border border-brand-text/20 hover:border-brand-red hover:text-brand-red hover:-translate-y-0.5",
  "outline-light":
    "bg-transparent text-white border border-white/50 hover:bg-white/10 hover:-translate-y-0.5",
  ghost: "bg-brand-red-light text-brand-red hover:bg-brand-red hover:text-white",
};

const base =
  "inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-200 active:scale-95";

export function Button({
  children,
  variant = "primary",
  className,
  showArrow = true,
  ...props
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
      {showArrow && <ArrowRight size={16} />}
    </button>
  );
}

export function LinkButton({
  children,
  href,
  variant = "primary",
  className,
  showArrow = true,
}: BaseProps & { href: string }) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      {showArrow && <ArrowRight size={16} />}
    </Link>
  );
}
