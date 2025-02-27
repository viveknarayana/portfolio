import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL("https://viveknarayana.com"),
  alternates: {
    canonical: "https://viveknarayana.com",
  },
  title: "Vivek Narayana - Dev",
  description:
    "Vivek Narayana is a full-stack developer",
  keywords:
    "Vivek Narayana",
  openGraph: {
    locale: "en_US",
    siteName: "Vivek Narayana",
    type: "website",
    title: "Vivek Narayana",
    description:
      "Vivek Narayana is a full-stack developer.",
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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
