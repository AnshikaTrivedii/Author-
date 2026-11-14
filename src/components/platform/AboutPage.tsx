"use client";

import { PageIntro } from "@/components/ui/PageIntro";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { platform } from "@/data/site";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function AboutPage() {
  const { t, locale } = useLanguage();

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro
        eyebrow={t("headingCreator")}
        title={locale === "hi" ? platform.creatorNameHi : platform.creatorName}
      />
      <div className="mx-auto grid max-w-[1680px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <ImageReveal className="lg:col-span-5">
          <PlaceholderMedia
            src="/images/author/portrait.png"
            alt={locale === "hi" ? platform.creatorNameHi : platform.creatorName}
            width={1100}
            height={1400}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/5]"
          />
        </ImageReveal>
        <div className="max-w-xl lg:col-span-6 lg:col-start-7 lg:pt-6">
          <Reveal>
            <p className="text-lg leading-relaxed text-ivory/85">{t("shortBio")}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-8 text-lg leading-relaxed text-ivory/85">{t("creativeJourney")}</p>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
