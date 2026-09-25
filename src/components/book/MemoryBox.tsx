"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { memoryObjects } from "@/data/anugoonj";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { cn } from "@/lib/utils";
import { easeCinematic } from "@/lib/motion";

export function MemoryBox() {
  const { t, loc } = useLanguage();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = memoryObjects[active] ?? memoryObjects[0];

  return (
    <section className="bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <p className="label-meta text-gilt">{t("chooseAMemory")}</p>
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
          {memoryObjects.map((item, index) => {
            const open = index === active;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  data-cursor="explore"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-pressed={open}
                  className={cn(
                    "group relative block w-full overflow-hidden border text-left transition-[border-color,opacity] duration-500",
                    open ? "border-gilt" : "border-ivory/10 opacity-70 hover:opacity-100",
                  )}
                >
                  <PlaceholderMedia
                    src={item.image}
                    alt=""
                    width={800}
                    height={1000}
                    sizes="(min-width: 1024px) 11vw, 45vw"
                    className="aspect-[4/5]"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/50 to-transparent px-3 py-4">
                    <span
                      className={cn(
                        "label-meta block text-ivory transition-colors",
                        open ? "text-gilt" : "text-ivory/80",
                      )}
                    >
                      {loc(item.label)}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <AnimatePresence mode="wait">
          <motion.p
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.55, ease: easeCinematic }}
            className="mt-12 max-w-3xl font-serif text-2xl leading-snug italic sm:text-4xl"
          >
            {loc(current.prompt)}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}
