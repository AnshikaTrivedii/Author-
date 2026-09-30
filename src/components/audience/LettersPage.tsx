"use client";

import { useState } from "react";
import { PageIntro } from "@/components/ui/PageIntro";
import { useLanguage } from "@/components/layout/LanguageProvider";

export function LettersPage() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setStatus("");
    const response = await fetch("/api/letters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    setPending(false);
    if (!response.ok) {
      setStatus(t("lettersInvalid"));
      return;
    }
    setName("");
    setEmail("");
    setMessage("");
    setStatus(t("lettersSent"));
  }

  return (
    <main id="main" className="bg-ink pb-28">
      <PageIntro
        eyebrow={t("lettersEyebrow")}
        title={t("lettersHeading")}
        kicker={t("lettersKicker")}
      />
      <form
        onSubmit={onSubmit}
        className="mx-auto max-w-[720px] space-y-8 px-5 sm:px-8 lg:px-12"
      >
        <label className="block">
          <span className="label-meta">{t("lettersName")}</span>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none focus:border-gilt"
          />
        </label>
        <label className="block">
          <span className="label-meta">{t("email")}</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none focus:border-gilt"
          />
        </label>
        <label className="block">
          <span className="label-meta">{t("lettersMessage")}</span>
          <textarea
            required
            minLength={20}
            maxLength={2000}
            rows={8}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none focus:border-gilt"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="label-meta min-h-12 border border-gilt bg-gilt px-8 py-4 text-ink disabled:opacity-50"
        >
          {t("lettersSend")}
        </button>
        {status ? (
          <p className="text-sm text-gilt" role="status">
            {status}
          </p>
        ) : null}
      </form>
    </main>
  );
}
