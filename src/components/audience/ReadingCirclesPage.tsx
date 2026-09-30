"use client";

import { PageIntro } from "@/components/ui/PageIntro";
import { chapters } from "@/data/anugoonj";
import { readingCircleGuides } from "@/data/audience";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function ReadingCirclesPage() {
  const { t, loc } = useLanguage();
  const sample = chapters.slice(0, 6);

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro
        eyebrow={t("circlesEyebrow")}
        title={t("circlesHeading")}
        kicker={t("circlesKicker")}
      />
      <div className="mx-auto max-w-[1680px] space-y-20 px-5 sm:px-8 lg:px-12">
        <section className="grid gap-10 lg:grid-cols-3">
          {readingCircleGuides.map((guide) => (
            <article key={guide.title.en}>
              <h2 className="font-serif text-3xl">{loc(guide.title)}</h2>
              <p className="mt-5 text-muted">{loc(guide.body)}</p>
            </article>
          ))}
        </section>
        <section>
          <h2 className="font-serif text-4xl">{t("circlesQuestions")}</h2>
          <ul className="mt-10 divide-y divide-ivory/10 border-y border-ivory/10">
            {sample.map((chapter) => (
              <li key={chapter.number} className="grid gap-3 py-8 lg:grid-cols-12">
                <p className="label-meta text-gilt lg:col-span-2">
                  {t("part")} {chapter.number}
                </p>
                <div className="lg:col-span-10">
                  <p className="font-serif text-2xl">{loc(chapter.title)}</p>
                  <p className="mt-3 font-serif text-xl italic text-muted">
                    {loc(chapter.prompt)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
