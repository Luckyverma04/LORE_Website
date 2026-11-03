"use client";

import { lazy, Suspense, useCallback, useEffect, useState } from "react";

// three.js is downloaded ONLY when this runs on a wide screen with WebGL.
// Phones never download it, so mobile speed (LCP) is not affected.
const Hero3D = lazy(() => import("./Hero3D"));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Hero3DSlot() {
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
  return (
    <Suspense fallback={null}>
      <Hero3D onFail={onFail} />
    </Suspense>
  );
}
