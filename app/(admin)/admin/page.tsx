"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default function AdminDashboard() {
  const clients = useQuery(api.users.listClients);
  const recentActivity = useQuery(api.activityLog.listRecent, { limit: 10 });
  const allContracts = useQuery(api.contracts.listAll);
  const allPayments = useQuery(api.payments.listAll);

  const pendingContracts = allContracts?.filter((c) => c.status === "sent") ?? [];
  const completedPayments = allPayments?.filter((p) => p.status === "completed") ?? [];
  const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Dashboard</h1>
      <p style={{ color: "#9a9790", marginBottom: 32 }}>Overview of your practice.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
        {[
          { label: "Active Clients", value: clients?.length ?? "...", sub: clients ? `${clients.length} total` : "Loading..." },
          { label: "Pending Contracts", value: pendingContracts.length, sub: `${allContracts?.length ?? 0} total contracts` },
          { label: "Revenue (YTD)", value: totalRevenue ? new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(totalRevenue / 100) : "€0", sub: `${completedPayments.length} payments` },
          { label: "Activity", value: recentActivity?.length ?? "...", sub: "Recent events" },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              background: "#1a1a1a", border: "1px solid #222", borderRadius: 12,
              padding: "24px 20px",
            }}
          >
            <div style={{ fontSize: 12, color: "#5a5750", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
              {card.label}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#e8e6e1", marginBottom: 4 }}>
              {card.value}
            </div>
            <div style={{ fontSize: 12, color: "#5a5750" }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Recent Activity</h2>
      <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, overflow: "hidden" }}>
        {!recentActivity || recentActivity.length === 0 ? (
          <div style={{ padding: "40px 20px", textAlign: "center", color: "#5a5750", fontSize: 14 }}>
            No activity yet. Activity will appear here when you or clients take actions.
          </div>
        ) : (
          recentActivity.map((event) => (
            <div key={event._id} style={{ padding: "12px 20px", borderBottom: "1px solid #222", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{event.action}</div>
                {event.details && <div style={{ fontSize: 12, color: "#5a5750" }}>{event.details}</div>}
              </div>
              <div style={{ fontSize: 12, color: "#5a5750" }}>
                {new Date(event.createdAt).toLocaleString("fr-FR")}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
        <Link href="/admin/clients" style={{
          padding: "10px 20px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)",
          borderRadius: 8, color: "#c9a84c", fontSize: 13, fontWeight: 500, textDecoration: "none",
        }}>
          View Clients
        </Link>
        <Link href="/admin/contracts/new" style={{
          padding: "10px 20px", background: "linear-gradient(135deg, #c9a84c, #d4b85a)",
          border: "none", borderRadius: 8, color: "#0e0e0e", fontSize: 13, fontWeight: 600, textDecoration: "none",
        }}>
          + New Contract
        </Link>
      </div>
    </div>
  );
}
