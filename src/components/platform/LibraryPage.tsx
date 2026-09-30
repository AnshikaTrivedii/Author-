"use client";

import { useEffect, useState } from "react";
import { CtaLink } from "@/components/ui/CtaLink";
import { PageIntro } from "@/components/ui/PageIntro";
import { SignOutButton } from "@/components/platform/SignOutButton";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { purchasedWorksFor } from "@/lib/library";

export function LibraryPage() {
  const { t } = useLanguage();
  const owned = purchasedWorksFor(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/session")
      .then((response) => response.json())
      .then((data: { session: { email: string } | null }) => {
        if (active) setEmail(data.session?.email ?? null);
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
        <div className="mt-12 flex flex-wrap items-center gap-8">
          {email ? <SignOutButton /> : <CtaLink href="/login">{t("signIn")}</CtaLink>}
          <CtaLink href="/works">{t("exploreWorks")}</CtaLink>
        </div>
      </div>
    </main>
  );
}
