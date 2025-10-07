import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Twitter, ExternalLink, Lock } from "lucide-react";
import profileImage from "@/assets/profile-picture.jpg";
import tasuLogo from "@/assets/tasu-logo.png";
import citadelisLogo from "@/assets/citadelis-logo.png";

const Index = () => {
  const projects = [
    {
      name: "Wealth Manager",
      description: "Private wealth management through traditional finance, crypto, and private equity",
      icon: Lock,
      status: "Private • Closed",
      expertise: "8+ years investing • Ex-financial advisor",
      gradient: "from-amber-50 to-orange-50",
    },
    {
      name: "Tasu",
      description: "Power insight with feedback analytics",
      logo: tasuLogo,
      url: "https://tasu.ai",
      type: "SaaS Platform",
      coFounders: "Ben Boarer and Dimitri Gilbert",
      gradient: "from-blue-50 to-indigo-50",
    },
    {
      name: "Citadelis",
      description: "Sell their business at best price & terms",
      logo: citadelisLogo,
      url: "https://citadelis.pro",
      type: "Service to Business Owners",
      coFounders: "Maxime Houel and Emilio Fernandez",
      gradient: "from-emerald-50 to-teal-50",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-[350px_1fr] gap-8 lg:gap-12">
          {/* Profile Section */}
          <div className="lg:sticky lg:top-20 h-fit">
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
              <div className="flex flex-col items-center text-center space-y-6">
                <img
                  src={profileImage}
                  alt="Jeremy LASNE"
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-accent/20"
                />
                
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-foreground">Jeremy LASNE</h1>
                  <p className="text-muted-foreground">Investor & Entrepreneur</p>
                </div>

                <Button
                  variant="outline"
                  className="w-full group"
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
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Projects</h2>
              <p className="text-muted-foreground">
                Exploring opportunities across wealth management, SaaS, and business services
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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
                            <Icon className="w-7 h-7 text-primary" />
                          </div>
                        )}
                      </div>

                      {project.url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-shrink-0"
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
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {project.status || project.type}
                      </p>

                      <p className="text-foreground/80 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      <div className="mt-auto space-y-2">
                        {project.expertise && (
                          <p className="text-sm text-muted-foreground italic">
                            {project.expertise}
                          </p>
                        )}
                        {project.coFounders && (
                          <p className="text-sm text-muted-foreground">
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
    </div>
  );
};

export default Index;
