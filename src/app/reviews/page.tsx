"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  CheckCircle2,
  Quote,
  Search,
  MessageSquarePlus,
  ShieldCheck,
  ThumbsUp,
  Send,
  MapPin,
} from "lucide-react";
import Container from "@/components/common/Container";
import { CustomerReview } from "@/data/reviews";
import { COMPANY } from "@/constants";
import { getReviewsApi, createReviewApi } from "@/api/reviewApi";

export default function CustomerReviewsPage() {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // New review form state (only: name, address, description, rate)
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newRate, setNewRate] = useState(5);
  const [newDesc, setNewDesc] = useState("");

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
          rate: Number(r.rate) || 5,
          image: r.image || '/images/reviews/farmer_1.png',
        }));
        setReviews(mapped);
      }
    } catch (err) {
      console.warn('Error fetching live reviews:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveReviews();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newDesc.trim() || !newAddress.trim()) return;

    setIsSubmitting(true);

    const newReviewPayload = {
      name: newName.trim(),
      address: newAddress.trim(),
      description: newDesc.trim(),
      rate: Number(newRate) || 5,
      image: "/images/reviews/farmer_1.png",
    };

    try {
      const res = await createReviewApi(newReviewPayload);
      const serverId = res?.data?._id || `rev-${Date.now()}`;
      
      const newReviewItem: CustomerReview = {
        id: serverId,
        ...newReviewPayload,
      };

      setReviews((prev) => [newReviewItem, ...prev]);
      setSubmittedSuccess(true);

      setTimeout(() => {
        setIsFormOpen(false);
        setSubmittedSuccess(false);
        setNewName("");
        setNewAddress("");
        setNewRate(5);
        setNewDesc("");
      }, 2000);
    } catch (err) {
      console.warn('API error submitting review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      (r.address && r.address.toLowerCase().includes(q)) ||
      (r.location && r.location.toLowerCase().includes(q))
    );
  });

  // Calculate average rating dynamically
  const totalCount = reviews.length;
  const avgRating = totalCount > 0 
    ? (reviews.reduce((acc, curr) => acc + (Number(curr.rate) || 5), 0) / totalCount).toFixed(1)
    : '5.0';

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-slate-800">
      {/* Hero Header */}
      <section className="relative flex h-[340px] items-center overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-red-dark/70" />
        <Container className="relative z-10">
          <div className="mb-3 flex items-center gap-2 text-xs text-white/60">
            <span>Home</span> <span className="text-brand-red">/</span> <span>Customer Reviews</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white md:text-5xl">
            Customer Reviews & Ratings
          </h1>
          <p className="mt-4 max-w-xl text-white/80 text-sm md:text-base leading-relaxed">
            Real experiences from customers across India who rely on {COMPANY.name}.
          </p>
        </Container>
      </section>

      {/* Trust Metrics Overview */}
      <Container className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 font-bold text-2xl font-mono border border-amber-200/60">
              {avgRating}
            </div>
            <div>
              <div className="flex items-center text-amber-400 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={18} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-sm font-bold text-slate-800">Average Rating</div>
              <div className="text-xs text-slate-500">Based on {totalCount}+ Customer Reviews</div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/60">
              <ShieldCheck size={32} />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-slate-900">100%</div>
              <div className="text-sm font-bold text-slate-800">Lab-Certified Purity</div>
              <div className="text-xs text-slate-500">With Batch COA Documentation</div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-brand-red border border-red-200/60">
              <ThumbsUp size={30} />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-slate-900">98.4%</div>
              <div className="text-sm font-bold text-slate-800">Repeat Orders</div>
              <div className="text-xs text-slate-500">Across 15+ States</div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-14 pb-4 border-b border-slate-200/80">
          <div>
            <h2 className="font-heading text-lg font-bold text-brand-navy">
              Customer Experiences
            </h2>
            <p className="text-xs text-slate-500">
              Showing {filteredReviews.length} customer feedback records
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative min-w-[240px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input
                type="text"
                placeholder="Search reviews by name or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs text-slate-800 placeholder-slate-400 shadow-sm focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
              />
            </div>

            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-brand-red px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-red-600/20 hover:bg-red-700 transition-all active:scale-95"
            >
              <MessageSquarePlus size={15} /> Write a Review
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="py-20 text-center text-slate-400 text-sm">
            Loading reviews from database...
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="py-20 text-center text-slate-400 text-sm">
            No reviews found. Be the first to share your experience!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8 mb-20">
            <AnimatePresence>
              {filteredReviews.map((review, idx) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="group relative"
                >
                  {/* Offset Red Accent Backplate */}
                  <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[2.3rem] bg-gradient-to-br from-brand-red to-rose-600 shadow-lg shadow-red-500/15 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3 group-hover:shadow-red-500/25" />

                  {/* Main Card */}
                  <div className="relative flex flex-col justify-between rounded-[2.3rem] bg-white p-7 md:p-8 text-center border border-slate-200/90 shadow-md min-h-[380px] transition-all duration-300 group-hover:shadow-xl">
                    <div>
                      {/* Customer Portrait Avatar */}
                      <div className="relative -mt-16 mb-4 flex justify-center">
                        <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-xl ring-2 ring-brand-red shadow-red-500/20 shrink-0 aspect-square transition-transform duration-300 group-hover:scale-105">
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
                      <h3 className="font-heading text-lg font-bold text-brand-navy group-hover:text-brand-red transition-colors">
                        {review.name}
                      </h3>

                      {/* Address */}
                      <p className="mt-1 text-xs text-slate-500 font-medium flex items-center justify-center gap-1">
                        <MapPin size={12} className="text-slate-400" />
                        {review.address || review.location}
                      </p>

                      {/* Quote Mark */}
                      <div className="my-2.5 flex justify-center text-brand-red">
                        <Quote size={22} className="fill-brand-red text-brand-red" />
                      </div>

                      {/* Rating Stars */}
                      <div className="mb-3 flex items-center justify-center gap-1 text-amber-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={
                              star <= Math.floor(review.rate)
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-200"
                            }
                          />
                        ))}
                        <span className="ml-1 text-[11px] font-mono font-bold text-slate-700">
                          {review.rate.toFixed(1)} / 5.0
                        </span>
                      </div>

                      {/* Review Description */}
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                        {review.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Modal Form: Write a Review */}
        <AnimatePresence>
          {isFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto text-slate-900"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-xl font-bold text-brand-navy">
                    Share Your Customer Experience
                  </h3>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="text-slate-400 hover:text-slate-700 text-lg font-bold"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-xs text-slate-500 mb-6">
                  Help other customers across India by rating our products and service.
                </p>

                {submittedSuccess ? (
                  <div className="rounded-2xl bg-emerald-50 p-6 text-center border border-emerald-200">
                    <CheckCircle2 size={40} className="mx-auto text-emerald-600 mb-2" />
                    <h4 className="text-base font-bold text-emerald-800">Thank You For Your Review!</h4>
                    <p className="text-xs text-emerald-700 mt-1">Your review has been successfully saved to our database.</p>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                    {/* Rating Selector */}
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1.5">
                        Rating (1 to 5 Stars) *
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewRate(star)}
                            className="p-1 transition-transform hover:scale-110"
                          >
                            <Star
                              size={26}
                              className={
                                star <= newRate
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-200"
                              }
                            />
                          </button>
                        ))}
                        <span className="ml-2 font-mono font-bold text-sm text-slate-800">
                          {newRate}.0 / 5.0
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Name *</label>
                        <input
                          type="text"
                          required
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="e.g. Rameshbhai Patel"
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-brand-red focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Address *</label>
                        <input
                          type="text"
                          required
                          value={newAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                          placeholder="e.g. Anand, Gujarat"
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-brand-red focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Description *</label>
                      <textarea
                        required
                        rows={4}
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        placeholder="Describe your experience and feedback..."
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-brand-red focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-brand-red px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-red-700 disabled:opacity-50"
                      >
                        <Send size={13} /> {isSubmitting ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}
