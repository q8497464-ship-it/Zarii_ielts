/**
 * Zarii IELTS - Candidate Display Name Utilities
 *
 * Ensures candidate names are accurately retrieved and formatted across:
 * - Supabase Auth / Google OAuth metadata
 * - Profile database in Dexie
 * - LocalStorage cache
 * - Formatted email fallbacks
 *
 * Prevents generic placeholders like "Candidate" or "IELTS Candidate"
 * from overriding real user names.
 */

/**
 * Checks whether a candidate name is merely an uncustomized default placeholder.
 */
export function isPlaceholderName(name?: string | null): boolean {
  if (!name || typeof name !== 'string') return true;
  const lower = name.trim().toLowerCase();
  return (
    lower === '' ||
    lower === 'candidate' ||
    lower === 'ielts candidate' ||
    lower === 'guest candidate' ||
    lower === 'guest user' ||
    lower === 'candidate name' ||
    lower === 'undefined' ||
    lower === 'null'
  );
}

/**
 * Extracts and formats a clean display name from user or email strings.
 */
export function formatEmailAsCandidateName(email: string): string {
  if (!email || typeof email !== 'string' || !email.includes('@')) return '';
  const prefix = email.split('@')[0];
  const cleaned = prefix
    .replace(/[._\-+0-9]+/g, ' ')
    .trim();

  if (cleaned) {
    const formatted = cleaned
      .split(' ')
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
    if (formatted && !isPlaceholderName(formatted)) {
      return formatted;
    }
  }

  if (prefix && !isPlaceholderName(prefix)) {
    return prefix.charAt(0).toUpperCase() + prefix.slice(1);
  }

  return '';
}

/**
 * Resolves a clean, human-friendly display name for the candidate.
 * Prioritizes:
 * 1. User's explicitly chosen name in profile
 * 2. User's cached name in localStorage
 * 3. Supabase Auth / Google OAuth metadata (full_name, name, display_name)
 * 4. Humanized email username (e.g. "zarmeen.tariq@gmail.com" -> "Zarmeen Tariq")
 * 5. Returns empty string if no valid candidate name is found (never fake defaults)
 */
export function extractCandidateName(user?: any, existingDisplayName?: string | null): string {
  // 1. Check existing display name if valid and not a placeholder
  if (
    existingDisplayName &&
    typeof existingDisplayName === 'string' &&
    existingDisplayName.trim() &&
    !isPlaceholderName(existingDisplayName)
  ) {
    return existingDisplayName.trim();
  }

  // 2. Check localStorage cached candidate name
  if (typeof localStorage !== 'undefined') {
    try {
      const stored = localStorage.getItem('zarii_candidate_name');
      if (stored && stored.trim() && !isPlaceholderName(stored)) {
        return stored.trim();
      }
    } catch {}
  }

  // 3. User metadata from Supabase / Google OAuth
  if (user) {
    const meta = user.user_metadata || {};
    const candidateName =
      meta.full_name ||
      meta.name ||
      meta.display_name ||
      meta.user_name ||
      meta.preferred_username ||
      user.name;

    if (
      candidateName &&
      typeof candidateName === 'string' &&
      candidateName.trim() &&
      !isPlaceholderName(candidateName)
    ) {
      return candidateName.trim();
    }

    // Check identities if present
    if (Array.isArray(user.identities) && user.identities.length > 0) {
      const identityData = user.identities[0]?.identity_data;
      if (identityData) {
        const idName = identityData.full_name || identityData.name;
        if (idName && typeof idName === 'string' && idName.trim() && !isPlaceholderName(idName)) {
          return idName.trim();
        }
      }
    }

    // 4. Fallback to formatting email
    const email = user.email || '';
    if (email) {
      const fromEmail = formatEmailAsCandidateName(email);
      if (fromEmail) {
        return fromEmail;
      }
    }
  }

  return '';
}
