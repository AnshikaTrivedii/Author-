"use client";

import { CtaLink } from "@/components/ui/CtaLink";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { Reveal } from "@/components/ui/Reveal";
import { platform } from "@/data/site";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function FinalInvitation() {
  const { t, lines } = useLanguage();
  const tagline = lines(platform.tagline);

  return (
    <section className="relative min-h-[80svh] overflow-hidden bg-ink">
      <PlaceholderMedia
        src="/images/stills/cinematic-01.jpg"
        alt=""
        fill
        sizes="100vw"
        kenBurns
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
      <div className="relative z-10 mx-auto flex min-h-[80svh] max-w-[1680px] items-end px-5 py-24 sm:px-8 lg:px-12">
        <Reveal>
          <p className="font-serif text-5xl leading-[0.9] sm:text-7xl lg:text-8xl">
            {tagline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
            <CtaLink href="/free-works" cursor="read" variant="solid">
              {t("startFree")}
            </CtaLink>
            <CtaLink href="/works" cursor="explore">
              {t("exploreWorks")}
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
