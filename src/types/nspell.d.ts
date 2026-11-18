declare module 'nspell' {
  export default function nspell(aff: any, dic?: any): {
    correct(word: string): boolean;
    suggest(word: string): string[];
    add(word: string): void;
  };
}

declare module 'dictionary-en' {
  const dictionaryEn: (callback: (error: any, result: { aff: Buffer | string; dic: Buffer | string }) => void) => void;
  export default dictionaryEn;
}
