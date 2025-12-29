import NavBar from "@/components/NavBar";
import { Target, MessageCircle, Repeat, Clock, Lightbulb, Package, Users } from "lucide-react";

const Reddit = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 pt-[110px] md:pt-[140px]">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Reddit Strategy</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reddit is the best platform for bootstrapped founders in 2026.
          </p>
        </div>

        {/* Goal */}
        <div className="bg-primary/10 rounded-xl p-6 mb-8 border border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">The Goal</h2>
          </div>
          <p className="text-muted-foreground">
            Earn karma, talk to your audience, and turn that attention into sales over time.
          </p>
        </div>

        {/* Strategy Overview */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">The Strategy</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-secondary/30 rounded-xl p-5 border border-border/30">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Daily Posts</h3>
              </div>
              <p className="text-muted-foreground text-sm">Make 2 posts per day</p>
            </div>

            <div className="bg-secondary/30 rounded-xl p-5 border border-border/30">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Engagement</h3>
              </div>
              <p className="text-muted-foreground text-sm">5 comments before and after every post + reply to notifications</p>
            </div>

            <div className="bg-secondary/30 rounded-xl p-5 border border-border/30">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Repeat className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Cross-post</h3>
              </div>
              <p className="text-muted-foreground text-sm">Cross-post to multiple relevant subreddits the same post</p>
            </div>

            <div className="bg-secondary/30 rounded-xl p-5 border border-border/30">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Spacing</h3>
              </div>
              <p className="text-muted-foreground text-sm">Wait at least 3 days before posting again in the same subreddit</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center italic">
            Never be spammy. Respect the rules of the subreddit and its purpose.
          </p>
        </div>

        {/* Content Types */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-6">Daily Post Content</h2>
          
          {/* Type 1: Build in Public */}
          <div className="bg-secondary/30 rounded-xl p-6 border border-border/30 mb-4">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">1</span>
              <h3 className="text-lg font-semibold text-foreground">X-style "Build in Public" Content</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Use the Rob Hallam loop: rotate content types, focus on karma first, sales later.
            </p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-foreground">Entertaining</span>
                  <p className="text-sm text-muted-foreground">Anecdotes from your journey: building, travel, wins, failures, behind-the-scenes.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-foreground">Educational</span>
                  <p className="text-sm text-muted-foreground">Learnings about getting users, revenue experiments, launches, product decisions.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-foreground">Inspirational</span>
                  <p className="text-sm text-muted-foreground">Simple growth charts: visits, MRR, email list, followers, with a short story.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Type 2: Expertise */}
          <div className="bg-secondary/30 rounded-xl p-6 border border-border/30 mb-4">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">2</span>
              <h3 className="text-lg font-semibold text-foreground">Expertise Content (from your blog)</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Goal: show expertise in the comments, drive sales without obvious promotion.
            </p>
            <ul className="space-y-2">
              <li className="flex gap-3 text-sm text-muted-foreground">
                <span className="text-primary/70 mt-0.5 shrink-0">→</span>
                <span>Very niche, SEO-style posts repurposed from your blog, focused on one specific problem.</span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <span className="text-primary/70 mt-0.5 shrink-0">→</span>
                <span>In threads, never lead with promotion; use comments and DMs to naturally mention what you do.</span>
              </li>
            </ul>
          </div>

          {/* Type 2bis: Product-focused */}
          <div className="bg-secondary/30 rounded-xl p-6 border border-border/30">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex-shrink-0 w-8 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">2b</span>
              <h3 className="text-lg font-semibold text-foreground">Product-focused but not pushy</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Use Reddit discussions to attract ICP and position your product.
            </p>
            <ul className="space-y-2">
              <li className="flex gap-3 text-sm text-muted-foreground">
                <span className="text-primary/70 mt-0.5 shrink-0">→</span>
                <span>Publicly describe the exact problem you solve without naming your app at first, to spark discussion with ICP and competitors.</span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
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
