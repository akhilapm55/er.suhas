import { useRef, useState, type ReactNode } from 'react';
import { prefersReducedMotion } from '../utils/animations';

interface InteractiveTiltCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function InteractiveTiltCard({
  children,
  className = '',
  spotlightColor = 'rgba(213, 255, 56, 0.14)',
}: InteractiveTiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ x: 50, y: 50, rx: 0, ry: 0, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return;
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const ry = (px - 0.5) * 4; // max +/-2deg subtle tilt
    const rx = (0.5 - py) * 4;

    setCoords({
      x: px * 100,
      y: py * 100,
      rx,
      ry,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setCoords((prev) => ({ ...prev, rx: 0, ry: 0, active: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: coords.active
          ? `perspective(900px) rotateX(${coords.rx}deg) rotateY(${coords.ry}deg)`
          : 'perspective(900px) rotateX(0deg) rotateY(0deg)',
      }}
      className={`relative overflow-hidden transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: coords.active ? 1 : 0,
          background: `radial-gradient(420px circle at ${coords.x}% ${coords.y}%, ${spotlightColor}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
