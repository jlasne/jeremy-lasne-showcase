import NavBar from "@/components/NavBar";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

const subreddits = [
  { 
    name: "r/indiehackers", 
    visitors: "28K", 
    contributors: "1.3K", 
    engagement: "4.64%",
    description: "Independent developers building their own way. IndieHackers is a subreddit focused on people who bootstrap their way to success by building products.",
    rules: "1. Self Promotion - Users can self promote their product 1 time using the SHOW IH flare. The purpose is for feedback and critique not advertisement.\n2. MRR - Posts containing info about MRR should have proof; no proof, no post.\n3. What you build type thing - We sometimes allow \"what you build\" type posts. If we see that this is done to karma farm, we don't have great news for you."
  },
  { 
    name: "r/Entrepreneur", 
    visitors: "470K", 
    contributors: "10K", 
    engagement: "2.13%",
    description: "Our community brings together individuals driven by a shared commitment to problem-solving, professional networking, and collaborative innovation. This is a space for genuine connection and exchange of ideas, not self-promotion.",
    rules: "1. 10 comment karma in /r/Entrepreneur to post\n2. No Promotion - Posts and comments must NOT be made for the primary purpose of selling or promoting yourself.\n3. No Personal Attacks\n4. Links Allowed as Supporting Material ONLY\n5. No \"How To Get Rich Quick\" posts\n6. Avoid unprofessional communication - AI-generated content is not acceptable.\n7. No free offerings threads\n8. Follow the Rules of Reddit"
  },
  { 
    name: "r/EntrepreneurRideAlong", 
    visitors: "45K", 
    contributors: "1.5K", 
    engagement: "3.33%",
    description: "Follow real founders in real time. No gurus, no hindsight. Just the raw, unfiltered journey of starting and scaling companies from idea to execution.",
    rules: "1. Be Respectful and Kind\n2. Follow Reddit's Global Rules\n3. Engage with Good Intent"
  },
  { 
    name: "r/Entrepreneurship", 
    visitors: "23K", 
    contributors: "815", 
    engagement: "3.54%",
    description: "A community dedicated to entrepreneurship questions and advice.",
    rules: "1. Don't Cause Trouble / Be Respectful to Everyone\n2. Moderators' Discretion\n3. No Self Promotion\n4. Low Effort Post - Videos, screenshots, infographics without context will result in ban.\n5. No survey or market research post without prior approval"
  },
  { 
    name: "r/GrowthHacking", 
    visitors: "13K", 
    contributors: "619", 
    engagement: "4.76%",
    description: "Welcome to world's largest Growth Hacking Community. A place for Growth Hacking practitioners and professionals to discuss Growth Marketing.",
    rules: "1. Don't Share Gated Content\n2. No Self-Promotion - Need at least 100 Community Karma\n3. SaaS Products and Tools - Seek permission from mod\n4. Seek Permission for Survey/Feedback/Beta Testing\n5. We Discourage Black-hat Tactics\n6. Stay Topical\n7. No Crowdsourcing Ideas\n8. Always be kind and respectful"
  },
  { 
    name: "r/MakeMoney", 
    visitors: "13K", 
    contributors: "609", 
    engagement: "4.68%",
    description: "A community for advice and discussions on honest, actionable ways to earn money!",
    rules: "1. Be Respectful & Civil\n2. Stay On-Topic\n3. No Promotional Content (Survey Sites, Referral Programs, MLMs, etc.)\n4. No Job Listings or Task Offers\n5. No Personal Info or DM Requests\n6. No External Links"
  },
  { 
    name: "r/microsaas", 
    visitors: "37K", 
    contributors: "5.5K", 
    engagement: "14.86%",
    description: "Software as a Service businesses run by a very small team. A place to change your life with micro SaaS apps.",
    rules: "1. Only posts about Micro SaaS apps\n2. Please be respectful, don't do unethical things\n3. Don't do spam, troll & ..."
  },
  { 
    name: "r/OnlineIncomeHustle", 
    visitors: "63K", 
    contributors: "1.6K", 
    engagement: "2.54%",
    description: "A community focused on making income online! Goal is to create $1,000+ a month online through various tested & verified strategies!",
    rules: "1. Payment/KYC - Paying users to sign up is NOT allowed\n2. DMing - Must be transparent about methods, no asking to DM\n3. NSFW - Not allowed\n4. Asking users for DM's - Against the rules to prevent scams"
  },
  { 
    name: "r/passive_income", 
    visitors: "308K", 
    contributors: "5.3K", 
    engagement: "1.72%",
    description: "The largest passive income community on the web—share wins, vet ideas, and learn what really works.",
    rules: "1. All referral links must have a disclaimer\n2. Don't be a jerk\n3. Content must be relevant to Passive Income (no gig economy, surveys, casinos)\n4. No vague posting\n5. No begging for money\n6. No identity fraud\n7. No karma farming\n8. No scams or illegal activity"
  },
  { 
    name: "r/SaaS", 
    visitors: "281K", 
    contributors: "12K", 
    engagement: "4.27%",
    description: "Software As a Service Companies — The Future Of Tech Businesses. Discussions and useful links for SaaS owners and online business owners.",
    rules: "1. Submission Guidelines - Follow Reddit rules, stay on-topic\n2. No Direct Sales Or Non-Productive Self-Promotion\n3. Posting SaaS Relevant Content Only\n4. Blog Posts Rules - Main ideas must be in Reddit post\n5. Be Kind And Supportive — Criticise Ideas, Not People\n6. No Politicizing"
  },
  { 
    name: "r/saasbuild", 
    visitors: "4.5K", 
    contributors: "1.2K", 
    engagement: "26.67%",
    description: "Share your Startup journey and get user Feedback. For Startup Owner Outreach is crucial.",
    rules: "1. SaaS Promote - You can promote your SaaS with your learning\n2. SaaS Journey - Share your journey with examples\n3. SaaS Feedback - Ask FeedBack from Community"
  },
  { 
    name: "r/ShowMeYourSaaS", 
    visitors: "1.5K", 
    contributors: "392", 
    engagement: "26.13%",
    description: "A community for founders who are building tech products. We are here to learn, exchange knowledge on how to grow together.",
    rules: "1. No hate content\n2. No AI Content\n3. Respect"
  },
  { 
    name: "r/sidehustle", 
    visitors: "192K", 
    contributors: "1.4K", 
    engagement: "0.73%",
    description: "For those looking to generate an extra income alongside another full-time commitment.",
    rules: "1. No advertising, affiliates/referrals and survey links, no self promotion\n2. Only discuss reputable gig platforms\n3. No DMs\n4. Seeking/Offering Work - Not allowed\n5. No low-effort/unrealistic posts\n6. No discussing sex work\n7. No crypto/NFTs/Drop Shipping/Casinos/Surveys"
  },
  { 
    name: "r/SideProject", 
    visitors: "317K", 
    contributors: "8.9K", 
    engagement: "2.81%",
    description: "r/SideProject is a subreddit for sharing and receiving constructive feedback on side projects.",
    rules: "No specific rules listed - general Reddit guidelines apply."
  },
  { 
    name: "r/sideprojects", 
    visitors: "3K", 
    contributors: "482", 
    engagement: "16.07%",
    description: "A community to share and discuss side projects.",
    rules: "1. Project Posts Must Include Details\n2. No Spam or Excessive Self-Promotion\n3. Feedback Must Be Constructive\n4. No Funnelling (no DM requests)\n5. No Astroturfing\n6. Flair Appropriately"
  },
  { 
    name: "r/smallbusiness", 
    visitors: "388K", 
    contributors: "11K", 
    engagement: "2.84%",
    description: "Questions about starting, owning and growing a small business. This sub is not for advertisements!",
    rules: "1. Post only questions about small business\n2. No blog links, blog content, or SEO shaping\n3. No business promotion posts\n4. No personal attacks\n5. No market research posts"
  },
  { 
    name: "r/socialmedia", 
    visitors: "173K", 
    contributors: "1.3K", 
    engagement: "0.75%",
    description: "A sub for professional discussion about social media, news, and best practices.",
    rules: "1. Professional discussion\n2. Be civil\n3. Don't be lazy - provide comprehensive details\n4. Enhance link shares with commentary\n5. This is not a help desk\n6. No Self-Promotion\n7. Spam = ban\n8. No buying or selling accounts/likes\n9. No posting petitions or surveys"
  },
  { 
    name: "r/SocialMediaMarketing", 
    visitors: "79K", 
    contributors: "1.3K", 
    engagement: "1.65%",
    description: "r/SocialMediaMarketing is a place for SMM professionals to share industry-relevant information, discuss best practices, and provide constructive critique.",
    rules: "1. Be Civil\n2. No Deceptive Promotion or Manipulation\n3. No Social Media Account Selling\n4. Keep Job Opportunities and Service Advertisements in Monthly Threads"
  },
  { 
    name: "r/Startup_Ideas", 
    visitors: "35K", 
    contributors: "1.9K", 
    engagement: "5.43%",
    description: "This subreddit is for sharing innovative startup ideas. Links and discussion about startups and descriptions of startups are welcome!",
    rules: "Note: This subreddit is not the place to promote your company or product. Discussing your startup is fine - but posts which are more promotion than anything else may be removed."
  },
  { 
    name: "r/startups", 
    visitors: "106K", 
    contributors: "2.4K", 
    engagement: "2.26%",
    description: "The community for ventures designed to scale rapidly. Welcome to /r/startups, the place to discuss startup problems and solutions.",
    rules: "1. Relevant Content Only\n2. No direct sales, advertisements, or promotion\n3. Submissions must have at least 250 characters\n4. Feedback Has a Place - Use weekly threads\n5. Rules for Links in Comments\n6. Do Not Solicit PM Requests\n7. Sharing Your Blog - Full content must be included\n8. Always Be Kind and Supportive\n9. No Unscheduled AMAs"
  },
  { 
    name: "r/thesidehustle", 
    visitors: "31K", 
    contributors: "307", 
    engagement: "0.99%",
    description: "r/thesidehustle is a community for the discussion of sidehustles and for receiving relevant feedback on newly developed projects/services.",
    rules: "1. No advertising\n2. Stay on topic\n3. No soliciting\n4. Offers for work must be cleared\n5. No discussing explicit topics unless flaired\n6. Comply with site-wide TOS"
  },
  { 
    name: "r/buildinpublic", 
    visitors: "22K", 
    contributors: "3.5K", 
    engagement: "15.91%",
    description: "A community for creators, developers, entrepreneurs, and makers to openly share their journey as they build projects in public.",
    rules: "1. Be Respectful\n2. Stay on Topic\n3. No Self-Promotion Without Context\n4. No Spam\n5. No Plagiarism or Misrepresentation\n6. Privacy - Do not share private info\n7. Transparency in Tools & Resources"
  },
];

const Reddit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (name: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container max-w-3xl mx-auto px-4 py-6 pt-[100px] md:pt-[120px]">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Reddit Strategy</h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Reddit is the best platform for bootstrapped founders in 2026.
          </p>
        </div>

        {/* Goal - Paragraph */}
        <p className="text-sm text-muted-foreground mb-4">
          <span className="font-semibold text-foreground">The Goal:</span> Earn karma, talk to your audience, and turn that attention into sales over time.
        </p>

        {/* Strategy - Paragraph */}
        <p className="text-sm text-muted-foreground mb-6">
          <span className="font-semibold text-foreground">The Strategy:</span> Make 2 posts per day. 5 comments before and after every post + reply to notifications. Cross-post to multiple relevant subreddits the same post. Wait at least 3 days before posting again in the same subreddit.
        </p>

        {/* Collapsible Daily Post Content */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-6">
          <CollapsibleTrigger className="flex items-center justify-between w-full bg-secondary/30 rounded-lg p-3 border border-border/30 hover:bg-secondary/50 transition-colors">
            <span className="text-sm font-semibold text-foreground">Daily Post Content</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-2">
            {/* Type 1: Build in Public */}
            <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center">1</span>
                <h3 className="text-xs font-semibold text-foreground">X-style "Build in Public" Content</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Use the Rob Hallam loop: rotate content types, focus on karma first, sales later.
              </p>
              <ul className="text-xs text-muted-foreground space-y-0.5">
                <li><span className="text-foreground font-medium">Entertaining:</span> Anecdotes from your journey</li>
                <li><span className="text-foreground font-medium">Educational:</span> Learnings about users, revenue, launches</li>
                <li><span className="text-foreground font-medium">Inspirational:</span> Growth charts with a short story</li>
              </ul>
            </div>

            {/* Type 2: Expertise */}
            <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center">2</span>
                <h3 className="text-xs font-semibold text-foreground">Expertise Content (from your blog)</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Niche SEO-style posts. Never lead with promotion; use comments and DMs to mention what you do.
              </p>
            </div>

            {/* Type 2bis: Product-focused */}
            <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="flex-shrink-0 w-6 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center">2b</span>
                <h3 className="text-xs font-semibold text-foreground">Product-focused but not pushy</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Describe problems without naming your app. Create "top tools" posts ranking competitors honestly.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Subreddits Table */}
        <div className="mb-6">
          <h2 className="text-base font-bold text-foreground mb-3">Build In Public Subreddits</h2>
          <div className="border border-border/30 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/30">
                  <TableHead className="text-xs h-9 w-8"></TableHead>
                  <TableHead className="text-xs h-9">Subreddit</TableHead>
                  <TableHead className="text-xs h-9 text-right">Visitors/wk</TableHead>
                  <TableHead className="text-xs h-9 text-right">Contributors</TableHead>
                  <TableHead className="text-xs h-9 text-right">Engagement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subreddits.map((sub) => {
                  const isExpanded = expandedRows.has(sub.name);
                  return (
                    <>
                      <TableRow 
                        key={sub.name} 
                        className="hover:bg-secondary/20 cursor-pointer"
                        onClick={() => toggleRow(sub.name)}
                      >
                        <TableCell className="py-2 w-8">
                          {isExpanded ? (
                            <ChevronDown className="w-3 h-3 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-muted-foreground" />
                          )}
                        </TableCell>
                        <TableCell className="text-xs py-2 font-medium">
                          <span className="text-primary">{sub.name}</span>
                        </TableCell>
                        <TableCell className="text-xs py-2 text-right text-muted-foreground">{sub.visitors}</TableCell>
                        <TableCell className="text-xs py-2 text-right text-muted-foreground">{sub.contributors}</TableCell>
                        <TableCell className="text-xs py-2 text-right text-muted-foreground">{sub.engagement}</TableCell>
                      </TableRow>
                      {isExpanded && (
                        <TableRow key={`${sub.name}-details`} className="bg-secondary/10">
                          <TableCell colSpan={5} className="py-3 px-4">
                            <div className="space-y-2">
                              <div>
                                <span className="text-xs font-semibold text-foreground">Description:</span>
                                <p className="text-xs text-muted-foreground mt-0.5">{sub.description}</p>
                              </div>
                              <div>
                                <span className="text-xs font-semibold text-foreground">Rules:</span>
                                <p className="text-xs text-muted-foreground mt-0.5 whitespace-pre-line">{sub.rules}</p>
                              </div>
                              <a 
                                href={`https://reddit.com/${sub.name}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block text-xs text-primary hover:underline mt-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Visit subreddit →
                              </a>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reddit;