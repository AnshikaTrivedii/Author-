"use client";

import { Reveal } from "@/components/ui/Reveal";
import { bilingualLines } from "@/data/audience";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function BilingualLines() {
  const { t } = useLanguage();

  return (
    <section className="bg-ink-2 py-24 lg:py-32">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <Reveal>
          <p className="label-meta text-gilt">{t("bilingualEyebrow")}</p>
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl">{t("bilingualHeading")}</h2>
        </Reveal>
        <ul className="mt-14 space-y-12">
          {bilingualLines.map((line) => (
            <li key={line.en} className="grid gap-4 border-t border-ivory/10 pt-8 lg:grid-cols-2">
              <p className="font-serif text-2xl leading-snug italic text-ivory/90 sm:text-3xl">
                {line.en}
              </p>
              <p className="font-serif text-2xl leading-snug text-muted sm:text-3xl">
                {line.hi}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-12 max-w-2xl text-sm text-muted">{t("languageCraftNote")}</p>
      </div>
    </section>
  );
}
