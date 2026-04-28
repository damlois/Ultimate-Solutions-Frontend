import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

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
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
