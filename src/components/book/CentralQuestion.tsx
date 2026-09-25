"use client";

import { Reveal } from "@/components/ui/Reveal";
import { bookOne } from "@/data/anugoonj";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function CentralQuestion() {
  const { loc } = useLanguage();

  return (
    <section id="question" className="relative overflow-hidden bg-ink-2 py-28 lg:py-40">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <h2 className="max-w-5xl font-serif text-4xl leading-[1.12] sm:text-6xl lg:text-7xl">
            {loc(bookOne.centralQuestion)}
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-12 border-t border-ivory/10 pt-12 lg:grid-cols-2">
          <ul className="space-y-4 font-serif text-3xl text-ivory/35">
            {bookOne.centralLeft.map((item) => (
              <li key={item.hi}>{loc(item)}</li>
            ))}
          </ul>
          <ul className="space-y-4 font-serif text-3xl text-ivory">
            {bookOne.centralRight.map((item) => (
              <li key={item.hi}>{loc(item)}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
