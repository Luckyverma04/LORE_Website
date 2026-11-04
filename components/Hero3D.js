"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

// Default images for the scene (all in /public). Each page can pass its own `screen` and `cards`.
const PHONE_SCREEN = "/screens/screen-1.webp";
const CARDS = [
  "/templates/patriotic.webp",
  "/templates/girl.webp",
  "/templates/family.webp",
  "/templates/guy.webp",
  "/templates/relationships.webp",
  "/templates/devotion.webp",
];

/**
 * A 3D phone showing the Lore app, with template cards floating around it.
 * Follows the mouse a little. Runs only while on screen. With reduced motion it draws one still frame.
 * Loaded only on desktop (see Hero3DSlot), so it never affects mobile speed.
 */
export default function Hero3D({ onFail, screen = PHONE_SCREEN, cards: cardList = CARDS }) {
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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.2, 14);
    scene.add(new THREE.AmbientLight(0xffffff, 1.3));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(4, 6, 8);
    scene.add(key);
    const rim = new THREE.PointLight(0xa3322a, 30, 30); // Lore maroon glow
    rim.position.set(-5, 2, -3);
    scene.add(rim);

    const loader = new THREE.TextureLoader();
    const tex = (src) => {
      const t = loader.load(src, () => draw(clock.getElapsedTime()));
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
      return t;
    };

    const world = new THREE.Group();
    scene.add(world);

    // Phone body + screen
    const phone = new THREE.Group();
    const bodyGeo = new RoundedBoxGeometry(2.7, 5.4, 0.28, 4, 0.32);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1d1a19, roughness: 0.35, metalness: 0.4 });
    phone.add(new THREE.Mesh(bodyGeo, bodyMat));
    const screenGeo = new THREE.PlaneGeometry(2.46, 4.1);
    const screenMat = new THREE.MeshBasicMaterial({ map: tex(screen) });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = 0.145;
    phone.add(screenMesh);
    world.add(phone);

    // Floating template cards in a ring around the phone
    const cardGeo = new THREE.PlaneGeometry(1.15, 1.62);
    const cards = cardList.map((src, i) => {
      const mat = new THREE.MeshBasicMaterial({ map: tex(src), side: THREE.DoubleSide, transparent: true });
      const mesh = new THREE.Mesh(cardGeo, mat);
      world.add(mesh);
      return { mesh, mat, a: (i / cardList.length) * Math.PI * 2, y: (i % 2 ? 1 : -1) * (0.6 + (i % 3) * 0.5) };
    });

    // Mouse: small turn and tilt
    const mouse = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!still) window.addEventListener("pointermove", onMove, { passive: true });

    const draw = (t) => {
      cur.x += (mouse.x - cur.x) * 0.06;
      cur.y += (mouse.y - cur.y) * 0.06;
      world.rotation.y = cur.x * 0.35;
      world.rotation.x = cur.y * 0.12;
      phone.rotation.y = -0.25 + (still ? 0 : Math.sin(t * 0.5) * 0.12);
      phone.position.y = still ? 0 : Math.sin(t * 0.8) * 0.12;
      cards.forEach((c, i) => {
        const a = c.a + (still ? 0 : t * 0.25);
        c.mesh.position.set(Math.cos(a) * 2.85, c.y + (still ? 0 : Math.sin(t + i) * 0.15), Math.sin(a) * 1.8);
        c.mesh.lookAt(camera.position.x, c.mesh.position.y, camera.position.z);
        c.mat.opacity = 0.55 + 0.45 * ((Math.sin(a) + 1) / 2); // cards behind the phone fade a little
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
    const loop = () => { draw(clock.getElapsedTime()); raf = requestAnimationFrame(loop); };
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
      cards.forEach((c) => { c.mat.map?.dispose(); c.mat.dispose(); });
      screenMat.map?.dispose(); screenMat.dispose(); bodyMat.dispose();
      bodyGeo.dispose(); screenGeo.dispose(); cardGeo.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onFail, screen, cardList]);

  return (
    <div className="hero3d" role="img" aria-label="3D view of the Lore app on a phone with template cards floating around it">
      <div ref={host} className="hero3d-canvas" aria-hidden="true" />
    </div>
  );
}
