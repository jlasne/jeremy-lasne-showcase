import NavBar from "@/components/NavBar";
import { Users, BookOpen, MessageSquare } from "lucide-react";

const Reddit = () => {
  const cards = [
    {
      icon: Users,
      title: "Principles of the Group",
      points: [
        "Small, curated group of founders using Reddit (especially good for low-follower, bootstrapped builders).",
        '"Give before you take": you help on 2–3 recent posts before dropping your own link.',
        'New accounts must "warm up" for at least a week by commenting daily and behaving like real users.',
        "Focus on helping each other: real comments, occasional upvotes, sometimes boosting each other's comments, not just the post.",
        "Everything must respect Reddit and subreddit rules to avoid bans.",
      ],
    },
    {
      icon: BookOpen,
      title: "Reddit Playbook",
      points: [
        "Always comment when you post, and prioritize thoughtful comments over mindless upvotes.",
        "Never hard-sell; share experiences and stories, and if needed, drop the link only in the comments (or when the sub explicitly allows promotion).",
        "Reuse what already works on Reddit: model successful posts, but adapt them to your product/message.",
        "Cross-post the same post to several relevant subreddits when allowed, adjusting to each sub's rules.",
        "Goal: generate an honest first wave of activity so the Reddit algorithm pushes your post to more people, and any tool mention feels natural (answering questions, not forcing plugs).",
      ],
    },
    {
      icon: MessageSquare,
      title: "Format of the Community",
      points: [
        "For now, everything runs through a simple X group chat so it's low-friction to join and experiment together.",
        "Each day, members can drop one Reddit link in the chat, and the group focuses on real comments first, with occasional upvotes on posts or comments when it feels natural.",
        "New members are expected to warm up a fresh or existing Reddit account for at least a week before relying on the group, by commenting daily and learning each subreddit's norms.",
        'The only "rule": don\'t be spammy. Share experiences, answer questions, and only mention tools when it genuinely fits the conversation and the subreddit rules.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container max-w-6xl mx-auto px-4 py-8 md:py-12 pt-[110px] md:pt-[140px]">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Reddit Growth Community
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated group of founders helping each other grow authentically on Reddit.
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
      </div>
    </div>
  );
};

export default Reddit;
