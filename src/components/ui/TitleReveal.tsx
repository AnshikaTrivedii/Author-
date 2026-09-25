"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeCinematic } from "@/lib/motion";

export function TitleReveal({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const letters = Array.from(text);

  return (
    <span className={cn("block overflow-hidden", className)} aria-label={text}>
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          aria-hidden="true"
          className="inline-block will-change-transform"
          initial={reduce ? false : { y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: delay + index * 0.045,
            ease: easeCinematic,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}
