// Google Analytics 4 configuration for WearX
// Using @next/third-parties/google (official Next.js solution)

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-FSP1DKFFWV';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom events for WearX
export const AnalyticsEvents = {
  // Waitlist
  WAITLIST_SIGNUP: 'waitlist_signup',
  WAITLIST_ERROR: 'waitlist_error',
  
  // Wardrobe
  WARDROBE_UPLOAD: 'wardrobe_upload',
  WARDROBE_ANALYZE: 'wardrobe_analyze',
  WARDROBE_ANALYZE_SUCCESS: 'wardrobe_analyze_success',
  WARDROBE_ANALYZE_ERROR: 'wardrobe_analyze_error',
  
  // Outfits
  OUTFIT_GENERATE: 'outfit_generate',
  OUTFIT_SAVE: 'outfit_save',
  OUTFIT_SHARE: 'outfit_share',
  
  // Navigation
  CLICK_CTA: 'click_cta',
  CLICK_FEATURE: 'click_feature',
  CLICK_SOCIAL: 'click_social',
} as const;

// Helper functions for common events
export const trackWaitlistSignup = (email: string) => {
  event({
    action: AnalyticsEvents.WAITLIST_SIGNUP,
    category: 'conversion',
    label: 'waitlist',
    value: 1,
  });
};

export const trackWardrobeUpload = (itemCount: number) => {
  event({
    action: AnalyticsEvents.WARDROBE_UPLOAD,
    category: 'engagement',
    label: 'wardrobe',
    value: itemCount,
  });
};

export const trackOutfitGenerate = (filters: { occasion: string; season: string; style: string }) => {
  event({
    action: AnalyticsEvents.OUTFIT_GENERATE,
    category: 'engagement',
    label: `${filters.occasion}_${filters.season}_${filters.style}`,
  });
};

export const trackCTAClick = (location: string) => {
  event({
    action: AnalyticsEvents.CLICK_CTA,
    category: 'navigation',
    label: location,
  });
};
