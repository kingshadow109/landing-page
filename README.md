# LandingPage

A modern, responsive landing page with waitlist functionality built with Next.js 14+, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- ⚡ **Next.js 14+** - React framework with App Router
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🌙 **Dark Mode** - Automatic dark mode support with next-themes
- 📱 **Mobile Responsive** - Fully responsive design
- 📝 **Waitlist Form** - Email capture with validation using react-hook-form and Zod
- 🎯 **SEO Optimized** - Proper meta tags and Open Graph support
- 🔧 **TypeScript** - Type-safe development
- 🎭 **shadcn/ui** - Beautiful, accessible UI components

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Forms:** react-hook-form + Zod
- **Icons:** Lucide React
- **Theme:** next-themes

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd landing-page
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
landing-page/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles with Tailwind
│   │   ├── layout.tsx       # Root layout with metadata
│   │   └── page.tsx         # Main landing page
│   ├── components/
│   │   ├── features.tsx     # Feature highlights section
│   │   ├── footer.tsx       # Footer component
│   │   ├── hero.tsx         # Hero section with waitlist CTA
│   │   ├── theme-provider.tsx # Dark mode provider
│   │   ├── waitlist-form.tsx  # Email capture form
│   │   └── ui/              # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── label.tsx
│   ├── lib/
│   │   └── utils.ts         # Utility functions (cn helper)
│   └── types/
│       └── index.ts         # TypeScript type definitions
├── public/                  # Static assets
├── components.json          # shadcn/ui configuration
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Key Components

### Hero Section (`components/hero.tsx`)
- Eye-catching headline with gradient text
- Waitlist form integration
- Social proof statistics
- Animated scroll indicator

### Waitlist Form (`components/waitlist-form.tsx`)
- Email validation with Zod
- Loading states
- Success confirmation
- Accessible form elements

### Features Section (`components/features.tsx`)
- 6 feature cards with icons
- Hover effects
- Responsive grid layout

### Footer (`components/footer.tsx`)
- Brand section with social links
- Navigation links organized by category
- Legal links
- Copyright notice

## Customization

### Colors

The project uses a zinc color palette. You can customize colors in:
- `src/app/globals.css` - CSS variables for light/dark themes
- `tailwind.config.ts` - Tailwind theme configuration

### Content

Update the following files to customize content:
- `src/components/hero.tsx` - Hero headline, subtitle, stats
- `src/components/features.tsx` - Feature cards
- `src/components/footer.tsx` - Links and branding
- `src/app/layout.tsx` - Metadata (title, description, SEO)

### Form Handling

The waitlist form currently logs to console. To connect to a real backend:

1. Update the `onSubmit` function in `src/components/waitlist-form.tsx`
2. Replace the simulated API call with your actual endpoint:

```typescript
const onSubmit = async (data: WaitlistFormValues) => {
  setIsLoading(true);
  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setIsSubmitted(true);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setIsLoading(false);
  }
};
```

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using Vercel:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

Build the project and deploy the `dist` folder:

```bash
npm run build
```

For static export, update `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',
  distDir: 'dist',
}
module.exports = nextConfig
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Adding shadcn/ui Components

To add more components from shadcn/ui:

```bash
npx shadcn add <component-name>
```

Example:
```bash
npx shadcn add badge
npx shadcn add separator
```

## License

MIT License - feel free to use this template for your projects!

## Support

If you found this template helpful, please consider giving it a star ⭐
