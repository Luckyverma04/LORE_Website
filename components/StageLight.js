"use client";

import { useEffect } from "react";

// Desktop only: the soft light in every ".stage" section follows the mouse.
// Only two CSS variables change (--mx, --my), once per animation frame. No layout work.
export default function StageLight() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let last = null;
    const onMove = (e) => {
      last = e;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        document.querySelectorAll(".stage").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) return;
          el.style.setProperty("--mx", `${((last.clientX - r.left) / r.width) * 100}%`);
          el.style.setProperty("--my", `${((last.clientY - r.top) / r.height) * 100}%`);
        });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
