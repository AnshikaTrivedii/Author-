"use client";

import { motion } from "framer-motion";
import { useHydratedReducedMotion } from "@/lib/reduced-motion";
import { easeCinematic, easeCurtain } from "@/lib/motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const reduce = useHydratedReducedMotion();

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] origin-top bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.95, ease: easeCurtain }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 right-0 left-0 z-[71] h-px origin-left bg-gilt"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1, opacity: [1, 1, 0] }}
        transition={{ duration: 0.9, ease: easeCinematic, delay: 0.08 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.28, ease: easeCinematic }}
      >
        {children}
      </motion.div>
    </div>
  );
}
