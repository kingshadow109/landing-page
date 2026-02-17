# Google Analytics 4 Setup Guide for WearX

This guide covers the complete setup and usage of Google Analytics 4 (GA4) for the WearX landing page.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Events Being Tracked](#events-being-tracked)
3. [Using Analytics in Components](#using-analytics-in-components)
4. [Conversion Goals](#conversion-goals)
5. [Testing & Debugging](#testing--debugging)
6. [Best Practices](#best-practices)

---

## Setup Instructions

### 1. Create a Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/analytics/web/)
2. Sign in with your Google account
3. Click "Admin" (gear icon) in the bottom left
4. Click "Create Property"
5. Enter property name: "WearX"
6. Select your time zone and currency
7. Click "Next" and answer the business questions
8. Choose "Web" as your platform
9. Enter your website URL: `https://wearx.app`
10. Enter stream name: "WearX Web"
11. Click "Create Stream"
12. **Copy the Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variables

Add your Measurement ID to `.env.local`:

```bash
# Google Analytics 4 Configuration
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Important:** The `NEXT_PUBLIC_` prefix is required for the variable to be available in the browser.

### 3. Verify Installation

The Google Analytics script is automatically included in `app/layout.tsx`:

```tsx
import { GoogleAnalytics } from "@next/third-parties/google";

// In the component:
{GA_TRACKING_ID && <GoogleAnalytics gaId={GA_TRACKING_ID} />}
```

This uses the official `@next/third-parties` library which is optimized for Next.js 14+ App Router.

### 4. Enable Enhanced Measurement

In your GA4 property:
1. Go to Admin → Data Streams → Web Stream
2. Click the gear icon under "Enhanced measurement"
3. Ensure these are enabled:
   - ✅ Page views
   - ✅ Scrolls
   - ✅ Outbound clicks
   - ✅ Site search
   - ✅ Form interactions
   - ✅ Video engagement
   - ✅ File downloads
   - ✅ **Page changes based on browser history events** (critical for SPAs)

---

## Events Being Tracked

### Automatic Events (No Code Required)

| Event | Description | Trigger |
|-------|-------------|---------|
| `page_view` | User views a page | Automatic on route change |
| `scroll` | User scrolls 90% of page | Enhanced measurement |
| `click` | User clicks outbound link | Enhanced measurement |
| `form_start` | User starts form interaction | Enhanced measurement |
| `form_submit` | User submits form | Enhanced measurement |

### Custom Events (Implemented in Code)

#### 1. `waitlist_signup` ⭐ **CONVERSION EVENT**
**Priority: HIGH**

Fired when a user successfully joins the waitlist.

```typescript
trackWaitlistSignup("hero_form", "homepage");
```

**Parameters:**
- `method`: "hero_form" | "footer_form" | "popup"
- `source`: Optional UTM source or referrer

**Where to implement:**
- `src/components/hero.tsx` - Hero waitlist form
- `src/components/footer.tsx` - Footer waitlist form
- Any popup/modal waitlist forms

---

#### 2. `wardrobe_upload`

Fired when user uploads wardrobe items.

```typescript
trackWardrobeUpload(5, "file", "tops");
```

**Parameters:**
- `item_count`: Number of items uploaded
- `upload_method`: "file" | "camera" | "url"
- `category`: Category of items (optional)

**Where to implement:**
- `src/components/wardrobe-uploader.tsx`

---

#### 3. `outfit_generate`

Fired when user generates outfit recommendations.

```typescript
trackOutfitGenerate("casual", 12, "summer", "minimalist");
```

**Parameters:**
- `occasion`: The occasion selected
- `wardrobe_item_count`: Number of items in user's wardrobe
- `season`: Season preference (optional)
- `style_preference`: Style preference (optional)

**Where to implement:**
- `src/components/outfit-recommender.tsx`

---

#### 4. `outfit_save`

Fired when user saves an outfit.

```typescript
trackOutfitSave("outfit_123", 3);
```

**Parameters:**
- `outfit_id`: Unique outfit identifier
- `items_count`: Number of items in the outfit

**Where to implement:**
- Outfit recommender save functionality

---

#### 5. `wardrobe_item_delete`

Fired when user deletes a wardrobe item.

```typescript
trackWardrobeItemDelete("dresses");
```

**Parameters:**
- `category`: Category of deleted item (optional)

**Where to implement:**
- Wardrobe management interface

---

#### 6. `page_engagement`

Fired when user engages with specific page sections.

```typescript
trackPageEngagement("features_section", 50);
```

**Parameters:**
- `section`: Section identifier
- `depth_percent`: Scroll depth percentage (optional)

**Where to implement:**
- Intersection Observer on key sections

---

#### 7. `feature_click`

Fired when user clicks feature CTAs or buttons.

```typescript
trackFeatureClick("try_wardrobe", "hero_section");
```

**Parameters:**
- `feature_name`: Name of the feature
- `location`: Where the click occurred

**Where to implement:**
- CTA buttons throughout the site

---

#### 8. `navigation_click`

Fired when user clicks navigation links.

```typescript
trackNavigationClick("/wardrobe", "header");
```

**Parameters:**
- `destination`: Target destination
- `location`: "header" | "footer" | "mobile_menu"

**Where to implement:**
- Navigation components

---

## Using Analytics in Components

### Import the tracking functions:

```typescript
import { 
  trackWaitlistSignup,
  trackWardrobeUpload,
  trackOutfitGenerate,
  trackEvent,
  GA_EVENTS 
} from "@/lib/analytics";
```

### Example: Waitlist Form

```typescript
"use client";

import { trackWaitlistSignup } from "@/lib/analytics";

export function WaitlistForm() {
  const handleSubmit = async (email: string) => {
    try {
      // Submit to API
      await fetch("/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      
      // Track successful signup
      trackWaitlistSignup("hero_form");
      
      // Show success message
    } catch (error) {
      // Handle error
    }
  };

  return <form>...</form>;
}
```

### Example: Wardrobe Upload

```typescript
"use client";

import { trackWardrobeUpload } from "@/lib/analytics";

export function WardrobeUploader() {
  const handleUpload = async (files: File[]) => {
    // Process upload
    const result = await uploadFiles(files);
    
    // Track upload
    trackWardrobeUpload(files.length, "file", result.category);
  };

  return <UploadComponent onUpload={handleUpload} />;
}
```

### Example: Custom Event

```typescript
import { trackEvent, GA_EVENTS } from "@/lib/analytics";

// For events not covered by helper functions
trackEvent(GA_EVENTS.FEATURE_CLICK, {
  feature_name: "dark_mode_toggle",
  location: "header"
});
```

---

## Conversion Goals

### Primary Conversion: Waitlist Signup

**Setup in GA4:**
1. Go to Admin → Events → Mark as conversion
2. Find `waitlist_signup` event
3. Toggle "Mark as conversion"

### Secondary Conversions:

| Conversion | Event Name | Value |
|------------|------------|-------|
| Wardrobe Upload | `wardrobe_upload` | Medium |
| Outfit Generation | `outfit_generate` | High |
| Outfit Save | `outfit_save` | High |

### Setting Up Conversion Values

1. Go to Admin → Conversions
2. Click on the conversion event
3. Set "Count" method (Once per session / Every time)
4. Optional: Set monetary value

---

## Testing & Debugging

### 1. Debug Mode

Add this to your browser console to enable debug mode:

```javascript
window.localStorage.setItem('ga_debug_mode', 'true');
```

### 2. Google Analytics Debugger Extension

Install the [GA Debugger Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)

### 3. Real-Time Reports

1. Go to GA4 → Reports → Realtime
2. Open your website in another tab
3. Watch events appear in real-time

### 4. DebugView

1. Go to Admin → DebugView
2. Interact with your site
3. See events flow in chronological order

### 5. Network Tab

Open DevTools → Network tab → Filter by "collect"
You should see requests to `google-analytics.com/collect`

### 6. Console Logging (Development)

In development mode, events are logged to console:

```
[GA4 Debug] waitlist_signup {method: 'hero_form', source: 'direct'}
```

---

## Best Practices

### 1. Event Naming

- Use `snake_case` for event names
- Be descriptive but concise
- Use consistent naming across the app
- Reference the `GA_EVENTS` constant instead of hardcoding strings

### 2. Event Parameters

- Keep parameter names consistent
- Use `snake_case` for parameter keys
- Avoid PII (Personally Identifiable Information)
- Group related data logically

### 3. Performance

- Analytics calls are non-blocking
- Events are batched and sent efficiently
- No impact on page load performance

### 4. Privacy

- Respect user consent (implement consent mode if needed)
- Don't track sensitive user data
- Follow GDPR/CCPA guidelines
- Consider implementing a cookie consent banner

### 5. Testing

- Always test events in development
- Verify events in DebugView before deploying
- Check Real-Time reports after deployment

---

## Troubleshooting

### Events not showing up?

1. Check that `NEXT_PUBLIC_GA_ID` is set correctly
2. Verify the ID format: `G-XXXXXXXXXX`
3. Check browser console for errors
4. Ensure ad blockers aren't blocking GA
5. Verify in DebugView, not just Real-Time

### Duplicate events?

- Check that you're not calling track functions multiple times
- Ensure React components aren't double-mounting in Strict Mode

### Events showing as "(not set)"?

- Make sure all required parameters are provided
- Check parameter names match exactly

---

## Resources

- [Next.js Third-Party Libraries](https://nextjs.org/docs/app/guides/third-party-libraries)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [GA4 DebugView Guide](https://support.google.com/analytics/answer/7201382)
- [GA4 Conversion Setup](https://support.google.com/analytics/answer/9267568)

---

## Quick Reference

```typescript
// Import tracking functions
import { 
  trackWaitlistSignup,
  trackWardrobeUpload,
  trackOutfitGenerate,
  trackOutfitSave,
  trackWardrobeItemDelete,
  trackPageEngagement,
  trackFeatureClick,
  trackNavigationClick,
  trackEvent,
  GA_EVENTS 
} from "@/lib/analytics";

// Track waitlist signup (conversion)
trackWaitlistSignup("hero_form");

// Track wardrobe upload
trackWardrobeUpload(3, "file", "tops");

// Track outfit generation
trackOutfitGenerate("casual", 10, "summer");

// Track custom event
trackEvent(GA_EVENTS.FEATURE_CLICK, {
  feature_name: "demo_video",
  location: "features_section"
});
```
