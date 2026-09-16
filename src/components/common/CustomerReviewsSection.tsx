"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Sprout,
  Quote,
} from "lucide-react";
import Container from "@/components/common/Container";
import { CUSTOMER_REVIEWS, CustomerReview } from "@/data/reviews";

interface CustomerReviewsSectionProps {
  title?: string;
  eyebrow?: string;
  description?: string;
  className?: string;
  showViewAllButton?: boolean;
}

const AUTO_SLIDE_INTERVAL = 3800; // 3.8s per slide automatic change

export default function CustomerReviewsSection({
  title = "What Our Clients Say About Us",
  eyebrow = "Verified Customer Testimonials",
  description = "Real feedback from commercial growers, regional agrochemical distributors, and farm estate managers across India.",
  className = "",
  showViewAllButton = true,
}: CustomerReviewsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const totalReviews = CUSTOMER_REVIEWS.length;

  // Single card step forward
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  }, [totalReviews]);

  // Single card step backward
  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Fully automatic continuous slider loop
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // 3 Visible Cards: Left (previous), Center (featured), Right (next)
  const prevIndex = (currentIndex - 1 + totalReviews) % totalReviews;
  const nextIndex = (currentIndex + 1) % totalReviews;

  const threeCards = [
    { review: CUSTOMER_REVIEWS[prevIndex], position: "left", index: prevIndex },
    { review: CUSTOMER_REVIEWS[currentIndex], position: "center", index: currentIndex },
    { review: CUSTOMER_REVIEWS[nextIndex], position: "right", index: nextIndex },
  ];

  return (
    <section
      id="customer-reviews"
      className={`relative overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-24 bg-[#0A0E17] text-white scroll-mt-24 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Ambient Glows (Preserving Redberry Red Brand Tones) */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-brand-red/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-red-950/40 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 right-10 h-72 w-72 rounded-full bg-amber-950/30 blur-[100px]" />

      <Container className="relative z-10">
        {/* ─── Header: < What Our Clients Say About Us > with Concentric Dots ─── */}
        <div className="text-center mb-16 md:mb-20">
          {eyebrow && (
            <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-brand-red">
              {eyebrow}
            </p>
          )}

          {/* Header Row: Left Arrow + Title + Right Arrow */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-10">
            <button
              onClick={prevSlide}
              aria-label="Previous Review"
              className="flex h-12 w-12 items-center justify-center text-brand-red hover:text-white transition-transform hover:scale-125 active:scale-95"
            >
              <ChevronLeft size={38} strokeWidth={2.5} />
            </button>

            <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              {title}
            </h2>

            <button
              onClick={nextSlide}
              aria-label="Next Review"
              className="flex h-12 w-12 items-center justify-center text-brand-red hover:text-white transition-transform hover:scale-125 active:scale-95"
            >
              <ChevronRight size={38} strokeWidth={2.5} />
            </button>
          </div>

          {/* Concentric Dots Indicator Underneath Title */}
          <div className="mt-5 flex items-center justify-center gap-2.5">
            {CUSTOMER_REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Go to review ${i + 1}`}
                className="group flex items-center justify-center p-1"
              >
                {i === currentIndex ? (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-brand-red">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-red shadow-[0_0_8px_rgba(225,29,72,0.9)]" />
                  </span>
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40 transition-all duration-300 group-hover:bg-white" />
                )}
              </button>
            ))}
          </div>

          {description && (
            <p className="mx-auto mt-4 max-w-xl text-xs md:text-sm text-slate-400">
              {description}
            </p>
          )}
        </div>

        {/* ─── 3 Cards Display: Left (prev), Center (featured), Right (next) ─── */}
        <div className="relative mx-auto max-w-6xl px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-center">
            {threeCards.map(({ review, position, index }) => {
              const isCenter = position === "center";
              const isLeft = position === "left";
              const isRight = position === "right";

              return (
                <div
                  key={`${review.id}-${position}`}
                  onClick={() => {
                    if (isLeft) prevSlide();
                    if (isRight) nextSlide();
                  }}
                  className={`relative transition-all duration-500 cursor-pointer ${
                    isCenter
                      ? "z-20 md:-translate-y-4"
                      : "hidden md:block z-10 opacity-70 hover:opacity-100 hover:scale-[1.02]"
                  }`}
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: isCenter ? 0.95 : 0.88, y: 15 }}
                    animate={{ opacity: 1, scale: isCenter ? 1.06 : 0.92, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full"
                  >
                    {/* 1. Offset Red Accent Backplate Layer (Exact Reference UI Shape) */}
                    <div
                      className={`absolute inset-0 rounded-[2.3rem] bg-gradient-to-br from-brand-red to-rose-700 shadow-xl transition-transform duration-500 ${
                        isCenter
                          ? "translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 shadow-red-600/30"
                          : isLeft
                          ? "-translate-x-2 translate-y-3 rotate-[-1.5deg] shadow-red-600/15"
                          : "translate-x-3 translate-y-3 rotate-[1.5deg] shadow-red-600/15"
                      }`}
                    />

                    {/* 2. Main Dark Card Layer */}
                    <div
                      className={`relative flex flex-col justify-between rounded-[2.3rem] p-7 md:p-8 text-center border border-white/10 shadow-2xl transition-all duration-300 ${
                        isCenter
                          ? "min-h-[460px] md:min-h-[490px] bg-[#2A2E38]"
                          : "min-h-[400px] md:min-h-[420px] bg-[#22252C]"
                      }`}
                    >
                      <div>
                        {/* Protruding Static Customer Avatar (Centered on Top Edge) */}
                        <div className="relative -mt-16 mb-4 flex justify-center">
                          <div
                            className={`relative overflow-hidden rounded-full border-4 border-[#252830] shadow-2xl transition-all duration-300 shrink-0 aspect-square ${
                              isCenter
                                ? "h-20 w-20 md:h-24 md:w-24 ring-2 ring-brand-red shadow-red-500/30"
                                : "h-16 w-16 ring-1 ring-white/20"
                            }`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={review.image}
                              alt={review.name}
                              className="h-full w-full object-cover aspect-square"
                              loading="lazy"
                            />
                            {review.verified && (
                              <div
                                className="absolute bottom-0 right-0 rounded-full bg-emerald-500 p-0.5 text-white ring-2 ring-[#252830]"
                                title="Verified Customer"
                              >
                                <CheckCircle2 size={12} className="fill-emerald-500 text-white" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Customer Name */}
                        <h3
                          className={`font-heading font-bold text-white transition-colors ${
                            isCenter ? "text-lg md:text-xl" : "text-base"
                          }`}
                        >
                          {review.name}
                        </h3>

                        {/* Role & Location */}
                        <p className="mt-1 text-xs text-slate-300 font-medium">
                          {review.role}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {review.location}
                        </p>

                        {/* Red Quote Mark (Matching Screenshot UI) */}
                        <div className="my-2.5 flex justify-center text-brand-red">
                          <Quote size={isCenter ? 26 : 20} className="fill-brand-red text-brand-red" />
                        </div>

                        {/* Rating Stars (5 to 0) */}
                        <div className="mb-3 flex items-center justify-center gap-1 text-amber-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={isCenter ? 14 : 12}
                              className={
                                star <= Math.floor(review.rate)
                                  ? "fill-amber-400 text-amber-400"
                                  : star - review.rate <= 0.5
                                  ? "fill-amber-300 text-amber-300"
                                  : "text-slate-600"
                              }
                            />
                          ))}
                          <span className="ml-1 text-[11px] font-mono text-amber-300 font-bold">
                            {review.rate.toFixed(1)} / 5.0
                          </span>
                        </div>

                        {/* Review Title */}
                        {isCenter && review.title && (
                          <h4 className="font-heading text-xs md:text-sm font-semibold text-rose-200 mb-2">
                            "{review.title}"
                          </h4>
                        )}

                        {/* Review Description */}
                        <p
                          className={`text-slate-300 leading-relaxed font-normal ${
                            isCenter
                              ? "text-xs md:text-[13px] line-clamp-6"
                              : "text-[11px] md:text-xs text-slate-400 line-clamp-5"
                          }`}
                        >
                          {review.description}
                        </p>
                      </div>

                      {/* Card Bottom Meta */}
                      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-red/15 px-3 py-1 text-[10px] font-bold text-rose-300 border border-brand-red/20">
                          <Sprout size={11} className="text-brand-red" />
                          {review.cropOrCategory}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Footer: Browse All Reviews Link ─── */}
        {showViewAllButton && (
          <div className="mt-14 text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-6 py-2.5 text-xs font-bold text-rose-200 transition-all duration-300 hover:bg-brand-red hover:text-white hover:shadow-lg hover:shadow-red-600/30 group"
            >
              <span>Explore All Verified Customer Reviews</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
