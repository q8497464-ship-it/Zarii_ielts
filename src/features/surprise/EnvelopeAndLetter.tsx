import React, { useState, useEffect, useRef } from 'react';
import { LoveNoteContent } from './loveNote';
import { AmbientPetals } from './AmbientPetals';

interface EnvelopeAndLetterProps {
  note: LoveNoteContent;
  onClose: () => void;
  reducedMotion?: boolean;
}

export function EnvelopeAndLetter({
  note,
  onClose,
  reducedMotion = false,
}: EnvelopeAndLetterProps) {
  // Envelope open state
  const [isOpen, setIsOpen] = useState(reducedMotion);
  // Typewriter paragraph count (how many paragraphs currently revealed)
  const [revealedCount, setRevealedCount] = useState<number>(() =>
    reducedMotion ? note.paragraphs.length + 2 : 0
  );
  // Whether all content is finished revealing
  const [isFinished, setIsFinished] = useState(reducedMotion);
  // Whether to show petal burst at the end
  const [showBurst, setShowBurst] = useState(false);

  const letterContainerRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  // Focus the envelope open trigger on mount
  useEffect(() => {
    if (!isOpen) {
      openButtonRef.current?.focus();
    }
  }, [isOpen]);

  // When envelope opens, start typewriter paragraph revelation
  useEffect(() => {
    if (!isOpen) return;
    if (reducedMotion) {
      setRevealedCount(note.paragraphs.length + 2);
      setIsFinished(true);
      return;
    }

    // Sequence:
    // Step 0: Greeting (starts at 300ms)
    // Steps 1..N: Paragraphs (every 900ms)
    // Step N+1: Closing & Signature
    const totalSteps = note.paragraphs.length + 2;

    const interval = setInterval(() => {
      setRevealedCount((prev) => {
        if (prev < totalSteps) {
          const next = prev + 1;
          if (next >= totalSteps) {
            setIsFinished(true);
            setShowBurst(true);
          }
          return next;
        }
        clearInterval(interval);
        return prev;
      });
    }, 950);

    return () => clearInterval(interval);
  }, [isOpen, note.paragraphs.length, reducedMotion]);

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      setIsOpen(true);
      if (revealedCount === 0) {
        setRevealedCount(1); // Show greeting immediately
      }
    }
  };

  const handleShowAll = () => {
    setRevealedCount(note.paragraphs.length + 2);
    setIsFinished(true);
    setShowBurst(true);
  };

  const handleReadAgain = () => {
    setRevealedCount(1);
    setIsFinished(false);
    setShowBurst(false);
    if (letterContainerRef.current) {
      letterContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full max-w-[600px] flex flex-col items-center justify-center min-h-[460px] p-2 sm:p-4">
      {/* End-of-letter celebration burst */}
      {showBurst && <AmbientPetals burst={true} reducedMotion={reducedMotion} />}

      {!isOpen ? (
        /* =================================================================== */
        /* STAGE 2A: CLOSED ENVELOPE (Bobs gently, interactive click to open)  */
        /* =================================================================== */
        <div className="flex flex-col items-center space-y-6 animate-zarii-fade-up">
          <button
            ref={openButtonRef}
            data-testid="wax-seal-envelope"
            type="button"
            onClick={handleOpenEnvelope}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenEnvelope();
              }
            }}
            aria-label="Click to open the letter from Qamar"
            className="group relative cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-[#E8798F] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1B2B26] rounded-2xl p-1"
          >
            {/* SVG Envelope */}
            <div
              className={`relative w-[280px] h-[190px] sm:w-[340px] sm:h-[230px] rounded-2xl bg-[#FFF7EE] border border-[#E8D5C4] shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105 group-active:scale-95 ${
                reducedMotion ? '' : 'animate-envelope-bob'
              }`}
            >
              {/* Envelope flap folds and decorative shadow */}
              <svg
                viewBox="0 0 340 230"
                className="absolute inset-0 w-full h-full pointer-events-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Envelope Back Texture */}
                <rect width="340" height="230" fill="#FFF7EE" />

                {/* Left fold */}
                <path d="M 0 0 L 170 125 L 0 230 Z" fill="#FCEEE1" opacity="0.6" />
                {/* Right fold */}
                <path d="M 340 0 L 170 125 L 340 230 Z" fill="#FCEEE1" opacity="0.6" />
                {/* Bottom flap */}
                <path d="M 0 230 L 170 120 L 340 230 Z" fill="#FFF2E6" />
                {/* Top flap */}
                <path
                  d="M 0 0 L 170 120 L 340 0 Z"
                  fill="#FFF7EE"
                  stroke="#E8D5C4"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Heart Wax Seal in the center of the flap */}
              <div
                className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-[#E8798F] via-[#B83A5A] to-[#8C233E] shadow-[0_8px_20px_rgba(184,58,90,0.45)] border-2 border-[#FCE4EA]/40 flex items-center justify-center pointer-events-none"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="#FFFFFF"
                  className="w-7 h-7 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] animate-pulse pointer-events-none"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              {/* Handwritten note on front */}
              <div className="absolute bottom-4 left-6 text-xs text-[#8C6D62] font-serif italic tracking-wide select-none pointer-events-none">
                For {note.recipientName}
              </div>
            </div>
          </button>

          <p className="text-xs sm:text-sm text-[#FCE4EA]/75 tracking-wider uppercase font-semibold flex items-center gap-1.5">
            <span>Tap the wax seal to open</span>
          </p>
        </div>
      ) : (
        /* =================================================================== */
        /* STAGE 2B: OPENED LETTER PAPER CARD                                 */
        /* =================================================================== */
        <div
          ref={letterContainerRef}
          role="region"
          aria-label="Love letter paper"
          className="relative w-full max-w-[560px] max-h-[80dvh] overflow-y-auto rounded-2xl bg-[#FFF9F0] border-t-4 border-t-[#E8798F] border border-[#EEDCCF] shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-6 sm:p-9 md:p-10 text-[#4A3B3B] z-20 animate-letter-slide-up"
          style={{
            backgroundImage:
              'radial-gradient(#E8798F 0.5px, transparent 0.5px), linear-gradient(180deg, #FFFDF8 0%, #FFF9F0 50%, #FFF5E8 100%)',
            backgroundSize: '20px 20px, 100% 100%',
          }}
        >
          {/* Subtle pressed-flower corner ornaments (low opacity SVG) */}
          <div
            className="absolute top-3 left-3 w-8 h-8 opacity-20 pointer-events-none text-[#E8798F]"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2 C8 7 6 12 8 18 C10 22 14 22 16 18 C18 12 16 7 12 2 Z" />
            </svg>
          </div>
          <div
            className="absolute top-3 right-3 w-8 h-8 opacity-20 pointer-events-none text-[#E8798F]"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2 C8 7 6 12 8 18 C10 22 14 22 16 18 C18 12 16 7 12 2 Z" />
            </svg>
          </div>

          {/* Top Skip / Show All Bar */}
          <div className="flex justify-end pb-3 min-h-[32px]">
            {!isFinished ? (
              <button
                type="button"
                onClick={handleShowAll}
                className="text-xs font-semibold text-[#B83A5A] hover:text-[#8C233E] hover:underline focus:outline-none focus:ring-2 focus:ring-[#E8798F] rounded px-2 py-1 transition-colors cursor-pointer"
              >
                Show all lines
              </button>
            ) : (
              <span className="text-[11px] font-medium text-[#7A6666]/70 uppercase tracking-wider">
                Letter Complete
              </span>
            )}
          </div>

          {/* Letter Body: Handwriting Font (Caveat / Kalam / Script) */}
          <article
            className="space-y-5 text-left text-[21px] sm:text-[23px] leading-[1.75]"
            style={{
              fontFamily:
                "'Caveat', 'Kalam', 'Dancing Script', 'Segoe Print', 'Bradley Hand', cursive, sans-serif",
            }}
          >
            {/* Greeting: Script font, larger */}
            {revealedCount >= 1 && (
              <h3
                className="text-[26px] sm:text-[30px] font-bold text-[#B83A5A] tracking-wide animate-zarii-fade-up select-text"
                style={{
                  fontFamily:
                    "'Playfair Display', 'Dancing Script', 'Caveat', 'Georgia', cursive, serif",
                }}
              >
                {note.greeting}
              </h3>
            )}

            {/* Paragraphs 1 through 6 */}
            {note.paragraphs.map((p, idx) => {
              const isShown = revealedCount >= idx + 2;
              if (!isShown) return null;
              return (
                <p
                  key={idx}
                  className="animate-zarii-fade-up select-text tracking-wide text-[#423434]"
                >
                  {p}
                </p>
              );
            })}

            {/* Closing & Signature */}
            {revealedCount >= note.paragraphs.length + 2 && (
              <div className="pt-4 space-y-2 animate-zarii-fade-up select-text">
                <p className="text-[22px] sm:text-[24px] text-[#5A4646]">
                  {note.closing}
                </p>
                <div
                  className="text-[30px] sm:text-[36px] font-bold text-[#B83A5A] flex items-center gap-2 pt-1"
                  style={{
                    fontFamily:
                      "'Dancing Script', 'Playfair Display', 'Caveat', cursive, serif",
                  }}
                >
                  <span>{note.signature}</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="#E8798F"
                    className="w-6 h-6 inline-block animate-pulse text-[#E8798F]"
                    aria-hidden="true"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>

                {/* Footer P.S. Line */}
                <p
                  className="pt-4 text-[16px] sm:text-[18px] text-[#7A6666] italic border-t border-[#EEDCCF]/70 tracking-normal"
                  style={{
                    fontFamily:
                      "'Playfair Display', 'Georgia', serif",
                  }}
                >
                  {note.footerLine}
                </p>
              </div>
            )}
          </article>

          {/* Letter Bottom Controls: Close & Read Again */}
          <div className="mt-8 pt-4 border-t border-[#EEDCCF] flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleReadAgain}
              className="text-xs font-semibold text-[#8C6D62] hover:text-[#4A3B3B] px-3 py-2 rounded-lg border border-[#EEDCCF] hover:bg-[#FFF3E6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E8798F]"
            >
              Read again
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#B83A5A] hover:bg-[#8C233E] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#E8798F]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
