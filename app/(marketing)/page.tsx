"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";

const jlLogo = "/images/jl-logo.png";
const profileImg = "/images/jeremy-profile.png";
const performanceImg = "/images/performance-2025.png";
const amfCertImg = "/images/amf-certification.png";
const cifFormationImg = "/images/cif-formation.png";

type Lang = "en" | "fr";

const t = (lang: Lang, en: string, fr: string) => (lang === "en" ? en : fr);

const bookingUrl = (lang: Lang) => lang === "en"
  ? "https://cal.com/jeremy-lasne/discovery"
  : "https://cal.com/jeremy-lasne/decouverte";

/* --- Language Picker Popup --- */
const LangPopup = ({ onSelect }: { onSelect: (l: Lang) => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        background: "#161616", border: "1px solid #2a2a2a", borderRadius: 16,
        padding: "48px 56px", textAlign: "center", maxWidth: 400,
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 24 }}>
        Choose your language
      </div>
      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        {([["en", "English"], ["fr", "Fran\u00E7ais"]] as const).map(([code, label]) => (
          <motion.button
            key={code}
            onClick={() => onSelect(code)}
            whileHover={{ scale: 1.06, borderColor: "rgba(201,168,76,0.4)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "16px 36px", background: "#1a1a1a", border: "1px solid #2a2a2a",
              borderRadius: 10, color: "#e8e6e1", fontSize: 15, fontWeight: 500,
              cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em",
              transition: "border-color 0.2s",
            }}
          >
            {label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

/* --- FAQ Item with expand/collapse --- */
const FaqItem = ({ q, a, index }: { q: string; a: React.ReactNode; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={() => setOpen(!open)}
      style={{
        padding: "16px 20px", background: "#1a1a1a", border: "1px solid #222",
        borderRadius: 10, cursor: "pointer", transition: "border-color 0.2s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#e8e6e1" }}>{q}</div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          style={{ color: "#c9a84c", fontSize: 18, fontWeight: 300, flexShrink: 0, marginLeft: 16 }}
        >+</motion.span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p style={{ color: "#9a9790", fontSize: 15, lineHeight: 1.7, margin: 0, paddingTop: 14 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* --- Engagement Card --- */
const EngagementCard = ({ children, featured = false }: { children: React.ReactNode; featured?: boolean }) => (
  <motion.div
    whileHover={{ y: -3, boxShadow: featured ? "0 8px 40px rgba(201,168,76,0.15)" : "0 8px 30px rgba(0,0,0,0.3)" }}
    transition={{ duration: 0.25 }}
    style={{
      background: featured ? "rgba(201,168,76,0.08)" : "#1a1a1a",
      border: `1px solid ${featured ? "rgba(201,168,76,0.2)" : "#222"}`,
      borderRadius: 12,
      padding: "28px 32px",
      position: "relative",
      overflow: "hidden",
      cursor: "default",
    }}
  >
    {featured && (
      <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
    )}
    {children}
  </motion.div>
);

/* --- Value Card --- */
const ValueCard = ({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
  <motion.div
    whileHover={{ y: -4, borderColor: "rgba(201,168,76,0.3)" }}
    transition={{ duration: 0.2 }}
    style={{ textAlign: "center", padding: "28px 16px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 10, cursor: "default" }}
  >
    <motion.div
      whileHover={{ scale: 1.2, rotate: 5 }}
      style={{ fontSize: 24, marginBottom: 12, opacity: 0.7 }}
    >{icon}</motion.div>
    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: "#e8e6e1" }}>{title}</div>
    <div style={{ fontSize: 13, color: "#9a9790", lineHeight: 1.6 }}>{desc}</div>
  </motion.div>
);

/* --- Animated Section --- */
const Section = ({ children, style, className, id }: { children: React.ReactNode; style?: React.CSSProperties; className?: string; id?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={style}
      className={className}
      id={id}
    >
      {children}
    </motion.section>
  );
};

/* --- Shimmer CTA Button --- */
const CtaButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    whileHover={{ scale: 1.04, boxShadow: "0 8px 35px rgba(201,168,76,0.4)" }}
    whileTap={{ scale: 0.98 }}
    style={{
      display: "inline-block",
      padding: "15px 40px",
      background: "linear-gradient(135deg, #c9a84c, #d4b85a)",
      color: "#0e0e0e",
      textDecoration: "none",
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: "0.03em",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 4px 20px rgba(201,168,76,0.25)",
    }}
  >
    <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
  </motion.a>
);

/* --- Secondary CTA --- */
const SecondaryCtaButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    whileHover={{ borderColor: "rgba(201,168,76,0.5)", background: "rgba(201,168,76,0.08)" }}
    style={{
      display: "inline-block",
      padding: "12px 28px",
      background: "transparent",
      border: "1px solid rgba(201,168,76,0.25)",
      color: "#c9a84c",
      textDecoration: "none",
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 500,
      letterSpacing: "0.03em",
      transition: "all 0.2s",
    }}
  >
    {children}
  </motion.a>
);

/* --- Lightbox (fullscreen image viewer) --- */
const Lightbox = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.92)", backdropFilter: "blur(20px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "zoom-out", padding: 24,
    }}
  >
    <motion.img
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      src={src}
      alt={alt}
      onClick={(e) => e.stopPropagation()}
      style={{
        maxWidth: "90vw", maxHeight: "90vh", borderRadius: 12,
        border: "1px solid #333", objectFit: "contain", cursor: "default",
      }}
    />
    <button
      onClick={onClose}
      style={{
        position: "absolute", top: 24, right: 24,
        background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "50%", width: 44, height: 44, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: 20, fontFamily: "inherit",
      }}
    >
      {"\u2715"}
    </button>
  </motion.div>
);

/* --- Performance Bar --- */
const PerformanceBar = ({ label, value, color, maxVal, delay }: { label: string; value: number; color: string; maxVal: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const barWidth = Math.max((Math.abs(value) / maxVal) * 100, 2);
  const isNegative = value < 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{ marginBottom: 20 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <span style={{ fontSize: 14, color: "#9a9790", fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 24, fontWeight: 700, color, fontVariantNumeric: "tabular-nums" }}>
          {isNegative ? "" : "+"}{value}%
        </span>
      </div>
      <div style={{ height: 6, background: "#1a1a1a", borderRadius: 3, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${barWidth}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
          style={{
            height: "100%", borderRadius: 3,
            background: isNegative
              ? "linear-gradient(90deg, #e74c3c, #c0392b)"
              : `linear-gradient(90deg, ${color}, ${color}dd)`,
          }}
        />
      </div>
    </motion.div>
  );
};

/* --- useMediaQuery hook --- */
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
};

/* =========================================== */
/*                   MAIN                      */
/* =========================================== */

export default function WealthPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [showLangPopup, setShowLangPopup] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string } | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  /* scroll progress */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  /* lang init + popup */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("wealth-lang") as Lang;
      if (saved) {
        setLang(saved);
      } else {
        setShowLangPopup(true);
      }
    } catch {
      setShowLangPopup(true);
    }
  }, []);

  const changeLang = (l: Lang) => {
    setLang(l);
    setShowLangPopup(false);
    try { localStorage.setItem("wealth-lang", l); } catch {}
  };


  return (
    <div className="min-h-screen" style={{
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: "#e8e6e1",
      lineHeight: 1.75,
    }}>
      {/* LANGUAGE POPUP */}
      <AnimatePresence>
        {showLangPopup && <LangPopup onSelect={changeLang} />}
      </AnimatePresence>

      {/* FULLSCREEN IMAGE LIGHTBOX */}
      <AnimatePresence>
        {lightboxImg && <Lightbox src={lightboxImg.src} alt={lightboxImg.alt} onClose={() => setLightboxImg(null)} />}
      </AnimatePresence>

      {/* SCROLL PROGRESS BAR */}
      <motion.div style={{
        scaleX,
        position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 200,
        background: "linear-gradient(90deg, #c9a84c, #d4b85a)",
        transformOrigin: "0%",
      }} />

      {/* NAV */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed", top: 2, left: 0, right: 0, zIndex: 100,
          display: "flex", justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile ? "10px 16px" : "14px 40px",
          background: "rgba(14,14,14,0.88)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid #222",
        }}
      >
        {!isMobile && (
          <Link href="/" style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "#e8e6e1", textDecoration: "none" }}>
            Jeremy Lasne
          </Link>
        )}
        <img src={jlLogo} alt="JL" style={{ height: isMobile ? 28 : 32, borderRadius: 6 }} />
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 24 }}>
          <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", border: "1px solid #222", fontSize: 12 }}>
            <button onClick={() => changeLang("en")} style={{
              padding: "5px 12px", background: lang === "en" ? "#c9a84c" : "none", border: "none",
              color: lang === "en" ? "#0e0e0e" : "#5a5750", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: lang === "en" ? 600 : 500, letterSpacing: "0.05em",
              transition: "all 0.2s",
            }}>EN</button>
            <button onClick={() => changeLang("fr")} style={{
              padding: "5px 12px", background: lang === "fr" ? "#c9a84c" : "none", border: "none",
              color: lang === "fr" ? "#0e0e0e" : "#5a5750", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: lang === "fr" ? 600 : 500, letterSpacing: "0.05em",
              transition: "all 0.2s",
            }}>FR</button>
          </div>
          <motion.a
            href={bookingUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ borderColor: "rgba(201,168,76,0.5)", background: "rgba(201,168,76,0.08)" }}
            style={{
              padding: isMobile ? "6px 14px" : "8px 22px", background: "transparent", border: "1px solid rgba(201,168,76,0.2)",
              color: "#c9a84c", textDecoration: "none", borderRadius: 6, fontSize: isMobile ? 11 : 12, fontWeight: 500, letterSpacing: "0.04em",
              transition: "all 0.2s",
            }}
          >
            {t(lang, "Book a call", "RDV")}
          </motion.a>
        </div>
      </motion.nav>

      {/* HERO */}
      <div
        style={{
          minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          textAlign: "center", padding: isMobile ? "120px 20px 80px" : "140px 24px 100px", maxWidth: 900, margin: "0 auto", position: "relative",
        }}
      >

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 28 }}
        >
          {t(lang, "Private Wealth Architecture", "Architecture Patrimoniale Priv\u00E9e")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ fontSize: "clamp(34px, 5.5vw, 52px)", fontWeight: 300, lineHeight: 1.2, marginBottom: 28, letterSpacing: "-0.01em" }}
        >
          {t(lang, "Your wealth needs a ", "Votre patrimoine a besoin d\u2019un ")}
          <strong style={{ fontWeight: 700, background: "linear-gradient(135deg, #c9a84c, #e8d48a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {t(lang, "system", "syst\u00E8me")}
          </strong>
          {t(lang, ". Not scattered accounts.", ". Pas de comptes \u00E9parpill\u00E9s.")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{ fontSize: 17, fontWeight: 400, color: "#9a9790", maxWidth: 580, marginBottom: 48 }}
        >
          {t(lang,
            "A clear architecture to protect your capital, grow your purchasing power, and make confident decisions \u2014 instead of guessing.",
            "Une architecture claire pour prot\u00E9ger votre capital, gagner en pouvoir d\u2019achat et prendre des d\u00E9cisions en toute confiance \u2014 au lieu de naviguer \u00E0 vue."
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <CtaButton href={bookingUrl(lang)}>
            {t(lang, "Book your discovery call", "R\u00E9servez votre appel d\u00E9couverte")}
          </CtaButton>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          style={{ display: "block", marginTop: 16, fontSize: 12, color: "#5a5750", letterSpacing: "0.03em" }}
        >
          {t(lang, "20-min call \u00B7 Free \u00B7 No commitment \u00B7 Let\u2019s see if we\u2019re a match", "Appel de 20 min \u00B7 Gratuit \u00B7 Sans engagement \u00B7 Voyons si on peut matcher")}
        </motion.span>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1.5, duration: 0.5 }, y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
          style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)" }}
        >
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none" stroke="#5a5750" strokeWidth="1.5">
            <rect x="1" y="1" width="18" height="26" rx="9" />
            <motion.circle
              cx="10" cy="8" r="2" fill="#c9a84c"
              animate={{ cy: [8, 16, 8] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </div>

      <div style={{ width: 60, height: 1, background: "rgba(201,168,76,0.2)", margin: "0 auto" }} />

      {/* THE ENGAGEMENT — merged "L'accompagnement" + "Comment ça marche" */}
      <Section style={{ padding: isMobile ? "60px 16px" : "80px 24px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16, textAlign: "center" }}>
          {t(lang, "The engagement", "L\u2019accompagnement")}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8, textAlign: "center" }}>
          {t(lang, "From scattered to structured. Your rhythm, my expertise.", "Du d\u00E9sordre \u00E0 la structure. Votre rythme, mon expertise.")}
        </h2>
        <p style={{ color: "#9a9790", fontSize: 16, marginBottom: 48, textAlign: "center", maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
          {t(lang,
            "Expertise, accountability, and answers \u2014 with enough time to see real results.",
            "Expertise, accountability et r\u00E9ponses \u2014 avec le temps n\u00E9cessaire pour voir de vrais r\u00E9sultats."
          )}
        </p>

        {/* Process steps as timeline */}
        <div style={{ position: "relative", marginBottom: 48 }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute", left: isMobile ? 12 : 24, top: 0, bottom: 0, width: 1,
            background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.3) 10%, rgba(201,168,76,0.3) 90%, transparent)",
          }} />

          {[
            {
              step: "01",
              title: t(lang, "Discovery call", "Appel d\u00E9couverte"),
              desc: t(lang,
                "20-min free call. I show you my system. You tell me your situation. We see if there\u2019s a fit. No commitment, no pressure.",
                "Appel gratuit de 20 min. Je vous montre mon syst\u00E8me. Vous me parlez de votre situation. On voit si \u00E7a matche. Sans engagement, sans pression."
              ),
              icon: "\u260E",
              badge: t(lang, "Free", "Gratuit"),
            },
            {
              step: "02",
              title: t(lang, "Wealth Architecture Audit", "Audit d\u2019Architecture Patrimoniale"),
              desc: t(lang,
                "Deep intake session (1h30). I map your entire financial life. You receive a personalized wealth blueprint with 5\u201310 structural moves ordered by impact. Delivered in a private walkthrough session (1h).",
                "Session d\u2019intake approfondie (1h30). Je cartographie toute votre vie financi\u00E8re. Vous recevez un blueprint patrimonial personnalis\u00E9 avec 5 \u00E0 10 actions structurelles class\u00E9es par impact. Livr\u00E9 lors d\u2019une session de restitution priv\u00E9e (1h)."
              ),
              icon: "\u2727",
              badge: null,
            },
            {
              step: "03",
              title: t(lang, "Quarterly Reviews", "Revues Trimestrielles"),
              desc: t(lang,
                "45-min private session each quarter. We update your schema, track execution, adjust priorities. I bring macro context \u2014 where we are in the cycle and what it means for your architecture.",
                "Session priv\u00E9e de 45 min chaque trimestre. On met \u00E0 jour votre sch\u00E9ma, on suit l\u2019ex\u00E9cution, on ajuste les priorit\u00E9s. J\u2019apporte le contexte macro \u2014 o\u00F9 on en est dans le cycle et ce que \u00E7a signifie pour votre architecture."
              ),
              icon: "\u21BB",
              badge: null,
            },
            {
              step: "04",
              title: t(lang, "Direct contact + Newsletter", "Contact direct + Newsletter"),
              desc: t(lang,
                "You have direct access to me between sessions. No assistant, no ticketing system. Plus a private client newsletter a few times per month \u2014 macro updates, cycle positioning, and what it means for your architecture.",
                "Vous avez un acc\u00E8s direct \u00E0 moi entre les sessions. Pas d\u2019assistant, pas de syst\u00E8me de tickets. Plus une newsletter client priv\u00E9e quelques fois par mois \u2014 mises \u00E0 jour macro, positionnement de cycle, et ce que \u00E7a signifie pour votre architecture."
              ),
              icon: "\u2709",
              badge: t(lang, "Included", "Inclus"),
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{ display: "flex", gap: isMobile ? 16 : 24, marginBottom: isMobile ? 28 : 40, paddingLeft: isMobile ? 36 : 56, position: "relative" }}
            >
              {/* Dot on timeline */}
              <motion.div
                whileInView={{ scale: [0, 1.3, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 + 0.2 }}
                style={{
                  position: "absolute", left: isMobile ? 4 : 16, top: 4, width: 17, height: 17,
                  borderRadius: "50%", background: "#0e0e0e", border: "2px solid #c9a84c",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 8, color: "#c9a84c",
                }}
              >
                {item.icon}
              </motion.div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "#c9a84c", textTransform: "uppercase" }}>
                    {t(lang, "Step", "\u00C9tape")} {item.step}
                  </span>
                  {item.badge && (
                    <span style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                      padding: "2px 8px", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)",
                      borderRadius: 4, color: "#c9a84c",
                    }}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 6, color: "#e8e6e1" }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "#9a9790", lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <CtaButton href={bookingUrl(lang)}>
            {t(lang, "Book your free discovery call", "R\u00E9servez votre appel d\u00E9couverte gratuit")}
          </CtaButton>
        </div>
      </Section>

      <div style={{ width: 60, height: 1, background: "rgba(201,168,76,0.2)", margin: "0 auto" }} />

      {/* THE ARCHITECT — merged with "Indépendance" + profile pic + LinkedIn */}
      <Section style={{ padding: isMobile ? "60px 16px" : "80px 24px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16, textAlign: "center" }}>
          {t(lang, "The architect", "L\u2019architecte")}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 32, textAlign: "center" }}>
          {t(lang, "I\u2019m not a salesman. I\u2019m an investor who designs systems.", "Je ne suis pas un vendeur. Je suis un investisseur qui con\u00E7oit des syst\u00E8mes.")}
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "200px 1fr", gap: isMobile ? 24 : 40, alignItems: "start" }}>
          {/* Profile card */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 160, height: 160, borderRadius: "50%", overflow: "hidden",
              border: "3px solid rgba(201,168,76,0.3)", margin: "0 auto 16px",
              background: "linear-gradient(135deg, #c9a84c22, #1a1a1a)",
            }}>
              <img
                src={profileImg}
                alt="Jeremy Lasne"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#e8e6e1", marginBottom: 4 }}>Jeremy Lasne</div>
            <div style={{ fontSize: 12, color: "#9a9790", marginBottom: 12 }}>{t(lang, "Wealth Architect", "Architecte Patrimonial")}</div>
            <a
              href="https://www.linkedin.com/in/j%C3%A9r%C3%A9my-lasne-88148b223/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "8px 16px", background: "rgba(10,102,194,0.1)", border: "1px solid rgba(10,102,194,0.3)",
                borderRadius: 6, color: "#0a66c2", fontSize: 12, fontWeight: 500,
                textDecoration: "none", transition: "all 0.2s",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Bio text */}
          <div>
            <p style={{ color: "#9a9790", fontSize: 16, marginBottom: 16 }}>
              {t(lang,
                "I\u2019ve been deep in this world since 2017. I\u2019m strongly inspired by Charles Gave \u2014 I\u2019ve met him several times and built my entire macro framework around his work and Didier Darcet\u2019s econophysics. I worked private equity with Constant Helper. I run crypto and blockchain strategies myself.",
                "Je suis plong\u00E9 dans cet univers depuis 2017. Je suis profond\u00E9ment inspir\u00E9 par Charles Gave \u2014 je l\u2019ai rencontr\u00E9 plusieurs fois et j\u2019ai construit tout mon cadre macro autour de son travail et de l\u2019\u00E9cono-physique de Didier Darcet. J\u2019ai travaill\u00E9 en private equity avec Constant Helper. Je g\u00E8re moi-m\u00EAme des strat\u00E9gies crypto et blockchain."
              )}
            </p>
            <p style={{ color: "#9a9790", fontSize: 16, marginBottom: 16 }}>
              {t(lang,
                "I started my career as a CIF (Conseil en Investissements Financiers) under Euodia. I left because affiliation kills independence. Great people \u2014 but the model is built around selling products, not building systems. I chose freedom. Now I work for my clients and nobody else.",
                "J\u2019ai commenc\u00E9 ma carri\u00E8re comme CIF (Conseil en Investissements Financiers) sous Euodia. J\u2019ai quitt\u00E9 parce que l\u2019affiliation tue l\u2019ind\u00E9pendance. Des gens formidables \u2014 mais le mod\u00E8le est construit autour de la vente de produits, pas de la construction de syst\u00E8mes. J\u2019ai choisi la libert\u00E9. Maintenant je travaille pour mes clients et personne d\u2019autre."
              )}
            </p>
            <p style={{ color: "#9a9790", fontSize: 16, marginBottom: 0 }}>
              {t(lang,
                "My approach is structured, risk-managed, and diversified worldwide. I think in systems, not products. I manage risk the way it should be managed: simply.",
                "Mon approche est structur\u00E9e, g\u00E9r\u00E9e en risque et diversifi\u00E9e mondialement. Je pense en syst\u00E8mes, pas en produits. Je g\u00E8re le risque comme il devrait l\u2019\u00EAtre : simplement."
              )}
            </p>
          </div>
        </div>
      </Section>

      <div style={{ width: 60, height: 1, background: "rgba(201,168,76,0.2)", margin: "0 auto" }} />

      {/* TRACK RECORD & CREDENTIALS — 2025 */}
      <Section style={{ padding: isMobile ? "40px 16px" : "60px 24px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 12, textAlign: "center" }}>
          {t(lang, "2025 Results & Credentials", "R\u00E9sultats 2025 & Certifications")}
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 32, textAlign: "center" }}>
          {t(lang, "Not the full system. But people like to compare portfolio performance, so here you go.", "Pas le syst\u00E8me complet. Mais les gens aiment comparer les performances, alors voil\u00E0.")}
        </h2>

        {/* Performance bars — inline compact */}
        <div style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: 14, padding: isMobile ? "16px" : "24px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5a5750", marginBottom: 16, textAlign: "center" }}>
            {t(lang, "Year-to-date performance \u2014 2025", "Performance depuis le d\u00E9but d\u2019ann\u00E9e \u2014 2025")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: isMobile ? 12 : 20 }}>
            <PerformanceBar label={t(lang, "My Portfolio", "Mon Portfolio")} value={32} color="#c9a84c" maxVal={35} delay={0} />
            <PerformanceBar label={t(lang, "S&P 500 (USA)", "S&P 500 (USA)")} value={18} color="#4a90d9" maxVal={35} delay={0.12} />
            <PerformanceBar label={t(lang, "CAC 40 (France)", "CAC 40 (France)")} value={-1} color="#e74c3c" maxVal={35} delay={0.24} />
          </div>
        </div>

        {/* Proof thumbnails — 3 columns, click to enlarge */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 16 }}>
          {/* Brokerage screenshot */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={() => setLightboxImg({ src: performanceImg, alt: "Portfolio performance 2025" })}
            style={{ cursor: "zoom-in", borderRadius: 12, overflow: "hidden", border: "1px solid #2a2a2a", position: "relative", background: "#161616" }}
          >
            <img src={performanceImg} alt="Portfolio performance 2025" style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
            <div style={{ padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#e8e6e1", marginBottom: 2 }}>
                {t(lang, "Brokerage Proof", "Preuve Courtier")}
              </div>
              <div style={{ fontSize: 10, color: "#5a5750" }}>{t(lang, "Click to enlarge", "Cliquez pour agrandir")}</div>
            </div>
          </motion.div>

          {/* AMF Certificate */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={() => setLightboxImg({ src: amfCertImg, alt: "AMF Certification" })}
            style={{ cursor: "zoom-in", borderRadius: 12, overflow: "hidden", border: "1px solid #2a2a2a", position: "relative", background: "#161616" }}
          >
            <img src={amfCertImg} alt="AMF Certification" style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
            <div style={{ padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#e8e6e1", marginBottom: 2 }}>
                {t(lang, "AMF Exam \u2014 94 & 98/100", "Examen AMF \u2014 94 & 98/100")}
              </div>
              <div style={{ fontSize: 10, color: "#5a5750" }}>{t(lang, "Click to enlarge", "Cliquez pour agrandir")}</div>
            </div>
          </motion.div>

          {/* CIF Certificate */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={() => setLightboxImg({ src: cifFormationImg, alt: "CIF Formation Certificate" })}
            style={{ cursor: "zoom-in", borderRadius: 12, overflow: "hidden", border: "1px solid #2a2a2a", position: "relative", background: "#161616" }}
          >
            <img src={cifFormationImg} alt="CIF Formation Certificate" style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
            <div style={{ padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#e8e6e1", marginBottom: 2 }}>
                {t(lang, "CIF Formation \u2014 150h", "Formation CIF \u2014 150h")}
              </div>
              <div style={{ fontSize: 10, color: "#5a5750" }}>Yooper / Orica {"\u00B7"} 2024</div>
            </div>
          </motion.div>
        </div>

        {/* Credentials row — compact badges */}
        <div style={{ display: "flex", justifyContent: "center", gap: isMobile ? 10 : 16, marginTop: 20, flexWrap: "wrap" }}>
          {[
            { icon: "\uD83C\uDF93", label: t(lang, "Master\u2019s in Engineering", "Master Ing\u00E9nieur"), sub: t(lang, "IT, Blockchain & Finance", "IT, Blockchain & Finance") },
            { icon: "\u2713", label: t(lang, "AMF Certified", "Certifi\u00E9 AMF"), sub: "94/100 & 98/100" },
            { icon: "\u2713", label: t(lang, "CIF Trained", "Form\u00E9 CIF"), sub: "150h \u00B7 Orica 2024" },
          ].map((badge) => (
            <div key={badge.label} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 16px",
              background: "#161616", border: "1px solid #2a2a2a", borderRadius: 10,
            }}>
              <span style={{ fontSize: 18 }}>{badge.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e8e6e1" }}>{badge.label}</div>
                <div style={{ fontSize: 11, color: "#5a5750" }}>{badge.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div style={{ width: 60, height: 1, background: "rgba(201,168,76,0.2)", margin: "0 auto" }} />

      {/* YOUR TERMS */}
      <Section style={{ padding: isMobile ? "60px 16px" : "80px 24px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16 }}>
          {t(lang, "Your terms", "Vos conditions")}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 32 }}>
          {t(lang, "Private by design. Personal by nature.", "Priv\u00E9 par conception. Personnel par nature.")}
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(180px, 1fr))", gap: isMobile ? 12 : 20 }}>
          <ValueCard icon={"\u2697"} title={t(lang, "Preserve wealth", "Pr\u00E9server le patrimoine")} desc={t(lang, "Protect what you\u2019ve built. Structure before speculation.", "Prot\u00E9ger ce que vous avez construit. La structure avant la sp\u00E9culation.")} />
          <ValueCard icon={"\u21E7"} title={t(lang, "Grow purchasing power", "Gagner en pouvoir d\u2019achat")} desc={t(lang, "Beat inflation, compound quietly. Real wealth is measured in what you can do.", "Battre l\u2019inflation, composer en silence. La vraie richesse se mesure \u00E0 ce que vous pouvez faire.")} />
          <ValueCard icon={"\u25C6"} title={t(lang, "Respect your identity", "Respecter votre identit\u00E9")} desc={t(lang, "Your values, preferences, and privacy shape the architecture. Not the other way around.", "Vos valeurs, pr\u00E9f\u00E9rences et votre vie priv\u00E9e fa\u00E7onnent l\u2019architecture. Pas l\u2019inverse.")} />
          <ValueCard icon={"\uD83D\uDD12"} title={t(lang, "Privacy & security", "Confidentialit\u00E9 & s\u00E9curit\u00E9")} desc={t(lang, "Everything under NDA. No third parties, no platforms storing your data. Cybersecurity-certified engineer.", "Tout sous NDA. Pas de tiers, pas de plateforme stockant vos donn\u00E9es. Ing\u00E9nieur certifi\u00E9 en cybers\u00E9curit\u00E9.")} />
        </div>

        {/* Mid-page CTA */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <SecondaryCtaButton href={bookingUrl(lang)}>
            {t(lang, "Let\u2019s talk about your situation", "Parlons de votre situation")}
          </SecondaryCtaButton>
        </div>
      </Section>

      <hr style={{ maxWidth: 760, margin: "0 auto", border: "none", borderTop: "1px solid #222" }} />

      {/* OBJECTION HANDLING */}
      <Section style={{ padding: isMobile ? "60px 16px" : "80px 24px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16 }}>
          {t(lang, "Common questions", "Questions fr\u00E9quentes")}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 32 }}>
          {t(lang, "You\u2019re thinking about it. Here\u2019s what I\u2019d say.", "Vous y r\u00E9fl\u00E9chissez. Voici ce que je r\u00E9pondrais.")}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            {
              q: t(lang, "\u201CI already have a financial advisor.\u201D", "\u00AB J\u2019ai d\u00E9j\u00E0 un conseiller financier. \u00BB"),
              a: lang === "en" ? (<>Good. Keep them. But understand what they are: <strong style={{ color: "#e8e6e1" }}>a distribution channel, not a strategist.</strong> If they don’t charge you directly, ask yourself: <strong style={{ color: "#e8e6e1" }}>who’s paying them?</strong> Their revenue comes from the products they place — that’s the model. Being a CIF is a regulatory label, not an expertise badge. I don’t replace your advisor. I design <strong style={{ color: "#e8e6e1" }}>the architecture those products should fit into.</strong> Most of my clients keep their advisors. They just finally understand what they’re being sold and why.</>) : (<>Très bien. Gardez-le. Mais comprenez ce qu’il est : <strong style={{ color: "#e8e6e1" }}>un canal de distribution, pas un stratège.</strong> S’il ne vous facture pas directement, demandez-vous : <strong style={{ color: "#e8e6e1" }}>qui le paie ?</strong> Son revenu vient des produits qu’il place — c’est le modèle. Être CIF est un label réglementaire, pas un badge d’expertise. Je ne remplace pas votre conseiller. Je conçois <strong style={{ color: "#e8e6e1" }}>l’architecture dans laquelle ces produits devraient s’intégrer.</strong> La plupart de mes clients gardent leurs conseillers. Ils comprennent juste enfin ce qu’on leur vend et pourquoi.</>),
            },
            {
              q: t(lang, "\u201CMy bank handles my wealth.\u201D", "\u00AB Ma banque g\u00E8re mon patrimoine. \u00BB"),
              a: lang === "en" ? (<>Your bank sees <strong style={{ color: "#e8e6e1" }}>one slice of your assets</strong> — the slice they hold. They don’t know what’s at your other bank, in your company, or in your real estate. They optimize for their products, not your situation. I see <strong style={{ color: "#e8e6e1" }}>the full board</strong> — across all your banks, structures, tax wrappers, and cash flows. That’s the difference between managing accounts and <strong style={{ color: "#e8e6e1" }}>designing a system.</strong></>) : (<>Votre banque voit <strong style={{ color: "#e8e6e1" }}>une tranche de vos actifs</strong> — celle qu’elle détient. Elle ne sait pas ce qu’il y a dans votre autre banque, dans votre société, ou dans votre immobilier. Elle optimise pour ses produits, pas pour votre situation. Moi je vois <strong style={{ color: "#e8e6e1" }}>le tableau complet</strong> — toutes vos banques, structures, enveloppes fiscales et flux. C’est la différence entre gérer des comptes et <strong style={{ color: "#e8e6e1" }}>concevoir un système.</strong></>),
            },
            {
              q: t(lang, "\u201CI don\u2019t have time for this.\u201D", "\u00AB Je n\u2019ai pas le temps pour \u00E7a. \u00BB"),
              a: lang === "en" ? (<>One 90-minute intake. One 60-minute delivery. Then 45 minutes per quarter. <strong style={{ color: "#e8e6e1" }}>Less than 6 hours a year</strong> to have a system managing your entire financial life. You spend more time than that choosing a car.</>) : (<>Un intake de 90 minutes. Une restitution de 60 minutes. Puis 45 minutes par trimestre. <strong style={{ color: "#e8e6e1" }}>Moins de 6 heures par an</strong> pour avoir un système qui gère toute votre vie financière. Vous passez plus de temps que ça à choisir une voiture.</>),
            },
            {
              q: t(lang, "\u201CThat\u2019s expensive for advice.\u201D", "\u00AB C\u2019est cher pour du conseil. \u00BB"),
              a: lang === "en" ? (<>That’s why we talk first — the discovery call is free. But consider: <strong style={{ color: "#e8e6e1" }}>the cost of missed opportunities is far higher.</strong> Money sitting idle, a tax wrapper you didn’t know about, borrowing power you’re not using. The majority of investors — even aware ones — <strong style={{ color: "#e8e6e1" }}>end up losing money by following trends and making emotional decisions.</strong> One structural adjustment typically saves more than the entire engagement. This isn’t an expense — <strong style={{ color: "#e8e6e1" }}>it’s the highest-leverage investment you’ll make.</strong></>) : (<>C’est pour ça qu’on en parle d’abord — l’appel découverte est gratuit. Mais réfléchissez : <strong style={{ color: "#e8e6e1" }}>le coût des opportunités manquées est bien plus élevé.</strong> De l’argent qui dort, une enveloppe fiscale que vous ne connaissiez pas, un pouvoir d’emprunt inutilisé. La majorité des investisseurs, même avertis, <strong style={{ color: "#e8e6e1" }}>finissent par perdre en suivant les tendances et en prenant des décisions émotionnelles.</strong> Un seul ajustement structurel économise plus que tout l’accompagnement. Ce n’est pas une dépense — <strong style={{ color: "#e8e6e1" }}>c’est l’investissement le plus levier que vous ferez.</strong></>),
            },
            {
              q: t(lang, "\u201CI can figure this out myself.\u201D", "\u00AB Je peux le faire tout seul. \u00BB"),
              a: lang === "en" ? (<>People always say that — <strong style={{ color: "#e8e6e1" }}>and always postpone.</strong> Meanwhile they listen to the news, follow influencers, and rely on information that’s often wrong or months behind reality. I offer <strong style={{ color: "#e8e6e1" }}>precision</strong> where you have approximation. <strong style={{ color: "#e8e6e1" }}>Understanding</strong> where you have confusion. <strong style={{ color: "#e8e6e1" }}>Simplicity</strong> where you have complexity. And <strong style={{ color: "#e8e6e1" }}>accountability</strong> — someone who makes sure you actually execute, not just plan. You don’t need more information. <strong style={{ color: "#e8e6e1" }}>You need a system and someone holding the blueprint.</strong></>) : (<>Tout le monde dit ça — <strong style={{ color: "#e8e6e1" }}>et repousse toujours.</strong> Entre-temps on écoute les infos, on suit des influenceurs, et on se fie à des informations souvent fausses ou en retard de mois. J’offre de la <strong style={{ color: "#e8e6e1" }}>précision</strong> là où vous avez de l’approximation. De la <strong style={{ color: "#e8e6e1" }}>compréhension</strong> là où vous avez de la confusion. De la <strong style={{ color: "#e8e6e1" }}>simplicité</strong> là où vous avez de la complexité. Et de l’<strong style={{ color: "#e8e6e1" }}>accountability</strong> — quelqu’un qui s’assure que vous exécutez vraiment. <strong style={{ color: "#e8e6e1" }}>Vous n’avez pas besoin de plus d’information. Vous avez besoin d’un système.</strong></>),
            },
          ].map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>
      </Section>

      <hr style={{ maxWidth: 760, margin: "0 auto", border: "none", borderTop: "1px solid #222" }} />

      {/* FINAL CTA */}
      <Section id="book" style={{ textAlign: "center", padding: isMobile ? "60px 16px 80px" : "100px 24px 140px", maxWidth: 760, margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
        <h2 style={{ fontSize: 32, fontWeight: 600, marginBottom: 16 }}>
          {t(lang, "Ready to architect your wealth?", "Pr\u00EAt \u00E0 structurer votre patrimoine ?")}
        </h2>
        <p style={{ color: "#9a9790", marginBottom: 36, fontSize: 16 }}>
          {t(lang, "20-minute discovery call. Free. No commitment. Let\u2019s see if we can work together.", "Appel d\u00E9couverte de 20 minutes. Gratuit. Sans engagement. Voyons si on peut travailler ensemble.")}
        </p>
        <CtaButton href={bookingUrl(lang)}>
          {t(lang, "Book your discovery call", "R\u00E9servez votre appel d\u00E9couverte")}
        </CtaButton>
        <div style={{ marginTop: 20, fontSize: 13, color: "#5a5750" }}>
          {t(lang, "or email me directly at ", "ou \u00E9crivez-moi directement \u00E0 ")}
          <a href="mailto:hey@jeremylasne.com" style={{ color: "#c9a84c", textDecoration: "none" }}>hey@jeremylasne.com</a>
        </div>
      </Section>

      {/* FOOTER */}
      <footer style={{
        padding: isMobile ? "20px 16px" : "28px 40px", borderTop: "1px solid #222",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: isMobile ? 11 : 12, color: "#5a5750", letterSpacing: "0.02em", flexWrap: "wrap", gap: 8,
        flexDirection: isMobile ? "column" : "row", textAlign: isMobile ? "center" : undefined,
      }}>
        <span>{t(lang, "Private & confidential \u00B7 Your preferences, your architecture", "Priv\u00E9 & confidentiel \u00B7 Vos pr\u00E9f\u00E9rences, votre architecture")}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a
            href="https://www.linkedin.com/in/j%C3%A9r%C3%A9my-lasne-88148b223/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#5a5750", textDecoration: "none", transition: "color 0.2s" }}
          >
            LinkedIn
          </a>
          <Link href="/" style={{ color: "#9a9790", textDecoration: "none" }}>jeremylasne.com</Link>
        </div>
      </footer>
    </div>
  );
}
