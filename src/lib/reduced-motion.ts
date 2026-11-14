"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Framer Motion reads the reduced-motion setting during the first client
 * render, while the server still sees "unknown". Branching on that value
 * changes styles and elements and breaks hydration. Keep the first render
 * identical, then follow the device setting.
 */
export function useHydratedReducedMotion() {
  const prefers = useReducedMotion();
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(Boolean(prefers));
  }, [prefers]);

  return reduce;
}
