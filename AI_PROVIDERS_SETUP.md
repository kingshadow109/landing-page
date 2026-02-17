# AI Providers Free Tier Setup Guide

## Quick Recommendations (Start Here)

**Priority Order for $30 Budget:**
1. **Groq** - Fastest, most generous free tier, no credit card required
2. **Google AI Studio** - 1,500 requests/day free, no credit card
3. **OpenAI** - $5 free credit, requires phone verification
4. **Anthropic** - $5 free credit, requires phone verification
5. **Replicate** - Pay-per-use, good for image generation

---

## 1. Groq (Recommended First)

**Signup URL:** https://console.groq.com/

**Free Tier:**
- Rate limits: 20 requests/minute, 1,440 requests/day
- No credit card required
- No phone verification
- Instant API key generation

**API Key Location:**
1. Login to https://console.groq.com/
2. Click "API Keys" in left sidebar
3. Create new key

**Models Available:**
- Llama 3.3 70B
- Llama 3.1 8B
- Mixtral 8x7B
- Gemma 2 9B

**Best For:** Fast inference, coding tasks, general LLM use

---

## 2. Google AI Studio

**Signup URL:** https://aistudio.google.com/app/apikey

**Free Tier:**
- 1,500 requests/day
- 1,000,000 tokens/day
- No credit card required
- Google account needed

**API Key Location:**
1. Go to https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Select project or create new one

**Models Available:**
- Gemini 2.0 Flash
- Gemini 1.5 Pro
- Gemini 1.5 Flash

**Best For:** Long context (1M+ tokens), multimodal (images + text)

---

## 3. OpenAI

**Signup URL:** https://platform.openai.com/signup

**Free Tier:**
- $5 free credit (expires after 3 months)
- Pay-as-you-go after

**Requirements:**
- Email verification
- Phone number verification (SMS)
- Credit card NOT required for free tier

**API Key Location:**
1. Login to https://platform.openai.com/
2. Go to Settings → API Keys
3. Create new secret key

**Models Available:**
- GPT-4o
- GPT-4o-mini
- GPT-3.5-turbo
- DALL-E 3 (image generation)

**Best For:** Best overall quality, image generation, embeddings

---

## 4. Anthropic (Claude)

**Signup URL:** https://console.anthropic.com/

**Free Tier:**
- $5 free credit
- Rate limits apply

**Requirements:**
- Email verification
- Phone number verification (SMS)
- Credit card NOT required for free tier

**API Key Location:**
1. Login to https://console.anthropic.com/
2. Go to API Keys section
3. Generate new key

**Models Available:**
- Claude 3.5 Sonnet
- Claude 3 Haiku

**Best For:** Long-form writing, analysis, reasoning tasks

---

## 5. Replicate

**Signup URL:** https://replicate.com/signin

**Free Tier:**
- No free credits automatically
- Some models have free tiers
- Pay-per-use model

**Requirements:**
- GitHub account or email signup
- Credit card required for usage

**API Key Location:**
1. Login to https://replicate.com/
2. Go to Account → API Tokens
3. Create new token

**Models Available:**
- Flux (image generation)
- Stable Diffusion
- Llama 2/3
- Various open-source models

**Best For:** Image generation, running open-source models

---

## Setup Checklist

- [ ] Groq account + API key
- [ ] Google AI Studio account + API key
- [ ] OpenAI account + API key
- [ ] Anthropic account + API key
- [ ] Replicate account + API token

## Environment Variables Template

Create `.env.local` file:

```
# AI Provider API Keys
GROQ_API_KEY=your_groq_key_here
GOOGLE_API_KEY=your_google_key_here
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
REPLICATE_API_TOKEN=your_replicate_token_here
```

## Cost Management Tips

1. **Start with Groq** - Most generous free tier
2. **Use Google AI Studio** for high-volume tasks (1,500/day)
3. **Save OpenAI/Anthropic** for quality-critical tasks
4. **Set up usage alerts** on all platforms
5. **Monitor dashboard regularly**

## Troubleshooting

**"Rate limit exceeded"**
→ Switch to another provider or wait for reset

**"Invalid API key"**
→ Regenerate key, ensure no extra spaces

**"Phone verification required"**
→ Use your real number, most providers require this

**"Credit card required"**
→ Some providers need it even for free tier - skip and use others
