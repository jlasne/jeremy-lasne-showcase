import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Twitter, ExternalLink, Lock } from "lucide-react";
import profileImage from "@/assets/profile-picture.jpg";
import tasuLogo from "@/assets/tasu-logo.png";
import citadelisLogo from "@/assets/citadelis-logo.png";

const Index = () => {
  const projects = [
    {
      name: "Private Wealth Manager",
      description: "Investment & Wealth Strategies accross assets. Optimizing for performance and objectives",
      icon: Lock,
      status: "Recommendation",
      expertise: "8+ years investing • Ex-financial advisor",
      gradient: "from-slate-50 to-blue-50",
    },
    {
      name: "Tasu",
      description: "Power insight with feedback analytics",
      logo: tasuLogo,
      url: "https://tasu.ai",
      type: "SaaS Platform",
      coFounders: "Ben Boarer & Dimitri Gilbert",
      gradient: "from-blue-50 to-indigo-50",
    },
    {
      name: "Citadelis",
      description: "Sell their business at best price & terms",
      logo: citadelisLogo,
      url: "https://citadelis.pro",
      type: "Service to Business Owners",
      coFounders: "Maxime Houel & Emilio Fernandez",
      gradient: "from-indigo-50 to-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="space-y-6">
          {/* Subtle subtitle */}
          <p className="text-xs text-muted-foreground/60 max-w-2xl">
            Get your name, domain—it might be the next big thing in the future. Get ownership of your virtual identity
            and showcase your porfolio.
          </p>

          {/* Grid with Profile and Projects */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Profile Tile */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-gradient-to-br from-slate-50 to-gray-50 flex flex-col h-full">
              <div className="flex flex-col items-center text-center space-y-4 flex-1">
                <img
                  src={profileImage}
                  alt="Jeremy LASNE"
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-accent/20"
                />

                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-[#0d2000]">Jeremy LASNE</h2>
                  <p className="text-[#0d2000]">Investor & Entrepreneur</p>
                </div>

                <Button
                  variant="outline"
                  className="w-full group mt-auto border-[#0d2000] text-[#0d2000] hover:bg-[#0d2000] hover:text-white"
                  asChild
                >
                  <a
                    href="https://x.com/jeremylasne"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Twitter className="w-4 h-4" />
                    <span>Follow on X</span>
                    <ExternalLink className="w-3 h-3 opacity-100 group-hover:opacity-100 transition-opacity" />
                  </a>
                </Button>
              </div>
            </Card>

            {/* Project Tiles */}
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <Card
                  key={project.name}
                  className={`p-6 hover:shadow-lg transition-all duration-300 border-border bg-gradient-to-br ${project.gradient} flex flex-col h-full`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-shrink-0">
                      {project.logo ? (
                        <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm overflow-hidden">
                          <img src={project.logo} alt={`${project.name} logo`} className="w-10 h-10 object-contain" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                          <Icon className="w-7 h-7 text-[#0d2000]" />
                        </div>
                      )}
                    </div>

                    {project.url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-shrink-0 text-[#0d2000] hover:bg-[#0d2000]/10"
                        asChild
                      >
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          Visit
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-[#0d2000] mb-1">{project.name}</h3>
                    <p className="text-sm text-[#0d2000] mb-3">{project.status || project.type}</p>

                    <p className="text-[#0d2000] leading-relaxed mb-4">{project.description}</p>

                    <div className="mt-auto space-y-2">
                      {project.expertise && <p className="text-sm text-[#0d2000] italic">{project.expertise}</p>}
                      {project.coFounders && (
                        <p className="text-sm text-[#0d2000]">
                          <span className="font-medium">Co-founders:</span> {project.coFounders}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
