import React from 'react';
import { cn } from '../../lib/utils';

interface IllustrationProps {
  className?: string;
  size?: number;
}

/**
 * Open Book Illustration
 * Echoes the Zarii open-book logo curvature with solid line weight and rounded caps.
 */
export function BookIllustration({ className, size = 72 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
    >
      {/* Background Soft Pill */}
      <circle cx="40" cy="40" r="34" className="fill-[#F1FAF5] dark:fill-[#172A21]" />
      
      {/* Left Page Fill */}
      <path
        d="M40 54C34 50 24 50 18 52V28C24 26 34 26 40 30V54Z"
        className="fill-white dark:fill-[#112019] stroke-[#124F40] dark:stroke-[#8ACFAE]"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Right Page (Mint Accent Tint) */}
      <path
        d="M40 54C46 50 56 50 62 52V28C56 26 46 26 40 30V54Z"
        className="fill-[#DDF2E7] dark:fill-[#124F40]/40 stroke-[#124F40] dark:stroke-[#8ACFAE]"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Center Spine */}
      <line
        x1="40"
        y1="30"
        x2="40"
        y2="54"
        className="stroke-[#124F40] dark:stroke-[#8ACFAE]"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      
      {/* Text Lines on Left Page */}
      <line x1="23" y1="34" x2="33" y2="34" className="stroke-[#5BB78D]" strokeWidth="2" strokeLinecap="round" />
      <line x1="23" y1="40" x2="35" y2="40" className="stroke-[#5BB78D]/60 dark:stroke-[#5BB78D]/80" strokeWidth="2" strokeLinecap="round" />
      <line x1="23" y1="46" x2="31" y2="46" className="stroke-[#5BB78D]/40 dark:stroke-[#5BB78D]/60" strokeWidth="2" strokeLinecap="round" />
      
      {/* Text Lines on Right Page */}
      <line x1="47" y1="34" x2="57" y2="34" className="stroke-[#1E7A62] dark:stroke-[#5BB78D]" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="40" x2="57" y2="40" className="stroke-[#1E7A62]/60 dark:stroke-[#5BB78D]/80" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="46" x2="53" y2="46" className="stroke-[#1E7A62]/40 dark:stroke-[#5BB78D]/60" strokeWidth="2" strokeLinecap="round" />
      
      {/* Floating Accent Sparkle */}
      <circle cx="58" cy="20" r="3" className="fill-[#5BB78D]" />
    </svg>
  );
}

/**
 * Headphones Illustration (Listening Module)
 */
export function HeadphonesIllustration({ className, size = 72 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
    >
      {/* Background Soft Pill */}
      <circle cx="40" cy="40" r="34" className="fill-[#EDF8F8] dark:fill-[#0A2424]" />
      
      {/* Headband Arc */}
      <path
        d="M22 42V36C22 26 30 18 40 18C50 18 58 26 58 36V42"
        className="stroke-[#0F8B8D] dark:stroke-[#52C5C7]"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Left Earcup */}
      <rect
        x="18"
        y="40"
        width="10"
        height="18"
        rx="5"
        className="fill-white dark:fill-[#112019] stroke-[#0F8B8D] dark:stroke-[#52C5C7]"
        strokeWidth="2.2"
      />
      <line x1="23" y1="45" x2="23" y2="53" className="stroke-[#5BB78D]" strokeWidth="2" strokeLinecap="round" />
      
      {/* Right Earcup */}
      <rect
        x="52"
        y="40"
        width="10"
        height="18"
        rx="5"
        className="fill-white dark:fill-[#112019] stroke-[#0F8B8D] dark:stroke-[#52C5C7]"
        strokeWidth="2.2"
      />
      <line x1="57" y1="45" x2="57" y2="53" className="stroke-[#5BB78D]" strokeWidth="2" strokeLinecap="round" />
      
      {/* Audio Wave Arcs */}
      <path
        d="M36 45C36 43 40 40 40 40C40 40 44 43 44 45C44 48 40 50 40 50C40 50 36 48 36 45Z"
        className="fill-[#5BB78D]"
      />
      <circle cx="40" cy="30" r="2.5" className="fill-[#0F8B8D] dark:fill-[#52C5C7]" />
    </svg>
  );
}

/**
 * Pen & Document Illustration (Writing Module)
 */
export function PenIllustration({ className, size = 72 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
    >
      {/* Background Soft Pill */}
      <circle cx="40" cy="40" r="34" className="fill-[#FEF8EC] dark:fill-[#291C04]" />
      
      {/* Paper Document */}
      <rect
        x="24"
        y="20"
        width="28"
        height="38"
        rx="4"
        className="fill-white dark:fill-[#172A21] stroke-[#124F40] dark:stroke-[#8ACFAE]"
        strokeWidth="2.2"
      />
      <line x1="30" y1="28" x2="42" y2="28" className="stroke-[#C98A0A]" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="34" x2="46" y2="34" className="stroke-[#C98A0A]/60 dark:stroke-[#C98A0A]/80" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="40" x2="38" y2="40" className="stroke-[#C98A0A]/40 dark:stroke-[#C98A0A]/60" strokeWidth="2" strokeLinecap="round" />
      
      {/* Diagonal Stylus / Pen */}
      <path
        d="M58 24L60 26L42 56L36 58L38 52L58 24Z"
        className="fill-[#5BB78D] stroke-[#124F40] dark:stroke-[#8ACFAE]"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="39" cy="55" r="1.5" className="fill-[#124F40] dark:fill-[#8ACFAE]" />
    </svg>
  );
}

/**
 * Microphone & Wave Illustration (Speaking Module)
 */
export function MicrophoneIllustration({ className, size = 72 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
    >
      {/* Background Soft Pill */}
      <circle cx="40" cy="40" r="34" className="fill-[#FCF1EE] dark:fill-[#2D140F]" />
      
      {/* Microphone Capsule */}
      <rect
        x="34"
        y="20"
        width="12"
        height="24"
        rx="6"
        className="fill-white dark:fill-[#172A21] stroke-[#CF5C45] dark:stroke-[#F6CBC3]"
        strokeWidth="2.2"
      />
      <line x1="34" y1="30" x2="46" y2="30" className="stroke-[#CF5C45] dark:stroke-[#F6CBC3]" strokeWidth="1.5" />
      
      {/* Capsule Stand Arc */}
      <path
        d="M28 36C28 43 33 48 40 48C47 48 52 43 52 36"
        className="stroke-[#124F40] dark:stroke-[#8ACFAE]"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line x1="40" y1="48" x2="40" y2="58" className="stroke-[#124F40] dark:stroke-[#8ACFAE]" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="32" y1="58" x2="48" y2="58" className="stroke-[#124F40] dark:stroke-[#8ACFAE]" strokeWidth="2.2" strokeLinecap="round" />
      
      {/* Vocal Wave Dots */}
      <circle cx="22" cy="34" r="2" className="fill-[#5BB78D]" />
      <circle cx="58" cy="34" r="2" className="fill-[#5BB78D]" />
    </svg>
  );
}

/**
 * Empty / New Notebook Illustration (Default Empty State)
 */
export function EmptyInboxIllustration({ className, size = 72 }: IllustrationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
    >
      {/* Background Soft Pill */}
      <circle cx="40" cy="40" r="34" className="fill-[#F1FAF5] dark:fill-[#172A21]" />
      
      {/* Folder / Card Container */}
      <rect
        x="20"
        y="26"
        width="40"
        height="32"
        rx="6"
        className="fill-white dark:fill-[#112019] stroke-[#124F40] dark:stroke-[#8ACFAE]"
        strokeWidth="2.2"
      />
      
      {/* Folder Tab */}
      <path
        d="M20 32L32 32L36 36L60 36"
        className="stroke-[#124F40] dark:stroke-[#8ACFAE]"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      
      {/* Mint Bookmark Tag */}
      <path
        d="M48 26V40L53 36L58 40V26H48Z"
        className="fill-[#5BB78D]"
      />
      
      {/* Check Icon */}
      <path
        d="M32 44L36 48L44 40"
        className="stroke-[#1E7A62] dark:stroke-[#5BB78D]"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
