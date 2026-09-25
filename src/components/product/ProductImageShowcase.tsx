"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Sparkles, ZoomIn, Award, RotateCcw } from "lucide-react";

interface ProductImageShowcaseProps {
  image: string;
  name: string;
  technicalName?: string;
  packagingSizes?: string[];
}

export default function ProductImageShowcase({
  image,
  name,
  technicalName,
  packagingSizes = ["250 ml", "500 ml", "1 Litre"],
}: ProductImageShowcaseProps) {
  const [selectedPack, setSelectedPack] = useState(packagingSizes[0] || "");
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [zoomOpen, setZoomOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div className="w-full">
      {/* Main Interactive Stage with 3D Tilt & Lens Animation */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-square max-h-[500px] w-full rounded-3xl border-2 border-orange-200/80 bg-gradient-to-b from-white via-orange-50/20 to-orange-100/30 p-8 shadow-card overflow-hidden flex items-center justify-center cursor-crosshair group select-none"
      >
        {/* Decorative backdrop glow */}
        <div className="absolute inset-0 bg-radial from-orange-400/10 via-transparent to-transparent opacity-80 pointer-events-none" />

        {/* Floating Top Badges */}
        <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-700 backdrop-blur">
            <ShieldCheck size={14} className="text-emerald-600" /> 100% Guaranteed Purity
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-xs font-bold text-[#EA580C] backdrop-blur">
            <Award size={14} className="text-[#EA580C]" /> ISO 9001 Certified
          </span>
        </div>

        {/* Quick Zoom Button */}
        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md border border-slate-100 hover:bg-[#EA580C] hover:text-white transition-all duration-200"
          title="Click to Zoom Fullscreen"
        >
          <ZoomIn size={16} />
        </button>

        {/* Interactive 3D Animated Product Bottle */}
        <motion.div
          animate={{
            rotateY: mousePos.x * 14,
            rotateX: -mousePos.y * 14,
            scale: isHovered ? 1.08 : 1,
            y: isHovered ? -8 : [0, -6, 0],
          }}
          transition={{
            rotateY: { type: "spring", stiffness: 200, damping: 20 },
            rotateX: { type: "spring", stiffness: 200, damping: 20 },
            scale: { duration: 0.25 },
            y: isHovered
              ? { duration: 0.2 }
              : { repeat: Infinity, duration: 4, ease: "easeInOut" },
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-4/5 h-4/5 flex items-center justify-center"
        >
          <div className="relative w-full h-full max-h-[360px]">
            <Image
              src={image}
              alt={name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)]"
            />
          </div>
        </motion.div>

        {/* Simulated Bottle Shadow beneath bottle */}
        <motion.div
          animate={{
            scale: isHovered ? 1.15 : [0.95, 1.05, 0.95],
            opacity: isHovered ? 0.35 : 0.25,
          }}
          transition={{
            scale: isHovered ? { duration: 0.2 } : { repeat: Infinity, duration: 4, ease: "easeInOut" },
          }}
          className="absolute bottom-6 h-4 w-40 rounded-full bg-slate-800/40 blur-md pointer-events-none"
        />

        {/* Interactive hover hint */}
        <div className="absolute bottom-3 right-4 z-20 text-[11px] font-medium text-slate-500 bg-white/80 backdrop-blur px-2.5 py-1 rounded-full border border-slate-200/60 shadow-sm pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
          Move cursor to inspect 3D view
        </div>
      </div>

      {/* Available Pack Sizes Selector with Dynamic Micro-Animation */}
      {packagingSizes.length > 0 && (
        <div className="mt-5 rounded-2xl bg-white border border-slate-200/80 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Available Packaging Size:
            </span>
            <span className="text-xs font-semibold text-[#EA580C] bg-orange-50 px-2.5 py-0.5 rounded-full">
              In Stock
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {packagingSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedPack(size)}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 border ${
                  selectedPack === size
                    ? "bg-[#EA580C] text-white border-[#EA580C] shadow-md shadow-orange-500/20 scale-105"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-orange-50 hover:border-orange-300 hover:text-[#EA580C]"
                }`}
              >
                {size}
                {selectedPack === size && (
                  <motion.span
                    layoutId="packHighlight"
                    className="absolute inset-0 rounded-xl border-2 border-[#EA580C] pointer-events-none"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Zoom Modal */}
      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setZoomOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center"
            >
              <div className="w-full flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{name}</h4>
                  {technicalName && <p className="text-xs text-slate-500">{technicalName}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => setZoomOpen(false)}
                  className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="relative w-full h-[450px] my-6 flex items-center justify-center">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="text-center text-xs text-slate-500">
                Original Agrochemical Packing — Redberry Agri Sciences Pvt Ltd
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
