"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types";

interface InsecticideGridProps {
  products: Product[];
}

export default function InsecticideGrid({ products }: InsecticideGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 pb-8">
      {products.map((product, idx) => (
        <motion.div
          key={product.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
          className="relative"
        >
          <Link
            href={`/products/${product.slug}`}
            className="group block relative w-full h-[320px] rounded-2xl border-2 border-[#EA580C] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-[#F97316] cursor-pointer"
          >
            {/* Subtle corner badge for quick category */}
            <div className="absolute top-3 right-3 text-[10px] font-bold text-orange-600/70 uppercase tracking-widest px-2 py-0.5 rounded-full bg-orange-50 group-hover:bg-orange-100 transition-colors">
              Purity 100%
            </div>

            {/* Centered Product Bottle with Interactive Hover Animation */}
            <div className="w-full h-full flex items-center justify-center p-2 relative overflow-hidden">
              <div className="relative w-full h-full max-h-[220px] transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-2">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain drop-shadow-md transition-all duration-300 group-hover:drop-shadow-xl"
                  priority={idx < 4}
                />
              </div>
            </div>

            {/* Overlapping Bottom Pill Name Badge (Exact matching screenshot UI) */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[85%] max-w-[200px] rounded-xl bg-white px-4 py-2.5 shadow-md border border-slate-100/90 text-center transition-all duration-300 group-hover:shadow-lg group-hover:border-orange-200 group-hover:scale-[1.02]">
              <span className="font-heading text-sm md:text-base font-extrabold uppercase tracking-wider text-[#1E293B] transition-colors duration-200 group-hover:text-[#EA580C]">
                {product.name}
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
