"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Leaf,
  ShieldCheck,
  Award,
  HeartHandshake,
  Users,
  Compass,
  TrendingUp,
  Heart,
  Sparkles,
} from "lucide-react";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

export const CORE_VALUES = [
  {
    number: "01",
    title: "Innovation",
    description:
      "We continuously strive to innovate and improve our agricultural solutions to meet the evolving needs of our customers and the environment.",
    icon: Lightbulb,
    badgeColor: "bg-red-50 text-brand-red border-red-200/70",
  },
  {
    number: "02",
    title: "Sustainability",
    description:
      "We are committed to sustainable agricultural practices that protect our planet and ensure a better future for the next generation.",
    icon: Leaf,
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
  },
  {
    number: "03",
    title: "Integrity",
    description:
      "We conduct our business with the highest standards of ethics and transparency, building trust with our customers, partners, and stakeholders.",
    icon: ShieldCheck,
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200/70",
  },
  {
    number: "04",
    title: "Quality",
    description:
      "We are dedicated to providing high-quality products and services that meet the highest standards of excellence.",
    icon: Award,
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200/70",
  },
  {
    number: "05",
    title: "Customer Focus",
    description:
      "Our customers are at the heart of everything we do. We listen to their needs and work diligently to provide solutions that exceed their expectations.",
    icon: HeartHandshake,
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200/70",
  },
  {
    number: "06",
    title: "Collaboration",
    description:
      "We believe in the power of teamwork and partnerships, working together to achieve common goals and drive success.",
    icon: Users,
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200/70",
  },
  {
    number: "07",
    title: "Responsibility",
    description:
      "We take responsibility for our actions and their impact on society and the environment, striving to make a positive difference in the world.",
    icon: Compass,
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200/70",
  },
  {
    number: "08",
    title: "Growth",
    description:
      "We are committed to the continuous growth and development of our employees, our company, and the communities we serve.",
    icon: TrendingUp,
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200/70",
  },
  {
    number: "09",
    title: "Respect",
    description:
      "We treat everyone with respect, fostering a culture of inclusivity, diversity, and mutual support.",
    icon: Heart,
    badgeColor: "bg-pink-50 text-pink-700 border-pink-200/70",
  },
];

export default function AgriSolutionsSection() {
  return (
    <section id="core-values" className="relative scroll-mt-20 bg-[#FAF9F6] py-24 overflow-hidden">
      {/* Background Soft Glow Accents */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-red-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />

      {/* Subtle Pattern Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(#C41E3A 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <SectionTitle
            center
            eyebrow="Guiding Principles & Commitments"
            title="Our Core Values"
            description="The foundational pillars that guide our research, agricultural formulation purity, customer relationships, and environmental stewardship across India."
          />
        </div>

        {/* 9 Values 3x3 Grid (Tabs Removed) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((val, idx) => {
            const Icon = val.icon;

            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                whileHover={{ y: -6, scale: 1.015 }}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm transition-all duration-300 hover:border-brand-red/40 hover:shadow-xl hover:shadow-red-500/10"
              >
                {/* Top Row: Icon + Number Badge */}
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-brand-red transition-all duration-300 group-hover:bg-brand-red group-hover:text-white group-hover:scale-110 group-hover:shadow-md">
                      <Icon size={26} strokeWidth={2.2} />
                    </div>

                    <span className="font-mono text-xs font-bold text-slate-300 group-hover:text-brand-red/60 transition-colors">
                      {val.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-brand-navy transition-colors group-hover:text-brand-red mb-3">
                    {val.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-slate-600">
                    {val.description}
                  </p>
                </div>

                {/* Bottom Card Footer Accent Line */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${val.badgeColor}`}>
                    Core Pillar
                  </span>
                  <Sparkles size={13} className="text-slate-300 group-hover:text-brand-red transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
