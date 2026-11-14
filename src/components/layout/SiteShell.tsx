"use client";

import { usePathname } from "next/navigation";
import { AmbientSound } from "@/components/audience/AmbientSound";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ReloadToLanding } from "@/components/layout/ReloadToLanding";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SkipLink } from "@/components/layout/SkipLink";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <ReloadToLanding />
      <SkipLink />
      <ScrollProgress />
      <Navbar />
      {children}
      <Footer />
      <AmbientSound />
    </>
  );
}
