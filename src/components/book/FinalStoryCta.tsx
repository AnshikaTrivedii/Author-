"use client";

import { CtaLink } from "@/components/ui/CtaLink";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { bookOne } from "@/data/anugoonj";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function FinalStoryCta() {
  const { t, loc } = useLanguage();

  return (
    <section className="relative min-h-[90svh] overflow-hidden bg-ink">
      <PlaceholderMedia
        src="/images/stills/cinematic-01.jpg"
        alt=""
        fill
        sizes="100vw"
        kenBurns
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
      <div className="relative z-10 mx-auto flex min-h-[90svh] max-w-[1680px] flex-col justify-end px-5 py-24 sm:px-8 lg:px-12">
        <h2 className="max-w-4xl font-serif text-4xl leading-[1.1] sm:text-6xl lg:text-7xl">
          {bookOne.finalQuestion.lines.map((line) => (
            <span key={line.hi} className="block">
              {loc(line)}
            </span>
          ))}
        </h2>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
          <CtaLink
            href={`/works/${bookOne.slug}/read/hi`}
            cursor="read"
            variant="solid"
          >
            {t("readTheStory")}
          </CtaLink>
          <CtaLink href="#listen" cursor="listen">
            {t("listen")}
          </CtaLink>
          <CtaLink href="#watch" cursor="watch">
            {t("watch")}
          </CtaLink>
          <CtaLink href="/free-works">{t("startFree")}</CtaLink>
        </div>
      </div>
    </section>
  );
}
