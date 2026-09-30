"use client";

import { Reveal } from "@/components/ui/Reveal";
import { tonightPauseFor } from "@/data/audience";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function TonightPause() {
  const { t, loc } = useLanguage();
  const pause = tonightPauseFor();

  return (
    <section id="tonight" className="scroll-mt-28 bg-ink py-24 lg:py-32">
      <Reveal className="mx-auto max-w-[900px] px-5 text-center sm:px-8">
        <p className="label-meta tracking-[0.35em] text-gilt">{t("tonightEyebrow")}</p>
        <h2 className="mt-8 font-serif text-4xl leading-snug sm:text-6xl">
          {loc(pause)}
        </h2>
        <p className="mt-10 font-serif text-xl italic text-muted">{t("tonightKicker")}</p>
      </Reveal>
    </section>
  );
}
