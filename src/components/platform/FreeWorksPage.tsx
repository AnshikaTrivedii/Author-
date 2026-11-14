"use client";

import { FreeProgressRibbon } from "@/components/audience/FreeProgressRibbon";
import { CtaLink } from "@/components/ui/CtaLink";
import { PageIntro } from "@/components/ui/PageIntro";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { StatusBadge } from "@/components/platform/StatusBadge";
import { ImageReveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/components/layout/LanguageProvider";
import type { Work } from "@/data/types";

export function FreeWorksPage({ works }: { works: Work[] }) {
  const { t, loc } = useLanguage();

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro
        eyebrow={t("badgeFree")}
        title={t("headingFreePage")}
        kicker={t("freeSupport")}
      />
      <div className="mx-auto max-w-[1680px] space-y-28 px-5 pt-12 sm:px-8 lg:px-12">
        <FreeProgressRibbon />
        {works.map((work) => (
          <article key={work.id} className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <ImageReveal>
                <PlaceholderMedia
                  src={work.image}
                  alt={loc(work.imageAlt)}
                  width={1400}
                  height={900}
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="aspect-[4/5] sm:aspect-[5/4]"
                />
              </ImageReveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="label-meta text-gilt">
                {t("workLabel")} {work.number}
              </p>
              <h2 className="mt-4 font-serif text-5xl leading-none">
                {loc(work.title)}
              </h2>
              <p className="mt-6 max-w-md text-muted">{loc(work.description)}</p>
              <ul className="mt-8 space-y-3">
                <li className="flex justify-between border-b border-ivory/10 py-3">
                  <span>{t("hindiEdition")}</span>
                  <StatusBadge
                    label={work.hindi.status === "published" ? t("badgeFree") : t("forthcoming")}
                    tone={work.hindi.status === "published" ? "free" : "soon"}
                  />
                </li>
                <li className="flex justify-between border-b border-ivory/10 py-3">
                  <span>{t("englishEdition")}</span>
                  <StatusBadge
                    label={work.english.status === "published" ? t("badgeFree") : t("forthcoming")}
                    tone={work.english.status === "published" ? "free" : "soon"}
                  />
                </li>
                <li className="flex justify-between border-b border-ivory/10 py-3">
                  <span>{t("authorsVoice")}</span>
                  <StatusBadge label={t("badgeFree")} />
                </li>
                <li className="flex justify-between border-b border-ivory/10 py-3">
                  <span>{t("shortFilm")}</span>
                  <StatusBadge label={t("badgeFree")} />
                </li>
              </ul>
              <div className="mt-10 flex flex-col gap-4">
                <CtaLink href={`/works/${work.slug}/read/hi`} cursor="read">
                  {t("readHindi")}
                </CtaLink>
                <CtaLink href={`/works/${work.slug}/read/en`} cursor="read">
                  {t("readEnglish")}
                </CtaLink>
                <CtaLink href={`/works/${work.slug}#listen`} cursor="listen">
                  {t("listenWatch")}
                </CtaLink>
                <CtaLink href={`/works/${work.slug}#watch`} cursor="watch">
                  {t("watchFilm")}
                </CtaLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
