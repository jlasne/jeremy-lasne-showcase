"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

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
                  {doc.fileType} &middot; {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                </div>
              </div>
              <button style={{
                padding: "6px 16px", background: "transparent", border: "1px solid #222",
                borderRadius: 6, color: "#c9a84c", fontSize: 13, cursor: "pointer",
              }}>
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
