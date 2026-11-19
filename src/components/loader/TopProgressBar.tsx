import React, { useEffect, useState, useRef } from 'react';
import { cn } from '../../lib/utils';

export interface TopProgressBarProps {
  isLoading?: boolean;
  className?: string;
}

/**
 * Global TopProgressBar (GitHub / YouTube style)
 * Fixed 3px bar at the top of the viewport.
 * Only appears if loading exceeds 150ms, preventing flicker on fast transitions.
 */
export function TopProgressBar({ isLoading = true, className }: TopProgressBarProps) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const delayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading) {
      setIsFinishing(false);
      // Only display if loading takes more than 150ms
      delayTimerRef.current = setTimeout(() => {
        setVisible(true);
        setProgress(25);

        // Gradually increment up to 88% while waiting
        progressTimerRef.current = setInterval(() => {
          setProgress((prev) => {
            if (prev < 60) return prev + Math.random() * 15;
            if (prev < 85) return prev + Math.random() * 6;
            if (prev < 92) return prev + 1;
            return prev;
          });
        }, 300);
      }, 150);
    } else {
      // Clear start timers
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);

      if (visible) {
        // Complete the bar smoothly
        setProgress(100);
        setIsFinishing(true);
        const hideTimer = setTimeout(() => {
          setVisible(false);
          setProgress(0);
          setIsFinishing(false);
        }, 250);
        return () => clearTimeout(hideTimer);
      } else {
        setVisible(false);
        setProgress(0);
      }
    }

    return () => {
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isLoading, visible]);

  if (!visible) return null;

  return (
    <div
      role="progressbar"
      aria-label="Page loading"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        'fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none overflow-hidden bg-transparent select-none',
        className
      )}
    >
      <div
        className={cn(
          'h-full transition-all ease-out duration-300 shadow-[0_0_8px_rgba(91,183,141,0.6)]',
          isFinishing && 'duration-150 opacity-0 transition-opacity delay-150'
        )}
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #124F40 0%, #5BB78D 100%)',
        }}
      />
    </div>
  );
}

export default TopProgressBar;
