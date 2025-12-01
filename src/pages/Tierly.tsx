import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";

const Tierly = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 pt-[110px] md:pt-[140px]">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground hover:bg-secondary mb-6"
          onClick={() => navigate("/interview")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Feed
        </Button>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Turn Pricing Into Your Growth Lever</h1>
            <div className="flex flex-wrap gap-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-secondary px-0" asChild>
                <a
                  href="https://x.com/MPlegas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  @MPlegas on X <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-secondary px-0" asChild>
                <a
                  href="https://tierly.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Tierly App <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            </div>
          </div>

          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/kHqBqCtPZUs"
              title="Turn Pricing Into Your Growth Lever"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
            <p>
              Interviewed Ger (@MPlegas), founder of Tierly. He built Tierly for SaaS teams who are tired of guessing at
              pricing. After a cold DM to the Vercel CEO got a reply, Ger put together the first prototype in a day.
              He's been quietly shipping for over a year, balancing family and a full-time job, not chasing hype.
            </p>

            <p className="font-semibold text-foreground">
              Pricing is a critical strength, most visitors leave your landing page because pricing is confusing, too
              high, or doesn't fit their needs.
            </p>

            <p>
              Tierly makes pricing a marketing asset: it benchmarks your pricing against competitors, delivers
              actionable recommendations, and helps you stand out. Your pricing isn't just a number. It's how you
              connect and differentiate in your market.
            </p>

            <p>
              Tierly automates what used to take hours. You get clear suggestions in minutes and can re-run analyses
              with every product update. Credits never expire. Tierly turns pricing into a growth lever you can revisit
              anytime, with a waitlist now over 100 users and more improvements on the way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tierly;
