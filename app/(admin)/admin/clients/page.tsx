"use client";

import Link from "next/link";

export default function ClientsPage() {
  // TODO: Replace with useQuery(api.users.listClients) when Convex is connected
  const clients: Array<{ _id: string; firstName?: string; lastName?: string; email: string; createdAt: number }> = [];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>Clients</h1>
          <p style={{ color: "#9a9790", fontSize: 14 }}>{clients.length} clients</p>
        </div>
        <button
          style={{
            padding: "10px 20px", background: "linear-gradient(135deg, #c9a84c, #d4b85a)",
            color: "#0e0e0e", border: "none", borderRadius: 8, fontSize: 13,
            fontWeight: 600, cursor: "pointer",
          }}
        >
          + Invite Client
        </button>
      </div>

      {clients.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "60px 20px",
          background: "#1a1a1a", border: "1px solid #222", borderRadius: 12,
        }}>
          <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.3 }}>~</div>
          <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>No clients yet</div>
          <div style={{ fontSize: 14, color: "#5a5750" }}>
            Connect Convex and invite your first client to get started.
          </div>
        </div>
      ) : (
        <div style={{ border: "1px solid #222", borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #222" }}>
                {["Name", "Email", "Joined", ""].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, fontWeight: 600, color: "#5a5750", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id} style={{ borderBottom: "1px solid #222" }}>
                  <td style={{ padding: "14px 16px", fontSize: 14 }}>
                    {client.firstName} {client.lastName}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 14, color: "#9a9790" }}>
                    {client.email}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 14, color: "#5a5750" }}>
                    {new Date(client.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "14px 16px", textAlign: "right" }}>
                    <Link
                      href={`/admin/clients/${client._id}`}
                      style={{ fontSize: 13, color: "#c9a84c", textDecoration: "none" }}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
