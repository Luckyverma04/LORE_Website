"use client";

import { Component, Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  RoundedBox,
  Sparkles,
  SpotLight,
  useTexture,
} from "@react-three/drei";

/**
 * Home hero 3D scene: "the stage".
 * A glossy phone showing the real Lore app screen stands in a gold spotlight,
 * while Polaroid prints of real Lore templates float around it. Gold dust drifts in the light.
 * - The scene leans toward the mouse, and turns / spreads out as you scroll away from the hero.
 * - Renders only while on screen. Loaded only on desktop (see components/HeroStageSlot.js).
 */

const SCREEN = "/screens/app-screen-1.webp";
const CARDS = [
  "/templates/patriotic.webp",
  "/templates/girl.webp",
  "/templates/family.webp",
  "/templates/guy.webp",
  "/templates/devotion.webp",
  "/templates/relationships.webp",
];

const GOLD = "#f3c27a";
const MAROON = "#e0574a";

function useSrgb(urls) {
  return useTexture(urls, (loaded) => {
    (Array.isArray(loaded) ? loaded : [loaded]).forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
    });
  });
}

function Phone() {
  const screen = useSrgb(SCREEN);
  return (
    <group>
      {/* body: dark maroon metal with a clear lacquer, so the studio lights glint on the edges */}
      <RoundedBox args={[2.6, 4.45, 0.24]} radius={0.3} smoothness={4}>
        <meshPhysicalMaterial color="#1b0d0b" metalness={0.85} roughness={0.28} clearcoat={1} clearcoatRoughness={0.06} />
      </RoundedBox>
      {/* the real app screen */}
      <mesh position={[0, 0, 0.125]}>
        <planeGeometry args={[2.4, 3.95]} />
        <meshBasicMaterial map={screen} toneMapped={false} />
      </mesh>
      {/* glass on top: picks up reflections from the environment */}
      <mesh position={[0, 0, 0.128]}>
        <planeGeometry args={[2.4, 3.95]} />
        <meshPhysicalMaterial transparent opacity={0.16} roughness={0.02} metalness={1} color="#ffffff" />
      </mesh>
      {/* camera notch */}
      <mesh position={[0, 2.1, 0.13]}>
        <capsuleGeometry args={[0.07, 0.36, 4, 12]} />
        <meshBasicMaterial color="#070403" />
      </mesh>
      {/* gold side button */}
      <mesh position={[1.31, 0.9, 0]}>
        <boxGeometry args={[0.04, 0.5, 0.1]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.25} />
      </mesh>
    </group>
  );
}

function Polaroid({ map, ...props }) {
  return (
    <group {...props}>
      <mesh>
        <planeGeometry args={[1.12, 1.62]} />
        <meshBasicMaterial color="#f3e9dc" side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.1, 0.004]}>
        <planeGeometry args={[0.98, 1.3]} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Cards({ progressRef }) {
  const maps = useSrgb(CARDS);
  const ring = useRef();
  const items = useMemo(
    () =>
      maps.map((map, i) => {
        const a = (i / maps.length) * Math.PI * 2;
        return { map, a, y: [0.9, -1.2, 1.7, -0.4, 0.2, -1.8][i], r: 3.3 + (i % 2) * 0.5, tilt: (i % 2 ? 1 : -1) * 0.18 };
      }),
    [maps]
  );

  useFrame((state, dt) => {
    const g = ring.current;
    if (!g) return;
    g.rotation.y += dt * 0.12;
    const spread = 1 + progressRef.current * 0.9;
    g.children.forEach((child, i) => {
      const it = items[i];
      child.position.set(Math.sin(it.a) * it.r * spread, it.y * (1 + progressRef.current * 0.6), Math.cos(it.a) * it.r * spread);
      // keep each print turned toward the viewer as the ring spins
      child.rotation.y = -g.rotation.y;
    });
  });

  return (
    <group ref={ring}>
      {items.map((it, i) => (
        <group key={i}>
          <Float speed={1.2 + i * 0.15} rotationIntensity={0.5} floatIntensity={0.9}>
            <Polaroid map={it.map} rotation={[0, 0, it.tilt]} />
          </Float>
        </group>
      ))}
    </group>
  );
}

function Rig({ progressRef, children }) {
  const group = useRef();
  const phone = useRef();
  // Hero height (on load and resize) and scroll position (in the scroll event) are read outside the
  // render loop. Reading them inside useFrame, right after other scripts change styles, would force
  // the browser to recalculate styles on every frame.
  const heroH = useRef(1);
  const scrollY = useRef(0);
  useEffect(() => {
    const measure = () => {
      const hero = document.querySelector(".hero");
      heroH.current = hero ? hero.offsetHeight : window.innerHeight;
    };
    const onScroll = () => { scrollY.current = window.scrollY; };
    measure();
    onScroll();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  useFrame((state, dt) => {
    // scroll progress of the hero (0 at the top, 1 when the hero has scrolled away)
    const h = heroH.current;
    const target = Math.min(1, Math.max(0, scrollY.current / h));
    progressRef.current = THREE.MathUtils.damp(progressRef.current, target, 6, dt);

    const p = progressRef.current;
    const g = group.current;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.35, 3, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.12 + p * 0.25, 3, dt);
    g.position.y = -p * 1.4;
    if (phone.current) {
      phone.current.rotation.y = -0.32 + p * 1.6 + Math.sin(state.clock.elapsedTime * 0.5) * 0.06;
      phone.current.rotation.z = 0.04 - p * 0.2;
    }
  });
  return (
    <group ref={group}>
      <group ref={phone}>{children}</group>
    </group>
  );
}

function Ready({ onReady }) {
  // runs once every texture above has loaded (this sits inside the same Suspense boundary)
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => onReady?.()));
    return () => cancelAnimationFrame(id);
  }, [onReady]);
  return null;
}

function Scene({ onReady }) {
  const progressRef = useRef(0);
  const target = useMemo(() => new THREE.Object3D(), []);
  return (
    <>
      <ambientLight intensity={0.25} />
      {/* the gold spotlight with a visible light cone */}
      <SpotLight
        position={[0.6, 7.5, 2.5]}
        target={target}
        color="#ffd9a0"
        intensity={120}
        distance={16}
        angle={0.42}
        penumbra={0.9}
        attenuation={9}
        anglePower={5}
        opacity={0.5}
      />
      <primitive object={target} position={[0, -1, 0]} />
      <pointLight position={[-4.5, 1, -2.5]} color={MAROON} intensity={45} distance={14} />
      <pointLight position={[4, -1.5, 3]} color={GOLD} intensity={14} distance={12} />

      <Rig progressRef={progressRef}>
        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.6}>
          <Phone />
        </Float>
      </Rig>
      <Cards progressRef={progressRef} />

      <Sparkles count={40} scale={[8, 6, 4]} size={2.2} speed={0.3} opacity={0.7} color={GOLD} />

      <ContactShadows position={[0, -2.72, 0]} opacity={0.7} scale={9} blur={2.4} far={5} resolution={128} frames={1} color="#000000" />

      {/* studio lights that only show up as reflections on the phone */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} color="#fff3e6" position={[0, 4, 6]} scale={[8, 1.4, 1]} />
        <Lightformer form="ring" intensity={4} color={MAROON} position={[-6, 0, -2]} scale={3} />
        <Lightformer form="rect" intensity={2} color={GOLD} position={[6, 1, 1]} scale={[1, 5, 1]} />
      </Environment>
      <Ready onReady={onReady} />
    </>
  );
}

class Boundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail?.();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function StageScene({ onReady, onFail }) {
  const host = useRef(null);
  const [visible, setVisible] = useState(true);

  // stop rendering when the hero is off screen (saves battery and CPU)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    if (host.current) io.observe(host.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} style={{ position: "absolute", inset: 0 }}>
      <Boundary onFail={onFail}>
        <Canvas
          dpr={[1, 1.25]}
          frameloop={visible ? "always" : "never"}
          camera={{ position: [0, 0.3, 14], fov: 34 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance", stencil: false }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <Suspense fallback={null}>
            <Scene onReady={onReady} />
          </Suspense>
        </Canvas>
      </Boundary>
    </div>
  );
}
