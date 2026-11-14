"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeCinematic, easeCurtain } from "@/lib/motion";
import { useHydratedReducedMotion } from "@/lib/reduced-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 32 }: RevealProps) {
  const reduce = useHydratedReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-14%" }}
      transition={{ duration: 1.05, delay, ease: easeCinematic }}
    >
      {children}
    </motion.div>
  );
}

export function ImageReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useHydratedReducedMotion();

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial={reduce ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.6, ease: easeCinematic }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
      {reduce ? null : (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 z-[2] origin-top bg-ink"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.25, ease: easeCurtain }}
        />
      )}
    </div>
  );
}
