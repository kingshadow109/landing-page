# AI Providers Free Tier Setup Guide

> Last updated: 2026-02-18
> 
> This guide documents the free tier signup process for major AI API providers. **Important:** Most providers now require some form of payment verification or have discontinued completely free tiers.

---

## Table of Contents

1. [OpenAI](#1-openai)
2. [Anthropic (Claude)](#2-anthropic-claude)
3. [Groq](#3-groq)
4. [Google AI Studio](#4-google-ai-studio)
5. [Replicate](#5-replicate)
6. [Recommendations](#recommendations)

---

## 1. OpenAI

**Signup URL:** https://platform.openai.com/signup

### Signup Process
1. Visit the signup URL
2. Create an account with email or use Google/Microsoft authentication
3. Verify your email address
4. **Add a payment method** (minimum $5 USD prepayment required)
5. Generate API keys from the dashboard

### Free Tier Details
⚠️ **OpenAI has effectively discontinued its free tier as of 2024-2025.**

- **Previous free tier:** $5 in trial credits (expired after 3 months)
- **Current requirement:** Minimum $5 prepayment to use API
- **What you get:** The $5 is consumable credit for API usage

### Rate Limits (Tier 1 - After $5 Payment)
| Model | RPM | TPM |
|-------|-----|-----|
| GPT-4o | 500 | 30,000 |
| GPT-4o-mini | 500 | 200,000 |
| GPT-3.5-turbo | 3,500 | 200,000 |

### API Key Location
- Dashboard → API Keys → "Create new secret key"
- URL: https://platform.openai.com/api-keys

### Verification Requirements
- Email verification required
- Phone verification may be required
- **Payment method REQUIRED** (no true free tier anymore)
- ID verification may be required for certain future models

### Gotchas
- ❌ No longer offers true free credits for new users
- ❌ Minimum $5 payment required to generate API keys
- ⚠️ Credits expire after 1 year
- ⚠️ Strict rate limits until you spend more

---

## 2. Anthropic (Claude)

**Signup URL:** https://console.anthropic.com/

### Signup Process
1. Visit the console URL
2. Sign up with email
3. Verify email address
4. Complete phone verification (SMS)
5. Claim $5 free credit (if eligible)
6. Generate API key

### Free Tier Details
- **Free credits:** $5 USD for new accounts (with phone verification)
- **Eligibility:** Available in select regions only
- **Credit expiration:** Typically 3 months

### Rate Limits
| Tier | Requests/min | Tokens/min |
|------|--------------|------------|
| Free ($5 credit) | Limited | Limited |
| Build Tier (paid) | Higher limits | Higher limits |

### API Key Location
- Console → API Keys → "Create Key"
- URL: https://console.anthropic.com/settings/keys

### Verification Requirements
- ✅ Email verification required
- ✅ **Phone verification REQUIRED** (SMS)
- ❌ No payment method required for free tier

### Gotchas
- ❌ Phone verification is mandatory (may exclude some users)
- ❌ Only available in certain regions
- ❌ $5 credit runs out quickly with Claude 3.5 Sonnet usage
- ⚠️ Some users report verification SMS not arriving
- ✅ Students with .edu emails may get $50+ credits

---

## 3. Groq

**Signup URL:** https://console.groq.com/

### Signup Process
1. Visit console.groq.com
2. Sign up with email OR GitHub account
3. Immediate access to free tier
4. Generate API key from dashboard

### Free Tier Details
- **Cost:** 100% FREE (no credit card required)
- **Access:** Full access to GroqCloud and supported models
- **Best for:** Fast inference of open-source models

### Rate Limits (Free Tier)
| Model | RPM | RPD | TPM |
|-------|-----|-----|-----|
| llama-3.1-8b-instant | 30 | 14,400 | 6,000 |
| llama-3.3-70b-versatile | 30 | 1,000 | 12,000 |
| mixtral-8x7b | 30 | 14,400 | 5,000 |
| gemma-7b | 30 | 14,400 | 15,000 |
| whisper-large-v3 | 20 | 2,000 | - |

**Note:** RPD = Requests Per Day, TPM = Tokens Per Minute

### API Key Location
- Console → API Keys → "Create API Key"
- URL: https://console.groq.com/keys

### Verification Requirements
- ✅ Email verification (if signing up with email)
- ❌ No phone verification required
- ❌ No payment method required

### Gotchas
- ✅ Truly free tier with generous limits
- ✅ Very fast inference speeds
- ⚠️ Limited to specific open-source models (no GPT-4/Claude)
- ⚠️ Rate limits are per-organization, not per-key
- ❌ No access to proprietary models

---

## 4. Google AI Studio

**Signup URL:** https://aistudio.google.com/app/apikey

### Signup Process
1. Visit the URL with a Google account
2. Accept terms of service
3. Create a Google Cloud project (or use existing)
4. Generate API key immediately

### Free Tier Details
- **Cost:** FREE (no credit card required)
- **Limits:** Generous quotas for experimentation
- **Models:** Access to Gemini 2.0 Flash, 2.5 Pro (preview), and more

### Rate Limits (Free Tier)
| Model | RPM | TPM | RPD |
|-------|-----|-----|-----|
| Gemini 2.0 Flash | 15 | 1,000,000 | 1,500 |
| Gemini 2.5 Pro | 5 | 250,000 | 100-250 |
| Gemini 2.5 Flash | 10-15 | 250,000-1M | 500-1,500 |

**Note:** Limits vary by model and may change. RPD = Requests Per Day.

### API Key Location
- AI Studio → "Get API Key" button
- URL: https://aistudio.google.com/app/apikey
- Or Google Cloud Console → APIs & Services → Credentials

### Verification Requirements
- ✅ Google account required
- ❌ No phone verification required
- ❌ No payment method required for free tier

### Gotchas
- ✅ Truly free with no payment required
- ✅ Very high rate limits compared to competitors
- ✅ Access to latest Gemini models
- ⚠️ Free tier quotas reduced in late 2025
- ⚠️ Google Cloud project required
- ⚠️ Limits reset at midnight Pacific Time
- ❌ May require Cloud Billing to upgrade limits

---

## 5. Replicate

**Signup URL:** https://replicate.com/signin

### Signup Process
1. Visit replicate.com
2. Sign up with GitHub account (primary method)
3. Verify email if prompted
4. Access API tokens page

### Free Tier Details
- **Free credits:** None explicitly advertised as of 2024-2025
- **Pricing:** Pay-per-use model (no upfront credits)
- **Minimum:** No minimum payment to sign up

### Pricing Examples
| Model | Input | Output |
|-------|-------|--------|
| Llama 3 70B | $0.65 / 1M tokens | $2.75 / 1M tokens |
| FLUX.1 [dev] | ~$0.03 per image | - |
| SDXL | ~$0.01 per image | - |

### API Key Location
- Account Settings → API Tokens
- URL: https://replicate.com/account/api-tokens

### Verification Requirements
- ✅ GitHub account required for signup
- ❌ No phone verification
- ❌ No payment method required to create account
- ⚠️ Payment required to actually run models

### Gotchas
- ❌ No free credits upon signup
- ❌ Must add payment method to use API
- ✅ Very cost-effective for image generation
- ✅ Large selection of open-source models
- ✅ Good for fine-tuning workflows
- ⚠️ Pricing varies significantly by model

---

## Recommendations

### 🥇 Best for Getting Started (Free)

| Rank | Provider | Why |
|------|----------|-----|
| 1 | **Google AI Studio** | Highest free limits, no verification hassle, great models |
| 2 | **Groq** | Truly free, very fast, good for open-source LLMs |
| 3 | **Anthropic** | $5 free credit, but phone verification required |

### 🥈 Best Value (Paid)

| Rank | Provider | Why |
|------|----------|-----|
| 1 | **Groq** | Cheapest inference for open models |
| 2 | **Google AI Studio** | Good free tier, reasonable paid rates |
| 3 | **Replicate** | Cost-effective for image generation |

### 🚫 Avoid for True Free Tier

| Provider | Reason |
|----------|--------|
| **OpenAI** | No free tier, $5 minimum required |
| **Replicate** | No free credits, pay-per-use only |

### Recommended Signup Order

1. **Start with Google AI Studio** - Easiest, highest limits, no friction
2. **Add Groq** - Great for fast, free open-source model inference
3. **Try Anthropic** - If you need Claude specifically (phone verification required)
4. **Consider OpenAI** - Only if you need GPT-4 specifically (requires $5)
5. **Use Replicate** - For image generation or specific models (requires payment)

---

## Summary Table

| Provider | Free Tier | Verification | Phone Required | Payment Required |
|----------|-----------|--------------|----------------|------------------|
| OpenAI | ❌ None | Email | Sometimes | ✅ Yes ($5 min) |
| Anthropic | ✅ $5 credit | Email + Phone | ✅ Yes | ❌ No |
| Groq | ✅ Unlimited | Email/GitHub | ❌ No | ❌ No |
| Google AI | ✅ Generous | Google Account | ❌ No | ❌ No |
| Replicate | ❌ None | GitHub | ❌ No | ✅ To use |

---

## Blockers & Issues Encountered

### Research-Only Limitations
This guide was created through web research. Actual signup attempts may encounter:

1. **Regional Restrictions** - Some providers block certain countries
2. **IP-based Blocking** - VPN/proxy detection may prevent signup
3. **Verification Delays** - SMS/email verification may not arrive
4. **Policy Changes** - Free tier terms change frequently
5. **Account Flags** - New accounts may face additional scrutiny

### Recommendations for Actual Signup
- Use a clean browser session
- Have a working phone number ready for Anthropic
- Use a valid payment method for OpenAI/Replicate
- Check regional availability before attempting

---

*Document created: 2026-02-18*
*For updates, check each provider's official documentation*
