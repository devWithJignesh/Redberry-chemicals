"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";

const GRADIENTS = [
  "from-slate-100 to-slate-200",
  "from-rose-50 to-slate-100",
  "from-slate-50 to-slate-200",
  "from-slate-100 to-rose-50",
];

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative w-full rounded-[2.2rem] bg-[#F8F9FA] p-3 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-brand-navy/10 z-10 hover:z-20 border border-slate-100"
    >
      <Link href={`/products/${product.slug}`} className="block h-full w-full">
        <div 
          className="w-full flex flex-col"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Top Image Area */}
          <div
            className={`relative h-60 w-full shrink-0 overflow-hidden rounded-t-[1.5rem] rounded-b-xl bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]}`}
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 h-full w-full object-contain scale-[1.15] mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.25]"
                loading="lazy"
              />
            )}
            
            {/* Top Right Floating Badge */}
            <span 
              className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-extrabold text-slate-800 shadow-sm transition-transform duration-500 group-hover:-translate-y-1"
            >
              {product.formulation || "Pure"}
            </span>
          </div>

          {/* Attached Banner Area */}
          <div className="w-full bg-brand-navy rounded-t-sm rounded-b-[1.5rem] py-2.5 px-4 text-center mt-1 shadow-sm transition-colors duration-300 group-hover:bg-brand-red">
            <span className="text-white text-[13px] font-semibold tracking-wide">
              {product.category}
            </span>
          </div>
          
          {/* Bottom Info Section */}
          <div className="flex items-center px-3 pt-5 pb-3 bg-transparent">
            
            {/* Left Side: Title & Tags */}
            <div className="flex-1 pr-3 overflow-hidden">
              <h3 className="font-heading text-[17px] font-bold text-slate-900 truncate group-hover:text-brand-red transition-colors">
                {product.name}
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-2 overflow-hidden h-6">
                <span className="bg-[#E9ECEF] text-slate-700 text-[10px] px-2.5 py-1 rounded-md font-bold whitespace-nowrap">
                  Agrochemical
                </span>
                {product.packagingSizes?.[0] && (
                  <span className="bg-[#E9ECEF] text-slate-700 text-[10px] px-2.5 py-1 rounded-md font-bold whitespace-nowrap">
                    {product.packagingSizes[0]}
                  </span>
                )}
                <span className="bg-[#E9ECEF] text-slate-700 text-[10px] px-2.5 py-1 rounded-md font-bold whitespace-nowrap hidden sm:inline-block">
                  Premium
                </span>
              </div>
            </div>
            
            {/* Vertical Divider */}
            <div className="w-[1px] h-10 bg-slate-200 mx-2 shrink-0" />

            {/* Right Side: Action Area */}
            <div className="flex flex-col items-center justify-center pl-2 shrink-0">
              <span className="text-lg font-extrabold text-brand-navy font-heading group-hover:text-brand-red transition-colors">
                Details
              </span>
              <span className="text-[9px] text-slate-600 font-bold mt-0.5 flex items-center gap-1 group-hover:text-brand-red transition-colors">
                Order now <ArrowRight size={10} />
              </span>
            </div>
            
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
