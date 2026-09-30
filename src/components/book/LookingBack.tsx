"use client";

import { Reveal, ImageReveal } from "@/components/ui/Reveal";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { bookOne } from "@/data/anugoonj";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function LookingBack() {
  const { t, loc } = useLanguage();

  return (
    <section id="story" className="scroll-mt-28 bg-ink py-24 lg:py-36">
      <div className="mx-auto grid max-w-[1680px] items-end gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <Reveal className="lg:col-span-6">
          <p className="label-meta text-gilt">{t("preface")}</p>
          <h2 className="mt-6 font-serif text-4xl leading-[1.1] sm:text-6xl lg:text-7xl">
            {loc(bookOne.lookingBackTitle)}
          </h2>
          <p className="mt-8 max-w-xl font-serif text-2xl italic text-ivory/85">
            {loc(bookOne.lookingBackLead)}
          </p>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            {loc(bookOne.lookingBackBody)}
          </p>
        </Reveal>
        <div className="lg:col-span-5 lg:col-start-8">
          <ImageReveal>
            <PlaceholderMedia
              src="/images/stills/family-photo.jpg"
              alt=""
              width={1200}
              height={1500}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5]"
            />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
