"use client";

import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { StatusBadge } from "@/components/platform/StatusBadge";
import { useLanguage } from "@/components/layout/LanguageProvider";
import type { Work } from "@/data/types";
import { moneyLabel } from "@/lib/utils";

export function FilmsIndex({ works }: { works: Work[] }) {
  const { t, loc, locale } = useLanguage();

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro eyebrow={t("watch")} title={t("headingFilms")} />
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <ul className="grid gap-16 lg:grid-cols-2">
          {works.map((work) => (
            <li key={work.id}>
              <Link href={`/films/${work.slug}`} data-cursor="watch" className="group block">
                <PlaceholderMedia
                  src={work.film.poster ?? work.image}
                  alt={loc(work.imageAlt)}
                  width={1400}
                  height={800}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="aspect-[16/10] transition-transform duration-700 group-hover:scale-[1.01]"
                />
                <p className="label-meta mt-6 text-gilt">
                  {t("workLabel")} {work.number} · {loc(work.film.duration)}
                </p>
                <h2 className="mt-3 font-serif text-4xl">{loc(work.film.title)}</h2>
                <div className="mt-4">
                  <StatusBadge
                    label={moneyLabel(work.film.price, locale)}
                    tone={work.pricingModel === "paid" ? "paid" : "free"}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
