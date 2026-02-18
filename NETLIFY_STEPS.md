# NETLIFY DEPLOYMENT - STEP BY STEP

## ✅ What You've Done
1. ✅ Went to https://app.netlify.com/drop
2. ✅ Downloaded dist.zip from GitHub
3. ✅ Extracted the dist folder
4. ✅ Dragged dist folder to Netlify

## 🔄 What You're Seeing Now

After dragging the folder, Netlify shows:
- **"Deploy in progress"** (takes 30-60 seconds)
- Then **"Open production deploy"** button appears

## 📋 NEXT STEPS

### Step 1: Wait for Deploy to Complete
- Watch the progress bar
- Should say "Deploy in progress..."
- Wait until it says "Deploy complete"

### Step 2: Click "Open Production Deploy"
- This opens your new site URL
- URL will look like: `https://wearx-xxx.netlify.app`
- **SAVE THIS URL!**

### Step 3: (Optional but Recommended) Claim Site
- Netlify will show "Claim this site" button
- Click it to add to your Netlify dashboard
- You can then:
  - Change site name (e.g., "wearx-beta")
  - Connect custom domain later
  - View analytics

### Step 4: Test Everything
Open your new Netlify URL and test:
- [ ] Homepage loads
- [ ] Waitlist form works
- [ ] All pages work (/wardrobe, /outfits, etc.)
- [ ] Check console for "gtag" (F12 → type gtag)

---

## 🎯 ONCE NETLIFY IS LIVE

**Your new URL:** `https://[something].netlify.app`

**Update posting schedule:**
Replace all instances of:
```
https://symphonious-capybara-0c525d.netlify.app
```

With your new Netlify URL in:
- COMPLETE_POSTING_SCHEDULE.md
- All Reddit posts
- All Twitter content

---

## ❓ IF YOU GET STUCK

**Problem:** "Deploy failed"
**Solution:** Make sure you dragged the `dist` folder (not the zip file)

**Problem:** Can't find the URL
**Solution:** Look for the green "Open production deploy" button

**Problem:** Site shows 404
**Solution:** Check that `index.html` is in the dist folder root

---

## ✅ WHEN DONE

Reply with your new Netlify URL and I'll:
1. Update all posting content with the new URL
2. Verify everything is working
3. Give you the final go-ahead to post to Reddit/Twitter

**What's your Netlify URL?**
