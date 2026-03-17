"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function ClientProfilePage() {
  const { clientId } = useParams();

  // TODO: Replace with useQuery(api.users.getById, { id: clientId }) when Convex is connected

  return (
    <div>
      <Link href="/admin/clients" style={{ fontSize: 13, color: "#5a5750", textDecoration: "none", marginBottom: 16, display: "inline-block" }}>
        &larr; Back to clients
      </Link>

      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Client Profile</h1>
      <p style={{ color: "#5a5750", fontSize: 13, marginBottom: 32 }}>ID: {clientId}</p>

      {/* Tabs placeholder */}
      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid #222", marginBottom: 24 }}>
        {["Info", "Contracts", "Documents", "Payments"].map((tab, i) => (
          <button
            key={tab}
            style={{
              padding: "10px 20px", background: "none", border: "none",
              borderBottom: i === 0 ? "2px solid #c9a84c" : "2px solid transparent",
              color: i === 0 ? "#c9a84c" : "#5a5750",
              fontSize: 14, fontWeight: 500, cursor: "pointer",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{
        textAlign: "center", padding: "60px 20px",
        background: "#1a1a1a", border: "1px solid #222", borderRadius: 12,
      }}>
        <div style={{ fontSize: 14, color: "#5a5750" }}>
          Connect Convex to load client data.
        </div>
      </div>
    </div>
  );
}
