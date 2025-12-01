import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { InterviewLink } from "@/types/interview";

interface SocialLinksProps {
  links: InterviewLink[];
}

const SocialLinks = ({ links }: SocialLinksProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      {links.map((link) => (
        <Button
          key={link.url}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground hover:bg-secondary px-0"
          asChild
        >
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            {link.label} <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Button>
      ))}
    </div>
  );
};

export default SocialLinks;
