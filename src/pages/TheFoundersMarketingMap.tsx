import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TheFoundersMarketingMap = () => {
  const battlegrounds = [
    { title: "Talk to Users", description: "The only validation that matters." },
    { title: "Landing Page", description: "Hero section, video, and social proof." },
    { title: "Distribution", description: "Backlinks, directories, and personal brand." },
    { title: "Pricing", description: "Use it as marketing (trials, not free plans)." },
    { title: "Content", description: "Blogs and articles as freebies." },
    { title: "Features", description: '"Coming soon" pages and cutting the dead wood.' },
    { title: "Growth", description: "Free tools, affiliates, and cold outreach." },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <article className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            The Founder's Marketing Map
          </h1>

          <div className="prose prose-invert max-w-none space-y-6 text-foreground/90">
            <p>
              Marketing in 2025 is actually fun for devs. It's not about ads; it's about shipping. 
              If you're waiting for a perfect moment to launch, stop. Here is the psychology you need right now.
            </p>

            <p>
              By a founder who watched 50+ hours of successful, bootstrapping founders and took notes. 
              No TL;DR here is what you need to know. I am using this to grow{" "}
              <a 
                href="https://tasu.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Tasu.ai
              </a>{" "}
              and I'll document it on{" "}
              <a 
                href="https://x.com/jeremylasne" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @jeremylasne
              </a>.
            </p>

            <p>
              Let's dive into some principles, "psychology". This is about overriding your default 
              dev-brain that wants to optimize in the dark and forcing yourself to trade perfection 
              for speed. It's going to feel uncomfortable, and that's exactly why it works. All the 
              successful founders you hear do that, and you watch.
            </p>

            <h3 className="text-2xl font-semibold text-foreground mt-8">
              There is no single launch.
            </h3>
            <p>
              There are only hundreds of small, compounding launches. You don't get one shot; you 
              get as many as you can ship. If it works, ship it. If it breaks, fix it live. Users 
              forgive "Beta" tags if you're transparent.
            </p>

            <h3 className="text-2xl font-semibold text-foreground mt-8">
              Perfection is Complexity
            </h3>
            <p>
              A perfect product isn't one with every feature; it's one where there's nothing left 
              to remove. Cut features until it hurts. Simple wins.
            </p>

            <p>
              Same for the stack you use, users don't care about your stack. They care about their 
              problem. Stop refactoring and chasing shiny tools. Pick one stack, master it, and use 
              it solely to deliver value.
            </p>

            <h2 className="text-3xl font-bold text-foreground mt-12 mb-6">
              Where to Act (The Map)
            </h2>
            <p>
              Once you accept that shipping <em>is</em> marketing, you need to know where to direct 
              that energy. Here are actionable strategies to inspire and use.
            </p>

            <p className="text-lg font-medium">Select a battleground to dive in:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {battlegrounds.map((item, index) => (
              <Card 
                key={index}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => {
                  // Coming soon functionality
                  alert("Coming soon!");
                }}
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default TheFoundersMarketingMap;
