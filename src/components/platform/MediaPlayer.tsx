"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Waveform({ active = false }: { active?: boolean }) {
  const reduce = useReducedMotion();
  const bars = Array.from({ length: 28 });

  return (
    <div className="flex h-16 items-end gap-1" aria-hidden="true">
      {bars.map((_, index) => (
        <motion.span
          key={index}
          className="w-1 origin-bottom bg-gilt/80"
          animate={
            reduce || !active
              ? { height: 8 + (index % 5) * 4 }
              : { height: [10, 18 + (index % 7) * 6, 12] }
          }
          transition={{
            duration: 1.4 + (index % 4) * 0.12,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function MediaPlayer({
  kind,
  src,
  poster,
  title,
  pendingLabel,
}: {
  kind: "audio" | "video";
  src: string | null;
  poster?: string | null;
  title: string;
  pendingLabel: string;
}) {
  if (!src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden border border-ivory/10 bg-ink-2 p-8",
          kind === "video" && "min-h-[46vw] lg:min-h-[28rem]",
        )}
      >
        {poster ? (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${poster})` }}
          />
        ) : null}
        <div className="relative">
          <p className="label-meta text-gilt">{title}</p>
          <p className="mt-6 max-w-md font-serif text-2xl italic text-muted">
            {pendingLabel}
          </p>
          <div className="mt-10">
            <Waveform active={false} />
          </div>
        </div>
      </div>
    );
  }

  if (kind === "audio") {
    return (
      <figure className="border border-ivory/10 bg-ink-2 p-8">
        <p className="label-meta text-gilt">{title}</p>
        <div className="mt-8">
          <Waveform active />
        </div>
        <audio className="mt-8 w-full" controls preload="none" src={src}>
          <track kind="captions" />
        </audio>
      </figure>
    );
  }

  return (
    <figure className="overflow-hidden border border-ivory/10 bg-ink-2">
      <video
        className="aspect-video w-full bg-ink"
        controls
        preload="none"
        poster={poster ?? undefined}
      >
        <source src={src} type="video/mp4" />
      </video>
      <figcaption className="label-meta px-6 py-4 text-muted">{title}</figcaption>
    </figure>
  );
}
