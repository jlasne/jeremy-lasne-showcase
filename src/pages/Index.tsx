import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Twitter, ExternalLink, Youtube } from "lucide-react";
import profileImage from "@/assets/profile-picture-new.jpg";
import tasuLogo from "@/assets/tasu-logo.png";
import interviewLogo from "@/assets/interview-logo.png";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const interviews = [
    {
      title: "Launch Everything you Make",
      description: "Launching is not a one time event, it's a weekly marketing move, for every simple thing you make",
      videoId: "wAi0g0aG9fk",
      url: "https://tasu.ai",
    },
  ];

  return (
    <div className="min-h-screen bg-[#2a2a2a]">
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          {/* Left: Personal Profile & Channel Intro */}
          <div className="space-y-8">
            {/* Profile Picture */}
            <div className="flex justify-center lg:justify-start">
              <img
                src={profileImage}
                alt="Jeremy LASNE"
                className="w-40 h-40 rounded-full object-cover ring-4 ring-white/20"
              />
            </div>

            {/* Name and Tagline */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold text-white mb-2">Jeremy LASNE</h1>
              <p className="text-sm italic text-gray-400">
                Business growth is all about users. I host founders to prove it.
              </p>
            </div>

            {/* About Tasu */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 overflow-hidden flex-shrink-0">
                  <img src={tasuLogo} alt="Tasu logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-semibold">Growing Tasu</p>
                  <p className="text-sm text-gray-400">with Ben Boarer & Dimitri Gilbert</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10 px-0" asChild>
                <a href="https://tasu.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Learn more about Tasu <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            </div>

            {/* Interview Founders */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 overflow-hidden flex-shrink-0">
                  <img src={interviewLogo} alt="Interview logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-semibold">Interview Founders</p>
                  <p className="text-sm text-gray-400">Hosting a Talk about Business</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10 px-0" asChild>
                <a
                  href="https://x.com/jeremylasne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Contact me on X <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start pt-4">
              <a
                href="https://x.com/jeremylasne"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.youtube.com/@jeremyfounder"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Right: Interview Feed */}
          <div className="mt-8 lg:mt-0">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Feed</h2>

            <div className="space-y-6">
              {/* Coming Soon Section */}
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 flex items-center justify-center">
                <p className="text-gray-400 text-sm">Interviews coming soon</p>
              </div>

              <Separator className="bg-gray-600" />

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
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{interview.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{interview.description}</p>
                  </div>

                  {/* Right: Video */}
                  <div className="w-full md:w-64 flex-shrink-0">
                    <div className="aspect-video w-full rounded-lg overflow-hidden">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${interview.videoId}?autoplay=1&mute=1&loop=1&playlist=${interview.videoId}&controls=0`}
                        title={interview.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
