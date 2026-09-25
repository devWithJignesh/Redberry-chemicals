"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
                const active =
                  pathname === item.href ||
                  (item.children && item.children.some((c) => pathname === c.href || (c.href === "/products/insecticides" && pathname.includes("/products/"))));
                return (
                  <NavMenuItem key={item.href} item={item} active={!!active} pathname={pathname} />
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

function NavMenuItem({
  item,
  active,
  pathname,
}: {
  item: (typeof NAV_ITEMS)[0];
  active: boolean;
  pathname: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useState<{ timer: NodeJS.Timeout | null }>({ timer: null })[0];

  const handleMouseEnter = () => {
    if (timeoutRef.timer) clearTimeout(timeoutRef.timer);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.timer = setTimeout(() => {
      setIsOpen(false);
    }, 140);
  };

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={cn(
          "relative py-2 text-sm font-semibold tracking-wide transition-colors duration-200",
          active ? "text-[#EA580C] font-bold" : "text-brand-navy hover:text-[#EA580C]"
        )}
      >
        {item.label}
        {active && (
          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#EA580C] rounded-full" />
        )}
      </Link>
    );
  }

  return (
    <div
      className="relative flex items-center h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        className={cn(
          "relative flex items-center gap-1.5 py-2 text-sm font-semibold tracking-wide transition-colors duration-200",
          active || isOpen ? "text-[#EA580C] font-bold" : "text-brand-navy hover:text-[#EA580C]"
        )}
      >
        {item.label}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="flex items-center"
        >
          <ChevronDown size={14} />
        </motion.div>
        {(active || isOpen) && (
          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#EA580C] rounded-full" />
        )}
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-[calc(100%-8px)] z-50 w-60 pt-2"
          >
            {/* Invisible hover bridge area to ensure mouse continuity */}
            <div className="rounded-b-2xl border-x border-b border-slate-200/90 bg-white shadow-[0_20px_45px_rgba(0,0,0,0.18)] overflow-hidden">
              {item.children.map((child, idx) => {
                const isChildActive =
                  pathname === child.href ||
                  (child.label === "Insecticides" && (pathname === "/products" || pathname.includes("/products/")));
                const isTopItem = idx === 0;

                return (
                  <motion.div
                    key={child.href}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18, delay: idx * 0.04 }}
                  >
                    <Link
                      href={child.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "group/item block px-6 py-3.5 text-sm transition-all duration-200 border-b border-slate-100 last:border-0",
                        isChildActive || (isTopItem && !item.children?.some((c) => pathname === c.href))
                          ? "bg-[#EA580C] text-white font-bold hover:bg-[#C2410C]"
                          : "font-semibold text-slate-700 hover:bg-orange-50/80 hover:text-[#EA580C] hover:pl-7"
                      )}
                    >
                      <span className="flex items-center justify-between">
                        {child.label}
                        <span
                          className={cn(
                            "text-xs transition-transform duration-200 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1",
                            isChildActive || (isTopItem && !item.children?.some((c) => pathname === c.href))
                              ? "text-white opacity-80"
                              : "text-[#EA580C]"
                          )}
                        >
                          →
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
