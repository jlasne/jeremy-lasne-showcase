"use client";

export default function PaymentsPage() {
  // TODO: useQuery(api.payments.listByClient, { clientId }) when Convex is connected
  const payments: Array<{ _id: string; amount: number; currency: string; type: string; status: string; description?: string; paidAt?: number; createdAt: number }> = [];

  const statusColor: Record<string, string> = {
    pending: "#c9a84c",
    completed: "#4ade80",
    failed: "#ef4444",
    refunded: "#5a5750",
  };

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Payments</h1>
      <p style={{ color: "#9a9790", fontSize: 14, marginBottom: 32 }}>Your payment history.</p>

      {payments.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "60px 20px",
          background: "#1a1a1a", border: "1px solid #222", borderRadius: 12,
        }}>
          <div style={{ fontSize: 14, color: "#5a5750" }}>No payments recorded yet.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {payments.map((payment) => (
            <div
              key={payment._id}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "16px 20px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 10,
              }}
            >
              <div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>
                  {payment.type === "audit" ? "Wealth Architecture Audit" : "Quarterly Review"}
                  {payment.description && ` — ${payment.description}`}
                </div>
                <div style={{ fontSize: 12, color: "#5a5750" }}>
                  {new Date(payment.createdAt).toLocaleDateString()}
                  {payment.paidAt && ` · Paid ${new Date(payment.paidAt).toLocaleDateString()}`}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>
                  {new Intl.NumberFormat("fr-FR", { style: "currency", currency: payment.currency }).format(payment.amount / 100)}
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 600, textTransform: "uppercase",
                  color: statusColor[payment.status] || "#5a5750",
                }}>
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
