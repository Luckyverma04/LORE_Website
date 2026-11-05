"use client";

import { useEffect } from "react";

// Scroll-reveal animations for the whole site.
// Content is ALWAYS visible in the HTML (good for Google and for users without JavaScript).
// Only after this script runs do we hide below-the-fold items and fade them in as they scroll into view.
const TARGETS = [
  "main section h2",
  ".lead:not(.hero .lead)",
  ".marquee",
  ".preview",          // horizontal rows are revealed as a whole, so cards that are
  ".cat-row",          // off to the side (only reachable by swiping) never stay hidden
  ".cat-grid .cat-card",
  "main ol > li",
  "main details",
  ".card",
].join(",");

export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    let io;
    let cancelled = false;

    const start = () => {
      if (cancelled) return;
      const els = [...document.querySelectorAll(TARGETS)].filter(
        // skip anything already on screen, so the first view never flickers
        (el) => el.getBoundingClientRect().top > window.innerHeight * 0.9
      );

      // stagger siblings (cards in a row come in one after another)
      els.forEach((el) => {
        const i = [...el.parentElement.children].indexOf(el);
        el.style.setProperty("--reveal-delay", `${Math.min(i, 6) * 80}ms`);
        el.classList.add("reveal");
      });

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
      );
      els.forEach((el) => io.observe(el));
    };

    // Wait until React has hydrated every target (React attaches a "__reactFiber..." key to each
    // element it hydrates). Changing className before that causes a hydration mismatch.
    const hydrated = (el) => Object.keys(el).some((k) => k.startsWith("__reactFiber"));
    let tries = 0;
    const waitForHydration = () => {
      if (cancelled) return;
      const all = [...document.querySelectorAll(TARGETS)];
      if (all.every(hydrated) || ++tries > 100) start(); // give up waiting after ~10s
      else timer = setTimeout(waitForHydration, 100);
    };
    let timer = setTimeout(waitForHydration, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      io?.disconnect();
    };
  }, []);

  return null;
}
