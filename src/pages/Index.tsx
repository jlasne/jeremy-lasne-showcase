import { FileText } from "lucide-react";
import feedbackMapThumbnail from "@/assets/feedback-map-thumbnail.png";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";

const Index = () => {
  const navigate = useNavigate();

  const interviews = [
    {
      title: "Unveiling Actual Business Growth: The Feedback Map",
      description:
        "Most founders are leaving money on the table—not because they can't build, but because they're running their feedback loops blind. I built a framework that maps 11 critical feedback loops.",
      isArticle: true,
      thumbnail: feedbackMapThumbnail,
      url: "/interview/feedback-map",
    },
    {
      title: "Don't Build in Silence",
      description:
        "Interviewed @Aevmorfop, who built an app to quit smoking—not as a startup idea, but because he was in personal hell. He shared the process publicly, and a stranger used his tool to quit too.",
      videoId: "6QrRr1cxVhg",
      url: "/interview/quitesmoking",
    },
    {
      title: "Turn Pricing Into Your Growth Lever",
      description:
        "Interviewed Ger (@MPlegas), founder of Tierly. He built Tierly for SaaS teams who are tired of guessing at pricing. Pricing is a critical strength—Tierly makes it a marketing asset.",
      videoId: "kHqBqCtPZUs",
      url: "/interview/tierly",
    },
    {
      title: "Why Most Voice Tools Are Breaking Your Thoughts",
      description:
        "Current AI tools smooth out your voice, removing emotion and energy. Ramble keeps your thoughts intact without alterations or censorship—organizing your raw ideas exactly as you speak them.",
      videoId: "T8wscu8Eu54",
      url: "/interview/ramble",
    },
    {
      title: "Launch Everything you Make",
      description: "Launching is not a one time event, it's a weekly marketing move, for every simple thing you make",
      videoId: "wAi0g0aG9fk",
      url: "https://tasu.ai",
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
                {interview.isArticle && (
                  <span className="inline-block mt-2 text-xs bg-cta-orange/20 text-cta-orange px-2 py-1 rounded">
                    Article
                  </span>
                )}
              </div>

              {/* Right: Video or Placeholder */}
              <div className="w-full md:w-64 flex-shrink-0">
                {interview.videoId ? (
                  <div className="aspect-video w-full rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${interview.videoId}`}
                      title={interview.title}
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : interview.thumbnail ? (
                  <div className="aspect-video w-full rounded-lg overflow-hidden">
                    <img
                      src={interview.thumbnail}
                      alt={interview.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full rounded-lg bg-secondary border border-border flex items-center justify-center">
                    <FileText className="w-12 h-12 text-cta-orange/50" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
