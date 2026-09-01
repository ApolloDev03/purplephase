"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function GoogleAdsConversion() {
  const pathname = usePathname();

  useEffect(() => {
    const conversionPages = [
      "/inquiry-thank-you",
      "/career-thank-you",
    ];

    if (
      conversionPages.includes(pathname) &&
      typeof window.gtag === "function"
    ) {
      window.gtag("event", "conversion", {
        send_to: "AW-983583154/tYw8CJLu7rYYELKTgdUD",
      });
    }
  }, [pathname]);

  return null;
}