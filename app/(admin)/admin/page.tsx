"use client";

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Dashboard</h1>
      <p style={{ color: "#9a9790", marginBottom: 32 }}>Overview of your practice.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        {[
          { label: "Active Clients", value: "—", sub: "Connect Convex to load" },
          { label: "Pending Contracts", value: "—", sub: "Connect Yousign to load" },
          { label: "Revenue (YTD)", value: "—", sub: "Connect Stripe to load" },
          { label: "Recent Activity", value: "—", sub: "No activity yet" },
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
    </div>
  );
}
