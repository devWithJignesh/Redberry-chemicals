"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/common/Button";
import Container from "@/components/common/Container";

interface HeroSlideWithVideo {
  eyebrow: string;
  title: string;
  description: string;
  video: string;
  poster: string;
}

const SLIDES: HeroSlideWithVideo[] = [
  {
    eyebrow: "Pioneering Agri-Sciences & Crop Protection",
    title: "Empowering Farmers.\nNourishing Harvests.",
    description:
      "Lab-certified agrochemicals, high-potency pesticide intermediates, water-soluble fertilizers, and plant biostimulants engineered for maximum crop yield and soil vitality across India.",
    video: "/videos/Create_a_cinematic_realistic.mp4",
    poster: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1920&q=80",
  },
  {
    eyebrow: "20+ Agro Solutions • 300+ Agri Partners • Pan-India",
    title: "Advanced Crop Care\nYou Can Rely On.",
    description:
      "Every agro formulation is verified with rigorous COA & SDS documentation. Trusted by pesticide manufacturers, regional agro-dealers, and commercial farming estates.",
    video: "/videos/farming.mp4",
    poster: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1920&q=80",
  },
  {
    eyebrow: "Pesticides • Fertilizers • Soil Vitality",
    title: "Growing Greener Yields\nFor Every Season.",
    description:
      "From pre-sowing seed protection and foliar micronutrients to pre-harvest pest shields and drip-irrigation nutrition, Redberry fuels agricultural prosperity.",
    video: "/videos/Create_a_cinematic_realistic.mp4",
    poster: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1920&q=80",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const nextSlide = useCallback(() => {
    setActive((prev) => (prev + 1) % SLIDES.length);
  }, []);

  // When video completes, seamlessly advance to next slide and next video
  const handleVideoEnded = () => {
    nextSlide();
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [active]);

  const slide = SLIDES[active];

  return (
    <section className="relative flex min-h-[560px] md:min-h-[620px] lg:min-h-[660px] items-center overflow-hidden bg-brand-navy">
      {/* ─── Video Background ─── */}
      <video
        ref={videoRef}
        key={slide.video}
        className="absolute inset-0 h-full w-full object-cover scale-105 transition-opacity duration-700"
        poster={slide.poster}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
      >
        <source src={slide.video} type="video/mp4" />
      </video>

      {/* ─── Cinematic Overlay Gradient ─── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-transparent to-black/40" />

      {/* ─── Main Content ─── */}
      <Container className="relative z-10 pt-24 pb-14">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Eyebrow */}
              <motion.span
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-red-300 uppercase backdrop-blur-md shadow-sm"
              >
                <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
                {slide.eyebrow}
              </motion.span>

              {/* Headline */}
              <h1 className="font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-md">
                {slide.title.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {i === 0 ? (
                      <span className="text-white">{line}</span>
                    ) : (
                      <span className="bg-gradient-to-r from-red-400 via-brand-red to-amber-300 bg-clip-text text-transparent">
                        {line}
                      </span>
                    )}
                  </span>
                ))}
              </h1>

              {/* Description */}
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <a
              href="#agro-solutions"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-red to-red-600 px-5 py-3 text-xs md:text-sm font-semibold text-white shadow-lg shadow-red-600/30 hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Explore 20+ Agro Solutions</span>
              <ArrowRight size={15} />
            </a>
            <LinkButton href="/contact" variant="outline-light" showArrow={false}>
              Get Agro Quote & COA →
            </LinkButton>
          </div>
        </div>
      </Container>

      {/* ─── Scroll Cue ─── */}
      <div className="absolute bottom-3 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 md:flex">
        <span className="text-[9px] font-semibold tracking-[0.25em] text-white/40 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-white/40" />
        </motion.div>
      </div>

      {/* ─── Bottom Soft Gradient Fade ─── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A0F1D] to-transparent" />
    </section>
  );
}
