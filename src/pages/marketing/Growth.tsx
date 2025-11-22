import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Growth = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Growth</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p>
              Once your funnel works, pour fuel on it. Don't scale a leaky bucket.
            </p>

            <h3 className="text-2xl font-semibold text-white mt-8">Affiliates</h3>
            <p>Why do the selling yourself? Build an army of users who sell for you.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">The Split:</strong> Be generous. Offer 30-50% recurring commission.
              </li>
              <li>
                <strong className="text-white">The Target:</strong> Don't just ask anyone. Ask your power users and influencers in your niche.
              </li>
              <li>
                <strong className="text-white">The Hook:</strong> "Make money while you sleep by sharing a tool you already use."
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">"Powered By" Badges</h3>
            <p>If you have a free tool or a widget, watermark it.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">The Tactic:</strong> Add a small "Powered by [YourApp]" badge on every free user's output.
              </li>
              <li>
                <strong className="text-white">The Effect:</strong> Users become billboards. One user shares their output → 10 people see the badge → 1 clicks → New user. It's free compounding.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">Free Tools</h3>
            <p>Build small, free tools that solve one tiny problem for your target audience.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">The Tool:</strong> A calculator, a generator, a checker. Something useful they search for.
              </li>
              <li>
                <strong className="text-white">The Funnel:</strong> They come for the free tool, they stay for the main product.
              </li>
              <li>
                <strong className="text-white">The Trust:</strong> It proves you can solve problems before asking for a credit card.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">Cold Outreach</h3>
            <p>Yes, you can still cold email. But do it right.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">Personalize:</strong> Show you researched them. "I noticed you're doing X..."
              </li>
              <li>
                <strong className="text-white">The Hook:</strong> Lead with a benefit, not your product. "I help companies like yours save X hours."
              </li>
              <li>
                <strong className="text-white">The Curiosity:</strong> Create curiosity they can't ignore. "Interested in seeing the calculation?"
              </li>
              <li>
                <strong className="text-white">The Deadline:</strong> Add a simple urgency. "Reply within 48 hours."
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">Launch Platforms</h3>
            <p>Use smaller launch directories for a burst of visitors and social proof.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">The Platforms:</strong> Submit to sites like Uneed and Tiny Launch.
              </li>
              <li>
                <strong className="text-white">The Game:</strong> Compete for upvotes by driving your own audience to the listing.
              </li>
              <li>
                <strong className="text-white">The Goal:</strong> A good launch here can define your first month and get you early feedback.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">The Waitlist</h3>
            <p>Don't just collect emails and ghost them. Treat your waitlist like insiders.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">The Engagement:</strong> Talk to them often. "Hey, here's a screenshot of the new feature. Thoughts?".
              </li>
              <li>
                <strong className="text-white">The Conversion:</strong> Give them first access and let them break the beta.
              </li>
              <li>
                <strong className="text-white">The Rule:</strong> Turn waiting into participating. Keep it warm or they won't care when you launch.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">Paid Ads</h3>
            <p>Only run ads when your funnel converts reliably and you make money.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">The Requirement:</strong> Ads must have a positive ROI. Make more than you spend.
              </li>
              <li>
                <strong className="text-white">The Warning:</strong> If your funnel is broken, ads will just burn money. Fix the product first.
              </li>
              <li>
                <strong className="text-white">The Scale:</strong> Once the math works, use paid traffic to accelerate what already works.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">Churn Management</h3>
            <p>For subscription products, 10% monthly churn is normal, but you must track it.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">The Feedback:</strong> Dare to ask why they left. "Why didn't you use it or pay?".
              </li>
              <li>
                <strong className="text-white">The Public:</strong> Ask publicly on social media. The feedback is brutally honest and gold.
              </li>
              <li>
                <strong className="text-white">The Fix:</strong> Use this feedback to fix the leaks before pouring more traffic in.
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Growth;
