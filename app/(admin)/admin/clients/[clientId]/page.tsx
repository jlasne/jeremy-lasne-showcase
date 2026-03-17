"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function ClientProfilePage() {
  const { clientId } = useParams();
  const id = clientId as Id<"users">;
  const client = useQuery(api.users.getById, { id });
  const contracts = useQuery(api.contracts.listByClient, { clientId: id });
  const documents = useQuery(api.documents.listByClient, { clientId: id });
  const payments = useQuery(api.payments.listByClient, { clientId: id });
  const updateUser = useMutation(api.users.updateUser);

  const [activeTab, setActiveTab] = useState<"info" | "contracts" | "documents" | "payments">("info");
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const startEditing = () => {
    if (client) {
      setFirstName(client.firstName || "");
      setLastName(client.lastName || "");
      setPhone(client.phone || "");
      setNotes(client.notes || "");
      setEditing(true);
    }
  };

  const handleSave = async () => {
    await updateUser({ id, firstName: firstName || undefined, lastName: lastName || undefined, phone: phone || undefined, notes: notes || undefined });
    setEditing(false);
  };

  const statusColor: Record<string, string> = { draft: "#5a5750", sent: "#c9a84c", signed: "#4ade80", cancelled: "#ef4444" };
  const payStatusColor: Record<string, string> = { pending: "#c9a84c", completed: "#4ade80", failed: "#ef4444", refunded: "#5a5750" };

  if (!client) {
    return <div style={{ color: "#5a5750", fontSize: 14 }}>Loading client...</div>;
  }

  return (
    <div>
      <Link href="/admin/clients" style={{ fontSize: 13, color: "#5a5750", textDecoration: "none", marginBottom: 16, display: "inline-block" }}>
        &larr; Back to clients
      </Link>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>
            {client.firstName || client.lastName ? `${client.firstName || ""} ${client.lastName || ""}`.trim() : client.email}
          </h1>
          <p style={{ color: "#5a5750", fontSize: 13 }}>{client.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid #222", marginBottom: 24 }}>
        {(["info", "contracts", "documents", "payments"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 20px", background: "none", border: "none",
              borderBottom: activeTab === tab ? "2px solid #c9a84c" : "2px solid transparent",
              color: activeTab === tab ? "#c9a84c" : "#5a5750",
              fontSize: 14, fontWeight: 500, cursor: "pointer", textTransform: "capitalize",
            }}
          >
            {tab} {tab === "contracts" ? `(${contracts?.length ?? 0})` : tab === "documents" ? `(${documents?.length ?? 0})` : tab === "payments" ? `(${payments?.length ?? 0})` : ""}
          </button>
        ))}
      </div>

      {/* Info Tab */}
      {activeTab === "info" && (
        <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: 24 }}>
          {editing ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
                <label style={{ display: "block", fontSize: 13, color: "#9a9790", marginBottom: 6 }}>Phone</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", padding: "10px 14px", background: "#0e0e0e", border: "1px solid #333", borderRadius: 8, color: "#e8e6e1", fontSize: 14, boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, color: "#9a9790", marginBottom: 6 }}>Notes</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} style={{ width: "100%", padding: "10px 14px", background: "#0e0e0e", border: "1px solid #333", borderRadius: 8, color: "#e8e6e1", fontSize: 14, resize: "vertical", boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={handleSave} style={{ padding: "10px 24px", background: "linear-gradient(135deg, #c9a84c, #d4b85a)", color: "#0e0e0e", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save</button>
                <button onClick={() => setEditing(false)} style={{ padding: "10px 24px", background: "transparent", border: "1px solid #333", borderRadius: 8, color: "#9a9790", fontSize: 13, cursor: "pointer" }}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>Client Information</div>
                <button onClick={startEditing} style={{ padding: "6px 16px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 6, color: "#c9a84c", fontSize: 13, cursor: "pointer" }}>Edit</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "12px 16px", fontSize: 14 }}>
                <div style={{ color: "#5a5750" }}>Name</div>
                <div>{client.firstName || client.lastName ? `${client.firstName || ""} ${client.lastName || ""}`.trim() : "—"}</div>
                <div style={{ color: "#5a5750" }}>Email</div>
                <div>{client.email || "—"}</div>
                <div style={{ color: "#5a5750" }}>Phone</div>
                <div>{client.phone || "—"}</div>
                <div style={{ color: "#5a5750" }}>Joined</div>
                <div>{client.createdAt ? new Date(client.createdAt).toLocaleDateString("fr-FR") : "—"}</div>
                <div style={{ color: "#5a5750" }}>Notes</div>
                <div style={{ whiteSpace: "pre-wrap" }}>{client.notes || "—"}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Contracts Tab */}
      {activeTab === "contracts" && (
        <div>
          {!contracts || contracts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, color: "#5a5750", fontSize: 14 }}>
              No contracts for this client.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {contracts.map((c) => (
                <div key={c._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 10 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{c.title}</div>
                    <div style={{ fontSize: 12, color: "#5a5750" }}>Created {new Date(c.createdAt).toLocaleDateString("fr-FR")}</div>
                  </div>
                  <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, textTransform: "uppercase", color: statusColor[c.status], background: `${statusColor[c.status]}15` }}>{c.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === "documents" && (
        <div>
          {!documents || documents.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, color: "#5a5750", fontSize: 14 }}>
              No documents for this client.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {documents.map((d) => (
                <div key={d._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 10 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{d.title}</div>
                    <div style={{ fontSize: 12, color: "#5a5750" }}>{d.fileType} &middot; {new Date(d.createdAt).toLocaleDateString("fr-FR")}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === "payments" && (
        <div>
          {!payments || payments.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, color: "#5a5750", fontSize: 14 }}>
              No payments for this client.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {payments.map((p) => (
                <div key={p._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 10 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{p.type === "audit" ? "Wealth Architecture Audit" : "Quarterly Review"}{p.description ? ` — ${p.description}` : ""}</div>
                    <div style={{ fontSize: 12, color: "#5a5750" }}>{new Date(p.createdAt).toLocaleDateString("fr-FR")}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>{new Intl.NumberFormat("fr-FR", { style: "currency", currency: p.currency }).format(p.amount / 100)}</div>
                    <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", color: payStatusColor[p.status] }}>{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
