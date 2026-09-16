"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";

const GRADIENTS = [
  "from-brand-navy via-brand-navy-light to-brand-red-dark",
  "from-brand-red-dark via-brand-red to-brand-navy",
  "from-brand-teal via-brand-navy to-brand-navy-light",
  "from-brand-navy-light via-brand-teal to-brand-navy",
];

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08 }}
      className="group overflow-hidden rounded-2xl bg-white shadow-soft transition-shadow duration-300 hover:shadow-card"
    >
      <div
        className={`relative h-52 overflow-hidden bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]}`}
      >
        <div className="absolute inset-0 flex items-center justify-center text-xs text-white/50 transition-transform duration-500 group-hover:scale-110">
          Photo: {product.name}
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
          {product.category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="mb-2 font-heading text-lg font-semibold text-brand-navy">
          {product.name}
        </h3>
        <p className="mb-5 text-sm leading-relaxed text-brand-muted">
          {product.shortDescription}
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red transition-all group-hover:gap-2.5"
        >
          View Details <ArrowRight size={15} />
        </Link>
      </div>
    </motion.div>
  );
}
