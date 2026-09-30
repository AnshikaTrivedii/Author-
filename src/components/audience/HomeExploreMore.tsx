"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { navMoreItems } from "@/data/site";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function HomeExploreMore({ children }: { children: React.ReactNode }) {
  const { t, loc } = useLanguage();

  return (
    <section id="community" className="scroll-mt-28 border-t border-ivory/10 bg-ink-2 py-20 lg:py-28">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="label-meta text-gilt">{t("exploreCommunityEyebrow")}</p>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl sm:text-5xl">
            {t("exploreCommunityHeading")}
          </h2>
          <p className="mt-6 max-w-2xl text-muted">{t("exploreCommunityKicker")}</p>
        </Reveal>
        <div className="mt-16 space-y-20">{children}</div>
        <ul className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-ivory/10 pt-10">
          {navMoreItems.map((item) => (
            <li key={item.href}>
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
    </section>
  );
}
