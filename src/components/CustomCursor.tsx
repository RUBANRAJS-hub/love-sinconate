import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  rotation: number;
  spin: number;
}

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return; // Do not show custom cursor on touch devices
    }

    setIsVisible(true);
    document.body.classList.add('custom-cursor-active');

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(255, 79, 129, 0.8)',  // primary pink
      'rgba(255, 128, 171, 0.8)', // accent pink
      'rgba(255, 204, 213, 0.8)', // light pink
      'rgba(212, 175, 55, 0.8)',  // gold
    ];

    const addParticle = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.5 + 0.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5, // drift upwards slightly
        size: Math.random() * 8 + 4,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.05,
      });
    };

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number, color: string, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(angle);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      
      // Shadow glow
      c.shadowBlur = 10;
      c.shadowColor = color;
      
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      
      // Top left curve
      c.bezierCurveTo(-size / 2, -size / 2, -size, topCurveHeight, 0, size);
      
      // Top right curve
      c.bezierCurveTo(size, topCurveHeight, size / 2, -size / 2, 0, topCurveHeight);
      
      c.closePath();
      c.fill();
      c.restore();
    };

    let animationFrameId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add particles on mouse move if moving fast enough
      if (Math.abs(mouseRef.current.x - position.x) > 1 || Math.abs(mouseRef.current.y - position.y) > 1) {
        addParticle(mouseRef.current.x, mouseRef.current.y);
      }

      // Update and draw particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.spin;
        p.alpha -= 0.015; // fade out

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          drawHeart(ctx, p.x, p.y, p.size, p.rotation, p.color, p.alpha);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') !== null || 
        target.closest('a') !== null ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer') !== null;
      
      setIsHovered(isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [position.x, position.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Canvas for mouse heart trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
      />
      {/* Actual cursor element */}
      <div
        className={`fixed pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ${
          isClicking ? 'scale-75' : isHovered ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_8px_rgba(255,79,129,0.8)]"
        >
          <path
            d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
            fill={isHovered ? "#FF4F81" : "#FF80AB"}
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </>
  );
};
