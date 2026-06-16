"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/mail.glb?v=3";

function SplitModel({ scene }: { scene: THREE.Group }) {
  const circleRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const { circleGeo, innerGeo } = useMemo(() => {
    let circleGeo: THREE.BufferGeometry | null = null;
    let innerGeo: THREE.BufferGeometry | null = null;

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const geo = child.geometry.clone();
        const pos = geo.attributes.position;
        const idx = geo.index!;
        const verts = pos.array;
        const faces: number[][] = [];

        for (let i = 0; i < idx.count; i += 3) {
          const ia = idx.getX(i) * 3;
          const ib = idx.getX(i + 1) * 3;
          const ic = idx.getX(i + 2) * 3;
          const cx = (verts[ia] + verts[ib] + verts[ic]) / 3;
          const cz = (verts[ia + 2] + verts[ib + 2] + verts[ic + 2]) / 3;
          const dist = Math.sqrt(cx * cx + cz * cz);
          faces.push([idx.getX(i), idx.getX(i + 1), idx.getX(i + 2), dist]);
        }

        const distances = faces.map((f) => f[3]).sort((a, b) => a - b);
        const threshold = distances[Math.floor(distances.length * 0.5)];

        const circleVerts = new Map<number, number>();
        const innerVerts = new Map<number, number>();
        const circleIdx: number[] = [];
        const innerIdx: number[] = [];

        for (const [ia, ib, ic, dist] of faces) {
          const target = dist > threshold ? { map: circleVerts, idx: circleIdx } : { map: innerVerts, idx: innerIdx };
          for (const v of [ia, ib, ic]) {
            if (!target.map.has(v)) {
              target.map.set(v, target.map.size);
              target.idx.push(v);
            }
          }
        }

        function buildGeo(vertMap: Map<number, number>, indices: number[]) {
          const positions: number[] = [];
          const newIdx: number[] = [];
          const ordered = new Map<number, number>();
          let counter = 0;
          for (const faceIdx of indices) {
            if (!ordered.has(faceIdx)) {
              ordered.set(faceIdx, counter++);
              positions.push(verts[faceIdx * 3], verts[faceIdx * 3 + 1], verts[faceIdx * 3 + 2]);
            }
            newIdx.push(ordered.get(faceIdx)!);
          }

          const g = new THREE.BufferGeometry();
          g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
          g.setIndex(newIdx);
          g.computeVertexNormals();
          return g;
        }

        circleGeo = buildGeo(circleVerts, circleIdx);
        innerGeo = buildGeo(innerVerts, innerIdx);
      }
    });

    return { circleGeo, innerGeo };
  }, [scene]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
      <group ref={groupRef} scale={0.8}>
        {circleGeo && (
          <mesh ref={circleRef} geometry={circleGeo}>
            <meshStandardMaterial color="#1a2f42" metalness={0.3} roughness={0.4} />
          </mesh>
        )}
        {innerGeo && (
          <mesh ref={innerRef} geometry={innerGeo}>
            <meshStandardMaterial color="#922111" metalness={0.3} roughness={0.4} />
          </mesh>
        )}
      </group>
    </Float>
  );
}

function MailModel() {
  const { scene } = useGLTF(MODEL_PATH);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);
  }, [scene]);

  return <SplitModel scene={scene} />;
}

export function EarthModel() {
  return (
    <div className="h-80 w-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} />
        <directionalLight position={[-3, -1, -3]} intensity={0.4} />
        <MailModel />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
