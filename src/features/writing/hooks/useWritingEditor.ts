import { useState, useMemo, useCallback } from 'react';

export function useWritingEditor(initialText: string = '', minWords: number = 150) {
  const [text, setText] = useState(initialText);

  const wordCount = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [text]);

  const isWordCountMet = wordCount >= minWords;

  const handleChange = useCallback((val: string) => {
    setText(val);
  }, []);

  return {
    text,
    wordCount,
    isWordCountMet,
    handleChange,
    setText,
  };
}
