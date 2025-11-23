import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MarketingForFounders = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("intro");

  const sections = [
    { id: "intro", title: "Intro", available: true },
    { id: "philosophy", title: "The Founder Philosophy", available: false },
    { id: "talk-to-users", title: "Talk to Users", available: false },
    { id: "landing-page", title: "Converting Landing Page", available: false },
    { id: "distribution", title: "Distribution Machine", available: false },
    { id: "pricing", title: "Pricing is Marketing", available: false },
    { id: "content", title: "Content & SEO", available: false },
    { id: "features", title: "Features as Marketing", available: false },
    { id: "growth", title: "Growth Engines", available: false },
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

  return (
    <div className="min-h-screen bg-[#2a2a2a]">
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-white hover:bg-white/10 mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Feed
        </Button>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Marketing for Founders
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Sidebar - Navigation */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-8 space-y-2">
              {sections.map((section) => (
                <Card
                  key={section.id}
                  className={`cursor-pointer transition-colors ${
                    selectedSection === section.id
                      ? "bg-[#4a4a4a] border-white/20"
                      : "bg-[#3a3a3a] border-white/10 hover:bg-[#404040]"
                  }`}
                  onClick={() => {
                    if (section.available) {
                      setSelectedSection(section.id);
                    } else {
                      alert("Coming soon!");
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <p className="text-white font-medium">{section.title}</p>
                    {!section.available && (
                      <p className="text-xs text-gray-400 mt-1">Coming soon</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="md:col-span-8 lg:col-span-9">
            <Card className="bg-[#3a3a3a] border-white/10">
              <CardContent className="p-6 md:p-8">
                <article className="space-y-6">
                  {renderContent()}
                </article>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingForFounders;
