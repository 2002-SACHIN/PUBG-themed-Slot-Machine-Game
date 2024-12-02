import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

export const ParticleEffect: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#4f46e5', '#7c3aed', '#2563eb', '#ec4899', '#8b5cf6'];
    
    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      size: Math.random() * 5 + 1,
      speedX: Math.random() * 4 - 2,
      speedY: -Math.random() * 3 - 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1
    });

    const animate = () => {
      if (!isActive) {
        particles.current = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles
      if (particles.current.length < 100) {
        particles.current.push(createParticle());
      }

      // Update and draw particles
      particles.current = particles.current.filter(particle => {
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        particle.opacity -= 0.005;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        return particle.opacity > 0;
      });

      requestAnimationFrame(animate);
    };

    if (isActive) {
      animate();
    }

    return () => {
      particles.current = [];
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}