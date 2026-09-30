"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { chapters } from "@/data/anugoonj";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { cn } from "@/lib/utils";
import { easeCinematic } from "@/lib/motion";

export function ChapterJourney() {
  const { t, loc } = useLanguage();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = chapters[active] ?? chapters[0];

  return (
    <section id="inside" className="scroll-mt-28 bg-ink-2 py-24 lg:py-32">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <p className="label-meta text-gilt">{t("insideTheBook")}</p>

        <div className="mt-12 hidden lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <ul>
              {chapters.map((chapter, index) => {
                const open = index === active;
                return (
                  <li key={chapter.number} className="border-b border-ivory/10">
                    <button
                      type="button"
                      data-cursor="read"
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      className="w-full py-5 text-left"
                    >
                      <span className="label-meta text-gilt">
                        {chapter.number === "अंतिम"
                          ? t("finalPart")
                          : `${t("part")} ${chapter.number}`}
                      </span>
                      <span
                        className={cn(
                          "mt-2 block font-serif leading-snug transition-all duration-500",
                          open ? "text-3xl text-ivory" : "text-xl text-ivory/45",
                        )}
                      >
                        {loc(chapter.title)}
                      </span>
                      <AnimatePresence>
                        {open ? (
                          <motion.span
                            initial={reduce ? false : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.45, ease: easeCinematic }}
                            className="mt-3 block overflow-hidden font-serif text-lg italic text-muted"
                          >
                            {loc(chapter.prompt)}
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="sticky top-28 h-[70vh] lg:col-span-6">
            <PlaceholderMedia
              src={current.image}
              alt=""
              fill
              sizes="46vw"
              kenBurns
              className="h-full w-full"
            />
          </div>
        </div>

        <ul className="mt-10 divide-y divide-ivory/10 border-y border-ivory/10 lg:hidden">
          {chapters.map((chapter, index) => {
            const open = index === active;
            return (
              <li key={chapter.number}>
                <button
                  type="button"
                  className="w-full py-5 text-left"
                  onClick={() => setActive(open ? -1 : index)}
                  aria-expanded={open}
                >
                  <span className="label-meta text-gilt">
                    {chapter.number === "अंतिम"
                      ? t("finalPart")
                      : `${t("part")} ${chapter.number}`}
                  </span>
                  <span className="mt-2 block font-serif text-2xl">
                    {loc(chapter.title)}
                  </span>
                </button>
                {open ? (
                  <div className="pb-8">
                    <PlaceholderMedia
                      src={chapter.image}
                      alt=""
                      width={1200}
                      height={800}
                      sizes="100vw"
                      className="aspect-[16/10]"
                    />
                    <p className="mt-5 font-serif text-lg italic text-muted">
                      {loc(chapter.prompt)}
                    </p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
