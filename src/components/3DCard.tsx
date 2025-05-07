'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// We'll use dynamic imports for GSAP to avoid SSR issues
let gsap: any;

interface CardModelProps {
  rotation?: [number, number, number];
  position?: [number, number, number];
  scale?: number;
  color?: string;
  hovered?: boolean;
  onClick?: () => void;
}

// This is a placeholder for a custom card model
// In a real implementation, you would import a GLTF model
const CardModel: React.FC<CardModelProps> = ({
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  scale = 1,
  color = '#ffffff',
  hovered = false,
  onClick
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [active, setActive] = useState(false);

  // Animation on each frame
  useFrame((state) => {
    if (!meshRef.current) return;

    // Subtle floating animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.05;

    // Rotate slightly based on mouse position
    if (hovered && !active) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        state.mouse.x * 0.5,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        state.mouse.y * 0.2,
        0.05
      );
    }
  });

  return (
    <group
      position={[position[0], position[1], position[2]]}
      rotation={[rotation[0], rotation[1], rotation[2]]}
      scale={[scale, scale, scale]}
      onClick={(e) => {
        e.stopPropagation();
        setActive(!active);
        onClick && onClick();
      }}
    >
      {/* Card base */}
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[3.5, 2, 0.1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          emissive={hovered ? new THREE.Color(color).multiplyScalar(0.3) : undefined}
        />
      </mesh>

      {/* Card details - improved for demo */}
      <group position={[0.5, 0, 0.06]}>
        {/* Name */}
        <mesh position={[0, 0.7, 0]}>
          <planeGeometry args={[2, 0.3]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>

        {/* Title */}
        <mesh position={[0, 0.3, 0]}>
          <planeGeometry args={[1.8, 0.2]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
        </mesh>

        {/* Contact details */}
        <mesh position={[0, -0.1, 0]}>
          <planeGeometry args={[2, 0.15]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>

        <mesh position={[0, -0.4, 0]}>
          <planeGeometry args={[2, 0.15]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>

        <mesh position={[0, -0.7, 0]}>
          <planeGeometry args={[2, 0.15]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Logo placeholder - improved */}
      <group position={[-1.2, 0, 0.06]}>
        <mesh>
          <circleGeometry args={[0.6, 32]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        <mesh position={[0, 0, 0.01]}>
          <circleGeometry args={[0.5, 32]} />
          <meshBasicMaterial color={color === '#ffffff' ? '#3b82f6' : color} />
        </mesh>

        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.3, 0.3, 0.01]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* QR code placeholder */}
      <mesh position={[1.2, -0.6, 0.06]}>
        <boxGeometry args={[0.6, 0.6, 0.01]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

interface ThreeDCardProps {
  color?: string;
  onClick?: () => void;
  className?: string;
}

const ThreeDCard: React.FC<ThreeDCardProps> = ({
  color = '#ffffff',
  onClick,
  className = ''
}) => {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Add a pulse animation when the component mounts
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Set initial opacity
    if (containerRef.current) {
      containerRef.current.style.opacity = '0';
    }

    // Dynamically import GSAP
    import('gsap').then((module) => {
      gsap = module.gsap;

      if (containerRef.current && gsap) {
        gsap.fromTo(
          containerRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
          }
        );
      }
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-[400px] ${className} relative`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Decorative elements */}
      <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-200 rounded-full opacity-50 blur-xl animate-pulse-slow"></div>
      <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-purple-200 rounded-full opacity-50 blur-xl animate-float"></div>

      <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
          <color attach="background" args={['#f8fafc']} />
          <ambientLight intensity={0.7} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 3, Math.PI / 3]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
          >
            <CardModel
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1}
              color={color}
              hovered={hovered}
              onClick={onClick}
            />
          </PresentationControls>
          <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={5} blur={2} far={4} />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Interactive hint */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-600 flex items-center gap-1 animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
        Drag to rotate
      </div>
    </div>
  );
};

export default ThreeDCard;
