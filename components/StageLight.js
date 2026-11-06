"use client";

import { useEffect } from "react";

// Desktop only: a soft light (.stage-glow) in each ".stage" section follows the mouse.
// - It is moved with transform only, so the section is never repainted.
// - Nothing is touched before React has hydrated the page: changing an element React has not
//   hydrated yet (class or style) causes a hydration mismatch error.
// - No layout is read while the mouse moves: each section's position on the page is measured
//   once (on load and resize) and the scroll position comes from the scroll event.
export default function StageLight() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    let sy = window.scrollY;
    let vh = window.innerHeight;
    let items = [];
    let ready = false;
    // React marks each element it has hydrated with a "__reactFiber..." key.
    const hydrated = (el) => Object.keys(el).some((k) => k.startsWith("__reactFiber"));

    const measure = () => {
      if (!ready) return;
      // one batch of reads: page position of every stage section
      sy = window.scrollY;
      vh = window.innerHeight;
      items = [...document.querySelectorAll(".stage-glow")].map((glow) => {
        const r = glow.parentElement.getBoundingClientRect();
        return { glow, top: r.top + sy, left: r.left, h: r.height };
      });
    };
    const draw = () => {
      frame = 0;
      items.forEach((it) => {
        const top = it.top - sy;
        if (top + it.h < 0 || top > vh) return;
        it.glow.style.transform = `translate3d(${x - it.left - 320}px, ${y - top - 210}px, 0)`;
        if (!it.on) { it.glow.classList.add("is-on"); it.on = true; }
      });
    };
    const live = document.getElementsByClassName("stage-glow"); // live list: updates on page change
    const onMove = (e) => {
      // after moving to another page the sections are new: wait for them to hydrate, then re-measure
      if (ready && (live.length !== items.length || items.some((it) => !it.glow.isConnected))) ready = false;
      if (!ready) {
        const glows = [...document.querySelectorAll(".stage-glow")];
        if (!glows.length || !glows.every(hydrated)) return; // page not hydrated yet: wait
        ready = true;
        measure();
      }
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const onScroll = () => { sy = window.scrollY; };

    window.addEventListener("load", measure);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("load", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}