"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

type Category = "contract" | "report" | "invoice" | "document" | "other";
type Status = "draft" | "sent" | "signed" | "ongoing" | "cancelled";

const categoryOptions: { value: Category; label: string }[] = [
  { value: "contract", label: "Contract" },
  { value: "document", label: "Document" },
  { value: "report", label: "Report" },
  { value: "invoice", label: "Invoice" },
  { value: "other", label: "Other" },
];

const statusOptions: { value: Status; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "signed", label: "Signed" },
  { value: "ongoing", label: "Ongoing" },
  { value: "cancelled", label: "Cancelled" },
];

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", background: "#1a1a1a",
  border: "1px solid #222", borderRadius: 8, color: "#e8e6e1",
  fontSize: 14, boxSizing: "border-box" as const,
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 13, fontWeight: 500, color: "#9a9790", marginBottom: 6,
};

export default function NewDocumentPage() {
  const router = useRouter();
  const clients = useQuery(api.users.listClients);
  const user = useQuery(api.users.currentUser);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  const uploadDocument = useMutation(api.documents.upload);
  const createContract = useMutation(api.contracts.create);

  const [category, setCategory] = useState<Category>("document");
  const [status, setStatus] = useState<Status>("draft");
  const [title, setTitle] = useState("");
  const [clientId, setClientId] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId || !file || !user) return;
    setCreating(true);
    setError("");

    try {
      // Upload file to Convex storage
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await result.json();

      const docDate = date ? new Date(date).getTime() : undefined;

      // Create document entry
      await uploadDocument({
        clientId: clientId as Id<"users">,
        title,
        description: description || undefined,
        category,
        status,
        storageId: storageId as Id<"_storage">,
        fileType: file.type || "application/pdf",
        date: docDate,
        uploadedBy: user._id,
      });

      // If it's a contract, also create a contract entry with the PDF attached
      if (category === "contract") {
        const contractStatus = status === "ongoing" ? "draft" : (status as "draft" | "sent" | "signed" | "cancelled");
        await createContract({
          clientId: clientId as Id<"users">,
          title,
          description: description || undefined,
          pdfStorageId: storageId as Id<"_storage">,
        });
      }

      router.push("/admin");
    } catch (err) {
      console.error("Failed to create document:", err);
      setError("Failed to create document. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <Link href="/admin" style={{ fontSize: 13, color: "#5a5750", textDecoration: "none", marginBottom: 16, display: "inline-block" }}>
        &larr; Back to dashboard
      </Link>

      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>New Document</h1>
      <p style={{ color: "#9a9790", fontSize: 14, marginBottom: 32 }}>
        Upload a document, contract, report, or invoice for a client.
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: 560 }}>
        {/* Category & Status row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <div>
            <label style={labelStyle}>Type</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              style={inputStyle}
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              style={inputStyle}
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Client */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Client *</label>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
            style={inputStyle}
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

        {/* Title */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder={category === "contract" ? "e.g., Wealth Architecture Audit — Q1 2026" : "e.g., Quarterly Report — March 2026"}
            style={inputStyle}
          />
        </div>

        {/* Date */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Details about this document..."
            style={{ ...inputStyle, resize: "vertical" as const }}
          />
        </div>

        {/* PDF Upload */}
        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>PDF File *</label>
          <div
            onClick={() => fileRef.current?.click()}
            style={{
              padding: 24, border: "2px dashed #333", borderRadius: 10,
              background: "#1a1a1a", textAlign: "center", cursor: "pointer",
              transition: "border-color 0.2s",
            }}
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = "#c9a84c"; }}
            onDragLeave={(e) => { e.currentTarget.style.borderColor = "#333"; }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.style.borderColor = "#333";
              const f = e.dataTransfer.files[0];
              if (f) setFile(f);
            }}
          >
            {file ? (
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#c9a84c", marginBottom: 4 }}>{file.name}</div>
                <div style={{ fontSize: 12, color: "#5a5750" }}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setFile(null); if (fileRef.current) fileRef.current.value = ""; }}
                  style={{ marginTop: 8, padding: "4px 12px", background: "transparent", border: "1px solid #333", borderRadius: 6, color: "#9a9790", fontSize: 12, cursor: "pointer" }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 24, color: "#333", marginBottom: 8 }}>+</div>
                <div style={{ fontSize: 14, color: "#5a5750" }}>Click or drag & drop your PDF here</div>
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => { if (e.target.files?.[0]) setFile(e.target.files[0]); }}
            style={{ display: "none" }}
          />
        </div>

        {error && (
          <div style={{ padding: "10px 14px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, color: "#ef4444", fontSize: 13, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="submit"
            disabled={creating || !file}
            style={{
              padding: "10px 24px",
              background: creating || !file ? "#5a5750" : "linear-gradient(135deg, #c9a84c, #d4b85a)",
              color: "#0e0e0e", border: "none", borderRadius: 8, fontSize: 13,
              fontWeight: 600, cursor: creating || !file ? "not-allowed" : "pointer",
            }}
          >
            {creating ? "Uploading..." : "Create Document"}
          </button>
          <Link href="/admin" style={{
            padding: "10px 24px", background: "transparent", border: "1px solid #333",
            borderRadius: 8, color: "#9a9790", fontSize: 13, textDecoration: "none",
            display: "inline-flex", alignItems: "center",
          }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
