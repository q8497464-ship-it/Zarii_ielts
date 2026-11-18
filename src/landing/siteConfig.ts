/**
 * Central configuration for site metadata, legal identifiers, and verified social channels.
 * NO FAKE ITEMS: If a social network is not active, keep its value undefined or empty.
 */
export interface SiteSocialConfig {
  email?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  whatsapp?: string;
  telegram?: string;
  github?: string;
}

export interface SiteConfig {
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  supportEmail: string;
  social: SiteSocialConfig;
}

export const SITE_CONFIG: SiteConfig = {
  name: 'Zarii',
  fullName: 'Zarii IELTS Preparation',
  tagline: 'Free, exam-style practice for Listening, Reading, Writing and Speaking.',
  description:
    'Free, exam-style practice for Listening, Reading, Writing and Speaking, with instant feedback and a study plan built around your target band.',
  contactEmail: 'support@zarii.app',
  supportEmail: 'support@zarii.app',
  social: {
    // Only real configured contact/social channels
    email: 'mailto:support@zarii.app',
    // WhatsApp/Instagram/etc are optional and only rendered when defined
  },
};
