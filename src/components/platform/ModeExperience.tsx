"use client";

import Link from "next/link";
import { useState } from "react";
import { useHydratedReducedMotion } from "@/lib/reduced-motion";
import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { cn } from "@/lib/utils";

const modes = [
  {
    key: "read" as const,
    href: "/works",
    image: "/images/stills/heritage-books.jpg",
    bodyKey: "modeReadBody" as const,
  },
  {
    key: "listen" as const,
    href: "/audio-video",
    image: "/images/stills/letter-notebook.jpg",
    bodyKey: "modeListenBody" as const,
  },
  {
    key: "watch" as const,
    href: "/films",
    image: "/images/stills/cinematic-01.jpg",
    bodyKey: "modeWatchBody" as const,
  },
];

export function ModeExperience() {
  const { t } = useLanguage();
  const reduce = useHydratedReducedMotion();
  const [active, setActive] = useState<(typeof modes)[number]["key"]>("read");
  const current = modes.find((mode) => mode.key === active) ?? modes[0];

  return (
    <section className="relative overflow-hidden bg-ink py-24 lg:py-36">
      <div className="mx-auto grid max-w-[1680px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-end lg:px-12">
        <Reveal className="lg:col-span-5">
          <p className="label-meta text-gilt">
            {t("words")} · {t("voice")} · {t("visuals")} · {t("films")}
          </p>
          <h2 className="mt-6 font-serif text-5xl leading-[0.88] tracking-[-0.03em] sm:text-7xl">
            {t("headingModes")}
          </h2>
          <p className="mt-8 max-w-md font-serif text-xl italic text-muted">
            {t("modesIntro")}
          </p>
        </Reveal>

        <div className="relative min-h-[52vw] lg:col-span-7 lg:min-h-[38rem]">
          <PlaceholderMedia
            src={current.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            kenBurns={!reduce}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <ul className="divide-y divide-ivory/10 border-y border-ivory/10">
          {modes.map((mode) => {
            const selected = mode.key === active;
            return (
              <li key={mode.key}>
                <Link
                  href={mode.href}
                  data-cursor={mode.key}
                  onMouseEnter={() => setActive(mode.key)}
                  onFocus={() => setActive(mode.key)}
                  className="group grid gap-3 py-7 lg:grid-cols-12 lg:items-center"
                >
                  <span
                    className={cn(
                      "font-serif text-5xl leading-none tracking-[-0.04em] transition-colors sm:text-7xl lg:col-span-5 lg:text-8xl",
                      selected ? "text-ivory" : "text-ivory/35",
                    )}
                  >
                    {t(mode.key)}
                  </span>
                  <span className="max-w-md font-serif text-xl text-muted lg:col-span-5">
                    {t(mode.bodyKey)}
                  </span>
                  <span className="label-meta text-gilt lg:col-span-2 lg:text-right">
                    {selected ? "●" : "○"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
