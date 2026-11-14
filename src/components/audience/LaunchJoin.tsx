"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/components/layout/LanguageProvider";

type FormState = {
  name: string;
  age: string;
  gender: "" | "male" | "female" | "non-binary" | "prefer-not-to-say";
  countryCode: string;
  mobileNumber: string;
  email: string;
  postalCode: string;
};

const emptyForm: FormState = {
  name: "",
  age: "",
  gender: "",
  countryCode: "+91",
  mobileNumber: "",
  email: "",
  postalCode: "",
};

export function LaunchJoin() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const openFromPage = () => setOpen(true);
    if (window.location.hash === "#join") openFromPage();
    window.addEventListener("loi-join", openFromPage);
    return () => window.removeEventListener("loi-join", openFromPage);
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setError("");

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    const countryDigits = form.countryCode.replace(/\D/g, "");
    const mobileDigits = form.mobileNumber.replace(/\D/g, "");
    const age = Number(form.age);
    if (
      form.name.trim().length < 2 ||
      !Number.isInteger(age) ||
      age < 1 ||
      age > 120 ||
      !form.gender ||
      countryDigits.length < 1 ||
      countryDigits.length > 3 ||
      mobileDigits.length < 6 ||
      mobileDigits.length > 14 ||
      countryDigits.length + mobileDigits.length > 15 ||
      !emailOk ||
      form.postalCode.trim().length < 3
    ) {
      setError(t("registerInvalid"));
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          age,
          gender: form.gender,
          countryCode: `+${countryDigits}`,
          mobileNumber: mobileDigits,
          email: form.email.trim(),
          postalCode: form.postalCode.trim(),
        }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;
      if (!response.ok || !data?.ok) {
        if (data?.error === "duplicate") setError(t("registerDuplicate"));
        else if (data?.error === "rate") setError(t("registerRate"));
        else if (data?.error === "invalid") setError(t("registerInvalid"));
        else setError(t("registerFailed"));
        setPending(false);
        return;
      }
      setDone(true);
      setPending(false);
    } catch {
      setError(t("registerFailed"));
      setPending(false);
    }
  }

  return (
    <section id="join" className="scroll-mt-28 border-t border-ivory/10 bg-ink py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1680px] items-end gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-7">
          <p className="label-meta text-gilt">{t("joinEyebrow")}</p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            {t("joinHeading")}
          </h2>
        </div>
        <div className="lg:col-span-5">
          <p className="max-w-md font-serif text-xl leading-snug text-ivory/80 italic">
            {t("joinBody")}
          </p>
          <button
            type="button"
            onClick={() => {
              setOpen(true);
              setError("");
            }}
            className="label-meta mt-8 inline-flex min-h-12 items-center border border-gilt bg-gilt px-8 py-4 text-ink transition-colors duration-500 hover:bg-transparent hover:text-ivory"
          >
            {t("joinCta")}
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/80 px-4 py-6 sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="join-title"
            className="relative max-h-[90svh] w-full max-w-xl overflow-hidden border border-ivory/15 bg-ink-2"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("close")}
              className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center text-ivory/70 transition-colors hover:text-ivory"
            >
              <X className="size-5" strokeWidth={1.25} aria-hidden />
            </button>
            <div className="max-h-[90svh] overflow-y-auto p-6 sm:p-10">
            {done ? (
              <div>
                <h2 id="join-title" className="pr-10 font-serif text-4xl leading-tight sm:text-5xl">
                  {t("confirmHeading")}
                </h2>
                <p className="mt-6 font-serif text-xl leading-snug text-ivory/85 italic">
                  {t("confirmSubscribed")}
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="label-meta inline-flex min-h-12 items-center border border-gilt bg-gilt px-6 py-4 text-ink"
                  >
                    {t("continueExploring")}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <h2 id="join-title" className="pr-10 font-serif text-4xl leading-tight">
                  {t("joinCta")}
                </h2>
                <label className="mt-8 block">
                  <span className="label-meta">{t("fullName")}</span>
                  <input
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none focus:border-gilt"
                  />
                </label>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="label-meta">{t("age")}</span>
                    <input
                      type="number"
                      required
                      min={1}
                      max={120}
                      inputMode="numeric"
                      value={form.age}
                      onChange={(event) => update("age", event.target.value)}
                      className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none focus:border-gilt"
                    />
                  </label>
                  <label className="block">
                    <span className="label-meta">{t("gender")}</span>
                    <select
                      required
                      value={form.gender}
                      onChange={(event) => update("gender", event.target.value as FormState["gender"])}
                      className="mt-3 w-full border border-ivory/15 bg-ink-2 px-4 py-3 text-ivory outline-none focus:border-gilt"
                    >
                      <option value="">{t("selectOption")}</option>
                      <option value="male">{t("genderMale")}</option>
                      <option value="female">{t("genderFemale")}</option>
                      <option value="non-binary">{t("genderNonBinary")}</option>
                      <option value="prefer-not-to-say">{t("genderPreferNot")}</option>
                    </select>
                  </label>
                </div>
                <div className="mt-6 grid grid-cols-[7rem_1fr] gap-4">
                  <label className="block">
                    <span className="label-meta">{t("countryCode")}</span>
                    <input
                      required
                      inputMode="tel"
                      value={form.countryCode}
                      onChange={(event) => update("countryCode", event.target.value)}
                      className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none focus:border-gilt"
                    />
                  </label>
                  <label className="block">
                    <span className="label-meta">{t("mobileNumber")}</span>
                    <input
                      type="tel"
                      required
                      autoComplete="tel-national"
                      inputMode="tel"
                      value={form.mobileNumber}
                      onChange={(event) => update("mobileNumber", event.target.value)}
                      className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none focus:border-gilt"
                    />
                  </label>
                </div>
                <label className="mt-6 block">
                  <span className="label-meta">{t("email")}</span>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none focus:border-gilt"
                  />
                </label>
                <label className="mt-6 block">
                  <span className="label-meta">{t("postalCode")}</span>
                  <input
                    required
                    autoComplete="postal-code"
                    value={form.postalCode}
                    onChange={(event) => update("postalCode", event.target.value)}
                    className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none focus:border-gilt"
                  />
                </label>
                <p className="mt-6 text-sm leading-relaxed text-ivory/70">
                  {t("notifyConsent")}
                </p>
                {error ? (
                  <p className="mt-6 text-sm text-ivory" role="alert">
                    {error}
                  </p>
                ) : null}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={pending}
                    className="label-meta inline-flex min-h-12 items-center border border-gilt bg-gilt px-6 py-4 text-ink disabled:opacity-50"
                  >
                    {pending ? t("submittingNotification") : t("submitNotification")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="label-meta min-h-12 px-4 text-muted hover:text-ivory"
                  >
                    {t("close")}
                  </button>
                </div>
              </form>
            )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
