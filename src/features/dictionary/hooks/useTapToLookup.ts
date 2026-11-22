import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppStore } from '../../../store/useAppStore';
import type { TapToLookupPosition } from '../components/TapToLookupPopover';

interface UseTapToLookupOptions {
  containerRef?: React.RefObject<HTMLElement | null>;
  isExamMode?: boolean;
  lookupModeActive?: boolean; // For reading practice toggle
}

export function useTapToLookup(options: UseTapToLookupOptions = {}) {
  const { settings, currentTrack } = useAppStore();
  const location = useLocation();
  const [lookupPosition, setLookupPosition] = useState<TapToLookupPosition | null>(null);

  // Check if tap-to-lookup is enabled in settings
  // Default: true in english track, false in ielts track
  const isEnglishTrack = currentTrack === 'english' || location.pathname.startsWith('/app/english');
  const isEnabledInSettings =
    settings?.tapToLookup !== undefined
      ? settings.tapToLookup
      : isEnglishTrack;

  // Strict Exam-Mode Guard
  // Real IELTS has no dictionary: lookup is completely blocked on all exam pages
  const isExamUrl =
    location.pathname.includes('/mock') ||
    location.search.includes('mode=exam') ||
    options.isExamMode === true;

  const canLookup = isEnabledInSettings && !isExamUrl;

  const cleanSelectedWord = (text: string): string => {
    return text
      .trim()
      .replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '')
      .toLowerCase();
  };

  const extractWordAtPoint = (x: number, y: number): string => {
    // 1. Check if user already highlighted a word
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
      const rawText = selection.toString();
      const cleaned = cleanSelectedWord(rawText);
      if (cleaned.length >= 2 && cleaned.length <= 35 && !cleaned.includes(' ')) {
        return cleaned;
      }
    }

    // 2. Fallback: extract word directly from caret position at (x, y)
    let range: Range | null = null;
    if (document.caretRangeFromPoint) {
      range = document.caretRangeFromPoint(x, y);
    } else if ((document as any).caretPositionFromPoint) {
      const pos = (document as any).caretPositionFromPoint(x, y);
      if (pos && pos.offsetNode) {
        range = document.createRange();
        range.setStart(pos.offsetNode, pos.offset);
        range.collapse(true);
      }
    }

    if (range && range.startContainer.nodeType === Node.TEXT_NODE) {
      const textNode = range.startContainer as Text;
      const content = textNode.textContent || '';
      const offset = range.startOffset;

      let start = offset;
      while (start > 0 && /[a-zA-Z]/.test(content[start - 1])) {
        start--;
      }
      let end = offset;
      while (end < content.length && /[a-zA-Z]/.test(content[end])) {
        end++;
      }

      const word = content.slice(start, end).trim().toLowerCase();
      if (word.length >= 2 && word.length <= 35) {
        return word;
      }
    }

    return '';
  };

  const handleSelection = useCallback(
    (clientX: number, clientY: number) => {
      if (!canLookup) return;
      if (options.lookupModeActive === false) return;

      const word = extractWordAtPoint(clientX, clientY);
      if (word) {
        setLookupPosition({
          x: clientX,
          y: clientY,
          word,
        });
      }
    },
    [canLookup, options.lookupModeActive]
  );

  const handleDoubleClick = useCallback(
    (e: MouseEvent) => {
      if (!canLookup) return;
      if (options.lookupModeActive === false) return;

      const word = extractWordAtPoint(e.clientX, e.clientY);
      if (word) {
        setLookupPosition({
          x: e.clientX,
          y: e.clientY,
          word,
        });
      }
    },
    [canLookup, options.lookupModeActive]
  );

  useEffect(() => {
    const container = options.containerRef?.current || document;

    const onDblClick = (e: Event) => handleDoubleClick(e as MouseEvent);

    // Mobile long press / selection end
    let touchStartTime = 0;
    let touchX = 0;
    let touchY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartTime = Date.now();
      if (e.touches[0]) {
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      const duration = Date.now() - touchStartTime;
      if (duration > 450) {
        // Long press detected
        setTimeout(() => {
          handleSelection(touchX, touchY);
        }, 80);
      }
    };

    container.addEventListener('dblclick', onDblClick);
    container.addEventListener('touchstart', onTouchStart as any);
    container.addEventListener('touchend', onTouchEnd as any);

    return () => {
      container.removeEventListener('dblclick', onDblClick);
      container.removeEventListener('touchstart', onTouchStart as any);
      container.removeEventListener('touchend', onTouchEnd as any);
    };
  }, [options.containerRef, handleDoubleClick, handleSelection]);

  const closeLookup = useCallback(() => {
    setLookupPosition(null);
  }, []);

  return {
    lookupPosition,
    closeLookup,
    isLookupDisabled: !canLookup,
  };
}
