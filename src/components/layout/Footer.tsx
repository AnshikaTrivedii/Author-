"use client";

import Link from "next/link";
import { footerGroups, footerLegal, platform } from "@/data/site";
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

          <nav aria-label="Footer" className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title.en}>
                <p className="label-meta text-gilt">{loc(group.title)}</p>
                <ul className="mt-4 grid gap-3">
                  {group.items.map((item) => (
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
              </div>
            ))}
          </nav>
        </div>

        <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-ivory/10 pt-8">
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

        <div className="mt-8 flex flex-col gap-2">
          <p className="label-meta">
            © 2026 {locale === "hi" ? platform.creatorNameHi : platform.creatorName}
          </p>
          <p className="label-meta text-muted">{t("allRights")}</p>
        </div>
      </div>
    </footer>
  );
}
