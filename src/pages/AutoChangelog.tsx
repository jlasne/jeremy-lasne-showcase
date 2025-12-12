import InterviewLayout from "@/components/InterviewLayout";

const AutoChangelog = () => {
  const links = [
    { label: "Auto Changelog", url: "https://autochangelog.com/" },
    { label: "@joncphillips", url: "https://x.com/joncphillips" },
  ];

  return (
    <InterviewLayout
      title="How Simple Products Become Powerful Through Newsletters"
      videoId="LjVJpa1w5TI"
      links={links}
    >
      <p>
        Jon has been building products online for nearly two decades, combining a full‑time job in adtech with multiple side projects in newsletters and SaaS. Working closely with an engineering team by day and on his own projects at night gave him a strong product sense and a bias toward simple, shippable tools instead of over‑engineered ideas.
      </p>

      <p>
        His main focus today is <strong>Auto Changelog</strong>, a micro‑SaaS that turns GitHub activity into readable changelogs so developers can keep users informed without extra writing work. Behind this is a clear insight: developers dislike writing release notes, but users rely on them to see progress, trust the product, and stay engaged over time. Automating that communication lets teams transform code changes into ongoing marketing and retention without changing their workflow.
      </p>

      <p>
        Alongside Auto Changelog, Jon runs profitable photography newsletters and is preparing SideHustling.com, a project aimed at helping both indie hackers and non‑tech workers create practical side incomes. Across everything he does, the same pattern appears: focus on channels you own (especially email), repurpose one strong piece of content into many, and keep showing up consistently instead of chasing perfect ideas.
      </p>
    </InterviewLayout>
  );
};

export default AutoChangelog;
