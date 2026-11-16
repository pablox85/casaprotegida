"use client";

import { useEffect, useState } from "react";

export function useDesktopMotion() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 44rem)");
    const updateIsDesktop = () => setIsDesktop(mediaQuery.matches);

    updateIsDesktop();
    mediaQuery.addEventListener("change", updateIsDesktop);

    return () => mediaQuery.removeEventListener("change", updateIsDesktop);
  }, []);

  return isDesktop;
}
