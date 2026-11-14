"use client";

import { useEffect, useState } from "react";
import { CtaLink } from "@/components/ui/CtaLink";
import { PageIntro } from "@/components/ui/PageIntro";
import { SignOutButton } from "@/components/platform/SignOutButton";
import { useLanguage } from "@/components/layout/LanguageProvider";
import type { Copy } from "@/lib/locale";

export function LibraryPage() {
  const { t, loc } = useLanguage();
  const [owned, setOwned] = useState<Array<{ slug: string; title: Copy }>>([]);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/library")
      .then((response) => response.json())
      .then((data: { email?: string; works?: Array<{ slug: string; title: Copy }> }) => {
        if (active) {
          setEmail(data.email ?? null);
          setOwned(data.works ?? []);
        }
      })
      .catch(() => {
        if (active) setEmail(null);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro
        eyebrow={t("myLibrary")}
        title={t("headingLibraryAccount")}
        kicker={email ? `${t("signedInAs")} ${email}` : t("librarySignIn")}
      />
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        {owned.length === 0 ? (
          <p className="max-w-xl font-serif text-2xl italic text-muted">
            {t("libraryEmpty")}
          </p>
        ) : null}
        {owned.length > 0 ? (
          <ul className="space-y-5">
            {owned.map((work) => (
              <li key={work.slug}>
                <CtaLink href={`/works/${work.slug}`}>{loc(work.title)}</CtaLink>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-12 flex flex-wrap items-center gap-8">
          {email ? <SignOutButton /> : <CtaLink href="/login">{t("signIn")}</CtaLink>}
          <CtaLink href="/works">{t("exploreWorks")}</CtaLink>
        </div>
      </div>
    </main>
  );
}
