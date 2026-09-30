"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/layout/LanguageProvider";

type Account = { role: "reader" | "admin"; email: string } | null;

export function AccountLink({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const { t } = useLanguage();
  const [account, setAccount] = useState<Account>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/session")
      .then((response) => response.json())
      .then((data: { session: Account }) => {
        if (active) setAccount(data.session);
      })
      .catch(() => {
        if (active) setAccount(null);
      });
    return () => {
      active = false;
    };
  }, []);

  const href = account?.role === "admin" ? "/admin" : account ? "/library" : "/login";
  const label =
    account?.role === "admin"
      ? t("adminAccount")
      : account
        ? t("myLibrary")
        : t("signIn");

  return (
    <Link href={href} className={className} onClick={onNavigate}>
      {label}
    </Link>
  );
}
