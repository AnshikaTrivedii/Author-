"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/layout/LanguageProvider";
import type { Copy } from "@/lib/locale";

type Memory = { id: string; text: Copy; createdAt: string };

export function MemoryWall() {
  const { t, loc, locale } = useLanguage();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function load() {
    const response = await fetch("/api/memories");
    if (!response.ok) return;
    const data = (await response.json()) as { memories: Memory[] };
    setMemories(data.memories);
  }

  useEffect(() => {
    void load();
  }, []);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    const payload =
      locale === "hi"
        ? { hi: text.trim(), en: text.trim() }
        : { en: text.trim(), hi: text.trim() };
    const response = await fetch("/api/memories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setPending(false);
    if (!response.ok) {
      setMessage(t("memoryInvalid"));
      return;
    }
    setText("");
    setMessage(t("memorySaved"));
    await load();
  }

  return (
    <section id="memory-wall" className="scroll-mt-28 bg-ink py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1680px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <p className="label-meta text-gilt">{t("memoryEyebrow")}</p>
          <h2 className="mt-6 font-serif text-5xl sm:text-6xl">{t("memoryHeading")}</h2>
          <p className="mt-6 max-w-md font-serif text-xl italic text-muted">
            {t("memoryKicker")}
          </p>
          <form onSubmit={onSubmit} className="mt-10">
            <label className="block">
              <span className="label-meta">{t("memoryLabel")}</span>
              <textarea
                required
                minLength={8}
                maxLength={280}
                rows={4}
                value={text}
                onChange={(event) => setText(event.target.value)}
                className="mt-3 w-full border border-ivory/15 bg-transparent px-4 py-3 text-ivory outline-none focus:border-gilt"
              />
            </label>
            <button
              type="submit"
              disabled={pending}
              className="label-meta mt-6 min-h-12 border border-gilt bg-gilt px-8 py-4 text-ink disabled:opacity-50"
            >
              {t("memorySubmit")}
            </button>
            {message ? (
              <p className="mt-4 text-sm text-gilt" role="status">
                {message}
              </p>
            ) : null}
          </form>
        </div>
        <ul className="divide-y divide-ivory/10 border-y border-ivory/10 lg:col-span-6 lg:col-start-7">
          {memories.map((memory) => (
            <li key={memory.id} className="py-8">
              <p className="font-serif text-2xl italic leading-snug">{loc(memory.text)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
