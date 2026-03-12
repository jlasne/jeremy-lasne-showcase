import NavBar from "@/components/NavBar";
import profilePicture from "@/assets/profile-picture-new.jpg";
import trustviewsLogo from "@/assets/trustviews-logo.png";
import onedollarfeedbackLogo from "@/assets/onedollarfeedback-logo.png";
import { Mail } from "lucide-react";
import Timeline, { type TimelineEntry } from "@/components/ui/timeline";

const projects = [
  {
    name: "Newsletter",
    description: "How do successful startups make money",
    url: "https://newsletter.jeremylasne.com",
    icon: Mail,
  },
  {
    name: "Trustviews",
    description: "Your Traffic Shareable And Trusted",
    url: "https://trustviews.io",
    logo: trustviewsLogo,
  },
  {
    name: "OneDollarFeedback",
    description: "Collect user feedback for just $1/month",
    url: "https://onedollarfeedback.com",
    logo: onedollarfeedbackLogo,
  },
];

const logbookEntries: TimelineEntry[] = [
  {
    date: "Coming soon",
    title: "Startuphunt journey starts here",
    content:
      "Polymarket for startups, built in a few days on TrustMRR.com api as Oracle. A competitor shipped before me but it's fine, free market. Now reaching out to people I know for them to test and have fun before going fully public.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-[100px] md:pt-[120px] pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column - Profile & Projects (fixed) */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="lg:fixed lg:top-[120px] lg:w-[calc((100vw-theme(maxWidth.7xl))/2+theme(maxWidth.7xl)*3/12-2rem)] xl:w-[calc((100vw-theme(maxWidth.7xl))/2+theme(maxWidth.7xl)*3/12-2rem)] lg:max-w-[280px]">
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
                On a mission to help 10,000 founders hit their next revenue milestone.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3 mb-8">
                <a
                  href="https://x.com/Jeremylasne"
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

              {/* Projects List */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Projects</h3>
                <div className="space-y-2">
                  {projects.map((project) => (
                    <a
                      key={project.name}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-all"
                    >
                      {project.icon ? (
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <project.icon className="w-4 h-4 text-primary" />
                        </div>
                      ) : (
                        <img
                          src={project.logo}
                          alt={`${project.name} logo`}
                          className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            {project.name}
                          </span>
                          <svg
                            className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M2 6H10M10 6L7 3M10 6L7 9" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{project.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Logbook Timeline */}
          <div className="lg:col-span-8 xl:col-span-9">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">Logbook</h3>
            <Timeline entries={logbookEntries} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
