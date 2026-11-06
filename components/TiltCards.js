"use client";

import { useEffect } from "react";

// 3D tilt + light glare on cards under the mouse (desktop, no reduced motion).
// Only CSS variables are written (--rx, --ry, --gx, --gy), once per frame. The card's size is read
// once when the mouse enters it, never while it moves. Nothing runs before React has hydrated the card.
export default function TiltCards({ selector }) {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hydrated = (el) => Object.keys(el).some((k) => k.startsWith("__reactFiber"));
    const off = [];
    document.querySelectorAll(selector).forEach((card) => {
      let rect = null;
      let frame = 0;
      let px = 0.5;
      let py = 0.5;
      const draw = () => {
        frame = 0;
        card.style.setProperty("--ry", `${(px - 0.5) * 16}deg`);
        card.style.setProperty("--rx", `${(0.5 - py) * 14}deg`);
        card.style.setProperty("--gx", `${px * 100}%`);
        card.style.setProperty("--gy", `${py * 100}%`);
      };
      const enter = () => { if (hydrated(card)) rect = card.getBoundingClientRect(); };
      const move = (e) => {
        if (!rect) return;
        px = (e.clientX - rect.left) / rect.width;
        py = (e.clientY - rect.top) / rect.height;
        if (!frame) frame = requestAnimationFrame(draw);
      };
      const leave = () => {
        rect = null;
        cancelAnimationFrame(frame);
        frame = 0;
        if (!hydrated(card)) return;
        ["--rx", "--ry", "--gx", "--gy"].forEach((v) => card.style.removeProperty(v));
      };
      card.addEventListener("pointerenter", enter);
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      off.push(() => {
        card.removeEventListener("pointerenter", enter);
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
        cancelAnimationFrame(frame);
      });
    });
    return () => off.forEach((f) => f());
  }, [selector]);
  return null;
}
