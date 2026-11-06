"use client";

import { useEffect } from "react";

// Desktop only: a soft light (.stage-glow) in each ".stage" section follows the mouse.
// It is moved with transform only, once per animation frame, so the browser never repaints the section.
export default function StageLight() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        document.querySelectorAll(".stage-glow").forEach((glow) => {
          const r = glow.parentElement.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) return;
          glow.style.transform = `translate3d(${x - r.left - 320}px, ${y - r.top - 210}px, 0)`;
          glow.classList.add("is-on");
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
