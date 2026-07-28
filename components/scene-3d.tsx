"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial, Sphere, Trail, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const particles = useRef<THREE.Points>(null);
  const count = 3000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color("#00d4ff");
    const green = new THREE.Color("#00ffa3");
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
      
      const color = Math.random() > 0.5 ? cyan : green;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y = state.clock.elapsedTime * 0.015;
      particles.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08} 
        vertexColors 
        transparent 
        opacity={0.9} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CyberSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 + mouse.y * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 + mouse.x * 0.3;
      meshRef.current.position.x = mouse.x * 0.5;
      meshRef.current.position.y = mouse.y * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[2.5, 128, 128]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#00d4ff"
          roughness={0.05}
          metalness={0.95}
          distort={0.4}
          speed={3}
          transparent
          opacity={0.7}
        />
      </Sphere>
      <Sphere args={[2.7, 64, 64]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>
    </Float>
  );
}

function FloatingRing({ position, color, size, speed }: { position: [number, number, number], color: string, size: number, speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.7;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[size, 0.05, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function OrbitingCube({ radius, speed, offset, color }: { radius: number, speed: number, offset: number, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed + offset;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = Math.sin(t * 2) * 0.5;
      meshRef.current.rotation.x = t;
      meshRef.current.rotation.y = t * 1.5;
    }
  });

  return (
    <Trail width={1} length={8} color={color} attenuation={(t) => t * t}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Trail>
  );
}

function DataStream() {
  const groupRef = useRef<THREE.Group>(null);
  const lines = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      x: (Math.random() - 0.5) * 30,
      z: (Math.random() - 0.5) * 30,
      height: 5 + Math.random() * 15,
      speed: 0.5 + Math.random() * 1.5,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <DataLine key={i} {...line} />
      ))}
    </group>
  );
}

function DataLine({ x, z, height, speed, offset }: { x: number, z: number, height: number, speed: number, offset: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = (state.clock.elapsedTime * speed + offset) % 1;
      meshRef.current.position.y = -10 + t * height;
      meshRef.current.material.opacity = Math.sin(t * Math.PI) * 0.8;
    }
  });

  return (
    <mesh ref={meshRef} position={[x, 0, z]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#00ffa3" transparent />
    </mesh>
  );
}

function HexGrid() {
  const groupRef = useRef<THREE.Group>(null);
  const hexagons = useMemo(() => {
    const hexes = [];
    for (let x = -5; x <= 5; x++) {
      for (let z = -5; z <= 5; z++) {
        if (Math.random() > 0.6) {
          hexes.push({
            x: x * 1.8 + (z % 2) * 0.9,
            z: z * 1.6,
            delay: Math.random() * 2,
          });
        }
      }
    }
    return hexes;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = -Math.PI / 2;
      groupRef.current.position.y = -8;
    }
  });

  return (
    <group ref={groupRef}>
      {hexagons.map((hex, i) => (
        <HexTile key={i} x={hex.x} z={hex.z} delay={hex.delay} />
      ))}
    </group>
  );
}

function HexTile({ x, z, delay }: { x: number, z: number, delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2 + delay) * 0.5 + 0.5;
      meshRef.current.material.opacity = pulse * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[x, z, 0]}>
      <circleGeometry args={[0.8, 6]} />
      <meshBasicMaterial color="#00d4ff" transparent wireframe />
    </mesh>
  );
}

function GlowingSphere({ position, color, size }: { position: [number, number, number], color: string, size: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.2} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshWobbleMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          factor={0.3}
          speed={2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const [nodes] = useState(() => {
    const n = [];
    for (let i = 0; i < 20; i++) {
      n.push({
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
        ] as [number, number, number],
      });
    }
    return n;
  });

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[-6, 2, -8]}>
      {nodes.map((node, i) => (
        <Float key={i} speed={1 + Math.random()} floatIntensity={0.5}>
          <mesh position={node.position}>
            <icosahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial
              color="#00d4ff"
              emissive="#00d4ff"
              emissiveIntensity={1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#050a15"]} />
        <fog attach="fog" args={["#050a15", 15, 60]} />
        
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00d4ff" distance={50} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00ffa3" distance={50} />
        <pointLight position={[0, 5, 5]} intensity={1.5} color="#00d4ff" distance={30} />
        <spotLight
          position={[0, 15, 0]}
          angle={0.4}
          penumbra={1}
          intensity={2}
          color="#00d4ff"
          distance={50}
        />
        
        <Stars radius={150} depth={60} count={5000} factor={5} saturation={0} fade speed={0.5} />
        <ParticleField />
        <CyberSphere />
        
        <FloatingRing position={[0, 0, 0]} color="#00d4ff" size={4} speed={0.3} />
        <FloatingRing position={[0, 0, 0]} color="#00ffa3" size={5} speed={-0.2} />
        
        <OrbitingCube radius={6} speed={0.5} offset={0} color="#00d4ff" />
        <OrbitingCube radius={6} speed={0.5} offset={Math.PI} color="#00ffa3" />
        <OrbitingCube radius={7} speed={0.3} offset={Math.PI / 2} color="#00d4ff" />
        
        <GlowingSphere position={[5, 3, -5]} color="#00ffa3" size={0.5} />
        <GlowingSphere position={[-6, -2, -4]} color="#00d4ff" size={0.4} />
        <GlowingSphere position={[4, -3, -6]} color="#00ffa3" size={0.3} />
        
        <DataStream />
        <HexGrid />
        <NeuralNetwork />
      </Canvas>
    </div>
  );
}
