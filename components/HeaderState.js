"use client";

import { useEffect } from "react";

// Marks the header as "scrolled" once the page moves, so CSS can switch it from
// transparent (over the hero) to the maroon glass bar. One passive listener, no re-renders.
export default function HeaderState() {
  useEffect(() => {
    const header = document.querySelector(".header");
    if (!header) return;
    let on = null;
    const update = () => {
      const next = window.scrollY > 24;
      if (next === on) return;
      on = next;
      if (on) header.setAttribute("data-scrolled", "");
      else header.removeAttribute("data-scrolled");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return null;
}
