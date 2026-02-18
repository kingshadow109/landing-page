import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
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

// GA Tracking ID - hardcoded for reliability
const GA_TRACKING_ID = "G-FSP1DKFFWV";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics 4 - Standard Implementation */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true
            });
            console.log('[GA4] Initialized with ID: ${GA_TRACKING_ID}');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
