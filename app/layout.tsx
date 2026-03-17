import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Jeremy Lasne",
  description: "Jeremy LASNE's portfolio",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Jeremy Lasne",
    description: "Jeremy LASNE's portfolio",
    images: ["/favicon.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jeremylasne",
    creator: "@jeremylasne",
    title: "Jeremy Lasne",
    description: "Jeremy LASNE's portfolio",
    images: ["/favicon.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
          <Script src="https://trustviews.io/script.js" data-token="33496d38-1c13-4673-9b96-a53285ba9f2f" strategy="afterInteractive" />
          <Script src="https://onedollarfeedback.com/script.js" data-token="f0yM4VSaqEuWFmlWsHNtNty8ME5YrZt6" strategy="lazyOnload" />
        </body>
      </html>
    </ClerkProvider>
  );
}
