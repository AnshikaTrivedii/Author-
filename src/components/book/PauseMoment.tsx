"use client";

import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/components/layout/LanguageProvider";
import type { Copy } from "@/lib/locale";

export function PauseMoment({
  text,
  href = "#themes",
}: {
  text: Copy;
  href?: string;
}) {
  const { t, loc } = useLanguage();

  return (
    <section className="bg-ink py-28">
      <Reveal className="mx-auto max-w-[720px] px-5 text-center sm:px-8">
        <p className="label-meta tracking-[0.4em] text-gilt">{t("pauseLabel")}</p>
        <p className="mt-10 font-serif text-3xl leading-snug italic text-ivory/90 sm:text-4xl">
          {loc(text)}
        </p>
        <CtaLink href={href} className="mt-12 justify-center">
          {t("continue")}
        </CtaLink>
      </Reveal>
    </section>
  );
}
