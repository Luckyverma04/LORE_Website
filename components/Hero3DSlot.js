"use client";

import { lazy, Suspense, useCallback, useEffect, useState } from "react";

// three.js is downloaded ONLY on a wide screen with WebGL, and only after the visitor
// first interacts (moves the mouse, scrolls, touches or presses a key). Until then a light
// static placeholder holds the same space, so page load stays fast and nothing shifts.
// Phones never download three.js at all.
const MODELS = {
  phone: lazy(() => import("./Hero3D")),
  flow: lazy(() => import("./StepFlow3D")),
  carousel: lazy(() => import("./Carousel3D")),
};

const WAKE_EVENTS = ["pointermove", "pointerdown", "scroll", "wheel", "keydown", "touchstart"];

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

// Static stand-in for the flow/carousel models (same box size as the 3D, so no layout shift).
// The phone model's stand-in is server-rendered by HeroVisual instead.
function Placeholder({ model }) {
  if (model === "phone") return null;
  return <div className={model === "flow" ? "flow3d" : "hero3d"} aria-hidden="true" />;
}

// Props: model ("phone" | "flow" | "carousel"); for "phone" also screen and cards (images).
export default function Hero3DSlot({ model = "phone", screen, cards }) {
  const [wide, setWide] = useState(false);
  const [awake, setAwake] = useState(false);
  const onFail = useCallback(() => setWide(false), []);

  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(m.matches && hasWebGL());
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!wide || awake) return;
    const wake = () => setAwake(true);
    WAKE_EVENTS.forEach((e) => window.addEventListener(e, wake, { once: true, passive: true }));
    return () => WAKE_EVENTS.forEach((e) => window.removeEventListener(e, wake));
  }, [wide, awake]);

  if (!wide) return null;
  const Model = MODELS[model] || MODELS.phone;
  const fallback = <Placeholder model={model} />;
  if (!awake) return fallback;
  return (
    <Suspense fallback={fallback}>
      <Model onFail={onFail} screen={screen} cards={cards} />
    </Suspense>
  );
}
