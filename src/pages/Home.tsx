import NavBar from "@/components/NavBar";
import profilePicture from "@/assets/profile-picture-new.jpg";
import retnLogo from "@/assets/retn-logo.png";
import trustviewsLogo from "@/assets/trustviews-logo.png";
import onedollarfeedbackLogo from "@/assets/onedollarfeedback-logo.png";

const projects = [
  {
    name: "Retn",
    description: "Grow Revenue by 40% with Smart Retention.",
    logo: retnLogo,
    type: "main" as const,
    url: "https://retn.io",
    comingSoon: true,
  },
  {
    name: "Trustviews",
    description: "Your Traffic Shareable And Trusted",
    logo: trustviewsLogo,
    type: "side" as const,
    url: "https://trustviews.io",
    comingSoon: false,
  },
  {
    name: "OneDollarFeedback",
    description: "Collect user feedback for just $1/month",
    logo: onedollarfeedbackLogo,
    type: "side" as const,
    url: "https://onedollarfeedback.com",
    comingSoon: false,
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-[100px] md:pt-[120px] pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column - Profile */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-[120px]">
              {/* Profile Picture */}
              <div className="mb-6">
                <img
                  src={profilePicture}
                  alt="Jeremy Lasne"
                  className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover shadow-lg"
                />
              </div>

              {/* Name */}
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Jeremy Lasne</h1>

              {/* Tagline */}
              <p className="text-foreground mb-6 leading-relaxed text-sm md:text-base">
                Founder turning learnings from 13 failures into valuable projects
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3 mb-6">
                <a
                  href="https://x.com/Jeremylasne1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted text-muted-foreground hover:text-foreground rounded-lg transition-colors text-sm"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  @jeremylasne
                </a>
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <a
                  href="/reddit"
                  className="hover:text-foreground transition-colors underline underline-offset-2"
                >
                  Reddit Strategy Guide
                </a>
                <span className="text-border">•</span>
                <a
                  href="/talk"
                  className="hover:text-foreground transition-colors underline underline-offset-2"
                >
                  Interviews
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Project Cards */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8">
            {/* Main Projects */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Main Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.filter(p => p.type === "main").map((project) => (
                  <div
                    key={project.name}
                    className="relative bg-card rounded-xl p-5 border border-border/50 hover:border-border shadow-[0_4px_20px_-4px_rgba(139,0,0,0.3)] hover:shadow-[0_8px_30px_-4px_rgba(139,0,0,0.4)] transition-all"
                  >
                    {project.comingSoon && (
                      <div className="absolute inset-0 rounded-xl backdrop-blur-[2px] bg-background/40 z-10 flex items-center justify-center">
                        <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                          Coming Soon
                        </span>
                      </div>
                    )}
                    <a
                      href={project.comingSoon ? undefined : project.url}
                      target={project.comingSoon ? undefined : "_blank"}
                      rel={project.comingSoon ? undefined : "noopener noreferrer"}
                      className={project.comingSoon ? "cursor-default" : "cursor-pointer block"}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={project.logo}
                          alt={`${project.name} logo`}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <span className="font-semibold text-foreground">{project.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Projects */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Side Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.filter(p => p.type === "side").map((project) => (
                  <div
                    key={project.name}
                    className="relative bg-card rounded-xl p-5 border border-border/50 hover:border-border shadow-[0_4px_20px_-4px_rgba(139,0,0,0.3)] hover:shadow-[0_8px_30px_-4px_rgba(139,0,0,0.4)] transition-all"
                  >
                    {project.comingSoon && (
                      <div className="absolute inset-0 rounded-xl backdrop-blur-[2px] bg-background/40 z-10 flex items-center justify-center">
                        <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                          Coming Soon
                        </span>
                      </div>
                    )}
                    <a
                      href={project.comingSoon ? undefined : project.url}
                      target={project.comingSoon ? undefined : "_blank"}
                      rel={project.comingSoon ? undefined : "noopener noreferrer"}
                      className={project.comingSoon ? "cursor-default" : "cursor-pointer block"}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={project.logo}
                          alt={`${project.name} logo`}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <span className="font-semibold text-foreground">{project.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
