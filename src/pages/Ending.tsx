import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Moon } from 'lucide-react';

interface Lantern {
  x: number;
  y: number;
  size: number;
  speedY: number;
  wobble: number;
  wobbleSpeed: number;
  opacity: number;
}

export const Ending: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [showNames, setShowNames] = useState(false);

  const finalMessage = "No matter where life takes us...\nI will always choose you.\nForever and Always.";

  // Typewriting effect
  useEffect(() => {
    let currentText = '';
    let charIndex = 0;
    
    const interval = setInterval(() => {
      if (charIndex < finalMessage.length) {
        currentText += finalMessage[charIndex];
        setDisplayedText(currentText);
        charIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowNames(true), 1000);
      }
    }, 70); // slower, more cinematic typing

    return () => clearInterval(interval);
  }, []);

  // Sky Lantern particle simulator
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lanterns: Lantern[] = [];
    const maxLanterns = 20;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const initLanterns = () => {
      for (let i = 0; i < maxLanterns; i++) {
        lanterns.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height + canvas.height, // start off-screen bottom
          size: Math.random() * 8 + 6,
          speedY: Math.random() * 0.5 + 0.3, // slow drift up
          wobble: Math.random() * Math.PI,
          wobbleSpeed: Math.random() * 0.01 + 0.005,
          opacity: Math.random() * 0.7 + 0.3
        });
      }
    };

    const drawLantern = (c: CanvasRenderingContext2D, l: Lantern) => {
      c.save();
      c.translate(l.x, l.y);
      c.globalAlpha = l.opacity;
      
      // Outer glow
      c.shadowBlur = 12;
      c.shadowColor = 'rgba(255, 143, 0, 0.9)'; // hot amber glow
      
      // Draw rectangular paper lantern shape
      c.fillStyle = 'rgba(255, 167, 38, 0.95)';
      c.beginPath();
      c.moveTo(-l.size / 2, -l.size);
      c.lineTo(l.size / 2, -l.size);
      c.lineTo(l.size * 0.6 / 2, l.size);
      c.lineTo(-l.size * 0.6 / 2, l.size);
      c.closePath();
      c.fill();
      
      // Bottom hot flame spot inside lantern
      c.shadowBlur = 4;
      c.shadowColor = '#ffffff';
      c.fillStyle = '#ffffff';
      c.beginPath();
      c.arc(0, l.size * 0.6, l.size * 0.25, 0, Math.PI * 2);
      c.fill();
      
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lanterns.forEach((l, index) => {
        l.y -= l.speedY;
        l.wobble += l.wobbleSpeed;
        l.x += Math.sin(l.wobble) * 0.25;

        // fade out near the top
        if (l.y < 150) {
          l.opacity -= 0.005;
        }

        if (l.y < -20 || l.opacity <= 0) {
          // Recycle to bottom
          lanterns[index] = {
            x: Math.random() * canvas.width,
            y: canvas.height + 20,
            size: Math.random() * 8 + 6,
            speedY: Math.random() * 0.5 + 0.3,
            wobble: Math.random() * Math.PI,
            wobbleSpeed: Math.random() * 0.01 + 0.005,
            opacity: Math.random() * 0.7 + 0.3
          };
        } else {
          drawLantern(ctx, l);
        }
      });

      // Twinkly background stars (subtle)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      for (let j = 0; j < 15; j++) {
        const sx = (Math.sin(j * 324.9) * 0.5 + 0.5) * canvas.width;
        const sy = (Math.cos(j * 984.2) * 0.5 + 0.5) * canvas.height * 0.7; // top half only
        const sz = (Math.sin(Date.now() * 0.002 + j) * 0.3 + 0.7) * 1.0;
        ctx.beginPath();
        ctx.arc(sx, sy, sz, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    initLanterns();
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-20 px-6 bg-[#090C10] overflow-hidden select-none">
      
      {/* Background flying sky lanterns */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-1"
      />

      {/* Moon Element (top right glowing orb) */}
      <div className="absolute top-[15%] right-[15%] w-32 h-32 rounded-full bg-gradient-to-br from-[#FFFEE0] to-[#FBC02D] opacity-80 blur-[2px] shadow-[0_0_50px_rgba(251,192,45,0.4)] flex items-center justify-center z-1 animate-float">
        <Moon className="w-16 h-16 text-amber-100 fill-amber-100/10 opacity-30 rotate-12" />
      </div>

      {/* Message and names */}
      <div className="z-10 text-center max-w-lg px-4 flex flex-col items-center">
        {/* Pulsing red heart */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mb-8"
        >
          <Heart className="w-14 h-14 text-primary fill-primary drop-shadow-[0_0_15px_rgba(255,79,129,0.7)]" />
        </motion.div>

        {/* Cinematic Typewriter paragraph */}
        <p className="font-serif italic text-white/95 text-lg sm:text-2xl leading-relaxed whitespace-pre-line tracking-wide drop-shadow-md">
          {displayedText}
          <span className="inline-block w-1.5 h-6 bg-primary ml-1 animate-pulse" />
        </p>

        {/* Credit roll signatures */}
        <AnimatePresence>
          {showNames && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="mt-14"
            >
              <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-3">
                Locked in Eternity
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-white font-bold flex items-center gap-3 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                <span>Ruban</span>
                <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" />
                <span>Shobi</span>
              </h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Small restart watermark */}
      <div className="absolute bottom-6 text-[8px] font-mono text-white/20 uppercase tracking-widest">
        Click top logo to revisit home
      </div>
    </div>
  );
};
export default Ending;
