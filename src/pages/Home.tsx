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
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Jeremy Lasne
              </h1>

              {/* Tagline */}
              <p className="text-muted-foreground italic mb-4">
                Building tools that make ideas visible.
              </p>

              {/* Description */}
              <p className="text-foreground mb-6 leading-relaxed text-sm md:text-base">
                I interview indie hackers & builders, and share how to ship fast, get users, and stay profitable 👇
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-5 mb-8">
                <a 
                  href="https://x.com/Jeremylasne1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.youtube.com/@Jeremylasne" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/jeremylasne/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>

              {/* Reddit Strategy Link */}
              <a 
                href="/reddit" 
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
                Reddit Strategy Guide
              </a>
            </div>
          </div>

          {/* Right Column - Project Cards */}
          <div className="lg:col-span-8 xl:col-span-9">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Current Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="relative bg-card rounded-xl p-5 border border-border/50 hover:border-border hover:shadow-md transition-all"
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
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{project.name}</span>
                          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                            {project.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </a>
                </div>
              ))}

              {/* Interviews Card */}
              <a
                href="/talk"
                className="bg-card rounded-xl p-5 border border-border/50 hover:border-border hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 7l-7 5 7 5V7z"/>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">Interviews</span>
                      <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent/20 text-accent">
                        watch
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Conversations with indie hackers & builders
                </p>
              </a>
            </div>

            {/* TrustViews Bento */}
            <div className="mt-8">
              <iframe
                src="https://trustviews.io/w/jeremylasne/bento"
                width="100%"
                height="320"
                frameBorder="0"
                scrolling="no"
                className="rounded-xl max-w-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;