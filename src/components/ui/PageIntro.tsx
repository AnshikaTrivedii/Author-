"use client";

import { Reveal } from "@/components/ui/Reveal";

export function PageIntro({
  eyebrow,
  title,
  kicker,
}: {
  eyebrow: string;
  title: string;
  kicker?: string;
}) {
  return (
    <header className="bg-ink px-5 pt-28 pb-4 sm:px-8 lg:px-12 lg:pt-36">
      <Reveal>
        <div className="mx-auto max-w-[1680px]">
          <p className="label-meta text-gilt">{eyebrow}</p>
          <h1 className="mt-6 max-w-5xl font-serif text-6xl leading-[0.86] tracking-[-0.03em] sm:text-8xl lg:text-[7.5rem]">
            {title}
          </h1>
          {kicker ? (
            <p className="mt-6 max-w-xl font-serif text-xl italic text-muted sm:text-2xl">
              {kicker}
            </p>
          ) : null}
        </div>
      </Reveal>
    </header>
  );
}
