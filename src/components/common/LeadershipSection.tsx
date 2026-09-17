"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, MapPin, Award, CheckCircle2 } from "lucide-react";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { OWNERS } from "@/constants";

export default function LeadershipSection({ className = "" }: { className?: string }) {
  return (
    <section className={`py-20 bg-white relative overflow-hidden ${className}`}>
      {/* Background Subtle Gradient */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-red-50/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-slate-50 blur-3xl" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center mb-14">
          <SectionTitle
            center
            eyebrow="Leadership & Executive Board"
            title="Meet Our Founders & Executive Directors"
            description="Leading Redberry Agri Sciences Pvt Ltd since 2020 with agricultural expertise, ethical business values, and unwavering commitment to farmer prosperity."
          />
        </div>

        {/* 3 Owners Cards Grid */}
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {OWNERS.map((owner, idx) => (
            <motion.div
              key={owner.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col rounded-3xl border border-slate-200/90 bg-white p-5 shadow-soft transition-all duration-300 hover:border-brand-red/30 hover:shadow-card"
            >
              {/* Photo Frame */}
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-100 mb-5 shadow-sm">
                <Image
                  src={owner.image}
                  alt={owner.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />


              </div>

              {/* Owner Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 mb-1">
                    <CheckCircle2 size={12} /> Founder & Director
                  </div>
                  <h3 className="font-heading text-base font-bold text-brand-navy group-hover:text-brand-red transition-colors leading-tight">
                    {owner.name}
                  </h3>
                  <p className="mt-1.5 text-[11px] text-slate-600 leading-relaxed">
                    {owner.bio}
                  </p>
                </div>

                {/* Contact metadata */}
                <div className="mt-5 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-brand-red shrink-0" />
                    <a
                      href={owner.phoneHref}
                      className="font-mono font-medium text-slate-800 hover:text-brand-red transition-colors"
                    >
                      {owner.phone}
                    </a>
                  </div>
                  {owner.address && (
                    <div className="flex items-center gap-2">
                      <MapPin size={13} className="text-brand-red shrink-0" />
                      <span className="truncate">{owner.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
