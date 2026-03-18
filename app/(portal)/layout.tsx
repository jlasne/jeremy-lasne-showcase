"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useConvexAuth, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";

type Lang = "en" | "fr";
const t = (lang: Lang, en: string, fr: string) => lang === "en" ? en : fr;

const navItems = (lang: Lang) => [
  { href: "/app", label: t(lang, "Meetings", "Rendez-vous"), icon: "📅" },
  { href: "/app/documents", label: t(lang, "Documents", "Documents"), icon: "📄" },
  { href: "/app/payments", label: t(lang, "Payments", "Paiements"), icon: "💳" },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const user = useQuery(api.users.currentUser);
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portal-lang") as Lang;
      if (saved) setLang(saved);
    } catch {}
  }, []);

  const changeLang = (l: Lang) => {
    setLang(l);
    try { localStorage.setItem("portal-lang", l); } catch {}
  };

  // Wait for auth to settle — OAuth code exchange may still be in progress
  const [authSettled, setAuthSettled] = useState(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isLoading) {
      setAuthSettled(false);
      return;
    }
    if (isAuthenticated) {
      setAuthSettled(true);
      return;
    }
    // Give OAuth code exchange 2s to complete before redirecting
    settleTimer.current = setTimeout(() => setAuthSettled(true), 2000);
    return () => { if (settleTimer.current) clearTimeout(settleTimer.current); };
  }, [isLoading, isAuthenticated]);

  if (isLoading || (!isAuthenticated && !authSettled)) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#5a5750" }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    if (typeof window !== "undefined") {
      router.replace("/sign-in");
    }
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#5a5750" }}>
        Redirecting...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", color: "#e8e6e1" }}>
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 24px", borderBottom: "1px solid #222",
        background: "rgba(14,14,14,0.95)", backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 50, flexWrap: "wrap", gap: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Link href="/" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#c9a84c", textDecoration: "none" }}>
            JL
          </Link>
          <div style={{ display: "flex", gap: 2 }}>
            {navItems(lang).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: "6px 12px", borderRadius: 6, textDecoration: "none",
                    fontSize: 13, fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#c9a84c" : "#9a9790",
                    background: isActive ? "rgba(201,168,76,0.08)" : "transparent",
                    transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6,
                  }}
                >
                  <span style={{ fontSize: 14 }}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", borderRadius: 4, overflow: "hidden", border: "1px solid #333", fontSize: 11 }}>
            <button onClick={() => changeLang("en")} style={{
              padding: "3px 8px", background: lang === "en" ? "#c9a84c" : "transparent", border: "none",
              color: lang === "en" ? "#0e0e0e" : "#5a5750", cursor: "pointer", fontFamily: "inherit", fontSize: 11, fontWeight: 600,
            }}>EN</button>
            <button onClick={() => changeLang("fr")} style={{
              padding: "3px 8px", background: lang === "fr" ? "#c9a84c" : "transparent", border: "none",
              color: lang === "fr" ? "#0e0e0e" : "#5a5750", cursor: "pointer", fontFamily: "inherit", fontSize: 11, fontWeight: 600,
            }}>FR</button>
          </div>
          {user?.role === "admin" && (
            <Link href="/admin" style={{ fontSize: 11, color: "#c9a84c", textDecoration: "none", padding: "3px 8px", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 4 }}>
              Admin
            </Link>
          )}
          <span style={{ fontSize: 12, color: "#9a9790" }}>{user?.firstName || user?.email || "..."}</span>
          <button
            onClick={() => signOut()}
            style={{ fontSize: 11, color: "#5a5750", background: "none", border: "none", cursor: "pointer" }}
          >
            {t(lang, "Sign out", "Déconnexion")}
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>
        {/* Advisor card */}
        <div style={{
          display: "flex", alignItems: "center", gap: 14, padding: "16px 20px",
          background: "#1a1a1a", border: "1px solid #222", borderRadius: 10, marginBottom: 28,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
            border: "2px solid rgba(201,168,76,0.3)",
          }}>
            <img src="/images/jeremy-profile.png" alt="Jeremy Lasne" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Jérémy Lasne</div>
            <div style={{ fontSize: 12, color: "#9a9790" }}>{t(lang, "Your Wealth Architect", "Votre Architecte Patrimonial")}</div>
          </div>
          <a href="mailto:hey@jeremylasne.com" style={{ fontSize: 12, color: "#c9a84c", textDecoration: "none" }}>
            hey@jeremylasne.com
          </a>
        </div>

        {children}
      </main>

      <footer style={{ padding: "16px 24px", borderTop: "1px solid #1a1a1a", textAlign: "center" }}>
        <Link href="/" style={{ fontSize: 11, color: "#5a5750", textDecoration: "none" }}>
          {t(lang, "Back to site", "Retour au site")} · jeremylasne.com
        </Link>
      </footer>
    </div>
  );
}
