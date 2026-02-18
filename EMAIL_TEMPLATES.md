# WearX Email Templates

## Email Design System

### Visual Standards
- **Width:** 600px maximum
- **Background:** #FFFFFF (white) or #F8F9FC (Slate 100)
- **Primary Font:** Inter, Arial, sans-serif
- **Text Color:** #1F2937 (Slate 800)
- **Link Color:** #0066FF (WearX Blue)
- **Button Radius:** 8px
- **Button Padding:** 16px 32px

### Button Styles

**Primary CTA:**
```
Background: #0066FF
Text: #FFFFFF
Font: 16px, 600 weight
Border-radius: 8px
Hover: darken 10%
```

**Secondary CTA:**
```
Background: transparent
Border: 2px solid #0066FF
Text: #0066FF
Font: 16px, 600 weight
Border-radius: 8px
```

---

## 1. Welcome Email

**Subject Lines:**
- Welcome to WearX, [First Name]! Let's get moving 🚀
- Your health journey starts now
- Welcome to the WearX family

**Send Trigger:** Immediately after signup

**Preview Text:** "Here's everything you need to get started with WearX..."

### Template

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to WearX</title>
</head>
<body style="margin: 0; padding: 0; font-family: Inter, Arial, sans-serif; background-color: #F8F9FC;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px; text-align: center;">
                            <img src="logo.png" alt="WearX" width="120" style="display: block; margin: 0 auto;">
                        </td>
                    </tr>
                    
                    <!-- Hero -->
                    <tr>
                        <td style="padding: 20px 40px;">
                            <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #0A0A1A; text-align: center;">
                                Welcome to WearX, {{first_name}}!
                            </h1>
                            <p style="margin: 20px 0 0; font-size: 18px; color: #4B5563; text-align: center; line-height: 1.6;">
                                You're one step closer to understanding your body better than ever before.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- CTA -->
                    <tr>
                        <td style="padding: 20px 40px; text-align: center;">
                            <a href="{{app_download_link}}" style="display: inline-block; padding: 16px 32px; background-color: #0066FF; color: #FFFFFF; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                                Download the App
                            </a>
                        </td>
                    </tr>
                    
                    <!-- Next Steps -->
                    <tr>
                        <td style="padding: 20px 40px 40px;">
                            <h2 style="margin: 0 0 20px; font-size: 20px; font-weight: 600; color: #0A0A1A;">
                                Here's what to do next:
                            </h2>
                            
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="padding: 15px; background-color: #F8F9FC; border-radius: 8px; margin-bottom: 10px;">
                                        <strong style="color: #0066FF;">1.</strong> 
                                        <span style="color: #1F2937;">Download the WearX app on your phone</span>
                                    </td>
                                </tr>
                                <tr><td style="height: 10px;"></td></tr>
                                <tr>
                                    <td style="padding: 15px; background-color: #F8F9FC; border-radius: 8px;">
                                        <strong style="color: #0066FF;">2.</strong> 
                                        <span style="color: #1F2937;">Connect your wearable device</span>
                                    </td>
                                </tr>
                                <tr><td style="height: 10px;"></td></tr>
                                <tr>
                                    <td style="padding: 15px; background-color: #F8F9FC; border-radius: 8px;">
                                        <strong style="color: #0066FF;">3.</strong> 
                                        <span style="color: #1F2937;">Set your first health goal</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; background-color: #F8F9FC; text-align: center;">
                            <p style="margin: 0; font-size: 14px; color: #9CA3AF;">
                                Need help? Reply to this email or visit our 
                                <a href="{{help_center_link}}" style="color: #0066FF; text-decoration: none;">Help Center</a>
                            </p>
                            <p style="margin: 20px 0 0; font-size: 12px; color: #9CA3AF;">
                                © 2026 WearX. All rights reserved.<br>
                                <a href="{{unsubscribe_link}}" style="color: #9CA3AF;">Unsubscribe</a>
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

## 2. Onboarding Series

### Email 2: Getting Started (Day 1)

**Subject:** Let's set up your first goal

**Preview Text:** "Setting a goal increases your success rate by 3x. Here's how..."

**Content:**
- Quick setup guide (3 steps)
- Video tutorial link
- Common questions FAQ

---

### Email 3: First Week Check-in (Day 3)

**Subject:** How's your first week going?

**Preview Text:** "Tips to make the most of your WearX experience..."

**Content:**
- Progress encouragement
- Feature spotlight: Sleep tracking
- Community invitation

---

### Email 4: Unlock Premium (Day 7)

**Subject:** Get 50% off WearX Premium

**Preview Text:** "Advanced insights, personalized coaching, and more..."

**Content:**
- Premium features overview
- Limited-time discount offer
- Social proof/testimonials

---

## 3. Retention Emails

### Weekly Summary Email

**Subject:** Your week in review, [First Name] 📊

**Send:** Every Monday at 9am

**Content Blocks:**
1. **Week at a Glance**
   - Total steps
   - Average sleep
   - Workouts completed
   - Calories burned

2. **Personalized Insights**
   - "You walked 15% more than last week!"
   - Sleep quality trend
   - Goal progress

3. **This Week's Challenge**
   - Gamified weekly goal
   - Reward/points system

4. **Tips Based on Data**
   - Contextual health tips
   - Feature recommendations

---

### Re-engagement Email

**Subject:** We miss you, [First Name]

**Send Trigger:** 14 days of inactivity

**Subject Lines (A/B Test):**
- We miss you, [First Name]
- Your health data is waiting
- Come back and crush your goals
- [First Name], don't break your streak!

**Content:**
```
Hi [First Name],

We noticed you haven't opened the WearX app in a while. 

Your health journey doesn't have to be perfect—it just has to continue.

[CTA: Open the App]

Here's what you've missed:
• [Feature updates since last visit]
• [Community highlights]
• [Personal stat: "You were so close to your 10K steps goal!"]

[Secondary CTA: Update My Goals]

Need help getting back on track? Reply to this email—we read every one.

The WearX Team
```

---

### Milestone Celebration Email

**Subject:** 🎉 You hit [Milestone]!

**Send Trigger:** Achievement unlocked

**Milestones:**
- 7-day streak
- First 10K steps
- 30-day goal completion
- 100 workouts logged
- Sleep improvement milestone

**Content:**
```
Subject: 🎉 You crushed your 7-day streak!

Hi [First Name],

Seven days straight. That's not luck—that's commitment.

[Visual: Celebration graphic with stats]

Your streak stats:
• Total steps: [X]
• Average sleep: [X] hours
• Calories burned: [X]

[CTA: Keep the Streak Alive]

Share your achievement: [Twitter] [Instagram] [Facebook]

What's next? Try for 14 days—we believe in you!

The WearX Team
```

---

## 4. Transactional Emails

### Password Reset

**Subject:** Reset your WearX password

**Preview Text:** "Click the link below to reset your password..."

```
Hi [First Name],

We received a request to reset your WearX password.

[CTA: Reset Password]

This link expires in 24 hours.

Didn't request this? You can safely ignore this email.

The WearX Team
```

---

### Subscription Confirmation

**Subject:** Welcome to WearX Premium

**Content:**
```
Hi [First Name],

Welcome to WearX Premium! Your subscription is now active.

Plan: [Plan Name]
Billing: [Monthly/Annual]
Next charge: [Date]

Your Premium benefits:
✓ Advanced sleep analysis
✓ Personalized coaching
✓ Health trends & insights
✓ Export data
✓ Priority support

[CTA: Explore Premium Features]

Questions? Contact us at support@wearx.com

The WearX Team
```

---

### Payment Failed

**Subject:** Action required: Update your payment method

**Content:**
```
Hi [First Name],

We couldn't process your WearX Premium payment.

Don't worry—your data is safe and you won't lose access immediately.

[CTA: Update Payment Method]

Current status: [Details]

Need help? Contact our support team.

The WearX Team
```

---

## 5. Promotional Emails

### New Feature Announcement

**Subject:** Introducing [Feature Name] 🚀

**Preview Text:** "The most requested feature is finally here..."

**Content Structure:**
1. Hook: "You asked, we built it."
2. Feature explanation with GIF/demo
3. Benefits (3 bullet points)
4. How to access
5. CTA

---

### Seasonal Campaign

**Subject:** New Year, New You—Start with 50% Off

**Preview Text:** "Your best year starts with better health data..."

**Content:**
```
Hi [First Name],

New year. New goals. Same you—but with better insights.

This year, don't just set resolutions. Track them.

[Hero: New Year themed graphic]

Start 2026 with WearX Premium:
✓ Personalized health insights
✓ Advanced sleep tracking
✓ Custom workout plans
✓ Progress reports

[CTA: Get 50% Off Premium]

Offer ends January 31st.

The WearX Team
```

---

## Email Best Practices

### Send Schedule

| Email Type | Send Time | Day |
|------------|-----------|-----|
| Welcome | Immediate | Any |
| Onboarding | 9am | Day 1, 3, 7 |
| Weekly Summary | 9am | Monday |
| Retention | 2pm | Based on trigger |
| Promotional | 10am | Tuesday-Thursday |

### A/B Testing Priorities
1. Subject lines (highest impact)
2. CTA button text and color
3. Send time
4. Personalization elements
5. Email length

### Accessibility Guidelines
- Minimum 4.5:1 contrast ratio for text
- Alt text for all images
- Semantic HTML structure
- 16px minimum font size for body text
- Clear, descriptive link text (not "click here")

### Deliverability Checklist
- SPF, DKIM, DMARC configured
- List hygiene (remove bounces monthly)
- Engagement-based segmentation
- Unsubscribe link in footer
- Physical address included

---

## Email Automation Flows

### Welcome Series Flow
```
Signup
  ↓
Welcome Email (immediate)
  ↓ (wait 1 day)
Getting Started Guide
  ↓ (wait 2 days)
First Week Check-in
  ↓ (wait 4 days)
Premium Upgrade Offer
  ↓ (wait 7 days)
Join Community Invitation
```

### Re-engagement Flow
```
14 days inactive
  ↓
"We miss you" email
  ↓ (wait 3 days, if no open)
Feature update highlight
  ↓ (wait 7 days, if still inactive)
Special win-back offer
  ↓ (wait 14 days, if still inactive)
Sunset sequence (reduce frequency)
```

---

*Version 1.0 | Last Updated: February 2026*
