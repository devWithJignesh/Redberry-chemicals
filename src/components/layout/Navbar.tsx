"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center py-1">
                <Image
                  src={COMPANY.logo}
                  alt={COMPANY.name}
                  width={150}
                  height={44}
                  priority
                  className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href || (item.children && item.children.some((c) => pathname === c.href));
                return (
                  <div key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex items-center gap-1.5 py-2 text-sm font-semibold tracking-wide transition-colors",
                        active ? "text-[#EA580C] font-bold" : "text-brand-navy hover:text-[#EA580C]"
                      )}
                    >
                      {item.label}
                      {item.children && <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />}
                      {active && (
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#EA580C] rounded-full" />
                      )}
                    </Link>
                    {item.children && (
                      <div className="invisible absolute left-0 top-full w-56 -translate-y-1 rounded-b-xl border border-slate-200/80 bg-white opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 z-50 overflow-hidden">
                        {item.children.map((child, idx) => {
                          const isChildActive = pathname === child.href || (child.label === "Insecticides" && pathname.includes("insecticide"));
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "block px-5 py-3 text-sm font-medium transition-colors border-b border-slate-100 last:border-0",
                                isChildActive
                                  ? "bg-[#EA580C] text-white font-semibold"
                                  : "text-slate-700 hover:bg-orange-50 hover:text-[#EA580C]"
                              )}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
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
