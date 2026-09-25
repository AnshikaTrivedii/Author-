"use client";

import { PageIntro } from "@/components/ui/PageIntro";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { platform } from "@/data/site";
import { bookOne } from "@/data/anugoonj";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function AboutPage() {
  const { t, loc, locale } = useLanguage();

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro eyebrow={t("headingCreator")} title={t("headingAbout")} />
      <div className="mx-auto grid max-w-[1680px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <PlaceholderMedia
            src="/images/author/portrait.jpg"
            alt=""
            width={1100}
            height={1400}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/5]"
          />
        </div>
        <div className="max-w-xl lg:col-span-6 lg:col-start-7">
          <p className="label-meta text-gilt">{t("headingCreator")}</p>
          <h2 className="mt-4 font-serif text-4xl">
            {locale === "hi" ? platform.creatorNameHi : platform.creatorName}
          </h2>
          <p className="label-meta mt-3 text-muted">B.E. Civil, MBA, PGCBM, LLB</p>
          <p className="mt-8 font-serif text-2xl italic text-muted">
            {loc(bookOne.proposition)}
          </p>
          <p className="mt-8 font-serif text-xl">{loc(bookOne.title)}</p>
          <p className="mt-10 text-lg text-muted">{t("shortBio")}</p>
          <p className="mt-8 text-lg text-muted">{t("creativeJourney")}</p>
          <section className="mt-12 border-t border-ivory/10 pt-8">
            <h3 className="label-meta text-gilt">{t("headingPhilosophy")}</h3>
            <p className="mt-4 text-lg text-muted">{t("projectPhilosophy")}</p>
            <p className="mt-8 font-serif text-2xl">{t("modesIntro")}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
