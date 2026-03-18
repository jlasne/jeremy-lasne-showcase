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

export default function SignInPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Forgot password state
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn("password", { email, password, flow: "signIn" });
      router.push("/app");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
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
      setError("Google sign-in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    setResetLoading(true);
    try {
      await signIn("password", { email: resetEmail, flow: "reset" });
      setResetSuccess(true);
    } catch {
      setResetError("Could not send reset email. Please check your email address.");
    } finally {
      setResetLoading(false);
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
            {showReset ? "Reset Password" : "Sign In"}
          </h1>
          <p style={{ fontSize: 14, color: "#5a5750" }}>
            {showReset ? "Enter your email to receive a reset link" : "Access your wealth architecture portal"}
          </p>
        </div>

        {showReset ? (
          // Reset password form
          <>
            {resetSuccess ? (
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: 14, color: "#c9a84c", background: "rgba(201,168,76,0.1)",
                  padding: "16px", borderRadius: 8, marginBottom: 24,
                }}>
                  If an account exists with that email, a password reset link has been sent. Please check your inbox.
                </div>
                <button
                  onClick={() => { setShowReset(false); setResetSuccess(false); setResetEmail(""); }}
                  style={{
                    background: "transparent", border: "none", color: "#c9a84c",
                    cursor: "pointer", fontSize: 14, textDecoration: "underline",
                  }}
                >
                  Back to sign in
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </div>

                {resetError && (
                  <div style={{ fontSize: 13, color: "#ef4444", background: "rgba(239,68,68,0.1)", padding: "10px 14px", borderRadius: 8 }}>
                    {resetError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={resetLoading}
                  style={{
                    padding: "12px 24px",
                    background: resetLoading ? "#5a5750" : "linear-gradient(135deg, #c9a84c, #d4b85a)",
                    color: "#0e0e0e", border: "none", borderRadius: 8, fontSize: 14,
                    fontWeight: 600, cursor: resetLoading ? "wait" : "pointer", marginTop: 8,
                  }}
                >
                  {resetLoading ? "Sending..." : "Send Reset Link"}
                </button>

                <button
                  type="button"
                  onClick={() => { setShowReset(false); setResetError(""); }}
                  style={{
                    background: "transparent", border: "none", color: "#9a9790",
                    cursor: "pointer", fontSize: 13, textAlign: "center",
                  }}
                >
                  Back to sign in
                </button>
              </form>
            )}
          </>
        ) : (
          // Main sign-in form
          <>
            {/* Google Sign-In Button */}
            <button
              onClick={handleGoogleSignIn}
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
                  style={inputStyle}
                />
                <div style={{ textAlign: "right", marginTop: 6 }}>
                  <button
                    type="button"
                    onClick={() => { setShowReset(true); setResetEmail(email); setError(""); }}
                    style={{
                      background: "transparent", border: "none", color: "#9a9790",
                      cursor: "pointer", fontSize: 12, textDecoration: "underline",
                      padding: 0,
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
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
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p style={{ textAlign: "center", fontSize: 13, color: "#5a5750", marginTop: 24 }}>
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" style={{ color: "#c9a84c", textDecoration: "none" }}>
                Sign up
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
