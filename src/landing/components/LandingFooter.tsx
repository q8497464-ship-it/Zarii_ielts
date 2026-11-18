import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Mail,
  ArrowRight,
  ArrowUp,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { SITE_CONFIG } from '../siteConfig';

interface LandingFooterProps {
  onScrollToAnchor?: (anchor: string) => void;
}

export function LandingFooter({ onScrollToAnchor }: LandingFooterProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const footerRef = useRef<HTMLElement>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  // Reveal animation: fade up 16px with 80ms stagger once scrolled into view
  useEffect(() => {
    if (typeof window === 'undefined') {
      setHasRevealed(true);
      return;
    }
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setHasRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    if (isHomePage && onScrollToAnchor) {
      e.preventDefault();
      onScrollToAnchor(anchor);
    }
  };

  const scrollToTop = () => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  // Social SameAs array for Schema.org (excluding mailto)
  const socialSameAs: string[] = [];
  if (SITE_CONFIG.social.instagram) socialSameAs.push(SITE_CONFIG.social.instagram);
  if (SITE_CONFIG.social.facebook) socialSameAs.push(SITE_CONFIG.social.facebook);
  if (SITE_CONFIG.social.youtube) socialSameAs.push(SITE_CONFIG.social.youtube);
  if (SITE_CONFIG.social.whatsapp) socialSameAs.push(SITE_CONFIG.social.whatsapp);
  if (SITE_CONFIG.social.telegram) socialSameAs.push(SITE_CONFIG.social.telegram);
  if (SITE_CONFIG.social.github) socialSameAs.push(SITE_CONFIG.social.github);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Zarii IELTS Preparation',
    alternateName: 'Zarii',
    url: 'https://zarii.app',
    logo: 'https://zarii.app/brand/zarii-logo-full-white.svg',
    description: SITE_CONFIG.description,
    ...(socialSameAs.length > 0 ? { sameAs: socialSameAs } : {}),
  };

  return (
    <footer
      ref={footerRef}
      role="contentinfo"
      aria-label="Site Footer"
      className="relative w-full overflow-hidden select-text"
    >
      {/* Schema.org Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* =================================================================== */}
      {/* 1. FLOATING CTA GLASS CARD (Overlaps the curve by ~40px)            */}
      {/* =================================================================== */}
      <div className="max-w-[1200px] mx-auto px-6 relative z-30">
        <div
          data-testid="footer-cta-card"
          className="rounded-[24px] bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-white/10 shadow-[0_20px_50px_rgba(10,46,37,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 -mb-10 sm:-mb-14 relative z-30 transition-colors"
        >
          {/* Left CTA text */}
          <div className="text-center md:text-left space-y-2 max-w-xl">
            {/* Pill badge with sparkle */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#5BB78D]/15 dark:bg-[#5BB78D]/20 text-[#124F40] dark:text-[#5BB78D]">
              <Sparkles className="w-3.5 h-3.5 text-[#0F8B8D] dark:text-[#5BB78D]" />
              <span>Free Exam-Style Practice</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#124F40] dark:text-white tracking-tight leading-tight">
              Start your <span className="text-[#0F8B8D] dark:text-[#5BB78D]">IELTS journey</span> today
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
              Free practice for all four skills. No credit card needed.
            </p>
          </div>

          {/* Right CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <Link
              to="/signup"
              className="w-full sm:w-auto h-12 px-7 bg-[#124F40] hover:bg-[#0E3D32] active:bg-[#0A2E25] text-white dark:bg-[#5BB78D] dark:hover:bg-[#4ea77e] dark:text-[#0A2E25] font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
            >
              <span>Sign up free</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto h-12 px-7 border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 hover:bg-slate-50 dark:border-white/30 dark:hover:border-white dark:text-white dark:hover:bg-white/10 font-bold text-sm rounded-xl transition-all flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. CURVED TOP EDGE SVG (Smooth blend from previous section)        */}
      {/* =================================================================== */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none relative z-10 -mb-1">
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-16 block"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Main curve filled with top footer gradient color */}
          <path
            d="M0,64 C480,12 960,12 1440,64 L1440,64 L0,64 Z"
            fill="#124F40"
          />
          {/* Thin 2px gradient accent line along the top curve */}
          <path
            d="M0,64 C480,12 960,12 1440,64"
            stroke="url(#footer-curve-stroke)"
            strokeWidth="2"
            fill="none"
          />
          <defs>
            <linearGradient id="footer-curve-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5BB78D" stopOpacity="0" />
              <stop offset="25%" stopColor="#5BB78D" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#5BB78D" stopOpacity="0.9" />
              <stop offset="75%" stopColor="#5BB78D" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#5BB78D" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* =================================================================== */}
      {/* 3. MAIN FOOTER BODY (Deep Green Gradient & Decorative Layers)       */}
      {/* =================================================================== */}
      <div
        className="relative w-full text-white pt-24 sm:pt-28 lg:pt-[120px] pb-[max(32px,env(safe-area-inset-bottom))]"
        style={{
          background: 'linear-gradient(160deg, #124F40 0%, #0E3D32 55%, #0A2E25 100%)',
        }}
      >

        {/* Decorative layer A: Soft mint radial glow in top-left */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#5BB78D]/10 rounded-full blur-[100px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Decorative layer B: Faint dot grid in top-right corner */}
        <div
          className="absolute top-12 right-0 w-80 h-80 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#FFFFFF 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        {/* Decorative layer C: Large open-book curve in bottom-right (6-8% opacity) */}
        <svg
          viewBox="0 0 500 350"
          className="absolute -bottom-8 -right-8 w-96 sm:w-[460px] h-auto text-white opacity-[0.07] pointer-events-none select-none"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M 50 180 C 150 130 250 160 250 280 C 250 160 350 130 450 180 L 450 100 C 350 50 250 80 250 200 C 250 80 150 50 50 100 Z" />
        </svg>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          {/* =============================================================== */}
          {/* 4. LINK COLUMNS GRID (1.5fr 1fr 1fr 1fr on desktop)             */}
          {/* =============================================================== */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 sm:gap-12 lg:gap-16 items-start">
            {/* Column A: Brand Overview (Full-width on tablet, col-span-2 on mobile) */}
            <div
              className={`col-span-2 md:col-span-3 lg:col-span-1 space-y-5 transition-all duration-700 ease-out ${
                hasRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '0ms' }}
            >
              {/* White Full Zarii Logo (64px mobile, 80px desktop) */}
              <Link
                to="/"
                className="inline-flex items-center focus:outline-none focus:ring-2 focus:ring-[#5BB78D] rounded-2xl p-1 -ml-1 transition-transform"
                aria-label="Zarii Home"
              >
                <img
                  src="/brand/zarii-logo-full-white.svg"
                  alt="Zarii IELTS Preparation"
                  className="h-16 sm:h-[80px] w-auto object-contain drop-shadow-md shrink-0 block"
                />
              </Link>

              {/* Full Name & 2-Line Description with 24px top breathing room */}
              <div className="pt-2">
                <h2 className="text-lg font-semibold text-white tracking-tight">
                  Zarii IELTS Preparation
                </h2>
                <p className="text-white/75 text-base leading-[1.7] max-w-[360px] mt-2">
                  Free, exam-style practice for Listening, Reading, Writing and Speaking, with instant feedback and a study plan built around your target band.
                </p>
              </div>

              {/* Verified Contact Email */}
              {SITE_CONFIG.supportEmail && (
                <div className="pt-1">
                  <a
                    href={`mailto:${SITE_CONFIG.supportEmail}`}
                    className="inline-flex items-center gap-2.5 text-sm text-white/75 hover:text-white transition-colors group focus:outline-none focus:ring-2 focus:ring-[#5BB78D] rounded-md px-1 py-1"
                    aria-label="Contact Zarii Support via Email"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-[#5BB78D] group-hover:text-[#124F40] transition-colors shrink-0">
                      <Mail className="w-4 h-4 text-[#5BB78D] group-hover:text-[#124F40] transition-colors" />
                    </div>
                    <span className="font-medium">{SITE_CONFIG.supportEmail}</span>
                  </a>
                </div>
              )}

              {/* Optional Configured Social Links (Only rendered if filled) */}
              {socialSameAs.length > 0 && (
                <div className="flex items-center gap-2.5 pt-2">
                  {SITE_CONFIG.social.instagram && (
                    <a
                      href={SITE_CONFIG.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-[#5BB78D] hover:border-[#5BB78D] hover:text-[#124F40] hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                      aria-label="Follow Zarii on Instagram"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </a>
                  )}
                  {SITE_CONFIG.social.facebook && (
                    <a
                      href={SITE_CONFIG.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-[#5BB78D] hover:border-[#5BB78D] hover:text-[#124F40] hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                      aria-label="Follow Zarii on Facebook"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                  )}
                  {SITE_CONFIG.social.youtube && (
                    <a
                      href={SITE_CONFIG.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-[#5BB78D] hover:border-[#5BB78D] hover:text-[#124F40] hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                      aria-label="Subscribe to Zarii on YouTube"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#124F40" />
                      </svg>
                    </a>
                  )}
                  {SITE_CONFIG.social.whatsapp && (
                    <a
                      href={SITE_CONFIG.social.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-[#5BB78D] hover:border-[#5BB78D] hover:text-[#124F40] hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                      aria-label="Chat with Zarii on WhatsApp"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                    </a>
                  )}
                  {SITE_CONFIG.social.github && (
                    <a
                      href={SITE_CONFIG.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-[#5BB78D] hover:border-[#5BB78D] hover:text-[#124F40] hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
                      aria-label="Zarii GitHub Repository"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Column B: Product Anchors */}
            <nav
              aria-label="Product Links"
              className={`col-span-1 space-y-3.5 transition-all duration-700 ease-out ${
                hasRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '80ms' }}
            >
              <div>
                <h2 className="text-[13px] uppercase font-bold tracking-[0.1em] text-[#5BB78D] block select-none">
                  Product
                </h2>
                <div className="w-6 h-[2px] bg-[#5BB78D] mt-2 mb-4 rounded-full" aria-hidden="true" />
              </div>

              <ul className="space-y-3.5">
                <li>
                  <a
                    href="/#features"
                    onClick={(e) => handleAnchorClick(e, '#features')}
                    className="group flex items-center text-[15px] text-white/[0.78] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB78D] rounded-md py-1 min-h-[44px] sm:min-h-0"
                  >
                    <span className="flex items-center transform transition-transform duration-200 group-hover:translate-x-1">
                      <ChevronRight
                        className="w-3.5 h-3.5 text-[#5BB78D] opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 transition-all duration-200 shrink-0"
                        aria-hidden="true"
                      />
                      <span>Features</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/#modules"
                    onClick={(e) => handleAnchorClick(e, '#modules')}
                    className="group flex items-center text-[15px] text-white/[0.78] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB78D] rounded-md py-1 min-h-[44px] sm:min-h-0"
                  >
                    <span className="flex items-center transform transition-transform duration-200 group-hover:translate-x-1">
                      <ChevronRight
                        className="w-3.5 h-3.5 text-[#5BB78D] opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 transition-all duration-200 shrink-0"
                        aria-hidden="true"
                      />
                      <span>Modules</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/#how-it-works"
                    onClick={(e) => handleAnchorClick(e, '#how-it-works')}
                    className="group flex items-center text-[15px] text-white/[0.78] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB78D] rounded-md py-1 min-h-[44px] sm:min-h-0"
                  >
                    <span className="flex items-center transform transition-transform duration-200 group-hover:translate-x-1">
                      <ChevronRight
                        className="w-3.5 h-3.5 text-[#5BB78D] opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 transition-all duration-200 shrink-0"
                        aria-hidden="true"
                      />
                      <span>How it works</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/#faq"
                    onClick={(e) => handleAnchorClick(e, '#faq')}
                    className="group flex items-center text-[15px] text-white/[0.78] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB78D] rounded-md py-1 min-h-[44px] sm:min-h-0"
                  >
                    <span className="flex items-center transform transition-transform duration-200 group-hover:translate-x-1">
                      <ChevronRight
                        className="w-3.5 h-3.5 text-[#5BB78D] opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 transition-all duration-200 shrink-0"
                        aria-hidden="true"
                      />
                      <span>FAQ</span>
                    </span>
                  </a>
                </li>
              </ul>
            </nav>

            {/* Column C: Modules Anchors with Skill Color Dots */}
            <nav
              aria-label="Modules Links"
              className={`col-span-1 space-y-3.5 transition-all duration-700 ease-out ${
                hasRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '160ms' }}
            >
              <div>
                <h2 className="text-[13px] uppercase font-bold tracking-[0.1em] text-[#5BB78D] block select-none">
                  Modules
                </h2>
                <div className="w-6 h-[2px] bg-[#5BB78D] mt-2 mb-4 rounded-full" aria-hidden="true" />
              </div>

              <ul className="space-y-3.5">
                <li>
                  <a
                    href="/#modules"
                    onClick={(e) => handleAnchorClick(e, '#modules')}
                    className="group flex items-center text-[15px] text-white/[0.78] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB78D] rounded-md py-1 min-h-[44px] sm:min-h-0"
                  >
                    <span
                      className="w-2 h-2 rounded-full mr-2.5 shrink-0 transition-transform duration-200 group-hover:scale-125"
                      style={{ backgroundColor: '#0F8B8D' }}
                      aria-hidden="true"
                    />
                    <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                      Listening
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/#modules"
                    onClick={(e) => handleAnchorClick(e, '#modules')}
                    className="group flex items-center text-[15px] text-white/[0.78] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB78D] rounded-md py-1 min-h-[44px] sm:min-h-0"
                  >
                    <span
                      className="w-2 h-2 rounded-full mr-2.5 shrink-0 transition-transform duration-200 group-hover:scale-125"
                      style={{ backgroundColor: '#2F9477' }}
                      aria-hidden="true"
                    />
                    <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                      Reading
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/#modules"
                    onClick={(e) => handleAnchorClick(e, '#modules')}
                    className="group flex items-center text-[15px] text-white/[0.78] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB78D] rounded-md py-1 min-h-[44px] sm:min-h-0"
                  >
                    <span
                      className="w-2 h-2 rounded-full mr-2.5 shrink-0 transition-transform duration-200 group-hover:scale-125"
                      style={{ backgroundColor: '#C98A0A' }}
                      aria-hidden="true"
                    />
                    <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                      Writing
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/#modules"
                    onClick={(e) => handleAnchorClick(e, '#modules')}
                    className="group flex items-center text-[15px] text-white/[0.78] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB78D] rounded-md py-1 min-h-[44px] sm:min-h-0"
                  >
                    <span
                      className="w-2 h-2 rounded-full mr-2.5 shrink-0 transition-transform duration-200 group-hover:scale-125"
                      style={{ backgroundColor: '#CF5C45' }}
                      aria-hidden="true"
                    />
                    <span className="transform transition-transform duration-200 group-hover:translate-x-1">
                      Speaking
                    </span>
                  </a>
                </li>
              </ul>
            </nav>

            {/* Column D: Company and Legal */}
            <nav
              aria-label="Company and Legal Links"
              className={`col-span-2 sm:col-span-1 space-y-3.5 transition-all duration-700 ease-out ${
                hasRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '240ms' }}
            >
              <div>
                <h2 className="text-[13px] uppercase font-bold tracking-[0.1em] text-[#5BB78D] block select-none">
                  Company &amp; Legal
                </h2>
                <div className="w-6 h-[2px] bg-[#5BB78D] mt-2 mb-4 rounded-full" aria-hidden="true" />
              </div>

              <ul className="space-y-3.5">
                <li>
                  <Link
                    to="/about"
                    className="group flex items-center text-[15px] text-white/[0.78] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB78D] rounded-md py-1 min-h-[44px] sm:min-h-0"
                  >
                    <span className="flex items-center transform transition-transform duration-200 group-hover:translate-x-1">
                      <ChevronRight
                        className="w-3.5 h-3.5 text-[#5BB78D] opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 transition-all duration-200 shrink-0"
                        aria-hidden="true"
                      />
                      <span>About</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="group flex items-center text-[15px] text-white/[0.78] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB78D] rounded-md py-1 min-h-[44px] sm:min-h-0"
                  >
                    <span className="flex items-center transform transition-transform duration-200 group-hover:translate-x-1">
                      <ChevronRight
                        className="w-3.5 h-3.5 text-[#5BB78D] opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 transition-all duration-200 shrink-0"
                        aria-hidden="true"
                      />
                      <span>Contact</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="group flex items-center text-[15px] text-white/[0.78] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB78D] rounded-md py-1 min-h-[44px] sm:min-h-0"
                  >
                    <span className="flex items-center transform transition-transform duration-200 group-hover:translate-x-1">
                      <ChevronRight
                        className="w-3.5 h-3.5 text-[#5BB78D] opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 transition-all duration-200 shrink-0"
                        aria-hidden="true"
                      />
                      <span>Privacy Policy</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="group flex items-center text-[15px] text-white/[0.78] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BB78D] rounded-md py-1 min-h-[44px] sm:min-h-0"
                  >
                    <span className="flex items-center transform transition-transform duration-200 group-hover:translate-x-1">
                      <ChevronRight
                        className="w-3.5 h-3.5 text-[#5BB78D] opacity-0 -ml-3.5 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5 transition-all duration-200 shrink-0"
                        aria-hidden="true"
                      />
                      <span>Terms of Use</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* =============================================================== */}
          {/* 5. DIVIDER (1px line, white at 12% opacity)                    */}
          {/* =============================================================== */}
          <div className="border-t border-white/12 my-12 sm:my-14" aria-hidden="true" />

          {/* =============================================================== */}
          {/* 6. BIG WORDMARK SIGN-OFF (Gradient clipped text watermark)      */}
          {/* =============================================================== */}
          <div
            aria-hidden="true"
            data-testid="footer-wordmark"
            className="text-center select-none pointer-events-none font-extrabold text-[clamp(40px,8vw,120px)] tracking-[-0.03em] leading-none my-6 sm:my-8 overflow-hidden"
          >
            <span className="inline-block bg-gradient-to-b from-white/[0.22] to-white/[0.04] bg-clip-text text-transparent mr-3 sm:mr-4 whitespace-nowrap">
              Zarii
            </span>
            <span className="inline-block bg-gradient-to-b from-white/[0.18] to-white/[0.03] bg-clip-text text-transparent whitespace-nowrap">
              IELTS Preparation
            </span>
          </div>

          {/* =============================================================== */}
          {/* 7. BOTTOM LEGAL BAR WITH BACK TO TOP BUTTON                     */}
          {/* =============================================================== */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-white/70 pt-6 border-t border-white/[0.12]">
            <p className="text-center sm:text-left">
              &copy; {currentYear} Zarii IELTS Preparation. All rights reserved.
            </p>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#5BB78D] rounded-md px-1 py-1 min-h-[44px] flex items-center sm:min-h-0"
                >
                  Privacy
                </Link>
                <span className="text-white/30" aria-hidden="true">•</span>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#5BB78D] rounded-md px-1 py-1 min-h-[44px] flex items-center sm:min-h-0"
                >
                  Terms
                </Link>
                <span className="text-white/30" aria-hidden="true">•</span>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#5BB78D] rounded-md px-1 py-1 min-h-[44px] flex items-center sm:min-h-0"
                >
                  Contact
                </Link>
              </div>

              {/* Circular 44px Back to Top Button */}
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-[#5BB78D] flex items-center justify-center transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] cursor-pointer shrink-0 ml-2 shadow-sm"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* =============================================================== */}
          {/* 8. TRADEMARK & ESTIMATED BAND SCORE DISCLAIMER                  */}
          {/* =============================================================== */}
          <p className="text-[12.5px] text-white/60 leading-[1.6] text-center pt-4 max-w-[820px] mx-auto">
            IELTS is a registered trademark of its respective owners. Zarii IELTS Preparation is an independent preparation platform and is not affiliated with or endorsed by IELTS partners. Band scores shown are estimates, not official results.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
