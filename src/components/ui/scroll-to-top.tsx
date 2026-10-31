"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Next.js keeps the scroll position when the new page is already in view, which with our sticky
// header is almost always. Start every page change at the top instead, except for links to an
// anchor (#id) and back/forward navigation, where the browser restores the previous position.
export function ScrollToTop() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const isHistoryNavigation = useRef(false);

  useEffect(() => {
    const onPopState = () => { isHistoryNavigation.current = true; };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    if (isHistoryNavigation.current) { isHistoryNavigation.current = false; return; }
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
