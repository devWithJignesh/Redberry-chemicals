import type { Metadata } from "next";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { LinkButton } from "@/components/common/Button";
import { CheckCircle2, Target, Eye, ShieldCheck } from "lucide-react";
import { COMPANY } from "@/constants";

export const metadata: Metadata = {
  title: `About Us — ${COMPANY.name}`,
  description:
    "Learn about Redberry Chemicals — our story, our values, and the team behind reliable chemical supply.",
};

const VALUES = [
  { icon: ShieldCheck, title: "Integrity", desc: "Honest pricing and honest documentation, every time." },
  { icon: Target, title: "Consistency", desc: "The same verified quality, batch after batch." },
  { icon: Eye, title: "Transparency", desc: "Clear SDS, COA and sourcing information on request." },
];

const TIMELINE = [
  { year: "2014", title: "Founded in Anand", text: "Started as a small chemical trading outfit serving local units." },
  { year: "2018", title: "Expanded Product Range", text: "Added agro and specialty chemical categories." },
  { year: "2021", title: "300+ Business Partners", text: "Grew into a trusted regional supply partner." },
  { year: "2026", title: "15+ States Served", text: "Now supplying industrial and agro clients across India." },
];

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative flex h-[340px] items-center overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-red-dark/60" />
        <Container className="relative">
          <div className="mb-3 flex items-center gap-2 text-xs text-white/60">
            <span>Home</span> <span className="text-brand-red">/</span> <span>About</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white md:text-5xl">
            About {COMPANY.name}
          </h1>
          <p className="mt-4 max-w-xl text-white/75">
            A decade of dependable chemical supply, built on purity and trust.
          </p>
        </Container>
      </section>

      {/* Story */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-red-dark shadow-card">
              <div className="flex h-full w-full items-center justify-center text-xs text-white/50">
                Photo: Facility / warehouse
              </div>
            </div>
            <div>
              <SectionTitle eyebrow="Our Story" title="Rooted in Reliability" />
              <p className="mt-5 text-base leading-relaxed text-brand-muted">
                Redberry Chemicals was founded on a simple idea: chemical
                buyers deserve a supplier they don't have to double-check.
                From our base in Anand, Gujarat, we now serve manufacturers,
                distributors and treatment plants with industrial, agro,
                specialty and water-treatment grade chemicals.
              </p>
              <ul className="mt-6 space-y-3">
                {["Lab-verified purity", "Transparent documentation", "Dependable bulk delivery"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-sm font-medium text-brand-text">
                    <CheckCircle2 size={18} className="text-brand-red" /> {t}
                  </li>
                ))}
              </ul>
              <LinkButton href="/contact" className="mt-8">
                Work With Us
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-brand-cream py-24">
        <Container>
          <SectionTitle
            center
            eyebrow="What We Stand For"
            title="Our Core Values"
            className="mx-auto mb-14"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl bg-white p-8 text-center shadow-soft transition-transform hover:-translate-y-2">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-red-light text-brand-red">
                  <v.icon size={24} />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-brand-navy">{v.title}</h3>
                <p className="text-sm text-brand-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <Container className="max-w-3xl">
          <SectionTitle eyebrow="Our Journey" title="Milestones" className="mb-14" />
          <div className="space-y-10 border-l-2 border-brand-red-light pl-8">
            {TIMELINE.map((item) => (
              <div key={item.year} className="relative">
                <div className="absolute -left-[38px] top-1 h-3.5 w-3.5 rounded-full border-4 border-brand-red-light bg-brand-red" />
                <div className="text-xs font-bold text-brand-red">{item.year}</div>
                <h3 className="mt-1 font-heading text-lg font-semibold text-brand-navy">{item.title}</h3>
                <p className="mt-1 text-sm text-brand-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
