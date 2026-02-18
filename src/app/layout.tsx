import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "WearX - AI-Powered Fashion",
  description:
    "Join the waitlist for WearX. AI-curated fashion meets seamless shopping. Be the first to experience the future of style.",
  keywords: [
    "fashion",
    "AI fashion",
    "wearx",
    "style tech",
    "fashion app",
    "clothing",
    "accessories",
  ],
  authors: [{ name: "WearX Team" }],
  creator: "WearX",
  publisher: "WearX",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wearx.app",
    title: "WearX - AI-Powered Fashion",
    description:
      "Join the waitlist for WearX. AI-curated fashion meets seamless shopping. Be the first to experience the future of style.",
    siteName: "WearX",
  },
  twitter: {
    card: "summary_large_image",
    title: "WearX - AI-Powered Fashion",
    description:
      "Join the waitlist for WearX. AI-curated fashion meets seamless shopping. Be the first to experience the future of style.",
    creator: "@wearx",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Inject GA directly into head
              var gaScript = document.createElement('script');
              gaScript.async = true;
              gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-FSP1DKFFWV';
              document.head.appendChild(gaScript);
              
              // Initialize gtag immediately
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', 'G-FSP1DKFFWV');
              
              console.log('GA injected at:', new Date().toISOString());
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        
        <iframe 
          src="/ga-bridge.html" 
          style={{ position: 'absolute', width: 0, height: 0, border: 0 }}
          title="GA Bridge"
        />
      </body>
    </html>
  );
}
