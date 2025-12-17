import NavBar from "@/components/NavBar";
import CTACard from "@/components/CTACard";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      {/* Hero Section */}
      <section className="pt-[110px] md:pt-[140px] pb-8 md:pb-12 px-6 md:px-8">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: Intro */}
          <div className="text-left">
            <h1 className="text-[42px] md:text-[48px] lg:text-[56px] font-black leading-[1.1] mb-4 md:mb-6 tracking-tight">
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

          {/* Right: TrustViews Objective */}
          <div className="self-start">
            <iframe
              src="https://trustviews.io/w/trustviews/objective"
              width="500"
              height="120"
              frameBorder="0"
              scrolling="no"
              className="max-w-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-8 py-8 md:py-12">
        <div className="max-w-[900px] mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
          <CTACard
            href="https://blog.jeremylasne.com"
            label="Newsletter"
            title="Read the Latest"
            linkText="blog.jeremylasne.com"
            isExternal
          />
          <CTACard href="/talk" label="Talk" title="Learn from Builders" linkText="jeremylasne.com/talk" />
        </div>
      </section>

      {/* About Me Section */}
      <section className="px-6 md:px-8 py-12 md:py-16 pb-16 md:pb-24">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[28px] md:text-[36px] font-bold mb-6 tracking-tight">
            Failures, pivots, and a big vision.
          </h2>

          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-6">
            <p className="text-[15px] md:text-[16px] leading-relaxed">
              In September 2024, I launched my first business right after a Master where I basically learned nothing
              useful about building a company. Since then, I've failed more times than I can count, but each one pushed
              me closer to what I'm building now.
            </p>

            <hr className="border-border my-8" />

            <p className="text-[15px] md:text-[16px] leading-relaxed">
              Today, I can clearly see my main lever:{" "}
              <strong className="text-foreground">fixing trust and retention in online businesses.</strong>
            </p>

            <p className="text-[15px] md:text-[16px] leading-relaxed">
              I partnered with Kyle to build two products around that idea:
            </p>

            <ul className="text-[15px] md:text-[16px] leading-relaxed space-y-3 list-disc pl-5">
              <li>
                <strong className="text-foreground">Trustviews</strong>: like TrustMRR but for traffic, acting as a
                third‑party that verifies visits on your website, so you can't fake screenshots or vanity numbers. It's
                an indie‑hacker‑oriented side project that evolves on its own, to experiment with "real" launches in
                public.
              </li>
              <li>
                <strong className="text-foreground">Retn</strong>: a focused product on retention. It comes from a small
                but powerful part of Tasu's original vision: instead of "analytics for everything", Retn helps B2B teams
                keep users around by turning usage signals into concrete, simple retention actions.
              </li>
            </ul>

            <p className="text-[15px] md:text-[16px] leading-relaxed">
              This is the chapter I'm in now: less fantasy dashboards, more tight products that solve one clear problem
              and can actually grow.
            </p>

            <hr className="border-border my-8" />

            <h3 className="text-[22px] md:text-[26px] font-semibold text-foreground mt-10 mb-4">The failures</h3>

            <p className="text-[15px] md:text-[16px] leading-relaxed">
              First, with Maxime, we tried to build a "Duolingo for finance". Endless Figma screens, no real product, no
              real users, just a beautiful, unfinishable project.
            </p>

            <p className="text-[15px] md:text-[16px] leading-relaxed">
              Then came <strong className="text-foreground">OneMeet</strong>, "the everything app to close deals on a
              single call". We ran ads before building, probably terrible ones, and got exactly 0 traction.
            </p>

            <p className="text-[15px] md:text-[16px] leading-relaxed">
              Next was <strong className="text-foreground">Everdistinct</strong>, carousels for creators. I had a few
              clients, then better AI image tools came out and we became irrelevant overnight.
            </p>

            <p className="text-[15px] md:text-[16px] leading-relaxed">
              <strong className="text-foreground">Script2Clip</strong> turned a single photo into a small video scene. I
              killed it because "the market was crowded", instead of seeing competition as proof there was money on the
              table.
            </p>

            <p className="text-[15px] md:text-[16px] leading-relaxed">
              Then <strong className="text-foreground">AVA</strong>, an AI agent to manage your calendar, emails and
              Drive through chat. When the big LLMs moved native into that space, we got scared again and stopped.
            </p>

            <p className="text-[15px] md:text-[16px] leading-relaxed">
              We even built a contract analysis tool with real legal documentation because GPT wasn't accurate enough.
              Same mistake again.
            </p>

            <p className="text-[15px] md:text-[16px] leading-relaxed">
              And then there was <strong className="text-foreground">Tasu</strong>.
            </p>

            <p className="text-[15px] md:text-[16px] leading-relaxed">
              Tasu started as a feedback hub: collect, centralize and manage feedback so businesses can grow from it.
              Talking with real users, I realized the real pain wasn't "more feedback" but drowning in dashboards and
              useless numbers, with no clear growth moves coming out of them. So Tasu evolved into a system that turned
              user behavior and feedback into clear, simple, actionable growth moves.
            </p>

            <p className="text-[15px] md:text-[16px] leading-relaxed">
              I shipped it, launched it… and in one month, it made 44€. The product was finished, but I fell into the
              trap I warn others about: too many ideas, not enough long‑term focus. Tasu became another failed chapter,
              but it also gave birth to the sharper, more focused bets I'm making now with Trustviews and Retn.
            </p>
          </div>
        </div>
      </section>
      <iframe
        src="https://trustviews.io/w/jeremylasne/badge"
        width="200"
        height="50"
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default Home;
