import AuthProvider from "~/components/auth-provider";
import { ThemeProvider } from "~/components/theme-provider";
import type { Metadata, Viewport } from "next";

import "~/styles/globals.css";

import { Inter } from "next/font/google";

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

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`m-0 min-h-screen p-0 ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="m-0 min-h-screen bg-background p-0 antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          enableColorScheme={true}
          disableTransitionOnChange={true}
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
