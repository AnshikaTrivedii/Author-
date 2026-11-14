"use client";

import { useEffect, useState } from "react";
import { bookOne } from "@/data/anugoonj";
import { useLanguage } from "@/components/layout/LanguageProvider";

const launchAt = new Date("2026-11-16T00:00:00+05:30").getTime();
const repeats = 6;

function remaining(now: number) {
  const total = Math.max(0, Math.floor((launchAt - now) / 1000));
  return {
    done: now >= launchAt,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function TickerRun({
  label,
  date,
  title,
  clock,
  hidden = false,
}: {
  label: string;
  date: string;
  title: string;
  clock: string;
  hidden?: boolean;
}) {
  return (
    <div className={hidden ? "launch-marquee-copy flex shrink-0" : "flex shrink-0"} aria-hidden={hidden}>
      {Array.from({ length: repeats }, (_, index) => (
        <span key={index} className={index === 0 ? "flex items-center gap-4 px-7" : "launch-marquee-extra flex items-center gap-4 px-7"}>
          <span className="size-1 rotate-45 bg-gilt" aria-hidden="true" />
          <span className="label-meta !text-gilt">{label}</span>
          <span className="font-serif text-lg leading-none tracking-wide text-ivory italic">{date}</span>
          {clock ? (
            <span className="label-meta tabular-nums !text-ivory/75">{clock}</span>
          ) : null}
          <span className="size-1 rotate-45 bg-ivory/35" aria-hidden="true" />
          <span className="font-serif text-lg leading-none tracking-wide text-ivory/90">{title}</span>
        </span>
      ))}
    </div>
  );
}

export function LaunchTicker() {
  const { loc, t } = useLanguage();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const left = now === null ? null : remaining(now);
  const clock =
    left && !left.done
      ? `${pad(left.days)}d ${pad(left.hours)}h ${pad(left.minutes)}m ${pad(left.seconds)}s`
      : "";
  const run = {
    label: t("launchTickerLabel"),
    date: t("launchTickerDate"),
    title: loc(bookOne.title),
    clock,
  };

  return (
    <div className="relative h-8 overflow-hidden border-b border-gilt/45 bg-[#100e0c]">
      <div className="launch-fade-left" />
      <div className="launch-fade-right" />
      <div className="launch-marquee flex h-full w-max items-center">
        <TickerRun {...run} />
        <TickerRun {...run} hidden />
      </div>
    </div>
  );
}
