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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FSP1DKFFWV"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FSP1DKFFWV');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
