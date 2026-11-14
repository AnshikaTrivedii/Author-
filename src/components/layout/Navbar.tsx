"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, navMoreItems, platform } from "@/data/site";
import { AccountLink } from "@/components/layout/AccountLink";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";
import { LaunchTicker } from "@/components/layout/LaunchTicker";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { cn } from "@/lib/utils";
import { easeCinematic } from "@/lib/motion";
import { useHydratedReducedMotion } from "@/lib/reduced-motion";

function NavLink({
  item,
  pathname,
  className,
  onNavigate,
}: {
  item: (typeof navItems)[number];
  pathname: string;
  className?: string;
  onNavigate?: () => void;
}) {
  const { loc } = useLanguage();
  const active =
    pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      data-cursor="view"
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "label-meta relative py-2 whitespace-nowrap transition-colors duration-300",
        active ? "!text-ivory" : "!text-ivory/85 hover:!text-ivory",
        item.emphasis && !active && "text-ivory/90",
        className,
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
  );
}

export function Navbar() {
  const pathname = usePathname();
  const reduce = useHydratedReducedMotion();
  const { loc, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);
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

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen) return;
    const onPointer = (event: MouseEvent) => {
      if (!moreRef.current?.contains(event.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [moreOpen]);

  return (
    <>
    <motion.header
      initial={reduce ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: easeCinematic, delay: 0.2 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-700",
        scrolled || open
          ? "border-b border-ivory/10 bg-ink/90 backdrop-blur-md"
          : "border-b border-ivory/10 bg-ink/78 backdrop-blur-md",
      )}
    >
      <LaunchTicker />
      <nav
        className="mx-auto flex h-16 max-w-[1680px] items-center justify-between gap-4 px-5 sm:h-[4.75rem] sm:px-8 lg:px-12"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="min-w-0 truncate font-serif text-[0.62rem] tracking-[0.14em] !text-ivory sm:text-[0.92rem] sm:tracking-[0.28em]"
        >
          {platform.title.toUpperCase()}
        </Link>

        <ul className="hidden items-center gap-5 lg:flex xl:gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink item={item} pathname={pathname} />
            </li>
          ))}
          <li ref={moreRef} className="relative">
            <button
              type="button"
              aria-expanded={moreOpen}
              aria-haspopup="true"
              className="label-meta py-2 !text-ivory/85 transition-colors hover:!text-ivory"
              onClick={() => setMoreOpen((v) => !v)}
            >
              {t("navMore")}
            </button>
            <AnimatePresence>
              {moreOpen ? (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: easeCinematic }}
                  className="absolute top-full right-0 mt-2 min-w-[13rem] border border-ivory/10 bg-ink/95 py-3 backdrop-blur-md"
                >
                  <ul>
                    {navMoreItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          data-cursor="view"
                          className="label-meta block px-5 py-2 text-muted transition-colors hover:bg-ivory/5 hover:text-ivory"
                          onClick={() => setMoreOpen(false)}
                        >
                          {loc(item.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
          <li>
            <LanguageSwitch />
          </li>
        </ul>

        <div className="flex items-center gap-5">
          <AccountLink className="label-meta hidden whitespace-nowrap !text-ivory transition-colors hover:!text-gilt sm:inline" />
          <LanguageSwitch className="lg:hidden" />
          <button
            type="button"
            className="label-meta text-ivory lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            {open ? t("close") : t("menu")}
          </button>
        </div>
      </nav>
    </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeCinematic }}
            className="fixed inset-x-0 top-24 bottom-0 z-[45] overflow-y-auto bg-ink sm:top-[6.75rem] lg:hidden"
          >
            <div className="flex min-h-full flex-col px-6 py-8 sm:px-10">
              <div className="border-b border-ivory/10 pb-6">
                <AccountLink
                  className="label-meta text-gilt"
                  onNavigate={() => setOpenPath(null)}
                />
              </div>
              <p className="label-meta mt-8 text-muted">{t("menu")}</p>
              <ul className="mt-4 flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.04 * index,
                      duration: 0.5,
                      ease: easeCinematic,
                    }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-baseline gap-4 py-2"
                      onClick={() => setOpenPath(null)}
                    >
                      <span className="label-meta text-gilt">0{index + 1}</span>
                      <span className="font-serif text-3xl leading-none">
                        {loc(item.label)}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <p className="label-meta mt-10 text-muted">{t("navMore")}</p>
              <ul className="mt-4 grid gap-2">
                {navMoreItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="label-meta text-ivory/85 py-1"
                      onClick={() => setOpenPath(null)}
                    >
                      {loc(item.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
