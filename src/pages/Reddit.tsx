import NavBar from "@/components/NavBar";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

const subreddits = [
  { name: "r/indiehackers", visitors: "28K", contributors: "1.3K", engagement: "4.64%" },
  { name: "r/Entrepreneur", visitors: "470K", contributors: "10K", engagement: "2.13%" },
  { name: "r/EntrepreneurRideAlong", visitors: "45K", contributors: "1.5K", engagement: "3.33%" },
  { name: "r/Entrepreneurship", visitors: "23K", contributors: "815", engagement: "3.54%" },
  { name: "r/GrowthHacking", visitors: "13K", contributors: "619", engagement: "4.76%" },
  { name: "r/MakeMoney", visitors: "13K", contributors: "609", engagement: "4.68%" },
  { name: "r/microsaas", visitors: "37K", contributors: "5.5K", engagement: "14.86%" },
  { name: "r/OnlineIncomeHustle", visitors: "63K", contributors: "1.6K", engagement: "2.54%" },
  { name: "r/passive_income", visitors: "308K", contributors: "5.3K", engagement: "1.72%" },
  { name: "r/SaaS", visitors: "281K", contributors: "12K", engagement: "4.27%" },
  { name: "r/saasbuild", visitors: "4.5K", contributors: "1.2K", engagement: "26.67%" },
  { name: "r/ShowMeYourSaaS", visitors: "1.5K", contributors: "392", engagement: "26.13%" },
  { name: "r/sidehustle", visitors: "192K", contributors: "1.4K", engagement: "0.73%" },
  { name: "r/SideProject", visitors: "317K", contributors: "8.9K", engagement: "2.81%" },
  { name: "r/sideprojects", visitors: "3K", contributors: "482", engagement: "16.07%" },
  { name: "r/smallbusiness", visitors: "388K", contributors: "11K", engagement: "2.84%" },
  { name: "r/socialmedia", visitors: "173K", contributors: "1.3K", engagement: "0.75%" },
  { name: "r/SocialMediaMarketing", visitors: "79K", contributors: "1.3K", engagement: "1.65%" },
  { name: "r/Startup_Ideas", visitors: "35K", contributors: "1.9K", engagement: "5.43%" },
  { name: "r/startups", visitors: "106K", contributors: "2.4K", engagement: "2.26%" },
  { name: "r/thesidehustle", visitors: "31K", contributors: "307", engagement: "0.99%" },
];

const Reddit = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container max-w-3xl mx-auto px-4 py-6 pt-[100px] md:pt-[120px]">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Reddit Strategy</h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Reddit is the best platform for bootstrapped founders in 2026.
          </p>
        </div>

        {/* Goal - Paragraph */}
        <p className="text-sm text-muted-foreground mb-4">
          <span className="font-semibold text-foreground">The Goal:</span> Earn karma, talk to your audience, and turn that attention into sales over time.
        </p>

        {/* Strategy - Paragraph */}
        <p className="text-sm text-muted-foreground mb-6">
          <span className="font-semibold text-foreground">The Strategy:</span> Make 2 posts per day. 5 comments before and after every post + reply to notifications. Cross-post to multiple relevant subreddits the same post. Wait at least 3 days before posting again in the same subreddit.
        </p>

        {/* Collapsible Daily Post Content */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-6">
          <CollapsibleTrigger className="flex items-center justify-between w-full bg-secondary/30 rounded-lg p-3 border border-border/30 hover:bg-secondary/50 transition-colors">
            <span className="text-sm font-semibold text-foreground">Daily Post Content</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-2">
            {/* Type 1: Build in Public */}
            <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center">1</span>
                <h3 className="text-xs font-semibold text-foreground">X-style "Build in Public" Content</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Use the Rob Hallam loop: rotate content types, focus on karma first, sales later.
              </p>
              <ul className="text-xs text-muted-foreground space-y-0.5">
                <li><span className="text-foreground font-medium">Entertaining:</span> Anecdotes from your journey</li>
                <li><span className="text-foreground font-medium">Educational:</span> Learnings about users, revenue, launches</li>
                <li><span className="text-foreground font-medium">Inspirational:</span> Growth charts with a short story</li>
              </ul>
            </div>

            {/* Type 2: Expertise */}
            <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center">2</span>
                <h3 className="text-xs font-semibold text-foreground">Expertise Content (from your blog)</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Niche SEO-style posts. Never lead with promotion; use comments and DMs to mention what you do.
              </p>
            </div>

            {/* Type 2bis: Product-focused */}
            <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="flex-shrink-0 w-6 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center">2b</span>
                <h3 className="text-xs font-semibold text-foreground">Product-focused but not pushy</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Describe problems without naming your app. Create "top tools" posts ranking competitors honestly.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Subreddits Table */}
        <div className="mb-6">
          <h2 className="text-base font-bold text-foreground mb-3">Build In Public Subreddits</h2>
          <div className="border border-border/30 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/30">
                  <TableHead className="text-xs h-9">Subreddit</TableHead>
                  <TableHead className="text-xs h-9 text-right">Visitors/wk</TableHead>
                  <TableHead className="text-xs h-9 text-right">Contributors</TableHead>
                  <TableHead className="text-xs h-9 text-right">Engagement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subreddits.map((sub) => (
                  <TableRow key={sub.name} className="hover:bg-secondary/20">
                    <TableCell className="text-xs py-2 font-medium">
                      <a 
                        href={`https://reddit.com/${sub.name}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {sub.name}
                      </a>
                    </TableCell>
                    <TableCell className="text-xs py-2 text-right text-muted-foreground">{sub.visitors}</TableCell>
                    <TableCell className="text-xs py-2 text-right text-muted-foreground">{sub.contributors}</TableCell>
                    <TableCell className="text-xs py-2 text-right text-muted-foreground">{sub.engagement}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reddit;