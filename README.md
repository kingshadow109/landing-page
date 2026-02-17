# Landing Page with Waitlist

A modern, responsive landing page built with Next.js, TypeScript, and Tailwind CSS. Features a waitlist signup form, dark mode support, and is optimized for Vercel deployment.

## 🚀 Quick Start

```bash
# Navigate to project
cd /root/.openclaw/workspace/projects/landing-page

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
landing-page/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout with metadata
│   │   └── page.tsx         # Main landing page
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   └── input.tsx
│   │   ├── hero.tsx         # Hero section with waitlist CTA
│   │   ├── features.tsx     # Feature highlights
│   │   └── footer.tsx       # Footer component
│   └── lib/
│       └── utils.ts         # Utility functions (cn helper)
├── public/                  # Static assets
├── AI_PROVIDERS_SETUP.md    # AI provider free tier guide
├── DEPLOYMENT.md            # Vercel deployment guide
├── next.config.ts           # Next.js configuration
└── package.json
```

## 🎨 Features

- ✅ Modern, responsive design
- ✅ Waitlist email capture form
- ✅ Dark mode support
- ✅ SEO-optimized meta tags
- ✅ Mobile-first approach
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ shadcn/ui components

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod (ready)

## 📚 Documentation

- **[AI_PROVIDERS_SETUP.md](./AI_PROVIDERS_SETUP.md)** - Guide to signing up for free AI API tiers
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete Vercel deployment guide

## 🚢 Deployment

### Option 1: Vercel (Recommended)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Auto-deploy on every push

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Option 2: Static Export

```bash
npm run build
# Output in ./dist folder
```

## 🔧 Customization

### Update Branding

1. Edit `src/app/layout.tsx` - Update metadata
2. Edit `src/components/hero.tsx` - Update headline and CTA
3. Edit `src/components/footer.tsx` - Update logo and links

### Connect Waitlist Backend

The waitlist form currently simulates success. To connect a real backend:

1. Choose a backend (Vercel KV, Supabase, or Notion)
2. Create API route at `src/app/api/waitlist/route.ts`
3. Update `handleSubmit` in `src/components/hero.tsx`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for backend options.

## 📝 Environment Variables

Create `.env.local` for local development:

```bash
# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Optional: Waitlist backend
# DATABASE_URL=your_database_url
# RESEND_API_KEY=your_resend_key
```

## 🆓 Free Tier Resources

| Service | Free Tier | Use Case |
|---------|-----------|----------|
| Vercel | 100GB/mo bandwidth | Hosting |
| Groq | 1,440 req/day | AI/LLM |
| Google AI Studio | 1,500 req/day | AI/LLM |
| Resend | 3,000 emails/mo | Email notifications |
| Supabase | 500MB database | Database |

See [AI_PROVIDERS_SETUP.md](./AI_PROVIDERS_SETUP.md) for full details.

## 🐛 Troubleshooting

**Build fails:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port already in use:**
```bash
npm run dev -- --port 3001
```

## 📄 License

MIT - Feel free to use for your own projects.

---

Built with ❤️ by 169x
