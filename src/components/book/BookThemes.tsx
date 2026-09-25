"use client";

import { Reveal } from "@/components/ui/Reveal";
import { themes } from "@/data/anugoonj";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function BookThemes() {
  const { t, loc } = useLanguage();

  return (
    <section id="themes" className="scroll-mt-24 bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="label-meta text-gilt">{t("themesHeading")}</p>
        </Reveal>
        <ul className="mt-12 divide-y divide-ivory/10 border-y border-ivory/10">
          {themes.map((theme) => (
            <li
              key={theme.key}
              className="grid gap-2 py-6 sm:grid-cols-12 sm:items-baseline"
            >
              <span className="label-meta text-gilt sm:col-span-3">
                {theme.key}
              </span>
              <span className="font-serif text-2xl sm:col-span-9 sm:text-3xl">
                {loc(theme.line)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
