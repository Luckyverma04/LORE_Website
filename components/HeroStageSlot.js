"use client";

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";

// The React Three Fiber scene is downloaded ONLY on a wide screen with WebGL (not with reduced motion),
// and only after the visitor first interacts (moves the mouse, scrolls, presses a key).
// Until then the CSS 3D stage (server-rendered in HeroVisual) is shown, so page load stays fast.
// Phones never download three.js; they keep the CSS 3D stage.
const StageScene = lazy(() => import("./three/StageScene"));
const WAKE_EVENTS = ["pointermove", "pointerdown", "scroll", "wheel", "keydown"];

function canUseWebGL() {
  if (!window.matchMedia("(min-width: 1024px)").matches) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function HeroStageSlot() {
  const box = useRef(null);
  const [allowed, setAllowed] = useState(false);
  const [awake, setAwake] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)");
    const update = () => setAllowed(canUseWebGL());
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!allowed || awake) return;
    const wake = () => setAwake(true);
    WAKE_EVENTS.forEach((e) => window.addEventListener(e, wake, { once: true, passive: true }));
    return () => WAKE_EVENTS.forEach((e) => window.removeEventListener(e, wake));
  }, [allowed, awake]);

  // tell the parent .hero-visual so CSS can cross-fade from the CSS stage to the WebGL stage
  const setState = useCallback((v) => {
    const parent = box.current?.parentElement;
    if (parent) parent.dataset.webgl = v;
  }, []);
  const onReady = useCallback(() => setState("ready"), [setState]);
  const onFail = useCallback(() => {
    setState("off");
    setAllowed(false);
  }, [setState]);

  return (
    <div ref={box} className="webgl-layer" aria-hidden="true">
      {allowed && awake && (
        <Suspense fallback={null}>
          <StageScene onReady={onReady} onFail={onFail} />
        </Suspense>
      )}
    </div>
  );
}
