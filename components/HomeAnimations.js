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

      // ---------- Scroll progress bar (sits right under the sticky header) ----------
      const bar = document.querySelector(".scroll-progress");
      const header = document.querySelector(".header");
      const setHeaderH = () => header && document.documentElement.style.setProperty("--header-h", `${header.offsetHeight}px`);
      setHeaderH();
      const ro = header ? new ResizeObserver(setHeaderH) : null;
      ro?.observe(header);
      // Elements that also have CSS hover transitions: switch those off while GSAP animates,
      // otherwise the CSS transition fights GSAP and the element gets stuck mid-animation.
      const enter = (targets, vars) =>
        gsap.from(targets, {
          ...vars,
          onStart() { gsap.utils.toArray(targets).forEach((el) => (el.style.transition = "none")); },
          onComplete() { gsap.set(targets, { clearProps: "transform,opacity,transition" }); },
        });

      // Each group below is set up in its own short task (with a pause in between).
      const ctx = gsap.context(() => {});
      const off = [];
      cleanup = () => {
        off.forEach((f) => f());
        ro?.disconnect();
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
        // ---------- Section headings and intro lines ----------
        gsap.utils.toArray("main section:not(.hero) h2").forEach((h) => {
          gsap.from(h, { yPercent: 35, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 90%", once: true } });
        });
        gsap.utils.toArray("main section:not(.hero) .lead").forEach((p) => {
          gsap.from(p, { y: 24, opacity: 0, duration: 0.8, delay: 0.1, ease: "power3.out", scrollTrigger: { trigger: p, start: "top 90%", once: true } });
        });

        // ---------- "Ek photo, kai andaaz" strip ----------
        gsap.from(".marquee", { opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".marquee", start: "top 90%", once: true } });
        // the film strip straightens out as it crosses the screen; the big words drift the other way
        gsap.fromTo(".marquee", { rotate: -8 }, { rotate: -1.5, ease: "none", scrollTrigger: { trigger: ".film", start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(".film-words", { xPercent: 0 }, { xPercent: -12, ease: "none", scrollTrigger: { trigger: ".film", start: "top bottom", end: "bottom top", scrub: true } });
      });

      await step(() => {

        // ---------- App screenshots: a deck of cards that opens as you scroll ----------
        const preview = document.querySelector(".preview");
        const screens = gsap.utils.toArray(".preview .shot");
        if (preview && screens.length) {
          screens.forEach((el) => (el.style.transition = "none")); // CSS hover transition would fight the scrub
          if (isDesktop) {
            // Desktop: all cards start stacked in the middle like a closed deck, slightly fanned,
            // and spread out to their places, tied to the scroll position.
            const mid = (screens.length - 1) / 2;
            gsap.fromTo(
              screens,
              {
                x: (i, el) => {
                  const p = preview.getBoundingClientRect();
                  const r = el.getBoundingClientRect();
                  return p.left + p.width / 2 - (r.left + r.width / 2);
                },
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
          } else {
            // Phones: simple rise in one by one (the row scrolls sideways, so no fan)
            enter(screens, { y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: preview, start: "top 88%", once: true } });
          }
        }
      });

      await step(() => {

        // ---------- "Kaise banta hai" steps rise one by one ----------
        const steps = gsap.utils.toArray('section[aria-labelledby="kaise-h"] ol > li');
        if (steps.length) {
          enter(steps, {
            y: 80, opacity: 0, rotateX: 12, transformOrigin: "50% 100%",
            duration: 0.9, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: steps[0], start: "top 85%", once: true },
          });
        }

        // ---------- Template cards ----------
        enter(".cat-row .cat-card", {
          x: 60, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: ".cat-row", start: "top 88%", once: true },
        });

        // ---------- Closing curtain: the giant footer word rises ----------
        gsap.from("footer p[aria-hidden]", { opacity: 0.15, ease: "none", scrollTrigger: { trigger: "footer", start: "top bottom", end: "bottom bottom", scrub: true } });

        // ---------- FAQ ----------
        gsap.from("main details", {
          y: 30, opacity: 0, duration: 0.6, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: "main details", start: "top 90%", once: true },
        });
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

  // Marker (server-rendered too) so ScrollReveal knows the home page has its own animations,
  // plus the scroll progress bar.
  return (
    <>
      <span data-home-motion hidden />
      <div className="scroll-progress" aria-hidden="true" />
    </>
  );
}
