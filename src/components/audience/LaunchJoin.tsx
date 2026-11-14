"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useLanguage } from "@/components/layout/LanguageProvider";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  notifyLaunch: boolean;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  notifyLaunch: false,
};

export function LaunchJoin() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<null | { notifyLaunch: boolean }>(null);

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
    if (form.name.trim().length < 2 || !emailOk || form.password.length < 8) {
      setError(t("registerInvalid"));
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError(t("registerMismatch"));
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          confirmPassword: form.confirmPassword,
          notifyLaunch: form.notifyLaunch,
        }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        notifyLaunch?: boolean;
      } | null;
      if (!response.ok || !data?.ok) {
        if (data?.error === "duplicate") setError(t("registerDuplicate"));
        else if (data?.error === "mismatch") setError(t("registerMismatch"));
        else if (data?.error === "rate") setError(t("registerRate"));
        else if (data?.error === "weak" || data?.error === "invalid") setError(t("registerInvalid"));
        else setError(t("registerFailed"));
        setPending(false);
        return;
      }
      setDone({ notifyLaunch: Boolean(data.notifyLaunch) });
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
                  {done.notifyLaunch ? t("confirmSubscribed") : t("confirmAccount")}
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="label-meta inline-flex min-h-12 items-center border border-gilt bg-gilt px-6 py-4 text-ink"
                  >
                    {t("continueExploring")}
                  </button>
                  <Link
                    href="/login"
                    className="label-meta inline-flex min-h-12 items-center border border-ivory/20 px-6 py-4 text-ivory"
                  >
                    {t("signIn")}
                  </Link>
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
                  <span className="label-meta">{t("password")}</span>
                  <input
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    value={form.password}
                    onChange={(event) => update("password", event.target.value)}
                    className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none focus:border-gilt"
                  />
                  <span className="mt-2 block text-sm text-muted">{t("passwordHint")}</span>
                </label>
                <label className="mt-6 block">
                  <span className="label-meta">{t("confirmPassword")}</span>
                  <input
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    onChange={(event) => update("confirmPassword", event.target.value)}
                    className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none focus:border-gilt"
                  />
                </label>
                <label className="mt-8 flex items-start gap-4 text-sm leading-relaxed text-ivory/85">
                  <input
                    type="checkbox"
                    checked={form.notifyLaunch}
                    onChange={(event) => update("notifyLaunch", event.target.checked)}
                    className="mt-1 size-5 shrink-0 accent-[#8f7558]"
                  />
                  <span className="min-w-0">{t("notifyConsent")}</span>
                </label>
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
                    {pending ? t("creatingAccount") : t("createAccount")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="label-meta min-h-12 px-4 text-muted hover:text-ivory"
                  >
                    {t("close")}
                  </button>
                </div>
                <p className="mt-6 text-sm text-muted">
                  {t("alreadyAccount")}{" "}
                  <Link href="/login" className="text-ivory underline decoration-gilt/50">
                    {t("signIn")}
                  </Link>
                </p>
              </form>
            )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
