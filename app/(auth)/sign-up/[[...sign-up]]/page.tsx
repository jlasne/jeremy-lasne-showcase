"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn("password", { email, password, flow: "signUp", name: `${firstName} ${lastName}`.trim() });
      router.push("/app");
    } catch {
      setError("Could not create account. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0e0e0e", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 400, padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 24 }}>
              Jeremy Lasne
            </div>
          </Link>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: "#e8e6e1", marginBottom: 8 }}>
            Create Account
          </h1>
          <p style={{ fontSize: 14, color: "#5a5750" }}>
            Join the wealth architecture portal
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#9a9790", marginBottom: 6 }}>
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{
                  width: "100%", padding: "12px 14px", background: "#1a1a1a",
                  border: "1px solid #333", borderRadius: 8, color: "#e8e6e1",
                  fontSize: 14, outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#9a9790", marginBottom: 6 }}>
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{
                  width: "100%", padding: "12px 14px", background: "#1a1a1a",
                  border: "1px solid #333", borderRadius: 8, color: "#e8e6e1",
                  fontSize: 14, outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#9a9790", marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%", padding: "12px 14px", background: "#1a1a1a",
                border: "1px solid #333", borderRadius: 8, color: "#e8e6e1",
                fontSize: 14, outline: "none", boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#9a9790", marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              style={{
                width: "100%", padding: "12px 14px", background: "#1a1a1a",
                border: "1px solid #333", borderRadius: 8, color: "#e8e6e1",
                fontSize: 14, outline: "none", boxSizing: "border-box",
              }}
            />
            <div style={{ fontSize: 12, color: "#5a5750", marginTop: 4 }}>Minimum 8 characters</div>
          </div>

          {error && (
            <div style={{ fontSize: 13, color: "#ef4444", background: "rgba(239,68,68,0.1)", padding: "10px 14px", borderRadius: 8 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 24px", background: loading ? "#5a5750" : "linear-gradient(135deg, #c9a84c, #d4b85a)",
              color: "#0e0e0e", border: "none", borderRadius: 8, fontSize: 14,
              fontWeight: 600, cursor: loading ? "wait" : "pointer", marginTop: 8,
            }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 13, color: "#5a5750", marginTop: 24 }}>
          Already have an account?{" "}
          <Link href="/sign-in" style={{ color: "#c9a84c", textDecoration: "none" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
