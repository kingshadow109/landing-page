# WearX Deployment Guide

## Overview

This guide covers deploying WearX to various hosting platforms. WearX is built as a static site export, making it compatible with most static hosting providers.

## Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Git

## Environment Variables

Create a `.env.local` file in the project root:

```bash
# Required for image analysis (optional - falls back to mock data)
GOOGLE_API_KEY=your_gemini_api_key

# Required for waitlist functionality (optional)
LOOPS_API_KEY=your_loops_api_key

# Required for weather features (optional)
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
```

### Getting API Keys

#### Google Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create a new project
3. Generate an API key
4. Copy the key to `GOOGLE_API_KEY`

#### Loops.so API Key
1. Sign up at [Loops.so](https://loops.so/)
2. Go to Settings > API
3. Generate an API key
4. Copy the key to `LOOPS_API_KEY`

#### OpenWeatherMap API Key
1. Sign up at [OpenWeatherMap](https://openweathermap.org/)
2. Go to API keys
3. Generate a new key
4. Copy the key to `NEXT_PUBLIC_OPENWEATHER_API_KEY`

---

## Local Development

### 1. Clone the Repository

```bash
git clone <repository-url>
cd projects/landing-page
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### 4. Build for Production

```bash
npm run build
```

This creates a static export in the `dist/` directory.

---

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the creators of Next.js and offers the best integration.

#### Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Using Vercel Dashboard

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure environment variables in Settings
6. Deploy

**Configuration**:
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

### Option 2: Netlify

#### Using Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

#### Using Netlify Dashboard

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site" > "Import an existing project"
4. Connect to GitHub
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables in Site settings
7. Deploy

---

### Option 3: GitHub Pages

#### Setup

1. Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  basePath: '/your-repo-name', // Add this for GitHub Pages
  assetPrefix: '/your-repo-name/',
};

export default nextConfig;
```

2. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          GOOGLE_API_KEY: ${{ secrets.GOOGLE_API_KEY }}
          LOOPS_API_KEY: ${{ secrets.LOOPS_API_KEY }}
          NEXT_PUBLIC_OPENWEATHER_API_KEY: ${{ secrets.NEXT_PUBLIC_OPENWEATHER_API_KEY }}
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. Enable GitHub Pages in repository settings
4. Push to main branch

---

### Option 4: Cloudflare Pages

1. Push your code to GitHub
2. Visit [dash.cloudflare.com](https://dash.cloudflare.com)
3. Go to Pages > Create a project
4. Connect to GitHub
5. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Add environment variables
7. Deploy

---

### Option 5: AWS S3 + CloudFront

#### Using AWS CLI

```bash
# Build the project
npm run build

# Create S3 bucket
aws s3 mb s3://your-bucket-name

# Configure bucket for static hosting
aws s3 website s3://your-bucket-name --index-document index.html --error-document index.html

# Upload files
aws s3 sync dist/ s3://your-bucket-name --delete

# Set bucket policy for public read
aws s3api put-bucket-policy --bucket your-bucket-name --policy file://policy.json
```

**policy.json**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

#### CloudFront Distribution

1. Create a CloudFront distribution
2. Set origin to your S3 bucket
3. Configure default root object: `index.html`
4. Set error pages to return `index.html` with 200 status (for SPA routing)

---

### Option 6: Docker Deployment

#### Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Build and Run

```bash
# Build Docker image
docker build -t wearx:latest .

# Run container
docker run -p 3000:80 wearx:latest
```

---

## Post-Deployment Checklist

### Functionality Testing

- [ ] Landing page loads correctly
- [ ] Style DNA quiz works
- [ ] Wardrobe uploader functions
- [ ] Outfit recommendations generate
- [ ] Weather widget displays (if API key configured)
- [ ] Waitlist signup works (if API key configured)
- [ ] Image analysis works (if API key configured)
- [ ] Dark/light mode toggle works
- [ ] All navigation links work

### Performance Checks

- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] No console errors

### SEO Verification

- [ ] Meta tags present
- [ ] Open Graph tags work
- [ ] Twitter Card tags work
- [ ] Sitemap accessible
- [ ] Robots.txt configured

---

## Environment-Specific Configuration

### Development

```bash
# .env.local
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
```

### Staging

```bash
# .env.staging
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://staging-api.wearx.app
```

### Production

```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.wearx.app
NEXT_TELEMETRY_DISABLED=1
```

---

## Troubleshooting

### Build Failures

**Error**: `Module not found`
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error**: `TypeScript compilation failed`
```bash
# Check TypeScript version
npx tsc --version

# Run type check separately
npx tsc --noEmit
```

### Runtime Issues

**Issue**: API calls fail in production
- Verify environment variables are set in hosting platform
- Check CORS settings for external APIs
- Confirm API keys are valid

**Issue**: Images don't load
- Verify `images.unoptimized: true` in `next.config.ts`
- Check image paths are correct for basePath

**Issue**: Routing doesn't work (404s)
- Ensure hosting is configured for SPA routing
- All routes should serve `index.html`

---

## Security Considerations

### Environment Variables

- Never commit `.env.local` to git
- Use different API keys for production
- Rotate keys regularly
- Monitor API usage for abuse

### HTTPS

- Always use HTTPS in production
- Enable HSTS headers
- Use secure cookies when authentication is added

### Content Security Policy

Add to `next.config.ts`:

```typescript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.openweathermap.org https://generativelanguage.googleapis.com https://app.loops.so;"
        }
      ]
    }
  ];
}
```

---

## Monitoring

### Recommended Tools

- **Vercel Analytics**: Built-in for Vercel deployments
- **Google Analytics**: Add tracking ID to `lib/analytics.ts`
- **Sentry**: Error tracking (future implementation)

### Health Checks

Create a simple health check endpoint:

```typescript
// src/app/api/health/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "0.1.0"
  });
}
```

---

## Rollback Procedure

### Vercel

1. Go to Project Settings > Deployments
2. Find the previous working deployment
3. Click "..." > "Promote to Production"

### Netlify

1. Go to Deploys
2. Find the previous working deploy
3. Click "Publish deploy"

### GitHub Pages

```bash
# Revert to previous commit
git revert HEAD
git push origin main
```

---

## Related Documentation

- [API Documentation](./API_DOCUMENTATION.md)
- [Architecture](./ARCHITECTURE.md)
- [Database Schema](./DATABASE_SCHEMA.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Troubleshooting](./TROUBLESHOOTING.md)
