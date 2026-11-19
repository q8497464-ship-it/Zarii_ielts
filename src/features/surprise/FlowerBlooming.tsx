import React from 'react';

interface FlowerBloomingProps {
  reducedMotion?: boolean;
  className?: string;
}

export function FlowerBlooming({ reducedMotion = false, className = '' }: FlowerBloomingProps) {
  // 8 Petals radiating in 45-degree steps
  const petalAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <div
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 240"
        className={`w-[clamp(110px,18vh,160px)] h-[clamp(130px,22vh,200px)] shrink-0 drop-shadow-[0_8px_24px_rgba(232,121,143,0.35)] ${
          reducedMotion ? '' : 'animate-flower-sway'
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Petal Gradient: Rose to Soft Blush */}
          <linearGradient id="petal-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCE4EA" />
            <stop offset="45%" stopColor="#E8798F" />
            <stop offset="100%" stopColor="#B83A5A" />
          </linearGradient>

          {/* Inner Petal Glow */}
          <radialGradient id="inner-petal-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#FCE4EA" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E8798F" stopOpacity="0" />
          </radialGradient>

          {/* Stem & Leaves Gradient: Deep Green to Mint */}
          <linearGradient id="stem-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0E3D32" />
            <stop offset="60%" stopColor="#124F40" />
            <stop offset="100%" stopColor="#5BB78D" />
          </linearGradient>

          <linearGradient id="leaf-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5BB78D" />
            <stop offset="100%" stopColor="#124F40" />
          </linearGradient>
        </defs>

        {/* 1. Stem: Path growing upward from (100, 220) to (100, 80) */}
        <path
          d="M 100 220 Q 95 150 100 80"
          stroke="url(#stem-gradient)"
          strokeWidth="4.5"
          strokeLinecap="round"
          className={reducedMotion ? '' : 'flower-stem-draw'}
        />

        {/* 2. Left Leaf unfolding from (97, 150) */}
        <g
          className={reducedMotion ? '' : 'flower-leaf-left'}
          style={{ transformOrigin: '97px 150px' }}
        >
          <path
            d="M 97 150 C 65 142 55 162 70 174 C 85 180 97 165 97 150 Z"
            fill="url(#leaf-gradient)"
            stroke="#5BB78D"
            strokeWidth="1"
            opacity="0.9"
          />
          {/* Leaf vein */}
          <path d="M 97 150 Q 80 160 70 174" stroke="#5BB78D" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* 3. Right Leaf unfolding from (99, 128) */}
        <g
          className={reducedMotion ? '' : 'flower-leaf-right'}
          style={{ transformOrigin: '99px 128px' }}
        >
          <path
            d="M 99 128 C 130 120 142 140 126 153 C 112 160 100 144 99 128 Z"
            fill="url(#leaf-gradient)"
            stroke="#5BB78D"
            strokeWidth="1"
            opacity="0.9"
          />
          {/* Leaf vein */}
          <path d="M 99 128 Q 116 138 126 153" stroke="#5BB78D" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* 4. Flower Head (Center at 100, 80) */}
        <g transform="translate(100, 80)">
          {/* 8 Outer Petals */}
          {petalAngles.map((angle, index) => {
            const delayMs = reducedMotion ? 0 : 850 + index * 110;
            return (
              <g
                key={angle}
                transform={`rotate(${angle})`}
                style={{ transformOrigin: '0px 0px' }}
              >
                <path
                  d="M 0 0 C -18 -32 18 -32 0 0 Z"
                  fill="url(#petal-gradient)"
                  stroke="#FCE4EA"
                  strokeWidth="0.75"
                  className={reducedMotion ? '' : 'flower-petal-bloom'}
                  style={{
                    animationDelay: `${delayMs}ms`,
                    transformOrigin: '0px 0px',
                  }}
                />
              </g>
            );
          })}

          {/* 4 Inner Rose Petal Curves */}
          {[22.5, 112.5, 202.5, 292.5].map((angle, index) => {
            const delayMs = reducedMotion ? 0 : 1750 + index * 90;
            return (
              <g
                key={`inner-${angle}`}
                transform={`rotate(${angle})`}
                style={{ transformOrigin: '0px 0px' }}
              >
                <path
                  d="M 0 0 C -12 -22 12 -22 0 0 Z"
                  fill="#FCE4EA"
                  opacity="0.85"
                  className={reducedMotion ? '' : 'flower-petal-bloom'}
                  style={{
                    animationDelay: `${delayMs}ms`,
                    transformOrigin: '0px 0px',
                  }}
                />
              </g>
            );
          })}

          {/* Center Pistil / Blossom Bud */}
          <circle
            cx="0"
            cy="0"
            r="11"
            fill="#B83A5A"
            className={reducedMotion ? '' : 'flower-center-pulse'}
          />
          <circle cx="0" cy="0" r="7" fill="#FCE4EA" opacity="0.9" />
          <circle cx="0" cy="0" r="3.5" fill="#5BB78D" />
        </g>
      </svg>
    </div>
  );
}
