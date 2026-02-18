# Google Analytics 4 Verification Guide for WearX

## ✅ FIXED ISSUES

### 1. Netlify Configuration (CRITICAL)
- **Problem**: `netlify.toml` had `publish = ".next"` instead of `publish = "dist"`
- **Fix**: Updated to correct publish directory for static export

### 2. GA Implementation
- **Problem**: Using `dangerouslySetInnerHTML` with complex script injection
- **Fix**: Using Next.js `Script` component with proper `afterInteractive` strategy

### 3. Type Conflicts
- **Problem**: Two `analytics.ts` files with conflicting type declarations
- **Fix**: Removed `/lib/analytics.ts`, kept `/src/lib/analytics.ts` with proper types

## 📊 GA TRACKING ID
```
G-FSP1DKFFWV
```

## 🔍 VERIFICATION STEPS

### Step 1: Check Build Output
```bash
grep -n "googletagmanager" dist/index.html
grep -n "G-FSP1DKFFWV" dist/index.html
```
Expected: Should see preload link and gtag initialization

### Step 2: Deploy to Netlify
1. Go to Netlify dashboard
2. Check deployment logs for successful build
3. Verify site is live

### Step 3: Real-time Verification
1. Open https://analytics.google.com
2. Select WearX property
3. Go to Reports → Realtime
4. Visit your deployed site
5. You should see active users within 30 seconds

### Step 4: Test Events
1. Visit `/ga-verify` page on your site (e.g., `https://yoursite.netlify.app/ga-verify`)
2. Check if gtag is loaded (green checkmarks)
3. Click "Send Test Event"
4. Verify event appears in GA Real-time → Events

## 🆘 TROUBLESHOOTING

### If GA still doesn't work:

1. **Check Ad Blockers**: Disable ad blockers for your domain
2. **Check Console**: Open browser console, look for `[GA4]` messages
3. **Network Tab**: Check if `gtag/js?id=G-FSP1DKFFWV` loads successfully
4. **GA Property**: Verify the tracking ID is correct in GA settings

### Alternative: Manual Inline Script (FAILSAFE)

If Next.js Script component fails, use this in `layout.tsx`:

```tsx
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-FSP1DKFFWV"></script>
  <script dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-FSP1DKFFWV');
    `
  }} />
</head>
```

## 📁 FILES MODIFIED

1. `/netlify.toml` - Fixed publish directory
2. `/src/app/layout.tsx` - Clean GA implementation with Script component
3. `/src/lib/analytics.ts` - Fixed type declarations
4. `/src/app/ga-verify/page.tsx` - New verification page

## 🚀 DEPLOYMENT CHECKLIST

- [ ] Build succeeds: `npm run build`
- [ ] `dist/index.html` contains GA script
- [ ] Netlify deploy successful
- [ ] GA Realtime shows active users
- [ ] Test events appear in GA

## 📞 SUPPORT

If issues persist:
1. Check browser console for errors
2. Verify in GA: Admin → Data Streams → Web → G-FSP1DKFFWV
3. Test with GA Debugger Chrome extension
