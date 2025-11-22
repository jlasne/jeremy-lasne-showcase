import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Pricing</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p>
              Your price isn't just a number; it's a filter. It tells users exactly who you are. Don't price for everyone—price for the ones who matter.
            </p>

            <h3 className="text-2xl font-semibold text-white mt-8">Kill Your Free Plan</h3>
            <p>
              <strong className="text-white">Brutal truth:</strong> Only 3% of free users upgrade. Free plans are for VC-backed startups with huge budgets. For you, they are just costs and noise.
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">The Fix:</strong> Get rid of it. You want users with skin in the game.
              </li>
              <li>
                <strong className="text-white">The Alternative:</strong> Offer a 7-day trial (credit card required) or 5 free credits. A credit card is a commitment; an email is just clutter.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">Choose the Right Model</h3>
            <p>Subscription isn't the only way. Match the price to the value.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">Subscription:</strong> Best for continuous service and B2B. Use this if your product provides recurring value.
              </li>
              <li>
                <strong className="text-white">Usage-Based:</strong> Best for variable use (like API calls). Fair for everyone—light users pay less, heavy users scale naturally. Over 60% of SaaS companies are moving here.
              </li>
              <li>
                <strong className="text-white">One-Time Payment:</strong> Best for tools, templates, and utilities. If it's a static asset, charge once.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">Annual vs. Monthly</h3>
            <p>Here is the math of churn.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">The Stat:</strong> A good product churns ~10% monthly.
              </li>
              <li>
                <strong className="text-white">The Tactic:</strong> Offer an annual plan at 40% off.
              </li>
              <li>
                <strong className="text-white">The Reality:</strong> You win. With 10% churn, you end up with more revenue and 3x more retained users after a year if you lock them in annually.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">Price Anchoring (Psychology)</h3>
            <p>Don't just give one price. Context creates value.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">Tier 1 (The Anchor):</strong> Cheaper, but missing key features. It exists to make Tier 2 look good.
              </li>
              <li>
                <strong className="text-white">Tier 2 (The Real Offer):</strong> Your main product. Complete, valuable, and priced just slightly higher than Tier 1.
              </li>
              <li>
                <strong className="text-white">Tier 3 (Optional):</strong> Enterprise/Premium. High price. Implements later once you have service to back it up.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">Deadlines and FOMO (Urgency)</h3>
            <p>Deals without deadlines are weak. You need to force a decision.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">The Tactic:</strong> Run limited-time campaigns like Black Friday, launch discounts, or "ends soon" reductions.
              </li>
              <li>
                <strong className="text-white">The Rule:</strong> Be real about the deadline. If it ends Friday, close it Friday. Fake urgency smells like a scam and destroys trust.
              </li>
              <li>
                <strong className="text-white">The Reality:</strong> FOMO works. Humans procrastinate; a ticking clock turns "maybe later" into "buy now".
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">The Action:</h3>
            <p>
              Go to your pricing page. If you have a "Free" plan, kill it today. Replace it with a trial or credits. If you are running a deal, slap a real deadline on it.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Pricing;
