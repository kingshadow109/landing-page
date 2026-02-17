# Loops.so Setup Guide for WearX

## Step 1: Create Loops.so Account

1. Go to https://loops.so
2. Click "Get Started" or "Sign Up"
3. Sign up with your email (or Google/GitHub)
4. **Check your email** and click the verification link

## Step 2: Create a Waitlist

1. In Loops dashboard, click "Audiences" → "Create Audience"
2. Name it: `WearX Waitlist`
3. Add custom fields (optional):
   - `source` (text) - to track where signups come from
   - `signup_date` (date)

## Step 3: Get Your API Key

1. Go to Settings → API Keys
2. Click "Create API Key"
3. Name it: `WearX Website`
4. Copy the key (starts with `ey...`)

## Step 4: Add API Key to Vercel

1. Go to https://vercel.com/dashboard
2. Select your `landing-page` project
3. Click "Settings" → "Environment Variables"
4. Add new variable:
   - **Name:** `LOOPS_API_KEY`
   - **Value:** Your API key from step 3
5. Click "Save"
6. **Redeploy** your site (Vercel will auto-redeploy)

## Step 5: Test the Waitlist

1. Go to your live site: https://landing-page-kingshadow109.vercel.app
2. Enter an email in the waitlist form
3. Click "Join the waitlist"
4. Check Loops dashboard → Contacts to see the new signup

## Step 6: Set Up Welcome Email (Optional)

1. In Loops, go to "Automations"
2. Click "Create Automation"
3. Trigger: "Contact added to audience"
4. Audience: `WearX Waitlist`
5. Action: "Send email"
6. Design your welcome email

## Free Tier Limits

- **1,000 contacts** (perfect for early waitlist)
- **2,000 emails/month**
- **Unlimited automations**

## Troubleshooting

**Emails not appearing in Loops:**
- Check that `LOOPS_API_KEY` is set in Vercel
- Redeploy after adding the key
- Check browser console for errors

**API errors:**
- Verify your API key is correct
- Check Loops dashboard for rate limits

## Next Steps

Once you have signups:
- Export contacts as CSV anytime
- Send broadcast emails to your waitlist
- Set up launch notification automation
