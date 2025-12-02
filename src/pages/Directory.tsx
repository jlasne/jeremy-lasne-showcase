import NavBar from "@/components/NavBar";
import { ExternalLink } from "lucide-react";

interface DirectoryItem {
  name: string;
  tagline: string;
  description: string;
  link: string;
  pricing: string;
}

const DIRECTORIES: DirectoryItem[] = [
  {
    name: "indie.tools",
    tagline: "Discover amazing products by indie makers",
    description: "Hand-picked collection of software and digital products built by solo founders and small teams",
    link: "https://www.discoverindie.tools/",
    pricing: "Free to submit",
  },
  {
    name: "BetaList",
    tagline: "Discover tomorrow's startups, today",
    description: "Early-stage startup discovery platform that helps founders get visibility before launch",
    link: "https://betalist.com/",
    pricing: "Free + Paid options",
  },
  {
    name: "Product Hunt",
    tagline: "Where the best new products are discovered",
    description: "Leading platform for launching and discovering new tech products with daily rankings",
    link: "https://www.producthunt.com/",
    pricing: "Free + Paid promotions",
  },
  {
    name: "AppSumo",
    tagline: "Software deals for entrepreneurs",
    description: "Marketplace selling lifetime software deals; high-volume sales opportunity",
    link: "https://appsumo.com/",
    pricing: "Paid (revenue share)",
  },
  {
    name: "Fazier",
    tagline: "Launch and grow your startup",
    description: "Product launch platform focused on early traction and feedback",
    link: "https://fazier.com/",
    pricing: "Free + Premium features",
  },
  {
    name: "Microlaunch",
    tagline: "Launch your startup, get first users",
    description: "Minimalist launch platform for getting early adopters and feedback",
    link: "https://microlaunch.net/",
    pricing: "Free",
  },
  {
    name: "Tinylaunch",
    tagline: "Launch your startup to early adopters",
    description: "Simple submission platform for getting initial users and validation",
    link: "https://www.tinylaunch.com/",
    pricing: "Free",
  },
  {
    name: "Uneed",
    tagline: "The best new products, daily",
    description: "Curated daily showcase of innovative tools and products",
    link: "https://www.uneed.best/",
    pricing: "Free to submit",
  },
  {
    name: "TrustMRR",
    tagline: "Verified MRR for startups",
    description: "Platform for showcasing and verifying your monthly recurring revenue",
    link: "https://trustmrr.com/",
    pricing: "Free",
  },
  {
    name: "YourWebsiteScore",
    tagline: "Get your website scored",
    description: "Website analysis and scoring tool with directory listing",
    link: "https://yourwebsitescore.com/",
    pricing: "Free analysis",
  },
  {
    name: "PeerPush",
    tagline: "Promote together, grow together",
    description: "Peer-to-peer product promotion network for mutual growth",
    link: "https://peerpush.net/",
    pricing: "Free",
  },
  {
    name: "Indiepage",
    tagline: "Showcase for indie makers",
    description: "Directory and portfolio platform specifically for independent makers",
    link: "https://indiepa.ge/",
    pricing: "Free",
  },
];

const Directory = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 pt-[110px] md:pt-[140px]">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <p className="text-xs md:text-sm font-bold text-accent-red mb-3 tracking-wider uppercase">
            Directory
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
            Launch everywhere. Every month.
          </h1>
          <p className="text-[15px] md:text-[17px] text-muted-foreground leading-relaxed max-w-2xl">
            This is your marketing strategy. Submit your product to a maximum of these directories to increase visibility, climb rankings, earn quality backlinks, and drive actual sales.
          </p>
          <p className="text-[15px] md:text-[17px] text-muted-foreground leading-relaxed mt-4 font-medium">
            Most are free, there's zero reason not to be everywhere your competitors aren't.
          </p>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground hidden md:table-cell">Tagline</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Pricing</th>
                <th className="py-3 px-4 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {DIRECTORIES.map((directory, index) => (
                <tr
                  key={directory.name}
                  className={`group hover:bg-secondary/30 transition-colors ${index !== DIRECTORIES.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <td className="py-3 px-4">
                    <a
                      href={directory.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-foreground group-hover:text-cta-orange transition-colors"
                    >
                      {directory.name}
                    </a>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
                    {directory.tagline}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-secondary text-muted-foreground">
                      {directory.pricing}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={directory.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground group-hover:text-cta-orange transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Directory;
