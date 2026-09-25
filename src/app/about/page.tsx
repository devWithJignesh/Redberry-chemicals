import type { Metadata } from "next";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { LinkButton } from "@/components/common/Button";
import { COMPANY } from "@/constants";
import LeadershipSection from "@/components/common/LeadershipSection";
import CustomerReviewsSection from "@/components/common/CustomerReviewsSection";
import AboutSection from "@/components/home/AboutSection";
import AgriSolutionsSection from "@/components/home/AgriSolutionsSection";

export const metadata: Metadata = {
  title: `About Us — ${COMPANY.name}`,
  description:
    `Learn about ${COMPANY.name} (Est. 2020) — our story, our leadership, our values, and the team behind reliable agricultural chemistry.`,
};

const TIMELINE = [
  { year: "2020", title: "Founded in Anand & Ahmedabad", text: "Established Redberry Agri Sciences Pvt Ltd by our 3 executive directors with a focused mission to deliver high-yield crop protection and pure agrochemical inputs." },
  { year: "2022", title: "CIB-Compliant Formulations", text: "Expanded into broad-spectrum pesticide intermediates, 100% water-soluble NPK fertilizers, and organic bio-stimulants." },
  { year: "2024", title: "300+ Agri Dealers & Growers", text: "Developed strong institutional partnerships and retail dealership networks across Gujarat and western India." },
  { year: "2026", title: "15+ States & Growing Continously", text: "Supplying certified agrochemicals, customized formulations, and dedicated agronomy support nationwide." },
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
            Established in 2020 — Driving sustainable agricultural productivity and farmer prosperity across India.
          </p>
        </Container>
      </section>

      {/* Story with Left Side Video Player & Overlapping Organic Image Slider */}
      <AboutSection />

      {/* ─── Executive Leadership (3 Owners) ─── */}
      <LeadershipSection />

      {/* Values: 9 Core Pillars */}
      <AgriSolutionsSection />

      {/* Timeline: Since 2020 */}
      <section className="py-24 bg-white">
        <Container className="max-w-3xl">
          <SectionTitle eyebrow="Our Journey" title="Milestones Since 2020" className="mb-14" />
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

      {/* Customer Reviews Slider */}
      <CustomerReviewsSection />
    </>
  );
}
