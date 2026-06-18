"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import * as THREE from "three";

interface PathwayBackgroundProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  theme?: "dark" | "light";
}

/* ─── Data model ─── */

interface NodeData {
  pos: THREE.Vector3;
  radius: number;
  phase: number;
  speed: number;
  opacity: number;
}

interface ConnData {
  a: number;
  b: number;
}

interface TravelerData {
  from: number;
  to: number;
  progress: number;
  speed: number;
}

/* ─── Theme config ─── */

const THEME_CONFIG = {
  dark: {
    fog: "#050816",
    nodeColor: "#ffffff",
    connOpacity: 0.04,
    travelerColor: "#ffffff",
    travelerOpacity: 0.5,
    glowColor: "#ffffff",
    nodeOpacityScale: 1,
  },
  light: {
    fog: "#cbd5e1",
    nodeColor: "#475569",
    connOpacity: 0.18,
    travelerColor: "#64748b",
    travelerOpacity: 0.65,
    glowColor: "#475569",
    nodeOpacityScale: 1.4,
  },
} as const;

/* ─── Generators (deterministic — no Math.random) ─── */

const NODE_COUNT = 36;
const TRAVELER_COUNT = 14;

function buildNodes(): NodeData[] {
  const nodes: NodeData[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const t = i / (NODE_COUNT - 1);
    const spread = (1 - t) * 5.5 + 2.5;
    const angle = i * 2.3998;
    const r = ((i * 7 + 3) % 100) / 100 * spread;
    const x = Math.cos(angle) * r;
    const y = 4.6 - t * 9.2;
    const z = Math.sin(angle) * r * 0.5 + ((i * 13 + 5) % 100) / 100 * 0.8 - 0.4;
    nodes.push({
      pos: new THREE.Vector3(x, y, z),
      radius: 0.1 - t * 0.04,
      phase: (i * 2.1) % (Math.PI * 2),
      speed: 0.4 + ((i * 3) % 5) * 0.25,
      opacity: 0.5 - t * 0.25,
    });
  }
  return nodes;
}

function buildConns(nodes: NodeData[]): ConnData[] {
  const conns: ConnData[] = [];
  const counts = new Array(nodes.length).fill(0);
  const threshold = 4.0;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (counts[i] >= 3 || counts[j] >= 3) continue;
      const d = nodes[i].pos.distanceTo(nodes[j].pos);
      if (d < threshold) {
        conns.push({ a: i, b: j });
        counts[i]++;
        counts[j]++;
      }
    }
  }
  return conns;
}

function buildTravelers(conns: ConnData[]): TravelerData[] {
  const ts: TravelerData[] = [];
  for (let i = 0; i < TRAVELER_COUNT; i++) {
    const ci = i % conns.length;
    ts.push({
      from: conns[ci].a,
      to: conns[ci].b,
      progress: (i * 0.37) % 1,
      speed: 0.05 + ((i * 3) % 5) * 0.02,
    });
  }
  return ts;
}

/* ─── Glow texture (cached) ─── */

let _glowTexture: THREE.CanvasTexture | null = null;
function getGlowTexture(): THREE.CanvasTexture {
  if (_glowTexture) return _glowTexture;
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.15, "rgba(255,255,255,0.4)");
  g.addColorStop(0.5, "rgba(255,255,255,0.06)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  _glowTexture = new THREE.CanvasTexture(c);
  return _glowTexture;
}

/* ─── R3F sub-components ─── */

function Nodes({ nodes, themeKey }: { nodes: NodeData[]; themeKey: "dark" | "light" }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const cfg = THEME_CONFIG[themeKey];

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    for (let i = 0; i < nodes.length; i++) {
      const m = refs.current[i];
      if (m) {
        const pulse = 0.8 + 0.2 * Math.sin(t * nodes[i].speed + nodes[i].phase);
        m.scale.setScalar(pulse);
      }
    }
  });

  return (
    <group>
      {nodes.map((n, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          position={n.pos}
        >
          <sphereGeometry args={[n.radius, 14, 14]} />
          <meshBasicMaterial
            color={cfg.nodeColor}
            transparent
            opacity={Math.min(n.opacity * cfg.nodeOpacityScale, 1)}
          />
        </mesh>
      ))}
      {nodes.map((n, i) => (
        <sprite
          key={`g-${i}`}
          position={n.pos}
          scale={[n.radius * 5, n.radius * 5, 1]}
        >
          <spriteMaterial
            map={getGlowTexture()}
            color={cfg.glowColor}
            transparent
            opacity={Math.min(n.opacity * cfg.nodeOpacityScale * 0.35, 1)}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}

function Connections({ nodes, conns, themeKey }: { nodes: NodeData[]; conns: ConnData[]; themeKey: "dark" | "light" }) {
  const cfg = THEME_CONFIG[themeKey];
  const lines = useMemo(() => {
    const curveCache = new Map<number, THREE.Vector3[]>();
    return conns.map((c, i) => {
      const key = c.a * NODE_COUNT + c.b;
      if (!curveCache.has(key)) {
        const a = nodes[c.a].pos;
        const b = nodes[c.b].pos;
        const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
        mid.z += 0.4;
        curveCache.set(key, new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(10));
      }
      return { key: i, points: curveCache.get(key)! };
    });
  }, [nodes, conns]);

  return (
    <group>
      {lines.map((l) => (
        <Line
          key={l.key}
          points={l.points}
          color={cfg.nodeColor}
          opacity={cfg.connOpacity}
          transparent
          lineWidth={0.2}
        />
      ))}
    </group>
  );
}

function Travelers({
  nodes,
  conns,
  data,
  themeKey,
}: {
  nodes: NodeData[];
  conns: ConnData[];
  data: TravelerData[];
  themeKey: "dark" | "light";
}) {
  const cfg = THEME_CONFIG[themeKey];
  const count = data.length;
  const posArr = useMemo(() => new Float32Array(count * 3), [count]);
  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) s[i] = 0.08 + ((i * 3) % 5) * 0.025;
    return s;
  }, [count]);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [posArr, sizes]);

  const ref = useRef<THREE.Points>(null);
  const tempVec = new THREE.Vector3();

  useFrame(() => {
    for (let i = 0; i < count; i++) {
      const d = data[i];
      d.progress += d.speed * 0.008;
      if (d.progress > 1) d.progress = 0;
      tempVec.lerpVectors(nodes[d.from].pos, nodes[d.to].pos, d.progress);
      posArr[i * 3] = tempVec.x;
      posArr[i * 3 + 1] = tempVec.y;
      posArr[i * 3 + 2] = tempVec.z;
    }
    if (ref.current) {
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        map={getGlowTexture()}
        size={0.14}
        color={cfg.travelerColor}
        transparent
        opacity={cfg.travelerOpacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function Scene({ targetRef, themeKey }: { targetRef: React.RefObject<number>; themeKey: "dark" | "light" }) {
  const groupRef = useRef<THREE.Group>(null);
  const smoothRef = useRef(0);
  const nodes = useMemo(buildNodes, []);
  const conns = useMemo(() => buildConns(nodes), [nodes]);
  const travelers = useMemo(() => buildTravelers(conns), [conns]);

  useFrame(() => {
    const target = targetRef.current ?? 0;
    smoothRef.current += (target - smoothRef.current) * 0.035;
    const p = smoothRef.current;
    if (groupRef.current) {
      groupRef.current.position.y = THREE.MathUtils.lerp(3.2, -3.2, p);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(0.05, -0.05, p);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(0.03, -0.03, p);
    }
  });

  return (
    <group ref={groupRef}>
      <Nodes nodes={nodes} themeKey={themeKey} />
      <Connections nodes={nodes} conns={conns} themeKey={themeKey} />
      <Travelers nodes={nodes} conns={conns} data={travelers} themeKey={themeKey} />
    </group>
  );
}

/* ─── Public component ─── */

export function PathwayBackground({ containerRef, theme = "dark" }: PathwayBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const themeKey = theme;
  const cfg = THEME_CONFIG[themeKey];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const visible = useTransform(
    scrollYProgress,
    [0, 0.04, 0.96, 1],
    [0, 1, 1, 0],
  );
  const targetRef = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    targetRef.current = v;
  });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ opacity: visible, willChange: "opacity" }}
    >
      <Canvas
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
        camera={{ position: [0, 0, 12], fov: 46, near: 0.1, far: 40 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        dpr={[0.5, 1.5]}
      >
        <fogExp2 attach="fog" args={[new THREE.Color(cfg.fog), 0.016]} />
        <Scene targetRef={targetRef} themeKey={themeKey} />
      </Canvas>
    </motion.div>
  );
}
