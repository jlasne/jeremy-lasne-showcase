"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useConvexAuth, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";

const navItems = [
  { href: "/app", label: "Dashboard" },
  { href: "/app/documents", label: "Documents" },
  { href: "/app/contracts", label: "Contracts" },
  { href: "/app/payments", label: "Payments" },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const user = useQuery(api.users.currentUser);

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0e0e0e", display: "flex", alignItems: "center", justifyContent: "center", color: "#5a5750" }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0e0e0e", color: "#e8e6e1" }}>
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 32px", borderBottom: "1px solid #222",
        background: "rgba(14,14,14,0.95)", backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <Link href="/" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#c9a84c", textDecoration: "none" }}>
            JL
          </Link>
          <div style={{ display: "flex", gap: 4 }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: "6px 14px", borderRadius: 6, textDecoration: "none",
                    fontSize: 13, fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#c9a84c" : "#9a9790",
                    background: isActive ? "rgba(201,168,76,0.08)" : "transparent",
                    transition: "all 0.2s",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {user?.role === "admin" && (
            <Link href="/admin" style={{ fontSize: 12, color: "#c9a84c", textDecoration: "none", padding: "4px 10px", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 4 }}>
              Admin
            </Link>
          )}
          <span style={{ fontSize: 13, color: "#9a9790" }}>{user?.firstName || user?.email || "..."}</span>
          <button
            onClick={() => signOut()}
            style={{ fontSize: 12, color: "#5a5750", background: "none", border: "none", cursor: "pointer" }}
          >
            Sign out
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px" }}>
        {children}
      </main>
    </div>
  );
}
