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
      title: "Introduction",
      description: "Get to know Jeremy LASNE and his entrepreneurial journey",
      url: "/intro",
    },
    {
      title: "Building Tasu",
      description: "The story behind user-first business growth",
      url: "#",
    },
    {
      title: "Lessons in Entrepreneurship",
      description: "Key insights from years of building businesses",
      url: "#",
    },
    {
      title: "The Future of SaaS",
      description: "Predictions and trends in the software industry",
      url: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-[#2a2a2a]">
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-[350px_1fr] gap-6">
          {/* Left: Profile Section */}
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
              </div>
            </Card>

            {/* Tasu Card */}
            <Card className="p-5 border border-[#0d2000]/10 bg-gray-50">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white shadow-md overflow-hidden flex-shrink-0">
                  <img src={tasuLogo} alt="Tasu logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#0d2000]">Tasu</h3>
                  <p className="text-xs text-[#0d2000]">SaaS Platform</p>
                </div>
              </div>
              <p className="text-sm text-[#0d2000] mb-3">User-first business growth (Behavior and Feedback)</p>
              <p className="text-xs text-[#0d2000] mb-4">
                <span className="font-medium">Co-founders:</span> Ben Boarer & Dimitri Gilbert
              </p>
              <Button size="sm" className="w-full bg-[#0d2000] text-white hover:bg-[#0d2000]/90" asChild>
                <a href="https://tasu.ai" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  Visit <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            </Card>

            {/* Social Links */}
            <div className="flex gap-3">
              <Button size="sm" className="flex-1 bg-[#0d2000] text-white hover:bg-[#0d2000]/90" asChild>
                <a href="https://x.com/jeremylasne" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <Twitter className="w-4 h-4" />
                  <span>X</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
              <Button size="sm" className="flex-1 bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90" asChild>
                <a href="https://www.youtube.com/@jeremyfounder" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <Youtube className="w-4 h-4" />
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right: Interview Grid */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Interviews</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {interviews.map((interview) => (
                <Card
                  key={interview.title}
                  className="p-5 border border-[#0d2000]/10 bg-gray-50 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => interview.url.startsWith('/') ? navigate(interview.url) : window.open(interview.url, '_blank')}
                >
                  <h3 className="text-lg font-semibold text-[#0d2000] mb-2">{interview.title}</h3>
                  <p className="text-sm text-[#0d2000] leading-relaxed">{interview.description}</p>
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
