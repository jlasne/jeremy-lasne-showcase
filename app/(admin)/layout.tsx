"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useConvexAuth, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "~" },
  { href: "/admin/clients", label: "Clients", icon: "~" },
  { href: "/admin/new", label: "New Document", icon: "+" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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

  if (user !== undefined && user !== null && user.role !== "admin") {
    router.push("/app");
    return null;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0e0e0e", color: "#e8e6e1" }}>
      <aside style={{
        width: 240, borderRight: "1px solid #222", padding: "24px 16px",
        display: "flex", flexDirection: "column", gap: 4, flexShrink: 0,
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 24, paddingLeft: 12 }}>
          Admin Panel
        </div>

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 8, textDecoration: "none",
                fontSize: 14, fontWeight: isActive ? 600 : 400,
                color: isActive ? "#c9a84c" : "#9a9790",
                background: isActive ? "rgba(201,168,76,0.08)" : "transparent",
                transition: "all 0.2s",
              }}
            >
              <span style={{ width: 20, textAlign: "center" }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}

        <div style={{ marginTop: "auto", paddingTop: 24, borderTop: "1px solid #222" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #c9a84c, #d4b85a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#0e0e0e" }}>
              {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || "?"}
            </div>
            <span style={{ fontSize: 13, color: "#9a9790" }}>{user?.firstName || user?.email || "..."}</span>
          </div>
          <button
            onClick={() => signOut()}
            style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", fontSize: 13, color: "#5a5750", background: "none", border: "none", cursor: "pointer" }}
          >
            Sign out
          </button>
          <Link href="/" style={{ display: "block", padding: "8px 12px", fontSize: 13, color: "#5a5750", textDecoration: "none" }}>
            Back to site
          </Link>
        </div>
      </aside>

      <main style={{ flex: 1, padding: "32px 40px", overflow: "auto" }}>
        {children}
      </main>
    </div>
  );
}
