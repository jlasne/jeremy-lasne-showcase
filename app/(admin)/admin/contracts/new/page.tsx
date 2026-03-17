"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function NewContractPage() {
  const router = useRouter();
  const clients = useQuery(api.users.listClients);
  const createContract = useMutation(api.contracts.create);

  const [title, setTitle] = useState("");
  const [clientId, setClientId] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) return;
    setCreating(true);
    try {
      await createContract({ clientId: clientId as Id<"users">, title });
      router.push("/admin");
    } catch (err) {
      console.error("Failed to create contract:", err);
    } finally {
      setCreating(false);
    }
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
            required
            style={{
              width: "100%", padding: "10px 14px", background: "#1a1a1a",
              border: "1px solid #222", borderRadius: 8, color: "#e8e6e1",
              fontSize: 14,
            }}
          >
            <option value="">Select a client...</option>
            {clients?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.firstName || c.lastName ? `${c.firstName || ""} ${c.lastName || ""}`.trim() : c.email} ({c.email})
              </option>
            ))}
          </select>
          {clients?.length === 0 && (
            <div style={{ fontSize: 12, color: "#c9a84c", marginTop: 6 }}>
              No clients yet. <Link href="/admin/clients" style={{ color: "#c9a84c" }}>Add a client first</Link>.
            </div>
          )}
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#9a9790", marginBottom: 6 }}>
            Contract Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g., Wealth Architecture Audit — Q1 2026"
            style={{
              width: "100%", padding: "10px 14px", background: "#1a1a1a",
              border: "1px solid #222", borderRadius: 8, color: "#e8e6e1",
              fontSize: 14, boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#9a9790", marginBottom: 6 }}>
            Description (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Contract details..."
            style={{
              width: "100%", padding: "10px 14px", background: "#1a1a1a",
              border: "1px solid #222", borderRadius: 8, color: "#e8e6e1",
              fontSize: 14, resize: "vertical", boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="submit"
            disabled={creating}
            style={{
              padding: "10px 24px", background: creating ? "#5a5750" : "linear-gradient(135deg, #c9a84c, #d4b85a)",
              color: "#0e0e0e", border: "none", borderRadius: 8, fontSize: 13,
              fontWeight: 600, cursor: creating ? "wait" : "pointer",
            }}
          >
            {creating ? "Creating..." : "Create Draft"}
          </button>
        </div>
      </form>
    </div>
  );
}
