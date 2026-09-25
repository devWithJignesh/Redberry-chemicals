"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Sprout,
  ShieldCheck,
  Award,
  Play,
  Pause,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { LinkButton } from "@/components/common/Button";
import { COMPANY } from "@/constants";

// Agricultural Image Slider items for overlapping organic mask
const SLIDER_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
    title: "Precision Tractor Spraying",
    subtitle: "Even foliar coverage across crops",
  },
  {
    url: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80",
    title: "Field Crop Protection",
    subtitle: "Safeguarding cotton, paddy & oilseeds",
  },
  {
    url: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80",
    title: "Farmer Spray Guidance",
    subtitle: "Targeted pest & fungal prevention",
  },
  {
    url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
    title: "Bountiful Healthy Harvest",
    subtitle: "Enhanced yield & soil vitality",
  },
];

export default function AboutSection() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // Automatic image slider interval
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about-us" className="py-24 bg-white relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-red-50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-emerald-50/50 blur-3xl" />

      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* ─── LEFT SIDE: Video Player & Automatic Overlapping Organic Media Slider ─── */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg">
              {/* Primary Video Player Container (Lush Field Video Base) */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] bg-brand-navy shadow-2xl border-4 border-white">
                <video
                  src="/videos/farming.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />

                {/* Video Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Video Play/Status Pill */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-3.5 py-1 text-[11px] font-semibold text-white border border-white/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
                  </span>
                  <span>Agro-Sciences in Action</span>
                </div>

                {/* Bottom Video Caption */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <p className="text-xs font-bold text-white/90 drop-shadow">
                    Certified Agro-Chemical Formulations • Est. 2020
                  </p>
                </div>
              </div>

              {/* Overlapping Organic Circular Automatic Image Slider (Matching Reference UI) */}
              <div className="absolute -bottom-10 -right-6 sm:-right-8 w-44 sm:w-56 aspect-square rounded-full border-4 border-white shadow-2xl overflow-hidden bg-brand-navy z-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                    className="relative h-full w-full"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={SLIDER_IMAGES[activeImageIndex].url}
                      alt={SLIDER_IMAGES[activeImageIndex].title}
                      className="h-full w-full object-cover"
                    />

                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Captions inside the rotating organic circle */}
                    <div className="absolute bottom-3 left-0 right-0 text-center px-2 text-white">
                      <p className="text-[10px] sm:text-xs font-bold leading-tight">
                        {SLIDER_IMAGES[activeImageIndex].title}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slide Indicator Dots */}
                <div className="absolute top-2 left-0 right-0 flex justify-center gap-1 z-30">
                  {SLIDER_IMAGES.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === activeImageIndex ? "w-4 bg-brand-red" : "w-1 bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Overlapping "100% Satisfaction Guarantee" Stamp Badge (Matching Reference UI) */}
              <div className="absolute top-4 -right-4 sm:-right-6 z-30 flex h-24 w-24 sm:h-28 sm:w-28 flex-col items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-emerald-500 to-green-700 text-white shadow-xl hover:scale-105 transition-transform">
                <ShieldCheck size={26} className="mb-0.5" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-100">
                  100% Guaranteed
                </span>
                <span className="text-[9px] font-semibold text-white/90">
                  Lab Purity
                </span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT SIDE: Detailed About Us Story (Matching Suncell Reference) ─── */}
          <div className="lg:col-span-6">
            {/* Header: Sprout Icon + "GET TO KNOW US" + "About Us" */}
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-red">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-brand-red">
                <Sprout size={14} />
              </span>
              <span>Get To Know Us</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-navy mb-5">
              About Us
            </h2>

            {/* Paragraph 1 */}
            <p className="text-sm sm:text-base leading-relaxed text-slate-700 font-medium mb-4">
              <strong>{COMPANY.name}</strong> is the brainchild of highly experienced agricultural and
              chemical professionals with an objective of providing innovative, high-potency products to
              farmers to maximize their farm output. Established in <strong>2020</strong> under our 3 executive
              directors, the success story of the company finds its roots in delivering dependable crop protection
              and plant nutrient formulations.
            </p>

            {/* Paragraph 2 */}
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 mb-4">
              We are an agrochemical company engaged in the business of manufacturing, distributing, and marketing
              a wide range of agrochemical formulations such as <strong>insecticides, fungicides, herbicides, plant growth
              regulators (PGR), micro fertilizers,</strong> and <strong>100% water-soluble NPKs</strong>. We provide comprehensive
              crop protection solutions to farmers to assist them in maximizing harvest productivity and profitability.
            </p>

            {/* Paragraph 3 */}
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 mb-4">
              With an aim to offer a wide product portfolio across the Agri-value chain, we manufacture and supply
              various formulation types including <strong>granules (WDG/GR), wettable powders (WP/SP), and liquids (EC/SC/SL)</strong>.
              We have obtained registration for agrochemical formulations compliant with <strong>CIB&RC</strong> guidelines.
            </p>

            {/* Paragraph 4 */}
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 mb-6">
              {COMPANY.name} was established by a qualified and dedicated technical management team. The company
              takes immense pride in delivering magnificent service, batch purity assurance, and continuous seasonal
              fulfillment across 15+ agricultural states in India.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <LinkButton href="/about">
                <span>Read Full Company Profile</span>
                <ChevronRight size={16} />
              </LinkButton>
              <LinkButton href="/products/agro-chemicals" variant="outline">
                Explore Agro Formulations
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
