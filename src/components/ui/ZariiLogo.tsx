import React from 'react';
import { cn } from '../../lib/utils';

export interface ZariiLogoProps {
  /**
   * 'full': Z + book + "Zarii" + "IELTS PREPARATION"
   * 'mark': only the Z-on-book symbol
   * 'wordmark': only "Zarii"
   * 'mark-wordmark': mark alongside the "Zarii" wordmark
   */
  variant?: 'full' | 'mark' | 'wordmark' | 'mark-wordmark';
  /**
   * 'auto': color on light mode, white on dark mode
   * 'light': force color version
   * 'dark': force white version
   */
  theme?: 'auto' | 'light' | 'dark';
  /**
   * Size preset or custom via className
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  alt?: string;
}

const sizeHeights = {
  xs: { mark: 'h-5', wordmark: 'h-4', full: 'h-7' },
  sm: { mark: 'h-7', wordmark: 'h-5', full: 'h-9' },
  md: { mark: 'h-9', wordmark: 'h-6', full: 'h-12' },
  lg: { mark: 'h-12', wordmark: 'h-8', full: 'h-16' },
  xl: { mark: 'h-16', wordmark: 'h-11', full: 'h-24' },
};

export function ZariiLogo({
  variant = 'mark-wordmark',
  theme = 'auto',
  size = 'md',
  className,
  alt = 'Zarii: IELTS Preparation',
}: ZariiLogoProps) {
  const heights = sizeHeights[size];

  // Helper classes for theme switching
  const lightClass = theme === 'auto' ? 'dark:hidden' : theme === 'dark' ? 'hidden' : 'block';
  const darkClass = theme === 'auto' ? 'hidden dark:block' : theme === 'light' ? 'hidden' : 'block';

  if (variant === 'full') {
    return (
      <div className={cn('inline-flex items-center justify-center p-1 select-none shrink-0', className)}>
        <img
          src="/brand/zarii-logo-full.svg"
          alt={alt}
          className={cn('w-auto object-contain', heights.full, lightClass)}
        />
        <img
          src="/brand/zarii-logo-full-white.svg"
          alt={alt}
          className={cn('w-auto object-contain', heights.full, darkClass)}
        />
      </div>
    );
  }

  if (variant === 'mark') {
    return (
      <div className={cn('inline-flex items-center justify-center p-0.5 select-none shrink-0', className)}>
        <img
          src="/brand/zarii-mark.svg"
          alt={alt}
          className={cn('w-auto object-contain', heights.mark, lightClass)}
        />
        <img
          src="/brand/zarii-mark-white.svg"
          alt={alt}
          className={cn('w-auto object-contain', heights.mark, darkClass)}
        />
      </div>
    );
  }

  if (variant === 'wordmark') {
    return (
      <div className={cn('inline-flex items-center justify-center p-0.5 select-none shrink-0', className)}>
        <img
          src="/brand/zarii-wordmark.svg"
          alt={alt}
          className={cn('w-auto object-contain', heights.wordmark, lightClass)}
        />
        <img
          src="/brand/zarii-wordmark-white.svg"
          alt={alt}
          className={cn('w-auto object-contain', heights.wordmark, darkClass)}
        />
      </div>
    );
  }

  // 'mark-wordmark': mark with wordmark side-by-side
  return (
    <div className={cn('inline-flex items-center gap-2 select-none shrink-0', className)}>
      <div className="relative flex items-center justify-center">
        <img
          src="/brand/zarii-mark.svg"
          alt=""
          className={cn('w-auto object-contain', heights.mark, lightClass)}
        />
        <img
          src="/brand/zarii-mark-white.svg"
          alt=""
          className={cn('w-auto object-contain', heights.mark, darkClass)}
        />
      </div>
      <div className="relative flex items-center justify-center">
        <img
          src="/brand/zarii-wordmark.svg"
          alt={alt}
          className={cn('w-auto object-contain', heights.wordmark, lightClass)}
        />
        <img
          src="/brand/zarii-wordmark-white.svg"
          alt={alt}
          className={cn('w-auto object-contain', heights.wordmark, darkClass)}
        />
      </div>
    </div>
  );
}
