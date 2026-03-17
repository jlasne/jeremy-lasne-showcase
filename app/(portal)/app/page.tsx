"use client";

export default function ClientDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Welcome</h1>
      <p style={{ color: "#9a9790", marginBottom: 32 }}>Your wealth architecture portal.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
        <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: "24px 20px" }}>
          <div style={{ fontSize: 12, color: "#5a5750", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
            Next Session
          </div>
          <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>No session scheduled</div>
          <div style={{ fontSize: 13, color: "#5a5750" }}>Your advisor will reach out to schedule.</div>
        </div>

        <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: "24px 20px" }}>
          <div style={{ fontSize: 12, color: "#5a5750", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
            Recent Documents
          </div>
          <div style={{ fontSize: 14, color: "#5a5750" }}>No documents yet.</div>
        </div>

        <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: "24px 20px" }}>
          <div style={{ fontSize: 12, color: "#5a5750", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
            Contract Status
          </div>
          <div style={{ fontSize: 14, color: "#5a5750" }}>No active contracts.</div>
        </div>
      </div>
    </div>
  );
}
