import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import jlLogo from "@/assets/jl-logo.png";


const Home = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const spawnParticles = useCallback((panel: HTMLDivElement, isLeft: boolean) => {
    for (let i = 0; i < 6; i++) {
      const p = document.createElement("div");
      p.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        z-index: 5;
        background: ${isLeft ? "hsla(0, 70%, 45%, 0.6)" : "hsla(43, 55%, 55%, 0.6)"};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleDrift ${1.2 + Math.random() * 0.8}s ease-out forwards;
        animation-delay: ${Math.random() * 0.3}s;
        --dx: ${(Math.random() - 0.5) * 80}px;
        --dy: ${(Math.random() - 0.5) * 80}px;
      `;
      panel.appendChild(p);
      setTimeout(() => p.remove(), 2200);
    }
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes jl-fadeUp {
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes jl-float {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(15px, -20px) scale(1.05); }
        66% { transform: translate(-10px, 10px) scale(0.95); }
      }
      @keyframes particleDrift {
        0% { opacity: 0; transform: translate(0, 0) scale(0); }
        20% { opacity: 0.8; transform: scale(1); }
        100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0); }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const handleMouseEnterLeft = () => {
    setHovered("left");
    if (leftRef.current) spawnParticles(leftRef.current, true);
  };

  const handleMouseEnterRight = () => {
    setHovered("right");
    if (rightRef.current) spawnParticles(rightRef.current, false);
  };

  // Shared sizes
  const floatSizes = [120, 80, 60, 40];

  return (
    <div
      className="relative flex flex-col md:flex-row w-full min-h-screen overflow-hidden select-none"
      onMouseLeave={() => setHovered(null)}
    >
      {/* ===== SOLO FOUNDER PANEL ===== */}
      <div
        ref={leftRef}
        className="relative flex-1 flex items-center justify-center cursor-pointer overflow-hidden min-h-[50vh] md:min-h-screen"
        style={{
          flex: hovered === "left" ? 1.35 : hovered === "right" ? 0.65 : 1,
          transition: "flex 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          background: "hsl(0, 0%, 6%)",
        }}
        onClick={() => navigate("/maker")}
        onMouseEnter={handleMouseEnterLeft}
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: hovered === "left"
              ? "radial-gradient(circle at 50% 50%, hsla(0, 70%, 45%, 0.12) 0%, transparent 70%)"
              : "none",
            transition: "background 0.5s ease",
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(hsla(0, 0%, 100%, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, hsla(0, 0%, 100%, 0.03) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating shapes */}
        {floatSizes.map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size,
              height: size,
              border: "1px solid hsla(0, 70%, 45%, 0.08)",
              top: `${15 + i * 20}%`,
              left: `${10 + i * 18}%`,
              animation: `jl-float ${6 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">

          <h2
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{
              color: "hsl(0, 0%, 94%)",
              opacity: 0,
              transform: "translateY(20px)",
              animation: "jl-fadeUp 0.8s ease forwards 0.4s",
            }}
          >
            Solo Founder
          </h2>

          <p
            className="text-sm md:text-base leading-relaxed mb-8"
            style={{
              color: "hsl(0, 0%, 55%)",
              opacity: 0,
              transform: "translateY(20px)",
              animation: "jl-fadeUp 0.8s ease forwards 0.6s",
            }}
          >
            Building in public. Shipping fast. Logbook, projects & lessons from the trenches.
          </p>

          <button
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
            style={{
              background: "hsl(0, 70%, 45%)",
              color: "white",
              boxShadow: "0 4px 20px hsla(0, 70%, 45%, 0.3)",
              opacity: 0,
              transform: "translateY(20px)",
              animation: "jl-fadeUp 0.8s ease forwards 0.8s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.04)";
              e.currentTarget.style.boxShadow = "0 8px 30px hsla(0, 70%, 45%, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 20px hsla(0, 70%, 45%, 0.3)";
            }}
          >
            I build products
            <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 6H10M10 6L7 3M10 6L7 9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <p
            className="mt-8 text-xs tracking-widest uppercase"
            style={{
              color: "hsl(0, 0%, 35%)",
              opacity: 0,
              transform: "translateY(20px)",
              animation: "jl-fadeUp 0.8s ease forwards 1s",
            }}
          >
            Ship fast, learn faster
          </p>
        </div>
      </div>

      {/* ===== DIVIDER ===== */}
      <div
        className="hidden md:block absolute top-0 bottom-0 z-20"
        style={{
          left: hovered === "left" ? "57.5%" : hovered === "right" ? "42.5%" : "50%",
          transition: "left 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          width: "2px",
          background: "linear-gradient(to bottom, transparent, hsla(0, 0%, 100%, 0.1), transparent)",
        }}
      />

      {/* ===== PRIVATE WEALTH PANEL ===== */}
      <div
        ref={rightRef}
        className="relative flex-1 flex items-center justify-center cursor-pointer overflow-hidden min-h-[50vh] md:min-h-screen"
        style={{
          flex: hovered === "right" ? 1.35 : hovered === "left" ? 0.65 : 1,
          transition: "flex 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          background: "hsl(40, 5%, 8%)",
        }}
        onClick={() => navigate("/wealth")}
        onMouseEnter={handleMouseEnterRight}
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: hovered === "right"
              ? "radial-gradient(circle at 50% 50%, hsla(43, 55%, 55%, 0.12) 0%, transparent 70%)"
              : "none",
            transition: "background 0.5s ease",
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(hsla(0, 0%, 100%, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, hsla(0, 0%, 100%, 0.03) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating shapes */}
        {floatSizes.map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size,
              height: size,
              border: "1px solid hsla(43, 55%, 55%, 0.08)",
              top: `${15 + i * 20}%`,
              right: `${10 + i * 18}%`,
              animation: `jl-float ${6 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">

          <h2
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{
              color: "hsl(40, 10%, 90%)",
              opacity: 0,
              transform: "translateY(20px)",
              animation: "jl-fadeUp 0.8s ease forwards 0.4s",
            }}
          >
            Private Wealth Architect
          </h2>

          <p
            className="text-sm md:text-base leading-relaxed mb-8"
            style={{
              color: "hsl(40, 5%, 55%)",
              opacity: 0,
              transform: "translateY(20px)",
              animation: "jl-fadeUp 0.8s ease forwards 0.6s",
            }}
          >
            Personalized wealth flow blueprints for high-earners who want a system, not a salesman.
          </p>

          <button
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
            style={{
              background: "hsl(43, 55%, 55%)",
              color: "hsl(40, 5%, 8%)",
              boxShadow: "0 4px 20px hsla(43, 55%, 55%, 0.3)",
              opacity: 0,
              transform: "translateY(20px)",
              animation: "jl-fadeUp 0.8s ease forwards 0.8s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.04)";
              e.currentTarget.style.boxShadow = "0 8px 30px hsla(43, 55%, 55%, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 20px hsla(43, 55%, 55%, 0.3)";
            }}
          >
            I design systems
            <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 6H10M10 6L7 3M10 6L7 9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <p
            className="mt-8 text-xs tracking-widest uppercase"
            style={{
              color: "hsl(40, 5%, 35%)",
              opacity: 0,
              transform: "translateY(20px)",
              animation: "jl-fadeUp 0.8s ease forwards 1s",
            }}
          >
            Structure · Optimize · Grow
          </p>
        </div>
      </div>

      {/* Center branding overlay */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
        <img src={jlLogo} alt="JL Logo" className="w-12 h-12 rounded-xl shadow-lg" />
      </div>
    </div>
  );
};

export default Home;
