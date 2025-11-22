import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Content = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Content</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p>
              Paid ads stop working the second you stop paying. Content is the only marketing that compounds. It's your long-term equity.
            </p>

            <h3 className="text-2xl font-semibold text-white mt-8">Articles as Freebies</h3>
            <p>Stop hoarding knowledge. Give away your best stuff.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">The Strategy:</strong> Write comprehensive guides (like this one) and give them away for free.
              </li>
              <li>
                <strong className="text-white">The Benefit:</strong> It builds massive trust. When users trust you, they try your product.
              </li>
              <li>
                <strong className="text-white">The Loop:</strong> High-value content → Trust → Traffic → Product.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">SEO (The Basics)</h3>
            <p>You don't need to be an expert, but you need the basics.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">Keywords:</strong> Target "long-tail" keywords (specific phrases, less competition, higher intent).
              </li>
              <li>
                <strong className="text-white">Structure:</strong> Use sitemaps, proper headers, and meta descriptions. It helps Google read your map.
              </li>
              <li>
                <strong className="text-white">Repurpose:</strong> Don't just write once. Turn that article into a thread, a video, and a newsletter. Squeeze every drop out of it.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mt-8">Blog for Outcomes</h3>
            <p>Don't write about "Version 2.1 Update." Nobody cares.</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-white">Write:</strong> "How to [Solve Problem X]."
              </li>
              <li>
                <strong className="text-white">Write:</strong> "Why [Current Solution] is Broken."
              </li>
            </ul>
            <p>
              <strong className="text-white">The Goal:</strong> Solve a user's problem in the article. If your product helps do it faster, mention it gently.
            </p>

            <h3 className="text-2xl font-semibold text-white mt-8">Position Against Competition</h3>
            <p>
              Your content is the perfect place to quietly put yourself next to existing tools and then highlight the one or two things you do better. Frame it as: <em>"We do the same thing as [Competitor], but we [Specific Advantage]."</em> Keep it concrete: faster, cheaper, simpler, or more focused on a niche.
            </p>
            <p>
              This kind of framing makes your difference obvious, lets you borrow some of their existing demand, and helps you grab a slice of the attention they already paid to create.
            </p>

            <h3 className="text-2xl font-semibold text-white mt-8">The Action:</h3>
            <p>
              Write one article this weekend. Title it: "How to solve [Problem X] in 5 minutes." Post it on your blog and share it.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Content;
