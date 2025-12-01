import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, FileText, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";

const FeedbackMap = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 pt-[110px] md:pt-[140px]">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground hover:bg-secondary mb-8"
          onClick={() => navigate("/interview")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Article Header */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-2">Nov 27, 2025</p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Unveiling Actual Business Growth: The Feedback Map
          </h1>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button
            className="bg-cta-orange hover:bg-cta-orange-hover text-white"
            asChild
          >
            <a
              href="https://blog.tasu.ai/#/article/unvail-of-the-actual-business-growth"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Read Full Article
            </a>
          </Button>
          <Button
            variant="outline"
            className="border-cta-orange text-cta-orange hover:bg-cta-orange/10"
            asChild
          >
            <a
              href="https://lasne8.gumroad.com/l/feedback-loops"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Get the Blueprint ($10)
            </a>
          </Button>
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Most founders are leaving money on the table—not because they can't build, but because they're running their feedback loops blind.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-6">
            After analyzing 50+ SaaS products over four months, I found that the winners aren't smarter; they are just more systematic. They don't treat feedback as isolated noise (support tickets, bug reports, churn reasons). Instead, they connect the dots to create compounding loops:
          </p>

          <ul className="text-muted-foreground space-y-2 mb-6 list-disc list-inside">
            <li><strong className="text-foreground">Revenue Loops:</strong> Using payment feedback to upsell, not just transact.</li>
            <li><strong className="text-foreground">Retention Loops:</strong> Turning customer pain into loyalty, not just firefighting.</li>
            <li><strong className="text-foreground">PMF Loops:</strong> Validating demand before writing code.</li>
            <li><strong className="text-foreground">Growth Loops:</strong> Letting users tell the story to drive acquisition.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">The "Isolation" Trap</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The biggest mistake I see is disconnected teams. Support fixes issues in a silo; Marketing drives leads that churn; Product ships features into a void. They are all solving the same problems separately.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">The Solution: A Connected Map</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            To fix this, I built a single, actionable framework that maps 11 critical feedback loops. It organizes every input by outcome (Revenue, Retention, PMF, Growth) and defines the exact trigger ("Get"), action ("Do"), and bonus value for each.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-6">
            When you visualize feedback this way, you stop asking "Should we fix this?" and start asking "Which loop does this feed?"
          </p>

          <p className="text-muted-foreground leading-relaxed mb-8">
            Feedback shouldn't be scattered across Slack and email. It should flow. I've made the blueprint available to help you architect that flow.
          </p>

          {/* Bottom CTA */}
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <p className="text-foreground font-semibold mb-4">Ready to systematize your feedback?</p>
            <Button
              className="bg-cta-orange hover:bg-cta-orange-hover text-white"
              asChild
            >
              <a
                href="https://lasne8.gumroad.com/l/feedback-loops"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Get the Feedback Flow Map ($10)
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackMap;
