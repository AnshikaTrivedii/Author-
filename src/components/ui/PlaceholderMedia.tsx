"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeCinematic } from "@/lib/motion";
import { useHydratedReducedMotion } from "@/lib/reduced-motion";

type PlaceholderMediaProps = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  imageClassName?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  kenBurns?: boolean;
};

export function PlaceholderMedia({
  src,
  alt,
  label,
  className,
  imageClassName,
  fill,
  width,
  height,
  sizes,
  priority,
  kenBurns = false,
}: PlaceholderMediaProps) {
  const reduce = useHydratedReducedMotion();
  const zoom = kenBurns && !reduce;

  const image = fill ? (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", imageClassName)}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1600}
      height={height ?? 1000}
      priority={priority}
      sizes={sizes}
      className={cn("h-full w-full object-cover", imageClassName)}
    />
  );

  return (
    <div className={cn("relative overflow-hidden bg-ink-2", className)}>
      {zoom ? (
        <motion.div
          className={fill ? "absolute inset-0" : "h-full w-full"}
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 16, ease: easeCinematic }}
        >
          {image}
        </motion.div>
      ) : (
        image
      )}
      <div className="image-grain" />
      {label ? <span className="placeholder-chip">{label}</span> : null}
    </div>
  );
}
