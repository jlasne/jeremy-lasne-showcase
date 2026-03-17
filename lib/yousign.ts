const yousignApiKey = process.env.YOUSIGN_API_KEY;
const yousignBaseUrl = process.env.YOUSIGN_API_URL || "https://api-sandbox.yousign.app/v3";

export async function createSignatureRequest(params: {
  documentName: string;
  signerEmail: string;
  signerFirstName: string;
  signerLastName: string;
}) {
  if (!yousignApiKey) {
    console.log("[Yousign Stub] createSignatureRequest called:", params);
    return { id: `stub-${Date.now()}`, status: "draft" };
  }

  // Real implementation placeholder
  const response = await fetch(`${yousignBaseUrl}/signature_requests`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${yousignApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: params.documentName,
      delivery_mode: "email",
    }),
  });

  return response.json();
}

export async function getSignatureStatus(requestId: string) {
  if (!yousignApiKey) {
    console.log("[Yousign Stub] getSignatureStatus called:", requestId);
    return { id: requestId, status: "draft" };
  }

  const response = await fetch(`${yousignBaseUrl}/signature_requests/${requestId}`, {
    headers: { Authorization: `Bearer ${yousignApiKey}` },
  });

  return response.json();
}
