import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import ConvexClientProvider from "@/components/providers/ConvexProvider";
import { BGPattern } from "@/components/ui/bg-pattern";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Jeremy Lasne | Wealth Architecture",
  description: "Consulting patrimonial indépendant. Je conçois des architectures de capital personnalisées pour les particuliers qui veulent un système, pas juste des produits.",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Jeremy Lasne | Wealth Architecture",
    description: "Consulting patrimonial indépendant. Je conçois des architectures de capital personnalisées pour les particuliers qui veulent un système, pas juste des produits.",
    images: ["https://finance.jeremylasne.com/api/og"],
    type: "website",
    url: "https://finance.jeremylasne.com",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jeremylasne",
    creator: "@jeremylasne",
    title: "Jeremy Lasne | Wealth Architecture",
    description: "Consulting patrimonial indépendant. Un système, pas juste des produits.",
    images: ["https://finance.jeremylasne.com/api/og"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} relative`}>
        <BGPattern variant="dots" mask="fade-edges" size={28} fill="rgba(201,168,76,0.18)" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </div>
        <Script src="https://trustviews.io/script.js" data-token="33496d38-1c13-4673-9b96-a53285ba9f2f" strategy="afterInteractive" />
        <Script src="https://onedollarfeedback.com/script.js" data-token="f0yM4VSaqEuWFmlWsHNtNty8ME5YrZt6" strategy="lazyOnload" />
      </body>
    </html>
  );
}
