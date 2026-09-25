"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navItems, platform } from "@/data/site";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { cn } from "@/lib/utils";
import { easeCinematic } from "@/lib/motion";

export function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { loc, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: easeCinematic, delay: 0.2 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-700",
        scrolled || open
          ? "border-b border-ivory/8 bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-[1680px] items-center justify-between gap-4 px-5 sm:h-[4.75rem] sm:px-8 lg:px-12"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="font-serif text-[0.68rem] tracking-[0.22em] text-ivory sm:text-[0.92rem] sm:tracking-[0.28em]"
        >
          {platform.title.toUpperCase()}
        </Link>

        <ul className="hidden items-center gap-6 lg:flex 2xl:gap-8">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-cursor="view"
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "label-meta relative py-2 whitespace-nowrap transition-colors duration-300",
                    active ? "text-ivory" : "hover:text-ivory",
                  )}
                >
                  {loc(item.label)}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-1 h-px origin-left bg-gilt transition-transform duration-500",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            );
          })}
          <li>
            <LanguageSwitch />
          </li>
        </ul>

        <div className="flex items-center gap-5 lg:hidden">
          <LanguageSwitch />
          <button
            type="button"
            className="label-meta text-ivory"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            {open ? t("close") : t("menu")}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeCinematic }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 bg-ink sm:top-[4.75rem] lg:hidden"
          >
            <ul className="flex h-full flex-col justify-center gap-1 px-6 pb-28 sm:px-10">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.07 * index,
                    duration: 0.6,
                    ease: easeCinematic,
                  }}
                >
                  <Link
                    href={item.href}
                    className="flex items-baseline gap-5 py-3"
                    onClick={() => setOpenPath(null)}
                  >
                    <span className="label-meta text-gilt">0{index + 1}</span>
                    <span className="font-serif text-4xl leading-none sm:text-6xl">
                      {loc(item.label)}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
