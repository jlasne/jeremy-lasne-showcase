"use client";

export default function ContractsPage() {
  // TODO: useQuery(api.contracts.listByClient, { clientId }) when Convex is connected
  const contracts: Array<{ _id: string; title: string; status: string; createdAt: number; signedAt?: number }> = [];

  const statusColor: Record<string, string> = {
    draft: "#5a5750",
    sent: "#c9a84c",
    signed: "#4ade80",
    cancelled: "#ef4444",
  };

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Contracts</h1>
      <p style={{ color: "#9a9790", fontSize: 14, marginBottom: 32 }}>Your contracts and their signing status.</p>

      {contracts.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "60px 20px",
          background: "#1a1a1a", border: "1px solid #222", borderRadius: 12,
        }}>
          <div style={{ fontSize: 14, color: "#5a5750" }}>No contracts yet.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {contracts.map((contract) => (
            <div
              key={contract._id}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "16px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 10,
              }}
            >
              <div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{contract.title}</div>
                <div style={{ fontSize: 12, color: "#5a5750" }}>
                  Created {new Date(contract.createdAt).toLocaleDateString()}
                  {contract.signedAt && ` · Signed ${new Date(contract.signedAt).toLocaleDateString()}`}
                </div>
              </div>
              <span style={{
                padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                textTransform: "uppercase", letterSpacing: "0.05em",
                color: statusColor[contract.status] || "#5a5750",
                background: `${statusColor[contract.status] || "#5a5750"}15`,
              }}>
                {contract.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
