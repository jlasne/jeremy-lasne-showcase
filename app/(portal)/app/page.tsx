"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ClientDashboard() {
  const user = useQuery(api.users.currentUser);
  const admin = useQuery(api.users.getAdmin);
  const contracts = useQuery(api.contracts.listByClient, user?._id ? { clientId: user._id } : "skip");
  const documents = useQuery(api.documents.listByClient, user?._id ? { clientId: user._id } : "skip");
  const payments = useQuery(api.payments.listByClient, user?._id ? { clientId: user._id } : "skip");

  const pendingContracts = contracts?.filter((c) => c.status === "sent") ?? [];
  const recentDocs = documents?.slice(0, 3) ?? [];

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
        Welcome{user?.firstName ? `, ${user.firstName}` : ""}
      </h1>
      <p style={{ color: "#9a9790", marginBottom: 32 }}>Your wealth architecture portal.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16, marginBottom: 24 }}>
        {/* Next Meeting */}
        <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: "24px 20px" }}>
          <div style={{ fontSize: 12, color: "#5a5750", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
            Next Meeting
          </div>
          {user?.nextMeeting ? (
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#c9a84c", marginBottom: 4 }}>
                {new Date(user.nextMeeting).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })}
              </div>
              <div style={{ fontSize: 14, color: "#9a9790" }}>
                {new Date(user.nextMeeting).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </div>
              {user.nextMeetingNote && (
                <div style={{ fontSize: 13, color: "#5a5750", marginTop: 4 }}>{user.nextMeetingNote}</div>
              )}
            </div>
          ) : (
            <div style={{ fontSize: 14, color: "#5a5750" }}>No meeting scheduled.</div>
          )}
        </div>

        {/* Pending Contracts */}
        <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: "24px 20px" }}>
          <div style={{ fontSize: 12, color: "#5a5750", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
            Pending Contracts
          </div>
          {pendingContracts.length > 0 ? (
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#c9a84c", marginBottom: 4 }}>{pendingContracts.length}</div>
              <div style={{ fontSize: 13, color: "#9a9790" }}>awaiting your signature</div>
            </div>
          ) : (
            <div style={{ fontSize: 14, color: "#5a5750" }}>No pending contracts.</div>
          )}
        </div>

        {/* Recent Documents */}
        <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: "24px 20px" }}>
          <div style={{ fontSize: 12, color: "#5a5750", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
            Recent Documents
          </div>
          {recentDocs.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {recentDocs.map((doc) => (
                <div key={doc._id} style={{ fontSize: 14 }}>
                  {doc.title}
                  <span style={{ fontSize: 12, color: "#5a5750", marginLeft: 8, textTransform: "capitalize" }}>{doc.category}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: 14, color: "#5a5750" }}>No documents yet.</div>
          )}
        </div>

        {/* Payment Summary */}
        <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: "24px 20px" }}>
          <div style={{ fontSize: 12, color: "#5a5750", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
            Payment Summary
          </div>
          {payments && payments.length > 0 ? (
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#e8e6e1", marginBottom: 4 }}>
                {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(
                  payments.filter((p) => p.status === "completed").reduce((s, p) => s + p.amount, 0) / 100
                )}
              </div>
              <div style={{ fontSize: 13, color: "#5a5750" }}>{payments.length} total payments</div>
            </div>
          ) : (
            <div style={{ fontSize: 14, color: "#5a5750" }}>No payments recorded.</div>
          )}
        </div>
      </div>

      {/* Admin Contact */}
      {admin && (
        <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: "24px 20px" }}>
          <div style={{ fontSize: 12, color: "#5a5750", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
            Your Advisor
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "linear-gradient(135deg, #c9a84c, #d4b85a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 700, color: "#0e0e0e", flexShrink: 0,
            }}>
              {admin.firstName?.[0] || "J"}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                {admin.firstName || admin.lastName ? `${admin.firstName || ""} ${admin.lastName || ""}`.trim() : "Your Advisor"}
              </div>
              {admin.email && (
                <a href={`mailto:${admin.email}`} style={{ fontSize: 13, color: "#c9a84c", textDecoration: "none" }}>
                  {admin.email}
                </a>
              )}
              {admin.phone && (
                <div style={{ fontSize: 13, color: "#9a9790", marginTop: 2 }}>
                  <a href={`tel:${admin.phone}`} style={{ color: "#9a9790", textDecoration: "none" }}>{admin.phone}</a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
