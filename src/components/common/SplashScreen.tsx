"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { COMPANY } from "@/constants";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const dismiss = useCallback(() => {
    setIsVisible(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);

    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    // Smooth deterministic progress counter
    const startTime = Date.now();
    const duration = 2000; // 2 seconds total

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(dismiss, 250);
      }
    }, 30);

    // Hard fallback safety timer
    const safetyTimer = setTimeout(dismiss, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [dismiss]);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(10px)",
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#0A0F1D] text-white select-none"
        >
          {/* Ambient Background Glows */}
          <div className="pointer-events-none absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-brand-red/25 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-[#E11D48]/20 blur-[120px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,30,58,0.18)_0%,rgba(10,15,29,0.95)_70%)]" />

          {/* Precision Dot Matrix Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1.5px)`,
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-xs w-full">
            {/* Animated Logo Container */}
            <div className="relative flex items-center justify-center">
              {/* Outer Pulsing Glow */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0.3 }}
                animate={{
                  scale: [0.95, 1.3, 0.95],
                  opacity: [0.3, 0.75, 0.3],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute h-40 w-40 rounded-full bg-brand-red/35 blur-2xl"
              />

              {/* Outer Dual Rotating Rings */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute h-36 w-36 rounded-full border-2 border-dashed border-red-500/40"
              />
              <motion.div
                initial={{ rotate: 360 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute h-44 w-44 rounded-full border border-red-400/20"
              />

              {/* Logo Card with White Backdrop to make Redberry Logo stand out */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center rounded-3xl bg-white p-5 shadow-[0_0_55px_rgba(225,29,72,0.5)] border-2 border-red-100/90"
              >
                <Image
                  src={COMPANY.logoEmblem}
                  alt={COMPANY.name}
                  width={110}
                  height={110}
                  priority
                  className="h-20 w-auto object-contain drop-shadow-sm"
                />

                {/* Sparkling Sparkle Effect */}
                <motion.div
                  animate={{
                    y: [-4, -16, -4],
                    opacity: [0, 1, 0],
                    scale: [0.6, 1.2, 0.6],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute -top-2 -right-2 text-amber-400 drop-shadow"
                >
                  <Sparkles className="h-5 w-5 fill-amber-300" />
                </motion.div>
              </motion.div>
            </div>

            {/* Minimalist Progress Bar Loader (Zero Text) */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mt-8 w-44 max-w-full"
            >
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/90 p-0.5 border border-slate-700/50 shadow-inner">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#C41E3A] via-red-500 to-amber-400 shadow-[0_0_12px_rgba(239,68,68,0.9)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
