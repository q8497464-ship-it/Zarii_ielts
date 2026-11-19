import React, { useMemo } from 'react';

interface AmbientPetalsProps {
  reducedMotion?: boolean;
  burst?: boolean;
}

interface ParticleData {
  id: number;
  type: 'heart' | 'petal';
  leftPct: number;
  sizePx: number;
  durationSec: number;
  delaySec: number;
  opacity: number;
  rotateDeg: number;
  horizontalDriftPx: number;
}

export function AmbientPetals({ reducedMotion = false, burst = false }: AmbientPetalsProps) {
  // If user prefers reduced motion, do not render flying particles
  if (reducedMotion) return null;

  const particleCount = burst ? 22 : 16;

  const particles: ParticleData[] = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      // Deterministic pseudo-random values
      const seed = (i * 9301 + 49297) % 233280;
      const rnd1 = (seed / 233280);
      const rnd2 = ((seed * 2) % 233280) / 233280;
      const rnd3 = ((seed * 3) % 233280) / 233280;

      return {
        id: i,
        type: i % 2 === 0 ? 'petal' : 'heart',
        leftPct: 5 + (rnd1 * 90),
        sizePx: 10 + Math.round(rnd2 * 14), // 10px to 24px
        durationSec: burst ? 3.5 + rnd2 * 2 : 6.5 + rnd2 * 4.5,
        delaySec: burst ? rnd3 * 0.8 : rnd3 * 3,
        opacity: 0.35 + rnd1 * 0.45,
        rotateDeg: Math.round(rnd3 * 360),
        horizontalDriftPx: -35 + Math.round(rnd2 * 70),
      };
    });
  }, [burst, particleCount]);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-10"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute ${burst ? 'ambient-particle-burst' : 'ambient-particle-float'}`}
          style={{
            left: `${p.leftPct}%`,
            width: `${p.sizePx}px`,
            height: `${p.sizePx}px`,
            opacity: p.opacity,
            animationDuration: `${p.durationSec}s`,
            animationDelay: `${p.delaySec}s`,
            '--drift-x': `${p.horizontalDriftPx}px`,
            '--rot-deg': `${p.rotateDeg}deg`,
          } as React.CSSProperties}
        >
          {p.type === 'heart' ? (
            <svg
              viewBox="0 0 24 24"
              fill="#E8798F"
              className="w-full h-full drop-shadow-[0_2px_8px_rgba(232,121,143,0.3)]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="#FCE4EA"
              className="w-full h-full drop-shadow-[0_2px_8px_rgba(252,228,234,0.3)]"
            >
              <path d="M12 2 C8 7 6 12 8 18 C10 22 14 22 16 18 C18 12 16 7 12 2 Z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
