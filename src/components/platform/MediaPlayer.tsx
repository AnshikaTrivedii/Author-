"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useHydratedReducedMotion } from "@/lib/reduced-motion";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/locale";

export function Waveform({ active = false }: { active?: boolean }) {
  const reduce = useHydratedReducedMotion();
  const bars = Array.from({ length: 28 });

  return (
    <div className="flex h-16 items-end gap-1" aria-hidden="true">
      {bars.map((_, index) => (
        <motion.span
          key={index}
          className="w-1 origin-bottom bg-gilt/80"
          animate={
            reduce || !active
              ? { height: 8 + (index % 5) * 4 }
              : { height: [10, 18 + (index % 7) * 6, 12] }
          }
          transition={{
            duration: 1.4 + (index % 4) * 0.12,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] as const;

function speedLabel(rate: number) {
  return `${rate}x`;
}

function preferredLanguage(
  locale: Locale,
  hindiSrc?: string | null,
  englishSrc?: string | null,
): Locale {
  if (locale === "en" && englishSrc) return "en";
  if (hindiSrc) return "hi";
  return englishSrc ? "en" : locale;
}

export function MediaPlayer({
  kind,
  src,
  hindiSrc,
  englishSrc,
  poster,
  title,
  pendingLabel,
}: {
  kind: "audio" | "video";
  src: string | null;
  hindiSrc?: string | null;
  englishSrc?: string | null;
  poster?: string | null;
  title: string;
  pendingLabel: string;
}) {
  const { locale, t } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [rate, setRate] = useState(1);
  const [language, setLanguage] = useState<Locale>(() =>
    preferredLanguage(locale, hindiSrc, englishSrc),
  );

  useEffect(() => {
    setLanguage(preferredLanguage(locale, hindiSrc, englishSrc));
  }, [locale, hindiSrc, englishSrc]);

  const voiced = kind === "audio" && (hindiSrc || englishSrc);
  const activeSrc = voiced
    ? language === "en"
      ? englishSrc ?? hindiSrc ?? src
      : hindiSrc ?? englishSrc ?? src
    : src;
  const bothVoices = Boolean(hindiSrc && englishSrc);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate;
  }, [rate, activeSrc]);

  if (!activeSrc) {
    return (
      <div
        className={cn(
          "relative overflow-hidden border border-ivory/10 bg-ink-2 p-8",
          kind === "video" && "min-h-[46vw] lg:min-h-[28rem]",
        )}
      >
        {poster ? (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${poster})` }}
          />
        ) : null}
        <div className="relative">
          <p className="label-meta text-gilt">{title}</p>
          <p className="mt-6 max-w-md font-serif text-2xl italic text-muted">
            {pendingLabel}
          </p>
          <div className="mt-10">
            <Waveform active={false} />
          </div>
        </div>
      </div>
    );
  }

  if (kind === "audio") {
    return (
      <figure className="border border-ivory/10 bg-ink-2 p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="label-meta text-gilt">{title}</p>
          {bothVoices ? (
            <div role="group" aria-label={t("language")} className="flex items-baseline gap-2">
              {(
                [
                  { id: "hi" as const, label: "हिन्दी" },
                  { id: "en" as const, label: "EN" },
                ]
              ).map((option, index) => (
                <span key={option.id} className="flex items-baseline gap-2">
                  {index > 0 ? (
                    <span className="text-[0.65rem] text-ivory/50" aria-hidden="true">
                      |
                    </span>
                  ) : null}
                  <button
                    type="button"
                    aria-pressed={language === option.id}
                    onClick={() => setLanguage(option.id)}
                    className={cn(
                      "label-meta transition-colors duration-300",
                      language === option.id ? "!text-gilt" : "!text-ivory/80 hover:!text-ivory",
                    )}
                  >
                    {option.label}
                  </button>
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="mt-8">
          <Waveform active />
        </div>
        <audio
          ref={audioRef}
          key={activeSrc}
          className="mt-8 w-full"
          controls
          preload="none"
          src={activeSrc ?? undefined}
        >
          <track kind="captions" />
        </audio>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="label-meta text-ivory/50">{t("speed")}</span>
          <div role="group" aria-label={t("speed")} className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
            {playbackSpeeds.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={rate === option}
                onClick={() => setRate(option)}
                className={cn(
                  "label-meta transition-colors duration-300",
                  rate === option ? "!text-gilt" : "!text-ivory/80 hover:!text-ivory",
                )}
              >
                {speedLabel(option)}
              </button>
            ))}
          </div>
        </div>
      </figure>
    );
  }

  return (
    <figure className="overflow-hidden border border-ivory/10 bg-ink-2">
      <video
        className="aspect-video w-full bg-ink"
        controls
        preload="none"
        poster={poster ?? undefined}
      >
        <source src={activeSrc} type="video/mp4" />
      </video>
      <figcaption className="label-meta px-6 py-4 text-muted">{title}</figcaption>
    </figure>
  );
}
