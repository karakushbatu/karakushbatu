import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com/'),
  title: "Batuhan Karakuş ✌️",
  description: "A computer engineer by profession, a builder at heart.",
  keywords: "Batuhan Karakuş, Batu Karakuş, Computer Engineer, AI Engineer, Machine Learning, Full Stack Developer, React, Next.js, Three.js, Embedded Systems, ARINC 653, FreeRTOS, Portfolio, İTÜ",
  authors: [{ name: "Batuhan Karakuş" }],
  creator: "Batuhan Karakuş",
  publisher: "Batuhan Karakuş",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Batuhan Karakuş - Computer Engineer",
    description: "A computer engineer by profession, a builder at heart.",
    siteName: "Batuhan Karakuş's Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Batuhan Karakuş - Computer Engineer",
    description: "A computer engineer by profession, a builder at heart.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-y-none">
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
    </html>
  );
}
