/**
 * Security Input Sanitizer & Content Validator
 * Defends against XSS, script injection, payload bombing, and untrusted editor HTML.
 */

const SCRIPT_BLOCK_REGEX = /<\s*script\b[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi;
const IFRAME_BLOCK_REGEX = /<\s*iframe\b[^>]*>[\s\S]*?<\s*\/\s*iframe\s*>/gi;
const OBJECT_BLOCK_REGEX = /<\s*object\b[^>]*>[\s\S]*?<\s*\/\s*object\s*>/gi;
const STYLE_BLOCK_REGEX = /<\s*style\b[^>]*>[\s\S]*?<\s*\/\s*style\s*>/gi;
const DANGEROUS_TAGS_REGEX = /<\s*\/?\s*(script|iframe|object|embed|applet|meta|link|base|form|input|textarea|button)\b[^>]*>/gi;
const DANGEROUS_ATTRIBUTES_REGEX = /\s*(on\w+|javascript:|data:|vbscript:)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;
const JAVASCRIPT_PROTOCOL_REGEX = /javascript\s*:/gi;
const VB_SCRIPT_PROTOCOL_REGEX = /vbscript\s*:/gi;

/**
 * Sanitizes raw HTML strings from editors, removing executable scripts,
 * event handlers, frames, and dangerous protocol handlers.
 */
export function sanitizeHtml(dirtyHtml: string | null | undefined): string {
  if (!dirtyHtml) return '';
  if (typeof dirtyHtml !== 'string') return String(dirtyHtml);

  let clean = dirtyHtml
    // Strip entire script, iframe, object, and style blocks with their inner content
    .replace(SCRIPT_BLOCK_REGEX, '')
    .replace(IFRAME_BLOCK_REGEX, '')
    .replace(OBJECT_BLOCK_REGEX, '')
    .replace(STYLE_BLOCK_REGEX, '')
    // Strip any remaining dangerous tags
    .replace(DANGEROUS_TAGS_REGEX, '')
    // Strip event listeners (onclick, onerror, onload, etc.)
    .replace(DANGEROUS_ATTRIBUTES_REGEX, '')
    // Strip javascript: and vbscript: URIs
    .replace(JAVASCRIPT_PROTOCOL_REGEX, 'no-script:')
    .replace(VB_SCRIPT_PROTOCOL_REGEX, 'no-script:');

  // Second pass to ensure nested tricks like <scr<script>ipt> are neutralized
  while (SCRIPT_BLOCK_REGEX.test(clean) || DANGEROUS_TAGS_REGEX.test(clean)) {
    clean = clean.replace(SCRIPT_BLOCK_REGEX, '').replace(DANGEROUS_TAGS_REGEX, '');
  }

  return clean;
}

/**
 * Sanitizes markdown strings by neutralizing raw HTML script blocks
 * and malicious URI schemas in markdown links.
 */
export function sanitizeMarkdown(dirtyMarkdown: string | null | undefined): string {
  if (!dirtyMarkdown) return '';
  if (typeof dirtyMarkdown !== 'string') return String(dirtyMarkdown);

  // First neutralize markdown link scripts: [text](javascript:...)
  let clean = dirtyMarkdown.replace(/\[([^\]]*)\]\(\s*(javascript|vbscript):[^)]*\)/gi, '[$1](#blocked-script)');

  // Then run HTML sanitizer
  clean = sanitizeHtml(clean);

  return clean;
}

export interface FileValidationOptions {
  allowedMimeTypes?: string[];
  maxBytes?: number;
  allowedExtensions?: string[];
}

export const DEFAULT_AUDIO_TYPES = [
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/ogg',
  'audio/mp4',
  'audio/x-m4a',
  'audio/aac',
];

export const DEFAULT_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/svg+xml',
];

export const MAX_AUDIO_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
export const MAX_IMAGE_FILE_SIZE = 5 * 1024 * 1024;  // 5 MB
export const MAX_DATA_FILE_SIZE = 10 * 1024 * 1024;  // 10 MB

/**
 * Validates file upload against MIME types, file size, and extension spoofing.
 */
export function validateUploadedFile(
  file: File,
  options: FileValidationOptions = {}
): { isValid: boolean; error?: string } {
  const {
    allowedMimeTypes,
    maxBytes = 25 * 1024 * 1024,
    allowedExtensions,
  } = options;

  if (!file) {
    return { isValid: false, error: 'No file provided.' };
  }

  // Size validation
  if (file.size > maxBytes) {
    const maxMb = (maxBytes / (1024 * 1024)).toFixed(1);
    const actualMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      isValid: false,
      error: `File size (${actualMb} MB) exceeds maximum allowed limit of ${maxMb} MB.`,
    };
  }

  if (file.size === 0) {
    return { isValid: false, error: 'Empty files (0 bytes) cannot be uploaded.' };
  }

  // MIME type validation
  if (allowedMimeTypes && allowedMimeTypes.length > 0) {
    const isMimeAllowed = allowedMimeTypes.some((type) => {
      if (type.endsWith('/*')) {
        const prefix = type.slice(0, -1);
        return file.type.startsWith(prefix);
      }
      return file.type.toLowerCase() === type.toLowerCase();
    });

    if (!isMimeAllowed) {
      return {
        isValid: false,
        error: `File type "${file.type || 'unknown'}" is not supported. Allowed formats: ${allowedMimeTypes.join(', ')}`,
      };
    }
  }

  // File extension validation to prevent double-extension spoofing (e.g. evil.php.png)
  if (allowedExtensions && allowedExtensions.length > 0) {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !allowedExtensions.includes(`.${ext}`)) {
      return {
        isValid: false,
        error: `File extension ".${ext}" is not permitted.`,
      };
    }
  }

  return { isValid: true };
}
