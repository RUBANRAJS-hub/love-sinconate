import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

interface HeartMeshProps {
  hovered: boolean;
  setHovered: (h: boolean) => void;
}

const HeartMesh: React.FC<HeartMeshProps> = ({ hovered, setHovered }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Define heart path shape
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    
    // Smooth heart curve path
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6.5, y + 7.7, x + 8, y + 5.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
    
    return shape;
  }, []);

  // Extrude settings for 3D thickness and rounded bevels
  const extrudeSettings = useMemo(() => ({
    depth: 1.5,
    bevelEnabled: true,
    bevelSegments: 8,
    steps: 2,
    bevelSize: 0.8,
    bevelThickness: 0.8,
  }), []);

  // Center the geometry once created
  const geometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    geo.center(); // centers around geometry bounding box center
    return geo;
  }, [heartShape, extrudeSettings]);

  // Animate the 3D heart (slow rotation + responsive tilt)
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Continuous base rotation
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.45;
    
    // Hover scale animation
    const targetScale = hovered ? 1.25 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    // Mouse tilt effect
    const mouseX = state.pointer.x * 0.4;
    const mouseY = state.pointer.y * 0.4;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouseY, 0.05);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -mouseX, 0.05);
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={[1, 1, 1]}
      rotation={[0, 0, Math.PI]} // turn heart upright (extrude draws upside down by default depending on shape drawing direction)
    >
      {/* Luxury Pink Crystal/Glass Material */}
      <meshPhysicalMaterial
        color="#FF4F81"
        emissive="#FF80AB"
        emissiveIntensity={0.25}
        roughness={0.08}
        metalness={0.1}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        transmission={0.65} // glass transparency
        thickness={2.5}     // refractive thickness
        ior={1.45}          // index of refraction
        specularIntensity={1.0}
        specularColor={new THREE.Color('#ffffff')}
      />
    </mesh>
  );
};

export const ThreeHeart: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-full h-[320px] md:h-[450px] cursor-grab active:cursor-grabbing relative select-none">
      {/* Sparkles background effect overlay in canvas */}
      <div className="absolute inset-0 flex items-center justify-between pointer-events-none" />
      
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        {/* Lights configuration */}
        <ambientLight intensity={0.9} />
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#FF80AB" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#D4AF37" />
        <directionalLight position={[0, 5, 5]} intensity={1.5} color="#FFFFFF" />
        <spotLight position={[5, 15, 5]} angle={0.3} penumbra={1} intensity={2} color="#FF4F81" />

        <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
          <HeartMesh hovered={hovered} setHovered={setHovered} />
        </Float>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      {/* Floating touch hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <span className="text-[10px] text-white/40 uppercase tracking-widest bg-white/5 border border-white/5 px-2.5 py-1 rounded-full backdrop-blur-md">
          Drag to spin • Hover to pulse
        </span>
      </div>
    </div>
  );
};
export default ThreeHeart;
