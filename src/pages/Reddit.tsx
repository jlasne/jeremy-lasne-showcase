import NavBar from "@/components/NavBar";
import { Target, MessageCircle, Repeat, Clock, Lightbulb, Package, Users } from "lucide-react";

const Reddit = () => {
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

        {/* Goal */}
        <div className="bg-primary/10 rounded-lg p-4 mb-5 border border-primary/20">
          <div className="flex items-center gap-2 mb-1.5">
            <Target className="w-4 h-4 text-primary" />
            <h2 className="text-base font-semibold text-foreground">The Goal</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Earn karma, talk to your audience, and turn that attention into sales over time.
          </p>
        </div>

        {/* Strategy Overview */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground mb-3">The Strategy</h2>
          <div className="grid md:grid-cols-2 gap-2.5">
            <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <MessageCircle className="w-3.5 h-3.5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Daily Posts</h3>
              </div>
              <p className="text-muted-foreground text-xs">Make 2 posts per day</p>
            </div>

            <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Users className="w-3.5 h-3.5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Engagement</h3>
              </div>
              <p className="text-muted-foreground text-xs">5 comments before and after every post + reply to notifications</p>
            </div>

            <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Repeat className="w-3.5 h-3.5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Cross-post</h3>
              </div>
              <p className="text-muted-foreground text-xs">Cross-post to multiple relevant subreddits the same post</p>
            </div>

            <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Spacing</h3>
              </div>
              <p className="text-muted-foreground text-xs">Wait at least 3 days before posting again in the same subreddit</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2.5 text-center italic">
            Never be spammy. Respect the rules of the subreddit and its purpose.
          </p>
        </div>

        {/* Content Types */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground mb-3">Daily Post Content</h2>
          
          {/* Type 1: Build in Public */}
          <div className="bg-secondary/30 rounded-lg p-4 border border-border/30 mb-2.5">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center">1</span>
              <h3 className="text-sm font-semibold text-foreground">X-style "Build in Public" Content</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-2.5">
              Use the Rob Hallam loop: rotate content types, focus on karma first, sales later.
            </p>
            <div className="space-y-1.5">
              <div className="flex gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-foreground text-xs">Entertaining</span>
                  <p className="text-xs text-muted-foreground">Anecdotes from your journey: building, travel, wins, failures, behind-the-scenes.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-foreground text-xs">Educational</span>
                  <p className="text-xs text-muted-foreground">Learnings about getting users, revenue experiments, launches, product decisions.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-foreground text-xs">Inspirational</span>
                  <p className="text-xs text-muted-foreground">Simple growth charts: visits, MRR, email list, followers, with a short story.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Type 2: Expertise */}
          <div className="bg-secondary/30 rounded-lg p-4 border border-border/30 mb-2.5">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center">2</span>
              <h3 className="text-sm font-semibold text-foreground">Expertise Content (from your blog)</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Goal: show expertise in the comments, drive sales without obvious promotion.
            </p>
            <ul className="space-y-1">
              <li className="flex gap-2 text-xs text-muted-foreground">
                <span className="text-primary/70 mt-0.5 shrink-0">→</span>
                <span>Very niche, SEO-style posts repurposed from your blog, focused on one specific problem.</span>
              </li>
              <li className="flex gap-2 text-xs text-muted-foreground">
                <span className="text-primary/70 mt-0.5 shrink-0">→</span>
                <span>In threads, never lead with promotion; use comments and DMs to naturally mention what you do.</span>
              </li>
            </ul>
          </div>

          {/* Type 2bis: Product-focused */}
          <div className="bg-secondary/30 rounded-lg p-4 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex-shrink-0 w-6 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center">2b</span>
              <h3 className="text-sm font-semibold text-foreground">Product-focused but not pushy</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Use Reddit discussions to attract ICP and position your product.
            </p>
            <ul className="space-y-1">
              <li className="flex gap-2 text-xs text-muted-foreground">
                <span className="text-primary/70 mt-0.5 shrink-0">→</span>
                <span>Publicly describe the exact problem you solve without naming your app at first, to spark discussion with ICP and competitors.</span>
              </li>
              <li className="flex gap-2 text-xs text-muted-foreground">
                <span className="text-primary/70 mt-0.5 shrink-0">→</span>
                <span>Create "top tools / best solutions" posts where you honestly rank competitors and include your product as one option, without being too pushy.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reddit;
