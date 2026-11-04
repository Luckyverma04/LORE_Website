"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { CATEGORIES } from "@/lib/site";

// Categories that have a template image (lib/site.js). Each becomes one card in the ring.
const ITEMS = CATEGORIES.filter((c) => c.image);

// Category name drawn on a small canvas, shown under each card.
function labelTexture(text) {
  const c = document.createElement("canvas");
  c.width = 320; c.height = 80;
  const x = c.getContext("2d");
  x.fillStyle = "#a3322a";
  x.beginPath(); x.roundRect(4, 8, 312, 64, 32); x.fill();
  x.fillStyle = "#ffffff";
  x.font = "700 34px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
  x.textAlign = "center"; x.textBaseline = "middle";
  x.fillText(text, 160, 41);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/**
 * A slowly turning 3D ring of template cards, one per category, each with its name.
 * The mouse tilts the ring a little. Runs only while on screen; still frame for reduced motion.
 */
export default function Carousel3D({ onFail }) {
  const host = useRef(null);

  useEffect(() => {
    const el = host.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      onFail?.();
      return;
    }
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5)); // lighter on the GPU/CPU
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 1.2, 8.6);
    camera.lookAt(0, 0, 0);

    const ring = new THREE.Group();
    scene.add(ring);

    const loader = new THREE.TextureLoader();
    const cardGeo = new THREE.PlaneGeometry(1.25, 1.77);
    const labelGeo = new THREE.PlaneGeometry(1.25, 0.31);
    const R = 2.2;
    const items = ITEMS.map((item, i) => {
      const a = (i / ITEMS.length) * Math.PI * 2;
      const t = loader.load(item.image, () => draw(clock.getElapsedTime()));
      t.colorSpace = THREE.SRGBColorSpace;
      const mat = new THREE.MeshBasicMaterial({ map: t, side: THREE.DoubleSide, transparent: true });
      const card = new THREE.Mesh(cardGeo, mat);
      const lmat = new THREE.MeshBasicMaterial({ map: labelTexture(item.name), transparent: true, side: THREE.DoubleSide });
      const label = new THREE.Mesh(labelGeo, lmat);
      label.position.y = -1.13;
      const g = new THREE.Group();
      g.add(card, label);
      g.position.set(Math.sin(a) * R, 0, Math.cos(a) * R);
      g.rotation.y = a; // face outwards
      ring.add(g);
      return { mat, lmat, g };
    });

    const mouse = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!still) window.addEventListener("pointermove", onMove, { passive: true });

    const wp = new THREE.Vector3();
    const draw = (t) => {
      cur.x += (mouse.x - cur.x) * 0.06;
      cur.y += (mouse.y - cur.y) * 0.06;
      ring.rotation.y = (still ? 0 : t * 0.22) + cur.x * 0.4;
      ring.rotation.x = 0.08 + cur.y * 0.08;
      // cards at the back fade, so the front of the ring is easy to read
      items.forEach(({ mat, lmat, g }) => {
        g.getWorldPosition(wp);
        const front = (wp.z + R) / (2 * R); // 0 = back, 1 = front
        mat.opacity = 0.25 + 0.75 * front;
        lmat.opacity = front;
      });
      renderer.render(scene, camera);
    };

    const resize = () => {
      const w = el.clientWidth || 1, h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      draw(clock.getElapsedTime());
    };

    let raf = 0, visible = true;
    const clock = new THREE.Clock();
    let last = 0;
    // ~30 frames per second is smooth for slow motion and uses about half the CPU of 60.
    const loop = () => {
      const t = clock.getElapsedTime();
      if (t - last >= 1 / 30) { last = t; draw(t); }
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!still && !raf && visible && !document.hidden) raf = requestAnimationFrame(loop); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; visible ? start() : stop(); });
    io.observe(el);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    resize();
    start();

    return () => {
      stop(); ro.disconnect(); io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      items.forEach((it) => { it.mat.map?.dispose(); it.mat.dispose(); it.lmat.map?.dispose(); it.lmat.dispose(); });
      cardGeo.dispose(); labelGeo.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onFail]);

  return (
    <div className="hero3d" role="img" aria-label="3D ring of Lore template categories: Family, Friends, Relationships, Devotion, Patriotic, Girl, Guy and Vlog">
      <div ref={host} className="hero3d-canvas" aria-hidden="true" />
    </div>
  );
}
