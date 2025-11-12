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
            <Card className="p-6 hover:shadow-2xl transition-all duration-300 border-2 border-[#0d2000]/10 bg-white flex flex-col h-full">
              <div className="flex flex-col items-center text-center space-y-6 flex-1">
                <img
                  src={profileImage}
                  alt="Jeremy LASNE"
                  className="w-28 h-28 rounded-full object-cover ring-2 ring-[#0d2000]/20"
                />

                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-[#0d2000] tracking-tight">Jeremy LASNE</h2>
                  <p className="text-[#0d2000] text-lg">Business & Entrepreneurship</p>
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
                  <Card className="p-6 hover:shadow-2xl transition-all duration-300 border-2 border-[#0d2000]/10 bg-white flex flex-col h-full cursor-pointer">
                    {CardContent}
                  </Card>
                </a>
              ) : (
                <Card
                  key={project.name}
                  className="p-6 hover:shadow-2xl transition-all duration-300 border-2 border-[#0d2000]/10 bg-white flex flex-col h-full"
                >
                  {CardContent}
                </Card>
              );
            })}
          </div>

          {/* Video Section */}
          <div className="mt-8">
            <Card className="p-0 overflow-hidden border-2 border-[#0d2000]/10 bg-white">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/FoPWLZdk51M?autoplay=1&loop=1&mute=1&playlist=FoPWLZdk51M&controls=0&modestbranding=1"
                  title="Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
