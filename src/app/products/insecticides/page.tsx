import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/common/Container";
import { INSECTICIDES } from "@/data/insecticides";
import { COMPANY } from "@/constants";
import CustomerReviewsSection from "@/components/common/CustomerReviewsSection";
import InsecticideGrid from "@/components/product/InsecticideGrid";

export const metadata: Metadata = {
  title: `Insecticides — Crop Protection Solutions | ${COMPANY.name}`,
  description:
    `Explore Redberry Agri Sciences' high-potency insecticide formulations including Aadhira, Bitcoin, Chlocyp, and Chlofos for broad-spectrum crop protection.`,
};

export default function InsecticidesPage() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* Reference Hero Banner with Tractor Spraying & Organic Torn Border */}
      <section className="relative h-[320px] md:h-[400px] w-full overflow-hidden bg-brand-navy flex items-center justify-center">
        {/* Tractor background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banners/tractor_spray_hero.jpg"
            alt="Agricultural Tractor Spraying Crops"
            fill
            priority
            className="object-cover object-center brightness-[0.65] contrast-[1.05]"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>

        {/* Torn top jagged edge */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none rotate-180">
          <svg
            viewBox="0 0 1200 50"
            preserveAspectRatio="none"
            className="w-full h-6 md:h-9 text-white fill-current"
          >
            <path d="M0,0 L20,16 L45,6 L70,20 L95,8 L120,22 L145,10 L170,18 L195,6 L220,20 L245,12 L270,22 L295,8 L320,18 L345,6 L370,22 L395,12 L420,18 L445,8 L470,22 L495,6 L520,20 L545,10 L570,24 L595,12 L620,20 L645,6 L670,22 L695,10 L720,20 L745,8 L770,24 L795,10 L820,20 L845,6 L870,22 L895,12 L920,18 L945,8 L970,22 L995,10 L1020,20 L1045,6 L1070,22 L1095,12 L1120,20 L1145,6 L1170,18 L1200,8 L1200,50 L0,50 Z" />
          </svg>
        </div>

        {/* Center Content: HOME / INSECTICIDES and cursive title */}
        <div className="relative z-20 text-center px-4 max-w-2xl mx-auto flex flex-col items-center">
          {/* Breadcrumb matching reference screenshot */}
          <div className="mb-2 flex items-center gap-2 text-xs md:text-sm font-extrabold uppercase tracking-widest text-white/90 drop-shadow-md">
            <Link href="/" className="hover:text-[#EA580C] transition-colors">
              HOME
            </Link>
            <span className="text-white/60">/</span>
            <span className="text-white">INSECTICIDES</span>
          </div>

          {/* Heading with bold handwritten/brush cursive feel */}
          <h1
            className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] select-none"
            style={{ fontFamily: "'Comfortaa', 'Fredoka', 'Quicksand', 'Outfit', sans-serif" }}
          >
            Insecticides
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/85 font-medium max-w-lg drop-shadow">
            Advanced high-yield agrochemical formulations for targeted crop defense and pest control.
          </p>
        </div>

        {/* Torn bottom jagged edge */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none">
          <svg
            viewBox="0 0 1200 50"
            preserveAspectRatio="none"
            className="w-full h-7 md:h-11 text-[#FAF9F6] fill-current"
          >
            <path d="M0,0 L20,16 L45,6 L70,20 L95,8 L120,22 L145,10 L170,18 L195,6 L220,20 L245,12 L270,22 L295,8 L320,18 L345,6 L370,22 L395,12 L420,18 L445,8 L470,22 L495,6 L520,20 L545,10 L570,24 L595,12 L620,20 L645,6 L670,22 L695,10 L720,20 L745,8 L770,24 L795,10 L820,20 L845,6 L870,22 L895,12 L920,18 L945,8 L970,22 L995,10 L1020,20 L1045,6 L1070,22 L1095,12 L1120,20 L1145,6 L1170,18 L1200,8 L1200,50 L0,50 Z" />
          </svg>
        </div>
      </section>

      {/* Main Insecticides Product Grid */}
      <section className="py-16 md:py-24">
        <Container>
          {/* Header Description */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#EA580C] mb-3">
              Specialized Formulations
            </span>
            <h2 className="font-heading text-3xl font-bold text-brand-navy md:text-4xl">
              Reliable Insecticide Solutions for Maximum Harvest Protection
            </h2>
            <p className="mt-4 text-base text-brand-muted">
              Click on any product image to explore complete technical data, dosage guides, target pests, and packaging specifications.
            </p>
          </div>

          {/* Interactive Products Grid matching reference */}
          <InsecticideGrid products={INSECTICIDES} />
        </Container>
      </section>

      {/* Trust & Features Strip */}
      <section className="bg-white border-y border-slate-200/80 py-12">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100/60">
              <div className="text-2xl font-bold text-[#EA580C] mb-1">100% Pure</div>
              <div className="text-sm font-semibold text-brand-navy">Lab Verified Actives</div>
              <div className="text-xs text-brand-muted mt-1">Stringent batch HPLC testing</div>
            </div>
            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100/60">
              <div className="text-2xl font-bold text-[#EA580C] mb-1">Fast Acting</div>
              <div className="text-sm font-semibold text-brand-navy">Rapid Knockdown</div>
              <div className="text-xs text-brand-muted mt-1">Stops feeding within 2 hours</div>
            </div>
            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100/60">
              <div className="text-2xl font-bold text-[#EA580C] mb-1">Rain Fast</div>
              <div className="text-sm font-semibold text-brand-navy">Weather Resistant</div>
              <div className="text-xs text-brand-muted mt-1">High cuticle adhesion surfactants</div>
            </div>
            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100/60">
              <div className="text-2xl font-bold text-[#EA580C] mb-1">Pan-India</div>
              <div className="text-sm font-semibold text-brand-navy">Prompt Bulk Delivery</div>
              <div className="text-xs text-brand-muted mt-1">Reliable supply to distributors</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Reviews Slider */}
      <CustomerReviewsSection />
    </div>
  );
}
