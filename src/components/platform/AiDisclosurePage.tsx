"use client";

import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { worksWithFilm } from "@/data/works";

export function AiDisclosurePage() {
  const { t, loc } = useLanguage();

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro eyebrow={t("watch")} title={t("headingAi")} kicker={t("aiIntro")} />
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <ul className="divide-y divide-ivory/10 border-y border-ivory/10">
          {worksWithFilm()
            .filter((work) => work.film.aiAssisted)
            .map((work) => (
              <li key={work.id} className="grid gap-6 py-12 lg:grid-cols-12">
                <p className="label-meta text-gilt lg:col-span-3">
                  {t("workLabel")} {work.number}
                </p>
                <div className="lg:col-span-8">
                  <h2 className="font-serif text-3xl">
                    <Link href={`/films/${work.slug}`}>{loc(work.film.title)}</Link>
                  </h2>
                  <p className="label-meta mt-6 text-ivory">{t("aiYes")}</p>
                  <p className="mt-4 text-muted">
                    {t("aiTools")}: {loc(work.film.aiTools)}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
