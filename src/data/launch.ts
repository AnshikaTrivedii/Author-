import type { AccessLevel } from "./types";

export const launchAt = "2026-11-16T00:00:00+05:30";
export const introOfferEnd = "2027-01-14T23:59:59.999+05:30";

export type LaunchPhase = "prelaunch" | "launch";
export type PhaseSetting = "auto" | LaunchPhase;
export type RegionCode = "IN" | "US";
export type PlanId = "preview" | "monthly" | "first-year" | "annual";
export type PaidPlanId = Exclude<PlanId, "preview">;
export type PayCurrency = "INR" | "USD";
export type PayMethod = "upi" | "card";

export type PlanPrice = {
  planId: PaidPlanId;
  currency: PayCurrency;
  amount: number;
  effectiveAt: string;
};

export type PublishingDefault = {
  series: string;
  volume: string;
  chapter: string;
  accessLevel: AccessLevel;
  contentLanguage: string;
  releaseDate: string;
  standaloneFilm: boolean;
};

export const publishingDefaults: Record<string, PublishingDefault> = {
  "work-01": {
    series: "स्मृतियों की अनुगूँज",
    volume: "1",
    chapter: "1",
    accessLevel: "sample",
    contentLanguage: "Hindi · English",
    releaseDate: "2026-11-16",
    standaloneFilm: false,
  },
  "work-02": {
    series: "एक सवाल अपने आप से",
    volume: "1",
    chapter: "1",
    accessLevel: "sample",
    contentLanguage: "Hindi · English",
    releaseDate: "2026-11-16",
    standaloneFilm: false,
  },
  "work-03": {
    series: "Indian Legacies",
    volume: "",
    chapter: "",
    accessLevel: "members",
    contentLanguage: "Hindi · English",
    releaseDate: "",
    standaloneFilm: false,
  },
};

export const launchPrices: PlanPrice[] = [
  { planId: "monthly", currency: "INR", amount: 79, effectiveAt: launchAt },
  { planId: "monthly", currency: "USD", amount: 3.99, effectiveAt: launchAt },
  { planId: "first-year", currency: "INR", amount: 365, effectiveAt: launchAt },
  { planId: "first-year", currency: "USD", amount: 24.99, effectiveAt: launchAt },
  { planId: "annual", currency: "INR", amount: 599, effectiveAt: launchAt },
  { planId: "annual", currency: "USD", amount: 34.99, effectiveAt: launchAt },
];

export function currencyFor(region: RegionCode): PayCurrency {
  return region === "US" ? "USD" : "INR";
}

export function methodFor(region: RegionCode): PayMethod {
  return region === "US" ? "card" : "upi";
}

export function formatMoney(amount: number, currency: PayCurrency) {
  if (currency === "USD") {
    return `US$${amount.toFixed(2)}`;
  }
  const rounded = Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
  return `₹${rounded}`;
}

export function addMonths(fromIso: string, months: number) {
  const date = new Date(fromIso);
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  const last = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, last));
  return date.toISOString();
}
