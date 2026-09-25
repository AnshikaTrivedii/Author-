"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { reflectionQuestions } from "@/data/anugoonj";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { easeCinematic } from "@/lib/motion";

export function ReflectQuestions() {
  const { t, loc } = useLanguage();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const question = reflectionQuestions[index] ?? reflectionQuestions[0];

  return (
    <section className="bg-ink-2 py-28 lg:py-36">
      <div className="mx-auto max-w-[900px] px-5 sm:px-8">
        <p className="label-meta text-gilt">{t("questionFromSelf")}</p>
        <p className="label-meta mt-8 text-muted">
          QUESTION {question.number}
        </p>
        <AnimatePresence mode="wait">
          <motion.h2
            key={question.number}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: easeCinematic }}
            className="mt-8 font-serif text-3xl leading-snug sm:text-5xl"
          >
            {loc(question.text)}
          </motion.h2>
        </AnimatePresence>
        <p className="label-meta mt-12 tracking-[0.32em] text-gilt">
          {t("think")}
        </p>
        <div className="mt-12 flex flex-wrap gap-6">
          <button
            type="button"
            className="label-meta min-h-12 text-muted disabled:opacity-30"
            disabled={index === 0}
            onClick={() => setIndex((value) => Math.max(0, value - 1))}
          >
            {t("prevQuestion")}
          </button>
          <button
            type="button"
            className="label-meta min-h-12 text-ivory"
            onClick={() =>
              setIndex((value) => (value + 1) % reflectionQuestions.length)
            }
          >
            {t("nextQuestion")}
          </button>
        </div>
      </div>
    </section>
  );
}
