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
  const clearMeeting = useMutation(api.users.clearMeeting);
  const updateContractStatus = useMutation(api.contracts.updateStatus);
  const updateDocStatus = useMutation(api.documents.updateStatus);

  const [activeTab, setActiveTab] = useState<"info" | "documents" | "payments" | "meeting">("info");
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // Meeting state
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingNote, setMeetingNote] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [savingMeeting, setSavingMeeting] = useState(false);

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

  const handleSaveMeeting = async () => {
    if (!meetingDate) return;
    setSavingMeeting(true);
    const dateStr = meetingTime ? `${meetingDate}T${meetingTime}` : `${meetingDate}T09:00`;
    const ts = new Date(dateStr).getTime();
    await updateUser({ id, nextMeeting: ts, nextMeetingNote: meetingNote || undefined, nextMeetingLink: meetingLink || undefined });
    setSavingMeeting(false);
  };

  const handleClearMeeting = async () => {
    await clearMeeting({ id });
    setMeetingDate("");
    setMeetingTime("");
    setMeetingNote("");
    setMeetingLink("");
  };

  const statusColor: Record<string, string> = { draft: "#5a5750", sent: "#c9a84c", signed: "#4ade80", cancelled: "#ef4444", ongoing: "#3b82f6" };
  const payStatusColor: Record<string, string> = { pending: "#c9a84c", completed: "#4ade80", failed: "#ef4444", refunded: "#5a5750" };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 14px", background: "#0e0e0e", border: "1px solid #333", borderRadius: 8, color: "#e8e6e1", fontSize: 14, boxSizing: "border-box" };

  const totalDocs = (contracts?.length ?? 0) + (documents?.length ?? 0);

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
        {client.nextMeeting && (
          <div style={{ padding: "8px 16px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 8, textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#5a5750", textTransform: "uppercase", letterSpacing: "0.05em" }}>Next Meeting</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#c9a84c" }}>
              {new Date(client.nextMeeting).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </div>
            {client.nextMeetingNote && <div style={{ fontSize: 12, color: "#9a9790", marginTop: 2 }}>{client.nextMeetingNote}</div>}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid #222", marginBottom: 24, overflowX: "auto" }}>
        {([
          { key: "info" as const, label: "Info" },
          { key: "meeting" as const, label: "Meeting" },
          { key: "documents" as const, label: `Documents (${totalDocs})` },
          { key: "payments" as const, label: `Payments (${payments?.length ?? 0})` },
        ]).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "10px 20px", background: "none", border: "none",
              borderBottom: activeTab === tab.key ? "2px solid #c9a84c" : "2px solid transparent",
              color: activeTab === tab.key ? "#c9a84c" : "#5a5750",
              fontSize: 14, fontWeight: 500, cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {tab.label}
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
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, color: "#9a9790", marginBottom: 6 }}>Last Name</label>
                  <input value={lastName} onChange={(e) => setLastName(e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, color: "#9a9790", marginBottom: 6 }}>Phone</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, color: "#9a9790", marginBottom: 6 }}>Notes</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} style={{ ...inputStyle, resize: "vertical" }} />
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

      {/* Meeting Tab */}
      {activeTab === "meeting" && (
        <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Next Meeting</div>

          {client.nextMeeting && (
            <div style={{ padding: 16, background: "#0e0e0e", border: "1px solid #222", borderRadius: 10, marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#c9a84c", marginBottom: 4 }}>
                {new Date(client.nextMeeting).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                {" at "}
                {new Date(client.nextMeeting).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </div>
              {client.nextMeetingNote && <div style={{ fontSize: 13, color: "#9a9790" }}>{client.nextMeetingNote}</div>}
              {(client as any).nextMeetingLink && <div style={{ fontSize: 12, color: "#5a5750", marginTop: 4 }}><a href={(client as any).nextMeetingLink} target="_blank" rel="noopener noreferrer" style={{ color: "#c9a84c", textDecoration: "none" }}>{(client as any).nextMeetingLink}</a></div>}
              <button onClick={handleClearMeeting} style={{ marginTop: 12, padding: "6px 16px", background: "transparent", border: "1px solid #333", borderRadius: 6, color: "#ef4444", fontSize: 12, cursor: "pointer" }}>
                Clear Meeting
              </button>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, color: "#9a9790", marginBottom: 6 }}>Date</label>
                <input type="date" value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, color: "#9a9790", marginBottom: 6 }}>Time</label>
                <input type="time" value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)} style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, color: "#9a9790", marginBottom: 6 }}>Title / Note (optional)</label>
              <input value={meetingNote} onChange={(e) => setMeetingNote(e.target.value)} placeholder="e.g., Quarterly review call" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, color: "#9a9790", marginBottom: 6 }}>Meeting Link (optional)</label>
              <input value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)} placeholder="e.g., https://cal.com/jeremy-lasne/..." style={inputStyle} />
            </div>
            <button onClick={handleSaveMeeting} disabled={!meetingDate || savingMeeting} style={{
              padding: "10px 24px", width: "fit-content",
              background: !meetingDate || savingMeeting ? "#5a5750" : "linear-gradient(135deg, #c9a84c, #d4b85a)",
              color: "#0e0e0e", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600,
              cursor: !meetingDate ? "not-allowed" : "pointer",
            }}>
              {savingMeeting ? "Saving..." : client.nextMeeting ? "Update Meeting" : "Set Meeting"}
            </button>
          </div>
        </div>
      )}

      {/* Documents Tab (merged contracts + documents) */}
      {activeTab === "documents" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 14, color: "#5a5750" }}>{totalDocs} items</div>
            <Link href="/admin/new" style={{ padding: "6px 16px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 6, color: "#c9a84c", fontSize: 13, textDecoration: "none" }}>+ New</Link>
          </div>

          {/* Contracts section */}
          {contracts && contracts.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#5a5750", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Contracts</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {contracts.map((c) => (
                  <div key={c._id} style={{ padding: "16px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 500 }}>{c.title}</div>
                        <div style={{ fontSize: 12, color: "#5a5750" }}>
                          Created {new Date(c.createdAt).toLocaleDateString("fr-FR")}
                          {c.signedAt && ` · Signed ${new Date(c.signedAt).toLocaleDateString("fr-FR")}`}
                        </div>
                      </div>
                      <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, textTransform: "uppercase", color: statusColor[c.status], background: `${statusColor[c.status]}15` }}>{c.status}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {c.status === "draft" && (
                        <button onClick={() => updateContractStatus({ id: c._id, status: "sent" })} style={{ padding: "4px 12px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 6, color: "#c9a84c", fontSize: 12, cursor: "pointer" }}>
                          Mark as Sent
                        </button>
                      )}
                      {c.status === "sent" && (
                        <button onClick={() => updateContractStatus({ id: c._id, status: "signed" })} style={{ padding: "4px 12px", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 6, color: "#4ade80", fontSize: 12, cursor: "pointer" }}>
                          Mark as Signed
                        </button>
                      )}
                      {(c.status === "draft" || c.status === "sent") && (
                        <button onClick={() => updateContractStatus({ id: c._id, status: "cancelled" })} style={{ padding: "4px 12px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 6, color: "#ef4444", fontSize: 12, cursor: "pointer" }}>
                          Cancel
                        </button>
                      )}
                      {c.pdfStorageId && <PdfDownloadButton storageId={c.pdfStorageId} label="View PDF" />}
                      {c.signatureStorageId && <PdfDownloadButton storageId={c.signatureStorageId} label="View Signature" />}
                      {c.signedByName && c.status === "signed" && <span style={{ fontSize: 12, color: "#4ade80" }}>Signed by {c.signedByName}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents section */}
          {documents && documents.length > 0 && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#5a5750", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Documents</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {documents.map((d) => (
                  <div key={d._id} style={{ padding: "16px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 500 }}>{d.title}</div>
                        <div style={{ fontSize: 12, color: "#5a5750" }}>
                          <span style={{ textTransform: "capitalize" }}>{d.category}</span> · {new Date(d.createdAt).toLocaleDateString("fr-FR")}
                        </div>
                      </div>
                      <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, textTransform: "uppercase", color: statusColor[d.status] || "#5a5750", background: `${statusColor[d.status] || "#5a5750"}15` }}>{d.status}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {d.status === "draft" && (
                        <button onClick={() => updateDocStatus({ id: d._id, status: "sent" })} style={{ padding: "4px 12px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 6, color: "#c9a84c", fontSize: 12, cursor: "pointer" }}>
                          Mark as Sent
                        </button>
                      )}
                      <PdfDownloadButton storageId={d.storageId} label="Download" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {totalDocs === 0 && (
            <div style={{ textAlign: "center", padding: "40px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, color: "#5a5750", fontSize: 14 }}>
              No documents or contracts for this client.
            </div>
          )}
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === "payments" && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#5a5750", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
            Payment History · Total: {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format((payments?.filter(p => p.status === "completed").reduce((s, p) => s + p.amount, 0) ?? 0) / 100)}
          </div>
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

function PdfDownloadButton({ storageId, label }: { storageId: Id<"_storage">; label: string }) {
  const url = useQuery(api.documents.getFileUrl, { storageId });

  return (
    <a
      href={url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        padding: "4px 12px", background: "transparent", border: "1px solid #333",
        borderRadius: 6, color: "#9a9790", fontSize: 12, cursor: url ? "pointer" : "wait",
        textDecoration: "none", display: "inline-block",
        opacity: url ? 1 : 0.5,
      }}
    >
      {label}
    </a>
  );
}
