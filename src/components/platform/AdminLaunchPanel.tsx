"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { cn } from "@/lib/utils";

type Registration = {
  name: string;
  email: string;
  createdAt: string;
  notifyLaunch: boolean;
  notifyConsentAt: string | null;
};

type Payload = {
  total: number;
  subscribed: number;
  registrations: Registration[];
};

type FilmAssets = {
  poster: string | null;
  video: string | null;
  subtitlesEn: string | null;
};

const filters = ["all", "subscribed", "unsubscribed"] as const;

export function AdminLaunchPanel() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [data, setData] = useState<Payload | null>(null);
  const [film, setFilm] = useState<FilmAssets | null>(null);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`/api/admin/registrations?filter=${filter}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: Payload | null) => {
        if (active && payload) setData(payload);
      })
      .catch(() => undefined);
    fetch("/api/admin/film")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: FilmAssets | null) => {
        if (active && payload) setFilm(payload);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [filter]);

  async function upload(kind: "poster" | "video" | "subtitles", file: File) {
    setPending(true);
    setMessage("");
    const body = new FormData();
    body.set("kind", kind);
    body.set("file", file);
    const response = await fetch("/api/admin/film", { method: "POST", body });
    const payload = (await response.json().catch(() => null)) as { film?: FilmAssets } | null;
    if (!response.ok || !payload?.film) setMessage(t("registerFailed"));
    else {
      setFilm(payload.film);
      setMessage(t("adminFilmSaved"));
    }
    setPending(false);
  }

  const filterLabel = {
    all: t("adminFilterAll"),
    subscribed: t("adminFilterSubscribed"),
    unsubscribed: t("adminFilterUnsubscribed"),
  };

  return (
    <section className="mx-auto mt-20 max-w-[1680px] px-5 sm:px-8 lg:px-12">
      <h2 className="font-serif text-4xl">{t("adminRegistrations")}</h2>
      <p className="mt-4 max-w-2xl text-muted">{t("adminRegistrationsKicker")}</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="border border-ivory/10 bg-ink-2 px-6 py-8">
          <p className="label-meta text-gilt">{t("adminRegTotal")}</p>
          <p className="mt-4 font-serif text-5xl">{data?.total ?? "—"}</p>
        </div>
        <div className="border border-ivory/10 bg-ink-2 px-6 py-8">
          <p className="label-meta text-gilt">{t("adminRegSubscribed")}</p>
          <p className="mt-4 font-serif text-5xl">{data?.subscribed ?? "—"}</p>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
            className={cn(
              "label-meta min-h-12 border px-5 py-3",
              filter === item ? "border-gilt text-gilt" : "border-ivory/20 text-muted",
            )}
          >
            {filterLabel[item]}
          </button>
        ))}
      </div>
      <ul className="mt-8 divide-y divide-ivory/10 border-y border-ivory/10">
        {data && data.registrations.length === 0 ? (
          <li className="py-8 text-muted">{t("adminNoRegistrations")}</li>
        ) : null}
        {data?.registrations.map((entry) => (
          <li key={entry.email} className="grid gap-3 py-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-serif text-2xl">{entry.name}</p>
              <p className="mt-2 text-sm text-muted">{entry.email}</p>
            </div>
            <p className="text-sm text-muted lg:col-span-3">{entry.createdAt.slice(0, 10)}</p>
            <div className="lg:col-span-5 lg:text-right">
              <p className="label-meta">
                {entry.notifyLaunch ? t("adminConsentYes") : t("adminConsentNo")}
              </p>
              {entry.notifyConsentAt ? (
                <p className="mt-2 text-sm text-muted">{entry.notifyConsentAt.slice(0, 16).replace("T", " ")}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mt-20 font-serif text-4xl">{t("adminFilmAssets")}</h2>
      <p className="mt-4 max-w-2xl text-muted">{t("adminFilmKicker")}</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {(
          [
            ["poster", t("adminPoster"), film?.poster],
            ["video", t("adminVideo"), film?.video],
            ["subtitles", t("adminSubtitlesFile"), film?.subtitlesEn],
          ] as const
        ).map(([kind, label, current]) => (
          <form
            key={kind}
            className="border border-ivory/10 bg-ink-2 p-6"
            onSubmit={(event) => {
              event.preventDefault();
              const input = event.currentTarget.elements.namedItem("file");
              const file = input instanceof HTMLInputElement ? input.files?.[0] : undefined;
              if (file) void upload(kind, file);
            }}
          >
            <p className="label-meta text-gilt">{label}</p>
            <p className="mt-3 break-all text-sm text-muted">{current || t("adminNotSet")}</p>
            <input
              name="file"
              type="file"
              accept={kind === "poster" ? "image/*" : kind === "video" ? "video/mp4" : ".vtt,text/vtt"}
              className="mt-6 block w-full text-sm text-muted file:mr-4 file:border file:border-ivory/20 file:bg-transparent file:px-4 file:py-2 file:text-ivory"
            />
            <button
              type="submit"
              disabled={pending}
              className="label-meta mt-6 min-h-12 border border-gilt px-6 py-3 text-gilt disabled:opacity-50"
            >
              {t("adminUpload")}
            </button>
          </form>
        ))}
      </div>
      {message ? (
        <p className="mt-6 text-sm text-gilt" role="status">
          {message}
        </p>
      ) : null}
    </section>
  );
}
