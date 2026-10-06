"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Quote,
} from "lucide-react";
import Container from "@/components/common/Container";
import { CustomerReview } from "@/data/reviews";
import { getReviewsApi } from "@/api/reviewApi";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Mousewheel, EffectCreative } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

interface CustomerReviewsSectionProps {
  title?: string;
  eyebrow?: string;
  description?: string;
  className?: string;
  showViewAllButton?: boolean;
}

export default function CustomerReviewsSection({
  title = "What Our Clients Say About Us",
  eyebrow = "Customer Reviews",
  description = "Real feedback and ratings from customers across India.",
  className = "",
  showViewAllButton = true,
}: CustomerReviewsSectionProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLiveReviews = async () => {
      setIsLoading(true);
      try {
        const res = await getReviewsApi();
        if (res && res.success && Array.isArray(res.data)) {
          const mapped: CustomerReview[] = res.data.map((r: any) => ({
            id: r._id || r.id,
            name: r.name,
            address: r.address || r.location || 'India',
            description: r.description || r.review || r.title || '',
            image: r.image || '/images/reviews/farmer_1.png',
            rate: Number(r.rate) || 5,
          }));
          setReviews(mapped);
        }
      } catch (err) {
        console.warn('Error fetching live reviews:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveReviews();
  }, []);

  if (!isLoading && reviews.length === 0) {
    return null;
  }

  return (
    <section
      id="customer-reviews"
      className={`relative overflow-x-clip pt-28 sm:pt-32 md:pt-36 pb-32 bg-[#0A0E17] text-white scroll-mt-24 ${className}`}
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-brand-red/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-red-950/40 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 right-10 h-72 w-72 rounded-full bg-amber-950/30 blur-[100px]" />

      <Container className="relative z-10">
        {/* Header Row */}
        <div className="text-center mb-16 md:mb-20">
          {eyebrow && (
            <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-brand-red">
              {eyebrow}
            </p>
          )}

          <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-10">
            <button
              ref={prevRef}
              aria-label="Previous Review"
              className="flex h-12 w-12 items-center justify-center text-brand-red hover:text-white transition-transform hover:scale-125 active:scale-95 z-20"
            >
              <ChevronLeft size={38} strokeWidth={2.5} />
            </button>

            <h2 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              {title}
            </h2>

            <button
              ref={nextRef}
              aria-label="Next Review"
              className="flex h-12 w-12 items-center justify-center text-brand-red hover:text-white transition-transform hover:scale-125 active:scale-95 z-20"
            >
              <ChevronRight size={38} strokeWidth={2.5} />
            </button>
          </div>

          {description && (
            <p className="mx-auto mt-4 max-w-xl text-xs md:text-sm text-slate-400">
              {description}
            </p>
          )}
        </div>

        {/* Swiper Slider */}
        <div className="relative mx-auto w-full max-w-[100vw] overflow-visible px-2 sm:px-4">
          <Swiper
            modules={[Navigation, Pagination, Mousewheel, Autoplay, EffectCreative]}
            effect="creative"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={reviews.length > 1}
            mousewheel={{
              forceToAxis: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            creativeEffect={{
              limitProgress: 2,
              prev: {
                translate: ["-115%", "15%", 0],
                rotate: [0, 0, -8],
                scale: 0.85,
              },
              next: {
                translate: ["115%", "15%", 0],
                rotate: [0, 0, 8],
                scale: 0.85,
              },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (typeof swiper.params.navigation !== 'boolean') {
                 // @ts-ignore
                 swiper.params.navigation.prevEl = prevRef.current;
                 // @ts-ignore
                 swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            pagination={{ 
              clickable: true,
              bulletClass: 'swiper-custom-bullet',
              bulletActiveClass: 'swiper-custom-bullet-active',
            }}
            className="!pb-32 pt-20 !overflow-visible"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="!w-[280px] sm:!w-[340px] md:!w-[380px] transition-all duration-300 !overflow-visible">
                {({ isActive }) => (
                  <div className="relative w-full py-4">
                    {/* Main Card Layer */}
                    <div
                      className={`relative flex flex-col justify-between rounded-[2rem] p-5 md:p-6 text-center border shadow-2xl transition-all duration-300 ${
                          isActive
                          ? "min-h-[340px] md:min-h-[360px] bg-white border-transparent"
                          : "min-h-[320px] md:min-h-[340px] bg-white border-slate-200 opacity-90 hover:opacity-100"
                        }`}
                    >
                      <div>
                        {/* Profile Image */}
                        <div className="relative -mt-16 mb-4 flex justify-center">
                          <div
                            className={`relative overflow-hidden rounded-full border-4 shadow-2xl transition-all duration-300 shrink-0 aspect-square ${
                                isActive
                                ? "border-white h-16 w-16 md:h-20 md:w-20 ring-2 ring-brand-red shadow-red-500/30"
                                : "border-white h-14 w-14 ring-1 ring-slate-200"
                              }`}
                          >
                            <img
                              src={review.image || '/images/reviews/farmer_1.png'}
                              alt={review.name}
                              className="h-full w-full object-cover aspect-square"
                              loading="lazy"
                              onError={(e: any) => {
                                e.target.src = '/images/reviews/farmer_1.png';
                              }}
                            />
                          </div>
                        </div>

                        {/* Customer Name */}
                        <h3
                          className={`font-heading font-bold transition-colors ${
                              isActive ? "text-slate-900 text-lg md:text-xl" : "text-slate-600 text-base"
                            }`}
                        >
                          {review.name}
                        </h3>

                        {/* Address */}
                        <p className={`mt-1 text-xs font-medium ${isActive ? 'text-slate-600' : 'text-slate-400'}`}>
                          {review.address || review.location}
                        </p>

                        {/* Red Quote Mark */}
                        <div className={`my-2.5 flex justify-center ${isActive ? 'text-brand-red' : 'text-slate-300'}`}>
                          <Quote size={isActive ? 26 : 20} className={isActive ? "fill-brand-red text-brand-red" : "fill-slate-200 text-slate-200"} />
                        </div>

                        {/* Rating Stars */}
                        <div className={`mb-3 flex items-center justify-center gap-1 ${isActive ? 'text-amber-400' : 'text-slate-300'}`}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={isActive ? 14 : 12}
                              className={
                                isActive && star <= Math.floor(review.rate)
                                  ? "fill-amber-400 text-amber-400"
                                  : isActive && star - review.rate <= 0.5
                                    ? "fill-amber-300 text-amber-300"
                                    : "text-slate-200 fill-slate-200"
                              }
                            />
                          ))}
                          {isActive && (
                            <span className="ml-1 text-[11px] font-mono text-amber-500 font-bold">
                              {review.rate.toFixed(1)} / 5.0
                            </span>
                          )}
                        </div>

                        {/* Review Description */}
                        <p
                          className={`leading-relaxed font-normal ${
                              isActive
                              ? "text-xs md:text-[13px] text-slate-700 line-clamp-6"
                              : "text-[11px] md:text-xs text-slate-500 line-clamp-4"
                            }`}
                        >
                          {review.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Footer: Browse All Reviews Link */}
        {showViewAllButton && (
          <div className="mt-8 text-center relative z-20">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-6 py-2.5 text-xs font-bold text-rose-200 transition-all duration-300 hover:bg-brand-red hover:text-white hover:shadow-lg hover:shadow-red-600/30 group"
            >
              <span>Explore All Customer Reviews</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
