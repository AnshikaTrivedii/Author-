"use client";

import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { bookOne } from "@/data/anugoonj";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function AboutTheBook() {
  const { t, loc } = useLanguage();

  return (
    <section id="about" className="scroll-mt-28 bg-ink py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1680px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <PlaceholderMedia
            src={bookOne.cover}
            alt={loc(bookOne.title)}
            width={900}
            height={1200}
            sizes="(min-width: 1024px) 36vw, 70vw"
            className="mx-auto aspect-[3/4] max-w-sm border border-ivory/10 bg-ivory"
            imageClassName="object-contain object-center p-6"
          />
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7">
          <p className="label-meta text-gilt">{t("aboutThisBook")}</p>
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl">
            {loc(bookOne.title)}
          </h2>
          <p className="mt-8 font-serif text-xl italic text-muted">
            {loc(bookOne.proposition)}
          </p>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/85">
            {loc(bookOne.about)}
          </p>
          <p className="mt-8 max-w-xl text-muted">{loc(bookOne.notAdvice)}</p>
          <div className="mt-14 border-t border-ivory/10 pt-8">
            <p className="label-meta text-gilt">{loc(bookOne.dedicationTitle)}</p>
            <p className="mt-4 font-serif text-2xl italic">
              {loc(bookOne.dedication)}
            </p>
          </div>
          <div className="mt-10 border-t border-ivory/10 pt-8">
            <p className="label-meta text-gilt">
              {loc(bookOne.acknowledgementsTitle)}
            </p>
            <p className="mt-4 text-muted">{loc(bookOne.acknowledgements)}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
