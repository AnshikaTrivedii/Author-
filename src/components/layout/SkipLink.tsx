"use client";

import { useLanguage } from "@/components/layout/LanguageProvider";

export function SkipLink() {
  const { t } = useLanguage();

  return (
    <a className="skip-link" href="#main">
      {t("skip")}
    </a>
  );
}
