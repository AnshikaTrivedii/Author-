"use client";

import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { StatusBadge } from "@/components/platform/StatusBadge";
import { WorkModes } from "@/components/platform/WorkModes";
import { useLanguage } from "@/components/layout/LanguageProvider";
import type { Work } from "@/data/types";
import { accessLabel } from "@/lib/commerce";
import { moneyLabel } from "@/lib/utils";

export function WorksLibrary({ works }: { works: Work[] }) {
  const { t, loc, locale } = useLanguage();

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro
        eyebrow={t("read")}
        title={t("headingLibrary")}
        kicker={t("libraryKicker")}
      />
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <ul className="divide-y divide-ivory/10 border-y border-ivory/10">
          {works.map((work) => (
            <li key={work.id} className="grid gap-8 py-16 lg:grid-cols-12">
              <Link
                href={`/works/${work.slug}`}
                data-cursor="explore"
                className="lg:col-span-5"
              >
                <PlaceholderMedia
                  src={work.image}
                  alt={loc(work.imageAlt)}
                  width={1200}
                  height={800}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="aspect-[16/11]"
                />
              </Link>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="label-meta text-gilt">
                  {t("workLabel")} {work.number} · {work.id}
                </p>
                <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
                  <Link href={`/works/${work.slug}`}>{loc(work.title)}</Link>
                </h2>
                <p className="mt-4 max-w-md text-muted">{loc(work.description)}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <StatusBadge
                    label={
                      work.pricingModel === "paid" ? t("badgePaid") : t("badgeFree")
                    }
                    tone={work.pricingModel === "paid" ? "paid" : "free"}
                  />
                  {work.status === "forthcoming" ? (
                    <StatusBadge label={t("forthcoming")} tone="soon" />
                  ) : null}
                </div>
                <dl className="mt-8 grid grid-cols-2 gap-4 text-sm text-muted">
                  <div>
                    <dt className="label-meta">{t("languageMeta")}</dt>
                    <dd className="mt-1">Hindi · English</dd>
                  </div>
                  <div>
                    <dt className="label-meta">{t("type")}</dt>
                    <dd className="mt-1">{work.kind}</dd>
                  </div>
                  <div>
                    <dt className="label-meta">{t("status")}</dt>
                    <dd className="mt-1">{work.status}</dd>
                  </div>
                  <div>
                    <dt className="label-meta">{t("price")}</dt>
                    <dd className="mt-1">{moneyLabel(work.offers[0].price, locale)}</dd>
                  </div>
                  <div>
                    <dt className="label-meta">{t("listen")}</dt>
                    <dd className="mt-1">{loc(accessLabel(work.audio.accessType))}</dd>
                  </div>
                  <div>
                    <dt className="label-meta">{t("watch")}</dt>
                    <dd className="mt-1">{loc(accessLabel(work.film.accessType))}</dd>
                  </div>
                  <div>
                    <dt className="label-meta">{t("published")}</dt>
                    <dd className="mt-1">{loc(work.publishedAt)}</dd>
                  </div>
                  <div>
                    <dt className="label-meta">{t("version")}</dt>
                    <dd className="mt-1">{work.version}</dd>
                  </div>
                </dl>
                <WorkModes work={work} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
