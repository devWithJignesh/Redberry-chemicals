"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { LinkButton } from "@/components/common/Button";

const POINTS = [
  "Lab-verified purity on every batch",
  "Transparent SDS & COA documentation",
  "Reliable bulk & repeat-order supply",
];

export default function AboutSection() {
  return (
    <section className="py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-red-dark shadow-card">
              <div className="flex h-full w-full items-center justify-center text-xs text-white/50">
                Photo: Lab / storage facility
              </div>
            </div>
            <div className="absolute -bottom-8 -right-6 rounded-2xl bg-white p-6 shadow-card">
              <div className="font-heading text-3xl font-bold text-brand-red">12+</div>
              <div className="text-xs font-medium text-brand-muted">Years Experience</div>
            </div>
          </motion.div>

          <div>
            <SectionTitle
              eyebrow="About Redberry Chemicals"
              title="Trusted Chemical Supply, Built on Consistency"
            />
            <p className="mt-5 text-base leading-relaxed text-brand-muted">
              Redberry Chemicals supplies industrial, agro and specialty
              chemicals to manufacturers and distributors across Gujarat and
              beyond. We focus on the fundamentals that matter most to our
              partners — verified purity, honest documentation, and delivery
              you can plan around.
            </p>
            <ul className="mt-7 space-y-4">
              {POINTS.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="shrink-0 text-brand-red" />
                  <span className="text-sm font-medium text-brand-text">{point}</span>
                </li>
              ))}
            </ul>
            <LinkButton href="/about" className="mt-9">
              More About Us
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
