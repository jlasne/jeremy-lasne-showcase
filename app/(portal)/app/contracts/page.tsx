"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import SignaturePad from "@/components/SignaturePad";

const statusColor: Record<string, string> = {
  draft: "#5a5750", sent: "#c9a84c", signed: "#4ade80", cancelled: "#ef4444",
};

export default function ContractsPage() {
  const user = useQuery(api.users.currentUser);
  const contracts = useQuery(api.contracts.listByClient, user?._id ? { clientId: user._id } : "skip");
  const signContract = useMutation(api.contracts.signContract);
  const generateUploadUrl = useMutation(api.contracts.generateUploadUrl);

  const [signingId, setSigningId] = useState<Id<"contracts"> | null>(null);
  const [signing, setSigning] = useState(false);

  const handleSign = async (blob: Blob) => {
    if (!signingId) return;
    setSigning(true);
    try {
      // Upload signature image to Convex storage
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": "image/png" },
        body: blob,
      });
      const { storageId } = await result.json();

      // Sign the contract
      await signContract({
        id: signingId,
        signatureStorageId: storageId as Id<"_storage">,
      });
      setSigningId(null);
    } catch (err) {
      console.error("Failed to sign contract:", err);
      alert("Failed to sign. Please try again.");
    } finally {
      setSigning(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Contracts</h1>
      <p style={{ color: "#9a9790", fontSize: 14, marginBottom: 32 }}>Your contracts and their signing status.</p>

      {contracts === undefined ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: "#5a5750" }}>Loading contracts...</div>
        </div>
      ) : contracts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: "#5a5750" }}>No contracts yet.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {contracts.map((contract) => (
            <div
              key={contract._id}
              style={{
                padding: "16px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 10,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{contract.title}</div>
                  <div style={{ fontSize: 12, color: "#5a5750" }}>
                    Created {new Date(contract.createdAt).toLocaleDateString("fr-FR")}
                    {contract.signedAt && ` · Signed ${new Date(contract.signedAt).toLocaleDateString("fr-FR")}`}
                  </div>
                  {contract.description && (
                    <div style={{ fontSize: 13, color: "#9a9790", marginTop: 4 }}>{contract.description}</div>
                  )}
                </div>
                <span style={{
                  padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                  color: statusColor[contract.status] || "#5a5750",
                  background: `${statusColor[contract.status] || "#5a5750"}15`,
                }}>
                  {contract.status}
                </span>
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {/* View PDF */}
                {contract.pdfStorageId && (
                  <PdfDownloadButton storageId={contract.pdfStorageId} label="View PDF" />
                )}

                {/* Sign button — only for contracts with status "sent" */}
                {contract.status === "sent" && (
                  <button
                    onClick={() => setSigningId(contract._id)}
                    style={{
                      padding: "6px 20px",
                      background: "linear-gradient(135deg, #c9a84c, #d4b85a)",
                      color: "#0e0e0e", border: "none", borderRadius: 6,
                      fontSize: 13, fontWeight: 600, cursor: "pointer",
                    }}
                  >
                    Sign Contract
                  </button>
                )}

                {/* View signature — after signed */}
                {contract.signatureStorageId && (
                  <SignatureView storageId={contract.signatureStorageId} signedBy={contract.signedByName} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Signature pad modal */}
      {signingId && (
        <SignaturePad
          onSave={handleSign}
          onCancel={() => setSigningId(null)}
          saving={signing}
        />
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
        padding: "6px 16px", background: "transparent", border: "1px solid #222",
        borderRadius: 6, color: "#c9a84c", fontSize: 13, cursor: url ? "pointer" : "wait",
        textDecoration: "none", opacity: url ? 1 : 0.5,
      }}
    >
      {label}
    </a>
  );
}

function SignatureView({ storageId, signedBy }: { storageId: Id<"_storage">; signedBy?: string }) {
  const url = useQuery(api.documents.getFileUrl, { storageId });
  const [showSig, setShowSig] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowSig(true)}
        style={{
          padding: "6px 16px", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)",
          borderRadius: 6, color: "#4ade80", fontSize: 13, cursor: "pointer",
        }}
      >
        View Signature
      </button>
      {showSig && url && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 1000,
            display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
          }}
          onClick={() => setShowSig(false)}
        >
          <div style={{
            background: "#1a1a1a", border: "1px solid #333", borderRadius: 16,
            padding: 24, maxWidth: 520, width: "100%", textAlign: "center",
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: "#4ade80" }}>Signed</h3>
            {signedBy && <p style={{ fontSize: 13, color: "#9a9790", marginBottom: 12 }}>by {signedBy}</p>}
            <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
              <img src={url} alt="Signature" style={{ width: "100%", height: "auto" }} />
            </div>
            <button onClick={() => setShowSig(false)} style={{ padding: "8px 20px", background: "transparent", border: "1px solid #333", borderRadius: 6, color: "#9a9790", fontSize: 13, cursor: "pointer" }}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
