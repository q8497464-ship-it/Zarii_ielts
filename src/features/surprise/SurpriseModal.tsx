import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, Heart } from 'lucide-react';
import { FlowerBlooming } from './FlowerBlooming';
import { AmbientPetals } from './AmbientPetals';
import { EnvelopeAndLetter } from './EnvelopeAndLetter';
import { LoveNoteContent, DEFAULT_LOVE_NOTE, fetchLoveNote } from './loveNote';

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  returnFocusRef?: React.RefObject<HTMLButtonElement | null>;
}

export function SurpriseModal({ isOpen, onClose, returnFocusRef }: SurpriseModalProps) {
  // Current stage: 1 = Big Message + Flower; 2 = Envelope & Letter
  const [stage, setStage] = useState<1 | 2>(1);
  const [note, setNote] = useState<LoveNoteContent>(DEFAULT_LOVE_NOTE);
  const [revealedWordIndex, setRevealedWordIndex] = useState<number>(0);
  const [showLetterButton, setShowLetterButton] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const letterButtonRef = useRef<HTMLButtonElement>(null);

  // Manage dedicated #surprise-root attached directly to document.body
  // This completely escapes any containing block / backdrop-filter on header or app shell
  useEffect(() => {
    if (typeof document === 'undefined') return;

    let el = document.getElementById('surprise-root');
    let isCreatedLocally = false;

    if (!el) {
      el = document.createElement('div');
      el.id = 'surprise-root';
      document.body.appendChild(el);
      isCreatedLocally = true;
    }

    setPortalContainer(el);

    return () => {
      if (isCreatedLocally && el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    };
  }, []);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(media.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  // Ensure handwriting & script fonts are loaded into document head
  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return;
    const fontId = 'zarii-surprise-fonts';
    if (!document.getElementById(fontId)) {
      const link = document.createElement('link');
      link.id = fontId;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Dancing+Script:wght@600;700&family=Playfair+Display:ital,wght@1,600;1,700&display=swap';
      document.head.appendChild(link);
    }
  }, [isOpen]);

  // Load note data (from local config or Supabase private_notes if enabled)
  useEffect(() => {
    if (isOpen) {
      fetchLoveNote().then((loaded) => setNote(loaded));
    }
  }, [isOpen]);

  // Lock body & html scroll without layout shift, apply inert to #root, and handle browser back button
  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return;

    // 1. Lock scroll on both html and body, compensating for scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyPaddingRight = document.body.style.paddingRight;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // 2. Make #root inert and aria-hidden so keyboard & screen readers cannot access page behind
    const rootEl = document.getElementById('root');
    const prevInert = rootEl?.hasAttribute('inert') ?? false;
    const prevAriaHidden = rootEl?.getAttribute('aria-hidden');

    if (rootEl) {
      rootEl.setAttribute('inert', '');
      rootEl.setAttribute('aria-hidden', 'true');
    }

    // 3. Push state to history for back button handling
    window.history.pushState({ surpriseOpen: true }, '');

    const handlePopState = () => {
      onClose();
    };
    window.addEventListener('popstate', handlePopState);

    // 4. Focus close button on mount
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.paddingRight = prevBodyPaddingRight;

      if (rootEl) {
        if (!prevInert) rootEl.removeAttribute('inert');
        if (prevAriaHidden !== null && prevAriaHidden !== undefined) {
          rootEl.setAttribute('aria-hidden', prevAriaHidden);
        } else {
          rootEl.removeAttribute('aria-hidden');
        }
      }

      window.removeEventListener('popstate', handlePopState);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  // Handle ESC key and focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Simple focus trap
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Restore focus to heart button on unmount
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      returnFocusRef?.current?.focus();
    }, 50);
  };

  // Words for Stage 1 headline
  // "Qamar loves you sooo much, Zarmeen"
  const words = [
    'Qamar',
    'loves',
    'you',
    'sooo',
    'much,',
    note.recipientName,
  ];

  // Word-by-word animation timer
  useEffect(() => {
    if (!isOpen || stage !== 1) return;

    if (reducedMotion) {
      setRevealedWordIndex(words.length);
      setShowLetterButton(true);
      return;
    }

    setRevealedWordIndex(0);
    setShowLetterButton(false);

    let currentWord = 0;
    const wordInterval = setInterval(() => {
      currentWord++;
      setRevealedWordIndex(currentWord);
      if (currentWord >= words.length) {
        clearInterval(wordInterval);
        // After text finishes (around 3.2s to 3.5s total), show "Open my letter" button
        setTimeout(() => {
          setShowLetterButton(true);
          setTimeout(() => {
            letterButtonRef.current?.focus();
          }, 200);
        }, 1200);
      }
    }, 380); // Each word appears smoothly

    return () => clearInterval(wordInterval);
  }, [isOpen, stage, reducedMotion, words.length]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`A message for ${note.recipientName}`}
      className="fixed inset-0 z-[9999] w-screen min-h-screen h-[100dvh] flex items-center justify-center overflow-hidden animate-surprise-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        minHeight: '100vh',
        height: '100dvh',
        zIndex: 9999,
        background:
          'radial-gradient(circle at 50% 45%, #1B2B26 0%, #0E3D32 65%, #08211B 100%)',
        backgroundColor: '#08211B',
        paddingTop: 'max(16px, env(safe-area-inset-top))',
        paddingRight: 'max(16px, env(safe-area-inset-right))',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        paddingLeft: 'max(16px, env(safe-area-inset-left))',
      }}
    >
      {/* Ambient soft rose glow in center behind content */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#E8798F]/15 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating Ambient Rose Petals & Hearts */}
      <AmbientPetals reducedMotion={reducedMotion} />

      {/* Top Bar: Close Button (X) */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleClose}
          aria-label="Close surprise message"
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white/90 hover:text-white border border-white/20 backdrop-blur-md transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#E8798F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2B26] cursor-pointer"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-4xl max-h-[92dvh] overflow-y-auto px-4 py-8 flex flex-col items-center justify-center text-center">
        {stage === 1 ? (
          /* ================================================================= */
          /* STAGE 1: BIG HEADLINE + BLOOMING SVG FLOWER                       */
          /* ================================================================= */
          <div className="flex flex-col items-center space-y-6 sm:space-y-8 max-w-2xl mx-auto">
            {/* Blooming Flower Component */}
            <FlowerBlooming reducedMotion={reducedMotion} />

            {/* Revealed Text: Qamar loves you sooo much, Zarmeen */}
            <div className="space-y-3 px-2">
              <h2
                className="text-[32px] sm:text-[48px] md:text-[62px] lg:text-[70px] font-extrabold text-white tracking-tight leading-[1.18] flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
                style={{
                  textShadow:
                    '0 4px 24px rgba(232, 121, 143, 0.45), 0 2px 8px rgba(0, 0, 0, 0.6)',
                }}
              >
                {words.map((word, idx) => {
                  const isVisible = reducedMotion || idx < revealedWordIndex;
                  const isName = idx === words.length - 1;

                  return (
                    <span
                      key={idx}
                      className={`inline-block transition-all duration-500 transform ${
                        isVisible
                          ? 'opacity-100 translate-y-0 scale-100'
                          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                      }`}
                    >
                      {isName ? (
                        <span className="inline-flex items-center gap-2">
                          <span
                            className="bg-gradient-to-r from-[#FCE4EA] via-[#E8798F] to-[#B83A5A] bg-clip-text text-transparent font-bold tracking-normal italic select-text"
                            style={{
                              fontFamily:
                                "'Playfair Display', 'Dancing Script', 'Caveat', 'Georgia', serif",
                            }}
                          >
                            {word}
                          </span>
                          {/* Pulsing heart after name */}
                          <Heart
                            className={`w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 text-[#E8798F] fill-[#E8798F] inline-block ${
                              reducedMotion ? '' : 'animate-heartbeat'
                            }`}
                            aria-hidden="true"
                          />
                        </span>
                      ) : (
                        <span className="text-white select-text">{word}</span>
                      )}
                    </span>
                  );
                })}
              </h2>

              <p className="text-sm sm:text-base text-[#FCE4EA]/80 font-medium tracking-wide">
                A warm reminder during your IELTS journey
              </p>
            </div>

            {/* Stage 1 CTA Button: "Open my letter" */}
            <div
              className={`pt-4 transition-all duration-700 transform ${
                showLetterButton
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <button
                ref={letterButtonRef}
                type="button"
                onClick={() => setStage(2)}
                className="h-12 px-7 rounded-xl border-2 border-[#E8798F] bg-[#E8798F]/20 hover:bg-[#E8798F] text-[#FCE4EA] hover:text-[#1B2B26] font-bold text-sm sm:text-base shadow-[0_4px_20px_rgba(232,121,143,0.35)] hover:shadow-[0_6px_25px_rgba(232,121,143,0.6)] transition-all duration-300 flex items-center gap-2.5 group cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#E8798F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2B26]"
              >
                <Mail className="w-4 h-4 text-[#E8798F] group-hover:text-[#1B2B26] transition-colors" />
                <span>Open my letter</span>
                <Heart className="w-3.5 h-3.5 text-[#E8798F] group-hover:text-[#1B2B26] fill-current transition-colors" />
              </button>
            </div>
          </div>
        ) : (
          /* ================================================================= */
          /* STAGE 2: CLOSED ENVELOPE -> LOVE LETTER CARD                     */
          /* ================================================================= */
          <div className="w-full flex items-center justify-center animate-surprise-fade-in">
            <EnvelopeAndLetter
              note={note}
              onClose={handleClose}
              reducedMotion={reducedMotion}
            />
          </div>
        )}
      </div>
    </div>
  );

  if (portalContainer) {
    return createPortal(modalContent, portalContainer);
  }

  return modalContent;
}
