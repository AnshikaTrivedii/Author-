"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { visitorPath } from "@/data/audience";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function VisitorPath() {
  const { t, loc } = useLanguage();

  return (
    <section className="bg-ink-2 py-20 lg:py-28">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="label-meta text-gilt">{t("pathEyebrow")}</p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl sm:text-6xl">
            {t("pathHeading")}
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-10 lg:grid-cols-3">
          {visitorPath.map((item) => (
            <li key={item.step}>
              <Link href={item.href} className="group block">
                <p className="label-meta text-gilt">{item.step}</p>
                <h3 className="mt-4 font-serif text-3xl transition-colors group-hover:text-gilt">
                  {loc(item.title)}
                </h3>
                <p className="mt-4 text-muted">{loc(item.body)}</p>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
