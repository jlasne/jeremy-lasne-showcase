import NavBar from "@/components/NavBar";
import { Users, Calendar, BookOpen, ExternalLink } from "lucide-react";

const Reddit = () => {
  const principles = [
    '"Give before you take": help on 2–3 posts before sharing your own link.',
    "Focus on real help: thoughtful comments first, occasional upvotes.",
  ];

  const dailyRoutine = [
    "Help 2–3 members first (comment (asking for tool or equivalent), upvote, or both).",
    "Find a well-performing Reddit post and adapt it to your topic and the sub's rules.",
    "Post in one subreddit and wait a few minutes to confirm it sticks.",
    "If it stays up, share the link in the group, then cross-post or repurpose to other subs.",
    "Reply to notifications: answer comments, keep conversation going, and engage.",
  ];

  const playbook = [
    "New reddit accounts: warm up with comments for a week to avoid bans.",
    "Always comment before you post & reply to notifications.",
    "No hard sell; share stories, lessons, or behind-the-scenes. Promotion in the comments.",
    "Model posts that already perform well, adapted to your topic and each sub's rules.",
    "Cross-post to relevant subreddits, tweaking title and angle.",
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container max-w-6xl mx-auto px-4 py-8 md:py-12 pt-[110px] md:pt-[140px]">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">X-Reddit Community</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated group of founders helping each other grow on Reddit.
          </p>
        </div>

        {/* Top Row: Principles & Daily Routine */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {/* Principles */}
          <div className="bg-secondary/30 rounded-xl p-5 border border-border/30">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Principles</h2>
            </div>
            <ul className="space-y-3">
              {principles.map((point, index) => (
                <li key={index} className="flex gap-3 text-muted-foreground leading-relaxed">
                  <span className="text-primary/70 mt-0.5 shrink-0">→</span>
                  <span>{point}</span>
                </li>
              ))}
              <li className="flex gap-3 text-muted-foreground leading-relaxed">
                <span className="text-primary/70 mt-0.5 shrink-0">→</span>
                <span>
                  10 People in a{" "}
                  <a
                    href="https://x.com/i/chat/g2003755755262910595"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    X group chat
                    <ExternalLink className="w-3 h-3" />
                  </a>{" "}
                  for a month (then we see)
                </span>
              </li>
            </ul>
          </div>

          {/* Daily Routine */}
          <div className="bg-secondary/30 rounded-xl p-5 border border-border/30">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Daily Routine</h2>
            </div>
            <ol className="space-y-3">
              {dailyRoutine.map((step, index) => (
                <li key={index} className="flex gap-3 text-muted-foreground leading-relaxed">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 text-primary text-xs font-medium flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Bottom Row: Playbook */}
        <div className="bg-secondary/30 rounded-xl p-5 border border-border/30">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Playbook</h2>
          </div>
          <ul className="space-y-3">
            {playbook.map((point, index) => (
              <li key={index} className="flex gap-3 text-muted-foreground leading-relaxed">
                <span className="text-primary/70 mt-0.5 shrink-0">→</span>
                <span>{point}</span>
              </li>
            ))}
            <li className="flex gap-3 text-muted-foreground leading-relaxed">
              <span className="text-primary/70 mt-0.5 shrink-0">→</span>
              <span>
                Tweak your post so it fits the subreddit rules &{" "}
                <a
                  href="https://redditinc.com/policies/reddit-rules"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Reddit rules
                  <ExternalLink className="w-3 h-3" />
                </a>
                .
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Floating arrow pointing to bottom-right */}
      <div className="fixed bottom-24 right-20 flex items-center gap-2 animate-bounce">
        <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">any suggestions?</span>
        <svg className="w-8 h-8 text-primary rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
  );
};

export default Reddit;
