"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Heart, X } from "lucide-react";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { bookOne } from "@/data/anugoonj";
import { platform } from "@/data/site";
import { readReaderResume } from "@/lib/reading";
import { cn } from "@/lib/utils";

type FilmPayload = {
  poster: string | null;
  video: string | null;
  subtitlesEn: string | null;
};

export function IntroductionFilm() {
  const { t, loc, locale } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [film, setFilm] = useState<FilmPayload | null>(null);
  const [playing, setPlaying] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [subsOn, setSubsOn] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likePending, setLikePending] = useState(false);
  const [shareNote, setShareNote] = useState("");
  const [error, setError] = useState("");
  const [resume, setResume] = useState<ReturnType<typeof readReaderResume>>(null);

  useEffect(() => {
    setResume(readReaderResume());
  }, []);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch("/api/film").then((response) => response.json()),
      fetch("/api/likes").then((response) => response.json()),
    ])
      .then(([filmData, likeData]: [FilmPayload, { count?: number; liked?: boolean }]) => {
        if (!active) return;
        setFilm(filmData);
        setLikeCount(typeof likeData.count === "number" ? likeData.count : 0);
        setLiked(Boolean(likeData.liked));
      })
      .catch(() => {
        if (active) setError(t("filmPlayFailed"));
      });
    return () => {
      active = false;
    };
  }, [t]);

  useEffect(() => {
    document.body.style.overflow = playing ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [playing]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!playing) {
      video.muted = true;
      const start = () => {
        video.muted = true;
        void video.play().catch(() => undefined);
      };
      start();
      video.addEventListener("canplay", start, { once: true });
      return () => video.removeEventListener("canplay", start);
    }
    video.muted = false;
    video.loop = false;
    const start = () => {
      void video.play().catch(() => setError(t("filmPlayFailed")));
    };
    start();
    video.addEventListener("canplay", start, { once: true });
    return () => video.removeEventListener("canplay", start);
  }, [playing, film?.video, t]);

  function toggleSubtitles() {
    const track = videoRef.current?.textTracks?.[0];
    if (!track) return;
    const next = !subsOn;
    track.mode = next ? "showing" : "disabled";
    setSubsOn(next);
  }

  async function copyLink(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      const field = document.createElement("textarea");
      field.value = url;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand("copy");
      field.remove();
      return copied;
    }
  }

  async function share() {
    const url = `${platform.siteUrl.replace(/\/$/, "")}/`;
    const payload = {
      title: "Echoes of Memories",
      text: "A cinematic introduction to Echoes of Memories.",
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        setShareNote(t("shareLanding"));
        return;
      }
    } catch (shareError) {
      if (shareError instanceof DOMException && shareError.name === "AbortError") return;
    }
    const copied = await copyLink(url);
    setShareNote(copied ? t("shareCopied") : url);
  }

  async function like() {
    if (likePending) return;
    setLikePending(true);
    setError("");
    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: "introduction" }),
      });
      const data = (await response.json()) as { count?: number; liked?: boolean; error?: string };
      if (!response.ok || typeof data.count !== "number") {
        setError(t("likeFailed"));
      } else {
        setLikeCount(data.count);
        setLiked(Boolean(data.liked));
      }
    } catch {
      setError(t("likeFailed"));
    } finally {
      setLikePending(false);
    }
  }

  const poster = film?.poster ?? "/images/stills/grandmother.jpg";
  const video = film?.video ?? null;
  const subtitles = film?.subtitlesEn ?? null;
  const silent = Boolean(video) && !playing && !reduceMotion;
  const mediaSrc = (value: string) => (value.startsWith("https://") ? value : encodeURI(value));
  const lines = bookOne.titleLines[locale === "hi" ? "hi" : "en"];

  function openWithAudio() {
    setError("");
    const element = videoRef.current;
    if (element) {
      element.loop = false;
      element.muted = false;
      element.currentTime = 0;
      void element.play().catch(() => setError(t("filmPlayFailed")));
    }
    setPlaying(true);
  }

  function closeFilm() {
    const element = videoRef.current;
    if (element) {
      element.pause();
      element.muted = true;
      element.loop = true;
    }
    setPlaying(false);
  }

  return (
    <section id="introduction" className="relative isolate min-h-[100svh] overflow-hidden bg-ink">
      {video && (silent || playing) ? (
        <video
          ref={videoRef}
          className={cn(
            "bg-ink object-cover",
            playing
              ? "fixed inset-0 z-[80] h-full w-full object-cover"
              : "absolute inset-x-0 top-0 h-[132%] w-full object-cover object-[center_18%]",
          )}
          controls={playing}
          playsInline
          autoPlay
          muted={!playing}
          loop={!playing}
          preload="auto"
          poster={poster}
          aria-hidden={playing ? undefined : true}
          onError={() => {
            if (playing) setError(t("filmPlayFailed"));
          }}
        >
          <source src={mediaSrc(video)} type="video/mp4" />
          {playing && subtitles ? (
            <track kind="subtitles" srcLang="en" label="English" src={encodeURI(subtitles)} />
          ) : null}
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover object-[center_30%]" />
      )}
      {!playing ? (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/45 sm:bg-gradient-to-r sm:from-ink sm:via-ink/75 sm:to-ink/20" />
      ) : (
        <button
          type="button"
          onClick={closeFilm}
          aria-label={t("close")}
          className="fixed top-5 right-5 z-[90] inline-flex size-11 items-center justify-center border border-ivory/40 bg-ink/70 text-ivory backdrop-blur-[2px]"
        >
          <X aria-hidden="true" className="size-5" strokeWidth={1.25} />
        </button>
      )}

      <div className={cn("relative z-10 mx-auto flex min-h-[100svh] max-w-[1680px] items-center px-5 pt-36 pb-16 sm:px-8 md:px-12 md:pt-40", playing && "invisible")}>
        <Reveal className="max-w-xl">
          <p className="label-meta text-gilt">{t("filmEyebrow")}</p>
          <h1 className="mt-5 font-serif text-[clamp(3.2rem,6vw,5.6rem)] leading-[0.92] tracking-[-0.035em] text-balance">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md font-serif text-2xl leading-snug text-ivory/85 italic">
            {loc(bookOne.tagline)}
          </p>
          <p className="label-meta mt-5 text-ivory/70">{loc(bookOne.positioning)}</p>
          <p className="mt-4 text-sm tracking-[0.22em] text-ivory/80 uppercase">
            {loc(bookOne.author)}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <button
              type="button"
              disabled={!video}
              onClick={openWithAudio}
              className="label-meta inline-flex min-h-12 items-center border border-ivory/70 bg-ink/55 px-8 py-4 text-ivory backdrop-blur-[2px] transition-colors duration-500 hover:border-gilt hover:text-gilt disabled:cursor-not-allowed disabled:opacity-60"
            >
              {t("playFilm")}
            </button>
            <button
              type="button"
              onClick={() => {
                document.getElementById("join")?.scrollIntoView({ behavior: "smooth" });
                window.dispatchEvent(new Event("loi-join"));
              }}
              className="label-meta inline-flex min-h-12 items-center border border-gilt bg-gilt px-8 py-4 text-ink transition-colors duration-500 hover:bg-transparent hover:text-ivory"
            >
              {t("joinCta")}
            </button>
            <button
              type="button"
              onClick={() => void share()}
              className="label-meta text-ivory/75 transition-colors hover:text-gilt"
            >
              {shareNote === t("shareCopied") ? t("shareCopied") : t("shareLanding")}
            </button>
            <button
              type="button"
              aria-pressed={liked}
              disabled={likePending}
              onClick={() => void like()}
              className="label-meta inline-flex items-center gap-2 text-ivory/75 transition-colors hover:text-gilt disabled:opacity-60"
            >
              <Heart aria-hidden="true" className={cn("size-4", liked && "fill-gilt text-gilt")} />
              <span>{likeCount}</span>
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
            <Link
              href={`/works/${bookOne.slug}/read/hi`}
              className="label-meta text-ivory/80 transition-colors hover:text-gilt"
            >
              {t("readTheStory")}
            </Link>
            <Link href="/audio-video" className="label-meta text-ivory/80 transition-colors hover:text-gilt">
              {t("listenToVoice")}
            </Link>
            <Link href="/films" className="label-meta text-ivory/80 transition-colors hover:text-gilt">
              {t("watchTheJourney")}
            </Link>
          </div>
          {resume ? (
            <p className="mt-4">
              <Link
                href={`/works/${resume.slug}/read/${resume.lang}`}
                className="label-meta text-gilt"
              >
                {t("readerResume")}
              </Link>
            </p>
          ) : null}
          {error ? (
            <p className="mt-4 text-sm text-ivory" role="alert">
              {error}
            </p>
          ) : null}
          {!video && film ? <p className="mt-4 text-sm text-muted">{t("filmMissing")}</p> : null}
        </Reveal>
      </div>
      {playing && subtitles ? (
        <button
          type="button"
          aria-pressed={subsOn}
          onClick={toggleSubtitles}
          className="label-meta fixed bottom-6 left-6 z-[90] text-ivory/80 transition-colors hover:text-gilt"
        >
          {subsOn ? t("subtitlesOn") : t("subtitlesOff")}
        </button>
      ) : null}
    </section>
  );
}
