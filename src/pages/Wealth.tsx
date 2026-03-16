import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

type Lang = "en" | "fr";

const t = (lang: Lang, en: string, fr: string) => (lang === "en" ? en : fr);

const Wealth = () => {
  const [lang, setLang] = useState<Lang>("en");
  const fadeRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wealth-lang") as Lang;
      if (saved) setLang(saved);
      else if (navigator.language?.slice(0, 2) === "fr") setLang("fr");
    } catch {}
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  const changeLang = (l: Lang) => {
    setLang(l);
    try { localStorage.setItem("wealth-lang", l); } catch {}
  };

  const addFadeRef = (el: HTMLElement | null) => {
    if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el);
  };

  return (
    <div className="min-h-screen" style={{
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      background: "#0e0e0e",
      color: "#e8e6e1",
      lineHeight: 1.75,
    }}>
      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 40px",
        background: "rgba(14,14,14,0.88)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid #222",
      }}>
        <Link to="/" style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "#e8e6e1", textDecoration: "none" }}>
          Jeremy Lasne
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", border: "1px solid #222", fontSize: 12 }}>
            <button onClick={() => changeLang("en")} style={{
              padding: "5px 12px", background: lang === "en" ? "#c9a84c" : "none", border: "none",
              color: lang === "en" ? "#0e0e0e" : "#5a5750", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: lang === "en" ? 600 : 500, letterSpacing: "0.05em",
            }}>EN</button>
            <button onClick={() => changeLang("fr")} style={{
              padding: "5px 12px", background: lang === "fr" ? "#c9a84c" : "none", border: "none",
              color: lang === "fr" ? "#0e0e0e" : "#5a5750", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: lang === "fr" ? 600 : 500, letterSpacing: "0.05em",
            }}>FR</button>
          </div>
          <a href="#book" style={{
            padding: "8px 22px", background: "transparent", border: "1px solid rgba(201,168,76,0.2)",
            color: "#c9a84c", textDecoration: "none", borderRadius: 6, fontSize: 12, fontWeight: 500, letterSpacing: "0.04em",
          }}>
            {t(lang, "Book a call", "Prendre rendez-vous")}
          </a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        textAlign: "center", padding: "140px 24px 100px", maxWidth: 900, margin: "0 auto", position: "relative",
      }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-55%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 28 }}>
          {t(lang, "Private Wealth Architecture", "Architecture Patrimoniale Privée")}
        </div>
        <h1 style={{ fontSize: "clamp(34px, 5.5vw, 52px)", fontWeight: 300, lineHeight: 1.2, marginBottom: 28, letterSpacing: "-0.01em" }}>
          {t(lang, "Your wealth needs a ", "Votre patrimoine a besoin d'un ")}
          <strong style={{ fontWeight: 700 }}>{t(lang, "system", "système")}</strong>
          {t(lang, ". Not scattered accounts.", ". Pas de comptes éparpillés.")}
        </h1>
        <p style={{ fontSize: 17, fontWeight: 400, color: "#9a9790", maxWidth: 540, marginBottom: 48 }}>
          {t(lang,
            "I studied how the wealthiest families actually protect and grow capital. Then I built a method that brings that thinking to individuals. Shaped around your life, your preferences, your privacy.",
            "J'ai étudié comment les grandes familles protègent et font croître leur capital. Puis j'ai construit une méthode qui apporte cette réflexion aux particuliers. Façonnée autour de votre vie, vos préférences, votre confidentialité."
          )}
        </p>
        <a href="#book" style={{
          display: "inline-block", padding: "15px 40px", background: "#c9a84c", color: "#0e0e0e",
          textDecoration: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, letterSpacing: "0.03em",
        }}>
          {t(lang, "Request a private consultation", "Demander une consultation privée")}
        </a>
        <span style={{ display: "block", marginTop: 16, fontSize: 12, color: "#5a5750", letterSpacing: "0.03em" }}>
          {t(lang, "15-minute call · By invitation · I select who I work with", "Appel de 15 minutes · Sur invitation · Je choisis avec qui je travaille")}
        </span>
      </div>

      <div style={{ width: 60, height: 1, background: "rgba(201,168,76,0.2)", margin: "0 auto" }} />

      {/* SCHEMA SECTION */}
      <div ref={addFadeRef} style={{ padding: "100px 24px", maxWidth: 960, margin: "0 auto", textAlign: "center", opacity: 0, transform: "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16 }}>
          {t(lang, "The methodology", "La méthodologie")}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 16 }}>
          {t(lang, "A complete system. Not a spreadsheet.", "Un système complet. Pas un tableur.")}
        </h2>
        <p style={{ color: "#9a9790", fontSize: 16, maxWidth: 560, margin: "0 auto 48px" }}>
          {t(lang,
            "Every client gets a personalized wealth flow schema. A living blueprint that maps every euro from income to investment to protection. This isn't a pie chart. It's the operating system of your wealth.",
            "Chaque client reçoit un schéma de flux patrimonial personnalisé. Un blueprint vivant qui cartographie chaque euro du revenu à l'investissement à la protection. Ce n'est pas un camembert. C'est le système d'exploitation de votre patrimoine."
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

          {/* SVG Schema */}
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <svg viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg" fill="none" style={{ width: "100%", height: "auto" }}>
              <defs>
                <marker id="arrow" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
                  <path d="M0 0L10 3.5L0 7z" fill="#c9a84c" opacity="0.5"/>
                </marker>
                <filter id="glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <radialGradient id="radGlow"><stop offset="0%" stopColor="#c9a84c"/><stop offset="100%" stopColor="transparent"/></radialGradient>
              </defs>
              <circle cx="350" cy="28" r="16" fill="#2a2a2a" stroke="#c9a84c" strokeWidth="1"/>
              <circle cx="350" cy="22" r="5" fill="#c9a84c" opacity="0.6"/>
              <path d="M341 34 c0-5 8-9 9-9 s9 4 9 9" stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.6"/>
              <rect x="130" y="70" width="440" height="90" rx="10" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1"/>
              <text x="350" y="64" textAnchor="middle" fill="#c9a84c" fontSize="9" fontWeight="600" letterSpacing="0.1em" fontFamily="Inter,sans-serif">CASH MANAGEMENT</text>
              <rect x="320" y="85" width="120" height="34" rx="6" fill="#222" stroke="#333" strokeWidth="1"/>
              <text x="380" y="106" textAnchor="middle" fill="#e8e6e1" fontSize="10" fontFamily="Inter,sans-serif">Current Account</text>
              <rect x="180" y="85" width="120" height="34" rx="6" fill="#222" stroke="#c9a84c" strokeWidth="1" opacity="0.8"/>
              <text x="240" y="102" textAnchor="middle" fill="#e8e6e1" fontSize="9" fontWeight="600" fontFamily="Inter,sans-serif">Cash Reserve</text>
              <text x="240" y="114" textAnchor="middle" fill="#9a9790" fontSize="7.5" fontFamily="Inter,sans-serif">Min threshold</text>
              <rect x="150" y="125" width="80" height="26" rx="5" fill="#222" stroke="#333" strokeWidth="1"/>
              <text x="190" y="142" textAnchor="middle" fill="#9a9790" fontSize="9" fontFamily="Inter,sans-serif">Savings</text>
              <line x1="350" y1="48" x2="380" y2="82" stroke="#c9a84c" strokeWidth="1" opacity="0.4" markerEnd="url(#arrow)"/>
              <text x="395" y="60" fill="#9a9790" fontSize="7.5" fontFamily="Inter,sans-serif">Activity Revenue</text>
              <line x1="318" y1="102" x2="302" y2="102" stroke="#c9a84c" strokeWidth="1" opacity="0.3" markerEnd="url(#arrow)"/>
              <rect x="520" y="85" width="70" height="34" rx="6" fill="#c9a84c" opacity="0.12" stroke="#c9a84c" strokeWidth="1"/>
              <text x="555" y="106" textAnchor="middle" fill="#c9a84c" fontSize="10" fontWeight="600" fontFamily="Inter,sans-serif">Life</text>
              <line x1="442" y1="102" x2="518" y2="102" stroke="#c9a84c" strokeWidth="1" opacity="0.3" markerEnd="url(#arrow)"/>
              <text x="475" y="96" fill="#9a9790" fontSize="7" fontFamily="Inter,sans-serif">Expenses</text>
              <text x="540" y="132" fill="#9a9790" fontSize="7" fontFamily="Inter,sans-serif">Taxes</text>
              <rect x="130" y="200" width="340" height="100" rx="10" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1"/>
              <text x="300" y="194" textAnchor="middle" fill="#c9a84c" fontSize="9" fontWeight="600" letterSpacing="0.1em" fontFamily="Inter,sans-serif">LIQUID STRATEGY</text>
              <rect x="150" y="218" width="140" height="42" rx="6" fill="#222" stroke="#333" strokeWidth="1"/>
              <text x="220" y="236" textAnchor="middle" fill="#e8e6e1" fontSize="10" fontWeight="600" fontFamily="Inter,sans-serif">Risk ON</text>
              <text x="220" y="250" textAnchor="middle" fill="#9a9790" fontSize="8" fontFamily="Inter,sans-serif">bet on the future</text>
              <rect x="310" y="218" width="140" height="42" rx="6" fill="#222" stroke="#333" strokeWidth="1"/>
              <text x="380" y="236" textAnchor="middle" fill="#e8e6e1" fontSize="10" fontWeight="600" fontFamily="Inter,sans-serif">Risk OFF</text>
              <text x="380" y="250" textAnchor="middle" fill="#9a9790" fontSize="8" fontFamily="Inter,sans-serif">diversified assets</text>
              <text x="300" y="280" textAnchor="middle" fill="#9a9790" fontSize="7" fontStyle="italic" fontFamily="Inter,sans-serif">Profits</text>
              <line x1="240" y1="155" x2="240" y2="168" stroke="#c9a84c" strokeWidth="1" opacity="0.3"/>
              <text x="210" y="175" fill="#9a9790" fontSize="7" fontFamily="Inter,sans-serif">Excess Cash</text>
              <line x1="240" y1="180" x2="240" y2="196" stroke="#c9a84c" strokeWidth="1" opacity="0.3" markerEnd="url(#arrow)"/>
              <line x1="130" y1="250" x2="100" y2="250" stroke="#c9a84c" strokeWidth="1" opacity="0.3"/>
              <line x1="100" y1="250" x2="100" y2="130" stroke="#c9a84c" strokeWidth="1" opacity="0.3"/>
              <line x1="100" y1="130" x2="148" y2="130" stroke="#c9a84c" strokeWidth="1" opacity="0.3" markerEnd="url(#arrow)"/>
              <text x="70" y="190" fill="#9a9790" fontSize="7" fontFamily="Inter,sans-serif" transform="rotate(-90 70 190)">Investment Revenue</text>
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
              <circle cx="350" cy="260" r="120" fill="url(#radGlow)" opacity="0.04"/>
            </svg>
          </div>

          {/* Flow grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 40, textAlign: "left" }}>
            {[
              { label: t(lang, "Layer 1", "Couche 1"), title: t(lang, "Cash management", "Gestion de trésorerie"), desc: t(lang, "Income, reserves, thresholds. Money only moves down when your safety net is full.", "Revenus, réserves, seuils. L'argent ne descend que quand votre filet de sécurité est complet.") },
              { label: t(lang, "Layer 2", "Couche 2"), title: t(lang, "Liquid strategy", "Stratégie liquide"), desc: t(lang, "Conviction bets and diversified positions. Profits rotate up or down based on your architecture.", "Paris de conviction et positions diversifiées. Les profits circulent selon votre architecture.") },
              { label: t(lang, "Layer 3", "Couche 3"), title: t(lang, "Illiquid + leverage", "Illiquide + levier"), desc: t(lang, "Real estate, businesses, and the bank as leverage engine. Assets create borrowing power that funds more growth.", "Immobilier, entreprises, et la banque comme moteur de levier. Les actifs créent une capacité d'emprunt qui finance la croissance.") },
            ].map((item, i) => (
              <div key={i} style={{ padding: 20, background: "#1a1a1a", border: "1px solid #222", borderRadius: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: "#e8e6e1" }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "#9a9790", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ width: 60, height: 1, background: "rgba(201,168,76,0.2)", margin: "0 auto" }} />

      {/* PHILOSOPHY */}
      <section ref={addFadeRef} style={{ padding: "80px 24px", maxWidth: 760, margin: "0 auto", opacity: 0, transform: "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16 }}>
          {t(lang, "The philosophy", "La philosophie")}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 20 }}>
          {t(lang, "Inspired by the greatest. Adapted to you.", "Inspiré des plus grands. Adapté à vous.")}
        </h2>
        <p style={{ color: "#9a9790", fontSize: 16, marginBottom: 16 }}>
          {t(lang,
            "I spent years studying macro strategists and wealth preservers. The people who understand how capital actually moves across generations, currencies, and cycles. Their principles work. But they were built for dynasties. Not for you and me.",
            "J'ai passé des années à étudier les stratèges macro et les préservateurs de patrimoine. Ceux qui comprennent comment le capital circule réellement entre les générations, les devises et les cycles. Leurs principes fonctionnent. Mais ils ont été conçus pour des dynasties. Pas pour vous et moi."
          )}
        </p>
        <p style={{ color: "#9a9790", fontSize: 16, marginBottom: 16 }}>
          {t(lang,
            "So I built a method that translates those big movements into a personal system. One that adapts to your life, your risk appetite, your values, your timeline. Same structural rigor. Shaped around who you are.",
            "Alors j'ai construit une méthode qui traduit ces grands mouvements en un système personnel. Un qui s'adapte à votre vie, votre appétit pour le risque, vos valeurs, votre horizon. Même rigueur structurelle. Façonnée autour de qui vous êtes."
          )}
        </p>
        <p style={{ color: "#9a9790", fontSize: 16 }}>
          {t(lang,
            "I also use AI daily to track macro shifts, policy changes, and market signals before they hit the news. Most advisors read last week's report. I read tomorrow's.",
            "J'utilise aussi l'IA au quotidien pour suivre les mouvements macro, les changements de politique et les signaux de marché avant qu'ils ne fassent la une. La plupart des conseillers lisent le rapport de la semaine dernière. Moi, je lis celui de demain."
          )}
        </p>
      </section>

      <div style={{ width: 60, height: 1, background: "rgba(201,168,76,0.2)", margin: "0 auto" }} />

      {/* QUOTE */}
      <div ref={addFadeRef} style={{ padding: "64px 24px", maxWidth: 760, margin: "0 auto", textAlign: "center", opacity: 0, transform: "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
        <blockquote style={{ fontSize: 20, fontWeight: 300, fontStyle: "italic", color: "#e8e6e1", lineHeight: 1.6 }}>
          <div style={{ width: 40, height: 1, background: "#c9a84c", margin: "0 auto 24px" }} />
          {t(lang,
            "Wealth management isn't picking stocks. It's preserving purchasing power, compounding quietly, and respecting who you are in the process.",
            "Gérer son patrimoine, ce n'est pas choisir des actions. C'est préserver son pouvoir d'achat, composer en silence, et respecter qui vous êtes dans le processus."
          )}
        </blockquote>
      </div>

      <div style={{ width: 60, height: 1, background: "rgba(201,168,76,0.2)", margin: "0 auto" }} />

      {/* PRIVACY */}
      <section ref={addFadeRef} style={{ padding: "80px 24px", maxWidth: 760, margin: "0 auto", opacity: 0, transform: "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16 }}>
          {t(lang, "Your terms", "Vos conditions")}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 20 }}>
          {t(lang, "Private by design. Personal by nature.", "Privé par conception. Personnel par nature.")}
        </h2>
        <p style={{ color: "#9a9790", fontSize: 16, marginBottom: 16 }}>
          {t(lang,
            "Your wealth is intimate. It reflects your choices, your family, your ambitions. So every architecture starts with understanding you. Not just your balance sheet. Your preferences. Your constraints. What you want your money to actually do for your life.",
            "Votre patrimoine est intime. Il reflète vos choix, votre famille, vos ambitions. Donc chaque architecture commence par vous comprendre. Pas juste votre bilan. Vos préférences. Vos contraintes. Ce que vous voulez que votre argent fasse vraiment pour votre vie."
          )}
        </p>
        <p style={{ color: "#9a9790", fontSize: 16, marginBottom: 16 }}>
          {t(lang,
            "No data leaves the conversation. No third parties. No platform storing your numbers. Everything stays between us. Confidential. Under NDA if you want. Entirely on your terms.",
            "Aucune donnée ne sort de la conversation. Pas de tiers. Pas de plateforme qui stocke vos chiffres. Tout reste entre nous. Confidentiel. Sous NDA si vous le souhaitez. Entièrement à vos conditions."
          )}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20, marginTop: 36 }}>
          {[
            { icon: "⚗", title: t(lang, "Preserve wealth", "Préserver le patrimoine"), desc: t(lang, "Protect what you've built. Structure before speculation.", "Protéger ce que vous avez construit. La structure avant la spéculation.") },
            { icon: "⇧", title: t(lang, "Grow purchasing power", "Gagner en pouvoir d'achat"), desc: t(lang, "Beat inflation, compound quietly. Real wealth is measured in what you can do.", "Battre l'inflation, composer en silence. La vraie richesse se mesure à ce que vous pouvez faire.") },
            { icon: "◆", title: t(lang, "Respect your identity", "Respecter votre identité"), desc: t(lang, "Your values, preferences, and privacy shape the architecture. Not the other way around.", "Vos valeurs, préférences et votre vie privée façonnent l'architecture. Pas l'inverse.") },
          ].map((p, i) => (
            <div key={i} style={{ textAlign: "center", padding: "28px 16px", background: "#1a1a1a", border: "1px solid #222", borderRadius: 10 }}>
              <div style={{ fontSize: 24, marginBottom: 12, opacity: 0.7 }}>{p.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: "#e8e6e1" }}>{p.title}</div>
              <div style={{ fontSize: 13, color: "#9a9790", lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ maxWidth: 760, margin: "0 auto", border: "none", borderTop: "1px solid #222" }} />

      {/* PROBLEM */}
      <section ref={addFadeRef} style={{ padding: "80px 24px", maxWidth: 760, margin: "0 auto", opacity: 0, transform: "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16 }}>
          {t(lang, "The gap", "Le vide")}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 20 }}>
          {t(lang, "Too sophisticated for advisors. Too early for a family office.", "Trop sophistiqué pour un conseiller. Trop tôt pour un family office.")}
        </h2>
        <p style={{ color: "#9a9790", fontSize: 16 }}>
          {t(lang,
            "Budgeting apps? You're past that. Generic financial advice? Useless at your level. Private banks only care about €10M+ clients. Wealth managers want to sell you their products. Nobody sits with you to actually design the system. How every euro flows. Where the leverage points are. Which structural moves unlock the next level.",
            "Les apps de budget ? Vous avez dépassé ça. Les conseils financiers génériques ? Inutiles à votre niveau. Les banques privées ne s'intéressent qu'aux €10M+. Les conseillers veulent vous vendre leurs produits. Personne ne s'assoit avec vous pour concevoir le système. Comment chaque euro circule. Où sont les points de levier. Quels mouvements structurels débloquent le niveau suivant."
          )}
        </p>
      </section>

      <hr style={{ maxWidth: 760, margin: "0 auto", border: "none", borderTop: "1px solid #222" }} />

      {/* SOLUTION */}
      <section ref={addFadeRef} style={{ padding: "80px 24px", maxWidth: 760, margin: "0 auto", opacity: 0, transform: "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16 }}>
          {t(lang, "The approach", "L'approche")}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 20 }}>
          {t(lang, "An architect, not a salesman.", "Un architecte, pas un vendeur.")}
        </h2>
        <p style={{ color: "#9a9790", fontSize: 16 }}>
          {t(lang,
            "I map your full financial landscape. Income, assets, debts, bank relationships, family structure, goals. Then I design a wealth flow schema shaped around your life and preferences. Not a generic template. A living architecture that reflects who you are. You execute with your own bankers and advisors. I design the system. They build it.",
            "Je cartographie votre paysage financier complet. Revenus, actifs, dettes, relations bancaires, structure familiale, objectifs. Puis je conçois un schéma de flux patrimonial façonné autour de votre vie et vos préférences. Pas un template générique. Une architecture vivante qui reflète qui vous êtes. Vous exécutez avec vos propres banquiers et conseillers. Je conçois le système. Ils le construisent."
          )}
        </p>
      </section>

      <hr style={{ maxWidth: 760, margin: "0 auto", border: "none", borderTop: "1px solid #222" }} />

      {/* OFFER */}
      <section ref={addFadeRef} style={{ padding: "80px 24px", maxWidth: 760, margin: "0 auto", opacity: 0, transform: "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16 }}>
          {t(lang, "The engagement", "L'accompagnement")}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 20 }}>
          {t(lang, "How we work together", "Comment nous travaillons ensemble")}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 36 }}>
          {/* Card 1 */}
          <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: "28px 32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
              <div><span style={{ fontSize: 11, fontWeight: 600, color: "#c9a84c", letterSpacing: "0.06em", marginRight: 8 }}>01</span><span style={{ fontSize: 17, fontWeight: 600 }}>{t(lang, "Private consultation", "Consultation privée")}</span></div>
              <span style={{ fontSize: 13, color: "#5a5750" }}>{t(lang, "15 min · By invitation", "15 min · Sur invitation")}</span>
            </div>
            <div style={{ color: "#9a9790", fontSize: 14, lineHeight: 1.75 }}>
              {t(lang, "Quick call to understand your situation. I need to know if my method fits before we commit. I only take on clients where I can create real structural impact.", "Appel rapide pour comprendre votre situation. J'ai besoin de savoir si ma méthode correspond avant de s'engager. Je n'accepte que les clients où je peux créer un vrai impact structurel.")}
            </div>
          </div>

          {/* Card 2 - Featured */}
          <div style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 12, padding: "28px 32px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
              <div><span style={{ fontSize: 11, fontWeight: 600, color: "#c9a84c", letterSpacing: "0.06em", marginRight: 8 }}>02</span><span style={{ fontSize: 17, fontWeight: 600 }}>{t(lang, "Wealth Architecture", "Architecture Patrimoniale")}</span></div>
              <span style={{ fontSize: 17, fontWeight: 700, color: "#c9a84c" }}>{t(lang, "€1,500", "1 500 €")}</span>
            </div>
            <div style={{ color: "#9a9790", fontSize: 14, lineHeight: 1.75 }}>
              {t(lang, "Your full personalized wealth blueprint. Delivered in one week.", "Votre blueprint patrimonial complet et personnalisé. Livré en une semaine.")}
              <ul style={{ listStyle: "none", padding: 0, marginTop: 10 }}>
                {[
                  t(lang, "Deep intake session (1h30). Full cartography of your financial life", "Session d'intake approfondie (1h30). Cartographie complète de votre vie financière"),
                  t(lang, "Custom wealth flow schema built around your situation", "Schéma de flux patrimonial sur mesure conçu autour de votre situation"),
                  t(lang, "Visual blueprint + roadmap of 5 to 10 structural moves", "Blueprint visuel + feuille de route de 5 à 10 actions structurelles"),
                  t(lang, "Delivery session (1h). Private walkthrough of your architecture", "Session de restitution (1h). Présentation privée de votre architecture"),
                ].map((item, i) => (
                  <li key={i} style={{ padding: "5px 0 5px 22px", position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: "#c9a84c" }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: "28px 32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
              <div><span style={{ fontSize: 11, fontWeight: 600, color: "#c9a84c", letterSpacing: "0.06em", marginRight: 8 }}>03</span><span style={{ fontSize: 17, fontWeight: 600 }}>{t(lang, "Quarterly review", "Revue trimestrielle")}</span></div>
              <span style={{ fontSize: 17, fontWeight: 700, color: "#c9a84c" }}>{t(lang, "€300 / quarter", "300 € / trimestre")}</span>
            </div>
            <div style={{ color: "#9a9790", fontSize: 14, lineHeight: 1.75 }}>
              {t(lang, "45-min private session each quarter. We update your schema, track execution, adjust priorities. Includes a private newsletter breaking down macro news and what it means for your architecture.", "Session privée de 45 min chaque trimestre. On met à jour votre schéma, on suit l'exécution, on ajuste les priorités. Inclus : newsletter privée décryptant l'actualité macro et son impact sur votre architecture.")}
            </div>
          </div>

          {/* Card 4 */}
          <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: "28px 32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
              <div><span style={{ fontSize: 11, fontWeight: 600, color: "#c9a84c", letterSpacing: "0.06em", marginRight: 8 }}>04</span><span style={{ fontSize: 17, fontWeight: 600 }}>{t(lang, "Direct line", "Ligne directe")}</span></div>
              <span style={{ fontSize: 13, color: "#5a5750" }}>{t(lang, "Included", "Inclus")}</span>
            </div>
            <div style={{ color: "#9a9790", fontSize: 14, lineHeight: 1.75 }}>
              {t(lang, "Active clients have direct access to me between sessions. No assistant, no ticketing system. You message me, I respond personally.", "Les clients actifs ont un accès direct à moi entre les sessions. Pas d'assistant, pas de système de tickets. Vous m'écrivez, je réponds personnellement.")}
            </div>
          </div>
        </div>
      </section>

      <hr style={{ maxWidth: 760, margin: "0 auto", border: "none", borderTop: "1px solid #222" }} />

      {/* BOUNDARIES */}
      <section ref={addFadeRef} style={{ padding: "80px 24px", maxWidth: 760, margin: "0 auto", opacity: 0, transform: "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16 }}>
          {t(lang, "Independence", "Indépendance")}
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 20 }}>
          {t(lang, "What I don't do", "Ce que je ne fais pas")}
        </h2>
        <div style={{ marginTop: 28 }}>
          {[
            t(lang, "No financial product recommendations. Ever.", "Aucune recommandation de produits financiers. Jamais."),
            t(lang, "No portfolio management or transaction execution", "Aucune gestion de portefeuille ou exécution de transactions"),
            t(lang, "No ties with any bank, insurer, or platform. Fully independent.", "Aucun lien avec aucune banque, assureur ou plateforme. Totalement indépendant."),
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "10px 0", color: "#9a9790", fontSize: 15 }}>
              <span style={{ color: "#5a5750", fontWeight: 500, flexShrink: 0, marginTop: 1 }}>✗</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ maxWidth: 760, margin: "0 auto", border: "none", borderTop: "1px solid #222" }} />

      {/* CTA */}
      <div ref={addFadeRef} id="book" style={{ textAlign: "center", padding: "100px 24px 140px", maxWidth: 760, margin: "0 auto", position: "relative", opacity: 0, transform: "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
        <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />
        <h2 style={{ fontSize: 32, fontWeight: 600, marginBottom: 16 }}>
          {t(lang, "Ready to architect your wealth?", "Prêt à structurer votre patrimoine ?")}
        </h2>
        <p style={{ color: "#9a9790", marginBottom: 36, fontSize: 16 }}>
          {t(lang, "15-minute private call. No commitment. I'll tell you honestly if I can help.", "Appel privé de 15 minutes. Sans engagement. Je vous dirai honnêtement si je peux vous aider.")}
        </p>
        <a href="#" style={{
          display: "inline-block", padding: "16px 44px", background: "#c9a84c", color: "#0e0e0e",
          textDecoration: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, letterSpacing: "0.03em",
        }}>
          {t(lang, "Request your consultation", "Demander votre consultation")}
        </a>
      </div>

      {/* FOOTER */}
      <footer style={{
        padding: "28px 40px", borderTop: "1px solid #222",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 12, color: "#5a5750", letterSpacing: "0.02em", flexWrap: "wrap", gap: 8,
      }}>
        <span>{t(lang, "Peer engagement · Private & confidential · Your preferences, your architecture", "Engagement entre pairs · Privé & confidentiel · Vos préférences, votre architecture")}</span>
        <Link to="/" style={{ color: "#9a9790", textDecoration: "none" }}>jeremylasne.com</Link>
      </footer>
    </div>
  );
};

export default Wealth;
