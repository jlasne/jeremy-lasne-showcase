"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type Lang = "en" | "fr";
const t = (lang: Lang, en: string, fr: string) => lang === "en" ? en : fr;

export default function MeetingsPage() {
  const user = useQuery(api.users.currentUser);
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portal-lang") as Lang;
      if (saved) setLang(saved);
    } catch {}
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 24 }}>
        {t(lang, "Meetings", "Rendez-vous")}
      </h1>

      {/* Next Meeting */}
      <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: "24px 20px", marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: "#5a5750", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
          {t(lang, "Next meeting", "Prochain rendez-vous")}
        </div>
        {user?.nextMeeting ? (
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#c9a84c", marginBottom: 4 }}>
              {new Date(user.nextMeeting).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </div>
            <div style={{ fontSize: 15, color: "#9a9790" }}>
              {new Date(user.nextMeeting).toLocaleTimeString(lang === "fr" ? "fr-FR" : "en-US", { hour: "2-digit", minute: "2-digit" })}
            </div>
            {user.nextMeetingNote && (
              <div style={{ fontSize: 13, color: "#5a5750", marginTop: 8 }}>{user.nextMeetingNote}</div>
            )}
            {(user as any).nextMeetingLink && (
              <a href={(user as any).nextMeetingLink} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-block", marginTop: 12, padding: "8px 20px",
                background: "linear-gradient(135deg, #c9a84c, #d4b85a)", color: "#0e0e0e",
                textDecoration: "none", borderRadius: 8, fontSize: 13, fontWeight: 600,
              }}>
                {t(lang, "Join meeting", "Rejoindre le rendez-vous")}
              </a>
            )}
          </div>
        ) : (
          <div style={{ fontSize: 14, color: "#5a5750" }}>
            {t(lang, "No meeting scheduled yet.", "Aucun rendez-vous prévu pour le moment.")}
          </div>
        )}
      </div>

      {/* Contact CTA */}
      <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: "20px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#9a9790", marginBottom: 12 }}>
          {t(lang, "Need to schedule or reschedule?", "Besoin de planifier ou reprogrammer ?")}
        </p>
        <a
          href="mailto:hey@jeremylasne.com"
          style={{
            display: "inline-block", padding: "10px 24px",
            background: "transparent", border: "1px solid rgba(201,168,76,0.25)",
            color: "#c9a84c", textDecoration: "none", borderRadius: 8,
            fontSize: 13, fontWeight: 500,
          }}
        >
          {t(lang, "Contact your advisor", "Contacter votre conseiller")}
        </a>
      </div>
    </div>
  );
}
