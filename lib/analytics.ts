/**
 * Google Analytics 4 Integration for WearX
 * 
 * This module provides utilities for tracking user interactions
 * using Google Analytics 4 via the @next/third-parties library.
 * 
 * Setup Instructions:
 * 1. Create a GA4 property at https://analytics.google.com
 * 2. Get your Measurement ID (format: G-XXXXXXXXXX)
 * 3. Add GA_TRACKING_ID to your environment variables (.env.local)
 * 4. The GoogleAnalytics component is already added to layout.tsx
 * 
 * Events Tracked:
 * - Page views (automatic via Enhanced Measurement)
 * - waitlist_signup - User joins the waitlist
 * - wardrobe_upload - User uploads wardrobe items
 * - outfit_generate - User generates outfit recommendations
 * - outfit_save - User saves an outfit
 * - wardrobe_item_delete - User deletes a wardrobe item
 * - page_engagement - User scrolls through features
 */

import { sendGAEvent } from "@next/third-parties/google";

/**
 * Google Analytics 4 Measurement ID
 * Format: G-XXXXXXXXXX
 * Get this from your GA4 property settings
 */
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Event names as constants for type safety
export const GA_EVENTS = {
  WAITLIST_SIGNUP: "waitlist_signup",
  WARDROBE_UPLOAD: "wardrobe_upload",
  OUTFIT_GENERATE: "outfit_generate",
  OUTFIT_SAVE: "outfit_save",
  WARDROBE_ITEM_DELETE: "wardrobe_item_delete",
  PAGE_ENGAGEMENT: "page_engagement",
  FEATURE_CLICK: "feature_click",
  NAVIGATION_CLICK: "navigation_click",
} as const;

export type GAEventName = (typeof GA_EVENTS)[keyof typeof GA_EVENTS];

// Event parameters interfaces for type safety
interface WaitlistSignupParams {
  method: "hero_form" | "footer_form" | "popup";
  source?: string;
}

interface WardrobeUploadParams {
  item_count: number;
  upload_method: "file" | "camera" | "url";
  category?: string;
}

interface OutfitGenerateParams {
  occasion: string;
  season?: string;
  style_preference?: string;
  wardrobe_item_count: number;
}

interface OutfitSaveParams {
  outfit_id: string;
  items_count: number;
}

interface WardrobeItemDeleteParams {
  category?: string;
}

interface PageEngagementParams {
  section: string;
  depth_percent?: number;
}

interface FeatureClickParams {
  feature_name: string;
  location: string;
}

interface NavigationClickParams {
  destination: string;
  location: "header" | "footer" | "mobile_menu";
}

// Union type for all event parameters
export type GAEventParams =
  | WaitlistSignupParams
  | WardrobeUploadParams
  | OutfitGenerateParams
  | OutfitSaveParams
  | WardrobeItemDeleteParams
  | PageEngagementParams
  | FeatureClickParams
  | NavigationClickParams
  | Record<string, string | number | boolean | undefined>;

/**
 * Track a custom event in Google Analytics 4
 * 
 * @param eventName - The name of the event to track
 * @param params - Event parameters (key-value pairs)
 * 
 * @example
 * ```typescript
 * trackEvent(GA_EVENTS.WAITLIST_SIGNUP, {
 *   method: "hero_form",
 *   source: "homepage"
 * });
 * ```
 */
export function trackEvent(
  eventName: GAEventName | string,
  params?: GAEventParams
): void {
  try {
    sendGAEvent(eventName, params as Record<string, string | number | boolean>);
  } catch (error) {
    // Silently fail in development or if GA is blocked
    if (process.env.NODE_ENV === "development") {
      console.log("[GA4 Debug]", eventName, params);
    }
  }
}

/**
 * Track waitlist signup conversion
 * This is a key conversion event for WearX
 * 
 * @param method - Where the signup occurred
 * @param source - Optional UTM source or referrer
 */
export function trackWaitlistSignup(
  method: WaitlistSignupParams["method"],
  source?: string
): void {
  trackEvent(GA_EVENTS.WAITLIST_SIGNUP, {
    method,
    source: source || "direct",
  });
}

/**
 * Track wardrobe upload event
 * 
 * @param itemCount - Number of items uploaded
 * @param uploadMethod - How items were uploaded
 * @param category - Optional category of items
 */
export function trackWardrobeUpload(
  itemCount: number,
  uploadMethod: WardrobeUploadParams["upload_method"],
  category?: string
): void {
  trackEvent(GA_EVENTS.WARDROBE_UPLOAD, {
    item_count: itemCount,
    upload_method: uploadMethod,
    category: category || "unknown",
  });
}

/**
 * Track outfit generation event
 * 
 * @param occasion - The occasion for the outfit
 * @param wardrobeItemCount - Number of items in user's wardrobe
 * @param season - Optional season preference
 * @param stylePreference - Optional style preference
 */
export function trackOutfitGenerate(
  occasion: string,
  wardrobeItemCount: number,
  season?: string,
  stylePreference?: string
): void {
  trackEvent(GA_EVENTS.OUTFIT_GENERATE, {
    occasion,
    wardrobe_item_count: wardrobeItemCount,
    season: season || "any",
    style_preference: stylePreference || "default",
  });
}

/**
 * Track when a user saves an outfit
 * 
 * @param outfitId - Unique identifier for the outfit
 * @param itemsCount - Number of items in the outfit
 */
export function trackOutfitSave(outfitId: string, itemsCount: number): void {
  trackEvent(GA_EVENTS.OUTFIT_SAVE, {
    outfit_id: outfitId,
    items_count: itemsCount,
  });
}

/**
 * Track wardrobe item deletion
 * 
 * @param category - Optional category of deleted item
 */
export function trackWardrobeItemDelete(category?: string): void {
  trackEvent(GA_EVENTS.WARDROBE_ITEM_DELETE, {
    category: category || "unknown",
  });
}

/**
 * Track page engagement (scroll depth, section views)
 * 
 * @param section - The section being viewed
 * @param depthPercent - Optional scroll depth percentage
 */
export function trackPageEngagement(
  section: string,
  depthPercent?: number
): void {
  trackEvent(GA_EVENTS.PAGE_ENGAGEMENT, {
    section,
    depth_percent: depthPercent,
  });
}

/**
 * Track feature clicks (CTAs, buttons, etc.)
 * 
 * @param featureName - Name of the feature clicked
 * @param location - Where the click occurred
 */
export function trackFeatureClick(
  featureName: string,
  location: string
): void {
  trackEvent(GA_EVENTS.FEATURE_CLICK, {
    feature_name: featureName,
    location,
  });
}

/**
 * Track navigation clicks
 * 
 * @param destination - Where the user is navigating to
 * @param location - Which navigation element was used
 */
export function trackNavigationClick(
  destination: string,
  location: NavigationClickParams["location"]
): void {
  trackEvent(GA_EVENTS.NAVIGATION_CLICK, {
    destination,
    location,
  });
}

/**
 * Check if GA4 is available (useful for conditional tracking)
 */
export function isGA4Available(): boolean {
  return typeof window !== "undefined" && "gtag" in window;
}

// Type augmentation for window.gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}
