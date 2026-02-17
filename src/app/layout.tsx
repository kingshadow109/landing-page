import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Product - Coming Soon",
  description: "Join the waitlist for early access to the future of AI-powered development.",
  keywords: ["AI", "development", "waitlist", "startup"],
  authors: [{ name: "Your Company" }],
  openGraph: {
    title: "Your Product - Coming Soon",
    description: "Join the waitlist for early access to the future of AI-powered development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
