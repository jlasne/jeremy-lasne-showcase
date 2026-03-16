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

/* --- Animated Counter --- */
const AnimatedStat = ({ value, suffix, label }: { value: string; suffix?: string; label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ textAlign: "center", padding: "24px 16px" }}
    >
      <div style={{ fontSize: 36, fontWeight: 700, color: "#c9a84c", lineHeight: 1 }}>
        {value}{suffix && <span style={{ fontSize: 20, fontWeight: 400 }}>{suffix}</span>}
      </div>
      <div style={{ fontSize: 13, color: "#9a9790", marginTop: 8, lineHeight: 1.4 }}>{label}</div>
    </motion.div>
  );
};

/* =========================================== */
/*                   MAIN                      */
/* =========================================== */

const Wealth = () => {
  const [lang, setLang] = useState<Lang>("en");
  const [showLangPopup, setShowLangPopup] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef<HTMLDivElement>(null);

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
        <Link to="/" style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "#e8e6e1", textDecoration: "none" }}>
          Jeremy Lasne
        </Link>
        <img src={jlLogo} alt="JL" style={{ height: 32, borderRadius: 6 }} />
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

      {/* METHODOLOGY - text only, no blueprint */}
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

        {/* Visual stats ribbon */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8,
          background: "#161616", border: "1px solid #2a2a2a", borderRadius: 16, padding: "32px 16px",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)" }} />
          <AnimatedStat value="<6" suffix="h" label={t(lang, "of sessions per year", "de sessions par an")} />
          <AnimatedStat value="1" label={t(lang, "living blueprint", "blueprint vivant")} />
          <AnimatedStat value="4" label={t(lang, "quarterly reviews", "revues trimestrielles")} />
          <AnimatedStat value="0" suffix="%" label={t(lang, "commission on products", "de commission sur les produits")} />
        </div>
      </Section>

      <div style={{ width: 60, height: 1, background: "rgba(201,168,76,0.2)", margin: "0 auto" }} />

      {/* HOW IT WORKS - visual process */}
      <Section style={{ padding: "80px 24px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16, textAlign: "center" }}>
          {t(lang, "How it works", "Comment \u00E7a marche")}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 48, textAlign: "center" }}>
          {t(lang, "From scattered to structured", "Du d\u00E9sordre \u00E0 la structure")}
        </h2>

        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute", left: 24, top: 0, bottom: 0, width: 1,
            background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.3) 10%, rgba(201,168,76,0.3) 90%, transparent)",
          }} />

          {[
            {
              step: "01",
              title: t(lang, "We talk", "On \u00E9change"),
              desc: t(lang,
                "30-min discovery call. I show you my own system running on my capital. You tell me your situation. We both decide if there\u2019s a fit.",
                "Appel d\u00E9couverte de 30 min. Je vous montre mon syst\u00E8me qui tourne sur mon capital. Vous me parlez de votre situation. On d\u00E9cide ensemble."
              ),
              icon: "\u260E",
            },
            {
              step: "02",
              title: t(lang, "I map everything", "Je cartographie tout"),
              desc: t(lang,
                "Deep intake session. I map your entire financial life \u2014 income, assets, structures, flows, goals. Nothing left in the dark.",
                "Session d\u2019intake approfondie. Je cartographie toute votre vie financi\u00E8re \u2014 revenus, actifs, structures, flux, objectifs. Rien n\u2019est laiss\u00E9 dans l\u2019ombre."
              ),
              icon: "\u2727",
            },
            {
              step: "03",
              title: t(lang, "You get your blueprint", "Vous recevez votre blueprint"),
              desc: t(lang,
                "A personalized wealth architecture. Visual. Actionable. 5 to 10 structural moves ordered by impact. Your roadmap for the year.",
                "Une architecture patrimoniale personnalis\u00E9e. Visuelle. Actionnable. 5 \u00E0 10 actions structurelles class\u00E9es par impact. Votre feuille de route."
              ),
              icon: "\u25A0",
            },
            {
              step: "04",
              title: t(lang, "We refine together", "On affine ensemble"),
              desc: t(lang,
                "Every quarter we review, adjust, and evolve your system. I bring macro context. You stay in control.",
                "Chaque trimestre on r\u00E9vise, ajuste et fait \u00E9voluer votre syst\u00E8me. J\u2019apporte le contexte macro. Vous gardez le contr\u00F4le."
              ),
              icon: "\u21BB",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{ display: "flex", gap: 24, marginBottom: 40, paddingLeft: 56, position: "relative" }}
            >
              {/* Dot on timeline */}
              <motion.div
                whileInView={{ scale: [0, 1.3, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 + 0.2 }}
                style={{
                  position: "absolute", left: 16, top: 4, width: 17, height: 17,
                  borderRadius: "50%", background: "#0e0e0e", border: "2px solid #c9a84c",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 8, color: "#c9a84c",
                }}
              >
                {item.icon}
              </motion.div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "#c9a84c", marginBottom: 4, textTransform: "uppercase" }}>
                  {t(lang, "Step", "\u00C9tape")} {item.step}
                </div>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 6, color: "#e8e6e1" }}>{item.title}</div>
                <div style={{ fontSize: 14, color: "#9a9790", lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            </motion.div>
          ))}
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
        <p style={{ color: "#9a9790", fontSize: 16 }}>
          {t(lang,
            "My approach is structured, risk-managed, and diversified worldwide. I think in systems, not products. I manage risk the way it should be managed: simply.",
            "Mon approche est structur\u00E9e, g\u00E9r\u00E9e en risque et diversifi\u00E9e mondialement. Je pense en syst\u00E8mes, pas en produits. Je g\u00E8re le risque comme il devrait l\u2019\u00EAtre : simplement."
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
            "This isn\u2019t a one-off consultation. It\u2019s a year-long engagement designed to build, implement, and refine your wealth architecture.",
            "Ce n\u2019est pas une consultation ponctuelle. C\u2019est un accompagnement d\u2019un an con\u00E7u pour construire, mettre en \u0153uvre et affiner votre architecture patrimoniale."
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
              <div><span style={{ fontSize: 11, fontWeight: 600, color: "#c9a84c", letterSpacing: "0.06em", marginRight: 8 }}>03</span><span style={{ fontSize: 17, fontWeight: 600 }}>{t(lang, "Quarterly Reviews", "Revues Trimestrielles")}</span></div>
              <LaunchPrice
                full={t(lang, "\u20AC500 / quarter", "500 \u20AC / trimestre")}
                offer={t(lang, "\u20AC300 / quarter", "300 \u20AC / trimestre")}
                lang={lang}
              />
            </div>
            <div style={{ color: "#9a9790", fontSize: 14, lineHeight: 1.75 }}>
              {t(lang, "45-min private session each quarter. We update your schema, track execution, adjust priorities. I bring macro context \u2014 where we are in the cycle and what it means for your architecture.", "Session priv\u00E9e de 45 min chaque trimestre. On met \u00E0 jour votre sch\u00E9ma, on suit l\u2019ex\u00E9cution, on ajuste les priorit\u00E9s. J\u2019apporte le contexte macro \u2014 o\u00F9 on en est dans le cycle et ce que \u00E7a signifie pour votre architecture.")}
            </div>
          </EngagementCard>

          {/* Phase 04 */}
          <EngagementCard>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
              <div><span style={{ fontSize: 11, fontWeight: 600, color: "#c9a84c", letterSpacing: "0.06em", marginRight: 8 }}>04</span><span style={{ fontSize: 17, fontWeight: 600 }}>{t(lang, "Direct contact + Newsletter", "Contact direct + Newsletter")}</span></div>
              <span style={{ fontSize: 13, color: "#5a5750" }}>{t(lang, "Included for all active clients", "Inclus pour tous les clients actifs")}</span>
            </div>
            <div style={{ color: "#9a9790", fontSize: 14, lineHeight: 1.75 }}>
              {t(lang,
                "You have direct access to me between sessions. No assistant, no ticketing system. You message me, I respond personally. Plus a private client newsletter a few times per month \u2014 macro updates, cycle positioning, and what it means for your architecture. So you always know what\u2019s going on.",
                "Vous avez un acc\u00E8s direct \u00E0 moi entre les sessions. Pas d\u2019assistant, pas de syst\u00E8me de tickets. Vous m\u2019\u00E9crivez, je r\u00E9ponds personnellement. Plus une newsletter client priv\u00E9e quelques fois par mois \u2014 mises \u00E0 jour macro, positionnement de cycle, et ce que \u00E7a signifie pour votre architecture. Pour que vous sachiez toujours ce qui se passe."
              )}
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
                "Your advisor is a salesman, not an investor. Their revenue comes from the products they sell you \u2014 that\u2019s how the model works. If they don\u2019t charge you directly for the service, ask yourself: who\u2019s paying them? Being a CIF doesn\u2019t mean competent \u2014 it\u2019s a regulatory label, not an expertise badge. I design the system those products should fit into. Most of my clients keep their advisors. They just finally understand what they\u2019re being sold and why.",
                "Votre conseiller est un commercial, pas un investisseur. Son revenu vient des produits qu\u2019il vous vend \u2014 c\u2019est comme \u00E7a que le mod\u00E8le fonctionne. S\u2019il ne vous facture pas directement le service, demandez-vous : qui le paie ? \u00CAtre CIF ne veut pas dire comp\u00E9tent \u2014 c\u2019est un label r\u00E9glementaire, pas un badge d\u2019expertise. Je con\u00E7ois le syst\u00E8me dans lequel ces produits devraient s\u2019int\u00E9grer. La plupart de mes clients gardent leurs conseillers. Ils comprennent juste enfin ce qu\u2019on leur vend et pourquoi."
              ),
            },
            {
              q: t(lang, "\u201CMy bank handles my wealth.\u201D", "\u00AB Ma banque g\u00E8re mon patrimoine. \u00BB"),
              a: t(lang,
                "Your banker is a salesperson with quarterly targets. Their interests are not aligned with yours \u2014 they\u2019re aligned with the bank\u2019s. They see one slice of your assets. I see the full board \u2014 across all your banks, structures, and flows. I design the system. They execute the pieces they handle. An architect doesn\u2019t replace your builders. He tells them what to build.",
                "Votre banquier est un commercial avec des objectifs trimestriels. Ses int\u00E9r\u00EAts ne sont pas align\u00E9s avec les v\u00F4tres \u2014 ils sont align\u00E9s avec ceux de la banque. Il voit une tranche de vos actifs. Moi je vois le tableau complet \u2014 toutes vos banques, structures et flux. Je con\u00E7ois le syst\u00E8me. Ils ex\u00E9cutent les parties qu\u2019ils g\u00E8rent. Un architecte ne remplace pas vos ma\u00E7ons. Il leur dit quoi construire."
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
                "The cost of missed opportunities and uninformed moves is far higher. Money sitting idle, a tax wrapper you didn\u2019t know about, borrowing power you\u2019re not using. The majority of even aware investors end up losing money by following trends and making emotional decisions. One structural adjustment typically saves more than the entire engagement in a single year. This isn\u2019t an expense \u2014 it\u2019s the highest-leverage investment you\u2019ll make.",
                "Le co\u00FBt des opportunit\u00E9s manqu\u00E9es et des d\u00E9cisions non \u00E9clair\u00E9es est bien plus \u00E9lev\u00E9. De l\u2019argent qui dort, une enveloppe fiscale que vous ne connaissiez pas, un pouvoir d\u2019emprunt que vous n\u2019utilisez pas. La majorit\u00E9 des investisseurs, m\u00EAme avertis, finissent par perdre de l\u2019argent en suivant les tendances et en prenant des d\u00E9cisions \u00E9motionnelles. Un seul ajustement structurel \u00E9conomise g\u00E9n\u00E9ralement plus que tout l\u2019accompagnement en une seule ann\u00E9e. Ce n\u2019est pas une d\u00E9pense \u2014 c\u2019est l\u2019investissement le plus levier que vous ferez."
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

      {/* INDEPENDENCE - visual comparison */}
      <Section style={{ padding: "80px 24px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16, textAlign: "center" }}>
          {t(lang, "Independence", "Ind\u00E9pendance")}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 36, textAlign: "center" }}>
          {t(lang, "Fully independent. Here\u2019s what that means.", "Totalement ind\u00E9pendant. Voici ce que \u00E7a veut dire.")}
        </h2>

        {/* Comparison grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 36 }}>
          {/* Them column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              background: "#161616", border: "1px solid #2a2a2a", borderRadius: 12, padding: "28px 24px",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5a5750", marginBottom: 20 }}>
              {t(lang, "Typical advisors", "Conseillers classiques")}
            </div>
            {[
              t(lang, "Earn commissions on products", "Gagnent des commissions sur les produits"),
              t(lang, "Affiliated to banks or platforms", "Affili\u00E9s \u00E0 des banques ou plateformes"),
              t(lang, "Manage your money for a %", "G\u00E8rent votre argent contre un %"),
              t(lang, "Interests aligned with the seller", "Int\u00E9r\u00EAts align\u00E9s avec le vendeur"),
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{ display: "flex", gap: 10, padding: "8px 0", fontSize: 14, color: "#9a9790" }}
              >
                <span style={{ color: "#5a5750", flexShrink: 0 }}>{"\u2717"}</span>
                <span>{item}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Me column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 12, padding: "28px 24px",
              position: "relative", overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 20, right: 20, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 20 }}>
              {t(lang, "My model", "Mon mod\u00E8le")}
            </div>
            {[
              t(lang, "Zero commissions. Ever.", "Z\u00E9ro commission. Jamais."),
              t(lang, "Zero affiliations. No ties.", "Z\u00E9ro affiliation. Aucun lien."),
              t(lang, "Zero % on your capital.", "Z\u00E9ro % sur votre capital."),
              t(lang, "Interests aligned with yours.", "Int\u00E9r\u00EAts align\u00E9s avec les v\u00F4tres."),
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 + 0.2 }}
                style={{ display: "flex", gap: 10, padding: "8px 0", fontSize: 14, color: "#e8e6e1" }}
              >
                <span style={{ color: "#c9a84c", flexShrink: 0 }}>{"\u2713"}</span>
                <span>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <p style={{ color: "#9a9790", fontSize: 15, textAlign: "center", fontStyle: "italic", maxWidth: 600, margin: "0 auto" }}>
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
