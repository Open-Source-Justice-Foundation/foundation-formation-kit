import AuthProvider from "~/components/auth-provider";
import type { Metadata, Viewport } from "next";

import "~/styles/globals.css";

import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://foundationformationkit.org"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "x-default": "/",
    },
  },
  title: {
    template: "%s | Foundation Formation Kit by the OSJF ⚖️",
    default: "Foundation Formation Kit",
  },
  description:
    "Foundation Formation Kit by the Open Source Justice Foundation ⚖️",
  authors: [
    {
      name: "Open Source Justice Foundation",
      url: "https://opensourcejustice.org",
    },
  ],
  creator: "Open Source Justice Foundation",
  publisher: "Open Source Justice Foundation",
  openGraph: {
    locale: "en_US",
    type: "website",
    url: "/",
    siteName: "Foundation Formation Kit",
  },
  twitter: {
    card: "summary_large_image",
    site: "@OSJF_org",
    creator: "@OSJF_org",
  },
  appleWebApp: {
    title: "FFK",
    statusBarStyle: "default",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`overflow-x-hidden bg-secondary antialiased sm:bg-background ${geistSans.variable} ${geistMono.variable}`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
