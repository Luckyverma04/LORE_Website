"use client";

import { lazy, Suspense, useCallback, useEffect, useState } from "react";

// three.js is downloaded ONLY when this runs on a wide screen with WebGL.
// Phones never download it, so mobile speed (LCP) is not affected.
// Which 3D model to show: "phone" (Home), "flow" (How it works), "carousel" (Templates).
const MODELS = {
  phone: lazy(() => import("./Hero3D")),
  flow: lazy(() => import("./StepFlow3D")),
  carousel: lazy(() => import("./Carousel3D")),
};

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

// Props: model ("phone" | "flow" | "carousel"); for "phone" also screen and cards (images).
export default function Hero3DSlot({ model = "phone", screen, cards }) {
  const [show, setShow] = useState(false);
  const onFail = useCallback(() => setShow(false), []);

  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)");
    const update = () => setShow(m.matches && hasWebGL());
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);

  if (!show) return null;
  const Model = MODELS[model] || MODELS.phone;
  return (
    <Suspense fallback={null}>
      <Model onFail={onFail} screen={screen} cards={cards} />
    </Suspense>
  );
}
