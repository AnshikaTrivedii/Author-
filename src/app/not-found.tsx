"use client";

import Link from "next/link";
import { platform } from "@/data/site";
import { useLanguage } from "@/components/layout/LanguageProvider";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main
      id="main"
      className="flex min-h-[100svh] flex-col items-start justify-end bg-ink px-5 pb-24 pt-32 sm:px-8 lg:px-12"
    >
      <p className="label-meta text-gilt">404</p>
      <h1 className="mt-6 font-serif text-6xl leading-[0.9] sm:text-8xl">
        {t("notFoundTitle")}
      </h1>
      <p className="mt-8 max-w-md font-serif text-xl italic text-muted">
        {t("notFoundBody")} {platform.title}.
      </p>
      <Link href="/" className="label-meta mt-12 text-ivory" data-cursor="view">
        {t("returnHome")}
        <span className="ml-3 text-gilt" aria-hidden="true">
          →
        </span>
      </Link>
    </main>
  );
}
