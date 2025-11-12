import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Twitter, ExternalLink, Youtube } from "lucide-react";
import profileImage from "@/assets/profile-picture-new.jpg";
import tasuLogo from "@/assets/tasu-logo.png";
import { useState, useRef, useEffect } from "react";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // @ts-ignore
    window.onYouTubeIframeAPIReady = () => {
      // @ts-ignore
      playerRef.current = new window.YT.Player('youtube-player', {
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          },
        },
      });
    };
  }, []);

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        playerRef.current.mute();
      } else {
        playerRef.current.playVideo();
        playerRef.current.unMute();
      }
      setIsPlaying(!isPlaying);
      setIsMuted(!isPlaying);
    }
  };
  const projects = [
    {
      name: "Tasu",
      description: "User-first business growth (Behavior and Feedback)",
      logo: tasuLogo,
      url: "https://tasu.ai",
      type: "SaaS Platform",
      coFounders: "Ben Boarer & Dimitri Gilbert",
      gradient: "from-blue-50 to-indigo-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#2a2a2a]">
      <div className="container max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        <div className="space-y-4 sm:space-y-5">
          {/* Grid with Profile and Projects */}
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Profile Tile */}
            <Card className="p-4 sm:p-5 hover:shadow-xl transition-all duration-300 border border-[#0d2000]/10 bg-white flex flex-col h-full">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center h-full">
                {/* Left side: Picture, Name, Description */}
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={profileImage}
                    alt="Jeremy LASNE"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-2 ring-[#0d2000]/20 flex-shrink-0"
                  />
                  <div className="text-left">
                    <h2 className="text-lg sm:text-xl font-bold text-[#0d2000] tracking-tight leading-tight">Jeremy LASNE</h2>
                    <p className="text-xs sm:text-sm text-[#0d2000] mt-0.5">Business & Entrepreneurship</p>
                  </div>
                </div>

                {/* Right side: Buttons */}
                <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto sm:min-w-[140px]">
                  <Button size="sm" className="flex-1 sm:flex-none group bg-[#0d2000] text-white hover:bg-[#0d2000]/90 border-0 h-9" asChild>
                    <a
                      href="https://x.com/jeremylasne"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5"
                    >
                      <Twitter className="w-3.5 h-3.5" />
                      <span className="text-xs sm:text-sm">X</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                  
                  <Button size="sm" className="flex-1 sm:flex-none group bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 border-0 h-9" asChild>
                    <a
                      href="https://www.youtube.com/@jeremyfounder"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                      <span className="text-xs sm:text-sm">YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Project Tiles */}
            {projects.map((project) => {
              const CardContent = (
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white shadow-md overflow-hidden">
                        <img src={project.logo} alt={`${project.name} logo`} className="w-full h-full object-cover" />
                      </div>
                    </div>

                    {project.url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-shrink-0 text-[#0d2000] hover:bg-[#0d2000]/10 pointer-events-none h-8 text-xs"
                      >
                        <span className="flex items-center gap-1">
                          Visit
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </Button>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-[#0d2000] mb-0.5">{project.name}</h3>
                      <p className="text-xs sm:text-sm text-[#0d2000] mb-2">{project.type}</p>
                      <p className="text-sm sm:text-base text-[#0d2000] leading-relaxed">{project.description}</p>
                    </div>

                    {project.coFounders && (
                      <p className="text-xs sm:text-sm text-[#0d2000] mt-3">
                        <span className="font-medium">Co-founders:</span> {project.coFounders}
                      </p>
                    )}
                  </div>
                </div>
              );

              return project.url ? (
                <a key={project.name} href={project.url} target="_blank" rel="noopener noreferrer" className="block">
                  <Card className="p-4 sm:p-5 hover:shadow-xl transition-all duration-300 border border-[#0d2000]/10 bg-white flex flex-col h-full cursor-pointer">
                    {CardContent}
                  </Card>
                </a>
              ) : (
                <Card
                  key={project.name}
                  className="p-4 sm:p-5 hover:shadow-xl transition-all duration-300 border border-[#0d2000]/10 bg-white flex flex-col h-full"
                >
                  {CardContent}
                </Card>
              );
            })}
          </div>

          {/* Video Section */}
          <div>
            <Card className="p-0 overflow-hidden border border-[#0d2000]/10 bg-white">
              <div 
                className="relative w-full cursor-pointer" 
                style={{ paddingBottom: "56.25%" }}
                onClick={togglePlayPause}
              >
                <iframe
                  id="youtube-player"
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/FoPWLZdk51M?autoplay=1&loop=1&playlist=FoPWLZdk51M&controls=0&modestbranding=1&enablejsapi=1"
                  title="Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[20px] sm:border-l-[24px] border-l-[#0d2000] border-t-[12px] sm:border-t-[14px] border-t-transparent border-b-[12px] sm:border-b-[14px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
