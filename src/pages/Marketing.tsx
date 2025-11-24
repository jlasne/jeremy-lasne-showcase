import { useState } from "react";
import { CheckCircle2, Circle, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ActionCard {
  id: string;
  title: string;
  content: string;
}

interface Section {
  id: string;
  title: string;
  emoji: string;
  intro?: string;
  cards: ActionCard[];
}

const Marketing = () => {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [openCards, setOpenCards] = useState<Set<string>>(new Set());

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const toggleCard = (cardId: string) => {
    setOpenCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const sections: Section[] = [
    {
      id: "mindset",
      title: "The Mindset Shift",
      emoji: "🧠",
      intro: "Look, you have to override your dev-brain. Stop optimizing code and waiting for a \"perfect\" moment that doesn't exist.\n\nHundreds of small, imperfect launches beat one big, stressful event every time. If it works, ship it. If it breaks, fix it live, users forgive \"beta\" tags (they might even help you out). Just pick one stack, master it, and get your product in front of people today.\n\nKeep talking about, the vision, your wins… you're not hiding anymore; you're shipping.",
      cards: []
    },
    {
      id: "quick-wins",
      title: "Quick Wins",
      emoji: "⚡",
      cards: [
        {
          id: "waitlist",
          title: "Engage the Waitlist",
          content: "Warm-up your list if you have one, hyping what's coming.\n\nA list of emails is useless if they don't know who you are. Treating them like a database instead of insiders leads to \"ghosting\" when you finally launch. Send regular updates (e.g., screenshots, insight... Give them first access to break the beta. Turn waiting into participating so they feel invested in your success."
        },
        {
          id: "beta",
          title: "\"Beta\" Features",
          content: "Launch your product now and add a \"Beta\" tag to the feature that isn't perfect.\n\nUsers appreciate transparency. The \"Beta\" label lowers their expectations for perfection and raises their willingness to provide constructive feedback. Deploy the feature as soon as it works fundamentally. Label it clearly as \"Beta\" in the UI. Use the inevitable errors or feedback as a direct line to talk to your users and improve the product live."
        },
        {
          id: "simplify",
          title: "Simplify your Product",
          content: "A product is perfect when there is nothing left to take away.\n\nEvery extra button or feature increases friction and makes it harder for you to sell. Simple products convert better because the value proposition is clear. Crawl your interface like anew user. Remove any element that doesn't directly contribute to the core outcome the user wants. If a feature has low usage analytics, kill it to strengthen the core product."
        },
        {
          id: "landing",
          title: "The Landing page",
          content: "A hero with a headline to answer \"Why should I care?\" in a single, benefit-focused sentence, a video and a pricing, what else? nothing.\n\nWhy: You have about 3 seconds to convince a stranger. If they don't understand the \"outcome\" immediately, they leave. Spend 80% of your time on the Hero section. Tagline: State the outcome (e.g., \"Get X result in Y time\"), not the features. Visual: Use a video or screenshot that proves the result. Filter: Remove any text or links that do not support this primary goal."
        },
        {
          id: "free-plan",
          title: "Kill the Free Plan",
          content: "Replace your unlimited free plan with a 7-day (or credit based) trial, requiring a credit card.\n\nFree plans attract users with no \"skin in the game.\" Only ~3% convert to paid. They create support noise and server costs without validating your business model. Switch to a limited-time trial (e.g., 7 days) or a credit-based system (e.g., 5 free actions). Require a credit card to start; this psychological barrier ensures you are talking to serious potential customers."
        },
        {
          id: "annual",
          title: "Add Annual Pricing",
          content: "Add an annual subscription option with a significant discount (e.g., 40% off) to improve cash flow.\n\nAnnual plans reduce churn significantly. A user locked in for a year is 3x more likely to be retained long-term than a monthly user, and the upfront cash helps you reinvest. Offer a steep discount (30-50%) for the annual commitment. Do the math, I promise you see the big win there, both are winning by choosing the yearly option."
        },
        {
          id: "value-pricing",
          title: "Align Price with Value",
          content: "Rework your pricing model to be based on the value the user receives.\n\nSubscriptions aren't always the right fit. If your tool is used sporadically, a subscription causes churn. Analyze your product's usage pattern. Recurring value? Use Subscriptions (B2B/Services). Variable use? Use Usage-Based pricing (API calls/Credits). Static asset? Use One-Time Payment (Templates/Tools). Be original, it differentiates you."
        },
        {
          id: "anchor",
          title: "Create a Price Anchor",
          content: "Introduce a lower-priced \"Tier 1\" to make your main offering appear more valuable.\n\nContext creates value. A cheaper, limited plan makes your main \"Tier 2\" plan look like a complete, reasonable deal by comparison. So, create these 2 tier:Tier 1 (Anchor): Cheap, missing key features; Tier 2 (Real Offer): The complete product, priced slightly higher than Tier 1.Tier 3 (Optional): Expensive/Enterprise, for later. Eventually a lifetime deal for first super High."
        },
        {
          id: "directories",
          title: "Submit to Directories",
          content: "Submit your product to a relevant startup directory to get backlinks.\n\nEvery directory submission is a new \"campain\" for your build in public. They provide free backlinks (good for SEO) and an initial burst of traffic. Submit to platforms like Uneed, Tiny Launch, and others weekly. Use the \"Featured\" badges they give you to build social proof on your own site. Once you have a few users go for the big ones: Product Hunt & Hacker News…"
        }
      ]
    },
    {
      id: "continuous",
      title: "Continuous",
      emoji: "♾️",
      cards: [
        {
          id: "announce",
          title: "Announce Small Wins",
          content: "Post on your social channels every time you ship a small feature or fix a bug.\n\nSilence looks like death. Showing constant activity proves your product is alive, growing, and supported. Share the \"boring\" stuff. \"Just fixed the export bug\" or \"Added dark mode.\" Use these updates to tag users who asked for them."
        },
        {
          id: "errors",
          title: "Review Error Logs",
          content: "Make it a daily habit to check your app errors and try to correct it.\n\nError logs are the most honest feedback you will get from yourself."
        },
        {
          id: "social-proof",
          title: "Build Social Proof",
          content: "Make it a habit to ask for testimonials.\n\nNobody trusts a unused product. New visitors need to see that real humans are already using and succeeding with your tool, what it provides, where it's deployed… Automate the ask, for reviews and if an be displayed on socials / landing."
        },
        {
          id: "build-public",
          title: "Build in Public",
          content: "Share your progress, learnings, and even struggles on 1-2 social platforms daily.\n\nTransparency builds trust and empathy. People buy from founders they feel they know. It differentiates you from faceless corporations. Pick one/two channel and post daily. Share your metrics, your code struggles, or your revenue goals. Engage/comment on others' posts more than you broadcast your own."
        }
      ]
    },
    {
      id: "long-term",
      title: "Long Term",
      emoji: "🌲",
      cards: [
        {
          id: "launches",
          title: "Compounding Launches",
          content: "Shift your mindset from a single \"big launch\" to a series of smaller, monthly launches.\n\nYou don't get one shot; you get unlimited shots. Frequent launches keep you top-of-mind and maintain a steady stream of new traffic. Re-package existing features as \"New Updates\" and launch them, monthly, on Product Hunt, Reddit, or niche forums. A major update (v2.0, New Dashboard) counts as a fresh launch event."
        },
        {
          id: "deadlines",
          title: "Campaigns Deadlines",
          content: "Leverage real events like Black Friday to create genuine urgency.\n\nHumans procrastinate. Without a deadline, \"maybe later\" becomes \"never.\" Real deadlines force a buying decision. Run specific campaigns (Launch Day, Black Friday, Anniversary…). offer a discount or bonus that actually expires on a specific date. Never fake the deadline; if it ends Friday, close it Friday, it creates real frustration and urgence for the next one."
        },
        {
          id: "seo",
          title: "Optimize Basic SEO",
          content: "Update your website's sitemap, page titles, and meta descriptions.\n\nYou don't need to be an expert, but you need to be visible. Proper basics help Google \"read\" your map and send you free, high-intent traffic over time. Focus on \"Long-tail keywords\" (specific questions like \"How to automate invoices\" rather than just \"Invoices\"). Ensure your sitemap is submitted to Google Search Console."
        },
        {
          id: "blog",
          title: "Write a blog",
          content: "Write articles around your product leading to it smartly.\n\nContent is the only marketing asset that compounds. Ads stop when you stop paying; articles bring traffic forever. Write \"How-To\" guides that solve a specific problem. Position your product gently within the article as the faster/better way to solve that problem. Repurpose every article into a thread and newsletter."
        },
        {
          id: "free-tool",
          title: "Create a Free Tool",
          content: "Isolate a simple function from your main product and offer it as a free, no-login-required tool.\n\n\"Engineering as Marketing\" with Free tools rank high in search (SEO) and are highly shareable, acting as a perfect top-of-funnel lead magnet. Strip a useful feature (e.g., a calculator, generator, or checker) to its simplest form. Host it on a separate page. No signup required. Add a \"Powered by [Your App]\" link to convert the traffic."
        }
      ]
    },
    {
      id: "advanced",
      title: "Advanced",
      emoji: "💶",
      cards: [
        {
          id: "ads",
          title: "Scale Ads",
          content: "Once you have tested different strategies, strategically increase spend.\n\nAds accelerate a working funnel but will burn cash if your product doesn't convert yet. Wait until you have positive ROI. Test 3 creative angles; kill the 2 losers and double the budget on the winner. Repeat."
        },
        {
          id: "affiliate",
          title: "Affiliate System",
          content: "Design an affiliate program that rewards users.\n\nYour users can sell your product better than you can. Incentivizing them turns them into a decentralized sales team. Offer 30-50% recurring commission. Be generous, it's \"free\" marketing since you only pay when they bring revenue. Ensure you only pay out after a retention period (e.g., 30 days) to prevent abuse."
        },
        {
          id: "partnerships",
          title: "Affiliates as Partnerships",
          content: "Create a list of influencers or recognized personalities.\n\nGeneric affiliate links get ignored. Partnering with trusted voices in your niche lends their credibility to your product. Find 5-10 people who already teach or talk about the problem you solve. Reach out with a \"Partner Pack\" (logos, copy, graphics) to make it effortless for them to promote you."
        },
        {
          id: "enterprise",
          title: "Develop Enterprise Outreach",
          content: "Create a systematic approach for reaching larger companies.\n\nOne enterprise client can be worth 100 individual users. It requires more effort but offers much higher stability and revenue. Use Cold Email but make it personal. Personalize: \"I saw you are doing X...\" Benefit: \"I help companies save Y hours...\" Curiosity: \"Interested in seeing how?\" Simple Ask: Keep it brief and ask for a chat, not a sale."
        }
      ]
    }
  ];

  const totalTasks = sections.reduce((acc, section) => acc + section.cards.length, 0);
  const completedCount = completedTasks.size;
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#2a2a2a]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Founder's Marketing Guide
          </h1>
          <p className="text-lg text-gray-400 mb-6">
            An actionable checklist to grow your product.
          </p>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Progress</span>
              <span>{completedCount} / {totalTasks} tasks</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FF6B35] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.id} className="space-y-4">
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{section.emoji}</span>
                <h2 className="text-3xl font-bold text-white">
                  {section.title}
                </h2>
              </div>

              {/* Section Intro (for Mindset Shift) - Now Collapsible */}
              {section.intro && (
                <Collapsible
                  open={openCards.has(section.id)}
                  onOpenChange={() => toggleCard(section.id)}
                >
                  <div className="border border-white/10 bg-white/5 rounded-lg overflow-hidden hover:border-[#FF6B35]/50 transition-colors mb-6">
                    <CollapsibleTrigger className="w-full flex items-center justify-between gap-4 p-6 text-left">
                      <span className="text-lg font-semibold text-white">
                        Read the mindset shift
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${openCards.has(section.id) ? 'rotate-180' : ''}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-6 pb-6">
                        <div className="pt-2 border-t border-white/10">
                          <p className="text-white whitespace-pre-line leading-relaxed mt-3">
                            {section.intro}
                          </p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              )}

              {/* Action Cards */}
              <div className="space-y-3">
                {section.cards.map((card) => {
                  const isCompleted = completedTasks.has(card.id);
                  const isOpen = openCards.has(card.id);

                  return (
                    <Collapsible
                      key={card.id}
                      open={isOpen}
                      onOpenChange={() => toggleCard(card.id)}
                    >
                      <div className="border border-white/10 bg-white/5 rounded-lg overflow-hidden hover:border-[#FF6B35]/50 transition-colors">
                        {/* Card Header - Always Visible */}
                        <div className="flex items-center gap-4 p-4">
                          {/* Checkbox */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTask(card.id);
                            }}
                            className="flex-shrink-0 hover:scale-110 transition-transform"
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-6 h-6 text-[#FF6B35]" />
                            ) : (
                              <Circle className="w-6 h-6 text-gray-400" />
                            )}
                          </button>

                          {/* Title */}
                          <CollapsibleTrigger className="flex-1 flex items-center justify-between gap-4 text-left group">
                            <span className={`text-lg font-semibold ${isCompleted ? 'text-gray-500 line-through' : 'text-white'}`}>
                              {card.title}
                            </span>
                            <ChevronDown 
                              className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </CollapsibleTrigger>
                        </div>

                        {/* Expandable Content */}
                        <CollapsibleContent>
                          <div className="px-4 pb-4 pl-14">
                            <div className="pt-2 border-t border-white/10">
                              <p className="text-white whitespace-pre-line leading-relaxed mt-3">
                                {card.content}
                              </p>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Marketing;
