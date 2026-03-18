"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inputStyle = {
  width: "100%" as const,
  padding: "12px 14px",
  background: "#1a1a1a",
  border: "1px solid #333",
  borderRadius: 8,
  color: "#e8e6e1",
  fontSize: 14,
  outline: "none" as const,
  boxSizing: "border-box" as const,
};

const labelStyle = {
  display: "block" as const,
  fontSize: 13,
  fontWeight: 500,
  color: "#9a9790",
  marginBottom: 6,
};

export default function SignUpPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

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

  const handleGoogleSignUp = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const result = await signIn("google", { redirectTo: "/app" });
      if (result && typeof result === "object" && "redirect" in result) {
        window.location.href = (result as { redirect: string | URL }).redirect.toString();
        return;
      }
      router.push("/app");
    } catch {
      setError("Google sign-up failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
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

        {/* Google Sign-Up Button */}
        <button
          onClick={handleGoogleSignUp}
          disabled={googleLoading}
          style={{
            width: "100%",
            padding: "12px 24px",
            background: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: 8,
            color: "#e8e6e1",
            fontSize: 14,
            fontWeight: 500,
            cursor: googleLoading ? "wait" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            boxSizing: "border-box",
          }}
        >
          {/* Google "G" logo */}
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.0 24.0 0 0 0 0 21.56l7.98-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            <path fill="none" d="M0 0h48v48H0z"/>
          </svg>
          {googleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
          <div style={{ flex: 1, height: 1, background: "#333" }} />
          <span style={{ fontSize: 12, color: "#5a5750", textTransform: "uppercase", letterSpacing: "0.1em" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "#333" }} />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              style={inputStyle}
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
              padding: "12px 24px",
              background: loading ? "#5a5750" : "linear-gradient(135deg, #c9a84c, #d4b85a)",
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
