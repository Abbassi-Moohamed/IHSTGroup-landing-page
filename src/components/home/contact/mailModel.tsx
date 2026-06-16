"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/mail.glb?v=2";

function MailModel() {
  const { scene } = useGLTF(MODEL_PATH);
  const meshRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase();
        const isCircle = /disc|ring|circle/.test(name);
        const isInner = /envelope|flap|envelop|inner/.test(name);

        if (isCircle) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#1a2f42",
            metalness: 0.3,
            roughness: 0.4,
          });
        } else if (isInner) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#922111",
            metalness: 0.3,
            roughness: 0.4,
          });
        }
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
      <group ref={meshRef} scale={0.8}>
        <primitive object={scene} />
      </group>
    </Float>
  );
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
