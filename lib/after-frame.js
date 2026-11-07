// Resolves right after the browser has drawn the next frame.
// At that moment style and layout are already up to date, so reading element sizes or positions
// (getBoundingClientRect, offsetHeight, GSAP ScrollTrigger measurements) costs almost nothing.
// Reading them at a random moment instead (e.g. just after a font swap or a style change) makes the
// browser lay out the page synchronously first: that is what Lighthouse reports as "forced reflow".
export function afterFrame() {
  return new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0)));
}

// Resolves when the browser is idle: after it has drawn a frame (layout up to date) and has nothing
// more urgent to do, so work started here neither forces a reflow nor blocks the page.
export function whenIdle(timeout = 800) {
  if (!("requestIdleCallback" in window)) return afterFrame();
  return new Promise((resolve) => requestIdleCallback(() => resolve(), { timeout }));
}
