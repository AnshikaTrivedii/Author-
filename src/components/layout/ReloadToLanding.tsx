"use client";

import { useEffect } from "react";

export function ReloadToLanding() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (nav?.type !== "reload") return;

    if (window.location.pathname !== "/") {
      window.location.replace("/");
      return;
    }

    const toTop = () => window.scrollTo(0, 0);
    toTop();
    requestAnimationFrame(toTop);
  }, []);

  return null;
}
