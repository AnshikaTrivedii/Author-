"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Offer, Work } from "@/data/types";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { accessLabel, isPriceReady } from "@/lib/commerce";
import { moneyLabel } from "@/lib/utils";

export function CheckoutForm({ work, offer }: { work: Work; offer: Offer }) {
  const { t, loc, locale } = useLanguage();
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [message, setMessage] = useState("");
  const ready = isPriceReady(work, offer);
  const canAttempt = terms && privacy && ready && work.status === "published";

  const rows = useMemo(
    () => [
      { label: t("product"), value: loc(work.title) },
      { label: t("format"), value: loc(offer.label) },
      { label: t("price"), value: moneyLabel(offer.price, locale) },
      { label: t("tax"), value: loc(work.tax.display) },
      { label: t("total"), value: moneyLabel(offer.price, locale) },
    ],
    [locale, loc, offer, t, work],
  );

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canAttempt) return;
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workSlug: work.slug, offerId: offer.id }),
    });
    const result = (await response.json()) as {
      status: string;
      redirectUrl?: string;
    };
    if (result.status === "ready" && result.redirectUrl) {
      window.location.assign(result.redirectUrl);
      return;
    }
    setMessage(t("gatewayPending"));
  }

  return (
    <form onSubmit={onSubmit} className="mt-16 max-w-2xl">
      <h2 className="font-serif text-4xl">{t("orderSummary")}</h2>
      <dl className="mt-10 divide-y divide-ivory/10 border-y border-ivory/10">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-6 py-5">
            <dt className="label-meta text-muted">{row.label}</dt>
            <dd className="font-serif text-2xl">{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-sm text-muted">{loc(accessLabel(offer.accessType))}</p>

      {work.status !== "published" ? (
        <p className="mt-8 font-serif text-xl italic text-muted">
          {t("purchaseForthcoming")}
        </p>
      ) : null}

      <label className="mt-10 flex items-start gap-4 text-sm text-ivory/85">
        <input
          type="checkbox"
          className="mt-1 size-5 accent-[#8f7558]"
          checked={terms}
          onChange={(event) => setTerms(event.target.checked)}
        />
        <span>
          {t("agreeTerms")}{" "}
          <Link href="/terms" className="underline decoration-gilt/50">
            {locale === "hi" ? "नियम" : "Terms"}
          </Link>
        </span>
      </label>
      <label className="mt-5 flex items-start gap-4 text-sm text-ivory/85">
        <input
          type="checkbox"
          className="mt-1 size-5 accent-[#8f7558]"
          checked={privacy}
          onChange={(event) => setPrivacy(event.target.checked)}
        />
        <span>
          {t("agreePrivacy")}{" "}
          <Link href="/privacy" className="underline decoration-gilt/50">
            {locale === "hi" ? "गोपनीयता" : "Privacy"}
          </Link>
        </span>
      </label>

      <button
        type="submit"
        disabled={!canAttempt}
        className="label-meta mt-10 inline-flex min-h-12 items-center border border-gilt bg-gilt px-8 py-4 text-ink disabled:cursor-not-allowed disabled:opacity-40"
      >
        {t("payNow")}
      </button>
      <p className="mt-6 max-w-md text-sm text-muted">
        {message || (ready ? t("gatewayPending") : t("payDisabled"))}
      </p>
    </form>
  );
}
