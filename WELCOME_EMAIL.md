# WearX Welcome Email - Waitlist Onboarding

> **File:** `/root/.openclaw/workspace/projects/landing-page/WELCOME_EMAIL.md`  
> **Created:** 2026-02-18  
> **Purpose:** Automated welcome email for Loops.so waitlist subscribers

---

## 📋 Table of Contents

1. [Subject Line Options](#-subject-line-options)
2. [Email Body - HTML Version](#-email-body---html-version)
3. [Email Body - Plain Text Version](#-email-body---plain-text-version)
4. [Loops.so Automation Setup](#-loopsso-automation-setup)
5. [Best Practices Summary](#-best-practices-summary)

---

## 🎯 Subject Line Options

### Option 1: Personal & Warm (Recommended)
```
You're in! Welcome to the WearX waitlist 👋
```
**Why it works:** Immediate confirmation, personal tone, emoji adds warmth

### Option 2: Excitement-Focused
```
Welcome to the future of wearable AI 🚀
```
**Why it works:** Builds anticipation, emphasizes innovation, aspirational

### Option 3: Community-Focused
```
Welcome to the WearX community, {{firstName|there}}!
```
**Why it works:** Personalization with fallback, emphasizes belonging, inclusive

---

## 📧 Email Body - HTML Version

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to WearX</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 20px !important; }
      .header { font-size: 24px !important; }
      .cta-button { width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8f9fa;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table class="container" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          
          <!-- Logo/Header -->
          <tr>
            <td align="center" style="padding: 40px 40px 20px;">
              <img src="https://wearx.io/logo.png" alt="WearX" width="120" style="display: block; border: 0;">
            </td>
          </tr>
          
          <!-- Welcome Message -->
          <tr>
            <td style="padding: 20px 40px;">
              <h1 class="header" style="margin: 0 0 16px; font-size: 28px; font-weight: 700; color: #1a1a2e; line-height: 1.3;">
                Welcome to the future of wearable AI! 🎉
              </h1>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #4a4a68;">
                Hi {{firstName|there}},
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #4a4a68;">
                Thanks for joining the WearX waitlist! You're now part of an exclusive group of early adopters who will be the first to experience the next generation of AI-powered wearables.
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #4a4a68;">
                We've confirmed your spot and will keep you updated every step of the way.
              </p>
            </td>
          </tr>
          
          <!-- What's Coming Section -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600; color: #1a1a2e;">
                What to expect
              </h2>
              
              <!-- Timeline Item 1 -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 16px;">
                <tr>
                  <td width="40" valign="top" style="padding-right: 16px;">
                    <div style="width: 32px; height: 32px; background-color: #6366f1; border-radius: 50%; text-align: center; line-height: 32px; color: #ffffff; font-weight: 600; font-size: 14px;">1</div>
                  </td>
                  <td valign="top">
                    <p style="margin: 0; font-size: 15px; font-weight: 600; color: #1a1a2e;">Beta Access</p>
                    <p style="margin: 4px 0 0; font-size: 14px; color: #6b7280; line-height: 1.5;">You'll receive an exclusive invitation to our private beta in Q2 2026</p>
                  </td>
                </tr>
              </table>
              
              <!-- Timeline Item 2 -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 16px;">
                <tr>
                  <td width="40" valign="top" style="padding-right: 16px;">
                    <div style="width: 32px; height: 32px; background-color: #8b5cf6; border-radius: 50%; text-align: center; line-height: 32px; color: #ffffff; font-weight: 600; font-size: 14px;">2</div>
                  </td>
                  <td valign="top">
                    <p style="margin: 0; font-size: 15px; font-weight: 600; color: #1a1a2e;">Early Bird Pricing</p>
                    <p style="margin: 4px 0 0; font-size: 14px; color: #6b7280; line-height: 1.5;">Waitlist members get 30% off their first WearX device</p>
                  </td>
                </tr>
              </table>
              
              <!-- Timeline Item 3 -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td width="40" valign="top" style="padding-right: 16px;">
                    <div style="width: 32px; height: 32px; background-color: #ec4899; border-radius: 50%; text-align: center; line-height: 32px; color: #ffffff; font-weight: 600; font-size: 14px;">3</div>
                  </td>
                  <td valign="top">
                    <p style="margin: 0; font-size: 15px; font-weight: 600; color: #1a1a2e;">Behind-the-Scenes Updates</p>
                    <p style="margin: 4px 0 0; font-size: 14px; color: #6b7280; line-height: 1.5;">Exclusive sneak peeks at features, design process, and team stories</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Features Preview -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600; color: #1a1a2e;">
                What's coming
              </h2>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td width="50%" valign="top" style="padding-right: 8px; padding-bottom: 12px;">
                    <p style="margin: 0; font-size: 14px; color: #4a4a68;">🧠 <strong>AI Assistant</strong> — Your personal AI that learns and adapts</p>
                  </td>
                  <td width="50%" valign="top" style="padding-left: 8px; padding-bottom: 12px;">
                    <p style="margin: 0; font-size: 14px; color: #4a4a68;">⚡ <strong>All-Day Battery</strong> — 48+ hours on a single charge</p>
                  </td>
                </tr>
                <tr>
                  <td width="50%" valign="top" style="padding-right: 8px;">
                    <p style="margin: 0; font-size: 14px; color: #4a4a68;">🔒 <strong>Privacy First</strong> — Your data stays yours, always</p>
                  </td>
                  <td width="50%" valign="top" style="padding-left: 8px;">
                    <p style="margin: 0; font-size: 14px; color: #4a4a68;">🌐 <strong>Seamless Sync</strong> — Works with all your devices</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Social Proof -->
          <tr>
            <td style="padding: 20px 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f3f4f6; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 12px; font-size: 14px; color: #6b7280; text-align: center;">
                      Join thousands of tech enthusiasts already on the waitlist
                    </p>
                    <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1a1a2e; text-align: center;">
                      "The future of wearables is here. Can't wait to get my hands on WearX!"
                      <br>
                      <span style="font-size: 13px; font-weight: 400; color: #6b7280;">— Early supporter from San Francisco</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Social CTA -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600; color: #1a1a2e;">
                Join the conversation
              </h2>
              <p style="margin: 0 0 20px; font-size: 15px; color: #4a4a68; line-height: 1.6;">
                Follow us for daily updates, behind-the-scenes content, and to connect with fellow WearX enthusiasts.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                <tr>
                  <td style="padding: 0 8px;">
                    <a href="https://twitter.com/wearx" style="display: inline-block; padding: 12px 24px; background-color: #000000; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600;">
                      Follow on X/Twitter
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://instagram.com/wearx" style="display: inline-block; padding: 12px 24px; background-color: #e4405f; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600;">
                      Follow on Instagram
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Reply CTA -->
          <tr>
            <td style="padding: 20px 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-top: 1px solid #e5e7eb; padding-top: 20px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 12px; font-size: 15px; color: #4a4a68; line-height: 1.6;">
                      <strong>We'd love to hear from you!</strong> Have questions, feedback, or just want to say hi? Simply reply to this email — a real human will read it.
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #6b7280;">
                      What feature are you most excited about? Let us know! 💬
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px 40px;">
              <p style="margin: 0 0 8px; font-size: 14px; color: #9ca3af; text-align: center;">
                Thanks for being part of the journey,<br>
                <strong style="color: #4a4a68;">The WearX Team</strong>
              </p>
              <p style="margin: 16px 0 0; font-size: 12px; color: #9ca3af; text-align: center;">
                You're receiving this because you signed up for the WearX waitlist.<br>
                <a href="{{unsubscribeUrl}}" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a> | 
                <a href="https://wearx.io/privacy" style="color: #6b7280; text-decoration: underline;">Privacy Policy</a>
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 📝 Email Body - Plain Text Version

```
Subject: You're in! Welcome to the WearX waitlist 👋

---

Welcome to the future of wearable AI! 🎉

Hi {{firstName|there}},

Thanks for joining the WearX waitlist! You're now part of an exclusive 
group of early adopters who will be the first to experience the next 
generation of AI-powered wearables.

We've confirmed your spot and will keep you updated every step of the way.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT TO EXPECT

1. BETA ACCESS
   You'll receive an exclusive invitation to our private beta in Q2 2026

2. EARLY BIRD PRICING  
   Waitlist members get 30% off their first WearX device

3. BEHIND-THE-SCENES UPDATES
   Exclusive sneak peeks at features, design process, and team stories

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT'S COMING

🧠 AI Assistant — Your personal AI that learns and adapts
⚡ All-Day Battery — 48+ hours on a single charge
🔒 Privacy First — Your data stays yours, always
🌐 Seamless Sync — Works with all your devices

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JOIN THOUSANDS OF TECH ENTHUSIASTS

"The future of wearables is here. Can't wait to get my hands on WearX!"
— Early supporter from San Francisco

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JOIN THE CONVERSATION

Follow us for daily updates and behind-the-scenes content:

→ X/Twitter: https://twitter.com/wearx
→ Instagram: https://instagram.com/wearx

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WE'D LOVE TO HEAR FROM YOU!

Have questions, feedback, or just want to say hi? Simply reply to this 
email — a real human will read it.

What feature are you most excited about? Let us know! 💬

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thanks for being part of the journey,
The WearX Team

---

You're receiving this because you signed up for the WearX waitlist.
Unsubscribe: {{unsubscribeUrl}}
Privacy Policy: https://wearx.io/privacy
```

---

## ⚙️ Loops.so Automation Setup

### Step 1: Create a New Loop (Automation)

1. Log in to your [Loops.so dashboard](https://app.loops.so)
2. Navigate to **Loops** → **Create Loop**
3. Select **"Welcome email"** as the template type
4. Name your loop: `WearX Waitlist Welcome`

### Step 2: Configure the Trigger

**Trigger Type:** Contact Added to Audience

```
Trigger: When a contact is added to the "Waitlist" audience
Condition: contact.tags contains "waitlist" (optional, for segmentation)
```

### Step 3: Set Email Content

1. **Subject Line:** Use one of the options above (recommend Option 1)
2. **From Name:** `WearX Team` or `Alex from WearX` (personal touch)
3. **From Email:** `hello@wearx.io` (use your verified domain)
4. **Reply-To:** `hello@wearx.io` (ensures replies go to your team)

### Step 4: Add Email Content

1. Toggle to **HTML** mode
2. Paste the HTML version from above
3. **OR** use the visual editor and paste the plain text as reference

### Step 5: Configure Timing

```
Send: Immediately (0 minutes after trigger)
```

> **Best Practice:** Welcome emails sent immediately have 4x higher open rates than delayed sends.

### Step 6: Test the Loop

1. Click **Send Test**
2. Enter your email address
3. Verify:
   - [ ] Subject line renders correctly
   - [ ] Personalization works ({{firstName}})
   - [ ] All links are clickable
   - [ ] Mobile responsiveness
   - [ ] Unsubscribe link works

### Step 7: Activate

1. Review all settings
2. Click **Activate Loop**
3. Monitor the first few sends in **Logs**

---

## 📊 Advanced Configuration (Optional)

### Segmentation Tags

Add these tags in Loops.so for better targeting:

| Tag | Purpose |
|-----|---------|
| `waitlist` | Main waitlist segment |
| `waitlist-vip` | High-priority influencers/partners |
| `beta-interested` | Users who expressed beta interest |
| `source-landing` | Came from main landing page |
| `source-social` | Came from social media |

### Follow-up Sequence

Consider adding these follow-up emails to the same Loop:

| Day | Email Purpose | Trigger |
|-----|---------------|---------|
| Day 0 | Welcome (this email) | Contact added |
| Day 3 | Feature deep-dive | No reply to welcome |
| Day 7 | Social proof/stories | Still on waitlist |
| Day 14 | Survey/feedback request | Engaged users |

---

## ✅ Best Practices Summary

Based on research from industry leaders (Userpilot, Loops.so, Really Good Emails):

### Subject Lines
- ✅ Keep under 50 characters for mobile
- ✅ Use personalization when possible
- ✅ Create curiosity or urgency
- ✅ A/B test 2-3 variations

### Email Content
- ✅ **Single CTA focus** — Don't overwhelm with multiple actions
- ✅ **Above the fold value** — Key message in first 100 words
- ✅ **Mobile-first design** — 60%+ opens happen on mobile
- ✅ **Personalization** — Use {{firstName}} with fallback
- ✅ **Social proof** — Build trust with testimonials/user counts

### Deliverability
- ✅ Warm up new domains with transactional emails first
- ✅ Target 40%+ open rate on welcome emails
- ✅ Monitor spam complaints (<0.1%)
- ✅ Authenticate domain (SPF, DKIM, DMARC)

### Engagement
- ✅ Send immediately after signup
- ✅ Make replies easy (real reply-to address)
- ✅ Include unsubscribe (required by law)
- ✅ Track opens, clicks, and replies

### Metrics to Monitor

| Metric | Target | Action if Below |
|--------|--------|-----------------|
| Open Rate | >40% | Test new subject lines |
| Click Rate | >5% | Improve CTA clarity |
| Reply Rate | >1% | Make CTA more personal |
| Unsubscribe | <0.5% | Check email frequency |

---

## 🔗 Resources

- [Loops.so Documentation](https://loops.so/docs)
- [Loops.so Onboarding Guide](https://loops.so/docs/guides/onboarding-emails)
- [Really Good Emails - Examples](https://reallygoodemails.com)
- [Email Deliverability Best Practices](https://loops.so/docs/deliverability)

---

**Last Updated:** 2026-02-18  
**Next Review:** After first 100 sends (check metrics)
