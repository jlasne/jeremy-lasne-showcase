import InterviewLayout from "@/components/InterviewLayout";

const Tierly = () => {
  return (
    <InterviewLayout
      title="Turn Pricing Into Your Growth Lever"
      videoId="kHqBqCtPZUs"
      links={[
        { label: "@MPlegas on X", url: "https://x.com/MPlegas" },
        { label: "Tierly App", url: "https://tierly.app/" },
      ]}
    >
      <p>
        Interviewed Ger (@MPlegas), founder of Tierly. He built Tierly for SaaS teams who are tired of guessing at
        pricing. After a cold DM to the Vercel CEO got a reply, Ger put together the first prototype in a day.
        He's been quietly shipping for over a year, balancing family and a full-time job, not chasing hype.
      </p>

      <p className="font-semibold text-foreground">
        Pricing is a critical strength, most visitors leave your landing page because pricing is confusing, too
        high, or doesn't fit their needs.
      </p>

      <p>
        Tierly makes pricing a marketing asset: it benchmarks your pricing against competitors, delivers
        actionable recommendations, and helps you stand out. Your pricing isn't just a number. It's how you
        connect and differentiate in your market.
      </p>

      <p>
        Tierly automates what used to take hours. You get clear suggestions in minutes and can re-run analyses
        with every product update. Credits never expire. Tierly turns pricing into a growth lever you can revisit
        anytime, with a waitlist now over 100 users and more improvements on the way.
      </p>
    </InterviewLayout>
  );
};

export default Tierly;
