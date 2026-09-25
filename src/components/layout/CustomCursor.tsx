"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { useLanguage } from "@/components/layout/LanguageProvider";

type CursorMode = "default" | "view" | "explore" | "read" | "listen" | "watch";

function subscribePointer(onStoreChange: () => void) {
  const media = window.matchMedia("(pointer: fine) and (hover: hover)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getPointerSnapshot() {
  return window.matchMedia("(pointer: fine) and (hover: hover)").matches;
}

export function CustomCursor() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const canHover = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    () => false,
  );
  const enabled = Boolean(canHover && !reduce);
  const [mode, setMode] = useState<CursorMode>("default");
  const [hidden, setHidden] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const [renderPos, setRenderPos] = useState({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: PointerEvent) => {
      pos.current = { x: event.clientX, y: event.clientY };
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [data-cursor='hidden']")) {
        setHidden(true);
        setMode("default");
        return;
      }
      setHidden(false);
      const typed = target?.closest("[data-cursor]") as HTMLElement | null;
      const value = typed?.dataset.cursor as CursorMode | undefined;
      if (
        value === "read" ||
        value === "listen" ||
        value === "watch" ||
        value === "explore" ||
        value === "view"
      ) {
        setMode(value);
      } else if (target?.closest("a, button")) {
        setMode("view");
      } else {
        setMode("default");
      }
    };

    const tick = () => {
      setRenderPos((current) => ({
        x: current.x + (pos.current.x - current.x) * 0.28,
        y: current.y + (pos.current.y - current.y) * 0.28,
      }));
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  const expanded = mode !== "default";
  const label =
    mode === "read"
      ? t("cursorRead")
      : mode === "listen"
        ? t("cursorListen")
        : mode === "watch"
          ? t("cursorWatch")
          : mode === "explore"
            ? t("cursorExplore")
            : mode === "view"
              ? t("cursorView")
              : "";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] mix-blend-difference"
      style={{
        x: renderPos.x,
        y: renderPos.y,
        opacity: hidden ? 0 : 1,
      }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full border border-ivory/80"
        animate={{
          width: expanded ? 88 : 10,
          height: expanded ? 88 : 10,
          x: expanded ? -44 : -5,
          y: expanded ? -44 : -5,
          backgroundColor: expanded
            ? "rgba(241,232,216,0.08)"
            : "rgba(241,232,216,0.92)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      >
        <motion.span
          className="label-meta px-2 text-center text-[9px] leading-tight text-ivory"
          animate={{ opacity: expanded ? 1 : 0 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
