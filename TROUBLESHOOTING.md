# WearX Troubleshooting Guide

## Overview

This guide helps you diagnose and resolve common issues when developing, building, or deploying WearX.

---

## Development Issues

### Installation Problems

#### Error: `npm install` fails with EACCES

**Symptoms**:
```
npm ERR! code EACCES
npm ERR! syscall access
npm ERR! path /usr/local/lib/node_modules
```

**Solutions**:
```bash
# Option 1: Fix npm permissions
sudo chown -R $(whoami) ~/.npm

# Option 2: Use npx instead of global install
npx create-next-app@latest

# Option 3: Use Node Version Manager (recommended)
# Install nvm, then:
nvm install 20
nvm use 20
npm install
```

#### Error: `node_modules` corruption

**Symptoms**:
- Strange import errors
- Module not found for installed packages
- Build failures after package updates

**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

### Build Errors

#### Error: `Module not found: Can't resolve '@/components/...'`

**Symptoms**:
```
Module not found: Can't resolve '@/components/ui/button'
```

**Causes**:
- Path alias not configured
- File doesn't exist at that path
- Case sensitivity issue (Linux vs macOS/Windows)

**Solutions**:
1. Verify `tsconfig.json` paths:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

2. Check file exists and case matches:
```bash
# Linux is case-sensitive
ls src/components/ui/Button.tsx  # ❌ Wrong case
ls src/components/ui/button.tsx  # ✅ Correct case
```

3. Restart TypeScript server in VS Code:
   - Command Palette: `TypeScript: Restart TS Server`

#### Error: `Type error: Type 'X' is not assignable to type 'Y'`

**Common Causes**:
- Missing type definitions
- Incorrect prop types
- Type mismatch in API responses

**Solutions**:

1. Check for missing types:
```bash
npm install --save-dev @types/node @types/react
```

2. Use type assertions carefully:
```typescript
// ✅ Good - with validation
const data = await response.json();
if (isValidOutfit(data)) {
  return data as Outfit;
}

// ❌ Bad - blind assertion
const data = await response.json() as Outfit;
```

3. Add proper type guards:
```typescript
function isValidOutfit(data: unknown): data is Outfit {
  return (
    typeof data === 'object' &&
    data !== null &&
    'score' in data &&
    typeof (data as Outfit).score === 'number'
  );
}
```

#### Error: `Image optimization failed`

**Symptoms**:
```
Error: Image optimization failed
```

**Solution**:
Static exports require unoptimized images:

```typescript
// next.config.ts
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

---

### Runtime Errors

#### Error: `window is not defined`

**Symptoms**:
```
ReferenceError: window is not defined
```

**Cause**: Server-side rendering trying to access browser APIs

**Solution**:
```typescript
// ✅ Good - check for window
if (typeof window !== 'undefined') {
  localStorage.setItem('key', value);
}

// ✅ Good - use useEffect
import { useEffect } from 'react';

function Component() {
  useEffect(() => {
    // This only runs on client
    localStorage.setItem('key', value);
  }, []);
}

// ✅ Good - dynamic import with ssr: false
import dynamic from 'next/dynamic';

const ClientComponent = dynamic(
  () => import('../components/ClientComponent'),
  { ssr: false }
);
```

#### Error: `localStorage is not defined`

**Solution**:
```typescript
// lib/storage.ts
export function getStorageItem(key: string): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key);
}

export function setStorageItem(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, value);
}
```

#### Error: `Hydration failed`

**Symptoms**:
```
Warning: Text content did not match. Server: "X" Client: "Y"
```

**Causes**:
- Date/time rendering differences
- Random values rendered differently
- localStorage-dependent content

**Solutions**:

1. Use `useEffect` for client-only content:
```typescript
function Component() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div>Loading...</div>;
  }
  
  return <div>{localStorage.getItem('data')}</div>;
}
```

2. Use `suppressHydrationWarning` for unavoidable differences:
```tsx
<time suppressHydrationWarning>
  {new Date().toLocaleString()}
</time>
```

---

## API Issues

### Gemini API Errors

#### Error: `API key not valid`

**Symptoms**:
```json
{
  "error": {
    "code": 400,
    "message": "API key not valid",
    "status": "INVALID_ARGUMENT"
  }
}
```

**Solutions**:
1. Verify `GOOGLE_API_KEY` is set in `.env.local`
2. Check API key is valid at [Google AI Studio](https://aistudio.google.com/)
3. Ensure key has access to Gemini API
4. Restart dev server after adding env var

#### Error: `Quota exceeded`

**Symptoms**:
```
429 Too Many Requests
```

**Solutions**:
- Implement rate limiting in your app
- Add request caching
- Upgrade to paid tier if needed
- Use mock data for development:
```typescript
if (!GEMINI_API_KEY || process.env.NODE_ENV === 'development') {
  return getMockAnalysis();
}
```

### OpenWeatherMap API Errors

#### Error: `Invalid API key`

**Solutions**:
1. Sign up at [openweathermap.org](https://openweathermap.org/)
2. Generate API key (takes up to 2 hours to activate)
3. Set `NEXT_PUBLIC_OPENWEATHER_API_KEY` in `.env.local`
4. Note: Free tier limited to 1000 calls/day

#### Error: `City not found`

**Solution**:
```typescript
// Add error handling
try {
  const weather = await getWeatherByCity(city);
} catch (error) {
  if (error.message.includes('404')) {
    return { error: 'City not found. Please check spelling.' };
  }
}
```

### Loops.so API Errors

#### Error: `Failed to add to waitlist`

**Solutions**:
1. Verify `LOOPS_API_KEY` is set
2. Check API key permissions in Loops dashboard
3. Verify email format is valid
4. Check network connectivity

---

## Deployment Issues

### Vercel Deployment

#### Error: `Build failed`

**Check build logs**:
```bash
# Run build locally first
npm run build
```

**Common fixes**:
1. Environment variables not set:
   - Go to Project Settings > Environment Variables
   - Add all required variables
   - Redeploy

2. Node version mismatch:
   - Add to `package.json`:
   ```json
   {
     "engines": {
       "node": ">=20.0.0"
     }
   }
   ```

#### Error: `404 on routes`

**Cause**: Static export requires SPA routing configuration

**Solution**:
Vercel handles this automatically for Next.js projects.

For other platforms, add `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Netlify Deployment

#### Error: `Page not found` on refresh

**Solution**:
Create `public/_redirects`:
```
/*    /index.html   200
```

Or add to `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### GitHub Pages

#### Error: `Resource not found` (CSS/JS 404)

**Cause**: Missing basePath configuration

**Solution**:
```typescript
// next.config.ts
const nextConfig = {
  output: 'export',
  basePath: '/your-repo-name',
  assetPrefix: '/your-repo-name/',
};
```

#### Error: `GitHub Actions failed`

**Check**:
1. Repository has Pages enabled in Settings
2. Workflow has correct permissions:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

3. Environment variables are set as repository secrets

---

## Styling Issues

### Tailwind CSS

#### Error: `Styles not applying`

**Solutions**:
1. Check Tailwind is configured:
```javascript
// tailwind.config.ts
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  // ...
};
```

2. Verify CSS import:
```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Restart dev server

#### Error: `Dark mode not working`

**Solution**:
```typescript
// layout.tsx
import { ThemeProvider } from '@/components/theme-provider';

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## Performance Issues

### Slow Build Times

**Solutions**:
```bash
# Use Turbopack (Next.js dev)
npm run dev -- --turbo

# Analyze bundle size
npm run build -- --analyze
```

### Large Bundle Size

**Solutions**:
1. Use dynamic imports:
```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'));
```

2. Tree-shake imports:
```typescript
// ✅ Good
import { Button } from '@/components/ui/button';

// ❌ Bad - imports entire library
import * as Components from '@/components/ui';
```

3. Optimize images:
```typescript
// Use appropriate sizes
<Image 
  src="/large-image.jpg" 
  width={800} 
  height={600}
  alt="Description"
/>
```

---

## Browser Issues

### LocalStorage Quota Exceeded

**Symptoms**:
```
QuotaExceededError: The quota has been exceeded
```

**Solutions**:
```typescript
// Add size checking
function canStore(key: string, value: string): boolean {
  const size = new Blob([value]).size;
  const maxSize = 5 * 1024 * 1024; // 5MB
  return size < maxSize;
}

// Implement cleanup
function cleanupOldData(): void {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('wearx-')) {
      const item = localStorage.getItem(key);
      const data = JSON.parse(item || '{}');
      // Remove if older than 30 days
      if (data.timestamp && Date.now() - data.timestamp > 30 * 24 * 60 * 60 * 1000) {
        localStorage.removeItem(key);
      }
    }
  });
}
```

### CORS Errors

**Symptoms**:
```
Access to fetch at 'https://api.example.com' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solutions**:
1. Use Next.js API routes as proxy:
```typescript
// app/api/proxy/route.ts
export async function GET(request: Request) {
  const response = await fetch('https://external-api.com/data');
  return NextResponse.json(await response.json());
}
```

2. Configure CORS in next.config.ts (for API routes):
```typescript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
      ],
    },
  ];
}
```

---

## Debugging Tips

### Enable Debug Logging

```typescript
// lib/debug.ts
const DEBUG = process.env.NODE_ENV === 'development';

export function debug(...args: any[]) {
  if (DEBUG) {
    console.log('[WearX Debug]', ...args);
  }
}

// Usage
debug('Generating outfits for:', { occasion, season });
```

### React DevTools

1. Install React DevTools browser extension
2. Use Components tab to inspect props/state
3. Use Profiler tab to identify performance issues

### Network Debugging

```typescript
// Add request logging
fetch(url, options)
  .then(response => {
    console.log(`[API] ${options.method || 'GET'} ${url}: ${response.status}`);
    return response;
  });
```

---

## Getting Help

If you can't resolve an issue:

1. **Check documentation**:
   - [API Documentation](./API_DOCUMENTATION.md)
   - [Architecture](./ARCHITECTURE.md)
   - [Deployment Guide](./DEPLOYMENT_GUIDE.md)

2. **Search issues**:
   - GitHub Issues (open and closed)
   - Stack Overflow with `wearx` tag

3. **Ask for help**:
   - GitHub Discussions
   - Discord community
   - Include:
     - Error message
     - Steps to reproduce
     - Environment details (OS, Node version, browser)
     - Relevant code snippets

---

## Common Error Quick Reference

| Error | Likely Cause | Quick Fix |
|-------|--------------|-----------|
| `window is not defined` | SSR accessing browser API | Use `useEffect` or dynamic import |
| `module not found` | Path alias or file missing | Check tsconfig paths and file existence |
| ` hydration failed` | Client/server mismatch | Use `useEffect` for client-only data |
| `API key not valid` | Missing/wrong env var | Check `.env.local` and restart server |
| `404 on refresh` | SPA routing not configured | Add catch-all redirect |
| `QuotaExceededError` | localStorage full | Implement cleanup or use IndexedDB |
| `Type 'X' not assignable` | Type mismatch | Check interfaces and add type guards |

---

## Related Documentation

- [API Documentation](./API_DOCUMENTATION.md)
- [Architecture](./ARCHITECTURE.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Contributing Guide](./CONTRIBUTING.md)
