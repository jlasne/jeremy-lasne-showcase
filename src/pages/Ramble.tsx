import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Ramble = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#2a2a2a]">
      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-white hover:bg-white/10 mb-6"
          onClick={() => navigate("/in")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Feed
        </Button>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Why Most Voice Tools Are Breaking Your Thoughts
            </h1>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-white hover:bg-white/10 px-0"
                asChild
              >
                <a
                  href="https://x.com/BuildWithAJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  @BuildWithAJ on X <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-white hover:bg-white/10 px-0"
                asChild
              >
                <a
                  href="https://www.rambleapp.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Ramble App <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            </div>
          </div>

          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/T8wscu8Eu54"
              title="Why Most Voice Tools Are Breaking Your Thoughts"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="prose prose-invert max-w-none space-y-4 text-gray-300">
            <p>
              Here's the thing. Thoughts get lost when you write them down. When you're talking freely, capturing raw ideas as they hit you, you need something that organizes without altering. But current tools? They're butchering the process.
            </p>

            <p>
              Perplexity sucks at transcription. ChatGPT is okay, but those latencies smooth everything out, removing the very emotion and energy that made your thought unique in the first place. And then there's the censorship issue. GPT will literally filter your voice. Say "ass" as an emotional expression, and it treats it like something that needs sanitizing. But that's just how people talk. That's expression.
            </p>

            <p className="font-semibold text-white">
              Ramble doesn't alter your voice. It keeps everything intact.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">What Makes Ramble Different</h2>

            <p>
              The core promise is simple: organize your full thoughts with zero alterations. Think about journalists investigating in rough areas who need to report actual thoughts without being censored. Ramble does exactly that, in its own way. Traditional AI thinks through a matrix of what it's been trained on. New thoughts, genuine uniqueness, can't actually be transcribed properly because the AI smooths over what makes them original.
            </p>

            <p>AJ already has users. Beta testers and even a paid customer. Real validation.</p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Launch Strategy</h2>

            <p>
              His approach to launch is smart: repetitive presence. Every feature becomes its own launch moment, rolled out across different directories one at a time. Next up? WhatsApp integration plus expanded language support (Spanish and Hindi). But here's what I respect. No feature creep. Features only get added if the masses mention it. Not just one person asking. Mass demand.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Why This Matters Beyond the App</h2>

            <p>
              We talked about the 9-5 grind too. It's frustrating when you pour weeks into a project, only for it to get cancelled. Then they just switch you somewhere else. Sometimes you actually loved what you were building, and poof, it's gone.
            </p>

            <p>
              That's what makes building something like Ramble different. It's his vision, solving a real problem: keeping human voice human, no smoothing, no censoring, no corporate interference killing your work mid-sprint.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ramble;
