"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X, Phone } from "lucide-react";
import { NAV_ITEMS } from "@/data/navigation";
import { COMPANY } from "@/constants";

export default function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-brand-navy/40 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-sm flex-col bg-white p-7 shadow-2xl lg:hidden"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="font-heading text-lg font-bold text-brand-navy">
                {COMPANY.name}
              </span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
              {NAV_ITEMS.map((item) => (
                <div key={item.href} className="border-b border-black/5 py-2">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-2 text-base font-semibold text-brand-navy"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-3 flex flex-col gap-1 pb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="py-1.5 text-sm text-brand-muted"
                        >
                          → {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-6 space-y-4">
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-2 text-sm font-semibold text-brand-navy"
              >
                <Phone size={16} className="text-brand-red" />
                {COMPANY.phoneDisplay}
              </a>
              <Link
                href="/contact"
                onClick={onClose}
                className="block rounded-full bg-brand-red px-6 py-3.5 text-center text-sm font-semibold text-white"
              >
                Get a Quote →
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
