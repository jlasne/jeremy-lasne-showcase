"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OldNewContractPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/admin/new"); }, [router]);
  return <div style={{ color: "#5a5750", fontSize: 14 }}>Redirecting...</div>;
}
