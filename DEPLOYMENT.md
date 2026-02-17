# Deployment Guide

## Vercel Deployment (Recommended)

### 1. Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/landing-page.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to https://vercel.com/signup
2. Sign up with your GitHub account
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

### 3. Environment Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

```
# If you add a waitlist backend later
# DATABASE_URL=your_database_url
# RESEND_API_KEY=your_resend_key
```

### 4. Custom Domain (Optional)

1. Buy domain from Namecheap/Cloudflare (~$10/year)
2. In Vercel: Settings → Domains → Add Domain
3. Follow DNS configuration instructions

---

## Vercel Free Tier Limits

- **Bandwidth:** 100GB/month
- **Build Time:** 6,000 minutes/month
- **Serverless Functions:** 100GB-hours
- **Image Optimization:** 1,000 images
- **Analytics:** 2,500 events/day

**More than enough for a landing page.**

---

## Waitlist Backend Options

### Option 1: Resend (Email) - FREE
- 3,000 emails/month free
- Simple API integration
- Good for notifying waitlist subscribers

### Option 2: Loops.so (Waitlist specialized) - FREE
- 1,000 contacts free tier
- Built for waitlists
- Analytics included

### Option 3: Supabase (Database) - FREE
- 500MB database
- 2GB bandwidth
- Good for storing emails

### Option 4: Google Sheets (Quick & Dirty) - FREE
- Use Google Apps Script
- No backend needed
- Good for MVP

**Recommendation:** Start with Loops.so or just collect emails in a form and store locally for now.

---

## Pre-Deployment Checklist

- [ ] All environment variables set
- [ ] `next.config.ts` has `output: 'export'` for static sites
- [ ] Images use `unoptimized: true` for static export
- [ ] No console errors in dev mode
- [ ] Mobile responsive test passed
- [ ] Meta tags configured for SEO
- [ ] Favicon added to `/public`

---

## Post-Deployment

1. **Test the live site** on mobile and desktop
2. **Set up analytics** (Vercel Analytics or Plausible)
3. **Submit to Google Search Console**
4. **Share on social media** for initial traffic

---

## Troubleshooting

**Build fails:**
- Check `next.config.ts` syntax
- Ensure all dependencies installed

**Images not loading:**
- Add `images: { unoptimized: true }` to next.config.ts

**Styles not applied:**
- Check globals.css is imported in layout.tsx

**Environment variables not working:**
- Must be set in Vercel dashboard, not just .env.local
