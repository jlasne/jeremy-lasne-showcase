import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#2a2a2a]">
      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-white hover:bg-white/10 mb-6"
          onClick={() => navigate("/the-founders-marketing-map")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketing Map
        </Button>

        <article className="space-y-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Your Landing Page</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p>
              Most founders overthink this. You don't need a masterpiece; you need a filter. If your landing page
              doesn't answer <em>"Why should a stranger care?"</em> in 3 seconds, you've lost them.
            </p>

            <h3 className="text-2xl font-semibold text-white mt-8">The Hero Section (Spend 80% of your time here)</h3>
            <p>This is the only part that matters at first. Keep it short and emotional.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">Name:</strong> Make it memorable.
              </li>
              <li>
                <strong className="text-white">Logo:</strong> Upload it first thing. It has to stand out, but keep it
                simple. You can change it later anyway.
              </li>
              <li>
                <strong className="text-white">Tagline:</strong> One sentence. Why would people give you their money and
                time? Put this right under your name and nail it.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">The Video (Show Outcomes, Not Features)</h3>
            <p>Don't do a boring demo walkthrough of every button.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">The Goal:</strong> Show the <em>outcome</em> they want, achieved{" "}
                <em>by</em> your product.
              </li>
              <li>
                <strong className="text-white">The Vibe:</strong> Prove the result visually. If they can see the win,
                they'll convert.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">Social Proof (The Trust Battery)</h3>
            <p>Nobody trusts a ghost town. You need to show that real humans are here.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">Testimonials:</strong> Show real users and real results.
              </li>
              <li>
                <strong className="text-white">Stats:</strong> "Deployed in X businesses" or "X positive feedback."
              </li>
              <li>
                <strong className="text-white">Leverage:</strong> If you have known people using your product, showcase
                them. Social leverage is powerful.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">The Action:</h3>
            <p>
              Go look at your hero section right now. Does it clearly state the outcome, or is it just listing features?
              Fix the tagline first.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default LandingPage;
