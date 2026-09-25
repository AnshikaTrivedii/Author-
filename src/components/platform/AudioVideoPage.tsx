"use client";

import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { MediaPlayer } from "@/components/platform/MediaPlayer";
import { StatusBadge } from "@/components/platform/StatusBadge";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { worksWithAudio, worksWithFilm } from "@/data/works";
import { moneyLabel } from "@/lib/utils";

export function AudioVideoPage() {
  const { t, loc, locale } = useLanguage();

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro
        eyebrow={t("listen")}
        title={t("headingAudio")}
        kicker={t("audioKicker")}
      />
      <div className="mx-auto max-w-[1680px] space-y-24 px-5 sm:px-8 lg:px-12">
        {worksWithAudio().map((work) => (
          <article key={work.id} className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="label-meta text-gilt">
                {t("workLabel")} {work.number}
              </p>
              <h2 className="mt-4 font-serif text-4xl">
                <Link href={`/works/${work.slug}`}>{loc(work.title)}</Link>
              </h2>
              <p className="mt-4 text-muted">{loc(work.audio.title)}</p>
              <div className="mt-6">
                <StatusBadge
                  label={moneyLabel(work.audio.price, locale)}
                  tone={work.pricingModel === "paid" ? "paid" : "free"}
                />
              </div>
            </div>
            <div className="lg:col-span-8">
              <MediaPlayer
                kind="audio"
                src={work.audio.src}
                poster={work.audio.poster}
                title={loc(work.audio.title)}
                pendingLabel={t("mediaPending")}
              />
            </div>
          </article>
        ))}

        <section>
          <h2 className="font-serif text-5xl">{t("headingFilms")}</h2>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {worksWithFilm().map((work) => (
              <li key={work.id}>
                <Link href={`/films/${work.slug}`} data-cursor="watch">
                  <PlaceholderMedia
                    src={work.film.poster ?? work.image}
                    alt={loc(work.imageAlt)}
                    width={1200}
                    height={750}
                    sizes="(min-width: 640px) 45vw, 100vw"
                    className="aspect-video"
                    label={t("mediaFilm")}
                  />
                  <p className="label-meta mt-4 text-gilt">
                    {t("workLabel")} {work.number}
                  </p>
                  <p className="mt-2 font-serif text-3xl">{loc(work.film.title)}</p>
                  <p className="mt-2 text-sm text-muted">{loc(work.film.duration)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
