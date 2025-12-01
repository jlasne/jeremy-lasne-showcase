import { ArrowRight } from "lucide-react";
import NavBar from "@/components/NavBar";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      {/* Hero Section */}
      <section className="pt-[110px] md:pt-[140px] pb-8 md:pb-12 px-6 md:px-8">
        <div className="max-w-[1000px] mx-auto flex flex-col items-center">
          <div className="w-full max-w-[700px] text-left">
          <p className="text-xs md:text-sm font-bold text-accent-red mb-3 md:mb-4 tracking-wider uppercase">
            User-Led Growth Founder
          </p>
          <h1 className="text-[42px] md:text-[56px] lg:text-[72px] font-black leading-[1.1] mb-4 md:mb-6 tracking-tight">
            Hey, I'm Jeremy.
          </h1>
          <p className="text-[15px] md:text-[17px] lg:text-[18px] leading-relaxed text-muted-foreground mb-6 md:mb-8">
            I build SaaS products where users drive growth, not dashboards.<br />
            Fueled by failures, feedback loops, and shipping fast.<br />
            I share the messy truth about startups in my newsletter.
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
            <a
              href="https://tasu.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-4 flex items-center justify-center text-muted-foreground bg-secondary rounded-lg hover:text-foreground hover:bg-accent-red hover:-translate-y-1 transition-all text-[13px] md:text-sm font-semibold tracking-wide"
              aria-label="Tasu.ai"
            >
              tasu.ai
            </a>
          </div>
        </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-8 py-8 md:py-12 pb-16 md:pb-24">
        <div className="max-w-[900px] mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Newsletter CTA */}
          <a
            href="https://blog.jeremylasne.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-8 md:p-10 bg-card border-2 border-border rounded-2xl hover:-translate-y-2 hover:border-cta-orange hover:shadow-[0_12px_40px_rgba(247,147,26,0.15)] transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-red to-cta-orange scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            <div className="flex flex-col gap-2 md:gap-3">
              <span className="text-[11px] md:text-xs font-semibold uppercase tracking-wider text-cta-orange">
                Newsletter
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-[32px] font-extrabold leading-tight mb-1 md:mb-2">
                Read the Latest
              </h2>
              <p className="text-[15px] md:text-[17px] lg:text-[18px] text-muted-foreground leading-relaxed mb-3 md:mb-4">
                Sharing insights about building and marketing real businesses by listening to users.
              </p>
              <span className="inline-flex items-center gap-2 text-[13px] md:text-sm font-semibold text-foreground group-hover:text-cta-orange transition-colors">
                blog.jeremylasne.com
                <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </a>

          {/* Talk CTA */}
          <a
            href="/talk"
            className="group block p-8 md:p-10 bg-card border-2 border-border rounded-2xl hover:-translate-y-2 hover:border-cta-orange hover:shadow-[0_12px_40px_rgba(247,147,26,0.15)] transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-red to-cta-orange scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            <div className="flex flex-col gap-2 md:gap-3">
              <span className="text-[11px] md:text-xs font-semibold uppercase tracking-wider text-cta-orange">
                Talk
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-[32px] font-extrabold leading-tight mb-1 md:mb-2">
                Learn from Builders
              </h2>
              <p className="text-[15px] md:text-[17px] lg:text-[18px] text-muted-foreground leading-relaxed mb-3 md:mb-4">
                Conversations with founders who ship. Real stories, real tactics, real growth.
              </p>
              <span className="inline-flex items-center gap-2 text-[13px] md:text-sm font-semibold text-foreground group-hover:text-cta-orange transition-colors">
                jeremylasne.com/talk
                <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
