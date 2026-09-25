"use client";

import { cn } from "@/lib/utils";

export function StatusBadge({
  label,
  tone = "free",
}: {
  label: string;
  tone?: "free" | "paid" | "soon";
}) {
  return (
    <span
      className={cn(
        "label-meta inline-flex border px-3 py-1.5",
        tone === "paid" && "border-brown/70 text-ivory/80",
        tone === "soon" && "border-ivory/20 text-muted",
        tone === "free" && "border-gilt/50 text-gilt",
      )}
    >
      {label}
    </span>
  );
}
