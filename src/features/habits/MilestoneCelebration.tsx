import React, { useEffect, useRef } from 'react';
import { Award, Sparkles, CheckCircle2, Trophy, X } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface MilestoneCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  xpAwarded?: number;
  badgeTitle?: string;
}

export function MilestoneCelebration({
  isOpen,
  onClose,
  title,
  description,
  xpAwarded,
  badgeTitle,
}: MilestoneCelebrationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Elegant, brand palette (deep green, mint, teal, amber, terracotta, emerald)
    const colors = ['#124F40', '#5BB78D', '#0F8B8D', '#C98A0A', '#CF5C45', '#1E9E63'];

    interface Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotSpeed: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    const particleCount = 55;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() * 200 - 100),
        y: canvas.height * 0.35,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 8,
        speedY: (Math.random() - 1.2) * 9,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        opacity: 1,
      });
    }

    let animationId: number;
    const startTime = Date.now();

    const render = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.18; // gravity
        p.speedX *= 0.98; // air resistance
        p.rotation += p.rotSpeed;

        if (elapsed > 1800) {
          p.opacity = Math.max(0, 1 - (elapsed - 1800) / 1200);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.8);
        ctx.restore();
      }

      if (elapsed < 3200) {
        animationId = requestAnimationFrame(render);
      }
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10 w-full h-full"
      />

      {/* Modal Dialog */}
      <div className="relative z-20 bg-white dark:bg-[#112019] border border-[#E1EBE5] dark:border-[#24392F] rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center space-y-5 animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#172A21] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Milestone Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#17634F] to-[#124F40] text-brand-200 border border-brand-500/30 flex items-center justify-center mx-auto shadow-lg shadow-brand-900/30">
          <Trophy className="w-8 h-8 text-brand-300" />
        </div>

        <div className="space-y-2">
          <span className="text-2xs font-extrabold uppercase tracking-widest text-[#C98A0A] dark:text-amber-400">
            Milestone Achieved
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#9DB3A7] leading-relaxed">
            {description}
          </p>
        </div>

        {/* Extras Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {xpAwarded && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              +{xpAwarded} XP Earned
            </span>
          )}
          {badgeTitle && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-100 dark:bg-brand-950/60 text-brand-900 dark:text-brand-300 border border-brand-300 dark:border-brand-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Badge Unlocked: {badgeTitle}
            </span>
          )}
        </div>

        <div className="pt-2">
          <Button
            variant="primary"
            size="md"
            className="w-full bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md"
            onClick={onClose}
          >
            Continue Practice
          </Button>
        </div>
      </div>
    </div>
  );
}
