import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";

const Index = () => {
  const navigate = useNavigate();

  const interviews = [
    {
      title: "Don't Build in Silence",
      description:
        "Interviewed @Aevmorfop, who built an app to quit smoking—not as a startup idea, but because he was in personal hell. He shared the process publicly, and a stranger used his tool to quit too.",
      videoId: "6QrRr1cxVhg",
      url: "/talk/quitesmoking",
    },
    {
      title: "Turn Pricing Into Your Growth Lever",
      description:
        "Interviewed Ger (@MPlegas), founder of Tierly. He built Tierly for SaaS teams who are tired of guessing at pricing. Pricing is a critical strength—Tierly makes it a marketing asset.",
      videoId: "kHqBqCtPZUs",
      url: "/talk/tierly",
    },
    {
      title: "Why Most Voice Tools Are Breaking Your Thoughts",
      description:
        "Current AI tools smooth out your voice, removing emotion and energy. Ramble keeps your thoughts intact without alterations or censorship—organizing your raw ideas exactly as you speak them.",
      videoId: "T8wscu8Eu54",
      url: "/talk/ramble",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 pt-[110px] md:pt-[140px]">
        <div className="space-y-6">
          {interviews.map((interview) => (
            <div
              key={interview.title}
              className="flex flex-col md:flex-row gap-4 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() =>
                interview.url.startsWith("/") ? navigate(interview.url) : window.open(interview.url, "_blank")
              }
            >
              {/* Left: Title and Description */}
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{interview.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{interview.description}</p>
              </div>

              {/* Right: Video */}
              <div className="w-full md:w-64 flex-shrink-0">
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${interview.videoId}`}
                    title={interview.title}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
