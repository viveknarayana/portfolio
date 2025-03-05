import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import StarsBackground from "@/components/StarsBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://viveknarayana.com"),
  alternates: {
    canonical: "https://viveknarayana.com",
  },
  title: "Vivek Narayana - Dev",
  description:
    "Vivek Narayana is a developer.",
  keywords:
    "Vivek Narayana",
  openGraph: {
    locale: "en_US",
    siteName: "Vivek Narayana",
    type: "website",
    title: "Vivek Narayana",
    description:
      "Vivek Narayana is a full-stack dev.",
    url: "https://viveknarayana.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivek Narayana",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} relative`}>
        <StarsBackground />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0 relative z-10">
            {children}
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}