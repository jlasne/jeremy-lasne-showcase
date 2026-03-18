"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ClientsPage() {
  const clients = useQuery(api.users.listClients);
  const sendInvitation = useAction(api.emails.sendClientInvitation);
  const [showInvite, setShowInvite] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lang, setLang] = useState<"en" | "fr">("fr");
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const siteUrl = window.location.origin;
      await sendInvitation({ email, firstName: firstName || undefined, siteUrl, lang });
      setSuccessMsg(`Invitation sent to ${email}! They can now create their account.`);
      setShowInvite(false);
      setEmail("");
      setFirstName("");
    } catch (err) {
      console.error("Failed to send invitation:", err);
      setErrorMsg("Failed to send email. Check Resend configuration.");
    } finally {
      setSending(false);
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
          onClick={() => { setShowInvite(!showInvite); setSuccessMsg(""); setErrorMsg(""); }}
          style={{
            padding: "10px 20px", background: "linear-gradient(135deg, #c9a84c, #d4b85a)",
            color: "#0e0e0e", border: "none", borderRadius: 8, fontSize: 13,
            fontWeight: 600, cursor: "pointer",
          }}
        >
          + Invite Client
        </button>
      </div>

      {successMsg && (
        <div style={{
          padding: "12px 16px", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)",
          borderRadius: 10, marginBottom: 20, fontSize: 13, color: "#4ade80",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span>{successMsg}</span>
          <button onClick={() => setSuccessMsg("")} style={{ background: "none", border: "none", color: "#4ade80", cursor: "pointer", fontSize: 16 }}>&times;</button>
        </div>
      )}

      {errorMsg && (
        <div style={{
          padding: "12px 16px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
          borderRadius: 10, marginBottom: 20, fontSize: 13, color: "#ef4444",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg("")} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 16 }}>&times;</button>
        </div>
      )}

      {showInvite && (
        <form onSubmit={handleSendInvite} style={{
          background: "#1a1a1a", border: "1px solid #333", borderRadius: 12,
          padding: 24, marginBottom: 24, display: "flex", flexDirection: "column", gap: 16,
        }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Invite a New Client</div>
          <p style={{ fontSize: 13, color: "#9a9790", margin: 0 }}>
            Send an invitation email so your client can create their own account. They will appear here after signing up.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 120px", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, color: "#9a9790", marginBottom: 6 }}>First Name (optional)</label>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Their first name" style={{ width: "100%", padding: "10px 14px", background: "#0e0e0e", border: "1px solid #333", borderRadius: 8, color: "#e8e6e1", fontSize: 14, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, color: "#9a9790", marginBottom: 6 }}>Email *</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="client@example.com" style={{ width: "100%", padding: "10px 14px", background: "#0e0e0e", border: "1px solid #333", borderRadius: 8, color: "#e8e6e1", fontSize: 14, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, color: "#9a9790", marginBottom: 6 }}>Language</label>
              <select value={lang} onChange={(e) => setLang(e.target.value as "en" | "fr")} style={{ width: "100%", padding: "10px 14px", background: "#0e0e0e", border: "1px solid #333", borderRadius: 8, color: "#e8e6e1", fontSize: 14, boxSizing: "border-box" }}>
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button type="submit" disabled={sending} style={{
              padding: "10px 24px", background: sending ? "#5a5750" : "linear-gradient(135deg, #c9a84c, #d4b85a)",
              color: "#0e0e0e", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>
              {sending ? "Sending..." : "Send Invitation Email"}
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
          <div style={{ fontSize: 14, color: "#5a5750" }}>Click &quot;+ Invite Client&quot; to send an invitation email.</div>
        </div>
      ) : (
        <div style={{ border: "1px solid #222", borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #222" }}>
                {["Name", "Email", "Phone", "Next Meeting", "Joined", ""].map((h) => (
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
                  <td style={{ padding: "14px 16px", fontSize: 14, color: client.nextMeeting ? "#c9a84c" : "#5a5750" }}>
                    {client.nextMeeting ? new Date(client.nextMeeting).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 14, color: "#5a5750" }}>
                    {client._creationTime ? new Date(client._creationTime).toLocaleDateString("fr-FR") : "—"}
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
