import NavBar from "@/components/NavBar";
import { Users, BookOpen, MessageSquare } from "lucide-react";

const Reddit = () => {
  const cards = [
    {
      icon: Users,
      title: "Principles of the Group",
      points: [
        "Small, curated group of founders using Reddit.",
        '"Give before you take": you help on 2–3 recent posts before dropping your own link.',
        'New reddit accounts must "warm up", = comment, for at least a week (or reddit bans you).',
        "Focus on helping each other: real comments, occasional upvotes post/comments",
      ],
    },
    {
      icon: BookOpen,
      title: "Reddit Playbook",
      points: [
        "Always comment when you post, and prioritize thoughtful comments over promotion.",
        "Never hard-sell; share experiences and stories (or when the sub explicitly allows promotion).",
        "Reuse what already works on Reddit: model successful posts, but adapt them to your product/message.",
        "Cross-post the same post to several relevant subreddits (adjusting to each sub's rules).",
      ],
    },
    {
      icon: MessageSquare,
      title: "Format of the Community",
      points: [
        "For now, everything runs through a simple X group chat so it's low-friction to join and experiment together.",
        "Each day, you can drop one Reddit link in the chat, and the group focuses on real comments first, with occasional upvotes on posts or comments.",
        'The only "rule": don\'t be spammy. And keep the chat clean :)',
      ],
    },
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

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-secondary/50 rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <card.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">{card.title}</h2>
              </div>
              <ul className="space-y-4">
                {card.points.map((point, index) => (
                  <li key={index} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1 shrink-0">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Daily Routine Section */}
        <div className="mt-12 bg-secondary/50 rounded-2xl p-6 md:p-8 border border-border/50">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Each day, the routine is simple:</h2>
          <ol className="space-y-4">
            {[
              "Go to the group and help 2–3 people first (upvote post, leave a comment, or upvote member's comment).",
              "Find a Reddit post that performed well, and adapt it to your own topic while making sure it respects both Reddit's global rules and the subreddit's specific rules.",
              "Post it in one subreddit and wait a few minutes to check it does not get removed or banned.",
              "If it stays up, share the link in the community group and then cross‑post or repurpose it into as many relevant subreddits as you want.",
              "Finally, reply to your notifications: answer comments, keep the conversation going, and engage.",
            ].map((step, index) => (
              <li key={index} className="flex gap-4 text-muted-foreground leading-relaxed">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Floating arrow pointing to bottom-right */}
      <div className="fixed bottom-24 right-20 flex items-center gap-2 animate-bounce">
        <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">any suggestions?</span>
        <svg 
          className="w-8 h-8 text-primary rotate-45" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
  );
};

export default Reddit;
