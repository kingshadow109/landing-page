# Google Analytics 4 Setup Guide for WearX

## Step 1: Create GA4 Property

1. Go to https://analytics.google.com
2. Click **"Create Property"**
3. Property name: `WearX`
4. Time zone: Your timezone
5. Currency: USD
6. Click **"Next"**

## Step 2: Get Your Tracking ID

1. In GA4, go to **Admin** (gear icon)
2. Click **"Data Streams"**
3. Click **"Web"**
4. Enter your URL: `https://symphonious-capybara-0c525d.netlify.app`
5. Stream name: `WearX Website`
6. Click **"Create"**
7. Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`)

## Step 3: Add to Vercel

1. Go to https://vercel.com/dashboard
2. Select your project
3. **Settings** → **Environment Variables**
4. Add:
   - **Name:** `NEXT_PUBLIC_GA_ID`
   - **Value:** Your GA4 Measurement ID (G-XXXXXXXXXX)
5. Click **Save**
6. **Redeploy** your site

## Step 4: Verify Installation

1. Visit your live site
2. Open browser console (F12)
3. Type: `gtag`
4. Should return a function (not undefined)
5. In GA4, go to **Reports** → **Realtime**
6. You should see your visit

## Events Being Tracked

### Automatic (via @next/third-parties)
- Page views
- Session duration
- User location
- Device type

### Custom Events (in analytics.ts)
| Event | Trigger | Category |
|-------|---------|----------|
| `waitlist_signup` | User joins waitlist | conversion |
| `wardrobe_upload` | Photo uploaded | engagement |
| `wardrobe_analyze` | AI analysis started | engagement |
| `outfit_generate` | Outfit recommendations | engagement |
| `click_cta` | Any CTA button click | navigation |

## Step 5: Set Up Conversions

1. In GA4, go to **Admin** → **Events**
2. Find `waitlist_signup` event
3. Toggle **"Mark as conversion"**
4. This tracks your main goal!

## Privacy/GDPR Note

For EU users, you may need:
- Cookie consent banner
- IP anonymization (enabled by default in GA4)
- Data retention settings

For now (MVP), this basic setup works. Add consent banner before scaling.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| No data in GA4 | Check NEXT_PUBLIC_GA_ID is set |
| Events not tracking | Check browser console for errors |
| Realtime not showing | Wait 24-48 hours for full data |

---

**Next:** Set up welcome email in Loops.so!
