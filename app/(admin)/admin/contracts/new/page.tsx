"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewContractPage() {
  const [title, setTitle] = useState("");
  const [clientId, setClientId] = useState("");

  // TODO: Replace with useQuery(api.users.listClients) when Convex is connected
  const clients: Array<{ _id: string; firstName?: string; lastName?: string; email: string }> = [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: useMutation(api.contracts.create) when Convex is connected
    console.log("[Contract] Creating:", { title, clientId });
    alert("Convex not connected yet. Contract creation will work once deployed.");
  };

  return (
    <div>
      <Link href="/admin" style={{ fontSize: 13, color: "#5a5750", textDecoration: "none", marginBottom: 16, display: "inline-block" }}>
        &larr; Back to dashboard
      </Link>

      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>New Contract</h1>
      <p style={{ color: "#9a9790", fontSize: 14, marginBottom: 32 }}>Create a contract and send it for signature.</p>

      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#9a9790", marginBottom: 6 }}>
            Client
          </label>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            style={{
              width: "100%", padding: "10px 14px", background: "#1a1a1a",
              border: "1px solid #222", borderRadius: 8, color: "#e8e6e1",
              fontSize: 14,
            }}
          >
            <option value="">Select a client...</option>
            {clients.map((c) => (
              <option key={c._id} value={c._id}>
                {c.firstName} {c.lastName} ({c.email})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#9a9790", marginBottom: 6 }}>
            Contract Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Wealth Architecture Audit — Q1 2026"
            style={{
              width: "100%", padding: "10px 14px", background: "#1a1a1a",
              border: "1px solid #222", borderRadius: 8, color: "#e8e6e1",
              fontSize: 14,
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="submit"
            style={{
              padding: "10px 24px", background: "linear-gradient(135deg, #c9a84c, #d4b85a)",
              color: "#0e0e0e", border: "none", borderRadius: 8, fontSize: 13,
              fontWeight: 600, cursor: "pointer",
            }}
          >
            Create Draft
          </button>
          <button
            type="button"
            style={{
              padding: "10px 24px", background: "transparent",
              border: "1px solid rgba(201,168,76,0.2)", color: "#c9a84c",
              borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer",
            }}
          >
            Create & Send for Signature
          </button>
        </div>
      </form>
    </div>
  );
}
