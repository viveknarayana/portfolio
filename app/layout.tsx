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
    images: [
      {
        url: "/main.png",
        width: 1200,
        height: 630,
        alt: "Vivek Narayana Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivek Narayana",
    images: ["/main.png"],
  },
};

import PageWrapper from "@/components/PageWrapper";

// import { LandingProvider } from "@/context/LandingContext";

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
          {/* <LandingProvider> */}
          <PageWrapper>
            {children}
          </PageWrapper>
          {/* </LandingProvider> */}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}