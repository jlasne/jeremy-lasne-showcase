import { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import BackButton from "@/components/BackButton";
import VideoEmbed from "@/components/VideoEmbed";
import SocialLinks from "@/components/SocialLinks";
import { InterviewLink } from "@/types/interview";

interface InterviewLayoutProps {
  title: string;
  videoId: string;
  links?: InterviewLink[];
  children: ReactNode;
}

const InterviewLayout = ({ title, videoId, links, children }: InterviewLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 pt-[110px] md:pt-[140px]">
        <BackButton />

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {title}
            </h1>
            {links && links.length > 0 && <SocialLinks links={links} />}
          </div>

          <VideoEmbed videoId={videoId} title={title} />

          <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewLayout;
