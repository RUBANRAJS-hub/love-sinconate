import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles as R3FSparkles } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import confetti from 'canvas-confetti';

interface RingProps {
  accepted: boolean;
}

const RingModel: React.FC<RingProps> = ({ accepted }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Continuous rotation
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.55;
    
    // Hover floating height
    groupRef.current.position.y = Math.sin(time * 1.5) * 0.15;
    
    // Scale up on acceptance
    if (accepted) {
      const currentScale = groupRef.current.scale.x;
      const targetScale = THREE.MathUtils.lerp(currentScale, 1.4, 0.05);
      groupRef.current.scale.set(targetScale, targetScale, targetScale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Torus ring band (Gold Metal) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.0, 0.12, 16, 100]} />
        <meshStandardMaterial
          color="#D4AF37" // gold
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Diamond stone (Refractive Prism Icosahedron) */}
      <mesh position={[0, 1.05, 0]}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          roughness={0.02}
          metalness={0.1}
          clearcoat={1.0}
          transmission={0.9}
          thickness={1.5}
          ior={2.42} // diamond index of refraction
        />
      </mesh>

      {/* Diamond prong mountings (tiny gold cylinders) */}
      <mesh position={[0.1, 0.9, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.1, 0.9, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

export const Proposal: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();

  const handleResponse = () => {
    setAccepted(true);
    
    // Trigger massive confetti explosion
    const end = Date.now() + (3 * 1000);
    const colors = ['#FF4F81', '#FF80AB', '#D4AF37', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // Delay redirect to ending scene
    setTimeout(() => {
      navigate('/ending');
    }, 4000);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-20 px-6 bg-[#0D1117]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,79,129,0.03)_0%,transparent_85%)] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-lg mb-4 z-10 select-none">
        <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-3.5 py-1 rounded-full uppercase tracking-wider font-semibold inline-flex items-center gap-1 mb-3">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>The Big Step</span>
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-3 drop-shadow-md">
          Will You?
        </h2>
        <p className="text-white/40 text-xs md:text-sm">
          A promise that lasts beyond stars and galaxies. Drag to inspect the ring.
        </p>
      </div>

      {/* Ring Canvas */}
      <div className="w-full max-w-md h-[280px] md:h-[350px] z-10 relative select-none">
        {/* Glowing halo behind ring canvas */}
        <div className="absolute inset-0 m-auto w-40 h-40 rounded-full bg-gold/15 blur-[60px] pointer-events-none animate-pulse" />
        
        <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
          <ambientLight intensity={0.9} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#D4AF37" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#FF80AB" />
          <spotLight position={[5, 15, 5]} intensity={2.5} color="#ffffff" />
          
          <R3FSparkles count={30} scale={4} size={2} speed={0.4} color="#D4AF37" />
          <R3FSparkles count={15} scale={3} size={1.5} speed={0.6} color="#ffffff" />

          <Float speed={2.5} floatIntensity={0.6} rotationIntensity={0.3}>
            <RingModel accepted={accepted} />
          </Float>

          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            maxPolarAngle={Math.PI / 1.6}
            minPolarAngle={Math.PI / 2.5}
          />
        </Canvas>
      </div>

      {/* Question Overlay */}
      <div className="w-full max-w-md text-center z-10 mt-4 select-none">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col items-center"
            >
              <h3 className="font-serif text-2xl md:text-3xl text-white font-bold leading-tight mb-8">
                Will you stay with me forever?
              </h3>

              {/* YES / ALWAYS options */}
              <div className="flex gap-4 w-full px-4">
                <button
                  onClick={handleResponse}
                  className="flex-1 py-4.5 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold tracking-wide shadow-[0_0_20px_rgba(255,79,129,0.45)] border border-white/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  YES ❤️
                </button>
                <button
                  onClick={handleResponse}
                  className="flex-1 py-4.5 rounded-full bg-gradient-to-r from-gold via-accent to-primary text-white font-bold tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.45)] border border-white/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  ALWAYS ❤️
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="victory"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-panel border border-primary/30 p-6 rounded-3xl shadow-[0_0_30px_rgba(255,79,129,0.25)] flex flex-col items-center mx-4"
            >
              <Heart className="w-10 h-10 text-primary fill-primary animate-pulse mb-3" />
              <h3 className="font-serif text-xl md:text-2xl text-white font-bold">YES! Forever and Always!</h3>
              <p className="text-white/60 text-xs mt-1.5 max-w-[280px] leading-relaxed italic">
                "Two souls, one heartbeat. Our digital love is now locked into eternity. Landing in the final sky..."
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default Proposal;
