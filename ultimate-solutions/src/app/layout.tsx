import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ultimate Solutions | Digital Agency",
  description:
    "Ultimate Solutions is a tech-driven digital agency providing design, development, video editing, and project/event management services.",
  icons: [
    { rel: "icon", url: "/purple-logo.png", media: "(prefers-color-scheme: light)" },
    { rel: "icon", url: "/white-logo.png", media: "(prefers-color-scheme: dark)" },
    { rel: "apple-touch-icon", url: "/purple-logo.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,600,700,900&display=swap"
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-background text-foreground font-sans"
        suppressHydrationWarning
      >
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
