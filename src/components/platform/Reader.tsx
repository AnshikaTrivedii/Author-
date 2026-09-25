"use client";

import { CtaLink } from "@/components/ui/CtaLink";
import { useLanguage } from "@/components/layout/LanguageProvider";
import type { Edition, Work } from "@/data/types";
import { accessLabel } from "@/lib/commerce";
import { bookOne, questionsBook, readerExcerpts } from "@/data/anugoonj";
import { allowsDownload, allowsOnline } from "@/lib/utils";

export function Reader({
  work,
  edition,
  allowed,
}: {
  work: Work;
  edition: Edition;
  allowed: boolean;
}) {
  const { t, loc } = useLanguage();
  const isAnugoonj = work.slug === bookOne.slug;
  const isQuestions = work.slug === questionsBook.slug;

  return (
    <article className="bg-ink px-5 pt-28 pb-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="label-meta text-gilt">
          {t("workLabel")} {work.number}
        </p>
        <h1 className="mt-6 font-serif text-5xl leading-[1.1] sm:text-7xl">
          {loc(work.title)}
        </h1>
        <p className="mt-6 font-serif text-2xl italic text-muted">
          {loc(work.subtitle)}
        </p>
        <p className="mt-4 text-sm text-muted">
          {loc(edition.label)} · {t("version")} {edition.version} ·{" "}
          {loc(accessLabel(edition.accessType))}
        </p>

        {!allowed ? (
          <div className="mt-16">
            <p className="font-serif text-2xl italic text-muted">
              {edition.status === "forthcoming"
                ? t("forthcoming")
                : work.pricingModel === "paid"
                  ? t("librarySignIn")
                  : t("purchaseForthcoming")}
            </p>
          </div>
        ) : (
          <div className="mt-16 space-y-16 border-t border-ivory/10 pt-16">
            {isAnugoonj && allowsOnline(edition.accessType)
              ? readerExcerpts.map((excerpt) => (
                  <section key={excerpt.kicker.hi}>
                    <p className="label-meta text-gilt">{loc(excerpt.kicker)}</p>
                    <p className="mt-5 font-serif text-3xl leading-relaxed">
                      {loc(excerpt.body)}
                    </p>
                  </section>
                ))
              : null}
            {isQuestions && allowsOnline(edition.accessType) ? (
              <p className="font-serif text-3xl leading-relaxed">
                {loc(questionsBook.about)}
              </p>
            ) : null}
            {!isAnugoonj && !isQuestions && allowsOnline(edition.accessType) ? (
              <p className="font-serif text-3xl leading-relaxed text-muted">
                {loc(work.about)}
              </p>
            ) : null}
            {allowsDownload(edition.accessType) ? (
              <p className="text-sm text-muted">
                {t("editionDownload")}: {t("mediaPending")}
              </p>
            ) : (
              <p className="text-sm text-muted">{t("accessNote")}</p>
            )}
            <CtaLink href={`/works/${work.slug}`} cursor="explore">
              {t("returnHome")}
            </CtaLink>
          </div>
        )}
      </div>
    </article>
  );
}
