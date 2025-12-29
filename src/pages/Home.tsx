import NavBar from "@/components/NavBar";
import CTACard from "@/components/CTACard";
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
  },
  {
    name: "Trustviews",
    description: "Your Traffic Shareable And Trusted",
    logo: trustviewsLogo,
    type: "side" as const,
    url: "https://trustviews.io",
  },
  {
    name: "OneDollarFeedback",
    description: "Collect user feedback for just $1/month",
    logo: onedollarfeedbackLogo,
    type: "side" as const,
    url: "https://onedollarfeedback.com",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      {/* Hero Section */}
      <section className="pt-[110px] md:pt-[140px] pb-8 md:pb-12 px-6 md:px-8">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: Intro */}
          <div className="text-left">
            <h1 className="text-[42px] md:text-[48px] lg:text-[56px] font-black leading-[1.1] mb-4 md:mb-6 tracking-tight">
              Hey, I'm Jeremy.
            </h1>
            <p className="text-[15px] md:text-[17px] lg:text-[18px] leading-relaxed text-muted-foreground mb-6 md:mb-8">
              Obsessed with simple products that actually bring value.
            </p>
            <div className="flex gap-4 items-center">
              <a
                href="https://x.com/jeremylasne"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center text-muted-foreground bg-secondary rounded-lg hover:text-foreground hover:bg-accent-red hover:-translate-y-1 transition-all"
                aria-label="X (Twitter)"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@jeremyfounder"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center text-muted-foreground bg-secondary rounded-lg hover:text-foreground hover:bg-accent-red hover:-translate-y-1 transition-all"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Current Projects */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Current Projects
            </h3>
            {projects.map((project) => {
              const isComingSoon = project.name === "Retn";

              return isComingSoon ? (
                <div
                  key={project.name}
                  className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 relative overflow-hidden"
                >
                  <div className="absolute inset-0 backdrop-blur-[2px] bg-background/30 z-10 flex items-center justify-center">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <img src={project.logo} alt={`${project.name} logo`} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{project.name}</span>
                      <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                        {project.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{project.description}</p>
                  </div>
                </div>
              ) : (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                >
                  <img src={project.logo} alt={`${project.name} logo`} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{project.name}</span>
                      <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                        {project.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{project.description}</p>
                  </div>
                </a>
              );
            })}

            {/* Reddit Guide */}
            <a
              href="/reddit"
              className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">Reddit Strategy</span>
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                    guide
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  The best platform for bootstrapped founders in 2026
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
      {/* TrustViews Bento */}
      <section className="px-6 md:px-8 pb-12 md:pb-16 flex justify-center">
        <iframe
          src="https://trustviews.io/w/jeremylasne/bento"
          width="600"
          height="412"
          frameBorder="0"
          scrolling="no"
          className="rounded-xl max-w-full"
        ></iframe>
      </section>
    </div>
  );
};

export default Home;
