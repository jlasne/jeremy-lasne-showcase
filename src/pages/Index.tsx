import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import VideoEmbed from "@/components/VideoEmbed";
import { INTERVIEWS } from "@/constants/interviews";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 pt-[110px] md:pt-[140px]">
        <div className="space-y-6">
          {INTERVIEWS.map((interview) => (
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
                <VideoEmbed videoId={interview.videoId} title={interview.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
