import NavBar from "@/components/NavBar";
import CTACard from "@/components/CTACard";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      {/* Hero Section */}
      <section className="pt-[110px] md:pt-[140px] pb-8 md:pb-12 px-6 md:px-8">
        <div className="max-w-[1000px] mx-auto flex flex-col items-center">
          <div className="w-full max-w-[700px] text-left">
            <h1 className="text-[42px] md:text-[56px] lg:text-[72px] font-black leading-[1.1] mb-4 md:mb-6 tracking-tight">
              Hey, I'm Jeremy.
            </h1>
            <p className="text-[15px] md:text-[17px] lg:text-[18px] leading-relaxed text-muted-foreground mb-6 md:mb-8">
              Obsessed with simple products that actually bring value.
            </p>
            <div className="flex gap-4 items-center">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-8 py-8 md:py-12 pb-16 md:pb-24">
        <div className="max-w-[900px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <CTACard
            href="https://blog.jeremylasne.com"
            label="Newsletter"
            title="Read the Latest"
            linkText="blog.jeremylasne.com"
            isExternal
          />
          <CTACard
            href="/talk"
            label="Talk"
            title="Learn from Builders"
            linkText="jeremylasne.com/talk"
          />
          <CTACard
            href="https://trustviews.io"
            label="Business"
            title="TrustViews"
            description="Real website views, public and trusted"
            linkText="trustviews.io"
            isExternal
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
