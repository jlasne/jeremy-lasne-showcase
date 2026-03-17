"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ClientsPage() {
  const clients = useQuery(api.users.listClients);
  const createClient = useMutation(api.users.createClient);
  const [showInvite, setShowInvite] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [creating, setCreating] = useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      await createClient({ email, firstName: firstName || undefined, lastName: lastName || undefined, phone: phone || undefined });
      setShowInvite(false);
      setEmail("");
      setFirstName("");
      setLastName("");
      setPhone("");
    } catch (err) {
      console.error("Failed to create client:", err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>Clients</h1>
          <p style={{ color: "#9a9790", fontSize: 14 }}>{clients?.length ?? 0} clients</p>
        </div>
        <button
          onClick={() => setShowInvite(!showInvite)}
          style={{
            padding: "10px 20px", background: "linear-gradient(135deg, #c9a84c, #d4b85a)",
            color: "#0e0e0e", border: "none", borderRadius: 8, fontSize: 13,
            fontWeight: 600, cursor: "pointer",
          }}
        >
          + Add Client
        </button>
      </div>

      {/* Invite form */}
      {showInvite && (
        <form onSubmit={handleInvite} style={{
          background: "#1a1a1a", border: "1px solid #333", borderRadius: 12,
          padding: 24, marginBottom: 24, display: "flex", flexDirection: "column", gap: 16,
        }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Add New Client</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, color: "#9a9790", marginBottom: 6 }}>First Name</label>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ width: "100%", padding: "10px 14px", background: "#0e0e0e", border: "1px solid #333", borderRadius: 8, color: "#e8e6e1", fontSize: 14, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, color: "#9a9790", marginBottom: 6 }}>Last Name</label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ width: "100%", padding: "10px 14px", background: "#0e0e0e", border: "1px solid #333", borderRadius: 8, color: "#e8e6e1", fontSize: 14, boxSizing: "border-box" }} />
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, color: "#9a9790", marginBottom: 6 }}>Email *</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "10px 14px", background: "#0e0e0e", border: "1px solid #333", borderRadius: 8, color: "#e8e6e1", fontSize: 14, boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, color: "#9a9790", marginBottom: 6 }}>Phone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", padding: "10px 14px", background: "#0e0e0e", border: "1px solid #333", borderRadius: 8, color: "#e8e6e1", fontSize: 14, boxSizing: "border-box" }} />
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button type="submit" disabled={creating} style={{
              padding: "10px 24px", background: creating ? "#5a5750" : "linear-gradient(135deg, #c9a84c, #d4b85a)",
              color: "#0e0e0e", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>
              {creating ? "Creating..." : "Create Client"}
            </button>
            <button type="button" onClick={() => setShowInvite(false)} style={{
              padding: "10px 24px", background: "transparent", border: "1px solid #333",
              borderRadius: 8, color: "#9a9790", fontSize: 13, cursor: "pointer",
            }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {!clients ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: "#5a5750" }}>Loading clients...</div>
        </div>
      ) : clients.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 12 }}>
          <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.3 }}>~</div>
          <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>No clients yet</div>
          <div style={{ fontSize: 14, color: "#5a5750" }}>Click &quot;+ Add Client&quot; to add your first client.</div>
        </div>
      ) : (
        <div style={{ border: "1px solid #222", borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #222" }}>
                {["Name", "Email", "Phone", "Joined", ""].map((h) => (
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
                    {client.firstName || client.lastName ? `${client.firstName || ""} ${client.lastName || ""}`.trim() : "—"}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 14, color: "#9a9790" }}>
                    {client.email}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 14, color: "#5a5750" }}>
                    {client.phone || "—"}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 14, color: "#5a5750" }}>
                    {client.createdAt ? new Date(client.createdAt).toLocaleDateString("fr-FR") : "—"}
                  </td>
                  <td style={{ padding: "14px 16px", textAlign: "right" }}>
                    <Link href={`/admin/clients/${client._id}`} style={{ fontSize: 13, color: "#c9a84c", textDecoration: "none" }}>
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
