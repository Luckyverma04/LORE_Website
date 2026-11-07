"use client";

import { useEffect, useState } from "react";

// The soft light that follows the mouse in a ".stage" section (moved by components/StageLight.js).
// It is NOT in the server HTML: it is created only after this component has mounted, i.e. after
// React has finished hydrating it. StageLight changes its style while the mouse moves, and doing
// that to server-rendered HTML could happen before hydration and cause a hydration mismatch error.
// Desktop with a mouse only, and not with reduced motion (phones never get it).
export default function StageGlow() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const fine = window.matchMedia("(pointer: fine)").matches;
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setShow(fine && !still);
    });
    return () => cancelAnimationFrame(id);
  }, []);
  return show ? <span className="stage-glow" /> : null;
}
