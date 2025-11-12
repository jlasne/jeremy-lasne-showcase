import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Twitter, ExternalLink, Lock } from "lucide-react";
import profileImage from "@/assets/profile-picture.jpg";
import tasuLogo from "@/assets/tasu-logo.png";

const Index = () => {
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
      <div className="container max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="space-y-6">
          {/* Grid with Profile and Projects */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Profile Tile */}
            <Card className="p-4 hover:shadow-2xl transition-all duration-300 border-2 border-[#0d2000]/10 bg-white flex flex-col h-full">
              <div className="flex flex-col items-center text-center space-y-4 flex-1">
                <img
                  src={profileImage}
                  alt="Jeremy LASNE"
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-[#0d2000]/20"
                />

                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-[#0d2000] tracking-tight">Jeremy LASNE</h2>
                  <p className="text-[#0d2000] text-base">Business & Entrepreneurship</p>
                </div>

                <Button className="w-full group mt-auto bg-[#0d2000] text-white hover:bg-[#0d2000]/90 border-0" asChild>
                  <a
                    href="https://x.com/jeremylasne"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Twitter className="w-4 h-4" />
                    <span>Follow on X</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              </div>
            </Card>

            {/* Project Tiles */}
            {projects.map((project) => {
              const CardContent = (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-white shadow-md overflow-hidden">
                        <img src={project.logo} alt={`${project.name} logo`} className="w-full h-full object-cover" />
                      </div>
                    </div>

                    {project.url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-shrink-0 text-[#0d2000] hover:bg-[#0d2000]/10 pointer-events-none"
                      >
                        <span className="flex items-center gap-1">
                          Visit
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </Button>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-[#0d2000] mb-1">{project.name}</h3>
                    <p className="text-sm text-[#0d2000] mb-3">{project.type}</p>

                    <p className="text-[#0d2000] leading-relaxed mb-4">{project.description}</p>

                    <div className="mt-auto space-y-2">
                      {project.coFounders && (
                        <p className="text-sm text-[#0d2000]">
                          <span className="font-medium">Co-founders:</span> {project.coFounders}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              );

              return project.url ? (
                <a key={project.name} href={project.url} target="_blank" rel="noopener noreferrer" className="block">
                  <Card className="p-4 hover:shadow-2xl transition-all duration-300 border-2 border-[#0d2000]/10 bg-white flex flex-col h-full cursor-pointer">
                    {CardContent}
                  </Card>
                </a>
              ) : (
                <Card
                  key={project.name}
                  className="p-4 hover:shadow-2xl transition-all duration-300 border-2 border-[#0d2000]/10 bg-white flex flex-col h-full"
                >
                  {CardContent}
                </Card>
              );
            })}
          </div>

          {/* YouTube Channel Link */}
          <div className="mt-8">
            <a href="https://www.youtube.com/@jeremyfounder" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="p-6 hover:shadow-2xl transition-all duration-300 border-2 border-[#0d2000]/10 bg-white cursor-pointer">
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-8 h-8 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span className="text-xl font-semibold text-[#0d2000]">Visit my YouTube Channel</span>
                  <ExternalLink className="w-5 h-5 text-[#0d2000]" />
                </div>
              </Card>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
