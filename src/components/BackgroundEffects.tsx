import React, { useEffect, useRef } from 'react';
import { useLove } from '../context/LoveContext';
import type { WeatherMode } from '../context/LoveContext';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation?: number;
  rotSpeed?: number;
  life?: number;
  maxLife?: number;
  wobble?: number;
  wobbleSpeed?: number;
}

export const BackgroundEffects: React.FC = () => {
  const { weatherMode } = useLove();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 60;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize particles based on weatherMode
    const initParticles = (mode: WeatherMode) => {
      particles = [];
      const count = mode === 'normal' ? 30 : maxParticles; // static stars
      
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(mode, true));
      }
    };

    const createParticle = (mode: WeatherMode, randomY = false): Particle => {
      const x = Math.random() * canvas.width;
      const y = randomY ? Math.random() * canvas.height : -20;
      
      switch (mode) {
        case 'sakura':
          return {
            x,
            y,
            size: Math.random() * 8 + 6,
            speedY: Math.random() * 1.2 + 0.8,
            speedX: Math.random() * 0.8 - 0.2,
            opacity: Math.random() * 0.6 + 0.4,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.02,
            wobble: Math.random() * Math.PI,
            wobbleSpeed: Math.random() * 0.02 + 0.01,
          };
        case 'snow':
          return {
            x,
            y,
            size: Math.random() * 3 + 1.5,
            speedY: Math.random() * 1 + 0.5,
            speedX: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.7 + 0.3,
            wobble: Math.random() * Math.PI,
            wobbleSpeed: Math.random() * 0.03 + 0.01,
          };
        case 'rain':
          return {
            x,
            y: randomY ? Math.random() * canvas.height : -50,
            size: Math.random() * 15 + 10, // length of rain streak
            speedY: Math.random() * 8 + 6,
            speedX: -2, // wind blowing left
            opacity: Math.random() * 0.3 + 0.1,
          };
        case 'fireflies':
          return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedY: (Math.random() - 0.5) * 0.4,
            speedX: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.8 + 0.2,
            life: Math.random() * 100,
            maxLife: Math.random() * 200 + 100,
          };
        case 'normal':
        default: // twinkly background stars
          return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            speedY: 0,
            speedX: 0,
            opacity: Math.random(),
            wobble: Math.random() * Math.PI, // twinkle phase
            wobbleSpeed: Math.random() * 0.02 + 0.01,
          };
      }
    };

    // Draw a single sakura petal
    const drawSakuraPetal = (c: CanvasRenderingContext2D, p: Particle) => {
      c.save();
      c.translate(p.x, p.y);
      if (p.rotation !== undefined) c.rotate(p.rotation);
      c.globalAlpha = p.opacity;
      c.fillStyle = 'rgba(255, 183, 197, 0.85)'; // beautiful cherry blossom pink
      
      c.beginPath();
      c.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
      c.fill();
      
      // Indent at the petal tip for realism
      c.beginPath();
      c.moveTo(p.size, 0);
      c.lineTo(p.size + 2, -1);
      c.lineTo(p.size + 2, 1);
      c.closePath();
      c.fill();
      
      c.restore();
    };

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background sky stars always (subtle backdrop)
      if (weatherMode !== 'normal') {
        // Render 20 subtle stars
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        for (let j = 0; j < 20; j++) {
          const sx = (Math.sin(j * 987.12) * 0.5 + 0.5) * canvas.width;
          const sy = (Math.cos(j * 432.89) * 0.5 + 0.5) * canvas.height;
          const sz = (Math.sin(Date.now() * 0.001 + j) * 0.4 + 0.6) * 1.2;
          ctx.beginPath();
          ctx.arc(sx, sy, sz, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      particles.forEach((p, index) => {
        // Update position
        if (weatherMode === 'sakura') {
          p.y += p.speedY;
          if (p.wobble !== undefined && p.wobbleSpeed !== undefined) {
            p.wobble += p.wobbleSpeed;
            p.x += p.speedX + Math.sin(p.wobble) * 0.5;
          }
          if (p.rotation !== undefined && p.rotSpeed !== undefined) {
            p.rotation += p.rotSpeed;
          }
          
          // Draw
          drawSakuraPetal(ctx, p);

          // Recycle
          if (p.y > canvas.height + 20) {
            particles[index] = createParticle('sakura');
          }
        } 
        
        else if (weatherMode === 'snow') {
          p.y += p.speedY;
          if (p.wobble !== undefined && p.wobbleSpeed !== undefined) {
            p.wobble += p.wobbleSpeed;
            p.x += p.speedX + Math.sin(p.wobble) * 0.3;
          }

          // Draw
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Recycle
          if (p.y > canvas.height + 10) {
            particles[index] = createParticle('snow');
          }
        } 
        
        else if (weatherMode === 'rain') {
          p.y += p.speedY;
          p.x += p.speedX;

          // Draw
          ctx.beginPath();
          ctx.strokeStyle = `rgba(174, 219, 255, ${p.opacity})`;
          ctx.lineWidth = 1.2;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX, p.y + p.size);
          ctx.stroke();

          // Recycle
          if (p.y > canvas.height + 20) {
            particles[index] = createParticle('rain');
          }
        } 
        
        else if (weatherMode === 'fireflies') {
          p.y += p.speedY;
          p.x += p.speedX;

          // Life and fade
          if (p.life !== undefined && p.maxLife !== undefined) {
            p.life++;
            const pct = Math.sin((p.life / p.maxLife) * Math.PI);
            
            // Draw
            ctx.beginPath();
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
            ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity * pct})`;
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0; // reset

            // Recycle
            if (p.life >= p.maxLife || p.x < -10 || p.x > canvas.width + 10 || p.y < -10 || p.y > canvas.height + 10) {
              particles[index] = createParticle('fireflies');
            }
          }
        } 
        
        else { // 'normal' - static twinkling stars
          if (p.wobble !== undefined && p.wobbleSpeed !== undefined) {
            p.wobble += p.wobbleSpeed;
            const twinkle = Math.sin(p.wobble) * 0.4 + 0.6;

            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * twinkle})`;
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    initParticles(weatherMode);
    updateAndDraw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [weatherMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Dynamic Aurora Sky Gradient backdrop */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#0D1117] bg-[length:400%_400%] animate-aurora opacity-95" 
      />
      
      {/* Aurora glow blobs for luxury feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#FF4F81] to-[#FF80AB] opacity-[0.06] blur-[150px] pointer-events-none animate-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FF80AB] opacity-[0.04] blur-[150px] pointer-events-none animate-float" style={{ animationDelay: '-3s' }} />

      {/* Main Canvas for falling weather items */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
};
