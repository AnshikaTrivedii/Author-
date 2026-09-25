"use client";

import { MediaPlayer } from "@/components/platform/MediaPlayer";
import { bookOne } from "@/data/anugoonj";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function BookFilm() {
  const { t, loc } = useLanguage();

  return (
    <section id="watch" className="scroll-mt-28 bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <p className="label-meta text-gilt">{t("watch")}</p>
        <h2 className="mt-6 font-serif text-5xl sm:text-7xl">
          {loc(bookOne.title)}
        </h2>
        <p className="mt-6 font-serif text-2xl italic text-muted">
          {t("filmTitlePending")}
        </p>
        <p className="label-meta mt-4 text-gilt">5–7 minutes</p>
        <div className="mt-12">
          <MediaPlayer
            kind="video"
            src={null}
            poster="/images/stills/family-photo.jpg"
            title={t("filmTitlePending")}
            pendingLabel={t("mediaPending")}
          />
        </div>
      </div>
    </section>
  );
}
