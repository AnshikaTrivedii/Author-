"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { easeCinematic } from "@/lib/motion";
import { useHydratedReducedMotion } from "@/lib/reduced-motion";
import { cn } from "@/lib/utils";
import { defaultTheme, isTheme, themeStorageKey, themes, type ThemeId } from "@/lib/theme";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("loi-theme", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("loi-theme", onStoreChange);
  };
}

function getTheme(): ThemeId {
  const stored = window.localStorage.getItem(themeStorageKey);
  return isTheme(stored) ? stored : defaultTheme;
}

function Swatch({ ink, gilt }: { ink: string; gilt: string }) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block size-4 shrink-0 overflow-hidden rounded-full border border-ivory/40"
      style={{ background: ink }}
    >
      <span className="absolute inset-y-0 right-0 w-1/2" style={{ background: gilt }} />
    </span>
  );
}

export function ThemeSwitch({ className }: { className?: string }) {
  const { loc, t } = useLanguage();
  const reduce = useHydratedReducedMotion();
  const theme = useSyncExternalStore<ThemeId>(subscribe, getTheme, () => defaultTheme);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = themes.find((option) => option.id === theme) ?? themes[0];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(next: ThemeId) {
    window.localStorage.setItem(themeStorageKey, next);
    window.dispatchEvent(new Event("loi-theme"));
    setOpen(false);
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${t("themeLabel")}: ${loc(current.label)}`}
        onClick={() => setOpen((value) => !value)}
        className="label-meta inline-flex items-center gap-2 py-2 !text-ivory/85 transition-colors hover:!text-ivory"
      >
        <Swatch ink={current.ink} gilt={current.gilt} />
        <span className="hidden xl:inline">{t("themeLabel")}</span>
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: easeCinematic }}
            className="absolute top-full right-0 z-[60] mt-2 min-w-[13rem] border border-ivory/10 bg-ink/95 py-3 backdrop-blur-md"
          >
            <p className="label-meta px-5 pb-2 text-muted">{t("themeLabel")}</p>
            <ul role="group" aria-label={t("themeLabel")}>
              {themes.map((option) => {
                const active = theme === option.id;
                return (
                  <li key={option.id}>
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => choose(option.id)}
                      className={cn(
                        "label-meta flex w-full items-center gap-3 px-5 py-2 text-left transition-colors hover:bg-ivory/5",
                        active ? "!text-gilt" : "!text-ivory/80 hover:!text-ivory",
                      )}
                    >
                      <Swatch ink={option.ink} gilt={option.gilt} />
                      {loc(option.label)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
