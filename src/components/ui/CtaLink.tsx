"use client";

import Link from "next/link";
import { cn, isPlaceholderHref } from "@/lib/utils";

type CursorKind = "view" | "explore" | "read" | "listen" | "watch";

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  cursor?: CursorKind;
  variant?: "line" | "solid";
};

export function CtaLink({
  href,
  children,
  className,
  cursor = "view",
  variant = "line",
}: CtaLinkProps) {
  const placeholder = isPlaceholderHref(href);
  const solidClass =
    "label-meta inline-flex min-h-12 items-center justify-center border border-gilt bg-gilt px-8 py-4 !text-ink shadow-[0_6px_20px_rgba(0,0,0,0.28)] transition-colors duration-500 hover:border-gilt hover:bg-transparent hover:!text-ivory";
  const lineClass =
    "group label-meta inline-flex min-h-12 items-center gap-3 text-ivory transition-colors duration-500 hover:text-gilt";
  const classes = cn(
    variant === "solid" ? solidClass : lineClass,
    placeholder && "pointer-events-none opacity-60",
    className,
  );

  const inner =
    variant === "solid" ? (
      children
    ) : (
      <>
        {children}
        <span className="relative block h-px w-12 overflow-hidden bg-gilt/25">
          <span className="absolute inset-0 origin-left scale-x-40 bg-gilt transition-transform duration-700 ease-out group-hover:scale-x-100" />
        </span>
      </>
    );

  if (placeholder) {
    return (
      <span aria-disabled="true" className={classes}>
        {inner}
      </span>
    );
  }

  return (
    <Link href={href} data-cursor={cursor} className={classes}>
      {inner}
    </Link>
  );
}
