"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { cn } from "@/lib/utils";

export function AmbientSound() {
  const { t } = useLanguage();
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ source: AudioBufferSourceNode; gain: GainNode } | null>(null);

  useEffect(() => {
    return () => {
      nodesRef.current?.source.stop();
      void ctxRef.current?.close();
    };
  }, []);

  async function toggle() {
    if (on) {
      nodesRef.current?.source.stop();
      nodesRef.current = null;
      setOn(false);
      return;
    }

    const AudioCtx =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = ctxRef.current ?? new AudioCtx();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") await ctx.resume();

    const seconds = 2;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * 0.015;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 420;
    const gain = ctx.createGain();
    gain.gain.value = 0.035;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
    nodesRef.current = { source, gain };
    setOn(true);
  }

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      aria-pressed={on}
      className={cn(
        "fixed right-4 bottom-4 z-50 label-meta min-h-11 border px-4 py-2 backdrop-blur-md transition-colors sm:right-8 sm:bottom-8",
        on
          ? "border-gilt bg-ink/80 text-gilt"
          : "border-ivory/20 bg-ink/70 text-muted hover:text-ivory",
      )}
    >
      {on ? t("ambientOn") : t("ambientOff")}
    </button>
  );
}
