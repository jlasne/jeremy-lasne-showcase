import NavBar from "@/components/NavBar";
import profilePicture from "@/assets/profile-picture-new.jpg";
import Timeline, { type TimelineEntry } from "@/components/ui/timeline";

const projects = [
  {
    name: "StartupHunt",
    description: "Learn how successful startups make money",
    url: "https://startuphunt.io",
  },
  {
    name: "Trustviews",
    description: "Your Traffic Shareable And Trusted",
    url: "https://trustviews.io",
  },
  {
    name: "OneDollarFeedback",
    description: "Collect user feedback for just $1/month",
    url: "https://onedollarfeedback.com",
  },
];

const logbookEntries: TimelineEntry[] = [
  {
    date: "March 9, 2025",
    title: "Launched StartupHunt newsletter",
    content:
      "Started a weekly newsletter breaking down how successful startups make money. First issue sent to 200+ subscribers.",
  },
  {
    date: "March 1, 2025",
    title: "Trustviews hits 500 listings",
    content:
      "Reached 500 verified directory listings on Trustviews. Organic traffic growing steadily week over week.",
  },
  {
    date: "February 20, 2025",
    title: "OneDollarFeedback launched",
    content:
      "Shipped the MVP of OneDollarFeedback — a dead-simple feedback widget for $1/month. First paying customers on day one.",
  },
  {
    date: "February 10, 2025",
    title: "Redesigned personal site",
    content:
      "Complete overhaul of my portfolio site. New logbook format to share the building journey publicly.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-[100px] md:pt-[120px] pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column - Profile & Projects */}
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
                On a mission to help 10,000 founders hit their next revenue milestone.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3 mb-8">
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

              {/* Projects List */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Projects
                </h3>
                <div className="space-y-3">
                  {projects.map((project) => (
                    <a
                      key={project.name}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.name}
                      </span>
                      <p className="text-xs text-muted-foreground">{project.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Logbook Timeline */}
          <div className="lg:col-span-8 xl:col-span-9">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
              Logbook
            </h3>
            <Timeline entries={logbookEntries} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
