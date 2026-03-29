import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          backgroundColor: "#f5f0e8",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left side */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 0 60px 80px",
            width: 620,
            gap: 0,
          }}
        >
          {/* Tagline */}
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 3,
              color: "#8a8275",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            CONSULTING PATRIMONIAL INDÉPENDANT
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ fontSize: 72, fontWeight: 300, color: "#1a1a18", lineHeight: 1.1 }}>
              Un patrimoine
            </div>
            <div style={{ fontSize: 72, fontWeight: 700, color: "#c9a84c", lineHeight: 1.1 }}>
              structuré
            </div>
            <div style={{ fontSize: 72, fontWeight: 800, color: "#1a1a18", lineHeight: 1.1 }}>
              surperforme.
            </div>
          </div>

          {/* Gold accent line */}
          <div
            style={{
              width: 60,
              height: 3,
              backgroundColor: "#c9a84c",
              marginTop: 24,
              marginBottom: 24,
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              fontSize: 18,
              color: "#5a5750",
              lineHeight: 1.5,
              maxWidth: 480,
            }}
          >
            Pour les particuliers qui veulent un système, pas juste des produits.
          </div>

          {/* Domain */}
          <div
            style={{
              marginTop: "auto",
              paddingTop: 48,
              fontSize: 14,
              color: "#9a9790",
              letterSpacing: 1,
            }}
          >
            jeremylasne.com
          </div>
        </div>

        {/* Right side — phone mockup */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            paddingRight: 60,
            position: "relative",
          }}
        >
          {/* Phone frame */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 240,
              height: 420,
              backgroundColor: "#1a1a18",
              borderRadius: 32,
              padding: "28px 20px 20px",
              gap: 16,
              boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
            }}
          >
            {/* Screen header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 11, color: "#5a5750" }}>Portfolio</div>
              <div style={{ fontSize: 11, color: "#5a5750" }}>2025</div>
            </div>

            {/* Big performance number */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 12,
              }}
            >
              <div style={{ fontSize: 52, fontWeight: 800, color: "#c9a84c" }}>+33%</div>
              <div style={{ fontSize: 11, color: "#5a5750", marginTop: 4, textAlign: "center" }}>
                vs S&amp;P +18% · CAC -1%
              </div>
            </div>

            {/* Chart placeholder */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "flex-end",
                paddingBottom: 8,
                gap: 4,
              }}
            >
              {[30, 45, 35, 55, 50, 70, 65, 85, 80, 100].map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    backgroundColor: i === 9 ? "#c9a84c" : "rgba(201,168,76,0.25)",
                    borderRadius: 3,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Floating badges */}
          <div
            style={{
              position: "absolute",
              top: 80,
              right: 30,
              backgroundColor: "#c9a84c",
              color: "#1a1a18",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              padding: "5px 10px",
              borderRadius: 20,
            }}
          >
            PERFORMANCE
          </div>
          <div
            style={{
              position: "absolute",
              top: 220,
              right: 20,
              backgroundColor: "#1a1a18",
              color: "#c9a84c",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              padding: "5px 10px",
              borderRadius: 20,
              border: "1px solid #c9a84c",
            }}
          >
            STRUCTURE
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 110,
              right: 28,
              backgroundColor: "#f5f0e8",
              color: "#5a5750",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1,
              padding: "5px 10px",
              borderRadius: 20,
            }}
          >
            CLARTÉ
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
