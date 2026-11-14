"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/layout/LanguageProvider";

type SessionRole = "reader" | "admin";

export function LoginPage({ role }: { role: SessionRole }) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, email, password }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        redirect?: string;
      };
      if (!response.ok || !data.ok || !data.redirect) {
        setError(data.error === "invalid" ? t("loginInvalid") : t("loginFailed"));
        setPending(false);
        return;
      }
      window.location.assign(data.redirect);
    } catch {
      setError(t("loginFailed"));
      setPending(false);
    }
  }

  return (
    <main id="main" className="bg-ink">
      <section className="mx-auto grid min-h-[100svh] max-w-[1680px] items-center gap-16 px-5 pt-36 pb-20 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pt-44">
        <div className="lg:col-span-5">
          <p className="label-meta text-gilt">{t(role === "admin" ? "adminAccount" : "signIn")}</p>
          <h1 className="mt-6 font-serif text-6xl leading-[0.9] tracking-[-0.03em] sm:text-8xl">
            {t(role === "admin" ? "headingAdmin" : "headingLogin")}
          </h1>
          <p className="mt-8 max-w-md font-serif text-2xl italic text-muted">
            {t(role === "admin" ? "adminKicker" : "loginKicker")}
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="border border-ivory/10 bg-ink-2 p-8 sm:p-10 lg:col-span-6 lg:col-start-7"
        >
          <label className="block">
            <span className="label-meta">{t("email")}</span>
            <input
              type="email"
              name="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none transition-colors focus:border-gilt"
            />
          </label>

          <label className="mt-8 block">
            <span className="label-meta">{t("password")}</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none transition-colors focus:border-gilt"
            />
          </label>

          {error ? (
            <p className="mt-6 text-sm text-ivory" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="label-meta mt-10 inline-flex min-h-12 items-center justify-center border border-gilt bg-gilt px-8 py-4 text-ink transition-colors duration-500 hover:bg-transparent hover:text-ivory disabled:opacity-60"
          >
            {pending ? t("continue") : t("signIn")}
          </button>
          {role === "reader" ? (
            <p className="mt-8 text-sm text-ivory/80">
              <Link href="/#join" className="underline decoration-gilt/50 hover:text-gilt">
                {t("getLaunchLink")}
              </Link>
            </p>
          ) : null}
        </form>
      </section>
    </main>
  );
}
