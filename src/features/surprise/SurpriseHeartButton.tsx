import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Heart } from 'lucide-react';
import { surpriseConfig, isSurpriseDateActive } from './surpriseConfig';
import { supabase } from '../../lib/supabase';

// Lazy-load the full surprise modal so it does not add to the initial student app bundle
const SurpriseModal = React.lazy(() =>
  import('./SurpriseModal').then((m) => ({ default: m.SurpriseModal }))
);

export function SurpriseHeartButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const heartButtonRef = useRef<HTMLButtonElement>(null);

  // Evaluate visibility based on surpriseConfig
  useEffect(() => {
    let isMounted = true;

    async function evaluateVisibility() {
      // 1. Master toggle check
      if (!surpriseConfig.enabled) {
        if (isMounted) setIsVisible(false);
        return;
      }

      // 2. Optional date check (e.g. birthday/anniversary)
      if (!isSurpriseDateActive(surpriseConfig.autoShowOnDate)) {
        if (isMounted) setIsVisible(false);
        return;
      }

      // 3. Email whitelist check
      if (
        !surpriseConfig.visibleForEmails ||
        surpriseConfig.visibleForEmails.length === 0
      ) {
        // Empty whitelist means visible for all students in /app/*
        if (isMounted) setIsVisible(true);
        return;
      }

      // If whitelist is set, user must be logged in with a matching email (hidden in guest mode)
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user || !user.email) {
          if (isMounted) setIsVisible(false);
          return;
        }

        const userEmail = user.email.toLowerCase().trim();
        const allowed = surpriseConfig.visibleForEmails.map((e) =>
          e.toLowerCase().trim()
        );

        if (isMounted) {
          setIsVisible(allowed.includes(userEmail));
        }
      } catch {
        if (isMounted) setIsVisible(false);
      }
    }

    evaluateVisibility();

    // Re-check on auth changes
    const { data: authSub } = supabase.auth.onAuthStateChange(() => {
      evaluateVisibility();
    });

    return () => {
      isMounted = false;
      authSub.subscription.unsubscribe();
    };
  }, []);

  // Prefetch surprise modal and fonts on hover or focus
  const handlePrefetch = () => {
    import('./SurpriseModal');
    if (typeof document !== 'undefined') {
      const fontId = 'zarii-surprise-fonts';
      if (!document.getElementById(fontId)) {
        const link = document.createElement('link');
        link.id = fontId;
        link.rel = 'stylesheet';
        link.href =
          'https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Dancing+Script:wght@600;700&family=Playfair+Display:ital,wght@1,600;1,700&display=swap';
        document.head.appendChild(link);
      }
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <button
        ref={heartButtonRef}
        type="button"
        onClick={() => setIsOpen(true)}
        onMouseEnter={handlePrefetch}
        onFocus={handlePrefetch}
        aria-label="A small surprise"
        className="relative group min-w-[44px] min-h-[44px] p-2.5 rounded-xl flex items-center justify-center transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#E8798F] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 cursor-pointer"
      >
        {/* Subtle, unlabelled outline heart with gentle hover pulse */}
        <Heart
          className="w-[19px] h-[19px] text-[#E8798F] opacity-55 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:scale-110 group-focus-visible:scale-110 group-hover:animate-heartbeat transition-all duration-300 stroke-[1.8]"
          aria-hidden="true"
        />
      </button>

      {/* Lazy-Loaded Surprise Modal */}
      {isOpen && (
        <Suspense fallback={null}>
          <SurpriseModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            returnFocusRef={heartButtonRef}
          />
        </Suspense>
      )}
    </>
  );
}
