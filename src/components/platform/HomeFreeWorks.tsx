"use client";

import { FreeProgressRibbon } from "@/components/audience/FreeProgressRibbon";
import Link from "next/link";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { CtaLink } from "@/components/ui/CtaLink";
import { StatusBadge } from "@/components/platform/StatusBadge";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { freeWorks } from "@/data/works";

export function HomeFreeWorks() {
  const { t, loc } = useLanguage();
  const works = freeWorks();

  return (
    <section id="free" className="scroll-mt-28 bg-ink-2 py-24 lg:py-36">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="label-meta text-gilt">{t("badgeFree")}</p>
          <h2 className="mt-6 max-w-4xl font-serif text-5xl leading-[0.88] tracking-[-0.03em] sm:text-7xl">
            {t("headingFree")}
          </h2>
          <p className="mt-8 max-w-xl font-serif text-xl italic text-muted">
            {t("freeSupport")}
          </p>
          <div className="mt-10 max-w-xl">
            <FreeProgressRibbon />
          </div>
          <CtaLink href="/gift" className="mt-8" cursor="explore">
            {t("giftHeading")}
          </CtaLink>
        </Reveal>

        <div className="mt-16 grid gap-20 lg:gap-28">
          {works.map((work, index) => (
            <article
              key={work.id}
              className="grid items-end gap-10 lg:grid-cols-12"
            >
              <Link
                href={`/works/${work.slug}`}
                data-cursor="read"
                className={index % 2 === 1 ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-6"}
              >
                <ImageReveal>
                  <PlaceholderMedia
                    src={work.image}
                    alt={loc(work.imageAlt)}
                    width={1400}
                    height={900}
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    className="aspect-[4/5] sm:aspect-[16/11]"
                  />
                </ImageReveal>
              </Link>

              <div
                className={
                  index % 2 === 1
                    ? "lg:col-span-5 lg:col-start-1 lg:row-start-1"
                    : "lg:col-span-5 lg:col-start-8"
                }
              >
                <p className="label-meta text-gilt">
                  {t("workLabel")} {work.number}
                </p>
                <h3 className="mt-4 font-serif text-4xl leading-none sm:text-5xl">
                  {loc(work.title)}
                </h3>
                <p className="mt-5 max-w-md text-muted">{loc(work.description)}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <StatusBadge
                    label={`${t("hindiEdition")} — ${work.hindi.status === "published" ? t("badgeFree") : t("forthcoming")}`}
                    tone={work.hindi.status === "published" ? "free" : "soon"}
                  />
                  <StatusBadge
                    label={`${t("englishEdition")} — ${work.english.status === "published" ? t("badgeFree") : t("forthcoming")}`}
                    tone={work.english.status === "published" ? "free" : "soon"}
                  />
                  <StatusBadge label={t("voiceFree")} />
                  <StatusBadge label={t("filmFree")} />
                </div>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
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
      </div>
    </section>
  );
}
