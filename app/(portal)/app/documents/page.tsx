"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import SignaturePad from "@/components/SignaturePad";

type Lang = "en" | "fr";
const t = (lang: Lang, en: string, fr: string) => lang === "en" ? en : fr;

const statusLabel = (lang: Lang, status: string) => {
  const labels: Record<string, Record<Lang, string>> = {
    draft: { en: "Draft", fr: "Brouillon" },
    sent: { en: "Sent", fr: "Envoyé" },
    signed: { en: "Signed", fr: "Signé" },
    ongoing: { en: "Ongoing", fr: "En cours" },
    cancelled: { en: "Cancelled", fr: "Annulé" },
  };
  return labels[status]?.[lang] || status;
};

const statusColor: Record<string, string> = {
  draft: "#5a5750", sent: "#c9a84c", signed: "#4ade80", ongoing: "#3b82f6", cancelled: "#ef4444",
};

export default function DocumentsPage() {
  const user = useQuery(api.users.currentUser);
  const documents = useQuery(api.documents.listByClient, user?._id ? { clientId: user._id } : "skip");
  const contracts = useQuery(api.contracts.listByClient, user?._id ? { clientId: user._id } : "skip");
  const signContract = useMutation(api.contracts.signContract);
  const generateUploadUrl = useMutation(api.contracts.generateUploadUrl);

  const [lang, setLang] = useState<Lang>("fr");
  const [signingId, setSigningId] = useState<Id<"contracts"> | null>(null);
  const [signing, setSigning] = useState(false);
  const [viewingPdf, setViewingPdf] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portal-lang") as Lang;
      if (saved) setLang(saved);
    } catch {}
  }, []);

  const locale = lang === "fr" ? "fr-FR" : "en-US";

  const handleSign = async (blob: Blob) => {
    if (!signingId) return;
    setSigning(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": "image/png" },
        body: blob,
      });
      const { storageId } = await result.json();
      await signContract({ id: signingId, signatureStorageId: storageId as Id<"_storage"> });
      setSigningId(null);
    } catch (err) {
      console.error("Failed to sign contract:", err);
      alert(t(lang, "Failed to sign. Please try again.", "Échec de la signature. Veuillez réessayer."));
    } finally {
      setSigning(false);
    }
  };

  const hasContracts = contracts && contracts.length > 0;
  const hasDocs = documents && documents.length > 0;

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 24 }}>
        {t(lang, "Documents", "Documents")}
      </h1>

      {/* Contracts section */}
      {hasContracts && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#5a5750", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
            {t(lang, "Contracts", "Contrats")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {contracts.map((contract) => (
              <div key={contract._id} style={{ padding: "16px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{contract.title}</div>
                    <div style={{ fontSize: 12, color: "#5a5750" }}>
                      {new Date(contract.createdAt).toLocaleDateString(locale)}
                      {contract.signedAt && ` · ${t(lang, "Signed", "Signé")} ${new Date(contract.signedAt).toLocaleDateString(locale)}`}
                    </div>
                    {contract.description && <div style={{ fontSize: 13, color: "#9a9790", marginTop: 4 }}>{contract.description}</div>}
                  </div>
                  <span style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, textTransform: "uppercase", color: statusColor[contract.status], background: `${statusColor[contract.status]}15` }}>
                    {statusLabel(lang, contract.status)}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {contract.pdfStorageId && <PdfViewButton storageId={contract.pdfStorageId} label={t(lang, "View PDF", "Voir le PDF")} onView={setViewingPdf} />}
                  {contract.status === "sent" && (
                    <button onClick={() => setSigningId(contract._id)} style={{
                      padding: "6px 20px", background: "linear-gradient(135deg, #c9a84c, #d4b85a)",
                      color: "#0e0e0e", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer",
                    }}>
                      {t(lang, "Sign Contract", "Signer le contrat")}
                    </button>
                  )}
                  {contract.signatureStorageId && (
                    <SignatureView storageId={contract.signatureStorageId} signedBy={contract.signedByName} lang={lang} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents section */}
      {hasDocs && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#5a5750", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>
            {t(lang, "Files", "Fichiers")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {documents.map((doc) => (
              <div key={doc._id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 18px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 10,
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{doc.title}</div>
                  <div style={{ fontSize: 11, color: "#5a5750" }}>
                    <span style={{ textTransform: "capitalize" }}>{doc.category}</span> · {new Date(doc.createdAt).toLocaleDateString(locale)}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    padding: "3px 8px", borderRadius: 20, fontSize: 10, fontWeight: 600,
                    textTransform: "uppercase", color: statusColor[doc.status] || "#5a5750",
                    background: `${statusColor[doc.status] || "#5a5750"}15`,
                  }}>
                    {statusLabel(lang, doc.status)}
                  </span>
                  <PdfViewButton storageId={doc.storageId} label={t(lang, "View", "Voir")} onView={setViewingPdf} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!hasContracts && !hasDocs && (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: "#5a5750" }}>{t(lang, "No documents yet.", "Aucun document pour le moment.")}</div>
        </div>
      )}

      {/* Signature pad modal */}
      {signingId && (
        <SignaturePad onSave={handleSign} onCancel={() => setSigningId(null)} saving={signing} />
      )}

      {/* PDF Viewer modal */}
      {viewingPdf && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 1000, display: "flex", flexDirection: "column", padding: 20 }}
          onClick={() => setViewingPdf(null)}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 14, color: "#9a9790" }}>{t(lang, "Document Preview", "Aperçu du document")}</span>
            <div style={{ display: "flex", gap: 8 }}>
              <a href={viewingPdf} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{
                padding: "6px 16px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: 6, color: "#c9a84c", fontSize: 12, textDecoration: "none",
              }}>
                {t(lang, "Download", "Télécharger")}
              </a>
              <button onClick={() => setViewingPdf(null)} style={{
                padding: "6px 16px", background: "transparent", border: "1px solid #333",
                borderRadius: 6, color: "#9a9790", fontSize: 12, cursor: "pointer",
              }}>
                {t(lang, "Close", "Fermer")}
              </button>
            </div>
          </div>
          <iframe
            src={viewingPdf}
            onClick={(e) => e.stopPropagation()}
            style={{ flex: 1, border: "none", borderRadius: 8, background: "#fff" }}
          />
        </div>
      )}
    </div>
  );
}

function PdfViewButton({ storageId, label, onView }: { storageId: Id<"_storage">; label: string; onView: (url: string) => void }) {
  const url = useQuery(api.documents.getFileUrl, { storageId });
  return (
    <button
      onClick={() => url && onView(url)}
      style={{
        padding: "5px 14px", background: "transparent", border: "1px solid #222",
        borderRadius: 6, color: "#c9a84c", fontSize: 12, cursor: url ? "pointer" : "wait",
        opacity: url ? 1 : 0.5,
      }}
    >
      {label}
    </button>
  );
}

function SignatureView({ storageId, signedBy, lang }: { storageId: Id<"_storage">; signedBy?: string; lang: Lang }) {
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
        {t(lang, "View Signature", "Voir la signature")}
      </button>
      {showSig && url && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={() => setShowSig(false)}
        >
          <div style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 16, padding: 24, maxWidth: 520, width: "100%", textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: "#4ade80" }}>{t(lang, "Signed", "Signé")}</h3>
            {signedBy && <p style={{ fontSize: 13, color: "#9a9790", marginBottom: 12 }}>{t(lang, "by", "par")} {signedBy}</p>}
            <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
              <img src={url} alt="Signature" style={{ width: "100%", height: "auto" }} />
            </div>
            <button onClick={() => setShowSig(false)} style={{ padding: "8px 20px", background: "transparent", border: "1px solid #333", borderRadius: 6, color: "#9a9790", fontSize: 13, cursor: "pointer" }}>
              {t(lang, "Close", "Fermer")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
