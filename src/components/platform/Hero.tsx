"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { platform } from "@/data/site";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { TitleReveal } from "@/components/ui/TitleReveal";
import { FilmFrame } from "@/components/ui/FilmFrame";
import { CtaLink } from "@/components/ui/CtaLink";
import { fadeUp, staggerChildren } from "@/lib/motion";
import { useHydratedReducedMotion } from "@/lib/reduced-motion";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function Hero() {
  const reduce = useHydratedReducedMotion();
  const { t, lines } = useLanguage();
  const titleLines = lines(platform.titleLines);
  const tagline = lines(platform.tagline);
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

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
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-ink"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: mediaY }}
      >
        <div className="absolute inset-0">
          {reduce ? (
            <PlaceholderMedia
              src={platform.heroImage}
              alt={`${t("mediaHero")} ${platform.title}`}
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
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/25 to-transparent" />
        {reduce ? null : <div className="light-sweep" />}
      </motion.div>

      <FilmFrame className="z-20 hidden sm:block" />

      <motion.div
        style={reduce ? undefined : { y: textY }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1680px] flex-col justify-end px-5 pb-20 pt-28 sm:px-8 lg:justify-center lg:px-12 lg:pb-16"
      >
        <motion.div
          variants={staggerChildren}
          initial={reduce ? "show" : "hidden"}
          animate="show"
          className="max-w-5xl"
        >
          <h1 className="font-serif text-[18vw] leading-[0.78] tracking-[-0.045em] sm:text-[12vw] lg:text-[9.2vw]">
            {titleLines.map((line, index) => (
              <TitleReveal
                key={line}
                text={line}
                delay={0.08 + index * 0.28}
                className={index === 1 ? "text-ivory/80" : undefined}
              />
            ))}
          </h1>
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl font-serif text-2xl leading-snug text-ivory/85 sm:text-3xl lg:text-4xl"
          >
            {tagline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="label-meta mt-8 tracking-[0.38em] text-gilt"
          >
            {t("read")} • {t("listen")} • {t("watch")}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10"
          >
            <CtaLink href="/works" cursor="explore" variant="solid">
              {t("exploreWorks")}
            </CtaLink>
            <CtaLink href="/free-works" cursor="read">
              {t("startFree")}
            </CtaLink>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
