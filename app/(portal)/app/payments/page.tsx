"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type Lang = "en" | "fr";
const t = (lang: Lang, en: string, fr: string) => lang === "en" ? en : fr;

const statusLabel = (lang: Lang, status: string) => {
  const labels: Record<string, Record<Lang, string>> = {
    pending: { en: "Pending", fr: "En attente" },
    completed: { en: "Paid", fr: "Payé" },
    failed: { en: "Failed", fr: "Échoué" },
    refunded: { en: "Refunded", fr: "Remboursé" },
  };
  return labels[status]?.[lang] || status;
};

const statusColor: Record<string, string> = {
  pending: "#c9a84c", completed: "#4ade80", failed: "#ef4444", refunded: "#5a5750",
};

export default function PaymentsPage() {
  const user = useQuery(api.users.currentUser);
  const payments = useQuery(api.payments.listByClient, user?._id ? { clientId: user._id } : "skip");
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
        {t(lang, "Payments", "Paiements")}
      </h1>

      {payments === undefined ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: "#5a5750" }}>{t(lang, "Loading...", "Chargement...")}</div>
        </div>
      ) : payments.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: "#5a5750" }}>{t(lang, "No payments yet.", "Aucun paiement pour le moment.")}</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {payments.map((payment) => (
            <div
              key={payment._id}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 18px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 10,
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>
                  {payment.type === "audit"
                    ? t(lang, "Wealth Architecture Audit", "Audit d'Architecture Patrimoniale")
                    : t(lang, "Quarterly Review", "Revue Trimestrielle")}
                  {payment.description && ` — ${payment.description}`}
                </div>
                <div style={{ fontSize: 11, color: "#5a5750" }}>
                  {new Date(payment.createdAt).toLocaleDateString(locale)}
                  {payment.paidAt && ` · ${t(lang, "Paid", "Payé")} ${new Date(payment.paidAt).toLocaleDateString(locale)}`}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>
                  {new Intl.NumberFormat(locale, { style: "currency", currency: payment.currency }).format(payment.amount / 100)}
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", color: statusColor[payment.status] || "#5a5750" }}>
                  {statusLabel(lang, payment.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
