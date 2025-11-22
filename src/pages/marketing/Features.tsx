import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Features = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Features</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p>
              Features don't acquire users; they retain them. But if you use them right, they can be marketing weapons. Stop building in secret.
            </p>
            <p>
              <strong className="text-white">Product-led growth must be super simple.</strong> Customers have to know how to use your product immediately. The more features and buttons, the harder it is for customers to understand and for you to sell. Track what's being used, what's not, and remove it.
            </p>

            <h3 className="text-2xl font-semibold text-white mt-8">The "Coming Soon" Tactic</h3>
            <p>Don't hide what you're building next. Put it in the menu today.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">The Move:</strong> Add the button for the feature you haven't built yet. Label it "Coming Soon."
              </li>
              <li>
                <strong className="text-white">The Click:</strong> When they click, don't show a 404. Show a simple form: "Want this? Enter your email for early access."
              </li>
              <li>
                <strong className="text-white">The Win:</strong> You get a list of people who actually want it before you write a single line of code. That's real validation.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">Cut the Dead Wood</h3>
            <p>A perfect product is when there is nothing else to cut.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">The Truth:</strong> Complexity kills momentum.
              </li>
              <li>
                <strong className="text-white">The Action:</strong> If a feature isn't being used, kill it. Simple wins every time. The more you cut, the better the core product gets.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">Roadmap as Marketing</h3>
            <p>Never let your roadmap be a secret.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">Show it:</strong> Your next features show that your product is alive, growing, and ambitious.
              </li>
              <li>
                <strong className="text-white">Hype it:</strong> Use upcoming features to build hype now. Tell users what's coming to keep them excited and subscribed.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">The Action:</h3>
            <p>
              Go to your app. Find one feature you're planning to build. Add a button for it in the menu right now with a "Coming Soon" badge and an email capture.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Features;
