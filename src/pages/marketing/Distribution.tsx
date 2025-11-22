import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Distribution = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Distribution
          </h1>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p>
              You built it. Now build the roads to it. Don't rely on luck; build a machine that brings people to your door.
            </p>

            <h3 className="text-2xl font-semibold text-white mt-8">
              Launch Everywhere (Volume Strategy)
            </h3>
            <p>
              There is no "one big launch." You launch constantly.
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">Product Hunt:</strong> The holy grail. <strong className="text-white">You can launch every month.</strong> Launch on a Monday or Sunday for "Product of the Day" (optimize for badges), or launch mid-week for pure traffic—understand the trade-off. First 4 hours are critical (12:01 AM PST). <strong className="text-white">Embed the "Live on Product Hunt" badge on your landing page for immediate social proof.</strong>
              </li>
              <li>
                <strong className="text-white">Hacker News:</strong> Title it "Show HN: I made [Product]". Use tech language, not marketing fluff.
              </li>
              <li>
                <strong className="text-white">Reddit:</strong> Don't just drop a link. Share your story in r/SideProject. Be a human first.
              </li>
              <li>
                <strong className="text-white">Directories:</strong> Uneed, Tiny Launch, etc. These are free backlinks. Do one a week. <strong className="text-white">Use their badges to build credibility on your site.</strong>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">
              Personal Brand (Show Up Daily)
            </h3>
            <p>
              <strong className="text-white">Focus over diversification.</strong> Pick 1-2 platforms (X or YouTube) and stick to them; don't spread yourself thin.
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">The Content:</strong> Share your wins, your losses, and your metrics. Transparency builds trust. <strong className="text-white">Templates work.</strong> People won't listen until you use formats that work, so study successful structures and hooks.
              </li>
              <li>
                <strong className="text-white">The Tactic:</strong> Comment and engage more than you post. The worst thing that happens is you make friends.
              </li>
              <li>
                <strong className="text-white">Video:</strong> <strong className="text-white">Code + be loud simultaneously.</strong> Live stream your coding (silent or with music). It forces productivity and builds an audience who trusts you.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">
              SEO
            </h3>
            <p>
              Don't obsess over keywords, but do the basics.
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">The Basics:</strong> Sitemap, headers, meta descriptions.
              </li>
              <li>
                <strong className="text-white">Differentiation:</strong> Frame yourself as "We do X, but with Y feature they lack."
              </li>
              <li>
                <strong className="text-white">Backlinks:</strong> Every directory you launch on counts. The more domains linking to you, the higher you rank.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">
              The Action:
            </h3>
            <p>
              Pick one directory you haven't submitted to yet. Submit your product today. That's one more road leading to your city.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Distribution;
