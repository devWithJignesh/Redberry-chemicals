"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { NAV_ITEMS } from "@/data/navigation";
import { COMPANY } from "@/constants";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/common/Button";
import Container from "@/components/common/Container";
import MobileMenu from "./MobileMenu";
import { useMobileMenu } from "@/hooks/useMobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const mobile = useMobileMenu();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-white/95 backdrop-blur transition-shadow duration-300",
          scrolled && "shadow-soft"
        )}
      >
        <Container>
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red-light">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 3h6l1 4h-8l1-4Zm-2 5h10l2 12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L7 8Z"
                    stroke="#C41E3A"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div className="font-heading text-lg font-bold leading-tight text-brand-navy">
                  {COMPANY.name}
                </div>
                <div className="text-[11px] text-brand-muted">{COMPANY.tagline}</div>
              </div>
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <div key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-1 py-2 text-sm font-medium text-brand-text transition-colors hover:text-brand-red",
                        active && "text-brand-red"
                      )}
                    >
                      {item.label}
                      {item.children && <ChevronDown size={14} />}
                    </Link>
                    {item.children && (
                      <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 translate-y-2 rounded-xl border border-black/5 bg-white p-2 opacity-0 shadow-card transition-all duration-200 group-hover:visible group-hover:translate-y-1 group-hover:opacity-100">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-lg px-4 py-3 text-sm text-brand-text hover:bg-brand-red-light hover:text-brand-red"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <a
                href={COMPANY.phoneHref}
                className="hidden items-center gap-2 text-sm font-semibold text-brand-navy md:flex"
              >
                <Phone size={16} className="text-brand-red" />
                {COMPANY.phoneDisplay}
              </a>
              <LinkButton href="/contact" className="hidden md:inline-flex" showArrow={false}>
                Get a Quote
              </LinkButton>
              <button
                aria-label="Open menu"
                onClick={mobile.toggle}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 lg:hidden"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu isOpen={mobile.isOpen} onClose={mobile.close} />
    </>
  );
}
