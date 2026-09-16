"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LinkButton } from "@/components/common/Button";
import Container from "@/components/common/Container";
import { HeroSlide } from "@/types";

const SLIDES: HeroSlide[] = [
  {
    eyebrow: "Purity • Consistency • Trust",
    title: "Purity in Every Reaction.",
    description:
      "Reliable industrial, agro and specialty chemical supply — built for manufacturers who can't afford inconsistency.",
  },
  {
    eyebrow: "12+ Years in Business",
    title: "Chemicals You Can Build On.",
    description:
      "Lab-verified purity, transparent documentation and on-time bulk delivery, every single order.",
  },
  {
    eyebrow: "Serving 15+ States",
    title: "Your Bulk Supply Partner.",
    description:
      "From industrial processing to water treatment, we keep your supply chain moving without surprises.",
  },
];

// NOTE: place an actual hero video at /public/videos/hero.mp4 (and a poster
// at /public/images/banners/hero-poster.jpg). Until then this falls back to
// an animated gradient "slide" background so the layout still looks complete.
const VIDEO_SRC = "/videos/hero.mp4";
const POSTER_SRC = "/images/banners/hero-poster.jpg";

export default function Hero() {
  const [active, setActive] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[active];

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-brand-navy">
      {/* Video background */}
      {!videoFailed && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoFailed(true)}
        />
      )}

      {/* Fallback animated gradient background if no video file is present */}
      {videoFailed && (
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 animate-ken-burns"
              style={{
                background:
                  active === 0
                    ? "linear-gradient(135deg,#1E293B 0%,#0F172A 55%,#3B0A14 100%)"
                    : active === 1
                    ? "linear-gradient(135deg,#3B0A14 0%,#8E1329 55%,#0F172A 100%)"
                    : "linear-gradient(135deg,#0F172A 0%,#1E293B 55%,#C41E3A 130%)",
              }}
            />
          </AnimatePresence>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/55 to-brand-navy/10" />

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                {slide.eyebrow}
              </span>
              <h1 className="font-heading text-4xl font-bold leading-[1.08] text-white sm:text-5xl md:text-6xl">
                {slide.title}
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex flex-wrap gap-4">
            <LinkButton href="/products">Explore Products</LinkButton>
            <LinkButton href="/contact" variant="outline-light" showArrow={false}>
              Get a Quote
            </LinkButton>
          </div>

          {/* Slide indicators */}
          <div className="mt-14 flex gap-3">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                className="h-1.5 overflow-hidden rounded-full bg-white/25"
                style={{ width: i === active ? 40 : 18 }}
              >
                {i === active && (
                  <motion.div
                    key={active}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5.5, ease: "linear" }}
                    className="h-full bg-brand-red"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </Container>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 md:flex">
        <span className="text-[11px] tracking-[0.2em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="h-8 w-[1px] bg-white/40"
        />
      </div>
    </section>
  );
}
