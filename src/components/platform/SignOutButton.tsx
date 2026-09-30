"use client";

import { useState } from "react";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function SignOutButton() {
  const { t } = useLanguage();
  const [pending, setPending] = useState(false);

  return (
    <button
      type="button"
      className="label-meta min-h-12 text-ivory transition-colors hover:text-gilt disabled:opacity-50"
      disabled={pending}
      onClick={() => {
        setPending(true);
        void fetch("/api/session", { method: "DELETE" }).then(() => {
          window.location.assign("/login");
        });
      }}
    >
      {t("signOut")}
    </button>
  );
}
