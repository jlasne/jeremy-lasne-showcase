import NavBar from "@/components/NavBar";
import { CategoryList, Category } from "@/components/ui/category-list";
import { ArrowRight, Mail, Mic, TrendingUp } from "lucide-react";

const categories: Category[] = [
  {
    id: "newsletter",
    title: "Read the Latest",
    subtitle: "blog.jeremylasne.com",
    label: "Newsletter",
    href: "https://blog.jeremylasne.com",
    isExternal: true,
    icon: <Mail className="w-8 h-8" />,
  },
  {
    id: "talk",
    title: "Learn from Builders",
    subtitle: "jeremylasne.com/talk",
    label: "Talk",
    href: "/talk",
    icon: <Mic className="w-8 h-8" />,
  },
  {
    id: "trustviews",
    title: "TrustViews",
    subtitle: "Real website views, public and trusted",
    label: "Business",
    href: "https://trustviews.io",
    isExternal: true,
    icon: <TrendingUp className="w-8 h-8" />,
    featured: true,
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />

      {/* Full screen content - no scroll */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-8 pt-[80px]">
        <div className="max-w-4xl mx-auto w-full">
          {/* Header with social links */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">Hey, I'm Jeremy.</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Obsessed with simple products that actually bring value.
            </p>
            <div className="flex gap-4 items-center justify-center">
              <a
                href="https://x.com/jeremylasne"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center text-muted-foreground bg-secondary rounded-lg hover:text-foreground hover:bg-accent-red hover:-translate-y-1 transition-all"
                aria-label="X (Twitter)"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@jeremyfounder"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center text-muted-foreground bg-secondary rounded-lg hover:text-foreground hover:bg-accent-red hover:-translate-y-1 transition-all"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Categories/Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <CategoryTile key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryTile = ({ category }: { category: Category }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleClick = () => {
    if (category.href) {
      if (category.isExternal) {
        window.open(category.href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = category.href;
      }
    }
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div
        className={`relative overflow-hidden border bg-card transition-all duration-300 ease-in-out cursor-pointer p-5 ${
          isHovered
            ? 'border-primary shadow-lg shadow-primary/20 bg-primary/5'
            : 'border-border hover:border-primary/50'
        }`}
      >
        {/* Corner brackets that appear on hover */}
        {isHovered && (
          <>
            <div className="absolute top-3 left-3 w-6 h-6">
              <div className="absolute top-0 left-0 w-4 h-0.5 bg-primary" />
              <div className="absolute top-0 left-0 w-0.5 h-4 bg-primary" />
            </div>
            <div className="absolute bottom-3 right-3 w-6 h-6">
              <div className="absolute bottom-0 right-0 w-4 h-0.5 bg-primary" />
              <div className="absolute bottom-0 right-0 w-0.5 h-4 bg-primary" />
            </div>
          </>
        )}

        {/* Content - left aligned, vertically centered */}
        <div className="flex flex-col justify-center h-full text-left">
          {category.label && (
            <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-1 block">
              {category.label}
            </span>
          )}
          <h3
            className={`font-bold transition-colors duration-300 text-lg md:text-xl ${
              isHovered ? 'text-primary' : 'text-foreground'
            }`}
          >
            {category.title}
          </h3>
          {category.subtitle && (
            <p
              className={`mt-1 transition-colors duration-300 text-xs md:text-sm ${
                isHovered ? 'text-foreground/90' : 'text-muted-foreground'
              }`}
            >
              {category.subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

import React from "react";

export default Home;
