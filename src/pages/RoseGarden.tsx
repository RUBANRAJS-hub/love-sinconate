import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles as R3FSparkles } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flower, Sparkles, X } from 'lucide-react';
import * as THREE from 'three';

interface RoseData {
  id: number;
  position: [number, number, number];
  message: string;
  color: string;
  name: string;
}

interface SingleRoseProps {
  rose: RoseData;
  activeId: number | null;
  setActiveId: (id: number | null) => void;
  setActiveMessage: (msg: string | null) => void;
}

const SingleRose: React.FC<SingleRoseProps> = ({ rose, activeId, setActiveId, setActiveMessage }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const isActive = activeId === rose.id;

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle sway
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.z = Math.sin(time + rose.id) * 0.05;
    meshRef.current.rotation.x = Math.cos(time + rose.id) * 0.03;

    // Hover/Active Scale Lerp
    const targetScale = isActive ? 1.3 : hovered ? 1.15 : 1.0;
    const currentScale = meshRef.current.scale.x;
    const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.1);
    meshRef.current.scale.set(nextScale, nextScale, nextScale);
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    setActiveId(rose.id);
    setActiveMessage(rose.message);
  };

  return (
    <group 
      ref={meshRef} 
      position={rose.position}
      onClick={handleClick}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
    >
      {/* Rose stem (slender green cylinder) */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 2.4, 8]} />
        <meshStandardMaterial color="#2E7D32" roughness={0.9} />
      </mesh>

      {/* Leaves */}
      <mesh position={[0.2, -0.8, 0]} rotation={[0, 0, 0.5]}>
        <coneGeometry args={[0.15, 0.5, 4]} />
        <meshStandardMaterial color="#1B5E20" roughness={0.7} />
      </mesh>
      <mesh position={[-0.2, -1.2, 0]} rotation={[0, 0, -0.5]}>
        <coneGeometry args={[0.12, 0.4, 4]} />
        <meshStandardMaterial color="#1B5E20" roughness={0.7} />
      </mesh>

      {/* Rose Bloom (Torus Knot looks like a complex layered rose bud) */}
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusKnotGeometry args={[0.3, 0.1, 64, 8, 3, 5]} />
        <meshPhysicalMaterial
          color={rose.color}
          emissive={rose.color}
          emissiveIntensity={isActive ? 0.6 : hovered ? 0.35 : 0.1}
          roughness={0.2}
          clearcoat={0.8}
          transmission={0.2}
          thickness={0.5}
        />
      </mesh>

      {/* Decorative inner bulb */}
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color={rose.color} roughness={0.3} />
      </mesh>
    </group>
  );
};

export const RoseGarden: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const roses: RoseData[] = [
    { id: 1, position: [-3, 0.5, -2], name: 'Rose of Gratitude', color: '#FF4F81', message: '"Thank you for standing by me through thick and thin. Your support is my greatest shield."' },
    { id: 2, position: [-1.2, 0.2, -1], name: 'Rose of Laughter', color: '#FF80AB', message: '"Your laugh is my absolute favorite sound in the universe. I promise to keep making you smile."' },
    { id: 3, position: [0.8, 0.4, -2.5], name: 'Rose of Peace', color: '#FF4F81', message: '"In your arms, I find a quiet rest that no other place on earth can give me. You are my home."' },
    { id: 4, position: [2.5, 0.3, -1.5], name: 'Rose of Growth', color: '#FFCCD5', message: '"You inspire me to be a better person every single day. I love growing alongside you, my queen."' },
    { id: 5, position: [-2, -0.8, 1.5], name: 'Rose of Playfulness', color: '#D4AF37', message: '"I love our silly jokes and the chaotic fun we share. You are my favorite playmate."' },
    { id: 6, position: [0, -0.6, 2], name: 'Rose of Devotion', color: '#FF4F81', message: '"No matter where life takes us, my eyes will only ever search for you. I choose you, today and forever."' },
    { id: 7, position: [2, -0.7, 1], name: 'Rose of Trust', color: '#FF80AB', message: '"Our connection is built on a foundation of pure trust. I treasure how safe we are with each other."' },
    { id: 8, position: [3.5, 0, -3], name: 'Rose of Hope', color: '#FFCCD5', message: '"I look forward to our future—building our cozy home, traveling the globe, and growing old hand-in-hand."' }
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center pt-24 pb-20 px-6 bg-[#0D1117]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,128,171,0.02)_0%,transparent_85%)] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-lg mb-4 z-10 select-none">
        <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full uppercase tracking-wider font-semibold inline-flex items-center gap-1 mb-3">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>Interactive 3D</span>
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-3 drop-shadow-md">
          Magical Rose Garden
        </h2>
        <p className="text-white/40 text-xs md:text-sm">
          A garden of glowing neon roses. Walk inside (drag to rotate) and tap any rose to unlock a secret message.
        </p>
      </div>

      {/* Floating Note overlay */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-44 max-w-md w-[85%] z-30 glass-panel border border-primary/30 rounded-3xl p-6 shadow-[0_12px_40px_rgba(255,79,129,0.2)] text-center flex flex-col items-center select-none"
          >
            <button
              onClick={() => {
                setActiveId(null);
                setActiveMessage(null);
              }}
              className="absolute top-3.5 right-3.5 p-1 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <Flower className="w-8 h-8 text-primary fill-primary animate-pulse mb-3" />
            
            <h4 className="text-xs font-mono font-bold text-gold uppercase tracking-widest mb-2">
              {roses.find(r => r.id === activeId)?.name}
            </h4>

            <p className="font-serif italic text-base md:text-lg text-white/95 leading-relaxed">
              {activeMessage}
            </p>

            <Heart className="w-4 h-4 text-primary fill-primary mt-4 opacity-60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Garden Canvas */}
      <div className="w-full max-w-4xl h-[420px] md:h-[550px] z-10 glass-panel border border-white/5 rounded-3xl overflow-hidden relative cursor-grab active:cursor-grabbing select-none">
        <Canvas camera={{ position: [0, 4, 9], fov: 45 }}>
          {/* Ambient Lighting */}
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#FF80AB" />
          <pointLight position={[-10, 10, -10]} intensity={1.0} color="#D4AF37" />
          <directionalLight position={[0, 10, 5]} intensity={1.2} />

          {/* Floating Pollen Stars in 3D Space */}
          <R3FSparkles count={50} scale={10} size={1.5} speed={0.4} color="#FFCCD5" />
          <R3FSparkles count={30} scale={8} size={2} speed={0.2} color="#D4AF37" />

          {/* Render Roses */}
          <group position={[0, -0.5, 0]}>
            {roses.map((rose) => (
              <SingleRose 
                key={rose.id} 
                rose={rose} 
                activeId={activeId} 
                setActiveId={setActiveId}
                setActiveMessage={setActiveMessage}
              />
            ))}

            {/* Grass bed plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]}>
              <planeGeometry args={[15, 15]} />
              <meshStandardMaterial color="#1B5E20" roughness={0.9} opacity={0.3} transparent />
            </mesh>
          </group>

          <OrbitControls 
            enableZoom={true} 
            enablePan={false}
            maxDistance={12}
            minDistance={4}
            maxPolarAngle={Math.PI / 2.2} // prevent going below ground
          />
        </Canvas>

        {/* Drag instructions */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 border border-white/5 px-3 py-1.5 rounded-full backdrop-blur-md text-[9px] text-white/50 uppercase tracking-widest pointer-events-none">
          Drag to look around • Scroll to zoom • Click roses
        </div>
      </div>
    </div>
  );
};
export default RoseGarden;
