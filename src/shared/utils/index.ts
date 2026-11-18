import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatBand(band: number | null | undefined): string {
  if (band === null || band === undefined) return '0.0';
  return Number(band).toFixed(1);
}

export function formatDate(dateString: string | Date): string {
  try {
    const d = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return String(dateString);
  }
}

export * from './sanitizer';
export * from './mfaUtils';

