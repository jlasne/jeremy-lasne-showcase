"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

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
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portal-lang") as Lang;
      if (saved) setLang(saved);
    } catch {}
  }, []);

  const locale = lang === "fr" ? "fr-FR" : "en-US";

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 24 }}>
        {t(lang, "Documents", "Documents")}
      </h1>

      {documents === undefined ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: "#5a5750" }}>{t(lang, "Loading...", "Chargement...")}</div>
        </div>
      ) : documents.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: "#5a5750" }}>{t(lang, "No documents yet.", "Aucun document pour le moment.")}</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {documents.map((doc) => (
            <div
              key={doc._id}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 18px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 10,
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{doc.title}</div>
                <div style={{ fontSize: 11, color: "#5a5750" }}>
                  <span style={{ textTransform: "capitalize" }}>{doc.category}</span> · {new Date(doc.createdAt).toLocaleDateString(locale)}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  padding: "3px 8px", borderRadius: 20, fontSize: 10, fontWeight: 600,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                  color: statusColor[doc.status] || "#5a5750",
                  background: `${statusColor[doc.status] || "#5a5750"}15`,
                }}>
                  {statusLabel(lang, doc.status)}
                </span>
                <PdfDownloadButton storageId={doc.storageId} lang={lang} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PdfDownloadButton({ storageId, lang }: { storageId: Id<"_storage">; lang: Lang }) {
  const url = useQuery(api.documents.getFileUrl, { storageId });
  return (
    <a
      href={url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        padding: "5px 14px", background: "transparent", border: "1px solid #222",
        borderRadius: 6, color: "#c9a84c", fontSize: 12, cursor: url ? "pointer" : "wait",
        textDecoration: "none", opacity: url ? 1 : 0.5,
      }}
    >
      {t(lang, "Download", "Télécharger")}
    </a>
  );
}
