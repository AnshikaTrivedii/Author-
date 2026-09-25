"use client";

import { PlaceholderMedia } from "@/components/ui/PlaceholderMedia";

const stills = [
  "/images/stills/family-photo.jpg",
  "/images/stills/architecture.jpg",
  "/images/stills/grandmother.jpg",
  "/images/gallery/villages.jpg",
  "/images/stills/india-gate.jpg",
];

export function ArchiveStrip() {
  return (
    <section className="overflow-hidden bg-ink py-8" aria-hidden="true">
      <div className="flex gap-3 sm:gap-5">
        {stills.map((src, index) => (
          <PlaceholderMedia
            key={src}
            src={src}
            alt=""
            width={720}
            height={480}
            sizes="30vw"
            className={`h-44 w-[58vw] shrink-0 sm:h-64 sm:w-[32vw] ${index % 2 === 0 ? "mt-6" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}
