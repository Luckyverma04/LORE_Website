"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { STEPS } from "@/lib/site";

// Template images that travel through the steps (files in /public/templates).
const TRAVELLERS = ["/templates/girl.webp", "/templates/family.webp", "/templates/patriotic.webp"];

/**
 * Four pads on a diagonal, one per step of using Lore (same steps as the list on the page).
 * Template cards hop from pad to pad, and each pad glows maroon when a card lands on it.
 * Step names are real HTML next to each pad. Runs only while on screen; still frame for reduced motion.
 * Adapted from the LeadFlow3D pattern.
 */
export default function StepFlow3D({ onFail }) {
  const host = useRef(null);
  const tags = useRef([]);

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
    el.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(4, 8, 7);
    scene.add(key);

    const world = new THREE.Group();
    scene.add(world);

    // Pads (one per step)
    const padGeo = new RoundedBoxGeometry(1.5, 0.22, 1.5, 3, 0.08);
    const padEdge = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.5, 0.22, 1.5));
    const lineMat = new THREE.LineBasicMaterial({ color: 0xd9c9bf, transparent: true, opacity: 0.9 });
    const pts = STEPS.map((_, i) => new THREE.Vector3(-1.7 + i * 0.45, 2.2 - i * 1.45, 0));
    const pads = STEPS.map((_, i) => {
      const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, emissive: 0xa3322a });
      const mesh = new THREE.Mesh(padGeo, mat);
      mesh.position.copy(pts[i]);
      mesh.add(new THREE.LineSegments(padEdge, lineMat));
      world.add(mesh);
      return { mat, glow: 0, anchor: new THREE.Vector3(pts[i].x + 0.95, pts[i].y, 0) };
    });

    // Dashed path between the pads
    const pathGeo = new THREE.BufferGeometry().setFromPoints(
      pts.slice(0, -1).flatMap((p, i) => [p.clone().setY(p.y - 0.05), pts[i + 1].clone().setY(pts[i + 1].y - 0.05)])
    );
    const pathMat = new THREE.LineDashedMaterial({ color: 0x5c5552, dashSize: 0.12, gapSize: 0.12, transparent: true, opacity: 0.8 });
    const path = new THREE.LineSegments(pathGeo, pathMat);
    path.computeLineDistances();
    world.add(path);

    // Travelling template cards
    const loader = new THREE.TextureLoader();
    const cardGeo = new THREE.PlaneGeometry(0.85, 1.2);
    const cards = TRAVELLERS.map((src) => {
      const t = loader.load(src, () => draw(clock.getElapsedTime()));
      t.colorSpace = THREE.SRGBColorSpace;
      const mat = new THREE.MeshBasicMaterial({ map: t, side: THREE.DoubleSide });
      const m = new THREE.Mesh(cardGeo, mat);
      world.add(m);
      return { m, mat };
    });

    const mouse = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!still) window.addEventListener("pointermove", onMove, { passive: true });

    const L = 4.8, ease = (f) => f * f * (3 - 2 * f), v = new THREE.Vector3();
    const draw = (t) => {
      cur.x += (mouse.x - cur.x) * 0.06;
      cur.y += (mouse.y - cur.y) * 0.06;
      world.rotation.y = -0.55 + cur.x * 0.18;
      world.rotation.x = 0.32 + cur.y * 0.05;
      const us = cards.map((_, k) => (still ? [0.4, 1.5, 2.6][k] : (((t * 0.5 + k * (L / 3)) % L) + L) % L));
      pads.forEach((p) => { p.glow = 0; });
      cards.forEach(({ m }, k) => {
        const u = us[k];
        const seg = Math.min(2, Math.floor(u)), f = u >= 3 ? 1 : ease(u - seg);
        m.position.lerpVectors(pts[Math.min(3, seg)], pts[Math.min(3, seg + 1)], f);
        m.position.y += 0.75 + (u < 3 ? Math.sin(Math.PI * (u - seg)) * 0.55 : 0);
        m.rotation.y = 0.55 + Math.sin(u * 2) * 0.25; // face the camera, with a little swing
        const sc = u < 0.3 ? u / 0.3 : u > 3.4 ? Math.max(0, 1 - (u - 3.4) / 1.2) : 1;
        m.scale.setScalar(Math.max(0.001, sc));
        pads.forEach((p, i) => {
          p.glow = Math.max(p.glow, Math.max(0, 1 - Math.abs(Math.min(u, 3) - i) * 1.8) * (sc > 0.2 ? 1 : 0));
        });
      });
      pads.forEach((p) => { p.mat.emissiveIntensity = p.glow * 0.55; });
      renderer.render(scene, camera);

      // keep the HTML step labels next to their pads
      world.updateMatrixWorld();
      const w = el.clientWidth, h = el.clientHeight;
      pads.forEach((p, i) => {
        const tag = tags.current[i];
        if (!tag) return;
        v.copy(p.anchor).applyMatrix4(world.matrixWorld).project(camera);
        tag.style.transform = `translate(${(v.x * 0.5 + 0.5) * w}px, ${(-v.y * 0.5 + 0.5) * h}px) translateY(-50%)`;
        tag.style.opacity = "1";
        tag.classList.toggle("is-active", p.glow > 0.5);
      });
    };

    const resize = () => {
      const w = el.clientWidth || 1, h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const tn = Math.tan((camera.fov * Math.PI) / 360);
      camera.position.set(0.9, 0.3, Math.max(11, 3.6 / (camera.aspect * tn)));
      camera.lookAt(0.9, 0, 0);
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
      pads.forEach((p) => p.mat.dispose());
      cards.forEach((c) => { c.mat.map?.dispose(); c.mat.dispose(); });
      padGeo.dispose(); padEdge.dispose(); cardGeo.dispose(); pathGeo.dispose();
      lineMat.dispose(); pathMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onFail]);

  return (
    <div ref={host} className="flow3d" role="img"
      aria-label="3D animation of template cards moving through the four steps of Lore: install, pick a template, add your photo, share your video">
      {STEPS.map((s, i) => (
        <div key={s.title} ref={(n) => { tags.current[i] = n; }} aria-hidden="true" className="flow3d-tag">
          <span className="flow3d-num">{i + 1}</span>
          {s.title}
        </div>
      ))}
    </div>
  );
}
