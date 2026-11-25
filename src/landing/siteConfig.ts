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
  fullName: 'Zarii English Course and IELTS Preparation',
  tagline: 'Learn English. Reach your IELTS goal.',
  description:
    'Free, comprehensive English course from A1 to C1 and authentic IELTS preparation with instant feedback, an offline dictionary, and a personalized study plan.',
  contactEmail: 'support@zarii.app',
  supportEmail: 'support@zarii.app',
  social: {
    // Only real configured contact/social channels
    email: 'mailto:support@zarii.app',
    // WhatsApp/Instagram/etc are optional and only rendered when defined
  },
};
