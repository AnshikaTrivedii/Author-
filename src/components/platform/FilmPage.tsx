"use client";

import { MediaPlayer } from "@/components/platform/MediaPlayer";
import { PageIntro } from "@/components/ui/PageIntro";
import { platform } from "@/data/site";
import type { Work } from "@/data/types";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function FilmPage({ work }: { work: Work }) {
  const { t, loc, locale } = useLanguage();

  return (
    <article className="bg-ink pb-28">
      <PageIntro
        eyebrow={t("watch")}
        title={loc(work.film.title)}
        kicker={loc(work.film.duration)}
      />
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <MediaPlayer
          kind="video"
          src={work.film.src}
          poster={work.film.poster}
          title={loc(work.film.title)}
          pendingLabel={t("mediaPending")}
        />
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <section className="lg:col-span-7">
            <h2 className="label-meta text-gilt">{t("filmSynopsis")}</h2>
            <p className="mt-6 font-serif text-2xl leading-snug">{loc(work.film.synopsis)}</p>
          </section>
          <dl className="grid gap-6 lg:col-span-4 lg:col-start-9">
            <div>
              <dt className="label-meta text-muted">{t("filmDuration")}</dt>
              <dd className="mt-2 font-serif text-2xl">{loc(work.film.duration)}</dd>
            </div>
            <div>
              <dt className="label-meta text-muted">{t("filmLanguage")}</dt>
              <dd className="mt-2 font-serif text-2xl">{loc(work.film.language)}</dd>
            </div>
            <div>
              <dt className="label-meta text-muted">{t("filmSubtitles")}</dt>
              <dd className="mt-2 font-serif text-2xl">{loc(work.film.subtitles)}</dd>
            </div>
            {work.film.aiAssisted ? (
              <div>
                <dt className="label-meta text-muted">{t("aiYes")}</dt>
                <dd className="mt-2 font-serif text-2xl">
                  {t("aiTools")}: {loc(work.film.aiTools)}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>

        <section className="mt-20 max-w-3xl">
          <h2 className="font-serif text-4xl">{t("headingCredits")}</h2>
          <dl className="mt-10 space-y-6">
            {[
              [t("writtenBy"), loc(work.credits.writtenBy)],
              [t("narratedBy"), loc(work.credits.narratedBy)],
            ].map(([label, value]) => (
              <div key={label} className="border-t border-ivory/10 pt-4">
                <dt className="label-meta text-muted">{label}</dt>
                <dd className="mt-2 font-serif text-2xl">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="label-meta mt-12 text-muted">
            © 2026 {locale === "hi" ? platform.creatorNameHi : platform.creatorName}. {t("allRights")}
          </p>
        </section>
      </div>
    </article>
  );
}
