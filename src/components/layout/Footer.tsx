"use client";

import Link from "next/link";
import { footerLegal, footerPrimary, platform } from "@/data/site";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function Footer() {
  const { loc, t, locale } = useLanguage();

  return (
    <footer className="relative border-t border-ivory/10 bg-ink">
      <div className="mx-auto max-w-[1680px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="font-serif text-4xl leading-none tracking-[0.08em] sm:text-5xl">
              ECHOES
              <br />
              OF MEMORIES
            </p>
          </div>

          <nav aria-label="Footer" className="grid gap-12 sm:grid-cols-2">
            <ul className="grid gap-3">
              {footerPrimary.map((item) => (
                <li key={`${item.href}-${item.label.en}`}>
                  <Link
                    href={item.href}
                    className="label-meta text-ivory/80 transition-colors hover:text-gilt"
                  >
                    {loc(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="grid gap-3">
              {footerLegal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="label-meta text-muted transition-colors hover:text-gilt"
                  >
                    {loc(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-ivory/10 pt-6">
          <p className="label-meta">
            © 2026 {locale === "hi" ? platform.creatorNameHi : platform.creatorName}
          </p>
          <p className="label-meta text-muted">{t("allRights")}</p>
        </div>
      </div>
    </footer>
  );
}
