'use client';

import { useEffect, useRef } from 'react';

export interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: 'forward' | 'reverse' | 'pingpong';
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
}

export const Plasma = ({
  color = '#4fffa8',
  speed = 0.2,
  direction = 'forward',
  scale = 1,
  opacity = 0.9,
  mouseInteractive = true
}: PlasmaProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const setSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseInteractive) return;
      const rect = canvas.getBoundingClientRect();
      mousePos.current.x = (e.clientX - rect.left) / rect.width;
      mousePos.current.y = (e.clientY - rect.top) / rect.height;
    };
    if (mouseInteractive) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }

    // Parse color
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 79, g: 255, b: 168 };
    };
    const rgb = hexToRgb(color);

    let time = 0;
    const animate = () => {
      if (!canvas || !ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Create gradient blobs
      const numBlobs = 5;
      for (let i = 0; i < numBlobs; i++) {
        const angle = (time * speed * 0.3 + i * Math.PI * 2 / numBlobs) * (direction === 'reverse' ? -1 : 1);
        const radius = Math.min(width, height) * 0.3 * scale;
        
        const x = width / 2 + Math.cos(angle) * radius + Math.sin(time * speed * 0.5 + i) * radius * 0.3;
        const y = height / 2 + Math.sin(angle) * radius + Math.cos(time * speed * 0.4 + i) * radius * 0.3;

        // Mouse influence
        if (mouseInteractive) {
          const dx = mousePos.current.x * width - x;
          const dy = mousePos.current.y * height - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (200 - dist) / 200;
            // x and y are already influenced by the mouse position calculation
          }
        }

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 0.8);
        
        // Vary colors slightly for each blob
        const hueShift = i * 10;
        const r = Math.min(255, rgb.r + hueShift);
        const g = Math.min(255, rgb.g - hueShift * 0.5);
        const b = Math.min(255, rgb.b + hueShift * 0.3);
        
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity * 0.6})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.globalCompositeOperation = 'screen';
        ctx.fillRect(0, 0, width, height);
      }

      time += 0.016; // ~60fps
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', setSize);
      if (mouseInteractive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [color, speed, direction, scale, opacity, mouseInteractive]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
};

export default Plasma;
