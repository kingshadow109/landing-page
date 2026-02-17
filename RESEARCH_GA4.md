# Google Analytics 4 (GA4) Setup Research for Next.js 14 App Router

> Research Date: February 2026  
> Target: Next.js 14+ with App Router  
> Use Case: SaaS Landing Page

---

## 1. Best GA4 Library for Next.js 14

### Recommendation: `@next/third-parties` (Official Next.js Solution)

**Winner:** `@next/third-parties/google` is the recommended approach for Next.js 14+ App Router.

| Library | Pros | Cons | Recommendation |
|---------|------|------|----------------|
| **@next/third-parties** | Official Next.js support, optimized performance, automatic pageview tracking, easy event API | Still experimental (but stable) | ✅ **Recommended** |
| **gtag.js (direct)** | Full control, no dependencies | Manual setup, more code to maintain | ⚠️ Use if you need custom behavior |
| **react-ga4** | Popular, well-documented | Not officially supported, may have hydration issues with App Router | ❌ Not recommended for App Router |

### Installation

```bash
npm install @next/third-parties@latest next@latest
# or
yarn add @next/third-parties@latest next@latest
```

### Basic Setup in Root Layout

```tsx
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  )
}
```

### Key Features of @next/third-parties

1. **Automatic Pageview Tracking**: GA4 automatically tracks pageviews when browser history state changes - no manual route change handling needed for App Router
2. **Performance Optimized**: Scripts load after hydration to avoid blocking initial render
3. **Enhanced Measurement**: Enable "Page changes based on browser history events" in GA4 Admin panel for client-side navigation tracking

---

## 2. Event Tracking in App Router

### Understanding Server vs Client Components

| Component Type | GA4 Event Tracking | Notes |
|----------------|-------------------|-------|
| **Server Components** | ❌ Cannot track events directly | No browser APIs, no user interactions |
| **Client Components** | ✅ Full event tracking support | Use `'use client'` directive |

### Event Tracking with `sendGAEvent`

The `sendGAEvent` function from `@next/third-parties/google` uses the `dataLayer` object to send events.

```tsx
// components/SignupButton.tsx
'use client'

import { sendGAEvent } from '@next/third-parties/google'

export function SignupButton({ plan }: { plan: string }) {
  return (
    <button
      onClick={() => {
        sendGAEvent({
          event: 'sign_up',
          method: 'email',
          plan_type: plan,
        })
      }}
      className="btn-primary"
    >
      Start Free Trial
    </button>
  )
}
```

### Custom Event Utility (Recommended Pattern)

Create a centralized analytics utility for consistency:

```tsx
// lib/analytics.ts
'use client'

import { sendGAEvent } from '@next/third-parties/google'

// SaaS-specific event types
export type GAEvent =
  | { event: 'sign_up'; method: string; plan_type: string }
  | { event: 'begin_trial'; plan_name: string }
  | { event: 'trial_converted'; plan_name: string; value: number }
  | { event: 'purchase'; plan_name: string; value: number; currency: string }
  | { event: 'generate_lead'; source: string }
  | { event: 'cta_click'; cta_id: string; cta_text: string; location: string }
  | { event: 'feature_demo_request'; feature: string }
  | { event: 'pricing_view'; plan_name: string }
  | { event: 'video_start'; video_name: string }
  | { event: 'video_complete'; video_name: string }
  | { event: 'scroll_depth'; depth: string } // 25%, 50%, 75%, 90%

export function trackEvent(eventData: GAEvent) {
  sendGAEvent(eventData)
}

// Helper functions for common events
export const analytics = {
  trackSignup: (method: string, planType: string) =>
    trackEvent({ event: 'sign_up', method, plan_type: planType }),

  trackTrialStart: (planName: string) =>
    trackEvent({ event: 'begin_trial', plan_name: planName }),

  trackTrialConversion: (planName: string, value: number) =>
    trackEvent({ event: 'trial_converted', plan_name: planName, value }),

  trackPurchase: (planName: string, value: number, currency: string = 'USD') =>
    trackEvent({ event: 'purchase', plan_name: planName, value, currency }),

  trackLead: (source: string) =>
    trackEvent({ event: 'generate_lead', source }),

  trackCTAClick: (ctaId: string, ctaText: string, location: string) =>
    trackEvent({ event: 'cta_click', cta_id: ctaId, cta_text: ctaText, location }),

  trackPricingView: (planName: string) =>
    trackEvent({ event: 'pricing_view', plan_name: planName }),
}
```

### Scroll Depth Tracking

```tsx
// components/ScrollTracker.tsx
'use client'

import { useEffect } from 'react'
import { sendGAEvent } from '@next/third-parties/google'

const DEPTHS = [25, 50, 75, 90]

export function ScrollTracker() {
  useEffect(() => {
    const tracked = new Set<number>()

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      )

      DEPTHS.forEach((depth) => {
        if (scrollPercent >= depth && !tracked.has(depth)) {
          tracked.add(depth)
          sendGAEvent({ event: 'scroll_depth', depth: `${depth}%` })
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return null
}
```

---

## 3. GA4 Custom Events for SaaS Landing Pages

### Recommended Events for SaaS

Based on Google's recommended events and SaaS best practices:

#### User Acquisition & Engagement

| Event | Trigger | Parameters |
|-------|---------|------------|
| `sign_up` | User creates account | `method` (email, google, github), `plan_type` |
| `begin_trial` | User starts free trial | `plan_name`, `trial_length` |
| `generate_lead` | Form submission | `source` (demo, contact, newsletter) |
| `login` | User logs in | `method` |

#### Conversion & Revenue

| Event | Trigger | Parameters |
|-------|---------|------------|
| `purchase` | Subscription purchase | `plan_name`, `value`, `currency` |
| `trial_converted` | Trial → Paid conversion | `plan_name`, `days_to_convert` |
| `subscription_upgraded` | Plan upgrade | `old_plan`, `new_plan`, `value` |
| `subscription_downgraded` | Plan downgrade | `old_plan`, `new_plan` |
| `subscription_cancelled` | Cancellation | `reason`, `lifetime_value` |

#### Landing Page Engagement

| Event | Trigger | Parameters |
|-------|---------|------------|
| `cta_click` | CTA button click | `cta_id`, `cta_text`, `location` (hero, pricing, footer) |
| `pricing_view` | User views pricing | `plan_name` |
| `feature_demo_request` | Demo request | `feature` |
| `video_start` | Video play | `video_name` |
| `video_complete` | Video finish | `video_name`, `percent_watched` |
| `scroll_depth` | Scroll milestone | `depth` (25%, 50%, 75%, 90%) |

### Implementation Examples

#### Hero CTA Tracking

```tsx
// app/sections/Hero.tsx
'use client'

import { analytics } from '@/lib/analytics'

export function Hero() {
  return (
    <section className="hero">
      <h1>Your SaaS Product</h1>
      <div className="cta-group">
        <button
          onClick={() => analytics.trackCTAClick('hero-primary', 'Start Free Trial', 'hero')}
          className="btn-primary"
        >
          Start Free Trial
        </button>
        <button
          onClick={() => analytics.trackCTAClick('hero-secondary', 'Watch Demo', 'hero')}
          className="btn-secondary"
        >
          Watch Demo
        </button>
      </div>
    </section>
  )
}
```

#### Pricing Page Tracking

```tsx
// app/pricing/page.tsx
'use client'

import { useEffect } from 'react'
import { analytics } from '@/lib/analytics'

export default function PricingPage() {
  useEffect(() => {
    analytics.trackPricingView('all_plans')
  }, [])

  return (
    <div className="pricing-page">
      <PricingCard
        plan="starter"
        onSelect={() => analytics.trackTrialStart('starter')}
      />
      <PricingCard
        plan="pro"
        onSelect={() => analytics.trackTrialStart('pro')}
      />
      <PricingCard
        plan="enterprise"
        onSelect={() => analytics.trackLead('enterprise_contact')}
      />
    </div>
  )
}
```

#### Form Conversion Tracking

```tsx
// components/ContactForm.tsx
'use client'

import { analytics } from '@/lib/analytics'

export function ContactForm() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Track lead generation
    analytics.trackLead('contact_form')
    
    // Submit form...
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
```

---

## 4. Privacy/GDPR Considerations

### Google Consent Mode v2

GA4 supports Consent Mode v2 with four consent categories:

| Category | Description | Default for GDPR |
|----------|-------------|------------------|
| `analytics_storage` | Analytics data storage | `denied` |
| `ad_storage` | Advertising data storage | `denied` |
| `ad_user_data` | User data for ads | `denied` |
| `ad_personalization` | Ad personalization | `denied` |

### GDPR-Compliant Implementation

#### Step 1: Create Consent-Aware GA Component

```tsx
// components/GoogleAnalyticsWithConsent.tsx
import Script from 'next/script'

interface Props {
  gaId: string
  consent: 'granted' | 'denied'
}

export function GoogleAnalyticsWithConsent({ gaId, consent }: Props) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Default consent to denied for GDPR compliance
            gtag('consent', 'default', {
              'ad_storage': '${consent}',
              'ad_user_data': '${consent}',
              'ad_personalization': '${consent}',
              'analytics_storage': '${consent}'
            });
            
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
```

#### Step 2: Create Cookie Consent Banner

```tsx
// components/CookieConsent.tsx
'use client'

import { useEffect, useState } from 'react'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if consent already given
    const consent = document.cookie
      .split('; ')
      .find(row => row.startsWith('cookie_consent='))
    
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const setConsent = (choice: 'granted' | 'denied') => {
    // Set cookie for 1 year
    document.cookie = `cookie_consent=${choice}; path=/; max-age=${60 * 60 * 24 * 365}`
    
    // Update GA consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: choice,
        ad_user_data: choice,
        ad_personalization: choice,
        analytics_storage: choice,
      })
    }
    
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          We use cookies to analyze site traffic and improve your experience.
          See our <a href="/privacy" className="underline">Privacy Policy</a>.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setConsent('denied')}
            className="px-4 py-2 text-sm border border-gray-600 rounded"
          >
            Decline
          </button>
          <button
            onClick={() => setConsent('granted')}
            className="px-4 py-2 text-sm bg-blue-600 rounded"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
```

#### Step 3: Update Layout with Consent

```tsx
// app/layout.tsx
import { cookies } from 'next/headers'
import { GoogleAnalyticsWithConsent } from '@/components/GoogleAnalyticsWithConsent'
import { CookieConsent } from '@/components/CookieConsent'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const consentCookie = cookieStore.get('cookie_consent')
  const consent = consentCookie?.value === 'granted' ? 'granted' : 'denied'

  return (
    <html lang="en">
      <head>
        <GoogleAnalyticsWithConsent 
          gaId="G-XXXXXXXXXX" 
          consent={consent}
        />
      </head>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
```

#### Step 4: Add TypeScript Types

```ts
// types/gtag.d.ts
declare global {
  interface Window {
    gtag: (
      command: 'consent' | 'config' | 'event',
      action: string,
      params?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}

export {}
```

### EU-Only Banner (Advanced)

For showing the banner only to EU visitors, use a CDN with geo-detection (CloudFront, Cloudflare) or a service like:

- `react-cookie-consent` with geo-detection
- Custom API endpoint using IP geolocation
- Vercel Edge Middleware with geolocation

```ts
// middleware.ts (Vercel Edge Middleware example)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const EU_COUNTRIES = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 
  'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB']

export function middleware(request: NextRequest) {
  const country = request.geo?.country || 'US'
  const isEU = EU_COUNTRIES.includes(country)
  
  const response = NextResponse.next()
  response.cookies.set('is_eu', isEU ? '1' : '0')
  
  return response
}
```

### Privacy Policy Requirements

Ensure your privacy policy includes:

1. **What data is collected** (page views, events, user properties)
2. **How it's used** (analytics, improvement)
3. **Third parties** (Google Analytics)
4. **User rights** (opt-out, data deletion)
5. **Cookie duration** (typically 1-2 years for GA4)
6. **Contact information** for privacy inquiries

### Data Retention Settings

In GA4 Admin panel:

1. Go to **Data Settings** → **Data Retention**
2. Set **Event data retention** to **14 months** (maximum for GDPR compliance)
3. Enable **Reset user data on new activity** (optional)

---

## 5. Complete Implementation Checklist

### Setup Phase

- [ ] Install `@next/third-parties` package
- [ ] Create GA4 property and get Measurement ID
- [ ] Add `GoogleAnalytics` component to root layout
- [ ] Enable "Enhanced Measurement" in GA4 Admin
- [ ] Enable "Page changes based on browser history events"

### Event Tracking

- [ ] Create `lib/analytics.ts` with typed event helpers
- [ ] Implement scroll depth tracking
- [ ] Add CTA click tracking to all buttons
- [ ] Add form submission tracking
- [ ] Add pricing page view tracking
- [ ] Add trial/purchase conversion tracking

### GDPR Compliance

- [ ] Implement cookie consent banner
- [ ] Set default consent to `denied`
- [ ] Add consent update mechanism
- [ ] Create privacy policy page
- [ ] Set data retention to 14 months in GA4
- [ ] Add IP anonymization (enabled by default in GA4)
- [ ] Test consent flow thoroughly

### Testing

- [ ] Verify pageviews in GA4 Realtime report
- [ ] Test events in GA4 DebugView
- [ ] Verify consent mode is working
- [ ] Test cookie banner appears for new users
- [ ] Test cookie preferences are saved
- [ ] Verify no tracking before consent (if required)

---

## 6. Resources

- [Next.js Third Party Libraries Docs](https://nextjs.org/docs/app/guides/third-party-libraries)
- [GA4 Recommended Events](https://support.google.com/analytics/answer/9267735)
- [GA4 Ecommerce Events](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
- [Google Consent Mode](https://developers.google.com/tag-platform/security/concepts/consent-mode)
- [GDPR Compliance Guide](https://gdpr.eu/checklist/)

---

## Summary

For a SaaS landing page with Next.js 14 App Router:

1. **Use `@next/third-parties/google`** - It's the official, optimized solution
2. **Track events in Client Components only** - Use `'use client'` for interactive elements
3. **Focus on key SaaS events** - sign_up, begin_trial, purchase, cta_click
4. **Implement GDPR compliance** - Use Consent Mode v2 with a cookie banner
5. **Test thoroughly** - Use GA4 DebugView and Realtime reports

This setup provides a robust, privacy-compliant analytics foundation for your SaaS landing page.
