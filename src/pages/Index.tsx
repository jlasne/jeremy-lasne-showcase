import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Twitter, ExternalLink, Youtube } from "lucide-react";
import profileImage from "@/assets/profile-picture-new.jpg";
import tasuLogo from "@/assets/tasu-logo.png";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const interviews = [
    {
      title: "Let's Talk Business - Introduction",
      interviewee: "Jeremy LASNE",
      business: "Tasu & Entrepreneurship",
      description: "Discover my entrepreneurial journey and what drives me to build user-first businesses",
      logo: tasuLogo,
      url: "/intro",
    },
    {
      title: "Building Tasu with Ben & Dimitri",
      interviewee: "Ben Boarer & Dimitri Gilbert",
      business: "Tasu - SaaS Platform",
      description: "The story behind creating a platform focused on user behavior and feedback",
      logo: tasuLogo,
      url: "#",
    },
    {
      title: "Lessons in Entrepreneurship",
      interviewee: "Jeremy LASNE",
      business: "Business Insights",
      description: "Key insights and hard-won lessons from years of building and scaling businesses",
      logo: profileImage,
      url: "#",
    },
    {
      title: "The Future of SaaS",
      interviewee: "Jeremy LASNE",
      business: "Industry Trends",
      description: "Predictions, emerging trends, and the evolution of the software industry",
      logo: profileImage,
      url: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-[#2a2a2a]">
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          {/* Left: Personal Profile & Channel Intro */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="p-6 border border-[#0d2000]/10 bg-gray-50">
              <div className="flex flex-col items-center text-center space-y-4">
                <img
                  src={profileImage}
                  alt="Jeremy LASNE"
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-[#0d2000]/20"
                />
                <div>
                  <h1 className="text-2xl font-bold text-[#0d2000]">Jeremy LASNE</h1>
                  <p className="text-sm text-[#0d2000] mt-1">Business & Entrepreneurship</p>
                </div>
                <p className="text-sm text-[#0d2000] leading-relaxed">
                  Building user-first businesses and sharing entrepreneurial insights. Co-founder at Tasu, focused on behavior-driven growth.
                </p>
              </div>
            </Card>

            {/* Channel Mission */}
            <Card className="p-5 border border-[#0d2000]/10 bg-gray-50">
              <h3 className="text-lg font-semibold text-[#0d2000] mb-3">Let's Talk Business</h3>
              <p className="text-sm text-[#0d2000] leading-relaxed mb-4">
                Welcome to my channel where I share real conversations with entrepreneurs, deep-dive into business strategies, and explore what it takes to build successful companies.
              </p>
              <div className="pt-3 border-t border-[#0d2000]/10">
                <p className="text-xs text-[#0d2000] font-medium mb-2">Connect with me:</p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-[#0d2000] text-white hover:bg-[#0d2000]/90" asChild>
                    <a href="https://x.com/jeremylasne" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      <Twitter className="w-3.5 h-3.5" />
                      <span>X</span>
                    </a>
                  </Button>
                  <Button size="sm" className="flex-1 bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90" asChild>
                    <a href="https://www.youtube.com/@jeremyfounder" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      <Youtube className="w-3.5 h-3.5" />
                      <span>YouTube</span>
                    </a>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Tasu Card */}
            <Card className="p-5 border border-[#0d2000]/10 bg-gray-50">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-white shadow-md overflow-hidden flex-shrink-0">
                  <img src={tasuLogo} alt="Tasu logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#0d2000]">Tasu</h3>
                  <p className="text-xs text-[#0d2000]">SaaS Platform</p>
                </div>
              </div>
              <p className="text-sm text-[#0d2000] mb-3">User-first business growth through behavior and feedback</p>
              <p className="text-xs text-[#0d2000] mb-4">
                <span className="font-medium">Co-founders:</span> Ben Boarer & Dimitri Gilbert
              </p>
              <Button size="sm" className="w-full bg-[#0d2000] text-white hover:bg-[#0d2000]/90" asChild>
                <a href="https://tasu.ai" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  Visit Website <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            </Card>
          </div>

          {/* Right: Interview Feed (Vertical List) */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Interviews</h2>
            <div className="space-y-4">
              {interviews.map((interview) => (
                <Card
                  key={interview.title}
                  className="p-5 border border-[#0d2000]/10 bg-gray-50 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => interview.url.startsWith('/') ? navigate(interview.url) : window.open(interview.url, '_blank')}
                >
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-white shadow-sm overflow-hidden flex-shrink-0">
                      <img 
                        src={interview.logo} 
                        alt={`${interview.interviewee} logo`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-[#0d2000] mb-1">{interview.title}</h3>
                      <p className="text-xs text-[#0d2000] font-medium mb-2">
                        {interview.interviewee} • {interview.business}
                      </p>
                      <p className="text-sm text-[#0d2000] leading-relaxed">{interview.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
