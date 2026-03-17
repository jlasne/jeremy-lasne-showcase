"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import ReactMarkdown from "react-markdown";
import { marked } from "marked";

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

const defaultContractMarkdown = `# Contract Title

**Date:** ${new Date().toLocaleDateString("fr-FR")}

---

## 1. Parties

**Service Provider:** Jeremy Lasne — Wealth Architect
**Client:** [Client Name]

---

## 2. Scope of Services

Describe the scope of services here...

---

## 3. Duration

This contract is effective from **[Start Date]** to **[End Date]**.

---

## 4. Fees and Payment

| Service | Amount |
|---------|--------|
| Audit | €X,XXX |
| Quarterly follow-up | €X,XXX/quarter |

---

## 5. Terms and Conditions

1. Confidentiality clause...
2. Termination clause...
3. Liability clause...

---

## 6. Signatures

**Service Provider:**

_____________________________
Jeremy Lasne — Date: ___/___/______


**Client:**

_____________________________
[Client Name] — Date: ___/___/______
`;

const defaultDocumentMarkdown = `# Document Title

**Date:** ${new Date().toLocaleDateString("fr-FR")}

---

## Summary

Write your document content here using **Markdown** formatting.

### Key Points

- Point 1
- Point 2
- Point 3

---

### Details

Add detailed content, tables, lists, etc.

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data | Data | Data |
`;

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
  const [markdown, setMarkdown] = useState(defaultDocumentMarkdown);
  const [showPreview, setShowPreview] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  // When category changes, load appropriate template
  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    if (newCategory === "contract" && markdown === defaultDocumentMarkdown) {
      setMarkdown(defaultContractMarkdown);
    } else if (newCategory !== "contract" && markdown === defaultContractMarkdown) {
      setMarkdown(defaultDocumentMarkdown);
    }
  };

  // Generate PDF from Markdown preview using html2canvas + jspdf
  const generatePdf = useCallback(async (): Promise<Blob> => {
    // Dynamic imports to avoid SSR issues
    const { default: jsPDF } = await import("jspdf");
    const { default: html2canvas } = await import("html2canvas");

    // Create a hidden rendering container
    const container = document.createElement("div");
    container.style.cssText = `
      position: absolute; left: -9999px; top: 0;
      width: 794px; padding: 60px 50px;
      background: white; color: #1a1a1a;
      font-family: 'Georgia', 'Times New Roman', serif;
      font-size: 14px; line-height: 1.7;
    `;

    // Convert markdown to HTML using marked
    const htmlContent = await marked(markdown);

    // Style the HTML for PDF
    const styledHtml = `
      <style>
        h1 { font-size: 26px; font-weight: 700; margin-bottom: 8px; color: #1a1a1a; border-bottom: 2px solid #c9a84c; padding-bottom: 10px; }
        h2 { font-size: 20px; font-weight: 600; margin-top: 28px; margin-bottom: 10px; color: #2a2a2a; }
        h3 { font-size: 16px; font-weight: 600; margin-top: 20px; margin-bottom: 8px; color: #333; }
        p { margin-bottom: 10px; }
        hr { border: none; border-top: 1px solid #ddd; margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin: 16px 0; }
        th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; font-size: 13px; }
        th { background: #f5f5f0; font-weight: 600; }
        ul, ol { margin: 10px 0; padding-left: 24px; }
        li { margin-bottom: 4px; }
        strong { font-weight: 700; }
        em { font-style: italic; }
        blockquote { border-left: 3px solid #c9a84c; padding-left: 16px; margin: 16px 0; color: #555; font-style: italic; }
        code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-size: 13px; font-family: monospace; }
      </style>
      ${htmlContent}
    `;

    container.innerHTML = styledHtml;
    document.body.appendChild(container);

    // Render to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      width: 794,
      windowWidth: 794,
    });

    document.body.removeChild(container);

    // Convert to PDF (A4)
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210;
    const pageHeight = 297;
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Handle multi-page
    let heightLeft = imgHeight;
    let position = 0;
    const imgData = canvas.toDataURL("image/png");

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = -(imgHeight - heightLeft);
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    return pdf.output("blob");
  }, [markdown, title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId || !user || !markdown.trim()) return;
    setCreating(true);
    setError("");

    try {
      // Generate PDF from Markdown
      const pdfBlob = await generatePdf();

      // Upload PDF to Convex storage
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": "application/pdf" },
        body: pdfBlob,
      });
      const { storageId } = await result.json();

      const docDate = date ? new Date(date).getTime() : undefined;

      // Create document entry
      await uploadDocument({
        clientId: clientId as Id<"users">,
        title,
        description: description || undefined,
        markdownContent: markdown,
        category,
        status,
        storageId: storageId as Id<"_storage">,
        fileType: "application/pdf",
        date: docDate,
        uploadedBy: user._id,
      });

      // If it's a contract, also create a contract entry
      if (category === "contract") {
        await createContract({
          clientId: clientId as Id<"users">,
          title,
          description: description || undefined,
          markdownContent: markdown,
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
        Write your document in Markdown — a PDF will be auto-generated.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Top row: Category, Status, Client */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: 16, marginBottom: 20 }}>
          <div>
            <label style={labelStyle}>Type</label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value as Category)}
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
          <div>
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
          </div>
        </div>

        {/* Title & Date row */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 20 }}>
          <div>
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
          <div>
            <label style={labelStyle}>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Description (optional — internal note, not in PDF)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short internal description..."
            style={inputStyle}
          />
        </div>

        {/* Markdown Editor + Preview Toggle */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <label style={{ ...labelStyle, marginBottom: 0 }}>Content (Markdown)</label>
            <div style={{ display: "flex", gap: 4, background: "#111", borderRadius: 6, padding: 2 }}>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                style={{
                  padding: "5px 14px", fontSize: 12, fontWeight: 500, border: "none", borderRadius: 4,
                  cursor: "pointer", transition: "all 0.2s",
                  background: !showPreview ? "#c9a84c" : "transparent",
                  color: !showPreview ? "#0e0e0e" : "#5a5750",
                }}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                style={{
                  padding: "5px 14px", fontSize: 12, fontWeight: 500, border: "none", borderRadius: 4,
                  cursor: "pointer", transition: "all 0.2s",
                  background: showPreview ? "#c9a84c" : "transparent",
                  color: showPreview ? "#0e0e0e" : "#5a5750",
                }}
              >
                Preview
              </button>
            </div>
          </div>

          {!showPreview ? (
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              rows={24}
              placeholder="Write your document content in Markdown..."
              style={{
                ...inputStyle,
                resize: "vertical" as const,
                fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                fontSize: 13,
                lineHeight: "1.6",
                minHeight: 400,
              }}
            />
          ) : (
            <div
              ref={previewRef}
              style={{
                padding: "32px 40px",
                background: "#ffffff",
                border: "1px solid #222",
                borderRadius: 8,
                color: "#1a1a1a",
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: 14,
                lineHeight: 1.7,
                minHeight: 400,
                maxHeight: 600,
                overflowY: "auto",
              }}
            >
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8, color: "#1a1a1a", borderBottom: "2px solid #c9a84c", paddingBottom: 10 }}>
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 style={{ fontSize: 20, fontWeight: 600, marginTop: 28, marginBottom: 10, color: "#2a2a2a" }}>
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8, color: "#333" }}>
                      {children}
                    </h3>
                  ),
                  hr: () => <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "20px 0" }} />,
                  table: ({ children }) => (
                    <table style={{ width: "100%", borderCollapse: "collapse", margin: "16px 0" }}>
                      {children}
                    </table>
                  ),
                  th: ({ children }) => (
                    <th style={{ border: "1px solid #ddd", padding: "8px 12px", background: "#f5f5f0", fontWeight: 600, fontSize: 13, textAlign: "left" }}>
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td style={{ border: "1px solid #ddd", padding: "8px 12px", fontSize: 13, textAlign: "left" }}>
                      {children}
                    </td>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote style={{ borderLeft: "3px solid #c9a84c", paddingLeft: 16, margin: "16px 0", color: "#555", fontStyle: "italic" }}>
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code style={{ background: "#f0f0f0", padding: "2px 6px", borderRadius: 3, fontSize: 13, fontFamily: "monospace" }}>
                      {children}
                    </code>
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          )}

          <div style={{ fontSize: 11, color: "#5a5750", marginTop: 6 }}>
            Supports Markdown: **bold**, *italic*, # headings, - lists, | tables |, --- dividers, &gt; quotes
          </div>
        </div>

        {error && (
          <div style={{ padding: "10px 14px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, color: "#ef4444", fontSize: 13, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="submit"
            disabled={creating || !markdown.trim() || !title || !clientId}
            style={{
              padding: "10px 24px",
              background: creating || !markdown.trim() || !title || !clientId ? "#5a5750" : "linear-gradient(135deg, #c9a84c, #d4b85a)",
              color: "#0e0e0e", border: "none", borderRadius: 8, fontSize: 13,
              fontWeight: 600, cursor: creating || !markdown.trim() || !title || !clientId ? "not-allowed" : "pointer",
            }}
          >
            {creating ? "Generating PDF..." : "Create Document"}
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
