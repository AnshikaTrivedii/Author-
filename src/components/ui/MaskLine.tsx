"use client";

import { motion } from "framer-motion";
import { useHydratedReducedMotion } from "@/lib/reduced-motion";
import { cn } from "@/lib/utils";
import { easeCinematic } from "@/lib/motion";

export function MaskLine({
  children,
  className,
  delay = 0,
  play = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  play?: boolean;
}) {
  const reduce = useHydratedReducedMotion();

  return (
    <span className={cn("block overflow-hidden", className)}>
      <motion.span
        className="block"
        initial={reduce ? false : { y: "108%" }}
        animate={reduce || play ? { y: "0%" } : { y: "108%" }}
        transition={{ duration: 1.15, delay, ease: easeCinematic }}
      >
        {children}
      </motion.span>
    </span>
  );
}
