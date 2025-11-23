import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MarketingForFounders = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("intro");

  const sections = [
    { id: "intro", title: "Intro", subtitle: "Start here", available: true, step: 1 },
    { id: "philosophy", title: "The Founder Philosophy", subtitle: "Mindset shift", available: false, step: 2 },
    { id: "talk-to-users", title: "Talk to Users", subtitle: "Real validation", available: false, step: 3 },
    { id: "landing-page", title: "Converting Landing Page", subtitle: "First impression", available: false, step: 4 },
    { id: "distribution", title: "Distribution Machine", subtitle: "Get traffic", available: false, step: 5 },
    { id: "pricing", title: "Pricing is Marketing", subtitle: "Filter customers", available: false, step: 6 },
    { id: "content", title: "Content & SEO", subtitle: "Compound growth", available: false, step: 7 },
    { id: "features", title: "Features as Marketing", subtitle: "Build in public", available: false, step: 8 },
    { id: "growth", title: "Growth Engines", subtitle: "Scale up", available: false, step: 9 },
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case "intro":
        return (
          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p>
              I spent a year trying to do marketing as a "non-marketing guy." It wasn't enough. I needed a change.
            </p>
            <p>
              So I stopped everything for a week. I watched 50+ hours of video, analyzed 100+ strategies, and studied 10+ successful bootstrappers.
            </p>
            <p>
              These cards are the result. Just the raw tactics I'm using to grow{" "}
              <a 
                href="https://tasu.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:underline font-medium"
              >
                Tasu.ai
              </a>{" "}
              right now. I'm documenting the whole journey on my X{" "}
              <a 
                href="https://x.com/jeremylasne" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:underline font-medium"
              >
                @jeremylasne
              </a>.
            </p>
            <p className="font-medium text-white">
              There is no TL;DR because this is the actionable summary.
            </p>
          </div>
        );
      default:
        return (
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300">Coming soon...</p>
          </div>
        );
    }
  };

  const currentSection = sections.find(s => s.id === selectedSection);

  return (
    <div className="min-h-screen bg-[#2a2a2a]">
      <div className="container max-w-7xl mx-auto px-4 py-6 md:py-8">
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-white hover:bg-white/10 mb-4"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Feed
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-6">
              <h1 className="text-xl font-bold text-white mb-2">
                Marketing for Founders
              </h1>
              <p className="text-sm text-gray-400 mb-8">
                Section {currentSection?.step} of {sections.length}
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Guide Sections
                  </h3>
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedSection === section.id
                            ? "bg-white/10 text-white"
                            : section.available
                            ? "text-gray-300 hover:bg-white/5 hover:text-white"
                            : "text-gray-500 cursor-not-allowed"
                        }`}
                        onClick={() => {
                          if (section.available) {
                            setSelectedSection(section.id);
                          } else {
                            alert("Coming soon!");
                          }
                        }}
                        disabled={!section.available}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-xs font-medium mt-0.5 text-gray-400">
                            {String(section.step).padStart(2, '0')}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">
                              {section.title}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">
                              {section.subtitle}
                            </div>
                            {!section.available && (
                              <div className="text-xs text-gray-500 mt-1">
                                Coming soon
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="md:col-span-8 lg:col-span-9">
            <div className="bg-[#2a2a2a] pb-12">
              <article className="space-y-6 max-w-3xl">
                {renderContent()}
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingForFounders;
