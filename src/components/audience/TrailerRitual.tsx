"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { platform } from "@/data/site";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { CtaLink } from "@/components/ui/CtaLink";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function TrailerRitual() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduce) return;
    if (!playing) {
      video.pause();
      return;
    }
    const start = () => {
      void video.play().catch(() => undefined);
    };
    start();
    video.addEventListener("canplay", start, { once: true });
    return () => video.removeEventListener("canplay", start);
  }, [playing, reduce]);

  return (
    <section id="trailer" className="scroll-mt-28 bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <p className="label-meta text-gilt">{t("trailerEyebrow")}</p>
        <h2 className="mt-6 max-w-4xl font-serif text-5xl sm:text-7xl">{t("trailerHeading")}</h2>
        <p className="mt-6 max-w-xl font-serif text-2xl italic text-muted">
          {t("trailerKicker")}
        </p>
        <div className="relative mt-12 aspect-[16/9] overflow-hidden border border-ivory/10 bg-ink-2">
          {reduce ? (
            <PlaceholderMedia
              src={platform.heroImage}
              alt=""
              fill
              sizes="100vw"
              className="h-full w-full"
            />
          ) : (
              <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              playsInline
              preload="none"
              poster={platform.heroImage}
            >
              {playing ? <source src={platform.heroVideo} type="video/mp4" /> : null}
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/20" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              className="label-meta min-h-12 border border-gilt bg-gilt px-8 py-4 text-ink"
            >
              {playing ? t("pause") : t("playTrailer")}
            </button>
            <div className="flex flex-wrap gap-6">
              <CtaLink href="/free-works" cursor="read">
                {t("read")}
              </CtaLink>
              <CtaLink href="#listen" cursor="listen">
                {t("listen")}
              </CtaLink>
              <CtaLink href="#watch" cursor="watch">
                {t("watch")}
              </CtaLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
