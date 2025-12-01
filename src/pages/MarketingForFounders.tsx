import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";

const MarketingForFounders = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("intro");

  const sections = [
    { id: "intro", title: "Intro", subtitle: "Start here", available: true, step: 1 },
    { id: "philosophy", title: "The Founder Philosophy", subtitle: "Mindset shift", available: true, step: 2 },
    { id: "talk-to-users", title: "Talk to Users", subtitle: "Real validation", available: true, step: 3 },
    { id: "landing-page", title: "Converting Landing Page", subtitle: "First impression", available: true, step: 4 },
    { id: "distribution", title: "Distribution Machine", subtitle: "Get traffic", available: true, step: 5 },
    { id: "pricing", title: "Pricing is Marketing", subtitle: "Filter customers", available: true, step: 6 },
    { id: "content", title: "Make more Content", subtitle: "Compound growth", available: true, step: 7 },
    { id: "features", title: "Features as Marketing", subtitle: "Build in public", available: true, step: 8 },
    { id: "growth", title: "Growth Engines", subtitle: "Scale up", available: true, step: 9 },
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case "intro":
        return (
          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p>I spent a year trying to do marketing as a "non-marketing guy." It wasn't enough. I needed a change.</p>
            <p>
              So I stopped everything for a week. I watched 50+ hours of video, analyzed 100+ strategies, and studied
              10+ successful bootstrappers.
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
              </a>
              .
            </p>
            <p className="font-medium text-white">There is no TL;DR because this is the actionable summary.</p>
          </div>
        );
      case "philosophy":
        return (
          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <h2 className="text-2xl font-bold text-white mb-4">The Launch Philosophy</h2>

            <p>Override your dev-brain.</p>
            <p>Stop optimizing behind the scene.</p>
            <p>That is wrong.</p>
            <p>Successful founders trade perfection for speed.</p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Just "Ship it"</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-white">Principle</th>
                    <th className="text-left py-3 px-4 font-semibold text-white">Why It Matters</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">Always Launch</td>
                    <td className="py-3 px-4">
                      There is no "one big launch." You launch continuously. Hundreds of small, compounding launches
                      beat one big event. You build authority with it.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">Kill Perfection</td>
                    <td className="py-3 px-4">
                      A perfect product is when there is nothing left to remove. Cut features until you can't.
                      Simplicity wins.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">Stick to Your Stack</td>
                    <td className="py-3 px-4">
                      Users don't care about your code or stack. They care about their problem. Stop chasing shiny
                      tools. Pick one stack, master it, and ship.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Launch Everything</h3>

            <p>
              <strong className="text-white">No Single Shot:</strong> You don't get one shot, you get as many shots as
              you can ship. Launch every feature, every update, every tool.
            </p>

            <p>
              <strong className="text-white">Transparency Wins:</strong> if it works for you, ship it, if it breaks, fix
              it live. Users forgive "Beta" tags if you are honest about it.
            </p>

            <p>
              <strong className="text-white">Be Your Own User:</strong> Launch as your own customer. Use your product
              and get spammed by errors, but grow only with other actual active/paid users validation.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">The "Worst" Case Scenario</h3>

            <p>What are you afraid of?</p>

            <ul className="space-y-2 my-4">
              <li>
                <strong className="text-white">The Fear:</strong> Someone sees your broken product and laughs.
              </li>
              <li>
                <strong className="text-white">The Reality:</strong> A user comes to you to give feedback.
              </li>
              <li>
                <strong className="text-white">The Win:</strong> That feedback is gold. It tells you exactly what to fix
                to make the next version better. The worst thing that happens is you make a friend.
              </li>
            </ul>

            <blockquote className="border-l-4 border-white pl-4 italic text-white my-6">
              If you are waiting for the perfect moment to launch, stop. You are just hiding. Ship it today.
            </blockquote>
          </div>
        );
      case "talk-to-users":
        return (
          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <h2 className="text-2xl font-bold text-white mb-4">Talks to Users</h2>

            <p>
              If you aren't regularly in conversation with users, you're not really building a business, you're just
              building a personal project.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Why Talking to Users Is Your Real Job</h3>

            <p>
              As a founder, the main work is very simple: listen to people who have the problem, then share what you are
              building back to them.
            </p>

            <p>
              Users tell you what matters enough to build, and every time you share progress, you attract more of the
              right people into that loop.
            </p>

            <p>
              Being your own first user is powerful because you deeply understand the problem, but your personal taste
              is not the ultimate source of truth (may lead you to the wrong path = overbuilding).
            </p>

            <blockquote className="border-l-4 border-white pl-4 italic text-white my-6">
              Your role is to hold the vision while letting real users correct your assumptions with their behavior and
              their words.
            </blockquote>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Who to Talk To (And What to Ask)</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-white">Who you talk to</th>
                    <th className="text-left py-3 px-4 font-semibold text-white">What you ask them</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">People using your product</td>
                    <td className="py-3 px-4">
                      Focus on the result they want, not whether they like a button or a color.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">People who signed up but never paid/used it</td>
                    <td className="py-3 px-4">"what stopped you?" This reveals friction and missing value.</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">People who canceled</td>
                    <td className="py-3 px-4">
                      "What made you decide to stop?" Their reasons show the leaks in your product and onboarding.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">
                      People who have the problem but aren't users yet
                    </td>
                    <td className="py-3 px-4">
                      "How are you solving this today?" This shows alternatives and what would make them switch.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">Family and friend</td>
                    <td className="py-3 px-4">No. Just support.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">How to Ask Smart Questions</h3>

            <ul className="space-y-2 my-4">
              <li>
                <strong className="text-white">Ask about outcomes, not opinions on UI:</strong> You care about the job
                they're trying to get done, not whether they "like" a screen.
              </li>
              <li>
                <strong className="text-white">Don't rely on "Would you use this?"</strong> from people with no
                commitment. Credit card inputs are engagement; email signups are just clutter. If they aren't willing to
                pay, they are just tire-kickers.
              </li>
              <li>
                <strong className="text-white">Ask publicly on X:</strong> "If you signed up but never paid, why?" and
                let patterns appear in the replies. The feedback is brutally honest and gold.
              </li>
              <li>
                <strong className="text-white">Listen to error noise:</strong> The only feedback you (the founder)
                should obsess over is errors.
              </li>
              <li>
                Ask specific: general feedback is tough to understand and get actionable steps from it. Be specific on
                something you doubt or try to do.
              </li>
            </ul>

            <blockquote className="border-l-4 border-white pl-4 italic text-white my-6">
              Daily mission: Talk to at least one person who has the problem you solve, user or not, and write down
              exactly how they describe it in their own words.
            </blockquote>
          </div>
        );
      case "landing-page":
        return (
          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <h2 className="text-2xl font-bold text-white mb-4">Converting Landing Page</h2>

            <p>
              Most founders overthink this. You don't need a masterpiece; you need a filter. If your landing page
              doesn't answer "Why should a stranger care?" in 3 seconds, you've lost them.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">The Formula</h3>

            <p>Spend 80% of your time on the Hero Section. This is the only part that matters at first.</p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-white">Element</th>
                    <th className="text-left py-3 px-4 font-semibold text-white">What to do</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">Tagline</td>
                    <td className="py-3 px-4">
                      One sentence. Why should I give you my money? Answer the "Why", not the "What."
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">Video</td>
                    <td className="py-3 px-4">
                      Don't do a boring feature tour. Show the <strong className="text-white">outcome</strong> (the
                      win), not the buttons. If they can see the result, they convert. Or clear screenshot of what you
                      get.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">Social Proof</td>
                    <td className="py-3 px-4">
                      Nobody trusts a ghost town. Use specific numbers: "Deployed in X businesses" beats "I love this
                      app."
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">Pricing</td>
                    <td className="py-3 px-4">Detailled later (super important)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong className="text-white">Noise Filter:</strong> Everything else on your landing page that is not one
              of these elements is noise. Remove it.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Conversion &gt; Traffic</h3>

            <p>Stop pouring water into a leaky bucket.</p>

            <ul className="space-y-2 my-4">
              <li>
                <strong className="text-white">Fix the Funnel First:</strong> Insane marketing efforts bringing people
                to a broken funnel = wasted effort. A 2x improvement in conversion beats 2x traffic every time.
              </li>
              <li>
                <strong className="text-white">Churn is Reality:</strong> For subscription products, 10% monthly churn
                is normal. Your job is to track where you lose people in the signup process and plug the holes.
              </li>
              <li>
                <strong className="text-white">The Trust Battery:</strong> Users need to trust you before they pay.
                Features like "Coming Soon" buttons build anticipation and trust about the utility. Detailed in teh
                "Feature as marketing section".
              </li>
            </ul>

            <blockquote className="border-l-4 border-white pl-4 italic text-white my-6">
              Action Item: Go look at your hero section right now. Does it clearly state the outcome in one sentence? If
              not, rewrite your tagline first.
            </blockquote>
          </div>
        );
      case "distribution":
        return (
          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <h2 className="text-2xl font-bold text-white mb-4">Distribution Machine</h2>

            <p>
              You built it. Now build the roads to it. Don't rely on luck; build a machine that brings people to your
              door.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Directories ARE the Strategy</h3>

            <p>
              There is no "one big launch." You launch constantly. Product Hunt, Hacker News, and Reddit are not events,
              they are just big directories. Treat them as such. Every directory you submit to is a new road leading to
              your city.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-white">Directory</th>
                    <th className="text-left py-3 px-4 font-semibold text-white">The Playbook</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">Product Hunt</td>
                    <td className="py-3 px-4">
                      The holy grail. You can launch every month. Launch on Monday/Sunday for badges ("Product of the
                      Day") or mid-week for traffic. First 4 hours (starting 12:01 AM PST) are critical.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">Hacker News</td>
                    <td className="py-3 px-4">
                      Title it "Show HN: I made [Product]". Use dry, technical language. No marketing fluff.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">Reddit</td>
                    <td className="py-3 px-4">
                      Don't just drop a link. Share your story in <strong className="text-white">r/SideProject</strong>.
                      Be a human first.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">The Long Tail</td>
                    <td className="py-3 px-4">
                      Uneed, Tiny Launch, etc. These are free backlinks. Do one a week. Use their badges to build
                      credibility on your site.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Personal Brand: Embody the Vision</h3>

            <p>
              Focus &gt; Diversification. Pick 1-2 platforms (X or YouTube) and stick to them. Don't spread yourself
              thin.
            </p>

            <ul className="space-y-2 my-4">
              <li>
                <strong className="text-white">Don't Just "Show Up":</strong> Share the vision. You are the only one who
                sees the future of your product. Embody that future.
              </li>
              <li>
                <strong className="text-white">Share Everything:</strong> Share your wins, your losses, and your
                metrics. Transparency builds trust.
              </li>
              <li>
                <strong className="text-white">The Tactic:</strong> Comment and engage more than you post. The worst
                thing that happens is you make friends.
              </li>
            </ul>

            <p>
              <strong className="text-white">lil plus:</strong> Code + be loud simultaneously. Live stream your coding
              (silent or with music). It forces productivity and builds an audience who trusts you.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Social Engineering</h3>

            <ul className="space-y-2 my-4">
              <li>
                <strong className="text-white">Leverage:</strong> If you have known people using your product, showcase
                them. Social leverage is powerful.
              </li>
              <li>
                <strong className="text-white">Engage:</strong> Don't just broadcast. Reply to big accounts in your
                niche. Be useful. Be present.
              </li>
            </ul>

            <blockquote className="border-l-4 border-white pl-4 italic text-white my-6">
              Action Item: Pick one directory you haven't submitted to yet. Submit your product today. That's one more
              road.
            </blockquote>
          </div>
        );
      case "pricing":
        return (
          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <h2 className="text-2xl font-bold text-white mb-4">Pricing is Marketing</h2>

            <p>
              Your price isn't just a number; it's a filter. It tells users exactly who you are. Don't price for
              everyone, price for the ones who matter.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Kill Your Free Plan</h3>

            <p>
              <strong className="text-white">Brutal truth:</strong> Only 3% of free users upgrade. Free plans are for
              VC-backed startups with huge budgets. For you, they are just costs and noise.
            </p>

            <ul className="space-y-2 my-4">
              <li>
                <strong className="text-white">The Fix:</strong> Get rid of it. You want users with skin in the game.
              </li>
              <li>
                <strong className="text-white">The Alternative:</strong> Offer a 7-day trial (credit card required) or 5
                free credits. A credit card is a commitment; an email is just clutter.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">2. Choose the Right Model</h3>

            <p>Subscription isn't the only way. Match the price to the value.</p>

            <ul className="space-y-2 my-4">
              <li>
                <strong className="text-white">Subscription:</strong> Best for continuous service and B2B. Use this if
                your product provides recurring value.
              </li>
              <li>
                <strong className="text-white">Usage-Based:</strong> Best for variable use (like API calls). Fair for
                everyone, light users pay less, heavy users scale naturally. Over 60% of SaaS companies are moving here.
              </li>
              <li>
                <strong className="text-white">One-Time Payment:</strong> Best for tools, templates, and utilities. If
                it's a static asset, charge once.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">3. The Annual Hack</h3>

            <p>Here is the math of churn.</p>

            <ul className="space-y-2 my-4">
              <li>
                <strong className="text-white">The Stat:</strong> A good product churns ~10% monthly.
              </li>
              <li>
                <strong className="text-white">The Tactic:</strong> Offer an annual plan at 40% off.
              </li>
              <li>
                <strong className="text-white">The Reality:</strong> You win. With 10% churn, you end up with more
                revenue and 3x more retained users after a year if you lock them in annually.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">4. Price Anchoring (Psychology)</h3>

            <p>Don't just give one price. Context creates value.</p>

            <ul className="space-y-2 my-4">
              <li>
                <strong className="text-white">Tier 1 (The Anchor):</strong> Cheaper, but missing key features. It
                exists to make Tier 2 look good.
              </li>
              <li>
                <strong className="text-white">Tier 2 (The Real Offer):</strong> Your main product. Complete, valuable,
                and priced just slightly higher than Tier 1.
              </li>
              <li>
                <strong className="text-white">Tier 3 (Optional):</strong> Enterprise/Premium. High price. Implements
                later once you have service to back it up.
              </li>
            </ul>

            <blockquote className="border-l-4 border-white pl-4 italic text-white my-6">
              Action Item: Go to your pricing page. If you have a "Free" plan, kill it today. Replace it with a trial or
              credits.
            </blockquote>
          </div>
        );
      case "content":
        return (
          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <h2 className="text-2xl font-bold text-white mb-4">Make more Content</h2>

            <p>
              Paid ads stop working the second you stop paying. Content is the only marketing that compounds. It's your
              long-term equity.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Freebies: Stop Hoarding Knowledge</h3>

            <p>Give away your best stuff.</p>

            <ul className="space-y-2 my-4">
              <li>
                <strong className="text-white">The Strategy:</strong> Create comprehensive guides, templates, or
                checklists based on what you learn while building. Give them away for free (no email gate).
              </li>
              <li>
                <strong className="text-white">The Loop:</strong> High-value content → Trust → Traffic → Product.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">2. Free Tools (Engineering as Marketing)</h3>

            <p>
              Build small, free tools that solve one tiny problem for your target audience (e.g., a calculator, a
              generator, a checker).
            </p>

            <ul className="space-y-2 my-4">
              <li>
                <strong className="text-white">The Strategy:</strong> Let them use it instantly. No sign-up friction.
              </li>
              <li>
                <strong className="text-white">The Funnel:</strong> They come for the free tool (via search/sharing),
                they see your main product.
              </li>
              <li>
                <strong className="text-white">The Bonus:</strong> These pages get tons of backlinks naturally, boosting
                your main site's SEO.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">3. Blog & SEO (The "Repurpose" Hack)</h3>

            <p>You don't need to be an SEO expert. You just need to squeeze every drop out of your content.</p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-white">Strategy</th>
                    <th className="text-left py-3 px-4 font-semibold text-white">How to execute</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">Write Once, Ship Thrice</td>
                    <td className="py-3 px-4">
                      Write one article ("How to solve X"). Then turn it into a thread, a video script, and a newsletter.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">Target Outcomes</td>
                    <td className="py-3 px-4">
                      Don't write "Version 2.0 Update." Write "How to [Solve Problem X] in 5 Minutes." Mention your
                      product gently as the faster way.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4 font-medium text-white">Simple SEO</td>
                    <td className="py-3 px-4">
                      Use basics like sitemaps and headers. Target <strong className="text-white">long-tail keywords</strong> (specific questions) rather than broad terms.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <blockquote className="border-l-4 border-white pl-4 italic text-white my-6">
              Action Item: Build one tiny free tool or write one guide this weekend. Launch it on a directory.
            </blockquote>
          </div>
        );
      case "features":
        return (
          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <h2 className="text-2xl font-bold text-white mb-4">Feature as Marketing</h2>

            <p>
              Your product is your marketing team. Don't just build features; build hooks. If a feature doesn't get you
              new users or retain old ones, why are you building it?
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Ship Every Feature Loudly</h3>

            <p>Every new feature is a marketing event.</p>

            <ul className="space-y-2 my-4">
              <li>
                <strong className="text-white">The Opportunity:</strong> You can launch on Product Hunt every month. A new
                major feature is a new launch.
              </li>
              <li>
                <strong className="text-white">The Loop:</strong> Ship feature → Announce it (X, Newsletter) → Relaunch on
                directories (Product Hunt, etc.) as a "v2" or "New Feature Update."
              </li>
              <li>
                <strong className="text-white">The Benefit:</strong> It keeps you visible and shows momentum to potential
                customers.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">2. Shareable Moments</h3>

            <p>Design features that users want to share.</p>

            <ul className="space-y-2 my-4">
              <li>
                <strong className="text-white">The Psychology:</strong> People share what makes them look good.
              </li>
              <li>
                <strong className="text-white">The Tactic:</strong> If your tool generates a report, an image, or a score,
                make it beautiful. Add a "Share to X" button that pre-fills a humble-brag message.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">3. The "Coming Soon" Validation</h3>

            <p>Don't write code until you have demand.</p>

            <ul className="space-y-2 my-4">
              <li>
                <strong className="text-white">The Hack:</strong> Place a "New Feature" button in your menu before you
                build it.
              </li>
              <li>
                <strong className="text-white">The Click:</strong> When they click, show a "Coming Soon" popup with an
                email capture form.
              </li>
              <li>
                <strong className="text-white">The Signal:</strong> If nobody clicks, don't build it. If 50 people give you
                their email, you have validated demand and a launch list.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">4. Roadmap is Marketing</h3>

            <p>Your roadmap isn't an internal document; it's a promise.</p>

            <ul className="space-y-2 my-4">
              <li>
                <strong className="text-white">Public Roadmap:</strong> Share what you are building next. It shows
                potential customers that the product is alive and ambitious.
              </li>
              <li>
                <strong className="text-white">Transparency:</strong> When you ship a requested feature, tag the users who
                asked for it. They will become your biggest evangelists.
              </li>
            </ul>

            <blockquote className="border-l-4 border-white pl-4 italic text-white my-6">
              Action Item: Add a "Share" button to your product's core output today. Or, kill one dead feature.
            </blockquote>
          </div>
        );
      case "growth":
        return (
          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <h2 className="text-2xl font-bold text-white mb-4">Growth Engines</h2>

            <p>
              Once the foundation is built, you need fuel. These strategies are about leveraging others to do the work for
              you. <strong className="text-white">Note:</strong> Affiliates and paid ads only work when you have a validated
              product and good traffic-to-conversion rates.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Affiliate Marketing: Build Your Sales Army</h3>

            <p>
              <strong className="text-white">Requirement:</strong> Product must convert. Don't offer affiliates a broken
              funnel.
            </p>

            <p>
              The split is simple: offer 30-50% recurring commission and be generous. If they bring you a customer who stays
              for years, they deserve it. Target power users and influencers in your niche, then give them a "Partner Pack"
              with logos and copy so promotion becomes easy. One rule: only pay out after the user stays for 30 days.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Cold Outreach: The Manual Grind</h3>

            <p>Yes, you have to do it. It's hard, but it works.</p>

            <p>
              The mindset shift is key: you are not "selling"; you are solving a problem they clearly have. Here's the method
              that actually converts:
            </p>

            <ul className="space-y-2 my-4">
              <li>
                <strong className="text-white">Personalize:</strong> Show you researched them. "I saw you launched X..."
                proves you care.
              </li>
              <li>
                <strong className="text-white">Benefit First:</strong> Not "I built this tool," but "I can save you 10 hours
                on X." Lead with their win, not your product.
              </li>
              <li>
                <strong className="text-white">The Ask:</strong> Keep it stupid simple. "Interested in seeing how?"
              </li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">"Powered By" Viral Loops</h3>

            <ul className="space-y-2 my-4">
              <li>
                <strong className="text-white">The Watermark:</strong> If you have a free tier or tool, add a "Powered by
                [Your Product]" badge on every output.
              </li>
              <li>
                <strong className="text-white">The Effect:</strong> When users share their report/image/site, their audience
                sees your brand. One share → 10 views → 1 click. This is how Typeform grew.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">Paid Ads</h3>

            <p>
              <strong className="text-white">Requirement:</strong> Only run ads when your funnel converts reliably. Ads are
              fuel, not the fire. If the bucket is leaky, you are just burning cash.
            </p>

            <p>
              <strong className="text-white">The Strategy:</strong>
            </p>

            <ul className="space-y-2 my-4">
              <li>
                <strong className="text-white">Copy What Works:</strong> Don't reinvent the wheel. Look at successful
                competitors. Use classical Google or Facebook ads targeting your specific audience.
              </li>
              <li>
                <strong className="text-white">Test & Double Down:</strong> Test 3 creatives/angles. Kill the 2 losers.
                Double down on the 1 winner.
              </li>
            </ul>

            <blockquote className="border-l-4 border-white pl-4 italic text-white my-6">
              Action Item: Start one affiliate partnership this week, or send 10 personalized cold emails.
            </blockquote>
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

  const currentSection = sections.find((s) => s.id === selectedSection);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container max-w-7xl mx-auto px-4 py-6 md:py-8 pt-[110px] md:pt-[140px]">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground hover:bg-secondary mb-4"
          onClick={() => navigate("/talk")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Feed
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="md:col-span-4 lg:col-span-3 bg-secondary md:bg-transparent md:pr-6">
            <div className="sticky top-6 md:bg-secondary md:p-6 md:rounded-lg md:-ml-4">
              <h1 className="text-xl font-bold text-foreground mb-2">Marketing for Founders</h1>
              <p className="text-sm text-muted-foreground mb-8">
                Section {currentSection?.step} of {sections.length}
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Guide Sections</h3>
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedSection === section.id
                            ? "bg-card text-foreground"
                            : section.available
                              ? "text-muted-foreground hover:bg-card/50 hover:text-foreground"
                              : "text-muted-foreground/50 cursor-not-allowed"
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
                          <span className="text-xs font-medium mt-0.5 text-muted-foreground">
                            {String(section.step).padStart(2, "0")}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{section.title}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{section.subtitle}</div>
                            {!section.available && <div className="text-xs text-muted-foreground/50 mt-1">Coming soon</div>}
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
            <div className="bg-background pb-12">
              <article className="space-y-6 max-w-3xl">{renderContent()}</article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingForFounders;
