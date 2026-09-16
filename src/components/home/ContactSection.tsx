"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import Container from "@/components/common/Container";
import { LinkButton } from "@/components/common/Button";
import { COMPANY } from "@/constants";

export default function ContactSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red-dark via-brand-red to-brand-navy" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.08) 0 2px, transparent 2px 26px)",
        }}
      />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              Let's Talk Agro & Chemical Supply.
            </h2>
            <p className="mt-4 max-w-md text-white/80">
              Looking for seasonal pesticide delivery, bulk fertilizer intermediates, or custom agricultural blends? Our team responds within hours with pricing and batch COA.
            </p>
            <LinkButton href="/contact" variant="outline-light" className="mt-8" showArrow={false}>
              Get Agro Quote & Dosage Advice →
            </LinkButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1"
          >
            {[
              { icon: Phone, label: "Call Us", value: COMPANY.phoneDisplay },
              { icon: Mail, label: "Email Us", value: COMPANY.email },
              { icon: MapPin, label: "Visit Us", value: COMPANY.addressShort },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                  <item.icon size={20} />
                </div>
                <div>
                  <div className="text-xs text-white/60">{item.label}</div>
                  <div className="text-sm font-semibold text-white">{item.value}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
