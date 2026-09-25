"use client";

import { CtaLink } from "@/components/ui/CtaLink";
import { MediaPlayer } from "@/components/platform/MediaPlayer";
import { StatusBadge } from "@/components/platform/StatusBadge";
import { WorkModes } from "@/components/platform/WorkModes";
import { useLanguage } from "@/components/layout/LanguageProvider";
import type { Work } from "@/data/types";
import { accessLabel } from "@/lib/commerce";
import { moneyLabel } from "@/lib/utils";
import { platform } from "@/data/site";

export function WorkDetail({ work }: { work: Work }) {
  const { t, loc, locale } = useLanguage();
  const paid = work.pricingModel === "paid";
  const complete = work.offers.find((offer) => offer.id.startsWith("complete"));

  return (
    <article className="bg-ink pb-28">
      <header className="mx-auto max-w-[1680px] px-5 pt-28 sm:px-8 lg:px-12 lg:pt-36">
        <p className="label-meta text-gilt">
          {t("workLabel")} {work.number}
        </p>
        <h1 className="mt-6 max-w-5xl font-serif text-5xl leading-[1.12] tracking-[-0.03em] sm:text-7xl lg:text-8xl">
          {loc(work.title)}
        </h1>
        <p className="mt-6 font-serif text-2xl italic text-muted">
          {loc(work.subtitle)}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <StatusBadge
            label={paid ? t("badgePaid") : t("badgeFree")}
            tone={paid ? "paid" : "free"}
          />
          {work.status === "forthcoming" ? (
            <StatusBadge label={t("forthcoming")} tone="soon" />
          ) : null}
        </div>
        <WorkModes work={work} />
      </header>

      <section className="mx-auto mt-24 max-w-[1680px] px-5 sm:px-8 lg:grid lg:grid-cols-12 lg:px-12">
        <h2 className="label-meta text-gilt lg:col-span-3">{t("headingAboutWork")}</h2>
        <p className="mt-6 max-w-2xl font-serif text-2xl leading-snug text-ivory/90 lg:col-span-8 lg:col-start-5 lg:mt-0">
          {loc(work.about)}
        </p>
      </section>

      <section id="read" className="mx-auto mt-28 max-w-[1680px] scroll-mt-28 px-5 sm:px-8 lg:px-12">
        <h2 className="font-serif text-5xl sm:text-7xl">{t("headingRead")}</h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {[work.hindi, work.english].map((edition) => (
            <div key={edition.language} className="border-t border-ivory/15 pt-8">
              <p className="font-serif text-3xl">{loc(edition.label)}</p>
              <p className="label-meta mt-4 text-gilt">
                {edition.status === "forthcoming"
                  ? t("forthcoming")
                  : moneyLabel(edition.price, locale)}
              </p>
              <p className="mt-3 text-sm text-muted">
                {t("version")} {edition.version} · {loc(accessLabel(edition.accessType))}
              </p>
              <CtaLink
                href={`/works/${work.slug}/read/${edition.language}`}
                cursor="read"
                className="mt-8"
              >
                {edition.language === "hi" ? t("readHindi") : t("readEnglish")}
              </CtaLink>
            </div>
          ))}
        </div>
      </section>

      <section id="listen" className="mx-auto mt-28 max-w-[1680px] scroll-mt-28 px-5 sm:px-8 lg:px-12">
        <h2 className="font-serif text-5xl sm:text-7xl">{t("headingListen")}</h2>
        <p className="mt-6 font-serif text-2xl italic text-muted">{t("authorsVoice")}</p>
        <div className="mt-10">
          <MediaPlayer
            kind="audio"
            src={work.audio.src}
            poster={work.audio.poster}
            title={loc(work.audio.title)}
            pendingLabel={t("mediaPending")}
          />
        </div>
      </section>

      <section id="watch" className="mx-auto mt-28 max-w-[1680px] scroll-mt-28 px-5 sm:px-8 lg:px-12">
        <h2 className="font-serif text-5xl sm:text-7xl">{t("headingWatch")}</h2>
        <p className="mt-6 font-serif text-2xl italic text-muted">{loc(work.film.duration)}</p>
        <div className="mt-10">
          <MediaPlayer
            kind="video"
            src={work.film.src}
            poster={work.film.poster}
            title={loc(work.film.title)}
            pendingLabel={t("mediaPending")}
          />
        </div>
      </section>

      {paid ? (
        <section className="mx-auto mt-28 max-w-[1680px] px-5 sm:px-8 lg:px-12">
          <h2 className="font-serif text-5xl sm:text-7xl">{t("headingReceive")}</h2>
          <ul className="mt-10 max-w-xl space-y-4 font-serif text-2xl">
            {work.whatYouReceive.map((item) => (
              <li key={item.en}>{loc(item)}</li>
            ))}
          </ul>
          <div className="mt-12 grid gap-6 border-t border-ivory/10 pt-10 sm:grid-cols-3">
            {work.offers.map((offer) => (
              <div key={offer.id}>
                <p className="font-serif text-2xl">{loc(offer.label)}</p>
                <p className="label-meta mt-3 text-gilt">
                  {moneyLabel(offer.price, locale)}
                </p>
                <p className="mt-3 text-sm text-muted">{loc(accessLabel(offer.accessType))}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-md text-sm text-muted">{t("accessNote")}</p>
          {complete ? (
            <CtaLink
              href={`/works/${work.slug}/buy?offer=${complete.id}`}
              variant="solid"
              className="mt-10"
            >
              {t("buyNow")}
            </CtaLink>
          ) : null}
        </section>
      ) : null}

      <section className="mx-auto mt-28 max-w-[1680px] px-5 sm:px-8 lg:grid lg:grid-cols-12 lg:px-12">
        <h2 className="font-serif text-5xl lg:col-span-4">{t("headingCredits")}</h2>
        <dl className="mt-10 grid gap-6 lg:col-span-7 lg:col-start-6 lg:mt-0">
          {[
            [t("writtenBy"), loc(work.credits.writtenBy)],
            [t("narratedBy"), loc(work.credits.narratedBy)],
            [t("filmConcept"), loc(work.credits.filmConcept)],
            [t("direction"), loc(work.credits.direction)],
            [t("editing"), loc(work.credits.editing)],
            [t("aiProduction"), loc(work.credits.aiProduction)],
            [t("music"), loc(work.credits.music)],
            [t("otherContributors"), loc(work.credits.other)],
          ].map(([label, value]) => (
            <div key={label} className="border-t border-ivory/10 pt-4">
              <dt className="label-meta text-muted">{label}</dt>
              <dd className="mt-2 font-serif text-2xl">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto mt-24 max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <p className="label-meta text-muted">
          © 2026 {locale === "hi" ? platform.creatorNameHi : platform.creatorName}. {t("allRights")}
        </p>
      </section>
    </article>
  );
}
