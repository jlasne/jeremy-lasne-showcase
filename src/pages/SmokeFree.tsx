import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";

const SmokeFree = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 pt-[110px] md:pt-[140px]">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground hover:bg-secondary mb-6"
          onClick={() => navigate("/talk")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Feed
        </Button>

        <article className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Don't Build in Silence</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <a
                href="https://x.com/Aevmorfop"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                @Aevmorfop on X
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="aspect-video w-full rounded-lg overflow-hidden bg-secondary/20">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/6QrRr1cxVhg"
              title="Don't Build in Silence"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p>
              I just got off a call with @Aevmorfop, and we spent a good chunk of time talking about his latest build.
              The energy was great, but the origin story of his app is the part that actually matters for us.
            </p>

            <p>
              It didn't start as a "startup idea." There was no market research or competitive analysis. It started
              because he was in a personal hell. He wanted to quit smoking and realized almost immediately that the
              standard advice was garbage.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Problem with "Help"</h2>
            <p>
              He spotted the friction points that non-smokers completely miss. First, the pain isn't daily; it's hourly.
              Second, the "scare tactics" (like photos of diseased lungs) are useless because every smoker already knows
              the risks.
            </p>

            <p>
              But the biggest failure point was human support. He realized that relying on friends or family is a trap.
              You annoy them when you smoke, and frankly, you annoy them even more when you're quitting and cranky. He
              needed a support system that wouldn't get tired of him.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Coding the Solution</h2>
            <p>
              So, he built what he needed: an app with the sole purpose of congratulating the streak. It provides the
              constant positive reinforcement that a human eventually stops giving. It bridges the lonely gap between "I
              just quit" and the moment, weeks later, when your relatives finally notice you look healthier.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Public Payoff</h2>
            <p>
              Here is the reality check. It worked for him, he quit. But because he didn't build this in a dark room,
              because he shared the process, it worked for someone else too. A complete stranger used his tool to quit
              smoking.
            </p>

            <p>
              If he had built in silence, waiting for the "perfect launch," that stranger would likely still be lighting
              up today.
            </p>

            <p>
              We often talk about "shipping" as a marketing tactic. But sometimes, it's just about letting your solution
              find the people who desperately need it.
            </p>

            <p className="text-xl font-semibold text-foreground">Don't build in silence.</p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default SmokeFree;
