import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
import jlLogo from "../assets/jl-logo.png";

type Lang = "en" | "fr";

const t = (lang: Lang, en: string, fr: string) => (lang === "en" ? en : fr);

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
            whileHover={{ scale: 1.05, borderColor: "rgba(201,168,76,0.5)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "14px 36px", background: "transparent",
              border: "1px solid #333", borderRadius: 8,
              color: "#e8e6e1", fontSize: 15, fontWeight: 500,
              cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.03em",
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

/* --- FAQ Accordion Item --- */
const FaqItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={() => setOpen(!open)}
      style={{
        cursor: "pointer",
        padding: "24px 28px",
        background: open ? "rgba(201,168,76,0.06)" : "#1a1a1a",
        border: `1px solid ${open ? "rgba(201,168,76,0.2)" : "#222"}`,
        borderRadius: 12,
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#e8e6e1" }}>{q}</div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: "#c9a84c", fontSize: 22, fontWeight: 300, flexShrink: 0, lineHeight: 1 }}
        >+</motion.span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
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
const Section = ({ children, ...props }: React.HTMLAttributes<HTMLElement> & { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.section>
  );
};

/* --- Shimmer CTA Button --- */
const CtaButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.a
    href={href}
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

/* --- Price with launch offer --- */
const LaunchPrice = ({ full, offer, lang }: { full: string; offer: string; lang: Lang }) => (
  <span style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
    <span style={{ fontSize: 14, color: "#5a5750", textDecoration: "line-through", fontWeight: 400 }}>{full}</span>
    <span style={{ fontSize: 17, fontWeight: 700, color: "#c9a84c" }}>{offer}</span>
    <span style={{
      fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
      padding: "3px 8px", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)",
      borderRadius: 4, color: "#c9a84c", whiteSpace: "nowrap",
    }}>
      {t(lang, "First 10 clients", "10 premiers clients")}
    </span>
  </span>
);

/* =========================================== */
/*                   MAIN                      */
/* =========================================== */

const Wealth = () => {
  const [lang, setLang] = useState<Lang>("en");
  const [showLangPopup, setShowLangPopup] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);
  const svgInView = useInView(svgRef, { once: true, margin: "-100px" });

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

  /* hero mouse-follow glow */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  return (
    <div className="min-h-screen" style={{
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      background: "#0e0e0e",
      color: "#e8e6e1",
      lineHeight: 1.75,
    }}>
      {/* LANGUAGE POPUP */}
      <AnimatePresence>
        {showLangPopup && <LangPopup onSelect={changeLang} />}
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
          display: "grid", gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          padding: "14px 40px",
          background: "rgba(14,14,14,0.88)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid #222",
        }}
      >
        {/* Left: name */}
        <Link to="/" style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "#e8e6e1", textDecoration: "none" }}>
          Jeremy Lasne
        </Link>

        {/* Center: logo */}
        <img src={jlLogo} alt="JL" style={{ height: 32, borderRadius: 6 }} />

        {/* Right: lang + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, justifyContent: "flex-end" }}>
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
            href="#book"
            whileHover={{ borderColor: "rgba(201,168,76,0.5)", background: "rgba(201,168,76,0.08)" }}
            style={{
              padding: "8px 22px", background: "transparent", border: "1px solid rgba(201,168,76,0.2)",
              color: "#c9a84c", textDecoration: "none", borderRadius: 6, fontSize: 12, fontWeight: 500, letterSpacing: "0.04em",
              transition: "all 0.2s",
            }}
          >
            {t(lang, "Book a call", "Prendre rendez-vous")}
          </motion.a>
        </div>
      </motion.nav>

      {/* HERO */}
      <div
        ref={heroRef}
        onMouseMove={handleMouseMove}
        style={{
          minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          textAlign: "center", padding: "140px 24px 100px", maxWidth: 900, margin: "0 auto", position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Mouse-follow glow */}
        <div style={{
          position: "absolute",
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: "translate(-50%, -50%)",
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 60%)",
          pointerEvents: "none",
          transition: "left 0.3s ease-out, top 0.3s ease-out",
        }} />

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
            "I\u2019ve been investing since 2017. I studied how the wealthiest families protect and grow capital \u2014 then I built a method that brings that thinking to individuals. Shaped around your life, your preferences, your privacy. I built it for myself first. On the call, I\u2019ll show you the architecture running on my own capital.",
            "J\u2019investis depuis 2017. J\u2019ai \u00E9tudi\u00E9 comment les grandes familles prot\u00E8gent et font cro\u00EEtre leur capital \u2014 puis j\u2019ai construit une m\u00E9thode qui apporte cette r\u00E9flexion aux particuliers. Fa\u00E7onn\u00E9e autour de votre vie, vos pr\u00E9f\u00E9rences, votre confidentialit\u00E9. Je l\u2019ai d\u2019abord construite pour moi. Lors de l\u2019appel, je vous montrerai l\u2019architecture qui tourne sur mon propre capital."
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <CtaButton href="#book">
            {t(lang, "Book your discovery call", "R\u00E9servez votre appel d\u00E9couverte")}
          </CtaButton>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          style={{ display: "block", marginTop: 16, fontSize: 12, color: "#5a5750", letterSpacing: "0.03em" }}
        >
          {t(lang, "30-min call \u00B7 Free \u00B7 I show you my system before I ask about yours", "Appel de 30 min \u00B7 Gratuit \u00B7 Je vous montre mon syst\u00E8me avant de vous poser des questions")}
        </motion.span>

        {/* Scroll hint */}
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

      {/* SCHEMA SECTION */}
      <Section style={{ padding: "100px 24px", maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16 }}>
          {t(lang, "The methodology", "La m\u00E9thodologie")}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 16 }}>
          {t(lang, "A complete system. Not a spreadsheet.", "Un syst\u00E8me complet. Pas un tableur.")}
        </h2>
        <p style={{ color: "#9a9790", fontSize: 16, maxWidth: 560, margin: "0 auto 48px" }}>
          {t(lang,
            "Every client gets a personalized wealth flow schema. A living blueprint that maps every euro from income to investment to protection. This isn\u2019t a pie chart. It\u2019s the operating system of your wealth.",
            "Chaque client re\u00E7oit un sch\u00E9ma de flux patrimonial personnalis\u00E9. Un blueprint vivant qui cartographie chaque euro du revenu \u00E0 l\u2019investissement \u00E0 la protection. Ce n\u2019est pas un camembert. C\u2019est le syst\u00E8me d\u2019exploitation de votre patrimoine."
          )}
        </p>

        <div style={{
          position: "relative", background: "#161616", border: "1px solid #2a2a2a", borderRadius: 16, padding: "48px 32px", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)" }} />
          <div style={{
            display: "inline-block", padding: "6px 16px", background: "rgba(201,168,76,0.08)",
            border: "1px solid rgba(201,168,76,0.2)", borderRadius: 100,
            fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 32,
          }}>
            {t(lang, "Example blueprint", "Blueprint exemple")}
          </div>

          {/* SVG Schema with draw-in animation */}
          <div ref={svgRef} style={{ maxWidth: 700, margin: "0 auto" }}>
            <svg viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg" fill="none" style={{ width: "100%", height: "auto" }}>
              <defs>
                <marker id="arrow" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
                  <path d="M0 0L10 3.5L0 7z" fill="#c9a84c" opacity="0.5"/>
                </marker>
                <filter id="glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <radialGradient id="radGlow"><stop offset="0%" stopColor="#c9a84c"/><stop offset="100%" stopColor="transparent"/></radialGradient>
              </defs>

              <g style={{ opacity: svgInView ? 1 : 0, transition: "opacity 0.8s ease 0.2s" }}>
                {/* Person icon */}
                <circle cx="350" cy="28" r="16" fill="#2a2a2a" stroke="#c9a84c" strokeWidth="1"/>
                <circle cx="350" cy="22" r="5" fill="#c9a84c" opacity="0.6"/>
                <path d="M341 34 c0-5 8-9 9-9 s9 4 9 9" stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.6"/>
              </g>

              {/* Cash Management Layer */}
              <g style={{ opacity: svgInView ? 1 : 0, transition: "opacity 0.6s ease 0.4s" }}>
                <rect x="130" y="70" width="440" height="90" rx="10" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1"/>
                <text x="350" y="64" textAnchor="middle" fill="#c9a84c" fontSize="9" fontWeight="600" letterSpacing="0.1em" fontFamily="Inter,sans-serif">CASH MANAGEMENT</text>
                <rect x="320" y="85" width="120" height="34" rx="6" fill="#222" stroke="#333" strokeWidth="1"/>
                <text x="380" y="106" textAnchor="middle" fill="#e8e6e1" fontSize="10" fontFamily="Inter,sans-serif">Current Account</text>
                <rect x="180" y="85" width="120" height="34" rx="6" fill="#222" stroke="#c9a84c" strokeWidth="1" opacity="0.8"/>
                <text x="240" y="102" textAnchor="middle" fill="#e8e6e1" fontSize="9" fontWeight="600" fontFamily="Inter,sans-serif">Cash Reserve</text>
                <text x="240" y="114" textAnchor="middle" fill="#9a9790" fontSize="7.5" fontFamily="Inter,sans-serif">Min threshold</text>
                <rect x="150" y="125" width="80" height="26" rx="5" fill="#222" stroke="#333" strokeWidth="1"/>
                <text x="190" y="142" textAnchor="middle" fill="#9a9790" fontSize="9" fontFamily="Inter,sans-serif">Savings</text>
                <rect x="520" y="85" width="70" height="34" rx="6" fill="#c9a84c" opacity="0.12" stroke="#c9a84c" strokeWidth="1"/>
                <text x="555" y="106" textAnchor="middle" fill="#c9a84c" fontSize="10" fontWeight="600" fontFamily="Inter,sans-serif">Life</text>
              </g>

              {/* Flow lines - animate in */}
              <g style={{ opacity: svgInView ? 1 : 0, transition: "opacity 0.6s ease 0.7s" }}>
                <line x1="350" y1="48" x2="380" y2="82" stroke="#c9a84c" strokeWidth="1" opacity="0.4" markerEnd="url(#arrow)"/>
                <text x="395" y="60" fill="#9a9790" fontSize="7.5" fontFamily="Inter,sans-serif">Activity Revenue</text>
                <line x1="318" y1="102" x2="302" y2="102" stroke="#c9a84c" strokeWidth="1" opacity="0.3" markerEnd="url(#arrow)"/>
                <line x1="442" y1="102" x2="518" y2="102" stroke="#c9a84c" strokeWidth="1" opacity="0.3" markerEnd="url(#arrow)"/>
                <text x="475" y="96" fill="#9a9790" fontSize="7" fontFamily="Inter,sans-serif">Expenses</text>
                <text x="540" y="132" fill="#9a9790" fontSize="7" fontFamily="Inter,sans-serif">Taxes</text>
              </g>

              {/* Liquid Strategy Layer */}
              <g style={{ opacity: svgInView ? 1 : 0, transition: "opacity 0.6s ease 0.9s" }}>
                <rect x="130" y="200" width="340" height="100" rx="10" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1"/>
                <text x="300" y="194" textAnchor="middle" fill="#c9a84c" fontSize="9" fontWeight="600" letterSpacing="0.1em" fontFamily="Inter,sans-serif">LIQUID STRATEGY</text>
                <rect x="150" y="218" width="140" height="42" rx="6" fill="#222" stroke="#333" strokeWidth="1"/>
                <text x="220" y="236" textAnchor="middle" fill="#e8e6e1" fontSize="10" fontWeight="600" fontFamily="Inter,sans-serif">Risk ON</text>
                <text x="220" y="250" textAnchor="middle" fill="#9a9790" fontSize="8" fontFamily="Inter,sans-serif">bet on the future</text>
                <rect x="310" y="218" width="140" height="42" rx="6" fill="#222" stroke="#333" strokeWidth="1"/>
                <text x="380" y="236" textAnchor="middle" fill="#e8e6e1" fontSize="10" fontWeight="600" fontFamily="Inter,sans-serif">Risk OFF</text>
                <text x="380" y="250" textAnchor="middle" fill="#9a9790" fontSize="8" fontFamily="Inter,sans-serif">diversified assets</text>
                <text x="300" y="280" textAnchor="middle" fill="#9a9790" fontSize="7" fontStyle="italic" fontFamily="Inter,sans-serif">Profits</text>
              </g>

              {/* Connecting flows */}
              <g style={{ opacity: svgInView ? 1 : 0, transition: "opacity 0.6s ease 1.1s" }}>
                <line x1="240" y1="155" x2="240" y2="168" stroke="#c9a84c" strokeWidth="1" opacity="0.3"/>
                <text x="210" y="175" fill="#9a9790" fontSize="7" fontFamily="Inter,sans-serif">Excess Cash</text>
                <line x1="240" y1="180" x2="240" y2="196" stroke="#c9a84c" strokeWidth="1" opacity="0.3" markerEnd="url(#arrow)"/>
                <line x1="130" y1="250" x2="100" y2="250" stroke="#c9a84c" strokeWidth="1" opacity="0.3"/>
                <line x1="100" y1="250" x2="100" y2="130" stroke="#c9a84c" strokeWidth="1" opacity="0.3"/>
                <line x1="100" y1="130" x2="148" y2="130" stroke="#c9a84c" strokeWidth="1" opacity="0.3" markerEnd="url(#arrow)"/>
                <text x="70" y="190" fill="#9a9790" fontSize="7" fontFamily="Inter,sans-serif" transform="rotate(-90 70 190)">Investment Revenue</text>
              </g>

              {/* Bank + leverage */}
              <g style={{ opacity: svgInView ? 1 : 0, transition: "opacity 0.6s ease 1.3s" }}>
                <rect x="530" y="230" width="100" height="45" rx="8" fill="#1a1a1a" stroke="#c9a84c" strokeWidth="1" opacity="0.5"/>
                <text x="580" y="257" textAnchor="middle" fill="#c9a84c" fontSize="11" fontWeight="600" fontFamily="Inter,sans-serif">Bank</text>
                <line x1="528" y1="245" x2="472" y2="245" stroke="#c9a84c" strokeWidth="1" opacity="0.3" markerEnd="url(#arrow)"/>
                <text x="495" y="240" fill="#9a9790" fontSize="7" fontFamily="Inter,sans-serif">Leverage</text>
                <line x1="580" y1="228" x2="580" y2="140" stroke="#c9a84c" strokeWidth="1" opacity="0.3"/>
                <line x1="580" y1="140" x2="555" y2="121" stroke="#c9a84c" strokeWidth="1" opacity="0.3" markerEnd="url(#arrow)"/>
                <text x="594" y="185" fill="#9a9790" fontSize="7" fontFamily="Inter,sans-serif">Loan</text>
                <text x="610" y="300" fill="#9a9790" fontSize="7" fontFamily="Inter,sans-serif">Borrowing</text>
                <text x="614" y="309" fill="#9a9790" fontSize="7" fontFamily="Inter,sans-serif">Power</text>
                <line x1="580" y1="277" x2="580" y2="310" stroke="#c9a84c" strokeWidth="1" opacity="0.2"/>
              </g>

              {/* Illiquid Strategy Layer */}
              <g style={{ opacity: svgInView ? 1 : 0, transition: "opacity 0.6s ease 1.5s" }}>
                <rect x="130" y="360" width="440" height="120" rx="10" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1"/>
                <text x="350" y="354" textAnchor="middle" fill="#c9a84c" fontSize="9" fontWeight="600" letterSpacing="0.1em" fontFamily="Inter,sans-serif">ILLIQUID STRATEGY</text>
                <rect x="150" y="380" width="110" height="40" rx="6" fill="#222" stroke="#333" strokeWidth="1"/>
                <text x="205" y="404" textAnchor="middle" fill="#e8e6e1" fontSize="10" fontFamily="Inter,sans-serif">Real Estate</text>
                <rect x="280" y="380" width="110" height="40" rx="6" fill="#222" stroke="#333" strokeWidth="1"/>
                <text x="335" y="398" textAnchor="middle" fill="#e8e6e1" fontSize="9.5" fontFamily="Inter,sans-serif">Private Equity</text>
                <text x="335" y="410" textAnchor="middle" fill="#9a9790" fontSize="8" fontFamily="Inter,sans-serif">Businesses</text>
                <rect x="410" y="380" width="80" height="40" rx="6" fill="#222" stroke="#333" strokeWidth="1"/>
                <text x="450" y="404" textAnchor="middle" fill="#9a9790" fontSize="9.5" fontFamily="Inter,sans-serif">Other</text>
                <line x1="300" y1="302" x2="300" y2="340" stroke="#c9a84c" strokeWidth="1" opacity="0.3"/>
                <text x="270" y="325" fill="#9a9790" fontSize="7" fontFamily="Inter,sans-serif">Asset Rotation</text>
                <line x1="300" y1="340" x2="300" y2="358" stroke="#c9a84c" strokeWidth="1" opacity="0.3" markerEnd="url(#arrow)"/>
                <line x1="492" y1="400" x2="540" y2="400" stroke="#c9a84c" strokeWidth="1" opacity="0.2"/>
                <line x1="540" y1="400" x2="580" y2="310" stroke="#c9a84c" strokeWidth="1" opacity="0.2"/>
              </g>

              {/* Pulsing glow */}
              <circle cx="350" cy="260" r="120" fill="url(#radGlow)" opacity="0.04">
                {svgInView && <animate attributeName="opacity" values="0.03;0.06;0.03" dur="4s" repeatCount="indefinite" />}
              </circle>
            </svg>
          </div>

          {/* Blueprint description - 4 layers */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0, marginTop: 40, textAlign: "left" }}>
            {[
              {
                label: t(lang, "Cash management", "Gestion de tr\u00E9sorerie"),
                desc: t(lang,
                  "Activity revenue flows into a Current Account, which handles life\u2019s outflows \u2014 expenses, taxes, and loan reimbursements. The Current Account feeds a Cash Reserve with a minimum cash threshold. Once complete, excess cash gets deployed down into investments. Savings sits as an emergency backstop.",
                  "Les revenus d\u2019activit\u00E9 alimentent un Compte Courant, qui g\u00E8re les sorties de la vie \u2014 d\u00E9penses, imp\u00F4ts et remboursements. Le Compte Courant alimente une R\u00E9serve de Tr\u00E9sorerie avec un seuil minimum. Une fois atteint, l\u2019exc\u00E9dent est d\u00E9ploy\u00E9 en investissements. L\u2019\u00E9pargne sert de filet de s\u00E9curit\u00E9."
                ),
              },
              {
                label: t(lang, "Liquid strategy", "Strat\u00E9gie liquide"),
                desc: t(lang,
                  "\u201CRisk ON \u2014 bet on the future\u201D is your conviction-driven, high-upside allocation: early-stage tech, crypto, concentrated positions you believe in. \u201CRisk OFF \u2014 diversified across assets\u201D is your broad, all-weather allocation that doesn\u2019t depend on any single thesis. Profits flow back up or rotate into illiquid assets.",
                  "\u00AB Risk ON \u2014 parier sur le futur \u00BB est votre allocation de conviction \u00E0 fort potentiel : tech early-stage, crypto, positions concentr\u00E9es. \u00AB Risk OFF \u2014 diversifi\u00E9 \u00BB est votre allocation tous temps, ind\u00E9pendante d\u2019une seule th\u00E8se. Les profits remontent ou sont r\u00E9allou\u00E9s en illiquide."
                ),
              },
              {
                label: t(lang, "Illiquid strategy", "Strat\u00E9gie illiquide"),
                desc: t(lang,
                  "Real estate, private equity/businesses, and other holdings. Long-duration, harder to exit, but serve as both wealth builders and collateral for the bank relationship.",
                  "Immobilier, private equity/entreprises, et autres actifs. Longue dur\u00E9e, moins liquides, mais servent \u00E0 la fois de moteurs de richesse et de garantie pour la relation bancaire."
                ),
              },
              {
                label: t(lang, "The bank as leverage engine", "La banque comme moteur de levier"),
                desc: t(lang,
                  "Your life (income/stability) and your illiquid assets both generate borrowing power. The bank provides loans that enable asset rotation and leverage back into the system. Loan reimbursements flow out from the current account, closing the loop.",
                  "Votre vie (revenus/stabilit\u00E9) et vos actifs illiquides g\u00E9n\u00E8rent une capacit\u00E9 d\u2019emprunt. La banque fournit des pr\u00EAts qui permettent la rotation d\u2019actifs et le levier. Les remboursements sortent du compte courant, bouclant le syst\u00E8me."
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  padding: "20px 0",
                  borderBottom: i < 3 ? "1px solid #222" : "none",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: "#c9a84c", marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 14, color: "#9a9790", lineHeight: 1.7 }}>{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <div style={{ width: 60, height: 1, background: "rgba(201,168,76,0.2)", margin: "0 auto" }} />

      {/* WHO I AM */}
      <Section style={{ padding: "80px 24px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16 }}>
          {t(lang, "The architect", "L\u2019architecte")}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 20 }}>
          {t(lang, "I\u2019m not a salesman. I\u2019m an investor who designs systems.", "Je ne suis pas un vendeur. Je suis un investisseur qui con\u00E7oit des syst\u00E8mes.")}
        </h2>
        <p style={{ color: "#9a9790", fontSize: 16, marginBottom: 16 }}>
          {t(lang,
            "I\u2019ve been deep in this world since 2017. I\u2019m strongly inspired by Charles Gave \u2014 I\u2019ve met him several times and built my entire macro framework around his work and Didier Darcet\u2019s econophysics. I worked private equity with Constant Helper. I run crypto and blockchain strategies myself. This isn\u2019t theory. I live this system every day.",
            "Je suis plong\u00E9 dans cet univers depuis 2017. Je suis profond\u00E9ment inspir\u00E9 par Charles Gave \u2014 je l\u2019ai rencontr\u00E9 plusieurs fois et j\u2019ai construit tout mon cadre macro autour de son travail et de l\u2019\u00E9cono-physique de Didier Darcet. J\u2019ai travaill\u00E9 en private equity avec Constant Helper. Je g\u00E8re moi-m\u00EAme des strat\u00E9gies crypto et blockchain. Ce n\u2019est pas de la th\u00E9orie. Je vis ce syst\u00E8me chaque jour."
          )}
        </p>
        <p style={{ color: "#9a9790", fontSize: 16, marginBottom: 16 }}>
          {t(lang,
            "I started my career as a CIF (Conseil en Investissements Financiers) under Euodia. I left because affiliation kills independence. Great people \u2014 but the model is built around selling products, not building systems. I chose freedom. Now I work for my clients and nobody else.",
            "J\u2019ai commenc\u00E9 ma carri\u00E8re comme CIF (Conseil en Investissements Financiers) sous Euodia. J\u2019ai quitt\u00E9 parce que l\u2019affiliation tue l\u2019ind\u00E9pendance. Des gens formidables \u2014 mais le mod\u00E8le est construit autour de la vente de produits, pas de la construction de syst\u00E8mes. J\u2019ai choisi la libert\u00E9. Maintenant je travaille pour mes clients et personne d\u2019autre."
          )}
        </p>
        <p style={{ color: "#9a9790", fontSize: 16 }}>
          {t(lang,
            "I don\u2019t give you a list of ETFs to buy. I don\u2019t tell you to put everything in the S&P 500 or the CAC 40. My approach is structured, risk-managed, and diversified worldwide. I think in systems, not products. I manage risk the way it should be managed: simply.",
            "Je ne vous donne pas une liste d\u2019ETFs \u00E0 acheter. Je ne vous dis pas de tout mettre dans le S&P 500 ou le CAC 40. Mon approche est structur\u00E9e, g\u00E9r\u00E9e en risque et diversifi\u00E9e mondialement. Je pense en syst\u00E8mes, pas en produits. Je g\u00E8re le risque comme il devrait l\u2019\u00EAtre : simplement."
          )}
        </p>
      </Section>

      <div style={{ width: 60, height: 1, background: "rgba(201,168,76,0.2)", margin: "0 auto" }} />

      {/* YOUR TERMS */}
      <Section style={{ padding: "80px 24px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16 }}>
          {t(lang, "Your terms", "Vos conditions")}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 20 }}>
          {t(lang, "Private by design. Personal by nature.", "Priv\u00E9 par conception. Personnel par nature.")}
        </h2>
        <p style={{ color: "#9a9790", fontSize: 16, marginBottom: 16 }}>
          {t(lang,
            "Your wealth is intimate. It reflects your choices, your family, your ambitions. So every architecture starts with understanding you \u2014 not just your balance sheet. Your preferences, your constraints, what you want your money to actually do for your life.",
            "Votre patrimoine est intime. Il refl\u00E8te vos choix, votre famille, vos ambitions. Donc chaque architecture commence par vous comprendre \u2014 pas juste votre bilan. Vos pr\u00E9f\u00E9rences, vos contraintes, ce que vous voulez que votre argent fasse vraiment pour votre vie."
          )}
        </p>
        <p style={{ color: "#9a9790", fontSize: 16, marginBottom: 16 }}>
          {t(lang,
            "No data leaves the conversation. No third parties. No platform storing your numbers. Everything stays between us. Confidential. Under NDA. Entirely on your terms.",
            "Aucune donn\u00E9e ne sort de la conversation. Pas de tiers. Pas de plateforme qui stocke vos chiffres. Tout reste entre nous. Confidentiel. Sous NDA. Enti\u00E8rement \u00E0 vos conditions."
          )}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20, marginTop: 36 }}>
          <ValueCard icon={"\u2697"} title={t(lang, "Preserve wealth", "Pr\u00E9server le patrimoine")} desc={t(lang, "Protect what you\u2019ve built. Structure before speculation.", "Prot\u00E9ger ce que vous avez construit. La structure avant la sp\u00E9culation.")} />
          <ValueCard icon={"\u21E7"} title={t(lang, "Grow purchasing power", "Gagner en pouvoir d\u2019achat")} desc={t(lang, "Beat inflation, compound quietly. Real wealth is measured in what you can do.", "Battre l\u2019inflation, composer en silence. La vraie richesse se mesure \u00E0 ce que vous pouvez faire.")} />
          <ValueCard icon={"\u25C6"} title={t(lang, "Respect your identity", "Respecter votre identit\u00E9")} desc={t(lang, "Your values, preferences, and privacy shape the architecture. Not the other way around.", "Vos valeurs, pr\u00E9f\u00E9rences et votre vie priv\u00E9e fa\u00E7onnent l\u2019architecture. Pas l\u2019inverse.")} />
        </div>
      </Section>

      <hr style={{ maxWidth: 760, margin: "0 auto", border: "none", borderTop: "1px solid #222" }} />

      {/* THE ENGAGEMENT */}
      <Section style={{ padding: "80px 24px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16 }}>
          {t(lang, "The engagement", "L\u2019accompagnement")}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>
          {t(lang, "Your rhythm. My expertise.", "Votre rythme. Mon expertise.")}
        </h2>
        <p style={{ color: "#9a9790", fontSize: 16, marginBottom: 36 }}>
          {t(lang,
            "This isn\u2019t a one-off consultation. It\u2019s a year-long engagement designed to build, implement, and refine your wealth architecture. Here\u2019s what each phase looks like.",
            "Ce n\u2019est pas une consultation ponctuelle. C\u2019est un accompagnement d\u2019un an con\u00E7u pour construire, mettre en \u0153uvre et affiner votre architecture patrimoniale. Voici \u00E0 quoi ressemble chaque phase."
          )}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Phase 01 */}
          <EngagementCard>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
              <div><span style={{ fontSize: 11, fontWeight: 600, color: "#c9a84c", letterSpacing: "0.06em", marginRight: 8 }}>01</span><span style={{ fontSize: 17, fontWeight: 600 }}>{t(lang, "Discovery call", "Appel d\u00E9couverte")}</span></div>
              <span style={{ fontSize: 13, color: "#5a5750" }}>{t(lang, "30 min \u00B7 Free", "30 min \u00B7 Gratuit")}</span>
            </div>
            <div style={{ color: "#9a9790", fontSize: 14, lineHeight: 1.75 }}>
              {t(lang, "I tell you who I am and show you my own system running on my own capital. You tell me about your situation. We both decide if there\u2019s a fit. No commitment \u2014 I\u2019ll be honest if I can\u2019t help.", "Je vous dis qui je suis et vous montre mon propre syst\u00E8me qui tourne sur mon capital. Vous me parlez de votre situation. On d\u00E9cide ensemble s\u2019il y a un fit. Sans engagement \u2014 je serai honn\u00EAte si je ne peux pas vous aider.")}
            </div>
          </EngagementCard>

          {/* Phase 02 - Featured */}
          <EngagementCard featured>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
              <div><span style={{ fontSize: 11, fontWeight: 600, color: "#c9a84c", letterSpacing: "0.06em", marginRight: 8 }}>02</span><span style={{ fontSize: 17, fontWeight: 600 }}>{t(lang, "Wealth Architecture Audit", "Audit d\u2019Architecture Patrimoniale")}</span></div>
              <LaunchPrice
                full={t(lang, "\u20AC2,500", "2 500 \u20AC")}
                offer={t(lang, "\u20AC1,500", "1 500 \u20AC")}
                lang={lang}
              />
            </div>
            <div style={{ color: "#9a9790", fontSize: 14, lineHeight: 1.75 }}>
              {t(lang, "Your full personalized wealth blueprint. Delivered in two weeks.", "Votre blueprint patrimonial complet et personnalis\u00E9. Livr\u00E9 en deux semaines.")}
              <ul style={{ listStyle: "none", padding: 0, marginTop: 10 }}>
                {[
                  t(lang, "Deep intake session (1h30). Full cartography of your financial life.", "Session d\u2019intake approfondie (1h30). Cartographie compl\u00E8te de votre vie financi\u00E8re."),
                  t(lang, "Custom wealth flow schema designed around your situation.", "Sch\u00E9ma de flux patrimonial sur mesure con\u00E7u autour de votre situation."),
                  t(lang, "Visual blueprint + roadmap of 5 to 10 structural moves, ordered by impact.", "Blueprint visuel + feuille de route de 5 \u00E0 10 actions structurelles, class\u00E9es par impact."),
                  t(lang, "Delivery session (1h). Private walkthrough of your architecture.", "Session de restitution (1h). Pr\u00E9sentation priv\u00E9e de votre architecture."),
                ].map((item, i) => (
                  <li key={i} style={{ padding: "5px 0 5px 22px", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "#c9a84c" }}>{"\u2192"}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </EngagementCard>

          {/* Phase 03 */}
          <EngagementCard>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
              <div><span style={{ fontSize: 11, fontWeight: 600, color: "#c9a84c", letterSpacing: "0.06em", marginRight: 8 }}>03</span><span style={{ fontSize: 17, fontWeight: 600 }}>{t(lang, "4 Quarterly Reviews", "4 Revues Trimestrielles")}</span></div>
              <LaunchPrice
                full={t(lang, "\u20AC500 / quarter", "500 \u20AC / trimestre")}
                offer={t(lang, "\u20AC300 / quarter", "300 \u20AC / trimestre")}
                lang={lang}
              />
            </div>
            <div style={{ color: "#9a9790", fontSize: 14, lineHeight: 1.75 }}>
              {t(lang, "45-min private session each quarter. We update your schema, track execution, adjust priorities. I bring macro context \u2014 where we are in the cycle and what it means for your architecture. Includes a private client newsletter so you always know what\u2019s going on.", "Session priv\u00E9e de 45 min chaque trimestre. On met \u00E0 jour votre sch\u00E9ma, on suit l\u2019ex\u00E9cution, on ajuste les priorit\u00E9s. J\u2019apporte le contexte macro \u2014 o\u00F9 on en est dans le cycle et ce que \u00E7a signifie pour votre architecture. Inclus : newsletter client priv\u00E9e pour que vous sachiez toujours ce qui se passe.")}
            </div>
          </EngagementCard>

          {/* Phase 04 */}
          <EngagementCard>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
              <div><span style={{ fontSize: 11, fontWeight: 600, color: "#c9a84c", letterSpacing: "0.06em", marginRight: 8 }}>04</span><span style={{ fontSize: 17, fontWeight: 600 }}>{t(lang, "Direct line", "Ligne directe")}</span></div>
              <span style={{ fontSize: 13, color: "#5a5750" }}>{t(lang, "Included for all active clients", "Inclus pour tous les clients actifs")}</span>
            </div>
            <div style={{ color: "#9a9790", fontSize: 14, lineHeight: 1.75 }}>
              {t(lang, "You have direct access to me between sessions. No assistant, no ticketing system. You message me, I respond personally.", "Vous avez un acc\u00E8s direct \u00E0 moi entre les sessions. Pas d\u2019assistant, pas de syst\u00E8me de tickets. Vous m\u2019\u00E9crivez, je r\u00E9ponds personnellement.")}
            </div>
          </EngagementCard>
        </div>
      </Section>

      <hr style={{ maxWidth: 760, margin: "0 auto", border: "none", borderTop: "1px solid #222" }} />

      {/* OBJECTION HANDLING */}
      <Section style={{ padding: "80px 24px", maxWidth: 760, margin: "0 auto" }}>
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
              a: t(lang,
                "Your advisor picks products. I design the system those products fit into. We don\u2019t compete \u2014 I make their work more effective. Most of my clients keep their existing advisors and bankers. They just finally have an architecture connecting everything.",
                "Votre conseiller choisit des produits. Je con\u00E7ois le syst\u00E8me dans lequel ces produits s\u2019int\u00E8grent. On n\u2019est pas en comp\u00E9tition \u2014 je rends leur travail plus efficace. La plupart de mes clients gardent leurs conseillers et banquiers. Ils ont juste enfin une architecture qui connecte tout."
              ),
            },
            {
              q: t(lang, "\u201CMy bank handles my wealth.\u201D", "\u00AB Ma banque g\u00E8re mon patrimoine. \u00BB"),
              a: t(lang,
                "Your bank sees one slice. I see the full board \u2014 across all your banks, assets, structures, and flows. I design the system. They execute the pieces they handle. An architect doesn\u2019t replace your builders. He tells them what to build.",
                "Votre banque voit une tranche. Moi je vois le tableau complet \u2014 toutes vos banques, actifs, structures et flux. Je con\u00E7ois le syst\u00E8me. Ils ex\u00E9cutent les parties qu\u2019ils g\u00E8rent. Un architecte ne remplace pas vos ma\u00E7ons. Il leur dit quoi construire."
              ),
            },
            {
              q: t(lang, "\u201CI don\u2019t have time for this.\u201D", "\u00AB Je n\u2019ai pas le temps pour \u00E7a. \u00BB"),
              a: t(lang,
                "One 90-minute intake. One 60-minute delivery. Then 45 minutes per quarter. That\u2019s less than 6 hours a year to have a system managing your entire financial life. You spend more time than that choosing a car.",
                "Un intake de 90 minutes. Une restitution de 60 minutes. Puis 45 minutes par trimestre. C\u2019est moins de 6 heures par an pour avoir un syst\u00E8me qui g\u00E8re toute votre vie financi\u00E8re. Vous passez plus de temps que \u00E7a \u00E0 choisir une voiture."
              ),
            },
            {
              q: t(lang, "\u201CThat\u2019s expensive for advice.\u201D", "\u00AB C\u2019est cher pour du conseil. \u00BB"),
              a: t(lang,
                "One structural gap \u2014 money sitting idle, a tax wrapper you didn\u2019t know about, borrowing power you\u2019re not using \u2014 typically costs more in a single year than the entire engagement. This isn\u2019t an expense. It\u2019s the highest-leverage investment you\u2019ll make.",
                "Un seul trou structurel \u2014 de l\u2019argent qui dort, une enveloppe fiscale que vous ne connaissiez pas, un pouvoir d\u2019emprunt que vous n\u2019utilisez pas \u2014 co\u00FBte g\u00E9n\u00E9ralement plus en une seule ann\u00E9e que tout l\u2019accompagnement. Ce n\u2019est pas une d\u00E9pense. C\u2019est l\u2019investissement le plus levier que vous ferez."
              ),
            },
            {
              q: t(lang, "\u201CI can figure this out myself.\u201D", "\u00AB Je peux le faire tout seul. \u00BB"),
              a: t(lang,
                "You probably can learn every piece individually. But nobody teaches you how they connect. That\u2019s the architecture \u2014 the system that turns scattered knowledge into compounding wealth. You don\u2019t need more information. You need a blueprint.",
                "Vous pouvez probablement apprendre chaque pi\u00E8ce individuellement. Mais personne ne vous apprend comment elles se connectent. C\u2019est \u00E7a l\u2019architecture \u2014 le syst\u00E8me qui transforme des connaissances \u00E9parses en richesse compos\u00E9e. Vous n\u2019avez pas besoin de plus d\u2019information. Vous avez besoin d\u2019un blueprint."
              ),
            },
          ].map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>
      </Section>

      <hr style={{ maxWidth: 760, margin: "0 auto", border: "none", borderTop: "1px solid #222" }} />

      {/* INDEPENDENCE */}
      <Section style={{ padding: "80px 24px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16 }}>
          {t(lang, "Independence", "Ind\u00E9pendance")}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 20 }}>
          {t(lang, "Fully independent. Here\u2019s what that means.", "Totalement ind\u00E9pendant. Voici ce que \u00E7a veut dire.")}
        </h2>
        <div style={{ marginTop: 28 }}>
          {[
            t(lang, "Zero commissions. I don\u2019t earn a cent from any product you buy.", "Z\u00E9ro commission. Je ne gagne pas un centime sur aucun produit que vous achetez."),
            t(lang, "Zero affiliations. No bank, insurer, or platform has any tie to me.", "Z\u00E9ro affiliation. Aucune banque, assureur ou plateforme n\u2019a de lien avec moi."),
            t(lang, "Zero % on your capital. I never manage your money. You stay in full control.", "Z\u00E9ro % sur votre capital. Je ne g\u00E8re jamais votre argent. Vous gardez le contr\u00F4le total."),
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "10px 0", color: "#9a9790", fontSize: 15 }}
            >
              <span style={{ color: "#5a5750", fontWeight: 500, flexShrink: 0, marginTop: 1 }}>{"\u2717"}</span>
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
        <p style={{ color: "#9a9790", fontSize: 15, marginTop: 24, fontStyle: "italic" }}>
          {t(lang,
            "When I tell you something, it\u2019s because I believe it\u2019s right for your system \u2014 not because someone pays me to say it.",
            "Quand je vous dis quelque chose, c\u2019est parce que je crois que c\u2019est juste pour votre syst\u00E8me \u2014 pas parce que quelqu\u2019un me paie pour le dire."
          )}
        </p>
      </Section>

      <hr style={{ maxWidth: 760, margin: "0 auto", border: "none", borderTop: "1px solid #222" }} />

      {/* FINAL CTA */}
      <Section id="book" style={{ textAlign: "center", padding: "100px 24px 140px", maxWidth: 760, margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
        <h2 style={{ fontSize: 32, fontWeight: 600, marginBottom: 16 }}>
          {t(lang, "Ready to architect your wealth?", "Pr\u00EAt \u00E0 structurer votre patrimoine ?")}
        </h2>
        <p style={{ color: "#9a9790", marginBottom: 36, fontSize: 16 }}>
          {t(lang, "30-minute discovery call. Free. I\u2019ll show you my system and tell you honestly if I can help.", "Appel d\u00E9couverte de 30 minutes. Gratuit. Je vous montre mon syst\u00E8me et vous dis honn\u00EAtement si je peux vous aider.")}
        </p>
        <CtaButton href="#">
          {t(lang, "Book your discovery call", "R\u00E9servez votre appel d\u00E9couverte")}
        </CtaButton>
      </Section>

      {/* FOOTER */}
      <footer style={{
        padding: "28px 40px", borderTop: "1px solid #222",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 12, color: "#5a5750", letterSpacing: "0.02em", flexWrap: "wrap", gap: 8,
      }}>
        <span>{t(lang, "Private & confidential \u00B7 Your preferences, your architecture", "Priv\u00E9 & confidentiel \u00B7 Vos pr\u00E9f\u00E9rences, votre architecture")}</span>
        <Link to="/" style={{ color: "#9a9790", textDecoration: "none" }}>jeremylasne.com</Link>
      </footer>
    </div>
  );
};

export default Wealth;
