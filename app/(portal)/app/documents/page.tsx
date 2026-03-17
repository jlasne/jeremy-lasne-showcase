"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

const statusColor: Record<string, string> = {
  draft: "#5a5750", sent: "#c9a84c", signed: "#4ade80", ongoing: "#3b82f6", cancelled: "#ef4444",
};

export default function DocumentsPage() {
  const user = useQuery(api.users.currentUser);
  const documents = useQuery(api.documents.listByClient, user?._id ? { clientId: user._id } : "skip");

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Documents</h1>
      <p style={{ color: "#9a9790", fontSize: 14, marginBottom: 32 }}>All documents shared with you.</p>

      {documents === undefined ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: "#5a5750" }}>Loading documents...</div>
        </div>
      ) : documents.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: "#5a5750" }}>No documents available yet.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {documents.map((doc) => (
            <div
              key={doc._id}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "16px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 10,
              }}
            >
              <div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{doc.title}</div>
                <div style={{ fontSize: 12, color: "#5a5750" }}>
                  <span style={{ textTransform: "capitalize" }}>{doc.category}</span> &middot; {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                  {doc.date ? ` · ${new Date(doc.date).toLocaleDateString("fr-FR")}` : ""}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{
                  padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                  color: statusColor[doc.status] || "#5a5750",
                  background: `${statusColor[doc.status] || "#5a5750"}15`,
                }}>
                  {doc.status}
                </span>
                <PdfDownloadButton storageId={doc.storageId} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PdfDownloadButton({ storageId }: { storageId: Id<"_storage"> }) {
  const url = useQuery(api.documents.getFileUrl, { storageId });

  return (
    <a
      href={url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        padding: "6px 16px", background: "transparent", border: "1px solid #222",
        borderRadius: 6, color: "#c9a84c", fontSize: 13, cursor: url ? "pointer" : "wait",
        textDecoration: "none", opacity: url ? 1 : 0.5,
      }}
    >
      Download
    </a>
  );
}
