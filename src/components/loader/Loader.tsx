import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { LOADING_TIPS, getRandomTip, LoadingTip } from '../../lib/loadingTips';

export interface LoaderProps {
  variant?: 'splash' | 'page' | 'card' | 'inline' | 'overlay';
  message?: string;
  submessage?: string;
  showTip?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Animated Zarii Logo Mark (Book pages draw + Z drop-in + floating loop + sparkle)
 */
export function AnimatedZariiMark({
  size = 'md',
  className,
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16 sm:w-20 sm:h-20',
    lg: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  return (
    <div className={cn('relative flex items-center justify-center shrink-0 select-none', sizeMap[size], className)}>
      {/* Soft pulsing mint radial glow */}
      <div
        className="absolute inset-0 rounded-full bg-[#5BB78D]/20 dark:bg-[#5BB78D]/25 blur-xl pointer-events-none animate-zarii-glow"
        aria-hidden="true"
      />

      {/* SVG Logo Mark */}
      <svg
        viewBox="190 88 664 593"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 animate-zarii-float"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="zarii-bar-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#124F40" />
            <stop offset="100%" stopColor="#5BB78D" />
          </linearGradient>
        </defs>

        {/* 1. Left Book Page (Deep green in light mode, mint in dark mode) */}
        <path
          className="fill-[#124F40] dark:fill-[#5BB78D] animate-zarii-book-draw"
          fillRule="evenodd"
          d="M 314 536 L 360 536 L 393 540 L 406 544 L 415 545 L 433 551 L 435 553 L 441 554 L 447 558 L 450 558 L 458 562 L 459 564 L 465 566 L 466 568 L 470 569 L 475 574 L 477 574 L 498 593 L 498 595 L 502 598 L 502 600 L 504 601 L 504 603 L 507 605 L 508 609 L 511 612 L 512 632 L 485 617 L 479 616 L 477 614 L 462 609 L 436 603 L 402 598 L 378 596 L 318 596 L 276 600 L 240 606 L 251 584 L 253 583 L 254 579 L 258 575 L 265 561 L 267 560 L 267 558 L 269 557 L 269 555 L 271 554 L 271 552 L 273 551 L 274 547 L 278 542 L 314 536 Z"
        />

        {/* 2. Right Book Page (Mint green) */}
        <path
          className="fill-[#5BB78D] animate-zarii-book-draw"
          fillRule="evenodd"
          d="M 664 533 L 705 533 L 730 536 L 756 542 L 774 578 L 774 581 L 777 585 L 778 590 L 781 593 L 781 596 L 786 606 L 759 600 L 712 594 L 630 594 L 594 599 L 567 605 L 544 613 L 540 616 L 537 616 L 529 620 L 528 622 L 524 623 L 512 632 L 512 616 L 517 606 L 519 605 L 520 601 L 540 578 L 542 578 L 555 567 L 559 566 L 560 564 L 566 562 L 567 560 L 581 553 L 584 553 L 588 550 L 611 542 L 633 537 L 664 533 Z"
        />

        {/* 3. The "Z" (Drops in with spring, sits on book) */}
        <path
          className="fill-[#124F40] dark:fill-white animate-zarii-z-drop"
          fillRule="evenodd"
          d="M 321 138 L 761 138 L 745 166 L 741 169 L 741 171 L 737 174 L 734 180 L 725 189 L 725 191 L 722 193 L 719 199 L 715 202 L 715 204 L 711 207 L 707 214 L 702 218 L 702 220 L 698 223 L 695 229 L 686 238 L 686 240 L 682 243 L 682 245 L 670 258 L 670 260 L 665 264 L 661 271 L 656 275 L 656 277 L 643 291 L 643 293 L 638 297 L 638 299 L 633 303 L 629 310 L 623 315 L 623 317 L 618 321 L 618 323 L 613 327 L 613 329 L 607 334 L 607 336 L 598 345 L 598 347 L 591 353 L 591 355 L 586 359 L 586 361 L 581 365 L 581 367 L 576 371 L 576 373 L 569 379 L 569 381 L 564 385 L 564 387 L 559 391 L 559 393 L 552 399 L 552 401 L 547 405 L 547 407 L 540 413 L 540 415 L 535 419 L 535 421 L 529 426 L 529 428 L 518 439 L 518 441 L 513 445 L 509 452 L 501 459 L 501 461 L 489 474 L 717 475 L 721 483 L 723 484 L 724 488 L 728 492 L 729 496 L 733 500 L 734 504 L 736 505 L 738 511 L 745 520 L 746 524 L 723 519 L 693 515 L 647 516 L 606 524 L 583 532 L 575 537 L 572 537 L 564 541 L 563 543 L 557 545 L 547 553 L 545 553 L 522 574 L 522 576 L 512 587 L 509 581 L 498 570 L 498 568 L 495 565 L 493 565 L 486 557 L 484 557 L 482 554 L 476 551 L 474 548 L 445 532 L 442 532 L 438 529 L 432 528 L 424 524 L 399 518 L 377 515 L 339 515 L 292 523 L 297 518 L 297 516 L 305 509 L 305 507 L 314 499 L 314 497 L 327 485 L 327 483 L 334 477 L 334 475 L 344 466 L 344 464 L 355 454 L 355 452 L 380 427 L 380 425 L 402 403 L 402 401 L 413 391 L 413 389 L 425 378 L 425 376 L 436 366 L 436 364 L 447 354 L 447 352 L 460 340 L 460 338 L 473 326 L 473 324 L 479 319 L 479 317 L 511 284 L 511 282 L 518 276 L 518 274 L 525 268 L 525 266 L 532 260 L 532 258 L 546 243 L 276 242 L 280 230 L 283 226 L 283 223 L 285 222 L 291 205 L 295 199 L 295 196 L 300 188 L 300 185 L 304 179 L 308 167 L 321 141 L 321 138 Z"
        />

        {/* 4. Twinkling Sparkle near Top-Right of Z (760, 134) */}
        <polygon
          points="760,116 764,130 778,134 764,138 760,152 756,138 742,134 756,130"
          className="fill-[#5BB78D] animate-zarii-sparkle"
        />
      </svg>
    </div>
  );
}

/**
 * Slim Indeterminate Progress Bar (160px width, 4px height)
 */
export function ShimmerProgressBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-40 h-1 rounded-full bg-slate-200/80 dark:bg-white/10 overflow-hidden relative',
        className
      )}
      role="progressbar"
      aria-label="Loading progress"
    >
      <div className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-[#124F40] via-[#5BB78D] to-[#124F40] dark:from-[#5BB78D] dark:via-white dark:to-[#5BB78D] animate-zarii-progress-shimmer" />
    </div>
  );
}

/**
 * Reusable Universal Loader Component
 * Variants: splash, page, card, inline, overlay
 */
export function Loader({
  variant = 'page',
  message,
  submessage,
  showTip = false,
  className,
  size,
}: LoaderProps) {
  const [currentTip, setCurrentTip] = useState<LoadingTip>(() => getRandomTip());
  const [tipFade, setTipFade] = useState(true);

  // Rotate friendly study tip every 2.5s if requested or in splash/page mode
  useEffect(() => {
    if (!showTip && variant !== 'splash') return;

    const interval = setInterval(() => {
      setTipFade(false);
      setTimeout(() => {
        setCurrentTip((prev) => getRandomTip(prev.id));
        setTipFade(true);
      }, 200);
    }, 2500);

    return () => clearInterval(interval);
  }, [showTip, variant]);

  // Variant: INLINE (Minimal for buttons, tags, or small cards)
  if (variant === 'inline') {
    return (
      <span
        role="status"
        aria-live="polite"
        className={cn('inline-flex items-center gap-2 select-none', className)}
      >
        <span className="sr-only">Loading Zarii...</span>
        <svg
          className="w-4 h-4 animate-spin text-[#124F40] dark:text-[#5BB78D]"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-90"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {message && (
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {message}
          </span>
        )}
      </span>
    );
  }

  // Variant: CARD (Compact for dashboard widgets, content cards)
  if (variant === 'card') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'w-full py-10 px-6 rounded-2xl bg-white/70 dark:bg-[#112019]/70 border border-slate-200/80 dark:border-white/10 flex flex-col items-center justify-center gap-3.5 text-center',
          className
        )}
      >
        <span className="sr-only">Loading Zarii...</span>
        <AnimatedZariiMark size={size || 'sm'} />
        <ShimmerProgressBar className="w-28" />
        {message && (
          <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
            {message}
          </p>
        )}
        {submessage && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs">
            {submessage}
          </p>
        )}
      </div>
    );
  }

  // Variant: OVERLAY (Fixed backdrop blur for auth redirects, modal processing)
  if (variant === 'overlay') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#F7FAF8]/85 dark:bg-[#0B1612]/85 backdrop-blur-md select-none animate-in fade-in duration-200',
          className
        )}
      >
        <span className="sr-only">Loading Zarii...</span>
        <div className="flex flex-col items-center text-center space-y-4 max-w-sm">
          <AnimatedZariiMark size="lg" />
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold tracking-tight text-[#124F40] dark:text-white">
              Zarii
            </h2>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400">
              IELTS PREPARATION
            </p>
          </div>
          <ShimmerProgressBar />
          {message && (
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 pt-1">
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Variant: PAGE or SPLASH (Full screen or layout level)
  const isSplash = variant === 'splash';

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex flex-col items-center justify-center select-none text-center',
        isSplash
          ? 'fixed inset-0 z-[9999] min-h-screen w-full bg-[#F7FAF8] dark:bg-[#0B1612] px-6 py-12'
          : 'min-h-[50vh] w-full py-16 px-6',
        className
      )}
    >
      <span className="sr-only">Loading Zarii...</span>

      {/* Main Mark Animation */}
      <AnimatedZariiMark size={size || (isSplash ? 'lg' : 'md')} />

      {/* Wordmark & Subtitle */}
      <div className="mt-4 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#124F40] dark:text-white animate-zarii-fade-up">
          Zarii
        </h1>
        <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 animate-zarii-fade-up-delay">
          IELTS PREPARATION
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mt-5">
        <ShimmerProgressBar />
      </div>

      {/* Custom Message or Status */}
      {message && (
        <p className="mt-3 text-xs font-medium text-slate-600 dark:text-slate-300">
          {message}
        </p>
      )}

      {/* Rotating Friendly Study Tip */}
      {(showTip || isSplash) && (
        <div className="mt-6 min-h-[44px] flex items-center justify-center max-w-md px-4">
          <p
            className={cn(
              'text-xs sm:text-[13px] leading-relaxed text-slate-600 dark:text-slate-300 font-medium transition-opacity duration-200',
              tipFade ? 'opacity-100' : 'opacity-0'
            )}
          >
            {currentTip.text}
          </p>
        </div>
      )}
    </div>
  );
}

export default Loader;
