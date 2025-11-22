import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TalkToUsers = () => {
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
            Talk to Users
          </h1>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p>
              This is your job as a founder. If you aren't talking to users, you aren't building a business; you're building a hobby in the dark.
            </p>

            <h3 className="text-2xl font-semibold text-white mt-8">
              The Golden Rule:
            </h3>
            <p>
              Users tell you what to build. Sharing attracts more users. This loop is your entire growth engine. Everything else is secondary.
            </p>

            <h3 className="text-2xl font-semibold text-white mt-8">
              Be Your Own First User
            </h3>
            <p>
              Launching as your own customer is a real advantage. You understand the problem deeply. But don't overcraft, your own feedback isn't gold at all; you are the vision.
            </p>

            <h3 className="text-2xl font-semibold text-white mt-8">
              How to Do It:
            </h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">Ask About Outcomes:</strong> Don't ask if they like your button. Ask what problem they're trying to solve. You need to know the <em>why</em>, not just the <em>what</em>.
              </li>
              <li>
                <strong className="text-white">Validate with Payment:</strong> Don't ask "would you use this?" or rely on users with no skin in the game. Credit card inputs are engagement; email signups are cheap. If they aren't willing to pay or enter a card, they are just tire-kickers.
              </li>
              <li>
                <strong className="text-white">Ask the Churned:</strong> Don't be scared. If someone cancels or doesn't convert, ask them why. Their feedback is brutal, but it's gold. It reveals the leaks you didn't know you had.
              </li>
              <li>
                <strong className="text-white">Ask Publicly:</strong> Post on social media: <em>"To people who signed up but didn't pay—why?"</em> It shows you listen, and you'll get honest patterns you'd never hear in private.
              </li>
              <li>
                <strong className="text-white">Listen for Errors:</strong> The only feedback <em>you</em> (the founder) should obsess over is errors. If you're getting spammed by errors, it means people are actually trying to use your product. Embrace it. That's a win. Fix it live.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">
              Your Daily Goal:
            </h3>
            <p>
              Talk to one user today. If you don't have users, talk to the people whose problem you're trying to solve.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default TalkToUsers;
