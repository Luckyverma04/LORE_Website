"use client";

import { useEffect } from "react";

/**
 * Home page motion: GSAP / ScrollTrigger on top of the browser's own (native) scrolling.
 *
 * Rules that keep SEO and speed safe:
 * - All content is in the server HTML and fully visible without JavaScript.
 * - Nothing runs until React has hydrated the page (avoids hydration mismatch errors).
 * - GSAP is loaded with dynamic import AFTER hydration, so it never blocks the first paint.
 * - The "What is Lore?" paragraph (the LCP element) is never hidden or delayed.
 * - prefers-reduced-motion: nothing runs.
 */
export default function HomeAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup = () => {};
    const isDesktop = window.matchMedia("(min-width: 900px) and (pointer: fine)").matches;
    // Let the browser breathe between setup steps, so no single task blocks the page for long.
    const pause = () => new Promise((r) => setTimeout(r, 0));

    // React marks each element it hydrates with a "__reactFiber..." key.
    const hydrated = (el) => !el || Object.keys(el).some((k) => k.startsWith("__reactFiber"));
    let tries = 0;
    let timer;

    const run = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      await pause();

      // Native scroll (no smooth-scroll library): fastest and most responsive on every device.
      // Simple fade-up reveals (headings, intro lines, cards, steps, FAQ) are done with CSS +
      // IntersectionObserver in components/ScrollReveal.js: no layout reads, no forced reflow.
      // GSAP is used only for effects tied to the scroll position (scrub) and for pointer effects.
      const bar = document.querySelector(".scroll-progress");

      // Each group below is set up in its own short task (with a pause in between).
      const ctx = gsap.context(() => {});
      const off = [];
      cleanup = () => {
        off.forEach((f) => f());
        ctx.revert();
      };
      const step = async (fn) => {
        if (cancelled) return;
        ctx.add(fn);
        await pause();
      };

      await step(() => {
        if (bar) {
          gsap.to(bar, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
        }

        // Hero entrance is pure CSS (runs before JS). Here: hero parallax while scrolling away.
        gsap.to(".hero-visual", { y: 90, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
        gsap.to(".hero .hero-grid > div:first-child", { y: 40, opacity: 0.35, ease: "none", scrollTrigger: { trigger: ".hero", start: "40% top", end: "bottom top", scrub: true } });
      });

      await step(() => {
        // the film strip straightens out as it crosses the screen; the big words drift the other way
        gsap.fromTo(".marquee", { rotate: -8 }, { rotate: -1.5, ease: "none", scrollTrigger: { trigger: ".film", start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(".film-words", { xPercent: 0 }, { xPercent: -12, ease: "none", scrollTrigger: { trigger: ".film", start: "top bottom", end: "bottom top", scrub: true } });
      });

      await step(() => {
        // ---------- App screenshots: a deck of cards that opens as you scroll ----------
        const preview = document.querySelector(".preview");
        const screens = gsap.utils.toArray(".preview .shot");
        if (preview && screens.length) {
          if (isDesktop) {
            // Desktop: all cards start stacked in the middle like a closed deck, slightly fanned,
            // and spread out to their places, tied to the scroll position.
            // All positions are measured first in one batch, before GSAP writes any style.
            const p = preview.getBoundingClientRect();
            const centre = p.left + p.width / 2;
            const dx = screens.map((el) => {
              const r = el.getBoundingClientRect();
              return centre - (r.left + r.width / 2);
            });
            screens.forEach((el) => (el.style.transition = "none")); // CSS hover transition would fight the scrub
            const mid = (screens.length - 1) / 2;
            gsap.fromTo(
              screens,
              {
                x: (i) => dx[i],
                y: (i) => Math.abs(i - mid) * 18,
                rotate: (i) => (i - mid) * 7,
                scale: 0.9,
                zIndex: (i) => 10 - Math.round(Math.abs(i - mid) * 2),
              },
              {
                x: 0, y: 0, rotate: 0, scale: 1, ease: "power2.out",
                scrollTrigger: { trigger: preview, start: "top 85%", end: "top 30%", scrub: 0.8 },
              }
            );
          }
        }
      });

      await step(() => {
        // ---------- Closing curtain: the giant footer word fades up ----------
        gsap.from("footer p[aria-hidden]", { opacity: 0.15, ease: "none", scrollTrigger: { trigger: "footer", start: "top bottom", end: "bottom bottom", scrub: true } });
      });
      if (cancelled) return;

      // ---------- Desktop-only pointer effects ----------
      if (isDesktop) {
        // Magnetic Play buttons
        document.querySelectorAll(".play").forEach((btn) => {
          const move = (e) => {
            const r = btn.getBoundingClientRect();
            gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.3 });
          };
          const leave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
          btn.addEventListener("mousemove", move);
          btn.addEventListener("mouseleave", leave);
          off.push(() => { btn.removeEventListener("mousemove", move); btn.removeEventListener("mouseleave", leave); });
        });

        // 3D tilt on template cards and app screenshots
        document.querySelectorAll(".cat-card").forEach((card) => {
          const move = (e) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            gsap.to(card, { rotateY: px * 14, rotateX: -py * 14, transformPerspective: 700, duration: 0.4 });
          };
          const leave = () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
          card.addEventListener("mousemove", move);
          card.addEventListener("mouseleave", leave);
          off.push(() => { card.removeEventListener("mousemove", move); card.removeEventListener("mouseleave", leave); });
        });

        // Hero phone leans toward the mouse a little
        const hero = document.querySelector(".hero");
        if (hero) {
          const move = (e) => {
            const px = e.clientX / window.innerWidth - 0.5;
            const py = e.clientY / window.innerHeight - 0.5;
            gsap.to(".css-stage", { rotateY: px * 14, rotateX: -py * 8, duration: 0.9 });
          };
          hero.addEventListener("mousemove", move);
          off.push(() => hero.removeEventListener("mousemove", move));
        }
      }

      await pause();
      if (!cancelled) ScrollTrigger.refresh();
    };

    const waitForHydration = () => {
      if (cancelled) return;
      const sample = [document.querySelector(".hero h1"), document.querySelector("main details"), document.querySelector(".preview")];
      if (sample.every(hydrated) || ++tries > 100) {
        // Start when the browser is idle (page painted and ready), not in the middle of loading.
        if ("requestIdleCallback" in window) window.requestIdleCallback(() => !cancelled && run(), { timeout: 2000 });
        else run();
      } else timer = setTimeout(waitForHydration, 100);
    };
    timer = setTimeout(waitForHydration, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      cleanup();
    };
  }, []);

  // Scroll progress bar (filled by GSAP above).
  return <div className="scroll-progress" aria-hidden="true" />;
}
