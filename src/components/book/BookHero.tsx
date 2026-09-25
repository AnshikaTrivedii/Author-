"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { platform } from "@/data/site";
import { bookOne } from "@/data/anugoonj";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { FilmFrame } from "@/components/ui/FilmFrame";
import { CtaLink } from "@/components/ui/CtaLink";
import { fadeUp, staggerChildren } from "@/lib/motion";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function BookHero() {
  const reduce = useReducedMotion();
  const { t, loc, locale } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduce) {
      video.pause();
      return;
    }
    const play = () => {
      void video.play().catch(() => undefined);
    };
    play();
    video.addEventListener("canplay", play);
    return () => video.removeEventListener("canplay", play);
  }, [reduce]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-ink">
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: mediaY }}
      >
        <div className="absolute inset-0">
          {reduce ? (
            <PlaceholderMedia
              src={platform.heroImage}
              alt={loc(bookOne.title)}
              fill
              priority
              sizes="100vw"
              className="h-full w-full"
              imageClassName="object-cover object-center"
            />
          ) : (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={platform.heroImage}
              aria-hidden="true"
            >
              <source src={platform.heroVideo} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
      </motion.div>

      <FilmFrame className="z-20 hidden sm:block" />

      <motion.div
        style={reduce ? undefined : { y: textY }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1680px] flex-col justify-end px-5 pb-16 pt-28 sm:px-8 lg:justify-center lg:px-12"
      >
        <motion.div
          variants={staggerChildren}
          initial={reduce ? "show" : "hidden"}
          animate="show"
          className="max-w-4xl"
        >
          <h1 className="max-w-[14ch] font-serif text-[clamp(2.6rem,7.4vw,6.1rem)] leading-[1.12] tracking-[-0.03em] text-balance">
            {bookOne.titleLines[locale === "hi" ? "hi" : "en"].map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl font-serif text-2xl italic text-ivory/90 sm:text-3xl"
          >
            {loc(bookOne.tagline)}
          </motion.p>
          <motion.p variants={fadeUp} className="label-meta mt-6 text-gilt">
            {loc(bookOne.positioning)}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-8 text-xs tracking-[0.28em] text-muted uppercase"
          >
            {loc(bookOne.author)}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8"
          >
            <CtaLink
              href={`/works/${bookOne.slug}/read/hi`}
              cursor="read"
              variant="solid"
            >
              {t("readTheStory")}
            </CtaLink>
            <CtaLink href="#listen" cursor="listen">
              {t("listenToVoice")}
            </CtaLink>
            <CtaLink href="#watch" cursor="watch">
              {t("watchTheJourney")}
            </CtaLink>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
